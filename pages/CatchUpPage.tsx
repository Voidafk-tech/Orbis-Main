import React from 'react';
import { Link } from 'react-router';
import { useLocale } from '../components/LocaleContext';
import { revealDelay } from '../components/useScrollReveal';

/**
 * /catch-up-bookkeeping — the distress offer, and by the practice's own account
 * the most common reason anyone gets in touch.
 *
 * The register is deliberately calm. Someone reading this already knows they
 * are behind; the page's job is to make the next step feel ordinary rather than
 * to remind them it is bad.
 */
const CatchUpPage: React.FC = () => {
  const { copy, path } = useLocale();
  const t = copy.ui.catchUpPage;

  return (
    <>
      <div className="hero reveal">
        <h1 className="h1">
          <span className="eyebrow h1__eyebrow">{t.eyebrow}</span>
          {t.headline}{' '}
          <em>{t.headlineEm}</em>
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
            {copy.pages.CATCH_UP_INTRO.map((paragraph, i) => (
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
            <p className="eyebrow eyebrow--paper intro__eyebrow">{t.stagesEyebrow}</p>
            <h2 className="h2">{t.stagesH2}</h2>
          </div>

          <div className="grid pains">
            {copy.pages.CATCH_UP_STAGES.map((stage, i) => (
              <article key={stage.n} className="pain reveal" style={revealDelay(i * 90)}>
                <p className="pain__n">{stage.n}</p>
                <h3 className="pain__h">{stage.h}</h3>
                <p className="pain__p">{stage.p}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="inner">
          <div className="reveal" style={{ maxWidth: '52ch' }}>
            <p className="eyebrow intro__eyebrow">{t.processEyebrow}</p>
            <h2 className="h2">{t.processH2}</h2>
          </div>

          <div className="grid principles">
            {copy.pages.CATCH_UP_PROCESS.map((step, i) => (
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

      <section className="sec sec--paper">
        <div className="inner split">
          <div className="reveal">
            <p className="eyebrow eyebrow--paper intro__eyebrow">{t.reassuranceEyebrow}</p>
            <h2 className="h2">{copy.pages.CATCH_UP_REASSURANCE.h}</h2>
          </div>

          <div className="reveal">
            {copy.pages.CATCH_UP_REASSURANCE.body.map((paragraph, i) => (
              <p key={i} className="detail__p">
                {paragraph}
              </p>
            ))}
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
            <Link to={path('/services')}>{copy.ui.remotePage.ctaLinkServices}</Link> ·{' '}
            <Link to={path('/pricing')}>{copy.ui.remotePage.ctaLinkPricing}</Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default CatchUpPage;
