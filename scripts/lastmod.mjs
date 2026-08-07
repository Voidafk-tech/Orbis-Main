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

/**
 * Page-level sources per route. Adding a route without adding an entry here is
 * a build failure rather than a silent fallback — see `lastmodFor`.
 */
const PAGE_SOURCES = {
  '/': ['pages/Home.tsx', 'components/sections'],
  '/services': ['pages/ServicesPage.tsx'],
  '/remote-bookkeeping': ['pages/RemoteBookkeepingPage.tsx'],
  '/gst-pst-bc': ['pages/GstPstPage.tsx'],
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

/** `content/site.ts` in English, `content/zh/site.ts` in Chinese. */
const contentPath = (module, locale) =>
  locale === 'en' ? `content/${module}.ts` : `content/${locale}/${module}.ts`;

/**
 * The date for one resolved route, as YYYY-MM-DD.
 *
 * `git log -1` over several paths already returns the most recent commit
 * touching any of them, so there is no max() to take by hand.
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
    ...content.map((module) => contentPath(module, route.locale)),
  ];

  const iso = git(['log', '-1', '--format=%cI', '--', ...paths]);
  // A path that has never been committed yields no commit at all.
  return iso ? iso.slice(0, 10) : BUILD_DATE;
}
