import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import { useScrollReveal } from './useScrollReveal';
import Home from '../pages/Home';
import ServicesPage from '../pages/ServicesPage';
import PricingPage from '../pages/PricingPage';
import ContactPage from '../pages/ContactPage';
import LegalPage from '../pages/LegalPage';
import NotFoundPage from '../pages/NotFoundPage';
import { PRIVACY, TERMS } from '../content/legal';
import { ROUTES, NOT_FOUND_META } from '../content/routes';

/** Same list the prerender step reads, so a tab title cannot disagree with a search result. */
const TITLES: Record<string, string> = Object.fromEntries(
  ROUTES.map((route) => [route.path, route.title]),
);

/**
 * Prerendering writes `services/index.html`, so the canonical URL — and the one
 * GitHub Pages actually serves — is `/services/`. ROUTES keys have no trailing
 * slash, so looking up the raw pathname misses on every page but the home page
 * and falls through to the not-found title.
 */
const routeKey = (pathname: string) => pathname.replace(/(.)\/+$/, '$1');

const App: React.FC = () => {
  const location = useLocation();

  useScrollReveal(location.pathname);

  useEffect(() => {
    document.title = TITLES[routeKey(location.pathname)] ?? NOT_FOUND_META.title;
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
    <div className="page">
      <SiteHeader />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<LegalPage content={PRIVACY} />} />
          <Route path="/terms-of-service" element={<LegalPage content={TERMS} />} />

          {/* Aliases. These are also emitted as redirect stubs at build time —
              see REDIRECTS in scripts/prerender.mjs — because a client-side
              Navigate only runs after a 404 has already been served. */}
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
  );
};

export default App;
