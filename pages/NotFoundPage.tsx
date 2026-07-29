import React from 'react';
import { Link } from 'react-router';

/**
 * Shown for any URL that is not a real route. Deliberately a page rather than a
 * redirect to the home page: bouncing every unknown URL to / makes them soft
 * 404s, which Google reports as errors and which hide genuinely broken links.
 *
 * GitHub Pages serves public/404.html with a real 404 status for paths that
 * were never prerendered, so this component is what a visitor sees after a
 * client-side navigation to a dead link.
 */
const NotFoundPage: React.FC = () => (
  <div className="hero">
    <h1 className="h1">
      <span className="eyebrow h1__eyebrow">404</span>
      That page
      <br />
      <em>is not here.</em>
    </h1>

    <p className="hero__sub">
      The link may be out of date, or the page may have moved. Everything the site has is one of
      these.
    </p>

    <ul className="notfound__links">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/services">Bookkeeping services</Link>
      </li>
      <li>
        <Link to="/pricing">Plans and pricing</Link>
      </li>
      <li>
        <Link to="/contact">Get a plan and a quote</Link>
      </li>
    </ul>
  </div>
);

export default NotFoundPage;
