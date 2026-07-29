# Orbis Accounting — marketing site

A marketing and lead-generation site for Orbis Accounting, a bookkeeping
practice in West Vancouver, BC, serving all of British Columbia. Built to the
design in `design_handoff_orbis_site` (React + Vite, plain CSS with design
tokens, no UI framework).

The home page carries the whole argument end to end and is where most visitors
convert. `/services` and `/pricing` are separate pages rather than sections of
it, because they are the URLs people search for and link to, and because one
page cannot rank for a portfolio of queries. Each goes deeper than the matching
home-page section rather than repeating it — two URLs carrying the same copy
compete with each other instead of ranking.

Every page has one job: get a qualified small-business owner to fill in the
intake form. A few choices look unusual and are deliberate:

- **Plans are published, prices are not.** Three named tiers with their
  transaction caps and full included/excluded lists are on the page. None of
  our own figures appear anywhere — not on a tier, not on the one-time work,
  not in the meta description, not in the structured data. Every number reaches
  the client in the written quote. Do not reintroduce one without being asked
  to. Two sets of dollar figures on the page are deliberate and are *not* ours:
  the competitor market ranges in FAQ 1, and the CRA's $30,000 GST registration
  threshold in the GST/PST explainer. Leave both alone.
- **There is no "book a call" CTA.** The single conversion action is the
  asynchronous intake form, and the promise is a written reply within one
  business day. No scheduler widget.
- **One-time work reads "Quoted".** Both catch-up bookkeeping and software
  setup and migration are quoted after we see the job, never listed at a figure.
- **Engagements are "contract based, term set per client"** — in the hero trust
  strip and the plans fine print. Never "no contract".
- **No testimonials, client logos or counts.** The practice is new; invented
  social proof would be worse than none.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run build      # client build, SSR build, then prerender into dist/
