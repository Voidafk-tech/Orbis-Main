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
import { lastmodFor } from './lastmod.mjs';
import { INDEXNOW_KEY, KEY_FILE, indexNowEnabled } from './indexnow.mjs';

/**
 * Must match public/CNAME. GitHub Pages serves the host named there and
 * redirects the other one to it, so a canonical pointing at the non-canonical
 * host is a self-conflicting signal — Google follows the redirect and indexes
 * the other hostname instead of the one we asked for.
 */
const SITE = 'https://www.orbisaccounting.ca';

/** Matches content/i18n.ts. Duplicated here only because this file is plain JS. */
const LOCALE_TAGS = { en: 'en-CA', zh: 'zh-Hans-CA' };

/**
 * Open Graph locales, which are not the same strings as the hreflang tags above
 * and cannot be derived from them. Open Graph takes Facebook's
 * `language_TERRITORY` list, which has no `zh_CA` — `zh_CN` is the Simplified
 * Chinese entry and the closest true value.
 *
 * Every /zh/ page used to declare `en_CA` here, because the tag sat in
 * index.html and nothing rewrote it: the English-Canadian locale announced on
 * nine Chinese pages, to every platform that renders a link preview.
 */
const OG_LOCALES = { en: 'en_CA', zh: 'zh_CN' };

/** The other language, for `og:locale:alternate`. Two locales, so this is the one that is not `locale`. */
const otherLocale = (locale) => (locale === 'en' ? 'zh' : 'en');

const dist = path.resolve('dist');
const template = await readFile(path.join(dist, 'index.html'), 'utf-8');
const {
  render,
  ALL_ROUTES,
  ROUTES,
  REDIRECTS,
  NOT_FOUND_META,
  AGGREGATE_RATING,
  AREAS_SERVED,
  BUSINESS,
  CREDENTIALS,
  // PEOPLE is deliberately not imported — see the `employee` note on the
  // organisation object below. The export chain is left intact so re-enabling it
  // is a one-line change.
  SAME_AS,
  CONTACT,
  FAQS,
  REMOTE_FAQS,
  ZH_FAQS,
  ZH_REMOTE_FAQS,
  OG_IMAGE_ALT,
  ZH_OG_IMAGE_ALT,
  COMBINED_TAX_RATE,
  percent,
  SERVICES,
  TIERS,
} = await import(pathToFileURL(path.resolve('dist-ssr/entry-server.js')).href);

/** Link-preview alt text per locale, from the same copy modules the pages read. */
const OG_IMAGE_ALTS = { en: OG_IMAGE_ALT, zh: ZH_OG_IMAGE_ALT };

const ROOT_PLACEHOLDER = '<div id="root"></div>';
const SCHEMA_PLACEHOLDER = '<!--structured-data-->';
const HREFLANG_PLACEHOLDER = '<!--hreflang-->';

