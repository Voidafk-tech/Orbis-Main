/**
 * Locale plumbing.
 *
 * English lives at `/`, Simplified Chinese at `/zh/`. Prefixed URLs rather than
 * an in-place text swap: a client-side toggle would leave the Chinese copy on
 * the same URL as the English, where Google would never index it and nobody
 * could share a link to it. The whole point of the second language is reach.
 *
 * Everything here is written for N languages rather than two. That is not
 * speculative tidiness: the Chinese-language audit found the Metro Vancouver
 * market split between Simplified and Traditional readers, with the Traditional
 * half — Hong Kong and Taiwan diaspora, and the community closest to West
 * Vancouver — currently unserved. A Traditional tree is coming, and it needs a
 * translator rather than a refactor.
 *
 * ## Adding a locale
 *
 * 1. Add it to `Locale` below, then fill in the entry `tsc` demands in each of
 *    the four tables.
 * 2. Create `content/<slug>/{site,pages,legal,ui}.ts`, typed against the English
 *    modules the way `content/zh/*` is.
 * 3. Add it to `LOCALES`.
 *
 * Step 3 is what switches it on, and it is deliberately last: until then `tsc`
 * treats the locale as known-but-not-built, so the tables can be filled in
 * ahead of the copy without a half-built tree reaching the site. Once it is in
 * `LOCALES`, the compiler will name every remaining gap — the copy bundle in
 * content/copy.ts, then each route's text in content/routes.ts.
 */

/** Every locale the site knows how to serve, built or not. */
export type Locale = 'en' | 'zh-hans' | 'zh-hant';

/**
 * The locales actually built. Adding one here is the switch described above.
 *
 * Order is load-bearing in one place: it drives the order of `ALL_ROUTES`, and
 * so the order of the sitemap and of route registration. English first keeps
 * the x-default relationship obvious. Append rather than reorder.
 */
export const LOCALES = ['en', 'zh-hans'] as const;

/** A locale that has copy behind it. This is the one most code should take. */
export type BuiltLocale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: BuiltLocale = 'en';

/**
 * The URL prefix and the content directory for each locale, which are the same
 * fact: `/zh/services` is rendered from `content/zh/`.
 *
 * Simplified Chinese keeps the historic `zh` rather than moving to `zh-hans`,
 * and that is deliberate. `/zh/remote-bookkeeping/` ranks #3 for 温哥华 记账 —
 * the best position anything on this site holds in either language — and this
 * is GitHub Pages, which cannot issue a 301. The only redirect available is the
 * meta-refresh stub in content/routes.ts, which is a weaker signal than the
 * permanent redirect a URL move needs. The tidier URL is not worth staking that
 * position on. If the site ever moves behind a host that can redirect properly,
 * changing this one string is the whole migration.
 */
export const LOCALE_SLUG: Record<Locale, string> = {
  en: '',
  'zh-hans': 'zh',
  'zh-hant': 'zh-hant',
};

/**
 * BCP 47 tags, used for `lang`, `hreflang` and `inLanguage`.
 *
 * Script subtags rather than region subtags: the audience is in Canada either
 * way, and what differs between the two Chinese trees is the script they read,
 * not the country they are in. `zh-CN` and `zh-TW` would say the wrong thing.
 */
export const LOCALE_TAG: Record<Locale, string> = {
  en: 'en-CA',
  'zh-hans': 'zh-Hans',
  'zh-hant': 'zh-Hant',
};

/**
 * Open Graph locales, which are a different vocabulary from the tags above and
 * cannot be derived from them — Open Graph takes Facebook's
 * `language_TERRITORY` list, which has no `zh_CA` and no script subtags at all.
 */
export const LOCALE_OG: Record<Locale, string> = {
  en: 'en_CA',
  'zh-hans': 'zh_CN',
  'zh-hant': 'zh_TW',
};

/**
 * What the language switcher says. Each label is written in its own script, so
 * a Traditional reader scanning the page sees 繁體中文 and recognises it
 * without having to read English to find their own language. For the same
 * reason these are never "Chinese (Simplified)" and "Chinese (Traditional)".
 */
