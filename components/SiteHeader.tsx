import React from 'react';
import { Link } from 'react-router';
import Anchor from './Anchor';
import { LogoMark } from './Logo';
import { useLocale } from './LocaleContext';
import { LOCALE_LABEL, LOCALE_TAG } from '../content/i18n';

const SiteHeader: React.FC = () => {
  const { copy, path, otherLocale, otherPath } = useLocale();
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

        {/* A real link to the same page in the other language, not a JS toggle:
            it has to be crawlable, and it has to be shareable. `hreflang` tells
            Google the two are translations rather than duplicates. */}
        <Link
          to={otherPath}
          className="header__lang"
          hrefLang={LOCALE_TAG[otherLocale]}
          lang={LOCALE_TAG[otherLocale]}
          aria-label={`${languageToggle.label}: ${LOCALE_LABEL[otherLocale]}`}
        >
          {LOCALE_LABEL[otherLocale]}
        </Link>

        {/* Kept at every width, unlike the nav. Someone searching for a bookkeeper
            on a phone is likelier to call than to fill in a ten-field form. */}
        <a className="header__tel" href={copy.site.CONTACT.phoneHref}>
          {copy.site.CONTACT.phone}
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
