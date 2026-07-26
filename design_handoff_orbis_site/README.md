# Handoff: Orbis Accounting — Marketing Site

## Overview

A single-page marketing and lead-generation site for **Orbis Accounting**, a new bookkeeping practice based in West Vancouver, BC, serving all of British Columbia.

The site has one job: get a qualified small-business owner to fill out the intake form. Every section is ordered to move a visitor toward that form. There is no blog, no login, no dashboard, and no e-commerce.

The commercial strategy encoded in this design is worth understanding before you build it, because several choices look unusual and are deliberate:

- **The plans are published in full; the figures are not.** Three named plans, each with its transaction cap and an itemised list of what is and is not included, are laid out on the page. What no longer appears is any figure of ours: no monthly amount, no setup fee, no schema price. Every number reaches the client in the written quote instead. The scope is still ungated — only the pricing is. (Dollar figures that are not ours do remain: the competitor market ranges in FAQ 1 and the CRA's \$30,000 GST registration threshold. Both are deliberate.)
- **There is no "book a call" CTA anywhere.** The single conversion action is an asynchronous intake form. The promise is a written reply within one business day. Do not add a scheduler widget.
- **The page teaches one thing (GST vs PST) in plain language.** This is both a trust device and the main organic-search asset. Keep it as real, indexable text — never an image.
- **There are no testimonials and no client logos.** The practice is new. Fabricated or stock social proof would be worse than none. Trust is instead carried by the QuickBooks certification, the platform strip, and specific commitments.

## About the Design Files

The files in this bundle are **design references created in HTML**. They are prototypes that show intended look, copy, and behavior. **They are not production code to copy directly.**

`Orbis Site.dc.html` is authored in a bespoke internal design-prototyping format. It uses a custom `<x-dc>` element, a `support.js` runtime, `{{ }}` template holes, and `<sc-if>` control-flow tags. **None of that should appear in your implementation.** It is scaffolding for the design tool, not an architecture recommendation. Likewise, the prototype writes all styling as inline `style` attributes and drives its responsive behavior from JavaScript in `applyResponsive()` — both are artifacts of the prototyping environment and both are explicitly *not* what you should ship. See "Things in the prototype you should deliberately not reproduce" below.

Your task is to **recreate this design in the target codebase using its established patterns and libraries.** If the repository already has a framework, component library, styling solution, and deployment path, use them. If the repository is empty or has no web front end yet, choose what best fits the project; for a static marketing page like this one, a static-site or single-page setup with real CSS (Tailwind, CSS modules, or plain modern CSS with custom properties) and a serverless function for the form is more than sufficient. Do not introduce a heavy framework for one page.

## Fidelity

**High fidelity.** Colors, typography, spacing, copy, and interaction behavior are final and should be reproduced faithfully. Every hex value, font size, line height, and letter-spacing in this document is the intended value, taken from the prototype rather than described from memory.

Two exceptions where you should exercise judgment rather than copy:

1. **Responsive breakpoints.** The prototype fakes responsiveness in JavaScript. Reimplement it properly in CSS. The intended behavior is documented under "Responsive behavior."
2. **The mobile layout below 720px has not been visually designed.** The prototype collapses everything to a single column, which is structurally correct but has not been reviewed for type scale or spacing. Build it to the documented rules, then flag it for design review rather than treating it as signed off.

## Target Stack Notes

Requirements the implementation must satisfy regardless of framework:

- **The page must be server-rendered or statically generated.** This is an SEO-driven local-service page. A client-side-only render that ships an empty root is a functional regression. The GST/PST section and the FAQ in particular must be in the initial HTML payload.
- **The FAQ should emit `FAQPage` JSON-LD structured data**, and the site should emit `LocalBusiness` (or `AccountingService`) structured data with the West Vancouver address, the phone number, and `areaServed: British Columbia`. This is not in the prototype and is a deliberate addition for you to make.
- **Semantic heading order must be preserved:** exactly one `<h1>` (the hero), `<h2>` per section, `<h3>` per card. The prototype already follows this.
- The form needs a real backend. See "Form submission" below.

---

## Design Tokens

Define these once as CSS custom properties (or your codebase's token equivalent) rather than repeating literals. The prototype's inline values all resolve to this set.

### Color

| Token | Hex | Usage |
|---|---|---|
| `ink` | `#0A0C0A` | Primary background (near-black, very slightly green) |
| `ink-2` | `#10140F` | Form input background on dark |
| `chart` | `#F3F4EF` | Primary text on dark; background of the light sections (off-white, warm) |
| `green` | `#6DC64F` | Brand accent. Buttons, numerals, key figures, logo ring |
| `green-text` | `#8BD86B` | Accent text on dark backgrounds only — a lifted green that passes contrast where `green` does not |
| `green-dark` | `#3F7A2C` | Accent on light backgrounds only — eyebrows, bullets, primary button fill in the pricing section |
| `slate` | `#7C8379` | Muted text on dark (mono labels, fine print) |
| `slate-light` | `#A6ADA2` | Body text on dark |
| `amber` | `#F0B45A` | Form validation error text |

Text colors used on the light (`#F3F4EF`) sections, which are darker than `slate` to hold contrast:

| Hex | Usage |
|---|---|
| `#0A0C0A` | Headings and primary text |
| `#414A3F` | Section intro paragraphs |
| `#4A5348` | Body copy, FAQ answers |
| `#5A6358` | Muted labels, mono fine print, pricing sub-labels |
| `#6B7469` | Struck-through / excluded feature rows in pricing |

Hairline rules:

| Token | Value | Usage |
|---|---|---|
| `hair` | `rgba(109,198,79,.2)` | Dividers on dark — a low-opacity green, not grey. This is a deliberate brand detail; using neutral grey noticeably flattens the design. |
| `hair-2` | `rgba(243,244,239,.13)` | Form input borders on dark |
| `hair-paper` | `rgba(10,12,10,.16)` | Dividers on the light sections |
| `hair-paper-light` | `rgba(10,12,10,.12)` | Inner divider above pricing feature lists |

### Typography

Three families, loaded from Google Fonts:

- **Instrument Serif** — weight 400, roman and italic. Display only: `h1`, `h2`, the large commitment statement in the Trust section, and the "Got it." confirmation heading. Never used for body copy or UI.
- **Archivo** — weights 400, 500, 600, 700. All body copy, all UI, all card headings, the wordmark.
- **JetBrains Mono** — weights 400, 500. Eyebrows, step numerals, prices, uppercase micro-labels, fine print, phone number. This font carries the "ledger" feel of the brand and is load-bearing; do not substitute a generic monospace.

Body default: `Archivo` 400, `16px`/`1.62`.

Global numeric setting on `body`: `font-variant-numeric: tabular-nums lining-nums`. Prices and figures must align in columns; this is required, not cosmetic.

Type scale as used:

| Role | Spec |
|---|---|
| `h1` (hero) | Instrument Serif 400, `clamp(48px, 7.8vw, 96px)`, line-height `.98`, letter-spacing `-.02em` |
| `h2` (section) | Instrument Serif 400, `clamp(30px, 4.2vw, 50px)`, line-height `1.05`, letter-spacing `-.015em` |
| `h2` (FAQ) | Instrument Serif 400, `clamp(30px, 4vw, 46px)`, line-height `1.05` |
| `h2` (intake) | Instrument Serif 400, `clamp(32px, 4.4vw, 54px)`, line-height `1.03`, letter-spacing `-.02em` |
| Trust commitment | Instrument Serif 400, `27px`/`1.24`, letter-spacing `-.01em` |
| Hero subhead | Archivo 400, `19.5px`/`1.56` |
| Section intro | Archivo 400, `17–18px`/`1.6` |
| Card `h3` | Archivo 600, `16–18px`/`1.3` |
| Card body | Archivo 400, `14.5px`/`1.62` |
| FAQ question | Archivo 600, `16.5px`/`1.4` |
| FAQ answer | Archivo 400, `15px`/`1.65`, max-width `66ch` |
| Eyebrow | JetBrains Mono 500, `11px`/`1.4`, letter-spacing `.16em`, uppercase |
| Micro-label | JetBrains Mono 400, `10.5px`/`1.4`, letter-spacing `.13–.14em`, uppercase |
| Price | JetBrains Mono 500, `40px`/`1`, letter-spacing `-.02em` |
| Tax figure (5% / 7%) | JetBrains Mono 500, `42px`/`1`, letter-spacing `-.02em` |
| Wordmark | Archivo 700, `15px`/`1`, letter-spacing `.24em`, "ORBIS" |

### Layout & spacing

- Content column: `max-width: 1120px`, centered.
- Horizontal page padding: `40px` desktop, `20px` at ≤720px.
- Standard section padding: `104px` top and bottom.
- Hero: `96px` top, `0` bottom.
- Intake section: `104px` top, `112px` bottom.
- Footer: `44px` top, `52px` bottom.
- Header height: `74px`.
- Border radius: `2px` on buttons and inputs. Effectively square — this is intentional. The only circle in the design is the step marker and the logo.
- **There are no box shadows anywhere in this design.** Depth is expressed with hairline rules and the ink/paper contrast. Do not add shadows.

---

## Page Structure

Ten blocks in this order. The order is the argument: problem, differentiation, offer, process, price, education, proof, objections, action.

1. Sticky header
2. Hero + trust strip
3. Where it usually stands (four pains)
4. Why Orbis (four differentiators)
5. What we handle (six services + platform marquee)
6. How it works (three steps)
7. Plans (three tiers + one-time work + fine print)
8. GST vs PST explainer
9. Trust (certification, industries, commitment)
10. FAQ
11. Intake form
12. Footer

Sections alternate ink and paper backgrounds. On `#F3F4EF`: Why Orbis, Plans, FAQ. Everything else is on `#0A0C0A`. Two background colors total for the whole page — do not add a third.

---

## Screens / Views

### 1. Sticky header

**Purpose:** persistent access to the CTA during a long scroll.

**Layout:** `position: sticky; top: 0; z-index: 60`, background `ink`, `1px` bottom border in `hair`. Inner row `max-width 1120px`, `padding: 0 40px`, `height: 74px`, flex, `align-items: center`, `gap: 40px`.

⚠️ **Implementation warning:** an ancestor of the header must not have `overflow-x: hidden`. That silently disables `position: sticky` in every browser. The prototype hit this bug; the fix was `overflow-x: clip` on the page wrapper, which clips overflow without creating a scroll container. Preserve that, or remove the wrapper's overflow rule entirely.

**Components, left to right:**

- **Logo lockup** — links to `#top`. A `25×25` SVG plus the wordmark, `gap: 11px`, color `chart`.
- **Nav** — pushed right with `margin-left: auto`, `gap: 30px`. Links: Services (`#services`), Plans (`#pricing`), Questions (`#questions`). Archivo 500 `13.5px`, color `slate-light`, hover to `chart`.
- **CTA button** — "Get a plan and a quote", links to `#start`. Background `green`, text `ink`, Archivo 600 `13.5px`, padding `12px 20px`, radius `2px`, `white-space: nowrap`.

**The logo mark** is three circles and should be inlined as SVG, not shipped as a raster image. On a `0 0 40 40` viewBox:

```
circle cx=20 cy=20 r=18   fill=#6DC64F   (green disc)
circle cx=22.5 cy=20 r=13.4 fill=#0A0C0A (ink disc, offset right — creates a crescent)
circle cx=7.6 cy=20 r=4.1 fill=#FFFFFF  (white satellite dot in the crescent)
```

The white satellite dot is the brand's core motif and reappears as bullets and step markers. It is pure white `#FFFFFF`, not `chart`. Used at three sizes: `25px` in the header, `34px` in the form confirmation, `22px` in the footer.

---

### 2. Hero

**Purpose:** state what the business does, for whom, where, and make the first CTA.

**Layout:** single column, `max-width: 1120px`, `padding: 96px 40px 0`.

> **Design history worth knowing:** this hero previously had a decorative circular "month close" dial in a right-hand column. It was removed because the arc read as *incomplete*, the tick marks read as deadline pressure, and the largest word in it was "Closed" — which on a business homepage reads as *closed for business*. Do not reintroduce a decorative graphic here. If a visual is added later it should be a real monthly-close timeline with committed dates, which is a pending business decision, not a design one.

**Components, top to bottom:**

1. **Eyebrow** — "Bookkeeping for BC small business · West Vancouver, BC". JetBrains Mono 500 `11px`, letter-spacing `.16em`, uppercase, color `green-text`, `margin-bottom: 26px`. This line is doing local-SEO work; keep the city name in it.
2. **H1** — two lines: "Clean books," then "filed on time." on a `<br>`. The second line is wrapped in `<em>` with `font-style: italic` and color `green`. `margin: 0 0 30px`, `text-wrap: pretty`.
3. **Subhead** — Archivo 400 `19.5px`/`1.56`, color `slate-light`, `max-width: 56ch`: "GST to the CRA, PST to the province, and monthly reports you can actually read. The same person does your books every month, so you are never re-explaining your business."
4. **CTA row** — flex, wrap, `align-items: center`, `gap: 22px`, `margin-top: 40px`.
   - Primary button: "Get a plan and a quote" → `#start`. Background `green`, text `ink`, Archivo 600 `15px`, padding `17px 28px`.
   - Reassurance microcopy beside it: "A written plan and a price within one business day". JetBrains Mono 400 `11px`, letter-spacing `.11em`, uppercase, color `slate`, `max-width: 22ch`.

**Trust strip** — directly below, `max-width 1120px`, `margin-top: 76px`, `1px` top and bottom borders in `hair`, `padding: 24px 0`. Four equal columns, `gap: 24px 44px`. Each cell is a mono uppercase micro-label in `slate` (`margin-bottom: 7px`) above a two-line Archivo 500 `13.5px`/`1.35` value in `chart`:

| Label | Value |
|---|---|
| Certified | QuickBooks Online / Advanced ProAdvisor |
| Based in | West Vancouver, BC / Serving all of BC |
| Sales tax | GST and PST / both filed |
| Terms | Contract based / term set per client |

The "Terms" cell is legally load-bearing. It must not say "month to month" or "no contract" — engagements are contract-based with the term set per client. This wording appears in two places (here and the pricing fine print) and both must agree.

---

### 3. Where it usually stands

**Purpose:** pain mirroring. Let the visitor recognize themselves before any offer is made.

**Layout:** `padding: 104px 40px`. Intro block, then a four-column grid, `gap: 32px`, `margin-top: 64px`.

**Intro:** eyebrow "Where it usually stands" → h2 "Four things you are probably already living with." (`max-width: 22ch`) → paragraph, Archivo 400 `18px`, `slate-light`, `max-width: 60ch`: "The books are the one part of running a business that nobody set up for you."

**Cards:** each has a `1px` top border in `hair`, `padding-top: 20px`, a mono numeral (`01`–`04`, JetBrains Mono 500 `11px`, letter-spacing `.13em`, color `green-text`, `margin-bottom: 14px`), an Archivo 600 `16px` heading, and `14.5px` body in `slate-light`.

| # | Heading | Body |
|---|---|---|
| 01 | Receipts everywhere | Shoeboxes, inbox attachments, and a spreadsheet you stopped updating in March. |
| 02 | Two sales taxes | GST to the CRA, PST to the BC Ministry of Finance. Two registrations, two deadlines, two sets of rules. |
| 03 | Evenings gone | Ten hours a month on categorization instead of on the work that actually pays. |
| 04 | No clear picture | You know what is in the bank. You do not know what your margin is. |

---

### 4. Why Orbis

**Purpose:** differentiation. Answer "why you and not the firm down the road."

**Layout:** background `chart`, text `ink`, `padding: 104px 40px`. Two columns `1fr 1.15fr`, `gap: 80px`, `align-items: start`.

**Left:** eyebrow "Why Orbis" in `green-dark` → h2 "Narrow on purpose." → paragraph Archivo 400 `17px`, color `#414A3F`, `max-width: 40ch`: "Bookkeeping for BC businesses is the only thing we do. No tax planning sideline, no other provinces, no work we are learning on your file."

> This line previously read "Most firms list five platforms and fifteen industries. That is a promise nobody can keep well." It was rewritten because the page now advertises three platforms and six industries, so the original argued against its own page. If you change platform or industry counts anywhere, re-check this paragraph.

**Right:** four rows. Each row has a `1px` top border in `hair-paper` (the last also has a bottom border), `padding: 20px 0 24px`, and a `34px 1fr` grid with `gap: 18px`.

The left cell of each row is an **18×18 SVG "satellite" bullet** on a `0 0 24 24` viewBox, `margin-top: 4px`: an outer ring (`cx=12 cy=12 r=11`, no fill, stroke `green-dark`, `stroke-width: 1.5`) and a solid center dot (`r=3.5`, fill `green-dark`). This is the logo motif reused as a list bullet — keep it as SVG, do not substitute a checkmark icon.

Right cell: Archivo 600 `17px` heading, `margin-bottom: 7px`; Archivo 400 `15px`/`1.6` body in `#4A5348`.

| Heading | Body |
|---|---|
| QuickBooks Online, Xero or Sage 50 | We work in all three and connect Shopify and Stripe into whichever one you use. If you are on spreadsheets, we migrate you. |
| Built for BC, not for Canada in general | GST and PST both filed. WorkSafeBC and CRA deadlines tracked so you are not the one remembering them. |
| One person does your books every month | You are not re-explaining your business to a new name each quarter. Nothing gets re-learned. |
| Fixed monthly price, no hourly billing | You know the number before you start. A messy month does not turn into a surprise invoice. |

---

### 5. What we handle

**Purpose:** scope. Show the work is comprehensive without listing forty services.

**Layout:** `padding: 104px 40px`. Intro (`max-width: 56ch`): eyebrow "What we handle" → h2 "Six things, off your desk."

**Service grid:** `margin-top: 60px`, three columns, `gap: 1px`, with the grid container's background set to `hair` and each cell's background set to `ink`. The 1px gap plus contrasting container background produces hairline dividers between cells with no borders on the cells themselves. Cell padding `32px 30px 34px`. Each cell: mono numeral in `slate` with `margin-bottom: 34px`, Archivo 600 `17px` heading, `14.5px` body in `slate-light`.

| # | Heading | Body |
|---|---|---|
| 01 | Monthly bookkeeping | Bank and credit card reconciliation, every transaction categorized, books closed each month. |
| 02 | GST and PST filing | Both returns prepared and filed on schedule. GST to the CRA, PST to the province. |
| 03 | Payroll and T4s | Staff paid on time, source deductions remitted, T4s and ROEs handled at year end. |
| 04 | Financial reporting | A profit and loss and a balance sheet each month, in plain language, with the numbers that matter marked. |
| 05 | Software setup and migration | QuickBooks Online, Xero or Sage 50. Chart of accounts, bank feeds, Shopify and Stripe connected, one training session with you. |
| 06 | Catch-up bookkeeping | Months or years behind is the most common reason people call. We clear the backlog first, then start monthly. |

Card 06 carries a **"Most common" tag** in place of a bare numeral: the numeral and tag sit in a flex row with `justify-content: space-between`. The tag is JetBrains Mono 500 `9.5px`, letter-spacing `.14em`, uppercase, color `green-text`, `1px` border in `hair`, `padding: 5px 8px`.

**Platform marquee** — below the grid: `margin-top: 56px`, `1px` top border in `hair`, `padding-top: 28px`, flex column, `align-items: flex-start`, `gap: 22px`. A "Works with" micro-label, then the marquee.

Marquee construction:

- Outer: `width: 100%`, `overflow: hidden`, with a symmetric edge fade via `mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)` (include the `-webkit-` prefix).
- Track: `display: flex`, `width: max-content`, `animation: orbMarquee 60s linear infinite`.
- Keyframe: `@keyframes orbMarquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`.
- The track contains **two identical halves**, the second `aria-hidden="true"`. Because the animation translates by exactly `-50%`, the loop is seamless only if the halves are byte-identical in width.
- Each half contains the five logos **twice** (ten images per half, twenty total). This is not redundancy — one pass of five logos is narrower than a wide viewport, which leaves a visible gap scrolling through on every cycle. Each half must be wider than the widest supported viewport.
- Logos: `opacity: .5`, `flex: none`, `display: block`, `gap: 80px` with matching `padding-right: 80px` on each half.
- Only the first half's images carry real `alt` text; every duplicate has `alt=""`.

Per-logo heights are individually tuned for **optical** balance, not set to a single value. Use these exactly:

| Logo | Height |
|---|---|
| QuickBooks | `30px` |
| Xero | `33px` |
| Sage 50 | `27px` |
| Shopify | `25px` |
| Stripe | `23px` |

---

### 6. How it works

**Purpose:** remove friction by showing the process is short and involves no sales call.

**Layout:** `padding: 104px 40px`, `1px` top border in `hair`. Intro (`max-width: 52ch`): eyebrow "How it works" → h2 "Three steps, and no sales call." Then three columns, `gap: 44px`, `margin-top: 64px`.

Each step: a `52×52` circular marker (`border-radius: 50%`, `1px` border in `hair`, flex-centered) containing a JetBrains Mono 500 `15px` numeral in `green`, `margin-bottom: 26px`. Then Archivo 600 `18px` heading and `15px`/`1.62` body in `slate-light`.

| # | Heading | Body |
|---|---|---|
| 1 | Tell us about your business | Fill out the form at the bottom of this page. Ten short questions, about three minutes. |
| 2 | Get a plan and a quote | Within one business day you get a written scope and a fixed monthly price. In writing, so you can compare it to anyone else. |
| 3 | We take it from here | We connect to your accounting software, clear any backlog, and close your books every month from then on. |

---

### 7. Plans

**Purpose:** the differentiator. Published, fixed, comparable *scope*. No figures — those come in the quote. The section keeps `id="pricing"` so existing inbound links and the `/pricing` redirect stay good.

**Layout:** background `chart`, text `ink`, `padding: 104px 40px`. Intro (`max-width: 58ch`): eyebrow "Plans" in `green-dark` → h2 "Scoped by how much work there is." → paragraph `17px` in `#414A3F`: "Pick the plan that matches your transaction volume. If you are not sure, guess low and we will tell you in the quote."

**Tier grid:** three columns, `gap: 28px`, `margin-top: 60px`, `align-items: start`.

Each tier: `1px` top border in `hair-paper` and `padding-top: 26px` — **except the middle tier**, which is emphasized with a `2px` top border in `green-dark` and `padding-top: 25px` (one pixel less, so the content baseline stays aligned across all three). Do not lose that 1px compensation.

Structure inside each tier:

1. Name row — Archivo 600 `17px`. The middle tier adds a right-aligned "Most chosen" tag: JetBrains Mono 500 `9.5px`, letter-spacing `.14em`, uppercase, `green-dark`, `white-space: nowrap`.
2. Audience line — Archivo 400 `13.5px`, `#5A6358`, `margin-bottom: 18px`.
3. Volume cap — JetBrains Mono 500 `11px`, letter-spacing `.1em`, uppercase, `ink`, `margin-bottom: 26px`. With no monthly figure above it, the cap is what separates the tiers, so it is set in the ink colour rather than the muted one.
4. Feature list — `list-style: none`, flex column, `gap: 11px`, `1px` top border in `hair-paper-light`, `padding-top: 22px`. Each item is a `16px 1fr` grid with `gap: 11px`. **Included** features use a `·` marker in `green-dark`. **Excluded** features use a `—` marker and the whole row is set in `#6B7469`.
5. CTA → `#start`, full width, `text-align: center`, `margin-top: 28px`, `padding: 14px`, Archivo 600 `14px`. Outer tiers: transparent with a `1px` `ink` border and `ink` text. Middle tier: filled `green-dark` with `chart` text.

| | Foundation | Standard | Complete |
|---|---|---|---|
| Audience | Sole proprietors with simple books | Established small businesses | Businesses with staff on payroll |
| Cap | Up to 50 transactions a month | Up to 150 transactions a month | Up to 400 transactions a month |
| Features | · Bank and credit card reconciliation<br>· Transaction categorization<br>· Monthly profit and loss, balance sheet<br>— GST and PST filing<br>— Payroll and T4s | · Everything in Foundation<br>· GST filing to the CRA<br>· PST filing to the BC Ministry of Finance<br>· Sales channels reconciled: Shopify, Stripe<br>— Payroll and T4s | · Everything in Standard<br>· Payroll, source deductions, T4s and ROEs<br>· Accounts payable managed<br>· WorkSafeBC reporting<br>· Quarterly review call |

**One-time work + fine print** — below the tiers: `margin-top: 56px`, `1px` top border in `hair-paper`, `padding-top: 32px`, three equal columns, `gap: 40px`, `align-items: start`. Each column has a mono uppercase micro-label in `#5A6358` (`margin-bottom: 14px`).

| Label | Content |
|---|---|
| One-time work | **Catch-up bookkeeping** — Quoted after we see how far behind you are. One number, agreed before any work starts. |
| One-time work | **Software setup and migration** — Quoted once, on QuickBooks Online, Xero or Sage 50. Chart of accounts, bank feeds, integrations, and one training session. |
| The fine print | All plans are contract based, with the term set per client. Every plan is a fixed monthly figure, quoted in writing before any work starts, in CAD plus GST. No hourly billing. Over 400 transactions a month, ask and we will quote it. |

Three pricing rules that matter commercially:

- **None of our own figures appear anywhere on the site.** Not in the tiers, not in the one-time work, not in the meta description, not in the `Offer` structured data. Both one-time items read "Quoted"; the monthly plans carry a transaction cap and nothing else. This is a deliberate reversal of the earlier published-price strategy — do not reintroduce a figure without being asked to. The competitor ranges in FAQ 1 stay, because they are market context rather than our price.
- **Catch-up bookkeeping must never carry a published per-month figure.** An earlier draft said "\$150 per month of backlog" and it was removed deliberately, here and in the FAQ. Backlog work varies too much to price sight-unseen. The same reasoning now applies to every plan.
- The fine print must say **contract based with the term set per client**, matching the hero trust strip. It must not say "no contract."

The fine-print paragraph is entirely JetBrains Mono `13px`/`1.6`. The `.amount` mono span that used to set the one-time figure is gone with it.

---

### 8. GST vs PST explainer

**Purpose:** the page's one teaching moment, and its main organic-search asset. Demonstrates competence by being useful for free.

**Layout:** `padding: 104px 40px`. Two columns `1fr 1.2fr`, `gap: 80px`, `align-items: start`.

**Left:** eyebrow "In plain terms" → h2 "GST and PST are two different taxes." → paragraph Archivo 400 `16.5px` in `slate-light`: "This is the thing that catches out almost every business owner in BC."

**Right:** two cells, `gap: 1px` on a `hair` container background with `ink` cells (same hairline technique as the service grid), `padding: 30px 28px 32px`. This pair **stacks to one column early, at ≤1060px** rather than at the usual 720px, because the side-by-side comparison becomes unreadable before then. In the prototype this is flagged with a `data-stack-early` attribute; reimplement it as its own media query.

Each cell: a large mono percentage in `green` (`42px`, `margin-bottom: 18px`), Archivo 600 `16px` name, a mono uppercase authority line in `slate` (`margin-bottom: 16px`), then `14.5px`/`1.6` body in `slate-light`.

| | GST | PST |
|---|---|---|
| Figure | 5% | 7% |
| Authority | Goes to the CRA | Goes to the province |
| Body | Federal. You generally must register once you pass \$30,000 in revenue over four quarters. You charge it on most sales and you claim back the GST you paid on business purchases. | Provincial, and separate. Different registration, different deadlines, and a different list of what is taxable. Many services are exempt while most goods are not. There is no input credit to claim back. |

**Footnote** — `margin-top: 36px`, `1px` top border in `hair`, `padding-top: 24px`, Archivo 400 `15px`/`1.65` in `slate-light`, `max-width: 78ch`: "If you have only ever registered for one of the two, you are not unusual, and it is fixable. Say so in the form and we will check both in the quote. Rates current as of July 2026."

⚠️ **Keep the "Rates current as of July 2026" stamp, and make it easy to update.** Published tax rates without a date stamp are a liability. Ideally source the date from a single constant or CMS field rather than hard-coding it in markup.

---

### 9. Trust

**Purpose:** third-party validation for a practice with no client list yet.

**Layout:** `padding: 104px 40px`, `1px` top border in `hair`. Three equal columns, `gap: 56px`, `align-items: start`. Each column opens with an eyebrow in `green-text`.

**Column 1 — "Certification":** a `1px` `hair` bordered box, `padding: 18px`, `margin-bottom: 16px`, containing the badge image at `width: 100%`, `height: 150px`, `object-fit: contain`. Below it, `14.5px` body in `slate-light`: "QuickBooks Online Advanced ProAdvisor, the certification level above the standard one. We work in Xero and Sage 50 as well."

⚠️ **The badge asset is not in this bundle.** The prototype uses an empty drop-slot placeholder. Get the official Intuit-issued Advanced ProAdvisor badge from the client before launch. Do not recreate it in SVG or CSS — certification marks have usage rules and must be the issued file. Ship with the bordered box holding a neutral placeholder rather than a broken image.

**Column 2 — "Who we work with":** an unstyled `ul`; each `li` has a `1px` top border in `hair` (last item also bottom), `padding: 13px 0`, Archivo 400 `15px`/`1.4`. Items: Construction and trades; Restaurants and food service; Retail and e-commerce; Professional services; Health and wellness; Import and distribution.

Note the intake form's Industry dropdown carries the same list **plus "Real estate" and "Other."** That asymmetry is intentional — the displayed list is the target market, the form list is what people actually select.

**Column 3 — "What we commit to":** the commitment in Instrument Serif `27px`/`1.24`, color `chart`, `margin-bottom: 18px`: "Every enquiry gets a written plan and a price within one business day." Then `14.5px` in `slate-light`: "If we cannot help, we will say so in that reply rather than book a call to tell you."

> A paragraph disclosing that the practice is new and has no testimonials was removed from this column. It was honest but it announced zero clients at the moment of peak buying intent. When real testimonials exist they belong here, with real names. Until then, leave the column as-is — do not add stock quotes, star ratings, or "trusted by" counts.

---

### 10. FAQ

**Purpose:** handle objections without a phone call, and capture long-tail search.

**Layout:** `id="questions"`, background `chart`, text `ink`, `padding: 104px 40px`. Two columns `.8fr 1.4fr`, `gap: 80px`, `align-items: start`.

**Left:** eyebrow "Questions" in `green-dark` → h2 "The ones people actually ask." → paragraph `16px` in `#414A3F`: "If yours is not here, put it in the form and we will answer it in the reply."

**Right:** native `<details>`/`<summary>` accordions — no JavaScript. Each `details` has a `1px` top border in `hair-paper`; the last also has a bottom border. Summary: `padding: 22px 40px 22px 0`, Archivo 600 `16.5px`/`1.4`, `position: relative`, with an absolutely positioned `+` at `right: 0; top: 22px` in JetBrains Mono `15px`, color `green-dark`. Default markers are removed via `list-style: none` and `summary::-webkit-details-marker { display: none }`, and `cursor: pointer` is set.

Answers: Archivo 400 `15px`/`1.65`, `#4A5348`, `margin: 0 0 24px`, `max-width: 66ch`.

**Two improvements to make while implementing:**
1. Swap the static `+` for a `+`/`−` toggle driven by `details[open]`, and animate the accordion open. Keep it CSS-only.
2. Emit `FAQPage` JSON-LD from this content.

Questions and answers, in order:

1. **How much does a bookkeeper cost in Vancouver?** — "Local firms billing hourly are usually \$75 to \$150 an hour, which lands most small businesses between \$600 and \$2,000 in a typical month. Flat monthly plans in this market run roughly \$300 to \$2,000 depending on volume. We work on a fixed monthly plan rather than hourly billing. Tell us your transaction volume and what you need filed, and your number comes back in writing within one business day."
2. **What is the difference between a bookkeeper and an accountant, and which do I need?** — "A bookkeeper handles the day to day: receipts, categorization, reconciliation, payroll, GST and PST remittances, and your monthly reports. An accountant steps in for corporate tax returns and higher level planning. Most BC small businesses work with a bookkeeper all year and bring in an accountant at year end. We hand your accountant a clean, closed set of books, which makes their bill smaller."
3. **Do I have to register for PST in BC?** — "It depends on what you sell, not just on how much. Most businesses selling goods in BC need to register. Many service businesses do not. Because PST is separate from GST, plenty of owners register for one and not the other without realising. Tell us what you sell and we will confirm both in your quote."
4. **What if my books are a year behind?** — "That is the most common reason people get in touch. We look at how far behind you are and quote the catch-up as one number before starting. We clear it, file whatever is outstanding, then start the monthly plan from a clean position. You are not the first and there is no lecture."
5. **Do you work with businesses outside West Vancouver?** — "Yes. We are based in West Vancouver and work with businesses across British Columbia. Everything is done online, so there is nothing to drop off and no office visit required."
6. **Do I need to use QuickBooks Online?** — "No. We work in QuickBooks Online, Xero and Sage 50, so you can stay on whichever one you already use. If you are on Wave, spreadsheets or nothing at all, we will recommend one and the migration is part of setup. Shopify and Stripe connect to all three, so your sales reconcile automatically."
7. **How do I switch from my current bookkeeper?** — "You give us access to your accounting file and we take it from the next month. You do not need to have an awkward conversation first, and you do not need to move anything yourself. If the handover reveals problems in the existing books, we will tell you what we found before doing extra work."

Question 1 names competitor price ranges. Those are market figures as of mid-2026 and will drift; treat them as content the client can edit, not as hard-coded copy.

---

### 11. Intake form

**Purpose:** the only conversion point on the site.

**Layout:** `id="start"`, `padding: 104px 40px 112px`, `scroll-margin-top: 74px` (matches header height so anchor jumps do not hide the heading behind the sticky bar — keep this). Two columns `.85fr 1.15fr`, `gap: 80px`, `align-items: start`.

**Left column:** eyebrow "Get a plan and a quote" → h2 "Tell us where things<br>actually stand." → paragraph `17px` in `slate-light`, `max-width: 44ch`: "About three minutes. No sales call, and nothing gets set up until you say yes." Then a contact block: `1px` top border in `hair`, `padding-top: 24px`, flex column, `gap: 14px`, with two labeled items — "Or email us directly" → `info@orbisaccounting.ca` (mailto link, Archivo 500 `15px`) and "Phone" → `604-203-7799` (JetBrains Mono 500 `15px`, color `chart`, not a link in the prototype — **make it a `tel:` link**, since a meaningful share of traffic will be mobile).

**Right column:** the form in a `1px` `hair` bordered container, `padding: 36px 34px 38px`. Three `fieldset`s, each with a mono uppercase `legend` in `slate` (`margin-bottom: 20px`). Fieldsets two and three have a `1px` top border in `hair` and `padding-top: 26px`.

All inputs and selects: `width: 100%`, background `ink-2`, `1px` border in `hair-2`, radius `2px`, `padding: 12px 13px`, `font-size: 15px`, inheriting color. Labels above fields: JetBrains Mono 500 `12px`, letter-spacing `.06em`, color `slate-light`, `margin-bottom: 8px`. Placeholder color `#6E756B`. Fields sit in a two-column grid, `gap: 18px`.

**Fieldset 1 — "Your details"**

| Field | Name | Type | Required | Placeholder |
|---|---|---|---|---|
| Full name | `name` | text | yes | Jordan Reyes |
| Email | `email` | email | yes | you@company.ca |
| Business name | `business` | text | yes | Reyes Contracting Ltd. |
| Phone *(optional)* | `phone` | tel | no | 604-555-0134 |

The Phone label renders "optional" inline in `slate`. Only four fields are required; keep it that way.

**Fieldset 2 — "Your books"** (all selects, all optional)

| Field | Name | Options |
|---|---|---|
| Business structure | `structure` | Sole proprietor / Incorporated / Partnership / Not sure |
| Transactions a month | `volume` | Under 50 / 50 to 150 / 150 to 400 / Over 400 / Not sure |
| Registered for GST | `gst` | Yes / No / Not sure |
| Registered for PST | `pst` | Yes / No / Not sure |
| Software you use now | `software` | QuickBooks Online / Xero / Sage 50 / Wave / Spreadsheets / Nothing yet |
| How current are the books | `behind` | Up to date / 1 to 3 months behind / 3 to 12 months behind / Over a year behind |
| Industry *(full width)* | `industry` | Construction and trades / Restaurants and food service / Retail and e-commerce / Professional services / Health and wellness / Real estate / Import and distribution / Other |

Every subjective question offers "Not sure." That is deliberate — it stops uncertainty from becoming abandonment. Preserve those options.

The `volume` options map directly onto the pricing tier caps, and `behind` identifies catch-up work. Together they let the quote be written without a call. If you wire this to a CRM, these are the two fields worth mapping first.

**Fieldset 3 — "In your words"**

A full-width `textarea` named `notes`, `rows="3"`, `resize: vertical`, Archivo family, label "What is the main thing you need help with right now", placeholder "Two years of receipts in a box and a GST return I have not filed."

Also in this fieldset: a **honeypot** — a wrapper with `position: absolute; left: -9999px` and `aria-hidden="true"`, containing a label "Do not fill this in" and `<input name="company_url" tabindex="-1">`. If it has any value on submit, silently abort without an error message. Keep this and add server-side spam handling too.

**Submit:** full-width button, `margin-top: 26px`, background `green`, no border, radius `2px`, `padding: 17px`, Archivo 600 `15px`, color `ink`, `cursor: pointer`. Label "Send my details".

**Below submit:** JetBrains Mono 400 `11.5px`/`1.6` in `slate`: "We reply within one business day. Your details are used to write your quote and nothing else. No newsletter, no mailing list."

**Validation** — client-side, on submit, with `preventDefault`. `noValidate` is set so native bubbles are suppressed in favor of custom messages. One message at a time, shown above the submit button in `#F0B45A`, Archivo 500 `13.5px`. Order and exact strings:

1. Honeypot filled → return silently, no message, no submit.
2. Empty name → "We need a name to address the reply to."
3. Empty business → "What is the business called? It goes on the quote."
4. Email empty, or `@` at index < 1, or `.` at index < 3 → "That email address does not look right. Check for a typo?"

The email test is deliberately loose. Do not replace it with a strict regex; false rejections on valid addresses cost leads. Server-side, validate by attempting delivery rather than by pattern.

**Success state** — replaces the form entirely in the same container: `1px` `hair` border, `padding: 44px 40px 48px`. The `34px` logo SVG (`margin-bottom: 26px`), then Instrument Serif `32px` heading "Got it.", then `16.5px` in `slate-light`, `max-width: 52ch`: "You will hear back within one business day with a written plan and a fixed monthly price. It comes from info@orbisaccounting.ca, so add that address if your inbox is strict." Then a "Send another" secondary button: transparent, `1px` `hair` border, `padding: 12px 20px`, Archivo 600 `13.5px`, `chart` text.

After switching to the success state, the page scrolls to `#start` offset by `-90px` after a `40ms` delay, so the confirmation is in view rather than left below the fold.

**Form submission — the main thing to build.** The prototype has no backend; it only flips local state. You need to:

- POST to a real endpoint (serverless function, form service, or existing app route).
- Email the submission to `info@orbisaccounting.ca` with a subject that includes the business name, so the one-business-day promise is operationally possible.
- Send no autoresponder that would pre-empt the human reply. The promise is a *written plan*, not a receipt. A bare "we got it" email is acceptable; a templated marketing sequence is not.
- Handle failure visibly. Add a fifth error path for network/server failure using the same amber message style — something like "That did not send. Try again, or email info@orbisaccounting.ca directly." A silently dropped lead is the worst outcome on this page.
- Keep entered values on failure. Do not clear the form.
- Add `autocomplete` attributes (`name`, `email`, `organization`, `tel`) — missing from the prototype.

---

### 12. Footer

**Layout:** `1px` top border in `hair`, `padding: 44px 40px 52px`. Inner row `max-width 1120px`, flex, wrap, `align-items: center`, `gap: 24px 40px`.

Left: the `22px` logo lockup linking to `#top`, with the wordmark at Archivo 700 `13px`, letter-spacing `.24em`. Beside it, JetBrains Mono `12.5px` in `slate`: "Bookkeeping for BC small business · West Vancouver, BC".

Right (`margin-left: auto`, flex, wrap, `gap: 24px`): the email as a mailto link, "Plans" → `#pricing`, "Questions" → `#questions` (both `13px` in `slate-light`), and "© 2026 Orbis Accounting" in JetBrains Mono `12.5px` in `slate`.

**Missing and needed before launch:** a privacy policy link. The form collects business and contact data and the copy makes a data-use claim ("used to write your quote and nothing else"), so that claim should be backed by a real page. Flag this to the client.

---

## Interactions & Behavior

### Scroll reveal

The one substantial motion treatment. Elements marked for reveal start at `opacity: 0` and `translateY(18px)`, and transition to `opacity: 1` / `translateY(0)` over `.8s` with `cubic-bezier(.16, 1, .3, 1)` when they enter the viewport.

Rules that make it feel intentional rather than gratuitous:

1. **Anything already above the fold on load is never hidden.** The prototype measures against `window.innerHeight * 0.92` at init and skips those elements entirely. Without this the hero flashes empty on load — the single most common way this effect goes wrong.
2. Trigger with `IntersectionObserver` at `threshold: 0.1`, `rootMargin: '0px 0px -6% 0px'`.
3. `unobserve` after firing. Reveals happen once; nothing re-hides on scroll up.
4. **Stagger within groups.** Sibling cards carry increasing delays. Grids of four use `0 / 90 / 180 / 270ms`; the six-card service grid uses `0 / 70 / 140` and repeats per row; the three-step grid uses `0 / 120 / 240ms`; pricing tiers use `0 / 110 / 220ms`.
5. **`prefers-reduced-motion: reduce` disables all animation and transition**, including the marquee. The prototype does this globally in CSS *and* checks it in JS before setting up the observer. Do both — CSS alone would leave elements stuck at `opacity: 0` if the JS path had hidden them.

Reveal is applied at section-intro level and per card, not to every element.

### Anchor scrolling

`html { scroll-behavior: smooth }`, with all nav and CTA links as plain in-page anchors. `#start` has `scroll-margin-top: 74px` to clear the sticky header. Any other section you add as a nav target needs the same.

### Focus and selection

- `:focus-visible { outline: 2px solid #8BD86B; outline-offset: 3px }` — keep this; the green on ink is the only accessible focus treatment in the palette.
- `::selection { background: #6DC64F; color: #0A0C0A }`.
- Links default to `#8BD86B` and go to `#F3F4EF` on hover. Note this pairing is tuned for the dark sections; check link contrast if you add links inside the light sections.

### Hover states

The prototype under-specifies these because inline styles make them awkward. Add them properly:

- Buttons: slight lift in background lightness, no transform, no shadow.
- Nav links: `slate-light` → `chart`.
- FAQ summaries: whole row clickable with a visible hover on the question text.
- Pricing CTAs: outer tiers fill on hover; middle tier darkens slightly.

Keep transitions short (`120–180ms`) and confined to color. This design has no lifting, scaling, or glowing anywhere.

### Responsive behavior

Reimplement in CSS. Intended behavior:

**≤1060px (tablet):**
- Four-column grids → two columns.
- Three-column grids → two columns.
- The GST/PST pair → **one column** (the early-stack exception).
- Two-column section splits (Why Orbis, FAQ, intake) → keep two columns but expect them to be tight; consider stacking the intake form here.

**≤720px (mobile):**
- Everything → one column.
- Horizontal padding `40px` → `20px` throughout, including header and footer.
- Header: the nav links likely need to collapse. Not designed yet — the honest minimum is logo + CTA button only, with nav links dropped, since all three targets are reachable by scrolling. Do not build a hamburger drawer for three anchors.
- Hero `h1` bottoms out at `48px` via the `clamp`; verify it does not overflow at 320px.
- The marquee should keep running; its edge mask percentages hold at any width.
- Pricing tiers stack in order Foundation → Standard → Complete. Consider leading with Standard on mobile since it is the intended default, but that is a design decision to raise, not to make unilaterally.

**Above 1120px:** the content column is capped; the page simply centers. No wide-screen treatment.

### State Management

Genuinely minimal. Two pieces of state, both local to the form:

| State | Type | Initial | Transitions |
|---|---|---|---|
| `sent` | boolean | `false` | `true` on successful submit; back to `false` via "Send another" |
| `err` | string | `''` | Set to a validation message on failed submit; cleared on successful submit and on reset |

No routing, no global store, no data fetching on load. The only network call is the form POST. Do not introduce a state library for this.

The prototype additionally carries theme props (accent color, motion level, typography persona) that drive CSS custom properties at runtime. **That is prototyping machinery for exploring directions — do not port it.** Ship the single chosen direction: Instrument Serif display, `#6DC64F` accent, moderate motion.

---

## Things in the prototype you should deliberately not reproduce

Listed explicitly because copying them would be a reasonable mistake:

1. **Inline styles on every element.** An artifact of the prototyping environment. Use the codebase's styling solution and the token table above.
2. **JavaScript-driven responsive layout** (`applyResponsive()` rewriting `gridTemplateColumns` and `padding` on resize). Use media queries.
3. **Runtime theme props** (`personality`, `motion`, `circleMotif`, `accent`, `greenAmount`) and the color-math helpers that derive `green-text` / `green-dark` / hairline alphas from a base hex. Those derived values are now fixed; use the literals in the token table.
4. **The `<x-dc>` / `support.js` / `{{ }}` / `<sc-if>` scaffolding.** Not a framework, not portable.
5. **`document.documentElement.style.setProperty` calls at mount** to install custom properties. Declare them in CSS on `:root`.
6. **The `data-screen-label`, `data-reveal`, `data-delay`, `data-stack-early` attributes** as-is. `data-reveal` / `data-delay` are a reasonable pattern to keep if it suits you; `data-screen-label` is design-tool metadata and should be dropped.
7. **The `.dc.html` file as a starting template.** Read it for reference; build fresh.

---

## Assets

In `assets/` in this bundle:

| File | Content |
|---|---|
| `logo-quickbooks.png` | QuickBooks wordmark, white, transparent |
| `logo-xero.png` | Xero mark, white, transparent |
| `logo-sage50.png` | Sage 50 wordmark, white, transparent |
| `logo-shopify.png` | Shopify wordmark, white, transparent |
| `logo-stripe.png` | Stripe wordmark, white, transparent |

**Provenance and a caveat.** These were supplied as screenshots with baked-in backgrounds (Sage on a dark gradient, Xero as white type on a cyan disc, the rest as dark type on white). They were processed for this design: backgrounds knocked out to transparency by luminance threshold, all marks normalized to solid white, each trimmed to its true bounding box, and a stray "Online" second line cropped off the QuickBooks lockup. They are raster, derived from screenshots, and they are adequate at the `23–33px` display heights specified — **but they are not production-grade.**

Before launch, replace all five with official SVG or high-resolution transparent PNG from each vendor's brand or press page. Two reasons: raster logos at `2×` on retina will show softness, and each of these vendors has published trademark usage terms that the client should be complying with deliberately rather than by accident. Retrieving official files is a small task and worth doing.

The five marks are displayed monochrome white at `50%` opacity. If the client ever wants them in full color, that requires moving the strip to a light background and sourcing true vector files — the current treatment is what makes five mismatched logos read as one coherent row.

**Not in this bundle and required:** the QuickBooks Advanced ProAdvisor certification badge for the Trust section. Obtain the official issued file from the client.

**Fonts:** Instrument Serif, Archivo, and JetBrains Mono, all from Google Fonts. The prototype loads them via a `<link>` with `preconnect` to `fonts.googleapis.com` and `fonts.gstatic.com`. Prefer self-hosting for performance and privacy, and subset to Latin. Weights actually used: Instrument Serif 400 + 400 italic; Archivo 400, 500, 600, 700; JetBrains Mono 400, 500. Set `font-display: swap`.

---

## Files

| Path | What it is |
|---|---|
| `Orbis Site.dc.html` | The full design. Read for structure, exact copy, and values. Do not port its markup. |
| `support.js` | Prototyping runtime. Reference only — no production relevance. |
| `image-slot.js` | Drop-target placeholder used for the un-supplied ProAdvisor badge. Reference only. |
| `assets/logo-*.png` | Processed platform logos described above. |

To view the design as intended, open `Orbis Site.dc.html` in a browser with all three files alongside it.

---

## Suggested Build Order

1. Tokens, fonts, and the page shell (sticky header + footer). Verify sticky works and no ancestor has `overflow-x: hidden`.
2. Static sections top to bottom: hero, pains, why, services, steps, pricing, GST/PST, trust, FAQ. All server-rendered, no JS.
3. Responsive pass at the two breakpoints, including the GST/PST early stack.
4. The form: markup, client validation, error and success states.
5. The form backend and email delivery. **Test that a submission actually arrives** before anything ships — the entire page exists to produce this event.
6. Scroll reveal, with the above-the-fold exemption and the reduced-motion path.
7. The marquee. Check the loop is seamless at 1440px and 1920px wide.
8. Structured data (`FAQPage`, `LocalBusiness`), meta title and description, Open Graph tags.
9. Accessibility pass: keyboard-only walk of nav → all CTAs → every FAQ item → every form field → submit. Verify visible focus throughout, that the error message is announced (`aria-live="polite"` on the error container — not in the prototype, add it), and that the success state moves focus to the confirmation heading.
10. Lighthouse. This page should score near-perfect; there is no reason for it not to.

## Open Questions for the Client

Carry these into the PR description rather than deciding them yourself:

1. **Is there a delivery-date commitment beyond the one-business-day reply?** The brand positioning suggests a promise about *when books close each month*, but no date has been agreed. If one is settled, the hero has room for a real timeline graphic.
2. **The Advanced ProAdvisor badge file** — required before launch.
3. **Official vendor logo files** for the five platform marks.
4. **Privacy policy** — needed to support the data-use claim under the form.
5. **Mobile layout below 720px** has not had a design review. Build to spec, then get eyes on it.
6. **Competitor price ranges in FAQ 1** and the **"Rates current as of July 2026"** stamp both need an owner and a review cadence.
