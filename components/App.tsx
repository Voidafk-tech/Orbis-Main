import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import { useScrollReveal } from './useScrollReveal';
import Home from '../pages/Home';
import ContactPage from '../pages/ContactPage';
import LegalPage from '../pages/LegalPage';
import { PRIVACY, TERMS } from '../content/legal';

const TITLES: Record<string, string> = {
  '/': 'Bookkeeping for BC Small Business | Orbis Accounting',
  '/contact': 'Get a Plan and a Quote | Orbis Accounting',
  '/privacy-policy': 'Privacy Policy | Orbis Accounting',
  '/terms-of-service': 'Terms of Service | Orbis Accounting',
};

const App: React.FC = () => {
  const location = useLocation();

  useScrollReveal(location.pathname);

  useEffect(() => {
    document.title = TITLES[location.pathname] ?? TITLES['/'];
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
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<LegalPage content={PRIVACY} />} />
          <Route path="/terms-of-service" element={<LegalPage content={TERMS} />} />

          {/* The old standalone pages are now sections of the one page. */}
          <Route path="/services" element={<Navigate to="/#services" replace />} />
          <Route path="/pricing" element={<Navigate to="/#pricing" replace />} />
          <Route path="/process" element={<Navigate to="/#process" replace />} />
          <Route path="/about" element={<Navigate to="/#why" replace />} />
          <Route path="/growth-strategy" element={<Navigate to="/#pricing" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <SiteFooter />
    </div>
  );
};

export default App;
