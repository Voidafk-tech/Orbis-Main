/**
 * Bakes each route's markup into dist/ after the client build, then writes the
 * sitemap and robots.txt from the same route list.
 *
 * This is an SEO-driven local-service page: the GST/PST explainer, the FAQ
 * and the plans table have to be in the initial HTML payload, not rendered
 * after a bundle downloads. The client entry hydrates whatever is here.
 *
 * Three things are derived here rather than maintained by hand:
 *   - per-route head tags (title, description, canonical, Open Graph);
 *   - the JSON-LD, built from content/site.ts so the FAQ answers and the plan
 *     list cannot drift out of sync with what the page actually shows;
 *   - sitemap.xml and robots.txt, so adding a route to ROUTES is all it takes
 *     for Google to be told about it.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

/**
 * Must match public/CNAME. GitHub Pages serves the host named there and
 * redirects the other one to it, so a canonical pointing at the non-canonical
 * host is a self-conflicting signal — Google follows the redirect and indexes
 * the other hostname instead of the one we asked for.
 */
const SITE = 'https://www.orbisaccounting.ca';

/**
 * Cities named individually in the structured data. Google matches a query's
 * implied location against these, so "serving all of BC" on its own leaves the
 * metro areas we actually want to appear in unstated.
 */
const AREAS_SERVED = [
  'West Vancouver',
  'North Vancouver',
  'Vancouver',
  'Burnaby',
  'Richmond',
  'Surrey',
  'Coquitlam',
  'British Columbia',
];

const dist = path.resolve('dist');
const template = await readFile(path.join(dist, 'index.html'), 'utf-8');
const {
  render,
  ROUTES,
  REDIRECTS,
  NOT_FOUND_META,
  CONTACT,
  FAQS,
  SERVICES,
  TIERS,
} = await import(pathToFileURL(path.resolve('dist-ssr/entry-server.js')).href);

const ROOT_PLACEHOLDER = '<div id="root"></div>';
const SCHEMA_PLACEHOLDER = '<!--structured-data-->';

for (const [placeholder, what] of [
  [ROOT_PLACEHOLDER, 'root div'],
  [SCHEMA_PLACEHOLDER, 'structured-data placeholder'],
]) {
  if (!template.includes(placeholder)) {
    throw new Error(`prerender: could not find the ${what} in dist/index.html`);
  }
}

/**
 * Canonical URL for a route. The trailing slash is load-bearing: prerendering
 * writes `contact/index.html`, which GitHub Pages serves at `/contact/` and
 * 301s `/contact` to. A canonical without it points at a redirect.
 */
const urlFor = (routePath) => (routePath === '/' ? `${SITE}/` : `${SITE}${routePath}/`);

/** Titles and descriptions go straight into markup, so `&` and quotes must not ride in raw. */
const escapeHtml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** JSON-LD sits inside a <script>, so a literal `</script>` in copy would end it early. */
const jsonLd = (data) =>
  `<script type="application/ld+json">\n${JSON.stringify(data, null, 2).replace(
    /</g,
    '\\u003c',
  )}\n    </script>`;

/** One offer per plan, described from the tier's own audience, cap and inclusions. */
const planOffers = TIERS.map((tier) => ({
  '@type': 'Offer',
  name: tier.name,
  itemOffered: {
    '@type': 'Service',
    name: `${tier.name} monthly bookkeeping`,
    description: [
      `${tier.audience}.`,
      `${tier.cap}.`,
      `Includes: ${tier.features
        .filter((feature) => feature.included)
        .map((feature) => feature.text)
        .join(', ')}.`,
    ].join(' '),
  },
}));

/**
 * The two pieces of one-time work, taken from the same list the page renders.
 * Matched by heading text, so this throws rather than silently dropping them
 * from the catalogue if the wording in content/site.ts is edited.
 */
const ONE_TIME_WORK = ['Software setup and migration', 'Catch-up bookkeeping'];

const oneTimeOffers = ONE_TIME_WORK.map((heading) => {
  const service = SERVICES.find((candidate) => candidate.h === heading);
  if (!service) {
    throw new Error(
      `prerender: no service headed "${heading}" in content/site.ts — update ONE_TIME_WORK to match`,
    );
  }
  return {
    '@type': 'Offer',
    name: service.h,
    itemOffered: { '@type': 'Service', name: service.h, description: service.p },
  };
});

/**
 * The practice itself. Emitted on every route — organisation-level markup is
 * expected site-wide, unlike the page-specific FAQPage below.
 *
 * No Offer here carries `price` or `priceCurrency`, matching the rule that none
 * of our own figures are published. Deliberately absent for now, and worth
 * adding once the values exist: `streetAddress` and `postalCode`, `geo`
 * coordinates, `priceRange`, and `sameAs` pointing at the Google Business
 * Profile and directory listings — `sameAs` is how Google ties this site and
 * that profile together as one entity. `aggregateRating` belongs here too, but
 * only once the reviews behind it are real.
 */
