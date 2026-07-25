# Orbis Accounting — marketing site

A single-page marketing and lead-generation site for Orbis Accounting, a
bookkeeping practice in West Vancouver, BC, serving all of British Columbia.
Built to the design in `design_handoff_orbis_site` (React + Vite, plain CSS
with design tokens, no UI framework).

The page has one job: get a qualified small-business owner to fill in the
intake form. A few choices look unusual and are deliberate:

- **Prices are published.** Three fixed tiers, in dollars, on the page. This is
  the main competitive differentiator — do not move it behind a form.
- **There is no "book a call" CTA.** The single conversion action is the
  asynchronous intake form, and the promise is a written reply within one
  business day. No scheduler widget.
- **Catch-up bookkeeping never carries a published per-month figure.** It is
  quoted after seeing the backlog.
- **Engagements are "contract based, term set per client"** — in the hero trust
  strip and the pricing fine print. Never "no contract".
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
   `dist/`, with per-route title, description, canonical and Open Graph tags.

The prerender step matters: this is an SEO-driven local-service page, so the
pricing table, the GST/PST explainer and the FAQ have to be in the initial HTML
payload. The client entry hydrates that markup rather than replacing it. If you
add a route, add it to `ROUTES` in `scripts/prerender.mjs`.

Per-route titles, descriptions, canonicals and Open Graph tags are rewritten by
the prerender step, which throws if a tag it expects is missing rather than
letting a route inherit the home page's metadata.

GitHub Actions publishes `dist/` to GitHub Pages on every push to `main`
(`.github/workflows/deploy.yml`). `public/404.html` keeps deep links working for
any path that was not prerendered.

## Where things live

| Path | What it is |
|---|---|
| `index.css` | The whole design system: tokens, components, responsive rules |
| `content/site.ts` | Copy and figures — prices, FAQ, form options, the tax-rate date stamp |
| `content/legal.ts` | Privacy and terms copy |
| `components/sections/` | One file per block of the page, in page order |
| `components/IntakeForm.tsx` | The form, its validation, and the Web3Forms submission |
| `index.html` | Meta tags, the site icons, and the `AccountingService` + `FAQPage` structured data |
| `public/favicon.*` | The site icon — `favicon.svg` is the source, the PNG and ICO files are rendered from it |

Editing copy should mostly mean editing `content/site.ts`. Two exceptions to
keep in sync by hand: the FAQ answers are duplicated into the `FAQPage` JSON-LD
in `index.html`, and the tier prices appear in the JSON-LD offer catalog there
too.

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