npm run preview
```

## Build and deploy

`npm run build` does three things:

1. `vite build` — the client bundle into `dist/`.
2. `vite build --ssr entry-server.tsx` — a server bundle into `dist-ssr/`.
3. `node scripts/prerender.mjs` — renders every route to static HTML in
   `dist/`, with per-route title, description, canonical and Open Graph tags,
   then writes `sitemap.xml` and `robots.txt`.

The prerender step matters: this is an SEO-driven local-service page, so the
plans table, the GST/PST explainer and the FAQ have to be in the initial HTML
payload. The client entry hydrates that markup rather than replacing it.

`ROUTES` in `content/routes.ts` is the one list to edit when adding a route. It
drives the prerendering, the head tags, the sitemap entry, which routes carry
which structured data, and the `document.title` the app sets on client-side
navigation. The head-tag rewrite throws if a tag it expects is missing, rather
than letting a route inherit the home page's metadata.

`REDIRECTS` in the same file covers paths that used to exist and aliases people
type. GitHub Pages cannot issue a 301 and a client-side redirect only runs after
a 404 has already been served, so each one is written out as a stub carrying a
canonical to its destination and a zero-delay meta refresh.

One thing `npm run preview` does not reproduce: for an unknown path it serves
`index.html` with a 200, where GitHub Pages serves `404.html` with a real 404.
Locally that shows up as the home page's markup hydrating into the 404
component, which logs a hydration warning. It does not happen in production —
check a deployed URL, not the preview server, when testing 404 behaviour.

GitHub Actions publishes `dist/` to GitHub Pages on every push to `main`
(`.github/workflows/deploy.yml`). `dist/404.html` is the app's own 404 page,
rendered through the same layout, and GitHub Pages serves it with a real 404
status for any path that was not prerendered. It replaced a redirect script that
bounced unknown URLs to the home page — that made every dead link a soft 404,
which Google reports as an error and which hides genuinely broken links.

### The canonical hostname

`public/CNAME` and the `SITE` constant in `scripts/prerender.mjs` must name the
same host. GitHub Pages serves whichever host is in `CNAME` and 301s the other
one to it, so if the canonical tags point at the redirected host, Google follows
the redirect and indexes the other hostname instead of the one we asked for.

Both `www.orbisaccounting.ca` and the apex resolve to GitHub Pages, so either
works — but changing one file without the other silently splits the site's
ranking signals across two hostnames. Changing `CNAME` also makes GitHub
re-issue the TLS certificate, which takes a few minutes; expect a certificate
warning in that window and re-check "Enforce HTTPS" under Settings → Pages
afterwards.

## Where things live

| Path | What it is |
|---|---|
| `index.css` | The whole design system: tokens, components, responsive rules |
| `content/routes.ts` | Every route with its title, description and sitemap hints — read by both the app and the prerender step |
| `content/site.ts` | Copy and figures — the plans, FAQ, form options, the tax-rate date stamp |
| `content/pages.ts` | Copy for the `/services` and `/pricing` pages |
| `content/legal.ts` | Privacy and terms copy |
| `components/sections/` | One file per block of the home page, in page order |
| `pages/` | One file per route |
| `components/IntakeForm.tsx` | The form, its validation, and the Web3Forms submission |
| `index.html` | Meta tags and the site icons. The structured data is injected here at build time, not written by hand |
| `scripts/prerender.mjs` | Routes, head tags, the JSON-LD, the sitemap and robots.txt |
| `scripts/og-card.mjs` | Regenerates `public/og-card.png`, the link-preview image |
| `public/favicon.*` | The site icon — `favicon.svg` is the source, the PNG and ICO files are rendered from it |

Editing copy means editing `content/site.ts`. The `AccountingService` and
`FAQPage` JSON-LD are both generated from it during the prerender step, so the
FAQ answers and the plan list can no longer drift out of sync with the page.
The generated `Offer` entries deliberately carry no `price` or `priceCurrency`
— keep it that way.

The `FAQPage` block is only emitted on routes flagged `faq: true` in `ROUTES`.
Structured data describing content the visitor cannot see is a guidelines
violation, so it must not go on a route that does not render the FAQ.

## The link-preview image

`public/og-card.png` is the 1200×630 image LinkedIn, X, Slack and iMessage show
when someone shares a link. It is committed, and regenerated by hand:

```bash
node scripts/og-card.mjs      # needs Chromium; set CHROME_BIN to override the path
```

The script rebuilds the card from the brand colours and fonts and fails if the
output is not exactly 1200×630. It is deliberately not part of `npm run build`,
so the deploy depends on neither Chromium nor the Google Fonts CDN.

## The intake form

`components/IntakeForm.tsx` posts to [Web3Forms](https://web3forms.com), which
emails the submission to `info@orbisaccounting.ca`. The access key is a public
submission key — it only allows posting to the address it was issued for.

The submission carries every dropdown answer twice: once as its own labelled
field, and once inside a composed `message` body, so the whole picture is
readable in the email regardless of how the template renders. The subject line
includes the business name so enquiries are sortable.

Also in there: a honeypot field that aborts silently, deliberately loose email
validation (a false rejection costs a lead), a visible failure message that
keeps everything the visitor typed, and a confirmation state that moves focus
to its heading.

## Before launch

1. **QuickBooks Advanced ProAdvisor badge** — in place at
   `public/badge-quickbooks-advanced-proadvisor.png`. The issued file is only
   186×210, so it renders 105px tall (exactly 2:1 on a retina screen) rather
   than the 150px the design specifies. If a larger issued file turns up,
   replace it and raise `.badge-box img` back to 150px, with the box height
   back to 186px.
2. **Official vendor logos** — the five platform marks in `public/logos/` were
   derived from screenshots. Replace with vendor-issued SVG or 2× PNG.
3. **Privacy policy** — the form claims your details are "used to write your
   quote and nothing else". The policy page should be reviewed to back that.
4. **Rates date stamp** — `RATES_AS_OF` in `content/site.ts`, plus the
   competitor price ranges in FAQ 1, need an owner and a review cadence.
5. **Mobile below 720px** is built to spec but has not had a design review.

## Search visibility — what still needs real data

The technical groundwork is in place. These need values only the practice can
supply, and each one is a real ranking or measurement gap until it lands:

1. **Google Search Console** — verify the property, submit
   `https://www.orbisaccounting.ca/sitemap.xml`. Until then there is no data on
   which queries the site appears for, and indexing problems are invisible.
2. **Analytics** — nothing is installed. The site has no measurement of form
   submissions, phone taps or email clicks, so there is no way to tell which
   pages produce enquiries.
3. **Google Business Profile** — the single biggest factor for "bookkeeper near
   me" style searches, and entirely outside this repo. Nothing on the site can
   substitute for it.
4. **Structured-data gaps** — `scripts/prerender.mjs` documents the fields left
   out for want of real values: `streetAddress` and `postalCode`, `geo`
   coordinates, `priceRange`, and `sameAs` pointing at the Google Business
   Profile. `sameAs` is what ties this site and that profile together as one
   entity in Google's index.
5. **`aggregateRating`** — only once there are real reviews behind it. Review
   stars are the largest available lift to click-through rate from search
   results, but inventing them is both a guidelines violation and against the
   no-fabricated-proof rule above.
