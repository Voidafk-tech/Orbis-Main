import React from 'react';
import { Link } from 'react-router';
import Intake from '../components/sections/Intake';
import { WeChatId } from '../components/WeChatContact';
import { useLocale } from '../components/LocaleContext';
import { revealDelay } from '../components/useScrollReveal';

/**
 * The intake form on its own route, for direct links and ad traffic.
 *
 * The form on its own was thin enough to risk being read as a soft 404, so the
 * page also answers what happens after you send it and carries the practice's
 * hours and service area — which is what someone searching the business by name
 * is looking for anyway.
 */
const ContactPage: React.FC = () => {
  const { copy, path } = useLocale();
  const t = copy.ui.contactPage;
  const { CONTACT, WECHAT } = copy.site;

  return (
    <>
      <Intake headingLevel="h1" reassurance />

      <section className="sec sec--rule">
        <div className="inner">
          <div className="reveal" style={{ maxWidth: '52ch' }}>
            <p className="eyebrow intro__eyebrow">{t.stepsEyebrow}</p>
            <h2 className="h2">{t.stepsH2}</h2>
          </div>

          <div className="grid steps">
            {copy.pages.CONTACT_STEPS.map((step, i) => (
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
            <p className="eyebrow eyebrow--paper intro__eyebrow">{t.expectEyebrow}</p>
            <h2 className="h2">{t.expectH2}</h2>
          </div>

          <div>
            {copy.pages.CONTACT_EXPECT.map((row, i) => (
              <div
                key={row.h}
                className="why-row why-row--plain reveal"
                style={revealDelay(i * 90)}
              >
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
            <p className="eyebrow intro__eyebrow">{t.reachEyebrow}</p>
            <ul className="contact-list">
              <li>
                <span className="micro">{t.emailLabel}</span>
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </li>
              <li>
                <span className="micro">{t.phoneLabel}</span>
                <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
              </li>
              {/* Email and phone already appear both here and in the intake
                  block at the top of this page, so repeating the ID matches how
                  the page treats the other two. The QR is the one thing that is
                  not repeated — one code per page is enough, and a second would
                  read as two different codes. */}
              <li className="contact-list__wechat">
                <span className="micro">{copy.ui.wechat.label}</span>
                <span className="wechat__account">{WECHAT.account}</span>
                <WeChatId />
              </li>
            </ul>
          </div>

          <div className="reveal" style={revealDelay(90)}>
            <p className="eyebrow intro__eyebrow">{t.hoursEyebrow}</p>
            <p className="contact-detail__p">{t.hours}</p>
          </div>

          <div className="reveal" style={revealDelay(180)}>
            <p className="eyebrow intro__eyebrow">{t.whereEyebrow}</p>
            {/* Locality only — no street address on the rendered page by choice.
                It stays in the structured data and on the Business Profile,
                which is what local search actually reads. */}
            <p className="contact-detail__p contact-locality">{copy.ui.locality}</p>
            <p className="contact-detail__p">{t.whereP}</p>
            <p className="contact-detail__p">
              <Link to={path('/services')}>{t.linkServices}</Link> ·{' '}
              <Link to={path('/pricing')}>{t.linkPricing}</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