export const LOCALE_LABEL: Record<Locale, string> = {
  en: 'English',
  'zh-hans': '简体中文',
  'zh-hant': '繁體中文',
};

/**
 * Widens a literal type to its base while keeping the shape.
 *
 * The English copy is declared `as const`, so its type is a tuple of objects
 * with literal string values — a translation could never satisfy that. This
 * relaxes the values to plain `string` while preserving every key, every level
 * of nesting and every optional marker.
 *
 * The point is that `content/zh/*.ts` is typed against the English module, so
 * TypeScript fails the build if a translation drops a field, misspells a key or
 * changes a nested shape. That is the check that stops a translated page
 * rendering `undefined` somewhere nobody looked.
 */
export type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : // `readonly` is preserved rather than stripped: the English copy is
        // declared `as const` and so is deeply readonly, while a translation is
        // written as a plain literal. A mutable value is assignable to a
        // readonly type but not the reverse, so keeping readonly here is what
        // lets both satisfy the same shape.
        T extends readonly (infer U)[]
        ? readonly Widen<U>[]
        : T extends object
          ? { [K in keyof T]: Widen<T[K]> }
          : T;

/**
 * The prefixes that mark a non-default locale, longest first.
 *
 * Order matters and is not cosmetic: matching is by `startsWith`, and one slug
 * can be a prefix of another. Were the Simplified tree ever moved to
 * `/zh-hans`, a shortest-first scan would see `/zh` inside `/zh-hant` and
 * classify every Traditional URL as Simplified.
 */
const PREFIXES = LOCALES.filter((locale) => locale !== DEFAULT_LOCALE)
  .map((locale) => ({ locale, prefix: `/${LOCALE_SLUG[locale]}` }))
  .sort((a, b) => b.prefix.length - a.prefix.length);

/** `/services` in Simplified Chinese is `/zh/services`; its home page is `/zh`. */
export const localizePath = (path: string, locale: Locale): string => {
  if (locale === DEFAULT_LOCALE) return path;
  const prefix = `/${LOCALE_SLUG[locale]}`;
  return path === '/' ? prefix : `${prefix}${path}`;
};

/**
 * The href form of an internal path: always trailing-slash.
 *
 * Route paths are stored without one — they are the key that PAGE_FOR, the
 * title lookup and scripts/lastmod.mjs all read, and a slash there would have
 * to be stripped at each of them. But prerendering writes `services/index.html`,
 * which GitHub Pages serves at `/services/` and 301s `/services` to, so a link
 * written from the route path points at a redirect. Google was indexing both
 * forms and splitting the ranking signal between them.
 *
 * So the slash is added here, at the point a path becomes an `href`, and
 * nowhere else. React Router matches `/services/` against the pattern
 * `/services` either way, which is why the site worked at all before this: the
 * URL Pages actually serves has always had the slash.
 *
 * scripts/prerender.mjs enforces it — a rendered internal href without a
 * trailing slash fails the build rather than shipping a redirect hop.
 */
export const hrefFor = (path: string): string => (path.endsWith('/') ? path : `${path}/`);

/** The inverse: `/zh/services` -> `/services`, `/zh` -> `/`. */
export const stripLocale = (pathname: string): string => {
  const withoutSlash = pathname.replace(/\/+$/, '') || '/';

  for (const { prefix } of PREFIXES) {
    if (withoutSlash === prefix) return '/';
    // `prefix.length`, not a literal — this used to slice a hardcoded 3, the
    // length of '/zh', which would have turned '/zh-hant/services' into
    // 'hant/services' the day a second Chinese tree landed.
    if (withoutSlash.startsWith(`${prefix}/`)) return withoutSlash.slice(prefix.length);
  }

  return withoutSlash;
};

/** Which language a URL is in, decided purely by its prefix. */
export const localeFromPath = (pathname: string): BuiltLocale => {
  const withoutSlash = pathname.replace(/\/+$/, '') || '/';

  for (const { locale, prefix } of PREFIXES) {
    if (withoutSlash === prefix || withoutSlash.startsWith(`${prefix}/`)) return locale;
  }

  return DEFAULT_LOCALE;
};
