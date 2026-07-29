import React from 'react';
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
export { ROUTES, REDIRECTS, NOT_FOUND_META } from './content/routes';
export { AGGREGATE_RATING, AREAS_SERVED, BUSINESS, SAME_AS } from './content/business';
