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
          {/* The PST pair sits above /remote-bookkeeping deliberately. Footer
              order is one of the few internal-weight levers on a site this size,
              and these are the pages worth pointing it at: /gst-pst-bc targets a
              cluster of ~8,000 monthly searches at single-digit difficulty,
              while /remote-bookkeeping was chasing national terms and sits at
              average position 53. It stays linked — it answers a real objection
              — but it does not need to go first. */}
          <li>
            <Link to={path('/gst-pst-bc')}>{footer.gstPst}</Link>
          </li>
          <li>
            <Link to={path('/bc-pst-registration')}>{footer.pstRegistration}</Link>
          </li>
          <li>
            <Link to={path('/catch-up-bookkeeping')}>{footer.catchUp}</Link>
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

      {/* Name, locality and phone in crawlable markup on every page. Local search
          cross-checks these against the Google Business Profile and directory
          listings, and inconsistency between them suppresses local rankings.
          The street address is deliberately absent from the rendered page — it
          stays in the structured data, which is where local search reads it. */}
      <div className="footer__row footer__nap">
        <address className="footer__address">
          <strong>{BUSINESS.name}</strong>
          <span>{copy.ui.locality}</span>
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