const organisation = {
  '@context': 'https://schema.org',
  '@type': 'AccountingService',
  name: 'Orbis Accounting',
  '@id': `${SITE}/#practice`,
  url: `${SITE}/`,
  logo: `${SITE}/favicon-192.png`,
  image: `${SITE}/og-card.png`,
  email: CONTACT.email,
  telephone: CONTACT.phone,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'West Vancouver',
    addressRegion: 'BC',
    addressCountry: 'CA',
  },
  areaServed: AREAS_SERVED.map((name) => ({ '@type': 'AdministrativeArea', name })),
  description:
    'Bookkeeping for BC small business, based in West Vancouver and serving all of British Columbia. Monthly bookkeeping, GST and PST filing, payroll and T4s, financial reporting, software setup and catch-up work, at a fixed monthly price.',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '17:00',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Monthly bookkeeping plans',
    itemListElement: [...planOffers, ...oneTimeOffers],
  },
};

const faqPage = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

/**
 * Rewrites one head tag, tolerating the attributes being split across lines.
 * Throws rather than silently leaving a route with the home page's metadata.
 */
const setTag = (html, { match, replacement, what }) => {
  if (!match.test(html)) {
    throw new Error(`prerender: no ${what} tag to rewrite in dist/index.html`);
  }
  return html.replace(match, replacement);
};

const metaPattern = (attr, value) =>
  new RegExp(`<meta\\s+${attr}="${value}"\\s+content="[^"]*"\\s*/?>`);

for (const route of ROUTES) {
  const url = urlFor(route.path);

  let html = template.replace(ROOT_PLACEHOLDER, `<div id="root">${render(route.path)}</div>`);

  const schema = [organisation, ...(route.faq ? [faqPage] : [])];
  html = html.replace(SCHEMA_PLACEHOLDER, schema.map(jsonLd).join('\n\n    '));

  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);

  const tags = [
    {
      what: 'title',
      match: /<title>[\s\S]*?<\/title>/,
      replacement: `<title>${title}</title>`,
    },
    {
      what: 'description',
      match: metaPattern('name', 'description'),
      replacement: `<meta name="description" content="${description}" />`,
    },
    {
      what: 'og:title',
      match: metaPattern('property', 'og:title'),
      replacement: `<meta property="og:title" content="${title}" />`,
    },
    {
      what: 'og:description',
      match: metaPattern('property', 'og:description'),
      replacement: `<meta property="og:description" content="${description}" />`,
    },
    {
      what: 'og:url',
      match: metaPattern('property', 'og:url'),
      replacement: `<meta property="og:url" content="${url}" />`,
    },
    {
      what: 'canonical',
      match: /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
      replacement: `<link rel="canonical" href="${url}" />`,
    },
  ];

  for (const tag of tags) {
    html = setTag(html, tag);
  }

  const outDir = route.path === '/' ? dist : path.join(dist, route.path);
  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, 'index.html'), html);
  console.log(`prerendered ${route.path}`);
}

/**
 * The 404, rendered through the same app so it carries the header, footer and
 * styling. GitHub Pages serves this file with a real 404 status for any path
 * that was not prerendered, which is what Google needs to see — the previous
 * arrangement bounced unknown URLs to the home page, making them soft 404s.
 */
{
  const notFoundPath = '/__not-found__';
  let html = template.replace(ROOT_PLACEHOLDER, `<div id="root">${render(notFoundPath)}</div>`);

  html = html.replace(SCHEMA_PLACEHOLDER, jsonLd(organisation));
  html = setTag(html, {
    what: 'title',
    match: /<title>[\s\S]*?<\/title>/,
    replacement: `<title>${escapeHtml(NOT_FOUND_META.title)}</title>`,
  });
  html = setTag(html, {
    what: 'description',
    match: metaPattern('name', 'description'),
    replacement: `<meta name="description" content="${escapeHtml(NOT_FOUND_META.description)}" />`,
  });

  // A 404 has no canonical URL of its own, and must not claim one.
  html = setTag(html, {
    what: 'canonical',
    match: /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
    replacement: '<meta name="robots" content="noindex" />',
  });

  await writeFile(path.join(dist, '404.html'), html);
  console.log('prerendered 404');
}

for (const redirect of REDIRECTS) {
  const target = redirect.to.startsWith('/#')
    ? `${SITE}/${redirect.to.slice(1)}`
    : urlFor(redirect.to);

  const stub = `<!doctype html>
<html lang="en-CA">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="refresh" content="0; url=${target}" />
    <link rel="canonical" href="${target}" />
    <title>Redirecting to ${target}</title>
  </head>
  <body>
    <p>This page has moved to <a href="${target}">${target}</a>.</p>
  </body>
</html>
`;

  const outDir = path.join(dist, redirect.from);
  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, 'index.html'), stub);
  console.log(`redirect ${redirect.from} -> ${redirect.to}`);
}

const lastmod = new Date().toISOString().slice(0, 10);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map((route) =>
  [
    '  <url>',
    `    <loc>${urlFor(route.path)}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${route.changefreq}</changefreq>`,
    `    <priority>${route.priority}</priority>`,
    '  </url>',
  ].join('\n'),
).join('\n')}
</urlset>
`;

await writeFile(path.join(dist, 'sitemap.xml'), sitemap);
console.log('wrote sitemap.xml');

// Everything here is public, so the only job robots.txt has is naming the sitemap.
const robots = `User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`;

await writeFile(path.join(dist, 'robots.txt'), robots);
console.log('wrote robots.txt');
