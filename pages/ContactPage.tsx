import React from 'react';
import { Link } from 'react-router';
import Intake from '../components/sections/Intake';
import { CONTACT_EXPECT, CONTACT_STEPS } from '../content/pages';
import { CONTACT } from '../content/site';
import { BUSINESS } from '../content/business';
import { revealDelay } from '../components/useScrollReveal';

/**
 * The intake form on its own route, for direct links and ad traffic.
 *
 * The form on its own was thin enough to risk being read as a soft 404, so the
 * page also answers what happens after you send it and carries the practice's
 * hours and service area — which is what someone searching the business by name
 * is looking for anyway.
 */
const ContactPage: React.FC = () => (
  <>
    <Intake headingLevel="h1" />

    <section className="sec sec--rule">
      <div className="inner">
        <div className="reveal" style={{ maxWidth: '52ch' }}>
          <p className="eyebrow intro__eyebrow">What happens next</p>
          <h2 className="h2">Three steps, and no sales call.</h2>
        </div>

        <div className="grid steps">
          {CONTACT_STEPS.map((step, i) => (
            <article key={step.n} className="reveal" style={revealDelay(i * 110)}>
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
          <p className="eyebrow eyebrow--paper intro__eyebrow">What to expect</p>
          <h2 className="h2">A written reply, not a calendar invite.</h2>
        </div>

        <div>
          {CONTACT_EXPECT.map((row, i) => (
            <div key={row.h} className="why-row why-row--plain reveal" style={revealDelay(i * 90)}>
              <h3 className="why-row__h">{row.h}</h3>
              <p className="why-row__p">{row.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="sec">
      <div className="inner contact-details">
        <div className="reveal">
          <p className="eyebrow intro__eyebrow">Reach us directly</p>
          <ul className="contact-list">
            <li>
              <span className="micro">Email</span>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </li>
            <li>
              <span className="micro">Phone</span>
              <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
            </li>
          </ul>
        </div>

        <div className="reveal" style={revealDelay(90)}>
          <p className="eyebrow intro__eyebrow">Hours</p>
          <p className="contact-detail__p">
            Monday to Friday, 9am to 5pm Pacific. Enquiries sent outside those hours are answered
            on the next business day.
          </p>
        </div>

        <div className="reveal" style={revealDelay(180)}>
          <p className="eyebrow intro__eyebrow">Where we work</p>
          {/* The visible address has to match the structured data and the Google
              Business Profile character for character — see content/business.ts. */}
          <address className="contact-detail__p contact-address">
            {BUSINESS.streetAddress}
            <br />
            {BUSINESS.addressLocality}, {BUSINESS.addressRegion} {BUSINESS.postalCode}
          </address>
          <p className="contact-detail__p">
            We work with businesses across British Columbia and everything is done online — there
            is nothing to drop off and no office visit required.
          </p>
          <p className="contact-detail__p">
            <Link to="/services">What we handle</Link> ·{' '}
            <Link to="/pricing">How the plans are scoped</Link>
          </p>
        </div>
      </div>
    </section>
  </>
);

export default ContactPage;
