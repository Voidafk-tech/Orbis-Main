import React from 'react';
import { Link } from 'react-router';
import { useLocale } from '../components/LocaleContext';

/**
 * Shown for any URL that is not a real route. Deliberately a page rather than a
 * redirect to the home page: bouncing every unknown URL to / makes them soft
 * 404s, which Google reports as errors and which hide genuinely broken links.
 *
 * GitHub Pages serves public/404.html with a real 404 status for paths that
 * were never prerendered, so this component is what a visitor sees after a
 * client-side navigation to a dead link.
 */
const NotFoundPage: React.FC = () => {
  const { copy, path } = useLocale();
  const t = copy.ui.notFound;

  return (
    <div className="hero">
      <h1 className="h1 h1--wide">
        <span className="eyebrow h1__eyebrow">{t.eyebrow}</span>
        {t.headline}{' '}
        <em>{t.headlineEm}</em>
      </h1>

      <p className="hero__sub">{t.sub}</p>

      <ul className="notfound__links">
        <li>
          <Link to={path('/')}>{t.home}</Link>
        </li>
        <li>
          <Link to={path('/services')}>{t.services}</Link>
        </li>
        <li>
          <Link to={path('/pricing')}>{t.pricing}</Link>
        </li>
        <li>
          <Link to={path('/contact')}>{t.contact}</Link>
        </li>
      </ul>
    </div>
  );
};

export default NotFoundPage;
