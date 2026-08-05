# Orbis Accounting — marketing site

A marketing and lead-generation site for Orbis Accounting, a bookkeeping
practice in West Vancouver, BC, serving all of British Columbia. Built to the
design in `design_handoff_orbis_site` (React + Vite, plain CSS with design
tokens, no UI framework).

The home page carries the whole argument end to end and is where most visitors
convert. `/services`, `/pricing`, `/remote-bookkeeping`, `/gst-pst-bc` and `/catch-up-bookkeeping` are separate pages
rather than sections of it, because they are the URLs people search for and link
to, and because one page cannot rank for a portfolio of queries. Each goes
deeper than the matching home-page section rather than repeating it — two URLs
carrying the same copy compete with each other instead of ranking.

`/remote-bookkeeping` is the odd one out and worth understanding before editing.
Queries like "bookkeeping near me" return a local pack, where ranking is decided
mostly by proximity and by the Google Business Profile — the site can only
influence them. "Remote bookkeeping" and "virtual bookkeeping" return no local
pack at all, so that page competes on its own merits and its reach is not capped
by where the practice sits. It answers *how* the work happens with nobody
dropping anything off, which is the question behind the query; `/services`
covers what gets done.

Every page has one job: get a qualified small-business owner to fill in the
intake form. A few choices look unusual and are deliberate:

- **Plans are published, prices are not.** Three named tiers with their
  transaction caps and full included/excluded lists are on the page. No figure
  of ours appears on a tier, on the one-time work, in the copy or in the meta
  description. Every number reaches the client in the written quote. Do not
  reintroduce one without being asked to. Two sets of dollar figures on the page
  are deliberate and are *not* ours: the competitor market ranges in FAQ 1, and
  the CRA's $30,000 GST registration threshold in the GST/PST explainer. Leave
  both alone.

  **One deliberate exception**, added on request: `priceRange` in
  `content/business.ts` publishes an affordability band in the structured data.
  It is currently the coarse `$$` rather than a figure range, precisely so that
  no number of ours appears even in page source. The per-plan numbers stay out,
  and the generated `Offer` entries carry no `price` or `priceCurrency`. If it
  is ever changed back to a range, note that the band is visible to anyone
  reading the page source — treat it as published even though nothing renders it.
- **There is no "book a call" CTA.** The single conversion action is the
  asynchronous intake form, and the promise is a written reply within one
  business day. No scheduler widget.
- **One-time work reads "Quoted".** Both catch-up bookkeeping and software
  setup and migration are quoted after we see the job, never listed at a figure.
- **Engagements are "contract based, term set per client"** — in the hero trust
  strip and the plans fine print. Never "no contract".
- **No testimonials, client logos or counts.** The practice is new; invented
  social proof would be worse than none.

## Two languages

English lives at `/`, Simplified Chinese at `/zh/`. Prefixed URLs rather than an
in-place text swap: a client-side toggle would leave the Chinese copy on the
same URL as the English, where Google would never index it and nobody could
share a link to it.

Both languages render **the same components**. The words come from a locale
bundle, not a parallel set of pages, so a layout fix lands in both at once and
the two cannot drift apart visually.

```
content/ui.ts        chrome and page furniture      content/zh/ui.ts
content/site.ts      home-page copy, plans, FAQ     content/zh/site.ts
content/pages.ts     the standalone pages           content/zh/pages.ts
content/legal.ts     privacy and terms              content/zh/legal.ts
content/copy.ts      resolves a bundle per locale
```

Every Chinese module is typed as `Widen<typeof En>` — see `content/i18n.ts`. The
English copy is declared `as const`, so its type is a tuple of string literals
that no translation could satisfy; `Widen` relaxes the values to `string` while
keeping every key, every level of nesting and every optional marker. The effect
is that **a translation that drops a field, misspells a key or changes a nested
shape fails the build**, rather than rendering `undefined` on a page nobody
checked. `content/copy.ts` applies the same check at module level, so a
translation file that forgets an export fails too.

`content/zh/glossary.md` records the terminology decisions — the BC place-name
conventions (卑诗省, not 不列颠哥伦比亚省), the rule that tax terms carry the
English abbreviation in brackets, and what is deliberately left in English.
Read it before editing the Chinese copy.

A few things are deliberately *not* translated: the street address, the phone
number, product names, and the service-area list, which uses the same labels as
the structured data. The intake form shows Chinese labels but submits English
values, so an enquiry from a Chinese-speaking visitor still arrives readable.

The English legal pages govern; the Chinese ones carry a line saying so.

CJK glyphs come from the system stack, not a webfont. Latin characters in
Chinese pages still render in the brand faces — browsers fall back per glyph.
Shipping a webfont with a full CJK character set would put megabytes on the
critical path and fail LCP on mobile on its own.

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

### GitHub Pages constraints

Worth knowing before proposing anything that assumes a server:

- **No server-side redirects.** A URL change needs a prerendered stub carrying a
  canonical and a meta refresh (see `REDIRECTS`), which passes less signal than a
  301. Choose URLs carefully the first time; changing them later is expensive.
- **No custom response headers.** `Cache-Control` cannot be tuned. Vite's content
  hashing covers the bundles; the files in `public/` are served unhashed, which
  is why the font filenames are stable and safe to preload.
- **`404.html` returns a real 404 status**, and prerendered routes return 200.
  Verify that on the deployed site, not against `npm run preview`, which serves
  `index.html` with a 200 for unknown paths.

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
| `content/routes.ts` | Every route with its title, description, breadcrumb label and sitemap hints — read by both the app and the prerender step |
| `content/site.ts` | Copy and figures — the plans, FAQ, form options, the tax-rate date stamp |
| `content/pages.ts` | Copy for the `/services`, `/pricing`, `/contact` and `/remote-bookkeeping` pages |
| `content/business.ts` | Address, coordinates, service areas and price band — must match the Google Business Profile |
| `content/legal.ts` | Privacy and terms copy |
| `components/sections/` | One file per block of the home page, in page order |
| `pages/` | One file per route |
| `components/IntakeForm.tsx` | The form, its validation, and the Web3Forms submission |
| `components/WeChatContact.tsx` | The WeChat block — account name, Weixin ID with a copy button, and the QR code |
| `index.html` | Meta tags and the site icons. The structured data is injected here at build time, not written by hand |
| `scripts/prerender.mjs` | Routes, head tags, the JSON-LD, the sitemap and robots.txt |
| `scripts/og-card.mjs` | Regenerates `public/og-card.png`, the link-preview image |
| `public/favicon.*` | The site icon — `favicon.svg` is the source, the PNG and ICO files are rendered from it |

Editing copy means editing `content/site.ts`. The `AccountingService` and
`FAQPage` JSON-LD are both generated from it during the prerender step, so the
FAQ answers and the plan list can no longer drift out of sync with the page.
The generated `Offer` entries deliberately carry no `price` or `priceCurrency`
— keep it that way.

There is more than one FAQ: the home page answers the questions everyone asks,
`/remote-bookkeeping` answers the ones remote raises. A route names its set with
`faq: 'home' | 'remote'`, and the prerender step throws on a name it does not
recognise. Set it only on a route that actually renders those questions —
structured data describing content the visitor cannot see is a guidelines
violation.

## Fonts

The three families are self-hosted in `public/fonts/`, Latin subset only, and
declared in the generated `fonts.css` which `index.css` imports. Vite inlines
that import into the bundled stylesheet, so it costs no extra request.

They used to load from `fonts.googleapis.com`, which put a render-blocking
stylesheet plus DNS and TLS to a second origin on the critical path before any
glyph could paint — the most expensive thing on the page for LCP, on a design
that is almost entirely type.

```bash
node scripts/fetch-fonts.mjs   # re-run only to add a weight or a family
```

Archivo and JetBrains Mono are variable fonts: one file each covers their whole
weight range, which is why there are four files and not eight. Only
`instrument-serif-latin.woff2` is preloaded — it sets the `h1`, the largest text
above the fold. Preloading more would compete with it for bandwidth.

All three families are OFL-1.1; see `public/fonts/OFL-NOTICE.txt`.

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

Worth being clear about what the honeypot does and does not cover. The access
key is public and the honeypot is client-side, so anything posting to
`api.web3forms.com/submit` directly skips both and can flood the practice inbox.
That bound has to be set on the Web3Forms side — their spam protection plus
hCaptcha or Turnstile. If a captcha widget is ever added, its origin has to go
into `script-src`, `frame-src` and `connect-src` in `vite.config.ts` or the
browser drops it with nothing but a console error.

## WeChat

`components/WeChatContact.tsx` renders the account name, the Weixin ID with a
copy button, and the QR code. It appears in two places, and the reason only one
of them carries the code is worth knowing before editing either:

- `components/sections/Intake.tsx` gets the **whole block**. That section is
  rendered twice — the foot of the home page and the head of `/contact` — so
  putting it there is what puts it on both.
- `pages/ContactPage.tsx` adds **just the ID** to its "reach us directly" list,
  matching how email and phone already appear twice on that page. No second QR:
  one page showing the same code twice reads as two different codes.

Two details it has to get right, both of which are easy to break by
simplifying:

- **The copy button's availability is decided in an effect, not while
  rendering.** Routes are prerendered, where `navigator` does not exist, so a
  check during render puts a button in the client's first render that is absent
  from the server's markup — a hydration mismatch, which React resolves by
  discarding the server markup.
- **The QR falls back on `onError` *and* on a mount check.** The markup is
  prerendered, so a missing image can finish failing before React attaches the
  handler, and then nothing would ever fire. Same arrangement as the
  certification badge in `components/sections/Trust.tsx`.

