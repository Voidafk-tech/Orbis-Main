import React from 'react';
import { Link, useLocation } from 'react-router';
import { stripLocale } from '../content/i18n';
import { useLocale } from './LocaleContext';

interface AnchorProps {
  /** Target element id on the home page, e.g. "start". */
  to: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * In-page anchor when already on the home page, route link with a hash
 * anywhere else. App scrolls to the hash after the route change.
 *
 * "The home page" means the home page of the current language — `/` in English,
 * `/zh` in Chinese — so a Chinese reader following a nav link is never dropped
 * back into the English site.
 */
const Anchor: React.FC<AnchorProps> = ({ to, className, children }) => {
  const { pathname } = useLocation();
  const { path } = useLocale();

  if (stripLocale(pathname) === '/') {
    return (
      <a href={`#${to}`} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link to={`${path('/')}#${to}`} className={className}>
      {children}
    </Link>
  );
};

export default Anchor;
