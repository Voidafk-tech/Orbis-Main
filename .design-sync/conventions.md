# Building with Orbis Accounting

A bookkeeping practice's site design system: near-black ground, one green accent,
hairlines instead of shadows, and a serif display face used sparingly.

## Wrap the tree, or nothing renders

Every component reads its copy and locale-aware paths from context. Render inside
a router and `LocaleProvider` — both are exports of this bundle:

```jsx
<MemoryRouter>
  <LocaleProvider>
    <Hero />
  </LocaleProvider>
</MemoryRouter>
```

Without it you get `useLocale must be used inside <LocaleProvider>` and an empty
root. The router must be outside `LocaleProvider`, which calls `useLocation()`.
Locale comes from the URL and nothing else: `/` is English, `/zh` is Chinese, so
`initialEntries={['/zh']}` renders the whole tree in Chinese. In a real app use
`BrowserRouter` in place of `MemoryRouter`.

## The ground is dark

The stylesheet paints `body` itself: `background: var(--ink)` (#0a0c0a) with
`color: var(--chart)` (#f3f4ef). Every section is designed against it. If your
page container paints its own background, set it to `var(--ink)` — otherwise the
near-white text lands on white and the page looks blank. `.sec--paper` sections
paint `var(--chart)` over the ink; that is the only light ground in the system.

## Styling idiom: global classes plus CSS custom properties

No CSS-in-JS, no utility framework, no CSS modules — one global stylesheet.
Compose layout with these class families, and reach for the tokens in your own
rules. Do not invent new class names for things already named here.

- **Layout** — `.page`, `.sec`, `.sec--paper` (light), `.sec--rule` (hairline
  above), `.inner` (max width + gutters), `.grid`
- **Type** — `.h1`, `.h2` (`.h2--faq`, `.h2--intake`), `.eyebrow`, `.lede`,
  `.micro`. On light sections use the `--paper` variants: `.eyebrow--paper`,
  `.lede--paper`, `.micro--paper`
- **Buttons** — `.btn` with `.btn--primary`, `.btn--ghost`, `.btn--sm`,
  `.btn--block`
- **Motion** — `.reveal` fades content in on scroll; it is only hidden while
  `<html class="js">`, so it is inert unless the host app opts in

Tokens (all `var(--*)`):

- Colour: `--ink`, `--ink-2`, `--chart`, `--green`, `--green-text` (accent text on
  dark), `--green-dark` (accent on light), `--slate`, `--slate-light`, `--amber`
- Text on light sections: `--paper-ink`, `--paper-intro`, `--paper-body`,
  `--paper-muted`, `--paper-excluded`
- Hairlines, never shadows: `--hair`, `--hair-2`, `--hair-paper`,
  `--hair-paper-light`
- Type: `--serif` (Instrument Serif — display lines only), `--sans` (Archivo —
  everything else), `--mono` (JetBrains Mono — eyebrows, labels, figures),
  `--cjk-sans`, `--cjk-serif`
- Metrics: `--radius` (2px — corners are nearly square), `--pad-x`, `--header-h`

## Where the truth is

Read `styles.css` and the `_ds_bundle.css` it imports before styling: every class
and token above is defined there, along with the per-component rules. Each
component's API is in its `.d.ts` and its usage in its `.prompt.md`.

## A page, composed the way the site composes it

```jsx
<MemoryRouter>
  <LocaleProvider>
    <div className="page">
      <SiteHeader />
      <main>
        <Hero />
        <TrustStrip />
        <section className="sec sec--rule">
          <div className="inner">
            <p className="eyebrow">How it works</p>
            <h2 className="h2">Three steps, and no sales call.</h2>
          </div>
        </section>
        <Pricing />
        <Intake />
      </main>
      <SiteFooter />
    </div>
  </LocaleProvider>
</MemoryRouter>
```

## Two things this bundle does not carry

- **Images come from the host app**, by absolute path: `/logos/*.png`,
  `/badge-quickbooks-advanced-proadvisor.png`, `/wechat-qr.png`. Serve them or
  accept the fallbacks — `Trust` swaps in a typographic placeholder and
  `WeChatContact` drops its QR column on their own; `Services` simply shows no
  platform logos.
- **Chinese text uses the reader's system fonts** via `--cjk-sans` /
  `--cjk-serif`. Only the three Latin families are self-hosted.
