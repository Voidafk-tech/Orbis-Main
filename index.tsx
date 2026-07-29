import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './components/App';
import { initAnalytics } from './components/analytics';
import './index.css';

// The scroll-reveal styles only hide content once JS is known to be running.
document.documentElement.classList.add('js');

// No-op until a measurement ID is set in components/analytics.ts.
initAnalytics();

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Could not find root element to mount to');
}

const app = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Routes are prerendered at build time, so hydrate when markup is already there.
if (rootElement.firstElementChild) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}
