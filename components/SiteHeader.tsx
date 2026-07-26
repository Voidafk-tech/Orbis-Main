import React from 'react';
import { Link } from 'react-router';
import Anchor from './Anchor';
import { LogoMark } from './Logo';

const SiteHeader: React.FC = () => (
  <header className="header">
    <div className="header__row">
      <Link to="/" className="lockup" aria-label="Orbis Accounting, back to top">
        <LogoMark size={25} />
        <span className="wordmark">ORBIS</span>
      </Link>

      <ul className="nav">
        <li>
          <Anchor to="services">Services</Anchor>
        </li>
        <li>
          <Anchor to="pricing">Plans</Anchor>
        </li>
        <li>
          <Anchor to="questions">Questions</Anchor>
        </li>
      </ul>

      <Anchor to="start" className="btn btn--primary btn--sm header__cta">
        Get a plan and a quote
      </Anchor>
    </div>
  </header>
);

export default SiteHeader;
