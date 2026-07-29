import React from 'react';
import { Link } from 'react-router';
import { useLocale } from '../components/LocaleContext';
import { AREAS_SERVED } from '../content/business';
import { revealDelay } from '../components/useScrollReveal';

/**
 * /remote-bookkeeping.
 *
 * The one page whose ranking is not capped by proximity: "remote bookkeeping"
 * and "virtual bookkeeping" return no local pack, so the page competes on its
 * own merits rather than on where the practice sits.
 *
 * It answers *how* the work happens without anyone dropping anything off,
 * which is the question behind the query. /services covers what gets done.
 */
const RemoteBookkeepingPage: React.FC = () => {
  const { copy, path } = useLocale();
  const t = copy.ui.remotePage;
  const { REMOTE_MECHANICS, REMOTE_MONTH, REMOTE_TRADEOFF, REMOTE_FAQS } = copy.pages;

  return (
    <>
      <div className="hero reveal">
        <h1 className="h1">
          <span className="eyebrow h1__eyebrow">{t.eyebrow}</span>
          {t.headline}
          <br />
          <em>{t.headlineEm}</em>
        </h1>

        <p className="hero__sub">{t.sub}</p>

        <div className="hero__cta">
          <Link to={path('/contact')} className="btn btn--primary">
            {copy.ui.hero.cta}
          </Link>
          <p className="hero__reassure">{copy.ui.hero.reassure}</p>
        </div>
      </div>

      <section className="sec">
        <div className="inner">
          <div className="reveal" style={{ maxWidth: '56ch' }}>
            <p className="eyebrow intro__eyebrow">{t.howEyebrow}</p>
            <h2 className="h2">{t.howH2}</h2>
            <p className="lede intro__p">{t.howLede}</p>
          </div>

          <div className="grid pains">
            {REMOTE_MECHANICS.map((item, i) => (
              <article key={item.n} className="pain reveal" style={revealDelay(i * 90)}>
                <p className="pain__n">{item.n}</p>
                <h3 className="pain__h">{item.h}</h3>
                <p className="pain__p">{item.p}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec--paper">
        <div className="inner">
          <div className="reveal" style={{ maxWidth: '52ch' }}>
            <p className="eyebrow eyebrow--paper intro__eyebrow">{t.monthEyebrow}</p>
            <h2 className="h2">{t.monthH2}</h2>
          </div>

          <div className="grid steps">
            {REMOTE_MONTH.map((step, i) => (
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

      <section className="sec sec--rule">
        <div className="inner split">
          <div className="reveal">
            <p className="eyebrow intro__eyebrow">{t.tradeoffEyebrow}</p>
            <h2 className="h2">{t.tradeoffH2}</h2>
          </div>

          <div>
            {REMOTE_TRADEOFF.gains.map((row, i) => (
              <div key={row.h} className="factor reveal" style={revealDelay(i * 80)}>
                <span className="factor__n" aria-hidden="true">
                  +
                </span>
                <div>
                  <h3 className="factor__h">{row.h}</h3>
                  <p className="factor__p">{row.p}</p>
                </div>
              </div>
            ))}

            <div className="factor factor--counter reveal" style={revealDelay(240)}>
              <span className="factor__n" aria-hidden="true">
                −
              </span>
              <div>
                <h3 className="factor__h">{REMOTE_TRADEOFF.gives_up.h}</h3>
                <p className="factor__p">{REMOTE_TRADEOFF.gives_up.p}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="inner">
          <div className="reveal" style={{ maxWidth: '54ch' }}>
            <p className="eyebrow intro__eyebrow">{t.areasEyebrow}</p>
            <h2 className="h2">{t.areasH2}</h2>
            <p className="lede intro__p">{t.areasLede}</p>
          </div>

          {/* Place names are not translated: these are the labels the structured
              data uses, and a reader cross-checking against a map wants them. */}
          <ul className="area-list reveal">
            {AREAS_SERVED.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec sec--paper" id="questions">
        <div className="inner split split--faq">
          <div className="reveal">
            <p className="eyebrow eyebrow--paper intro__eyebrow">{t.faqEyebrow}</p>
            <h2 className="h2 h2--faq">{t.faqH2}</h2>
            <p className="faq__intro-p">
              {t.faqIntroA}
              <Link to={path('/')}>{t.faqIntroLink}</Link>
              {t.faqIntroB}
            </p>
          </div>

          {/* Native details/summary — no JavaScript, and open by keyboard. */}
          <div className="reveal">
            {REMOTE_FAQS.map((item) => (
              <details key={item.q} className="faq-item">
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec--rule">
        <div className="inner reveal remote-cta">
          <h2 className="h2" style={{ maxWidth: '20ch' }}>
            {t.ctaH2}
          </h2>
          <p className="detail__p">{t.ctaP}</p>
          <div className="hero__cta">
            <Link to={path('/contact')} className="btn btn--primary">
              {copy.ui.hero.cta}
            </Link>
          </div>
          <p className="detail__p remote-cta__links">
            <Link to={path('/services')}>{t.ctaLinkServices}</Link> ·{' '}
            <Link to={path('/pricing')}>{t.ctaLinkPricing}</Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default RemoteBookkeepingPage;
