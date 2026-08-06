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
export { CONTACT, FAQS, SERVICES, TIERS } from './content/site';
export { REMOTE_FAQS } from './content/pages';
export { FAQS as ZH_FAQS } from './content/zh/site';
export { REMOTE_FAQS as ZH_REMOTE_FAQS } from './content/zh/pages';
export { ROUTES, ALL_ROUTES, REDIRECTS, NOT_FOUND_META } from './content/routes';
export { AGGREGATE_RATING, AREAS_SERVED, BUSINESS, CREDENTIALS, PEOPLE, SAME_AS } from './content/business';
