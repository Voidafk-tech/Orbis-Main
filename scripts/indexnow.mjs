/**
 * IndexNow: tells Bing a page changed instead of waiting to be crawled.
 *
 * Worth having for a reason that is not obvious from Bing's search share. Bing's
 * index is what Microsoft Copilot, ChatGPT's web search and DuckDuckGo read, so
 * a page Bing has not indexed cannot be cited by any of them. Google ignores
 * IndexNow entirely — this supplements the sitemap, it does not replace it.
 *
 * Two things have to agree for a submission to be accepted: the key below, and
 * the key file served at the site root. Both come from this constant —
 * scripts/prerender.mjs imports it to write dist/<key>.txt — so they cannot
 * disagree. That is the same arrangement the sitemap has with ROUTES.
 *
 * Run by .github/workflows/deploy.yml, which prints the payload into a job
 * output and POSTs it after the Pages deployment lands. The order matters: the
 * key file has to be live at the moment the API validates it, so this cannot run
 * before the deploy.
 *
 * Nothing here is a secret. The key is published at a public URL by design; it
 * proves the submitter controls the domain, and that is all it does.
 */
import { execFileSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

/** Issued in Bing Webmaster Tools → Settings → API Access → IndexNow. */
export const INDEXNOW_KEY = '7232a087c65044ec869b28c0c42e504b';

/**
 * Blank the key above to switch IndexNow off completely: no key file is written
 * and no submission is made. Same arrangement as MEASUREMENT_ID in
 * components/analytics.ts, and for the same reason — a half-configured
 * integration that looks live and is not is worse than an absent one.
 */
export const indexNowEnabled = () => INDEXNOW_KEY !== '';

export const KEY_FILE = `${INDEXNOW_KEY}.txt`;

const ENDPOINT = 'https://api.indexnow.org/indexnow';

/** The reverse of the escaping scripts/prerender.mjs applies when writing the sitemap. */
const unescapeXml = (value) =>
  value
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&');

/**
 * Read back what was actually published rather than recomputing it.
 *
 * The sitemap already carries the absolute URLs and the per-route `lastmod`, and
 * it was written by the same build whose output is being deployed. Deriving the
 * submission from it means the two cannot describe different sites — a second
 * implementation of urlFor() here would be one more thing to keep in step with
 * scripts/prerender.mjs, and the failure mode would be submitting URLs that do
 * not exist.
 */
const readSitemap = async (dist) => {
  const xml = await readFile(path.join(dist, 'sitemap.xml'), 'utf-8');
  const entries = [...xml.matchAll(/<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)].map(
    ([, loc, lastmod]) => ({ loc: unescapeXml(loc), lastmod: lastmod.trim() }),
  );

  if (entries.length === 0) {
    throw new Error('indexnow: no <loc>/<lastmod> pairs in dist/sitemap.xml');
  }
  return entries;
};

/** The canonical host, from the file GitHub Pages actually serves the site on. */
const readHost = async () => (await readFile(path.resolve('public/CNAME'), 'utf-8')).trim();

const git = (args) => execFileSync('git', args, { encoding: 'utf-8' }).trim();

const dateOf = (rev) => git(['show', '-s', '--format=%cI', rev]).slice(0, 10);

/**
 * Every date carried by the commits this deploy introduced.
 *
 * A set rather than HEAD's date alone, and that distinction is the whole
 * correctness of this file. `lastmodFor` reports the date of the commit that
 * last changed a route's sources, and `git log -- <paths>` simplifies history:
 * on a merge it returns the *feature branch* commit, not the merge. This repo
 * merges rather than squashes, so a branch written on Monday and merged on
 * Tuesday leaves `lastmod` at Monday while HEAD is Tuesday — and comparing the
 * two would have found nothing to submit, every single time, while reporting
 * success. A silent no-op is the worst available failure here, because the only
 * symptom is pages taking the slow path into Bing's index.
 *
 * `github.event.before` gives the push's starting point, so the range covers the
 * merge commit and everything it brought with it. Squash and rebase merges both
 * land in the range too, so this is correct regardless of the merge button used.
 */
const deployDates = () => {
  const since = process.env.INDEXNOW_SINCE;
  // All-zero is what GitHub sends for a branch's first push, and there is no
  // range to read from it.
  const usable = since && !/^0+$/.test(since);

  const dates = new Set([dateOf('HEAD')]);
  try {
    const log = git(['log', '--format=%cI', usable ? `${since}..HEAD` : 'HEAD~1..HEAD']);
    for (const line of log.split('\n').filter(Boolean)) dates.add(line.slice(0, 10));
  } catch {
    // A range that cannot be resolved — a shallow clone, or the very first
    // commit in the repo. HEAD's own date is already in the set, which is the
    // right conservative answer rather than a reason to fail the deploy.
    console.error('indexnow: could not read the push range, using HEAD only');
  }
  return dates;
};

/**
 * Only the routes this deploy actually changed.
 *
 * Submitting all eighteen URLs on every push would be the same mistake the
 * sitemap's `lastmod` used to make — announcing that everything changed teaches
 * the receiving end to stop believing the signal, and IndexNow's own guidance is
 * explicit about not resubmitting unchanged URLs. `lastmod` is already the date
 * of the last commit that changed each route's sources (scripts/lastmod.mjs), so
 * the routes whose date is this commit's date are exactly the ones to send.
 *
 * A deploy that changed only the README therefore submits nothing, which is the
 * correct outcome rather than a failure.
 *
 * `dates` is the set from deployDates() — see there for why it cannot just be
 * HEAD's date.
 */
export const changedUrls = (entries, dates) =>
  entries.filter((entry) => dates.has(entry.lastmod)).map((entry) => entry.loc);

export const payloadFor = (host, urlList) => ({
  host,
  key: INDEXNOW_KEY,
  keyLocation: `https://${host}/${KEY_FILE}`,
  urlList,
});

async function main() {
  // Logging goes to stderr throughout: stdout is the GITHUB_OUTPUT line, and
  // anything else printed there would be parsed as a job output.
  if (!indexNowEnabled()) {
    console.error('indexnow: no key set, nothing to submit');
    return;
  }

  const host = await readHost();
  const entries = await readSitemap(path.resolve('dist'));
  const dates = deployDates();
  const urlList = changedUrls(entries, dates);
  const window = [...dates].sort().join(', ');

  if (urlList.length === 0) {
    console.error(`indexnow: no route changed in this push (${window}), nothing to submit`);
    return;
  }

  console.error(`indexnow: ${urlList.length} of ${entries.length} URLs changed in this push (${window})`);
  for (const url of urlList) console.error(`  ${url}`);

  // One line, because a GITHUB_OUTPUT value containing a newline needs heredoc
  // delimiter syntax and JSON.stringify without indentation never emits one.
  console.log(`payload=${JSON.stringify(payloadFor(host, urlList))}`);
  console.error(`indexnow: endpoint ${ENDPOINT}`);
}

// Only when run directly. scripts/prerender.mjs imports INDEXNOW_KEY from here,
// and an import must not go looking for a dist/ that has not been built yet.
if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  await main();
}
