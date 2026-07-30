import React from 'react';
import { Link } from 'react-router';
import { useLocale } from '../components/LocaleContext';
import { revealDelay } from '../components/useScrollReveal';

/**
 * /gst-pst-bc.
 *
 * The home page's explainer promoted to its own page — it was the strongest
 * content on the site and it was buried inside a section of a page trying to do
 * six other jobs. The home page keeps a short version and links here.
 *
 * The rates come from RATES_AS_OF, the single date stamp. Do not introduce a
 * second copy of that date anywhere, in either language.
 */
const GstPstPage: React.FC = () => {
  const { copy, path } = useLocale();
  const t = copy.ui.gstPstPage;
  const { tax } = copy.ui;

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
          <div className="reveal" style={{ maxWidth: '58ch' }}>
            <p className="eyebrow intro__eyebrow">{t.ratesEyebrow}</p>
            {copy.pages.GST_PST_INTRO.map((paragraph, i) => (
              <p key={i} className="detail__p" style={{ maxWidth: '68ch', marginTop: '18px' }}>
                {paragraph}
              </p>
            ))}
          </div>

          <div className="tax-pair reveal" style={{ marginTop: '52px' }}>
            {tax.taxes.map((item) => (
              <div key={item.name} className="tax-cell">
                <p className="tax-cell__figure">{item.figure}</p>
                <h2 className="tax-cell__name">{item.name}</h2>
                <p className="micro tax-cell__authority">{item.authority}</p>
                <p className="tax-cell__p">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec--paper">
        <div className="inner">
          <div className="reveal" style={{ maxWidth: '52ch' }}>
            <p className="eyebrow eyebrow--paper intro__eyebrow">{t.comparisonEyebrow}</p>
            <h2 className="h2">{t.comparisonH2}</h2>
          </div>

          <div className="compare reveal">
            <div className="compare__head" aria-hidden="true">
              <span />
              <span className="compare__label">{t.gstLabel}</span>
              <span className="compare__label">{t.pstLabel}</span>
            </div>
            {copy.pages.GST_PST_COMPARISON.map((row) => (
              <div key={row.label} className="compare__row">
                <p className="compare__key">{row.label}</p>
                <p className="compare__cell">
                  <span className="compare__inline" aria-hidden="true">
                    {t.gstLabel}
                  </span>
                  {row.gst}
                </p>
                <p className="compare__cell">
                  <span className="compare__inline" aria-hidden="true">
                    {t.pstLabel}
                  </span>
                  {row.pst}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="inner">
          <div className="reveal" style={{ maxWidth: '52ch' }}>
            <p className="eyebrow intro__eyebrow">{t.mistakesEyebrow}</p>
            <h2 className="h2">{t.mistakesH2}</h2>
          </div>

          <div className="grid pains">
            {copy.pages.GST_PST_MISTAKES.map((item, i) => (
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
        <div className="inner split">
          <div className="reveal">
            <p className="eyebrow eyebrow--paper intro__eyebrow">{t.whatWeDoEyebrow}</p>
            <h2 className="h2">{copy.pages.GST_PST_WHAT_WE_DO.h}</h2>
          </div>

          <div className="reveal">
            {copy.pages.GST_PST_WHAT_WE_DO.body.map((paragraph, i) => (
              <p key={i} className="detail__p">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec--rule">
        <div className="inner reveal remote-cta">
          <h2 className="h2" style={{ maxWidth: '22ch' }}>
            {t.ctaH2}
          </h2>
          <p className="detail__p">{t.ctaP}</p>
          <div className="hero__cta">
            <Link to={path('/contact')} className="btn btn--primary">
              {copy.ui.hero.cta}
            </Link>
          </div>
          {/* One date stamp for the rates, shared with the home-page explainer. */}
          <p className="tax-note remote-cta__links">
            {tax.noteBefore}
            {copy.site.RATES_AS_OF}
            {tax.noteAfter}
          </p>
        </div>
      </section>
    </>
  );
};

export default GstPstPage;
