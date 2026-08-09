/**
 * Tells IndexNow which URLs this deploy actually changed.
 *
 * Bing discovers URLs on its own schedule, and for a domain with little inbound
 * link signal that schedule is measured in weeks. IndexNow is the one lever a
 * static site has against that: a push notification saying "this URL changed
 * now", which Bing, Yandex, Seznam, Naver and Yep all consume from the same
 * endpoint. Google does not participate, which is why nothing here mentions it.
 *
 * What it buys is awareness, not indexing. Microsoft is explicit that a
 * submission gets the URL onto the crawl queue sooner; whether the page is then
 * indexed is still the engine's own quality judgement. Treat a successful
 * submission as "Bing has been told", never as "the page is live in Bing".
 *
 * Three things here are deliberate and easy to undo by accident:
 *
 *   - **It runs after the deploy, not as part of the build.** The protocol
 *     validates ownership by fetching the key file from the site itself, so
 *     announcing URLs before the files are live invites a validation failure
 *     against the *previous* deploy's contents.
 *   - **It submits only what changed.** IndexNow's guidance is to notify on
 *     change, not to re-announce a static list on a schedule; a site that
 *     resubmits all eighteen URLs on every README tweak is teaching the
 *     endpoint to discount it. The changed set comes from the sitemap's own
 *     `lastmod`, which is git-derived — see scripts/lastmod.mjs — so "changed"
 *     means the same thing here that it means everywhere else on this site.
 *   - **It reads the deployed sitemap over HTTPS rather than dist/.** That
 *     keeps this job free of the build artifact, and so free of `npm ci`. The
 *     deploy job holds the Pages and OIDC tokens and installs nothing on
 *     purpose (see .github/workflows/deploy.yml); this job installs nothing for
 *     the same reason, and additionally verifies that what is being announced
 *     is what a crawler would actually fetch.
 *
 * Usage:
 *   node scripts/indexnow.mjs          # only URLs changed by the HEAD commit
 *   node scripts/indexnow.mjs --all    # every URL in the sitemap
 *
 * `--all` exists for one job: bootstrapping. Adding this script changes no
 * route's `lastmod`, so the first deploy after it lands would otherwise
 * announce nothing at all. Run it once with `--all`, then leave it alone.
 */
import { execFileSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

/**
 * The key is public by design — the protocol proves ownership by having the
 * crawler fetch it from the site's own root, so there is nothing to keep secret
 * and a repository secret would buy nothing but indirection. Anyone reading it
 * can ask Bing to crawl a URL on this host, which is not a capability worth
 * protecting: it is what this script does on purpose.
 */
const KEY = '66abc15747df11992a4ac33f930e2eaf';

/**
 * The shared endpoint, not `bing.com/indexnow`. Both reach the same network and
 * submitting to one is submitting to all of them, so the neutral host is the
 * honest choice for a payload that is not Bing-specific.
 */
const ENDPOINT = 'https://api.indexnow.org/indexnow';

/** How long to keep re-checking that the key file went live before giving up. */
const KEY_CHECK_ATTEMPTS = 5;
const KEY_CHECK_DELAY_MS = 6_000;

const submitAll = process.argv.includes('--all');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * The canonical host, read from public/CNAME rather than written out again.
 *
 * prerender.mjs already carries a `SITE` constant that must match this file,
 * and its comment explains what a mismatch costs. Rather than add a third place
 * for the hostname to drift, this one derives from the file GitHub Pages itself
 * treats as the answer.
 */
const host = (await readFile(path.resolve('public/CNAME'), 'utf-8')).trim();
if (!host) {
  throw new Error('indexnow: public/CNAME is empty — there is no host to announce');
}
const site = `https://${host}`;

/**
 * The key file has to be committed, at the root, containing the key and nothing
 * else. Checking it here rather than trusting it means a rename or a stray
 * newline fails the job with a readable message, instead of the endpoint
 * answering 403 and leaving someone to work out why.
 */
{
  const keyPath = path.resolve('public', `${KEY}.txt`);
  let contents;
  try {
    contents = await readFile(keyPath, 'utf-8');
  } catch {
    throw new Error(
      `indexnow: no key file at public/${KEY}.txt — it must be committed and served from the site root`,
    );
  }
  if (contents.trim() !== KEY) {
    throw new Error(`indexnow: public/${KEY}.txt must contain exactly the key and nothing else`);
  }
}

/**
 * The date of the commit being deployed, in the same form and from the same
 * field scripts/lastmod.mjs uses (`%cI`, truncated to the day). Comparing
 * anything else — the wall clock, an author date — reintroduces exactly the
 * drift that file exists to remove.
 */
const deployDate = execFileSync('git', ['show', '-s', '--format=%cI', 'HEAD'], {
  encoding: 'utf-8',
})
  .trim()
  .slice(0, 10);

/**
 * Every `<url>` block in the deployed sitemap, as `{ loc, lastmod }`.
 *
 * Parsed per block rather than by pulling every `<loc>` in the document,
 * because each entry also carries `xhtml:link` alternates and a document-wide
 * scan would pair a URL with the wrong date. The entities are the ones
 * prerender.mjs writes — it escapes for XML on the way in, so this reverses
 * exactly that set and nothing more.
 */
const parseSitemap = (xml) =>
  [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, block]) => {
    const loc = /<loc>([\s\S]*?)<\/loc>/.exec(block)?.[1]?.trim();
    const lastmod = /<lastmod>([\s\S]*?)<\/lastmod>/.exec(block)?.[1]?.trim();
    if (!loc) {
      throw new Error('indexnow: a <url> block in the sitemap has no <loc>');
    }
    return {
      loc: loc
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&amp;/g, '&'),
      lastmod,
    };
  });

