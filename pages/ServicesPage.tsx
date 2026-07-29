import React from 'react';
import { Link } from 'react-router';
import Anchor from '../components/Anchor';
import { SERVICE_DETAIL, SERVICES_BOUNDARY } from '../content/pages';
import { PLATFORMS } from '../content/site';
import { revealDelay } from '../components/useScrollReveal';

/**
 * The standalone /services route. Goes deeper than the home page's Services
 * section rather than repeating it — two URLs carrying the same copy compete
 * with each other rather than ranking.
 */
const ServicesPage: React.FC = () => (
  <>
    <div className="hero reveal">
      <h1 className="h1">
        <span className="eyebrow h1__eyebrow">What we handle</span>
        Bookkeeping services
        <br />
        <em>for BC small business.</em>
      </h1>

      <p className="hero__sub">
        Six things, off your desk. Monthly bookkeeping, GST and PST filing, payroll and T4s,
        reporting, software setup and catch-up work — all of it done from West Vancouver, for
        businesses anywhere in British Columbia.
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
        {SERVICE_DETAIL.map((service, i) => (
          <article key={service.n} className="detail reveal" style={revealDelay((i % 2) * 80)}>
            <div className="detail__aside">
              <span className="service__n">{service.n}</span>
              <h2 className="detail__h">{service.h}</h2>
              <p className="micro detail__who">{service.forWho}</p>
            </div>

            <div className="detail__body">
              <p className="detail__summary">{service.summary}</p>
              {service.detail.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="detail__p">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>

    <section className="sec sec--paper">
      <div className="inner split">
        <div className="reveal">
          <p className="eyebrow eyebrow--paper intro__eyebrow">The boundary</p>
          <h2 className="h2">{SERVICES_BOUNDARY.h}</h2>
        </div>

        <div className="reveal">
          {SERVICES_BOUNDARY.body.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="detail__p">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>

    <section className="sec sec--rule">
      <div className="inner reveal">
        <p className="micro">Works with</p>
        <ul className="platform-list">
          {PLATFORMS.map((platform) => (
            <li key={platform.alt}>{platform.alt}</li>
          ))}
        </ul>
        <p className="detail__p platform-list__note">
          We work in QuickBooks Online, Xero and Sage 50, so you can stay on whichever one you
          already use. Shopify and Stripe connect to all three.{' '}
          <Link to="/pricing">See how the plans are scoped</Link>, or{' '}
          <Anchor to="questions">read the questions people actually ask</Anchor>.
        </p>
      </div>
    </section>
  </>
);

export default ServicesPage;
