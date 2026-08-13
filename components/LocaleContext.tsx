import React, { createContext, useContext, useMemo } from 'react';
import { useLocation } from 'react-router';
import { copyFor, type Copy } from '../content/copy';
import {
  LOCALES,
  LOCALE_LABEL,
  LOCALE_TAG,
  hrefFor,
  localeFromPath,
  localizePath,
  stripLocale,
  type BuiltLocale,
} from '../content/i18n';

/** One entry in the language switcher: the same page, in another language. */
export interface LocaleAlternate {
  locale: BuiltLocale;
  /** The current page in that language, in href form. */
  path: string;
  /** Written in its own script, so a reader recognises it without reading English. */
  label: string;
  /** BCP 47, for the link's `hreflang` and `lang`. */
  tag: string;
}

interface LocaleValue {
  locale: BuiltLocale;
  copy: Copy;
  /**
   * Prefixes a canonical (English) path for the current locale and returns it
   * in href form — trailing-slash, the URL GitHub Pages actually serves. Every
   * internal link on the site is built from this, so the slash is applied once
   * here rather than at each call site. See `hrefFor` in content/i18n.ts.
   */
  path: (englishPath: string) => string;
  /**
   * Every other language this page exists in, for the switcher.
   *
   * A list rather than the single `otherLocale`/`otherPath` pair this used to
   * expose. That pair was the shape of the assumption rather than of the
   * problem — with a third language it would have offered a Traditional reader
   * only English, leaving the Simplified tree unreachable from where they were.
   */
  alternates: LocaleAlternate[];
}

const LocaleContext = createContext<LocaleValue | null>(null);

/**
 * Locale comes from the URL and nothing else — no cookie, no Accept-Language
 * sniffing, no redirect. A crawler and a person visiting the same URL must get
 * the same language, or the indexed copy will not be the copy anyone reads.
 */
export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();

  const value = useMemo<LocaleValue>(() => {
    const locale = localeFromPath(pathname);
    const canonical = stripLocale(pathname);

    return {
      locale,
      copy: copyFor(locale),
      path: (englishPath: string) => hrefFor(localizePath(englishPath, locale)),
      // The same page, not the other home page. Sending a language switch to
      // the home page is a common and costly bug: it loses the reader's place
      // and hands every alternate the same href.
      alternates: LOCALES.filter((candidate) => candidate !== locale).map((candidate) => ({
        locale: candidate,
        path: hrefFor(localizePath(canonical, candidate)),
        label: LOCALE_LABEL[candidate],
        tag: LOCALE_TAG[candidate],
      })),
    };
  }, [pathname]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
};

export const useLocale = (): LocaleValue => {
  const value = useContext(LocaleContext);
  if (!value) {
    throw new Error('useLocale must be used inside <LocaleProvider>');
  }
  return value;
};

/** Shorthand for the common case of only wanting the words. */
export const useCopy = (): Copy => useLocale().copy;
