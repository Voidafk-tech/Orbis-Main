import React from 'react';
import { Link } from 'react-router';
import Anchor from './Anchor';
import { LogoMark } from './Logo';
import { useLocale } from './LocaleContext';

const SiteHeader: React.FC = () => {
  const { copy, path, alternates } = useLocale();
  const { header, languageToggle } = copy.ui;

  return (
    <header className="header">
      <div className="header__row">
        <Link to={path('/')} className="lockup" aria-label={header.backToTop}>
          <LogoMark size={25} />
          <span className="wordmark">ORBIS</span>
        </Link>

        {/* Services and Plans are their own routes, not anchors on this page. */}
        <ul className="nav">
          <li>
            <Link to={path('/services')}>{header.services}</Link>
          </li>
          <li>
            <Link to={path('/pricing')}>{header.plans}</Link>
          </li>
          <li>
            <Anchor to="questions">{header.questions}</Anchor>
          </li>
        </ul>

        {/* Real links to the same page in each other language, not a JS toggle:
            they have to be crawlable, and they have to be shareable. `hreflang`
            tells Google they are translations rather than duplicates.

            A list rather than one chip. With two languages built it renders
            exactly as it always has; a third adds a chip beside it rather than
            needing this rewritten. Each label is written in its own script, so
            a reader finds their language without first reading English. */}
        {alternates.map((alternate) => (
          <Link
            key={alternate.locale}
            to={alternate.path}
            className="header__lang"
            hrefLang={alternate.tag}
            lang={alternate.tag}
            aria-label={`${languageToggle.label}: ${alternate.label}`}
          >
            {alternate.label}
          </Link>
        ))}

        {/* Kept at every width, unlike the nav. Someone searching for a bookkeeper
            on a phone is likelier to call than to fill in a ten-field form.

            Below 480px the row cannot fit the number as text alongside the CTA,
            so it becomes an icon. That is not a downgrade: the number was a
            94x14px tap target, and the icon is a square one that clears the
            44px minimum. The number itself stays in the footer and on the
            contact page, and the aria-label still reads it out here. */}
        <a
          className="header__tel"
          href={copy.site.CONTACT.phoneHref}
          aria-label={`${header.call}: ${copy.site.CONTACT.phone}`}
        >
          <span className="header__tel-text">{copy.site.CONTACT.phone}</span>
          <svg
            className="header__tel-icon"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
          </svg>
        </a>

        <Link to={path('/contact')} className="btn btn--primary btn--sm header__cta">
          <span className="header__cta-full">{header.ctaFull}</span>
          <span className="header__cta-short">{header.ctaShort}</span>
        </Link>
      </div>
    </header>
  );
};

export default SiteHeader;
