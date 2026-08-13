/**
 * `lastmod` for each sitemap entry, taken from git rather than the clock.
 *
 * It used to be `new Date()`, which stamped the build date on all eighteen
 * URLs. Since a push to main deploys, and pushes include things like a README
 * title tweak, every page claimed to change every time — and Google's guidance
 * is explicit that it discounts `lastmod` once the values look unreliable. A
 * signal it has learned to ignore is worth less than no signal.
 *
 * So each route reports the last commit that touched the source that decides
 * what that route actually says.
 *
 * Two deliberate exclusions:
 *
 *   - Styling. `index.css` is not in any route's sources. Resizing a QR box is
 *     not a content change, and counting it would restamp all eighteen URLs
 *     for a CSS tweak, which is the noise this exists to remove.
 *   - The components that only wrap content — header, footer, layout. Same
 *     reason: chrome moving is not the page changing.
 *
 * The limits are worth knowing. `content/ui.ts` is read by nearly every page,
 * so editing it does move nearly every date — correctly, since it really does
 * change every page. And the two legal routes share `legal.ts`, so editing the
 * privacy policy also restamps the terms. Both are honest over-reporting; the
 * failure this replaces was reporting change where there was none at all.
 */
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';

/**
 * Page-level sources per route. Adding a route without adding an entry here is
 * a build failure rather than a silent fallback — see `lastmodFor`.
 */
const PAGE_SOURCES = {
  '/': ['pages/Home.tsx', 'components/sections'],
  '/services': ['pages/ServicesPage.tsx'],
  '/remote-bookkeeping': ['pages/RemoteBookkeepingPage.tsx'],
  '/gst-pst-bc': ['pages/GstPstPage.tsx', 'components/TaxCalculator.tsx'],
  '/bc-pst-registration': ['pages/BcPstRegistrationPage.tsx'],
  '/bookkeeping-vs-tax-filing': ['pages/BookkeepingVsTaxFilingPage.tsx'],
  '/catch-up-bookkeeping': ['pages/CatchUpPage.tsx'],
  '/pricing': ['pages/PricingPage.tsx'],
  '/contact': [
    'pages/ContactPage.tsx',
    'components/sections/Intake.tsx',
    'components/IntakeForm.tsx',
    'components/WeChatContact.tsx',
  ],
  '/privacy-policy': ['pages/LegalPage.tsx'],
  '/terms-of-service': ['pages/LegalPage.tsx'],
};

/**
 * Which copy bundles each route reads, by module name. Resolved per locale:
 * `site` is content/site.ts in English and content/zh/site.ts in Chinese, so a
 * translation-only edit moves only the Chinese URL.
 *
 * `ui` is deliberately absent, and it is the one judgement call in this file.
 * Every page reads it, so including it flattened all eighteen dates to a single
 * value the first time it was tried — and the commit doing the flattening had
 * only deleted a string that nothing rendered any more. That is the original
 * bug wearing different clothes.
 *
 * The split that makes it work: substance lives in site.ts, pages.ts and
 * legal.ts — the FAQ answers, the plan tiers, the explainer bodies, the legal
 * text, the things Google is actually indexing. ui.ts is mostly chrome, and
 * what page copy it does hold (headings, eyebrows, sub-headings) moves with the
 * body copy beside it in practice.
 *
 * The trade is deliberate: a heading-only edit can go unreported. Under-reporting
 * costs a recrawl Google would schedule anyway; over-reporting costs the
 * credibility of the field itself.
 */
const CONTENT_SOURCES = {
  '/': ['site'],
  '/services': ['pages', 'site'],
  '/remote-bookkeeping': ['pages'],
  '/gst-pst-bc': ['pages', 'site'],
  '/bc-pst-registration': ['pages'],
  '/bookkeeping-vs-tax-filing': ['pages'],
  '/catch-up-bookkeeping': ['pages'],
  '/pricing': ['pages', 'site'],
  '/contact': ['pages', 'site'],
  '/privacy-policy': ['legal'],
  '/terms-of-service': ['legal'],
};

/** Read by every route: it carries each one's title and description. */
const SHARED_SOURCES = ['content/routes.ts'];

const git = (args) => execFileSync('git', args, { encoding: 'utf-8' }).trim();

/**
 * Whether git can answer the question at all.
 *
 * A shallow clone is the dangerous case, and it is the default: actions/checkout
 * fetches depth 1 unless told otherwise, and `git log` over a single commit
 * reports that one commit's date for every file. The result looks like a set of
 * real per-route dates and is in fact the build date wearing a hat — the exact
 * failure this module exists to fix, only harder to notice.
 *
 * So a shallow clone is fatal in CI, where the output gets published to Google,
 * and a warning anywhere else, so that building from a tarball or a shallow
 * checkout still works.
 */
const historyAvailable = () => {
  try {
    git(['rev-parse', '--git-dir']);
  } catch {
    console.warn('lastmod: no git history here — falling back to the build date');
    return false;
  }
  if (git(['rev-parse', '--is-shallow-repository']) === 'true') {
    const message =
      'lastmod: shallow clone — every file would report the same commit date.\n' +
      '  Set `fetch-depth: 0` on actions/checkout, or run `git fetch --unshallow`.';
    if (process.env.CI) throw new Error(message);
    console.warn(`${message}\n  Falling back to the build date.`);
    return false;
  }
  return true;
};

const HAS_HISTORY = historyAvailable();
const BUILD_DATE = new Date().toISOString().slice(0, 10);

/**
 * `content/site.ts` in English, `content/zh/site.ts` in Simplified Chinese.
 *
 * Keyed on the locale's slug rather than its id, because the two differ: the
 * Simplified locale is `zh-hans` but its directory is `zh`, kept from before
 * there was a second Chinese tree to distinguish it from. LOCALE_SLUG in
 * content/i18n.ts is the one place that mapping lives; it arrives here on the
 * resolved route rather than being restated, since this file is plain JS and
 * runs before the SSR bundle exists.
 */
