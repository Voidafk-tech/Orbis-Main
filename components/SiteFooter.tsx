import React from 'react';
import { Link } from 'react-router';
import Anchor from './Anchor';
import { LogoMark } from './Logo';
import { useLocale } from './LocaleContext';
import { BUSINESS } from '../content/business';

const SiteFooter: React.FC = () => {
  const { copy, path } = useLocale();
  const { footer } = copy.ui;
  const { CONTACT } = copy.site;

  return (
    <footer className="footer">
      <div className="footer__row">
        <Link to={path('/')} className="lockup" aria-label={copy.ui.header.backToTop}>
          <LogoMark size={22} />
          <span className="wordmark wordmark--sm">ORBIS</span>
        </Link>

        <p className="footer__tagline">{CONTACT.tagline}</p>

        <ul className="footer__links">
          <li>
            <Link to={path('/services')}>{footer.services}</Link>
          </li>
          <li>
            <Link to={path('/pricing')}>{footer.plans}</Link>
          </li>
          <li>
            <Link to={path('/remote-bookkeeping')}>{footer.remote}</Link>
          </li>
          <li>
            <Anchor to="questions">{footer.questions}</Anchor>
          </li>
          {/* The standalone intake route is prerendered for ad traffic. Without a
              link somewhere on the site it is an orphan, reachable only from the
              sitemap and accruing no internal link equity. */}
          <li>
            <Link to={path('/contact')}>{footer.getQuote}</Link>
          </li>
          <li>
            <Link to={path('/privacy-policy')}>{footer.privacy}</Link>
          </li>
          <li>
            <Link to={path('/terms-of-service')}>{footer.terms}</Link>
          </li>
        </ul>
      </div>

      {/* Name, address and phone in crawlable markup on every page. Local search
          cross-checks this against the Google Business Profile and directory
          listings, and inconsistency between them suppresses local rankings.
          The address itself is not translated — it is what is on the envelope. */}
      <div className="footer__row footer__nap">
        <address className="footer__address">
          <strong>{BUSINESS.name}</strong>
          <span>{BUSINESS.streetAddress}</span>
          <span>
            {BUSINESS.addressLocality}, {BUSINESS.addressRegion} {BUSINESS.postalCode}
          </span>
          <span>{footer.serving}</span>
        </address>

        <ul className="footer__contact">
          <li>
            <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
          </li>
          <li>
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </li>
        </ul>

        <span className="footer__copy">{footer.copyright}</span>
      </div>
    </footer>
  );
};

export default SiteFooter;
