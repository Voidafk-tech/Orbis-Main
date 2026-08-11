import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import { LocaleProvider, useCopy } from './LocaleContext';
import { useScrollReveal } from './useScrollReveal';
import Home from '../pages/Home';
import ServicesPage from '../pages/ServicesPage';
import PricingPage from '../pages/PricingPage';
import RemoteBookkeepingPage from '../pages/RemoteBookkeepingPage';
import GstPstPage from '../pages/GstPstPage';
import CatchUpPage from '../pages/CatchUpPage';
import ContactPage from '../pages/ContactPage';
import LegalPage from '../pages/LegalPage';
import NotFoundPage from '../pages/NotFoundPage';
import { ALL_ROUTES, NOT_FOUND_META } from '../content/routes';
import { localeFromPath } from '../content/i18n';
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
 * The keyboard bypass for the header, and the first thing in the tab order.
 *
 * A component rather than markup inline below, because it needs the locale and
 * App is what renders the provider — a hook call in App itself would be outside
 * it. It is four lines; the styling that keeps it invisible until focused is
 * `.visually-hidden` plus `.skip-link:focus` in index.css.
 */
const SkipLink: React.FC = () => {
  const copy = useCopy();

  return (
    <a className="skip-link visually-hidden" href="#main">
      {copy.ui.header.skipToContent}
    </a>
  );
};

const App: React.FC = () => {
  const location = useLocation();

  useScrollReveal(location.pathname);

  useEffect(() => {
    const title = TITLES[routeKey(location.pathname)] ?? NOT_FOUND_META.title;
    document.title = title;
    // The lang attribute has to follow client-side navigation too, or a reader
    // switching language keeps the previous one announced to assistive tech.
    document.documentElement.lang =
      localeFromPath(location.pathname) === 'zh' ? 'zh-Hans-CA' : 'en-CA';
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
        <SkipLink />
        <SiteHeader />
        {/* `tabIndex={-1}` so the skip link actually moves focus and not only
            the scroll position: Chrome and Safari both leave focus where it was
            when a fragment link points at an element that cannot hold it, which
            drops the reader straight back into the header on the next Tab.
            Clearing the sticky header is handled by the global `[id]`
            scroll-margin rule in index.css. */}
        <main id="main" tabIndex={-1}>
          <Routes>
            {ALL_ROUTES.map((route) => (
              <Route key={route.path} path={route.path} element={PAGE_FOR[route.englishPath]} />
            ))}

            {/* Aliases. These are also emitted as redirect stubs at build time —
                see REDIRECTS in content/routes.ts — because a client-side
                Navigate only runs after a 404 has already been served. They are
                English-only: they are legacy English URLs. */}
            <Route path="/plans" element={<Navigate to="/pricing" replace />} />
            <Route path="/process" element={<Navigate to="/#process" replace />} />
            <Route path="/about" element={<Navigate to="/#why" replace />} />
            <Route path="/growth-strategy" element={<Navigate to="/pricing" replace />} />

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
