/**
 * Bakes each route's markup into dist/ after the client build.
 *
 * This is an SEO-driven local-service page: the GST/PST explainer, the FAQ
 * and the pricing table have to be in the initial HTML payload, not rendered
 * after a bundle downloads. The client entry hydrates whatever is here.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const SITE = 'https://www.orbisaccounting.ca';

const ROUTES = [
  {
    path: '/',
    title: 'Bookkeeping for BC Small Business | Orbis Accounting',
    description:
      'Fixed monthly bookkeeping for BC small business, from West Vancouver. GST and PST both filed. Plans from $299/mo, with a written quote in one business day.',
  },
  {
    path: '/contact',
    title: 'Get a Plan and a Quote | Orbis Accounting',
    description:
      'Tell us where your books stand and get a written plan and a fixed monthly price within one business day. No sales call, no obligation.',
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy | Orbis Accounting',
    description: 'How Orbis Accounting collects, uses and protects your information.',
  },
  {
    path: '/terms-of-service',
    title: 'Terms of Service | Orbis Accounting',
    description: 'The terms that apply to bookkeeping engagements with Orbis Accounting.',
  },
];

const dist = path.resolve('dist');
const template = await readFile(path.join(dist, 'index.html'), 'utf-8');
const { render } = await import(pathToFileURL(path.resolve('dist-ssr/entry-server.js')).href);

const PLACEHOLDER = '<div id="root"></div>';
if (!template.includes(PLACEHOLDER)) {
  throw new Error('prerender: could not find the root div in dist/index.html');
}

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
  const url = route.path === '/' ? SITE : `${SITE}${route.path}`;

  let html = template.replace(PLACEHOLDER, `<div id="root">${render(route.path)}</div>`);

  const tags = [
    { what: 'title', match: /<title>[\s\S]*?<\/title>/, replacement: `<title>${route.title}</title>` },
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
