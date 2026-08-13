import React from 'react';
import { Link } from 'react-router';
import { useLocale } from '../components/LocaleContext';
import { revealDelay } from '../components/useScrollReveal';

/**
 * /bc-pst-registration.
 *
 * Navigational intent — someone searching this wants to register, not to read
 * about registering. So the shape is intro, who it applies to, the steps, then
 * the two things people get wrong afterwards.
 *
 * It deliberately does not restate the GST/PST explainer. That page owns the
 * comparison and this one links to it; two pages covering the same ground at
 * half the depth each is worse than one covering it properly.
 */
const BcPstRegistrationPage: React.FC = () => {
  const { copy, path } = useLocale();
  const t = copy.ui.pstRegistrationPage;

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
            {copy.pages.PST_REG_INTRO.map((paragraph, i) => (
              <p key={i} className="detail__summary" style={{ marginBottom: '18px' }}>
                {paragraph}
              </p>
            ))}
            <p className="detail__p">
              <Link to={path('/gst-pst-bc')}>{t.explainerLink}</Link>
            </p>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="inner">
          <div className="reveal" style={{ maxWidth: '52ch' }}>
            <p className="eyebrow intro__eyebrow">{t.whoEyebrow}</p>
            <h2 className="h2">{t.whoH2}</h2>
          </div>

          <div className="tax-pair reveal" style={{ marginTop: '52px' }}>
            {copy.pages.PST_REG_WHO.columns.map((column) => (
              <div key={column.h} className="tax-cell">
                <h3 className="tax-cell__name">{column.h}</h3>
                <ul className="tax-cell__list">
                  {column.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="tax-note">{copy.pages.PST_REG_WHO.caveat}</p>
        </div>
      </section>

      <section className="sec sec--paper">
        <div className="inner">
          <div className="reveal" style={{ maxWidth: '52ch' }}>
            <p className="eyebrow eyebrow--paper intro__eyebrow">{t.stepsEyebrow}</p>
            <h2 className="h2">{t.stepsH2}</h2>
          </div>

          <div className="grid principles">
            {copy.pages.PST_REG_STEPS.map((step, i) => (
              <article key={step.n} className="reveal" style={revealDelay(i * 90)}>
                <div className="step__marker" aria-hidden="true">
                  {step.n}
                </div>
                <h3 className="step__h">{step.h}</h3>
                <p className="step__p">{step.p}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="inner split">
          <div className="reveal">
            <p className="eyebrow intro__eyebrow">{t.afterEyebrow}</p>
            <h2 className="h2">{copy.pages.PST_REG_AFTER.h}</h2>
          </div>

          <div className="reveal">
            {copy.pages.PST_REG_AFTER.body.map((paragraph, i) => (
              <p key={i} className="detail__p">
                {paragraph}
              </p>
            ))}
            <p className="detail__p">
              <Link to={path('/services')}>{t.servicesLink}</Link>
            </p>
          </div>
        </div>
      </section>

      <section className="sec sec--paper">
        <div className="inner split">
          <div className="reveal">
            <p className="eyebrow eyebrow--paper intro__eyebrow">{t.lateEyebrow}</p>
            <h2 className="h2">{copy.pages.PST_REG_LATE.h}</h2>
          </div>

          <div className="reveal">
            {copy.pages.PST_REG_LATE.body.map((paragraph, i) => (
              <p key={i} className="detail__p">
                {paragraph}
              </p>
            ))}
            <p className="detail__p">
              <Link to={path('/catch-up-bookkeeping')}>{copy.pages.PST_REG_LATE.linkText}</Link>
            </p>
          </div>
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
            <Link to={path('/gst-pst-bc')}>{t.explainerLink}</Link> ·{' '}
            <Link to={path('/pricing')}>{copy.ui.remotePage.ctaLinkPricing}</Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default BcPstRegistrationPage;
