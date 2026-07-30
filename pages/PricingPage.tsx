import React from 'react';
import { Link } from 'react-router';
import { useLocale } from '../components/LocaleContext';
import { revealDelay } from '../components/useScrollReveal';

/**
 * The standalone /pricing route, targeting the cost question directly.
 *
 * None of our own figures appear here, same as everywhere else on the site.
 * The page answers what drives the number and what the market charges, and the
 * number itself arrives in the written quote.
 */
const PricingPage: React.FC = () => {
  const { copy, path } = useLocale();
  const t = copy.ui.pricingPage;
  const { pricing } = copy.ui;
  /** The market-rate answer, which is the actual question behind "what does this cost". */
  const marketRates = copy.site.FAQS[0].a;

  return (
    <>
      <div className="hero reveal">
        <h1 className="h1 h1--wide">
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
          <div className="reveal" style={{ maxWidth: '52ch' }}>
            <p className="eyebrow intro__eyebrow">{t.howEyebrow}</p>
            <h2 className="h2">{t.howH2}</h2>
          </div>

          <div className="grid principles">
            {copy.pages.PRICING_PRINCIPLES.map((principle, i) => (
              <article key={principle.h} className="reveal" style={revealDelay(i * 90)}>
                <h3 className="why-row__h">{principle.h}</h3>
                <p className="step__p">{principle.p}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec--paper">
        <div className="inner">
          <div className="reveal" style={{ maxWidth: '56ch' }}>
            <p className="eyebrow eyebrow--paper intro__eyebrow">{t.marketEyebrow}</p>
            <h2 className="h2">{t.marketH2}</h2>
          </div>
          <p className="lede lede--paper detail__p" style={{ maxWidth: '68ch', marginTop: '22px' }}>
            {marketRates}
          </p>
        </div>
      </section>

      <section className="sec">
        <div className="inner">
          <div className="reveal" style={{ maxWidth: '52ch' }}>
            <p className="eyebrow intro__eyebrow">{t.factorsEyebrow}</p>
            <h2 className="h2">{t.factorsH2}</h2>
          </div>

          <div className="factors">
            {copy.pages.PRICE_FACTORS.map((factor, i) => (
              <div key={factor.h} className="factor reveal" style={revealDelay(i * 70)}>
                <span className="factor__n">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="factor__h">{factor.h}</h3>
                  <p className="factor__p">{factor.p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec--paper">
        <div className="inner">
          <div className="reveal" style={{ maxWidth: '58ch' }}>
            <p className="eyebrow eyebrow--paper intro__eyebrow">{t.plansEyebrow}</p>
            <h2 className="h2">{t.plansH2}</h2>
            <p className="lede lede--paper intro__p" style={{ fontSize: '17px' }}>
              {t.plansLede}
            </p>
          </div>

          <div className="grid tiers">
            {copy.site.TIERS.map((tier, i) => (
              <article
                key={tier.name}
                className={`tier reveal${tier.featured ? ' tier--featured' : ''}`}
                style={revealDelay(i * 110)}
              >
                <div className="tier__name-row">
                  <h3 className="tier__name">{tier.name}</h3>
                  {tier.featured && <span className="tier__tag">{pricing.mostChosen}</span>}
                </div>
                <p className="tier__audience">{tier.audience}</p>
                <p className="tier__cap">{tier.cap}</p>

                <ul className="tier__features">
                  {tier.features.map((feature) => (
                    <li key={feature.text} data-included={String(feature.included)}>
                      <span className="tier__marker" aria-hidden="true">
                        {feature.included ? '·' : '—'}
                      </span>
                      <span>
                        {feature.included ? (
                          ''
                        ) : (
                          <span className="visually-hidden">{pricing.notSure}</span>
                        )}
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={path('/contact')}
                  className={`tier__cta${tier.featured ? ' tier__cta--filled' : ''}`}
                >
                  {pricing.cta}
                </Link>
              </article>
            ))}
          </div>

          <div className="pricing-notes reveal">
            <div>
              <p className="micro micro--paper pricing-notes__label">{pricing.oneTimeLabel}</p>
              <p className="pricing-notes__body">
                <strong>{pricing.catchUpName}</strong> {pricing.catchUpBody}
              </p>
            </div>
            <div>
              <p className="micro micro--paper pricing-notes__label">{pricing.oneTimeLabel}</p>
              <p className="pricing-notes__body">
                <strong>{pricing.setupName}</strong> {t.setupBody}
                <Link to={path('/services')}>{t.setupLink}</Link>
                {t.setupAfter}
              </p>
            </div>
            <div>
              <p className="micro micro--paper pricing-notes__label">{pricing.finePrintLabel}</p>
              <p className="fine-print">{pricing.finePrint}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PricingPage;
