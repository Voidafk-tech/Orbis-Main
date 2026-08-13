import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from './components/App';

/** Used by scripts/prerender.mjs to bake each route's HTML into dist/. */
export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  );
}

/**
 * Re-exported so the prerender step can build the JSON-LD from the same copy
 * the page renders. The FAQ answers and the plan list used to be duplicated by
 * hand into index.html; going through here means they cannot drift.
 */
export { COMBINED_TAX_RATE, CONTACT, SERVICES, TIERS, percent } from './content/site';

/**
 * The whole copy bundle, indexed by locale, plus the locale tables themselves.
 *
 * This replaces a set of `ZH_`-prefixed re-exports — `ZH_FAQS`,
 * `ZH_REMOTE_FAQS`, `ZH_OG_IMAGE_ALT` — that cost three new exported names, three
 * new destructured names and three new map entries in scripts/prerender.mjs for
 * every language added, all of them hand-maintained and none of them checked.
 * The prerender step builds its per-locale maps by walking LOCALES now, so
 * adding a language costs it nothing.
 */
export { copyFor } from './content/copy';
export { LOCALES, LOCALE_TAG, LOCALE_OG, DEFAULT_LOCALE, localizePath } from './content/i18n';
export { ROUTES, ALL_ROUTES, REDIRECTS, NOT_FOUND_META } from './content/routes';
// PEOPLE is exported but no longer imported by scripts/prerender.mjs: the names
// are deliberately not published in the JSON-LD. The export is kept so restoring
// them is a one-line change there — see the note in content/business.ts.
export { AGGREGATE_RATING, AREAS_SERVED, BUSINESS, CREDENTIALS, PEOPLE, SAME_AS } from './content/business';
