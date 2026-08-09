# design-sync notes — Orbis Accounting

Repo-specific gotchas for syncing this repo to claude.ai/design. Read before
re-running the sync.

## Shape

- This repo is an **application**, not a published component package: no library
  `dist/`, no `types` entry, and every component is a `export default`. Both
  facts matter:
  - `export *` (what the converter's synth-entry writes) cannot re-export a
    default, so the bundle would have had zero component exports. The sync is
    pointed at a hand-written barrel instead — **`.design-sync/entry.tsx`** —
    which names each component as a named export and imports `index.css` so
    esbuild emits it as `_ds_bundle.css`. Add a component there *and* to
    `componentSrcMap` when the site grows one.
  - With no `.d.ts` tree, `exportedNames()` finds nothing, so the component list
    comes entirely from `cfg.componentSrcMap`. It is a full enumeration here, not
    a sparse override — that is deliberate and required.
- Build command: none needed. The converter bundles the barrel straight from
  source, so `npm ci` is the only prerequisite. (`npm run build` builds the
  *site*, which the sync does not use.)

## Config decisions worth knowing

- **`.design-sync/tsconfig.json`** exists only for the sync. It carries the app's
  `@/*` alias plus a `"/fonts/*": ["public/fonts/*"]` mapping. That second entry
  is what lets esbuild resolve the root-absolute `url('/fonts/...')` refs in
  `fonts.css`; the four woff2 files then inline as data URIs inside
  `_ds_bundle.css`, so the bundle is font-self-contained and needs no `fonts/`
  directory. Without the mapping the build fails outright with four
  "Could not resolve" errors.
- **Do not put `//` comment keys in that tsconfig.** The converter strips `//`
  comments with a regex before `JSON.parse`, and a `"//": "..."` key corrupts the
  file into invalid JSON — the paths plugin then silently returns null and the
  font resolution fails with no explanation.
- **Preview imports must use the package name**, e.g.
  `import { Hero } from 'orbis-accounting-landing-page'`. A relative import
  (`'../../components/sections/Hero'`) is *not* redirected to the shipped bundle
  here — that redirect keys off the `.d.ts` export set, which is empty in this
  repo — so it compiles a second copy of the component with its own
  `LocaleContext` and every cell throws
  `useLocale must be used inside <LocaleProvider>`.
- **`cfg.provider` is `MemoryRouter` → `LocaleProvider`.** `LocaleContext` calls
  `useLocation()`, so the router has to be outside it. Both are exported from the
  barrel for this reason.
- **`storyImports.loaders {".css": "css"}`** overrides the default `empty` loader
  so `.design-sync/previews/shell.css` actually compiles to `_preview/<Name>.css`.
- **`shell.css` exists because the preview harness hardcodes
  `body{background:#fff}`** in an inline `<style>` after the linked stylesheets.
  This site paints its ground on `body` (`var(--ink)`), so without the override
  every dark section renders near-white text on white and looks empty. The
  override wins on specificity (`html body`), not order.
- **Don't wrap previews in `.page`** unless the component needs it: its
  `min-height: 100vh` pads every card with a screen of empty ink. `HeroSequence`
  is the one that does need it — `.page`'s `overflow-x: clip` is what lets the
  sequence pin.

## Known render warns (benign — re-syncs should not chase these)

- `[FONT_MISSING] "Hiragino Sans GB", "Microsoft YaHei", "Source Han Sans SC"` —
  deliberate. These are the tail of the `--cjk-sans` / `--cjk-serif` system-font
  stacks for the Chinese locale; only the Latin faces are self-hosted. Confirmed
  with the repo owner on 2026-08-09: rely on the reader's OS fonts, do not ship a
  CJK webfont.
- `[RENDER_BLANK] components/general/ScrollCue/ScrollCue.html: PNG is ~4.9KB` —
  the component is a 24x14px chevron, `position: fixed`, on a full-screen ink
  ground. The card is genuinely almost all background. Card viewport is pinned to
  760x240 so it reads; the screenshot is correct. Composing a neighbour around it
  (TrustStrip, as Home.tsx does) was tried and is worse: any block tall enough to
  be realistic pushes the fixed cue out of the captured frame, and a frame short
  enough to keep the cue crops the neighbour. Leave the preview standalone.

## States that cannot render statically

Recorded so nobody re-litigates them per component:

- `IntakeForm` — sending / sent / error phases need a real POST to Web3Forms.
- `ScrollCue` — hides itself after 80px of scroll.
- `HeroSequence` — acts 1-3 are driven by scroll progress; only the opening act
  renders. `WeChatId` — the copied-confirmation state is click-driven.
- `Faq` — accordion open state is click-driven.
- `.reveal` animations never play in cards: the hidden state only applies under
  `<html class="js">`, which `index.tsx` adds and the previews do not. This is
  what makes the cards render at all, so leave it alone.

## Host-app assets

`Services`, `Trust` and `WeChatContact` load images by absolute URL —
`/logos/*.png`, `/badge-quickbooks-advanced-proadvisor.png`, `/wechat-qr.png` —
which only resolve because the site serves `public/`. Confirmed with the repo
owner on 2026-08-09: **do not ship copies**; the dependency is documented in
`.design-sync/conventions.md` instead. `Trust` and `WeChatContact` each degrade
on their own (placeholder box / dropped QR column), which is what the cards show.

## Re-sync risks

- **`.design-sync/entry.tsx` and `componentSrcMap` are hand-maintained.** A new
  component added to `components/` will be silently missing from the sync until
  it is added to both. Diff `components/**` against `componentSrcMap` when
  re-syncing.
- **`fonts.css` is generated** by `scripts/fetch-fonts.mjs`. If it is regenerated
  with different filenames, the `/fonts/*` path mapping still holds (it maps a
  directory) but the woff2s must still live in `public/fonts/`.
- **`dtsPropsFor` is hand-written** for the four components that take props
  (`Anchor`, `Intake`, `LogoMark`, `SatelliteBullet`). There is no `.d.ts` tree
  to extract from, so a prop added in source will not appear in the uploaded
  contract until it is added there by hand.
- **Previews are pinned to real copy strings** only through the components
  themselves (all copy comes from `content/copy.ts` via context), so copy edits
  flow through automatically. The two places with literal text are
  `.design-sync/previews/Anchor.tsx` and `SatelliteBullet.tsx`, which quote
  hero/WhyOrbis copy for context — check them if that copy changes materially.
- **Toolchain assumed**: node 22, `npm ci`, playwright 1.56.1 against the
  preinstalled chromium build 1194. On a fresh machine, re-link playwright into
  the staged scripts (`ln -sfn $(npm root -g)/playwright .ds-sync/node_modules/playwright`)
  or install a playwright whose `browsers.json` pins the cached chromium build.

## Upload state

The first sync ran to completion locally but **never uploaded**: the `DesignSync`
tool could not authorize in the headless claude.ai/code session
(`/design-login` needs an interactive terminal). No project exists yet, so
`config.json` carries no `projectId`. The next run with working auth creates the
project, records the pin, and uploads — nothing here needs redoing.
