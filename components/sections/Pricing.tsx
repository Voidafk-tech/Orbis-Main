import React from 'react';
import { Link } from 'react-router';
import Anchor from '../Anchor';
import { useLocale } from '../LocaleContext';
import { revealDelay } from '../useScrollReveal';

const Pricing: React.FC = () => {
  const { copy, path } = useLocale();
  const { pricing } = copy.ui;

  return (
    <section className="sec sec--paper" id="pricing">
      <div className="inner">
        <div className="reveal" style={{ maxWidth: '58ch' }}>
          <p className="eyebrow eyebrow--paper intro__eyebrow">{pricing.eyebrow}</p>
          <h2 className="h2">{pricing.h2}</h2>
          <p className="lede lede--paper intro__p" style={{ fontSize: '17px' }}>
            <Link to={path('/pricing')}>{pricing.more}</Link>
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

              <Anchor to="start" className={`tier__cta${tier.featured ? ' tier__cta--filled' : ''}`}>
                {pricing.cta}
              </Anchor>
            </article>
          ))}
        </div>

        <div className="pricing-notes reveal">
          <div>
            <p className="micro micro--paper pricing-notes__label">{pricing.oneTimeLabel}</p>
            <p className="pricing-notes__body">
              <strong>{pricing.catchUpName}</strong> {pricing.catchUpBody}{' '}
              <Link to={path('/catch-up-bookkeeping')}>{pricing.catchUpLink}</Link>
            </p>
          </div>
          <div>
            <p className="micro micro--paper pricing-notes__label">{pricing.oneTimeLabel}</p>
            <p className="pricing-notes__body">
              <strong>{pricing.setupName}</strong> {pricing.setupBody}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