const contentPath = (module, slug) =>
  slug ? `content/${slug}/${module}.ts` : `content/${module}.ts`;

/**
 * Strips comments, leaving string literals alone.
 *
 * The literals are the whole reason this is a character walk rather than a
 * regex: this codebase is mostly copy, and that copy is full of things that
 * look like comment syntax. `'https://orbisaccounting.ca'` contains `//`, and
 * a regex-based stripper deletes the rest of that line — silently turning a
 * genuine copy change into an invisible one. Quoted spans are copied through
 * verbatim, escapes included, so the `//` inside a URL is never even examined.
 */
const stripComments = (source) => {
  let out = '';
  let i = 0;
  const n = source.length;

  while (i < n) {
    const c = source[i];
    const next = source[i + 1];

    if (c === '/' && next === '/') {
      while (i < n && source[i] !== '\n') i++;
      continue;
    }
    if (c === '/' && next === '*') {
      i += 2;
      while (i < n && !(source[i] === '*' && source[i + 1] === '/')) i++;
      i += 2;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') {
      const quote = c;
      out += c;
      i++;
      while (i < n) {
        if (source[i] === '\\') {
          out += source.slice(i, i + 2);
          i += 2;
          continue;
        }
        out += source[i];
        if (source[i] === quote) {
          i++;
          break;
        }
        i++;
      }
      continue;
    }

    out += c;
    i++;
  }

  return out;
};

/** Comments and whitespace removed, so only a change in substance registers. */
const normalize = (source) => stripComments(source).replace(/\s+/g, ' ').trim();

/** File contents at a commit, or null where the file did not exist. */
const blobAt = (commit, path) => {
  try {
    return git(['show', `${commit}:${path}`]);
  } catch {
    return null;
  }
};

const SOURCE_FILE = /\.(ts|tsx|js|jsx|mjs)$/;

/**
 * Whether a commit changed anything a reader could see, within `paths`.
 *
 * Only comments and formatting are discounted, and only in source files;
 * anything else — an added file, a deleted one, a `.png` — counts by its bytes.
 */
const changesSubstance = (commit, paths) => {
  let changed;
  try {
    changed = git(['diff', '--name-only', `${commit}^`, commit, '--', ...paths])
      .split('\n')
      .filter(Boolean);
  } catch {
    // No parent: the root commit created everything it touched.
    return true;
  }

  return changed.some((file) => {
    const before = blobAt(`${commit}^`, file);
    const after = blobAt(commit, file);
    // Added or deleted.
    if (before === null || after === null) return true;
    if (!SOURCE_FILE.test(file)) return before !== after;
    return normalize(before) !== normalize(after);
  });
};

/**
 * How far back to look for a real change before giving up and taking the most
 * recent commit at face value. Reached only if a route's sources have seen this
 * many consecutive cosmetic commits, which has not happened and would be its
 * own smell; the cap is here so a pathological history cannot make the build
 * walk the whole repo.
 */
const MAX_WALK = 40;

/**
 * The last commit that changed what `paths` actually say.
 *
 * This is the part that was missing, and its absence had already produced the
 * exact bug this module exists to prevent. `content/routes.ts` is read by every
 * route, and the commit that introduced this file edited a comment in it and
 * nothing else — which restamped all eighteen URLs to that day. The sitemap
 * announcing that every page had changed was itself the change. Taking
 * `git log -1` at face value cannot tell those apart, so it walks instead.
 */
const lastSubstantiveDate = (paths) => {
  const commits = git(['log', `-${MAX_WALK}`, '--format=%H', '--', ...paths])
    .split('\n')
    .filter(Boolean);

  if (commits.length === 0) return null;

  for (const commit of commits) {
    if (changesSubstance(commit, paths)) {
      return git(['show', '-s', '--format=%cI', commit]).slice(0, 10);
    }
  }

  return git(['show', '-s', '--format=%cI', commits[0]]).slice(0, 10);
};

/** Routes share sources, so the same path set is asked about repeatedly. */
const cache = new Map();

/**
 * The date for one resolved route, as YYYY-MM-DD.
 */
export function lastmodFor(route) {
  const pages = PAGE_SOURCES[route.englishPath];
  const content = CONTENT_SOURCES[route.englishPath];
  if (!pages || !content) {
    throw new Error(
      `lastmod: no sources mapped for "${route.englishPath}" — add it to ` +
        'PAGE_SOURCES and CONTENT_SOURCES in scripts/lastmod.mjs',
    );
  }
  if (!HAS_HISTORY) return BUILD_DATE;

  const paths = [
    ...SHARED_SOURCES,
    ...pages,
    ...content.map((module) => contentPath(module, route.slug)),
  ];

  // A path that does not exist has no commits, which `lastSubstantiveDate`
  // cannot distinguish from a file that has simply never changed — both come
  // back null and fall through to the build date below. That is this module's
  // original bug wearing a different hat: every URL claiming to have changed
  // today. So a source that is not on disk is a build failure, not a fallback.
  for (const path of paths) {
    if (!existsSync(path)) {
      throw new Error(
        `lastmod: ${route.path} names a source that does not exist: ${path}. ` +
          'Check PAGE_SOURCES and CONTENT_SOURCES, and that the locale directory matches LOCALE_SLUG.',
      );
    }
  }

  const key = paths.join('\0');
  if (!cache.has(key)) cache.set(key, lastSubstantiveDate(paths));

  // A path that has never been committed yields no commit at all.
  return cache.get(key) ?? BUILD_DATE;
}
