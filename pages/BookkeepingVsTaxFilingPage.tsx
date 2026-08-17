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
 * The page contrasts two kinds of work rather than two kinds of people: the
 * monthly books and the year-end return. It used to close on a refusal — T1 and
 * T2 returns stated as out of scope — which the practice has since made plainly
 * wrong. The last section now sets out what is taken on in each half of the
 * year, and describes the work rather than who is entitled to sign it.
 */
const BookkeepingVsTaxFilingPage: React.FC = () => {
  const { copy, path } = useLocale();
  const t = copy.ui.vsTaxPage;

  return (
    <>
      <div className="hero reveal">
        <h1 className="h1">
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

      {/* What is taken on in each half of the year. Concrete rather than a
          closing pitch — it is the reason someone finishes this page knowing
          what they would actually be buying. */}
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