for (const [placeholder, what] of [
  [ROOT_PLACEHOLDER, 'root div'],
  [SCHEMA_PLACEHOLDER, 'structured-data placeholder'],
  [HREFLANG_PLACEHOLDER, 'hreflang placeholder'],
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

/**
 * Everything that goes straight into markup goes through here first: titles,
 * descriptions and URLs all end up inside attributes or element text, so `&`,
 * angle brackets and both kinds of quote must not ride in raw.
 *
 * Single quotes are escaped even though every attribute this file writes is
 * double-quoted. The cost is nothing and it means the helper stays correct if
 * a single-quoted attribute is ever added — the failure mode otherwise is an
 * attribute break that looks like a typo and behaves like an injection.
 *
 * The entities produced are all valid XML as well as HTML, `&#39;` numerically
 * rather than `&apos;` for that reason, so the sitemap can use this too.
 */
const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

/**
 * Injects `value` at `pattern` without String.replace interpreting it.
 *
 * A replacement *string* gives `$$`, `$&`, `` $` `` and `$'` special meaning —
 * so `$$` silently becomes a single `$`, which is exactly how priceRange: '$$'
 * shipped as '$'. Copy on this site contains dollar figures, so this is not
 * hypothetical. A replacer function is passed through verbatim.
 */
const inject = (html, pattern, value) => html.replace(pattern, () => value);

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
 * expected site-wide, unlike the page-specific blocks below.
 *
 * The address, coordinates and price band come from content/business.ts, which
 * is also where the note on keeping them in step with the Google Business
 * Profile lives. No Offer here carries `price` or `priceCurrency`: `priceRange`
 * is a deliberate, single exception to the no-published-figures rule, and the
 * per-plan figures stay out.
 */
const organisation = {
  '@context': 'https://schema.org',
  '@type': 'AccountingService',
  name: BUSINESS.name,
  '@id': `${SITE}/#practice`,
  url: `${SITE}/`,
  logo: `${SITE}/favicon-192.png`,
  image: `${SITE}/og-card.png`,
  email: CONTACT.email,
  telephone: CONTACT.phone,
  priceRange: BUSINESS.priceRange,
  currenciesAccepted: 'CAD',
  address: {
    '@type': 'PostalAddress',
    streetAddress: BUSINESS.streetAddress,
    addressLocality: BUSINESS.addressLocality,
    addressRegion: BUSINESS.addressRegion,
    postalCode: BUSINESS.postalCode,
    addressCountry: BUSINESS.addressCountry,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: BUSINESS.latitude,
    longitude: BUSINESS.longitude,
  },
  areaServed: AREAS_SERVED.map((name) => ({ '@type': 'AdministrativeArea', name })),
  // An array, not LOCALE_TAGS itself. Passing the map emitted
  // {"en":"en-CA","zh":"zh-Hans-CA"} into the markup, where schema.org expects
  // Text or Language — a shape no consumer reads, so the languages were being
  // published and understood by nothing.
  //
  // Both properties are here because they answer different questions and Google
  // reads them in different places: availableLanguage is the language you can be
  // served in, knowsLanguage is the language the practice speaks. Bilingual
  // service is the practice's main differentiator, so it is worth stating twice
  // in the form each field expects.
  availableLanguage: Object.values(LOCALE_TAGS),
  knowsLanguage: ['en', 'zh-Hans'],
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
  // No `employee`. A named, credentialled human is one of the strongest
  // expertise signals a small practice has, and this used to emit PEOPLE as
  // Person entries — but JSON-LD is page source, so that published two real
  // people's names on all eighteen URLs, readable by anyone viewing source and
  // by every scraper. The practice asked for the names not to be public, and
  // this was the only thing publishing them.
  //
  // The credentials below carry the expertise signal at practice level instead,
  // which is where Google reads it for an organisation anyway. PEOPLE and its
  // re-export in entry-server.tsx are kept so restoring this is one line — do
  // not restore it without asking, and note that adding `jobTitle` or a photo
  // publishes more, not less.
  hasCredential: CREDENTIALS.map((credential) => ({
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'certification',
    name: credential.name,
    recognizedBy: { '@type': 'Organization', name: credential.issuer },
  })),
  // Both are omitted entirely rather than emitted empty: a `sameAs: []` or a
  // zero-count rating is a worse signal than saying nothing.
  ...(SAME_AS.length > 0 ? { sameAs: SAME_AS } : {}),
  ...(AGGREGATE_RATING
    ? {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: AGGREGATE_RATING.ratingValue,
          reviewCount: AGGREGATE_RATING.reviewCount,
        },
      }
    : {}),
};

/**
 * Emitted on the home page only. This is what lets Google show the site name
 * above a result rather than a bare domain. No `potentialAction` search box:
 * the site has no search, and claiming one that does not exist is a defect.
 */
const websiteFor = (locale) => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE}/#website`,
  url: `${SITE}/`,
  name: BUSINESS.name,
  inLanguage: LOCALE_TAGS[locale],
  publisher: { '@id': `${SITE}/#practice` },
});

/**
 * Tells Google the two language versions are translations of one page rather
 * than duplicates competing with each other, and which to show by default.
 * Every page in a set must link to every other one *and to itself*, or Google
 * ignores the whole set.
 */
const hreflangFor = (englishPath) => {
  const alternates = ALL_ROUTES.filter((candidate) => candidate.englishPath === englishPath).map(
    (candidate) =>
      `<link rel="alternate" hreflang="${LOCALE_TAGS[candidate.locale]}" href="${escapeHtml(urlFor(candidate.path))}" />`,
  );

  // x-default is what a searcher gets when no language matches theirs.
  alternates.push(
    `<link rel="alternate" hreflang="x-default" href="${escapeHtml(urlFor(englishPath))}" />`,
  );

  return alternates.join('\n    ');
};

/**
 * The trail Google prints in place of the raw URL under a search result. The
 * hierarchy is flat — every page hangs directly off the home page — so this is
 * always two steps, and the home page itself gets none.
 */
const breadcrumbFor = (route) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
    { '@type': 'ListItem', position: 2, name: route.crumb, item: urlFor(route.path) },
  ],
});

/**
 * One FAQ set per page that has one. Keyed by the `faq` field on the route, so
 * a page can only be given questions it actually renders.
 */
