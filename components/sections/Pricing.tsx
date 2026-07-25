import React from 'react';
import Anchor from '../Anchor';
import { TIERS } from '../../content/site';
import { revealDelay } from '../useScrollReveal';

const Pricing: React.FC = () => (
  <section className="sec sec--paper" id="pricing">
    <div className="inner">
      <div className="reveal" style={{ maxWidth: '58ch' }}>
        <p className="eyebrow eyebrow--paper intro__eyebrow">Pricing</p>
        <h2 className="h2">Priced by how much work there is.</h2>
        <p className="lede lede--paper intro__p" style={{ fontSize: '17px' }}>
          Pick the row that matches your transaction volume. If you are not sure, guess low and we
          will tell you in the quote.
        </p>
      </div>

      <div className="grid tiers">
        {TIERS.map((tier, i) => (
          <article
            key={tier.name}
            className={`tier reveal${tier.featured ? ' tier--featured' : ''}`}
            style={revealDelay(i * 110)}
          >
            <div className="tier__name-row">
              <h3 className="tier__name">{tier.name}</h3>
              {tier.featured && <span className="tier__tag">Most chosen</span>}
            </div>
            <p className="tier__audience">{tier.audience}</p>

            <p className="tier__price">
              <span className="tier__amount">{tier.price}</span>
              <span className="tier__per">/mo</span>
            </p>
            <p className="tier__cap">{tier.cap}</p>

            <ul className="tier__features">
              {tier.features.map((feature) => (
                <li key={feature.text} data-included={String(feature.included)}>
                  <span className="tier__marker" aria-hidden="true">
                    {feature.included ? '·' : '—'}
                  </span>
                  <span>
                    {feature.included ? '' : <span className="visually-hidden">Not included: </span>}
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>

            <Anchor
              to="start"
              className={`tier__cta${tier.featured ? ' tier__cta--filled' : ''}`}
            >
              Get a plan and a quote
            </Anchor>
          </article>
        ))}
      </div>

      <div className="pricing-notes reveal">
        <div>
          <p className="micro micro--paper pricing-notes__label">One-time work</p>
          <p className="pricing-notes__body">
            <strong>Catch-up bookkeeping</strong> — Quoted after we see how far behind you are. One
            number, agreed before any work starts.
          </p>
        </div>
        <div>
          <p className="micro micro--paper pricing-notes__label">One-time work</p>
          <p className="pricing-notes__body">
            <strong>Software setup and migration</strong> — <span className="amount">$300</span>{' '}
            once, on QuickBooks Online, Xero or Sage 50. Chart of accounts, bank feeds,
            integrations, and one training session.
          </p>
        </div>
        <div>
          <p className="micro micro--paper pricing-notes__label">The fine print</p>
          <p className="fine-print">
            All plans are contract based, with the term set per client. No setup fee, no hourly
            billing. Prices in CAD, plus GST. Over 400 transactions a month, ask and we will quote
            it.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default Pricing;
