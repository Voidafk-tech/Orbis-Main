import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface AnchorProps {
  /** Target element id on the home page, e.g. "start". */
  to: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * In-page anchor on the home page, route link with a hash anywhere else.
 * App scrolls to the hash after the route change.
 */
const Anchor: React.FC<AnchorProps> = ({ to, className, children }) => {
  const { pathname } = useLocation();

  if (pathname === '/') {
    return (
      <a href={`#${to}`} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link to={`/#${to}`} className={className}>
      {children}
    </Link>
  );
};

export default Anchor;
