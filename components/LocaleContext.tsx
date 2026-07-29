import React, { createContext, useContext, useMemo } from 'react';
import { useLocation } from 'react-router';
import { copyFor, type Copy } from '../content/copy';
import { localeFromPath, localizePath, stripLocale, type Locale } from '../content/i18n';

interface LocaleValue {
  locale: Locale;
  copy: Copy;
  /** Prefixes a canonical (English) path for the current locale. */
  path: (englishPath: string) => string;
  /** The same page in the other language, for the header toggle. */
  otherLocale: Locale;
  otherPath: string;
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
    const otherLocale: Locale = locale === 'en' ? 'zh' : 'en';

    return {
      locale,
      copy: copyFor(locale),
      path: (englishPath: string) => localizePath(englishPath, locale),
      otherLocale,
      otherPath: localizePath(canonical, otherLocale),
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
