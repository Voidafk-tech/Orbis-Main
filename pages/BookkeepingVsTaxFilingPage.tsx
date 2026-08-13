import React from 'react';
import { Link } from 'react-router';
import { useLocale } from '../components/LocaleContext';
import { revealDelay } from '../components/useScrollReveal';

/**
 * /zh/bookkeeping-vs-tax-filing — 记账 vs 报税.
 *
 * Chinese only. The route carries `only: ['zh-hans']` in content/routes.ts, so
 * this component never renders in English and its copy is empty there; see the
 * note on VS_TAX_INTRO in content/pages.ts for why an English version would be
 * a page nobody searches for.
 *
 * The last section is the point of the page. It states plainly that the
 * practice does not file T1 or T2 returns, which is the boundary the whole
 * Chinese-language strategy rests on: this market's default assumption is that
 * an accounting firm does everything, and saying otherwise is what makes the
 * rest of the copy believable.
 */
const BookkeepingVsTaxFilingPage: React.FC = () => {
  const { copy, path } = useLocale();
  const t = copy.ui.vsTaxPage;

  return (
    <>
      <div className="hero reveal">
        <h1 className="h1 h1--wide">
          <span className="eyebrow h1__eyebrow">{t.eyebrow}</span>
          {t.headline} <em>{t.headlineEm}</em>
        </h1>

        <p className="hero__sub">{t.sub}</p>

        <div className="hero__cta">
          <Link to={path('/contact')} className="btn btn--primary">
            {copy.ui.hero.cta}
          </Link>
        </div>
      </div>

      <section className="sec">
        <div className="inner">
          <div className="reveal" style={{ maxWidth: '62ch' }}>
            {copy.pages.VS_TAX_INTRO.map((paragraph, i) => (
              <p key={i} className="detail__summary" style={{ marginBottom: '18px' }}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec--paper">
        <div className="inner">
          <div className="reveal" style={{ maxWidth: '52ch' }}>
            <p className="eyebrow eyebrow--paper intro__eyebrow">{t.rolesEyebrow}</p>
            <h2 className="h2">{t.rolesH2}</h2>
          </div>

          {copy.pages.VS_TAX_ROLES.map((section, i) => (
            <div
              key={section.h}
              className="reveal"
              style={{ ...revealDelay(i * 60), marginTop: '44px', maxWidth: '68ch' }}
            >
              <h3 className="detail__h">{section.h}</h3>
              {section.body.map((paragraph, j) => (
                <p key={j} className="detail__p">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* The boundary. Not a disclaimer tucked at the bottom — it is the
          reason someone finishes this page trusting the rest of the site. */}
      <section className="sec">
        <div className="inner">
          <div className="reveal" style={{ maxWidth: '52ch' }}>
            <p className="eyebrow intro__eyebrow">{t.boundaryEyebrow}</p>
            <h2 className="h2">{t.boundaryH2}</h2>
          </div>

          {copy.pages.VS_TAX_BOUNDARY.map((section, i) => (
            <div
              key={section.h}
              className="reveal"
              style={{ ...revealDelay(i * 60), marginTop: '44px', maxWidth: '68ch' }}
            >
              <h3 className="detail__h">{section.h}</h3>
              {section.body.map((paragraph, j) => (
                <p key={j} className="detail__p">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}

          <p className="tax-note">
            {t.linksBefore}
            <Link to={path('/services')}>{t.linkServices}</Link>
            {t.linksMiddle}
            <Link to={path('/pricing')}>{t.linkPricing}</Link>
            {t.linksAfter}
          </p>
        </div>
      </section>

      <section className="sec sec--rule">
        <div className="inner reveal remote-cta">
          <h2 className="h2" style={{ maxWidth: '24ch' }}>
            {t.ctaH2}
          </h2>
          <p className="detail__p">{t.ctaP}</p>
          <div className="hero__cta">
            <Link to={path('/contact')} className="btn btn--primary">
              {copy.ui.hero.cta}
            </Link>
          </div>
          <p className="detail__p remote-cta__links">
            <Link to={path('/gst-pst-bc')}>{copy.ui.tax.more}</Link> ·{' '}
            <Link to={path('/catch-up-bookkeeping')}>{copy.ui.pricing.catchUpLink}</Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default BookkeepingVsTaxFilingPage;
