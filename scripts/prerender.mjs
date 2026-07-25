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
      'Fixed-price bookkeeping for BC small business, from West Vancouver. GST to the CRA, PST to the province, and monthly reports you can read. Plans from $299/mo.',
  },
  {
    path: '/contact',
    title: 'Get a Plan and a Quote | Orbis Accounting',
    description:
      'Tell us where your books actually stand. A written plan and a fixed monthly price within one business day. No sales call.',
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

for (const route of ROUTES) {
  const url = route.path === '/' ? SITE : `${SITE}${route.path}`;

  const html = template
    .replace(PLACEHOLDER, `<div id="root">${render(route.path)}</div>`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${route.title}</title>`)
    .replace(
      /(<meta name="description" content=")[^"]*(")/,
      `$1${route.description}$2`,
    )
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${route.title}$2`)
    .replace(
      /(<meta property="og:description" content=")[^"]*(")/,
      `$1${route.description}$2`,
    )
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);

  const outDir = route.path === '/' ? dist : path.join(dist, route.path);
  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, 'index.html'), html);
  console.log(`prerendered ${route.path}`);
}
