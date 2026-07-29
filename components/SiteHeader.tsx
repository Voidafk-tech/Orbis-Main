import React from 'react';
import { Link } from 'react-router';
import Anchor from './Anchor';
import { LogoMark } from './Logo';
import { CONTACT } from '../content/site';

const SiteHeader: React.FC = () => (
  <header className="header">
    <div className="header__row">
      <Link to="/" className="lockup" aria-label="Orbis Accounting, back to top">
        <LogoMark size={25} />
        <span className="wordmark">ORBIS</span>
      </Link>

      {/* Services and Plans are their own routes now, not anchors on this page. */}
      <ul className="nav">
        <li>
          <Link to="/services">Services</Link>
        </li>
        <li>
          <Link to="/pricing">Plans</Link>
        </li>
        <li>
          <Anchor to="questions">Questions</Anchor>
        </li>
      </ul>

      {/* Kept at every width, unlike the nav. Someone searching for a bookkeeper
          on a phone is likelier to call than to fill in a ten-field form. */}
      <a className="header__tel" href={CONTACT.phoneHref}>
        {CONTACT.phone}
      </a>

      <Link to="/contact" className="btn btn--primary btn--sm header__cta">
        <span className="header__cta-full">Get a plan and a quote</span>
        <span className="header__cta-short">Get a quote</span>
      </Link>
    </div>
  </header>
);

export default SiteHeader;
