/**
 * Locale plumbing.
 *
 * English lives at `/`, Simplified Chinese at `/zh/`. Prefixed URLs rather than
 * an in-place text swap: a client-side toggle would leave the Chinese copy on
 * the same URL as the English, where Google would never index it and nobody
 * could share a link to it. The whole point of the second language is reach.
 */

export type Locale = 'en' | 'zh';

export const LOCALES: Locale[] = ['en', 'zh'];

export const DEFAULT_LOCALE: Locale = 'en';

/** BCP 47 tags, used for `lang`, `hreflang` and `inLanguage`. */
export const LOCALE_TAG: Record<Locale, string> = {
  en: 'en-CA',
  zh: 'zh-Hans-CA',
};

/** What the language toggle says. Each is written in the language it switches to. */
export const LOCALE_LABEL: Record<Locale, string> = {
  en: 'English',
  zh: '中文',
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

/** `/services` in zh is `/zh/services`; the zh home page is `/zh`. */
export const localizePath = (path: string, locale: Locale): string => {
  if (locale === DEFAULT_LOCALE) return path;
  return path === '/' ? '/zh' : `/zh${path}`;
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
  if (withoutSlash === '/zh') return '/';
  return withoutSlash.startsWith('/zh/') ? withoutSlash.slice(3) : withoutSlash;
};

/** Which language a URL is in, decided purely by its prefix. */
export const localeFromPath = (pathname: string): Locale => {
  const withoutSlash = pathname.replace(/\/+$/, '') || '/';
  return withoutSlash === '/zh' || withoutSlash.startsWith('/zh/') ? 'zh' : 'en';
};
