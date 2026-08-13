import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import { LocaleProvider } from './LocaleContext';
import { useScrollReveal } from './useScrollReveal';
import Home from '../pages/Home';
import ServicesPage from '../pages/ServicesPage';
import PricingPage from '../pages/PricingPage';
import RemoteBookkeepingPage from '../pages/RemoteBookkeepingPage';
import GstPstPage from '../pages/GstPstPage';
import BcPstRegistrationPage from '../pages/BcPstRegistrationPage';
import BookkeepingVsTaxFilingPage from '../pages/BookkeepingVsTaxFilingPage';
import CatchUpPage from '../pages/CatchUpPage';
import ContactPage from '../pages/ContactPage';
import LegalPage from '../pages/LegalPage';
import NotFoundPage from '../pages/NotFoundPage';
import { ALL_ROUTES, NOT_FOUND_META, REDIRECTS } from '../content/routes';
import { LOCALE_TAG, hrefFor, localeFromPath } from '../content/i18n';
import { trackPageView } from './analytics';

/**
 * One element per English path. Both languages render the same components —
 * the words come from the locale bundle, not from a parallel set of pages, so
 * a layout change lands in both at once.
 */
const PAGE_FOR: Record<string, React.ReactElement> = {
  '/': <Home />,
  '/services': <ServicesPage />,
  '/pricing': <PricingPage />,
  '/remote-bookkeeping': <RemoteBookkeepingPage />,
  '/gst-pst-bc': <GstPstPage />,
  '/bc-pst-registration': <BcPstRegistrationPage />,
  // Registered for the Chinese URL only — the route carries `only` in
  // content/routes.ts, so ALL_ROUTES never resolves an English one.
  '/bookkeeping-vs-tax-filing': <BookkeepingVsTaxFilingPage />,
  '/catch-up-bookkeeping': <CatchUpPage />,
  '/contact': <ContactPage />,
  '/privacy-policy': <LegalPage page="privacy" />,
  '/terms-of-service': <LegalPage page="terms" />,
};

/** Same list the prerender step reads, so a tab title cannot disagree with a search result. */
const TITLES: Record<string, string> = Object.fromEntries(
  ALL_ROUTES.map((route) => [route.path, route.title]),
);

/**
 * Prerendering writes `services/index.html`, so the canonical URL — and the one
 * GitHub Pages actually serves — is `/services/`. ALL_ROUTES keys have no
 * trailing slash, so looking up the raw pathname misses on every page but the
 * home page and falls through to the not-found title.
 */
const routeKey = (pathname: string) => pathname.replace(/(.)\/+$/, '$1');

/**
 * Where an alias sends the reader. Mirrors the same decision in
 * scripts/prerender.mjs: a hash target is a section of the home page and is
 * already in href form, anything else is a route path and needs its slash.
 */
const redirectTarget = (to: string) => (to.startsWith('/#') ? to : hrefFor(to));

const App: React.FC = () => {
  const location = useLocation();

  useScrollReveal(location.pathname);

  useEffect(() => {
    const title = TITLES[routeKey(location.pathname)] ?? NOT_FOUND_META.title;
    document.title = title;
    // The lang attribute has to follow client-side navigation too, or a reader
    // switching language keeps the previous one announced to assistive tech.
    //
    // Read from LOCALE_TAG rather than a ternary over two literal tags. The
    // ternary was quietly load-bearing beyond accessibility: every CJK rule in
    // index.css is a `:lang(zh)` selector, including the font stack, so a
    // language it did not know about got `en-CA` here and lost its typography
    // the moment the reader navigated — while the prerendered first paint,
    // which sets this correctly, looked fine.
    document.documentElement.lang = LOCALE_TAG[localeFromPath(location.pathname)];
    // GA4's automatic page_view only fires on a full load, so client-side
    // route changes would otherwise be invisible.
    trackPageView(location.pathname, title);
  }, [location.pathname]);

  // Anchors arriving from another route need scrolling by hand; plain
  // same-page anchors are handled by scroll-behavior: smooth.
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, left: 0 });
      return;
    }
    const target = document.getElementById(location.hash.slice(1));
    target?.scrollIntoView();
  }, [location.pathname, location.hash]);

  return (
    <LocaleProvider>
      <div className="page">
        <SiteHeader />
        <main>
          <Routes>
            {ALL_ROUTES.map((route) => (
              <Route key={route.path} path={route.path} element={PAGE_FOR[route.englishPath]} />
            ))}

            {/* Aliases, from the same list the build reads. These are also
                emitted as redirect stubs at build time — see REDIRECTS in
                content/routes.ts — because a client-side Navigate only runs
                after a 404 has already been served. They were written out by
                hand here as well until the two copies could disagree about
                where an alias points. They are English-only: they are legacy
                English URLs. */}
            {REDIRECTS.map((redirect) => (
              <Route
                key={redirect.from}
                path={redirect.from}
                element={<Navigate to={redirectTarget(redirect.to)} replace />}
              />
            ))}

            {/* A real page, not a bounce to the home page: redirecting every
                unknown URL to / makes them soft 404s in Google's eyes. */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <SiteFooter />
      </div>
    </LocaleProvider>
  );
};

export default App;
