import React from 'react';
import { Link } from 'react-router';
import { PRICE_FACTORS, PRICING_PRINCIPLES } from '../content/pages';
import { FAQS, TIERS } from '../content/site';
import { revealDelay } from '../components/useScrollReveal';

/** The market-rate answer, which is the actual question behind "what does this cost". */
const MARKET_RATES = FAQS[0].a;

/**
 * The standalone /pricing route, targeting the cost question directly.
 *
 * None of our own figures appear here, same as everywhere else on the site.
 * The page answers what drives the number and what the market charges, and the
 * number itself arrives in the written quote.
 */
const PricingPage: React.FC = () => (
  <>
    <div className="hero reveal">
      <h1 className="h1">
        <span className="eyebrow h1__eyebrow">Plans and pricing</span>
        What bookkeeping
        <br />
        <em>actually costs.</em>
      </h1>

      <p className="hero__sub">
        We work on a fixed monthly plan sized to your transaction volume, not an hourly rate. Here
        is how the number is put together, what moves it, and what the rest of the market charges.
      </p>

      <div className="hero__cta">
        <Link to="/contact" className="btn btn--primary">
          Get a plan and a quote
        </Link>
        <p className="hero__reassure">A written plan and a price within one business day</p>
      </div>
    </div>

    <section className="sec">
      <div className="inner">
        <div className="reveal" style={{ maxWidth: '52ch' }}>
          <p className="eyebrow intro__eyebrow">How it works</p>
          <h2 className="h2">Four things that are always true.</h2>
        </div>

        <div className="grid principles">
          {PRICING_PRINCIPLES.map((principle, i) => (
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
          <p className="eyebrow eyebrow--paper intro__eyebrow">What the market charges</p>
          <h2 className="h2">The honest answer to what this costs.</h2>
        </div>
        <p className="lede lede--paper detail__p" style={{ maxWidth: '68ch', marginTop: '22px' }}>
          {MARKET_RATES}
        </p>
      </div>
    </section>

    <section className="sec">
      <div className="inner">
        <div className="reveal" style={{ maxWidth: '52ch' }}>
          <p className="eyebrow intro__eyebrow">What moves the number</p>
          <h2 className="h2">Five things we look at.</h2>
        </div>

        <div className="factors">
          {PRICE_FACTORS.map((factor, i) => (
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
          <p className="eyebrow eyebrow--paper intro__eyebrow">The plans</p>
          <h2 className="h2">Scoped by how much work there is.</h2>
          <p className="lede lede--paper intro__p" style={{ fontSize: '17px' }}>
            Three plans, sized to your transaction volume. If you are not sure which one you are,
            guess low and we will tell you in the quote.
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
                        <span className="visually-hidden">Not included: </span>
                      )}
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                to="/contact"
                className={`tier__cta${tier.featured ? ' tier__cta--filled' : ''}`}
              >
                Get a plan and a quote
              </Link>
            </article>
          ))}
        </div>

        <div className="pricing-notes reveal">
          <div>
            <p className="micro micro--paper pricing-notes__label">One-time work</p>
            <p className="pricing-notes__body">
              <strong>Catch-up bookkeeping</strong> — Quoted after we see how far behind you are.
              One number, agreed before any work starts.
            </p>
          </div>
          <div>
            <p className="micro micro--paper pricing-notes__label">One-time work</p>
            <p className="pricing-notes__body">
              <strong>Software setup and migration</strong> — Quoted once, on QuickBooks Online,
              Xero or Sage 50. <Link to="/services">See what setup covers</Link>.
            </p>
          </div>
          <div>
            <p className="micro micro--paper pricing-notes__label">The fine print</p>
            <p className="fine-print">
              All plans are contract based, with the term set per client. Every plan is a fixed
              monthly figure, quoted in writing before any work starts, in CAD plus GST. No hourly
              billing. Over 400 transactions a month, ask and we will quote it.
            </p>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default PricingPage;
