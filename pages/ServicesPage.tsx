import React from 'react';
import { Link } from 'react-router';
import Anchor from '../components/Anchor';
import { useLocale } from '../components/LocaleContext';
import { revealDelay } from '../components/useScrollReveal';

/**
 * The standalone /services route. Goes deeper than the home page's Services
 * section rather than repeating it — two URLs carrying the same copy compete
 * with each other rather than ranking.
 */
const ServicesPage: React.FC = () => {
  const { copy, path } = useLocale();
  const t = copy.ui.servicesPage;

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
          {copy.pages.SERVICE_DETAIL.map((service, i) => (
            <article key={service.n} className="detail reveal" style={revealDelay((i % 2) * 80)}>
              <div className="detail__aside">
                <span className="service__n">{service.n}</span>
                <h2 className="detail__h">{service.h}</h2>
                <p className="micro detail__who">{service.forWho}</p>
              </div>

              <div className="detail__body">
                <p className="detail__summary">{service.summary}</p>
                {service.detail.map((paragraph, j) => (
                  <p key={j} className="detail__p">
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
            <p className="eyebrow eyebrow--paper intro__eyebrow">{t.boundaryEyebrow}</p>
            <h2 className="h2">{copy.pages.SERVICES_BOUNDARY.h}</h2>
          </div>

          <div className="reveal">
            {copy.pages.SERVICES_BOUNDARY.body.map((paragraph, i) => (
              <p key={i} className="detail__p">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec--rule">
        <div className="inner reveal">
          <p className="micro">{t.worksWith}</p>
          <ul className="platform-list">
            {copy.site.PLATFORMS.map((platform) => (
              <li key={platform.alt}>{platform.alt}</li>
            ))}
          </ul>
          <p className="detail__p platform-list__note">
            {t.platformsNoteA}
            <Link to={path('/remote-bookkeeping')}>{t.platformsLinkRemote}</Link>
            {t.platformsNoteB}
            <Link to={path('/pricing')}>{t.platformsLinkPricing}</Link>
            {t.platformsNoteC}
            <Anchor to="questions">{t.platformsLinkQuestions}</Anchor>
            {t.platformsNoteD}
          </p>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;