const FAQ_SETS = {
  en: { home: FAQS, remote: REMOTE_FAQS },
  zh: { home: ZH_FAQS, remote: ZH_REMOTE_FAQS },
};

const faqPageFor = (key, locale) => {
  const questions = FAQ_SETS[locale]?.[key];
  if (!questions) {
    throw new Error(`prerender: no FAQ set named "${key}" — check the route's faq field`);
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
};

/**
 * Every internal link must point at the URL GitHub Pages actually serves, which
 * is the trailing-slash one. A link to `/services` is a 301 to `/services/`, and
 * Google was indexing both forms as separate pages — the ranking signal for the
 * site's best content page was split roughly in half between them.
 *
 * The slash is applied once, by `hrefFor` in content/i18n.ts, on the way out of
 * the locale context every link is built through. This is the check that it
 * stays that way, because the failure is silent: the page renders, the link
 * works, and only a crawler ever sees the extra hop.
 *
 * Bare anchors (`#questions`) and cross-page ones (`/#questions`) are fine, as
 * are `tel:`, `mailto:` and absolute URLs — none of them name a route.
 *
 * Files are skipped, and that exclusion is load-bearing rather than defensive:
 * React 19 hoists a `<link rel="preload" as="image" href="…">` into the render
 * output for images, so the markup contains asset hrefs this never wrote. A
 * route path has no extension and an asset always does, which separates them
 * without having to parse which element each href belongs to.
 */
const INTERNAL_HREF = /href="(\/[^"#]*)"/g;
const IS_FILE = /\.[a-z0-9]+$/i;

const assertInternalHrefs = (markup, routePath) => {
  const offenders = [
    ...new Set(
      [...markup.matchAll(INTERNAL_HREF)]
        .map((match) => match[1])
        .filter((href) => !href.endsWith('/') && !IS_FILE.test(href)),
    ),
  ];

  if (offenders.length > 0) {
    throw new Error(
      `prerender: ${routePath} links to ${offenders.join(', ')} without a trailing slash — ` +
        'each one is a 301 hop. Build internal links through path() from useLocale(), ' +
        'or run the path through hrefFor() in content/i18n.ts.',
    );
  }
};

/**
 * Google truncates a description around 158 characters, and a sentence cut
 * mid-clause reads worse in the SERP than a shorter complete one. 120 is the
 * lower bound because below it the description stops doing its job and Google
 * starts substituting its own text from the page.
 *
 * English only. Chinese has no inter-word spaces and truncates by rendered
 * width rather than character count, so 50–70 characters is correct there and a
 * length rule written for English would fail every /zh/ route. Site audits make
 * this mistake too — they flag all nine Chinese pages as "meta description too
 * short" on every run, and they are wrong every time.
 */
const DESCRIPTION_BOUNDS = { min: 120, max: 158 };

for (const route of ROUTES) {
  const { length } = route.description;
  if (length < DESCRIPTION_BOUNDS.min || length > DESCRIPTION_BOUNDS.max) {
    throw new Error(
      `prerender: the description for ${route.path} is ${length} characters — ` +
        `English descriptions must be ${DESCRIPTION_BOUNDS.min}–${DESCRIPTION_BOUNDS.max}. Rewrite it in content/routes.ts rather than truncating.`,
    );
  }
}

/**
 * The GST/PST page has to state the combined rate in its own visible copy.
 *
 * It is the figure three of the pages outranking it carry in their titles, and
 * this page did not contain it anywhere — it explained both taxes separately
 * and left the reader to add them up. The calculator's sub-heading says it now,
 * and this is the check that it keeps saying it: the string is assembled from
 * TAX_RATES, so it also fails if a rate changes and the copy does not follow.
 */
const COMBINED_RATE_TEXT = percent(COMBINED_TAX_RATE);

const assertCombinedRate = (markup, route) => {
  if (route.englishPath !== '/gst-pst-bc') return;
  if (markup.includes(COMBINED_RATE_TEXT)) return;

  throw new Error(
    `prerender: ${route.path} does not state the combined rate (${COMBINED_RATE_TEXT}) anywhere in its copy. ` +
      'It is the figure the competing pages lead with — see the calculator sub-heading in content/ui.ts.',
  );
};

/**
 * Rewrites one head tag, tolerating the attributes being split across lines.
 * Throws rather than silently leaving a route with the home page's metadata.
 */
const setTag = (html, { match, replacement, what }) => {
  if (!match.test(html)) {
    throw new Error(`prerender: no ${what} tag to rewrite in dist/index.html`);
  }
  return inject(html, match, replacement);
};

const metaPattern = (attr, value) =>
  new RegExp(`<meta\\s+${attr}="${value}"\\s+content="[^"]*"\\s*/?>`);

for (const route of ALL_ROUTES) {
  const url = escapeHtml(urlFor(route.path));

  const markup = render(route.path);
  assertInternalHrefs(markup, route.path);
  assertCombinedRate(markup, route);

  let html = inject(template, ROOT_PLACEHOLDER, `<div id="root">${markup}</div>`);

  const schema = [
    organisation,
    ...(route.englishPath === '/' ? [websiteFor(route.locale)] : []),
    ...(route.crumb ? [breadcrumbFor(route)] : []),
    ...(route.faq ? [faqPageFor(route.faq, route.locale)] : []),
  ];
  html = inject(html, SCHEMA_PLACEHOLDER, schema.map(jsonLd).join('\n\n    '));
  html = inject(html, HREFLANG_PLACEHOLDER, hreflangFor(route.englishPath));
  html = inject(html, '<html lang="en-CA">', `<html lang="${LOCALE_TAGS[route.locale]}">`);

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
      what: 'og:locale',
      match: metaPattern('property', 'og:locale'),
      replacement: `<meta property="og:locale" content="${OG_LOCALES[route.locale]}" />`,
    },
    {
      what: 'og:locale:alternate',
      match: metaPattern('property', 'og:locale:alternate'),
      replacement: `<meta property="og:locale:alternate" content="${OG_LOCALES[otherLocale(route.locale)]}" />`,
    },
    {
      what: 'og:image:alt',
      match: metaPattern('property', 'og:image:alt'),
      replacement: `<meta property="og:image:alt" content="${escapeHtml(OG_IMAGE_ALTS[route.locale])}" />`,
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
  let html = inject(template, ROOT_PLACEHOLDER, `<div id="root">${render(notFoundPath)}</div>`);

  html = inject(html, SCHEMA_PLACEHOLDER, jsonLd(organisation));
  // A 404 has no language alternates of its own.
  html = inject(html, HREFLANG_PLACEHOLDER, '');
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
  const rawTarget = redirect.to.startsWith('/#')
    ? `${SITE}/${redirect.to.slice(1)}`
    : urlFor(redirect.to);

  // Lands in an attribute, a title and element text, so it is escaped once here
  // rather than at each of the five places below.
  const target = escapeHtml(rawTarget);

  // These stubs are written here rather than from dist/index.html, so the
  // build-time policy injected by the `csp` plugin in vite.config.ts does not
  // reach them. They load nothing and script nothing, so the strictest possible
  // policy is also the correct one — it costs a line and keeps the redirect
  // surface from being the one page on the site with no policy at all.
  const stub = `<!doctype html>
<html lang="en-CA">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; base-uri 'none'; form-action 'none'" />
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

/**
 * Every route in every language, each entry declaring its alternates. The
 * xhtml:link elements say the same thing the in-page hreflang tags do; Google
 * accepts either, and having both is the belt-and-braces recommendation.
 *
 * `lastmod` comes from git, not the clock — see scripts/lastmod.mjs. Stamping
 * the build date meant every page claimed to change on every deploy, which is
 * how a site teaches Google to ignore the field.
 */
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${ALL_ROUTES.map((route) => {
  const alternates = ALL_ROUTES.filter(
    (candidate) => candidate.englishPath === route.englishPath,
  ).map(
    (candidate) =>
      `    <xhtml:link rel="alternate" hreflang="${LOCALE_TAGS[candidate.locale]}" href="${escapeHtml(urlFor(candidate.path))}" />`,
  );

  // Same escaping as the HTML: an unescaped `&` in a URL is not merely unsafe
  // here, it makes the sitemap ill-formed XML and Google rejects the file.
  return [
    '  <url>',
    `    <loc>${escapeHtml(urlFor(route.path))}</loc>`,
    `    <lastmod>${lastmodFor(route)}</lastmod>`,
    ...alternates,
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeHtml(urlFor(route.englishPath))}" />`,
    '  </url>',
  ].join('\n');
}).join('\n')}
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

/**
 * The IndexNow ownership proof: the key, as plain text, at the site root. The
 * API fetches it and refuses the submission if it does not match the key sent.
 *
 * Generated rather than committed to public/ for the same reason the sitemap is
 * — one constant in scripts/indexnow.mjs feeds both this file and the payload
 * the deploy workflow POSTs, so the two cannot drift. A committed copy would be
 * a second place to remember on a key rotation.
 */
if (indexNowEnabled()) {
  await writeFile(path.join(dist, KEY_FILE), INDEXNOW_KEY);
  console.log(`wrote ${KEY_FILE}`);
}
