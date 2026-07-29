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
 * Every indexable route. `faq` marks the routes whose visible content actually
 * carries the FAQ — the FAQPage JSON-LD is only emitted there, because markup
 * describing content the visitor cannot see is a guidelines violation.
 */
const ROUTES = [
  {
    path: '/',
    title: 'Bookkeeping for BC Small Business | Orbis Accounting',
    description:
      'Fixed monthly bookkeeping for BC small business, from West Vancouver. GST and PST both filed. Three plans sized to your transaction volume, with a written quote in one business day.',
    priority: '1.0',
    changefreq: 'monthly',
    faq: true,
  },
  {
    path: '/contact',
    title: 'Get a Plan and a Quote | Orbis Accounting',
    description:
      'Tell us where your books stand and get a written plan and a fixed monthly price within one business day. No sales call, no obligation.',
    priority: '0.9',
    changefreq: 'monthly',
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy | Orbis Accounting',
    description: 'How Orbis Accounting collects, uses and protects your information.',
    priority: '0.2',
    changefreq: 'yearly',
  },
  {
    path: '/terms-of-service',
    title: 'Terms of Service | Orbis Accounting',
    description: 'The terms that apply to bookkeeping engagements with Orbis Accounting.',
    priority: '0.2',
    changefreq: 'yearly',
  },
];

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
const { render, CONTACT, FAQS, SERVICES, TIERS } = await import(
  pathToFileURL(path.resolve('dist-ssr/entry-server.js')).href
);

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

/** The two pieces of one-time work, taken from the same list the page renders. */
const oneTimeOffers = SERVICES.filter((service) =>
  ['Software setup and migration', 'Catch-up bookkeeping'].includes(service.h),
).map((service) => ({
  '@type': 'Offer',
  name: service.h,
  itemOffered: { '@type': 'Service', name: service.h, description: service.p },
}));

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

  const tags = [
    {
      what: 'title',
      match: /<title>[\s\S]*?<\/title>/,
      replacement: `<title>${route.title}</title>`,
    },
    {
      what: 'description',
      match: metaPattern('name', 'description'),
      replacement: `<meta name="description" content="${route.description}" />`,
    },
    {
      what: 'og:title',
      match: metaPattern('property', 'og:title'),
      replacement: `<meta property="og:title" content="${route.title}" />`,
    },
    {
      what: 'og:description',
      match: metaPattern('property', 'og:description'),
      replacement: `<meta property="og:description" content="${route.description}" />`,
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