const sitemapUrl = `${site}/sitemap.xml`;
const sitemapResponse = await fetch(sitemapUrl);
if (!sitemapResponse.ok) {
  throw new Error(`indexnow: ${sitemapUrl} answered ${sitemapResponse.status}`);
}

const entries = parseSitemap(await sitemapResponse.text());
if (entries.length === 0) {
  throw new Error(`indexnow: ${sitemapUrl} parsed to zero URLs`);
}

const urlList = submitAll
  ? entries.map((entry) => entry.loc)
  : entries.filter((entry) => entry.lastmod === deployDate).map((entry) => entry.loc);

if (urlList.length === 0) {
  console.log(
    `indexnow: nothing to announce — no sitemap entry is dated ${deployDate}. ` +
      'This is the normal result for a deploy that changed no page content.',
  );
  process.exit(0);
}

/**
 * Confirm the key file is reachable before announcing anything.
 *
 * Pages has usually propagated by the time the deploy job reports success, but
 * "usually" is doing work in that sentence, and a submission that arrives ahead
 * of the key file is rejected as unowned. Retrying here costs half a minute in
 * the worst case and turns a race into a wait.
 */
const keyUrl = `${site}/${KEY}.txt`;
let keyLive = false;
for (let attempt = 1; attempt <= KEY_CHECK_ATTEMPTS; attempt += 1) {
  try {
    const response = await fetch(keyUrl, { cache: 'no-store' });
    if (response.ok && (await response.text()).trim() === KEY) {
      keyLive = true;
      break;
    }
    console.log(`indexnow: key file not live yet (attempt ${attempt}, ${response.status})`);
  } catch (error) {
    console.log(`indexnow: key file check failed (attempt ${attempt}): ${error.message}`);
  }
  if (attempt < KEY_CHECK_ATTEMPTS) {
    await sleep(KEY_CHECK_DELAY_MS);
  }
}

if (!keyLive) {
  throw new Error(
    `indexnow: ${keyUrl} did not serve the key after ${KEY_CHECK_ATTEMPTS} attempts — ` +
      'submitting now would be rejected as unverified',
  );
}

console.log(`indexnow: announcing ${urlList.length} URL(s) for ${host}`);
for (const url of urlList) {
  console.log(`  ${url}`);
}

const response = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key: KEY, keyLocation: keyUrl, urlList }),
});

/**
 * The endpoint distinguishes "we took it" from "your setup is wrong", and the
 * two deserve different outcomes. A misconfiguration is silent otherwise: the
 * deploy succeeded, the site is live, and the only symptom is that Bing is
 * never told anything again. That should fail loudly and once.
 *
 * A rate limit or a bad minute at the endpoint is not a defect in this
 * repository and does not fail the job — the next deploy re-announces whatever
 * changed after it.
 */
if (response.status === 200 || response.status === 202) {
  console.log(
    response.status === 202
      ? 'indexnow: accepted — key validation pending'
      : 'indexnow: accepted',
  );
  process.exit(0);
}

const detail = `${response.status} ${response.statusText}: ${(await response.text()).trim()}`;

if (response.status === 429 || response.status >= 500) {
  console.warn(`indexnow: not accepted this time, and not treated as a failure — ${detail}`);
  process.exit(0);
}

throw new Error(
  `indexnow: submission rejected — ${detail}\n` +
    '  400 is a malformed payload, 403 an unreadable or wrong key file, ' +
    '422 a URL that does not belong to this host.',
);
