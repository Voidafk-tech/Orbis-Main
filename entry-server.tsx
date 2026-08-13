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
export {
  COMBINED_TAX_RATE,
  CONTACT,
  FAQS,
  OG_IMAGE_ALT,
  SERVICES,
  TIERS,
  percent,
} from './content/site';
export { REMOTE_FAQS } from './content/pages';
export { FAQS as ZH_FAQS, OG_IMAGE_ALT as ZH_OG_IMAGE_ALT } from './content/zh/site';
export { REMOTE_FAQS as ZH_REMOTE_FAQS } from './content/zh/pages';
export { ROUTES, ALL_ROUTES, REDIRECTS, NOT_FOUND_META } from './content/routes';
// PEOPLE is exported but no longer imported by scripts/prerender.mjs: the names
// are deliberately not published in the JSON-LD. The export is kept so restoring
// them is a one-line change there — see the note in content/business.ts.
export { AGGREGATE_RATING, AREAS_SERVED, BUSINESS, CREDENTIALS, PEOPLE, SAME_AS } from './content/business';
