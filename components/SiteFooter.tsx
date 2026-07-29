import React from 'react';
import { Link } from 'react-router';
import Anchor from './Anchor';
import { LogoMark } from './Logo';
import { CONTACT } from '../content/site';

const SiteFooter: React.FC = () => (
  <footer className="footer">
    <div className="footer__row">
      <Link to="/" className="lockup" aria-label="Orbis Accounting, back to top">
        <LogoMark size={22} />
        <span className="wordmark wordmark--sm">ORBIS</span>
      </Link>

      <p className="footer__tagline">{CONTACT.tagline}</p>

      <ul className="footer__links">
        <li>
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        </li>
        <li>
          <Anchor to="pricing">Plans</Anchor>
        </li>
        <li>
          <Anchor to="questions">Questions</Anchor>
        </li>
        {/* The standalone intake route is prerendered for ad traffic. Without a
            link somewhere on the site it is an orphan, reachable only from the
            sitemap and accruing no internal link equity. */}
        <li>
          <Link to="/contact">Get a quote</Link>
        </li>
        <li>
          <Link to="/privacy-policy">Privacy</Link>
        </li>
        <li>
          <Link to="/terms-of-service">Terms</Link>
        </li>
        <li>
          <span className="footer__copy">© 2026 Orbis Accounting</span>
        </li>
      </ul>
    </div>
  </footer>
);

export default SiteFooter;