The account name and the ID are handles rather than copy: they live in
`content/site.ts` and are identical in both languages. Only the QR's alt text
and the surrounding labels are translated.

`public/wechat-qr.png` must carry **its own white field, quiet zone included**.
The page background is near-black and a transparent PNG will not scan. Supply it
at 480×480 or larger; it renders at 120px.

## Before launch

1. **QuickBooks Advanced ProAdvisor badge** — in place at
   `public/badge-quickbooks-advanced-proadvisor.png`. The issued file is only
   186×210, so it renders 105px tall (exactly 2:1 on a retina screen) rather
   than the 150px the design specifies. If a larger issued file turns up,
   replace it and raise `.badge-box img` back to 150px, with the box height
   back to 186px.
2. **Official vendor logos** — the five platform marks in `public/logos/` were
   derived from screenshots. Replace with vendor-issued SVG or 2× PNG.
3. **WeChat QR code** — `public/wechat-qr.png` is not in the repo yet, so the
   block renders its neutral placeholder. See the WeChat section above for what
   the file has to be. The Weixin ID ships and works without it.
4. **Privacy policy** — rewritten to name Web3Forms and Google as processors,
   to say that both hold data outside Canada, and to carry retention and access
   sections. Two things still need the practice's answer: whether
   `privacy@orbisaccounting.ca` is a monitored mailbox, and how long enquiries
   that never become engagements are actually kept — the twelve months in
   `content/legal.ts` is a placeholder, flagged with a `TODO(client)`.
5. **Terms of service** — still stamped January 2024, deliberately. The date is
   a claim about when someone last read the document, so it stays honest until
   the three clauses are reviewed against how the practice engages clients now.
   Review, then restamp.
6. **Web3Forms spam protection** — turn on their spam filter and a captcha in
   the dashboard. See the note under "The intake form".
7. **Rates date stamp** — `RATES_AS_OF` in `content/site.ts`, plus the
   competitor price ranges in FAQ 1, need an owner and a review cadence.
8. **Mobile below 720px** is built to spec but has not had a design review.
9. **The Chinese copy added since the last review** — the WeChat labels in
   `content/zh/ui.ts` and the rewritten privacy sections in
   `content/zh/legal.ts`. Per `content/zh/glossary.md`, new Chinese copy is read
   by the client before it goes live.

## Search visibility — what still needs real data

The technical groundwork is in place. These need values only the practice can
supply, and each one is a real ranking or measurement gap until it lands:

1. **Google Search Console** — verify the property, submit
   `https://www.orbisaccounting.ca/sitemap.xml`. Until then there is no data on
   which queries the site appears for, and indexing problems are invisible.
2. **Analytics** — wired and **live**. `MEASUREMENT_ID` in
   `components/analytics.ts` is set, so the tag loads and records.
   `components/analytics.ts` sends a `page_view` on every route change,
   `generate_lead` when the intake form succeeds, `click_phone` / `click_email`
   from a delegated listener that catches those links anywhere on the site, and
   `click_wechat` when the Weixin ID is copied. Blanking `MEASUREMENT_ID` turns
   all of it off and loads no script at all — a half-configured tag is worse
   than none, because it looks like it is recording when it is not.

   The **Website analytics** section of the privacy policy in
   `content/legal.ts` describes exactly this collection, so the two belong in
   the same change in both directions: switching the tag off means softening
   that section, and adding a new event means adding it there.

   Still to do on the Google side: confirm there are no CSP violations in the
   browser console on the deployed site. `script-src` allows
   `*.googletagmanager.com` and `connect-src` allows the `*.google-analytics.com`
   endpoints, which covers a plain GA4 install — but if **Google Signals** is
   enabled on the property, gtag also reaches `stats.g.doubleclick.net`, which
   the policy blocks. Turning Signals off is the better answer than widening the
   policy.
3. **Google Business Profile** — the single biggest factor for "bookkeeper near
   me" style searches, and entirely outside this repo. Nothing on the site can
   substitute for it.
4. **`sameAs`** — the one structured-data field still empty. It is what ties
   this site and the Google Business Profile together as one entity in Google's
   index, and `content/business.ts` has step-by-step instructions for getting
   the URL. The address, coordinates, price band and service areas are all in
   place.
5. **`aggregateRating`** — only once there are real reviews behind it, and only
   with the reviews shown on the page. Two things make inventing them a bad
   trade rather than a shortcut: Google has not rendered review stars from a
   site's own `LocalBusiness` markup since 2019, because self-serving ratings
   were being gamed — so fabricated numbers buy no stars — and structured data
   describing reviews that do not exist risks a manual action against the whole
   property. The stars that do appear next to a local business in search come
   from the Google Business Profile, which counts real reviews. Asking clients
   to leave one there is the route to them.
