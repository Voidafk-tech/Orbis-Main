import React from 'react';
import { Link } from 'react-router';
import { useLocale } from '../components/LocaleContext';
import { revealDelay } from '../components/useScrollReveal';
import TaxCalculator from '../components/TaxCalculator';

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

      {/* Above the explainer, and deliberately not carrying `reveal`: this is
          the first thing below the fold on a phone and it should be on screen
          when the page arrives, not fading in on scroll. */}
      <section className="sec sec--calc">
        <div className="inner">
          <TaxCalculator />
        </div>
      </section>

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

      {/* The anchor the calculator's note links to. */}
      <section className="sec" id="exemptions">
        <div className="inner">
          <div className="reveal" style={{ maxWidth: '52ch' }}>
            <p className="eyebrow intro__eyebrow">{t.exemptEyebrow}</p>
            <h2 className="h2">{t.exemptH2}</h2>
            {copy.pages.GST_PST_EXEMPT.intro.map((paragraph, i) => (
              <p key={i} className="detail__p" style={{ maxWidth: '68ch', marginTop: '18px' }}>
                {paragraph}
              </p>
            ))}
          </div>

          <div className="tax-pair reveal" style={{ marginTop: '52px' }}>
            {copy.pages.GST_PST_EXEMPT.columns.map((column) => (
              <div key={column.h} className="tax-cell">
                <h3 className="tax-cell__name">{column.h}</h3>
                <ul className="tax-cell__list">
                  {column.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="tax-note">{copy.pages.GST_PST_EXEMPT.caveat}</p>
          <p className="tax-note" style={{ marginTop: '18px', borderTop: 0, paddingTop: 0 }}>
            {copy.pages.GST_PST_EXEMPT.close}
          </p>
        </div>
      </section>

      <section className="sec sec--paper">
        <div className="inner split">
          <div className="reveal">
            <p className="eyebrow eyebrow--paper intro__eyebrow">{t.registrationEyebrow}</p>
            <h2 className="h2">{copy.pages.GST_PST_REGISTRATION.h}</h2>
          </div>

          <div className="reveal">
            {copy.pages.GST_PST_REGISTRATION.body.map((paragraph, i) => (
              <p key={i} className="detail__p">
                {paragraph}
              </p>
            ))}
            <p className="detail__p">
              <Link to={path('/bc-pst-registration')}>
                {copy.pages.GST_PST_REGISTRATION.linkText}
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="inner split">
          <div className="reveal">
            <p className="eyebrow intro__eyebrow">{t.fin400Eyebrow}</p>
            <h2 className="h2">{copy.pages.GST_PST_FIN400.h}</h2>
          </div>

          <div className="reveal">
            {copy.pages.GST_PST_FIN400.body.map((paragraph, i) => (
              <p key={i} className="detail__p">
                {paragraph}
              </p>
            ))}
            <p className="detail__p">
              <Link to={path('/services')}>
                {t.servicesLink}
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="sec sec--paper">
        <div className="inner">
          <div className="reveal" style={{ maxWidth: '52ch' }}>
            <p className="eyebrow eyebrow--paper intro__eyebrow">{t.deadlinesEyebrow}</p>
            <h2 className="h2">{t.deadlinesH2}</h2>
            {copy.pages.GST_PST_DEADLINES.intro.map((paragraph, i) => (
              <p key={i} className="detail__p" style={{ maxWidth: '68ch', marginTop: '18px' }}>
                {paragraph}
              </p>
            ))}
          </div>

          {/* Same markup as the comparison table above — a label and two
              columns — so the two read as one pattern and share their styles. */}
          <div className="compare reveal" style={{ marginTop: '52px' }}>
            <div className="compare__head" aria-hidden="true">
              <span />
              <span className="compare__label">{t.whoLabel}</span>
              <span className="compare__label">{t.dueLabel}</span>
            </div>
            {copy.pages.GST_PST_DEADLINES.rows.map((row) => (
              <div key={row.label} className="compare__row">
                <p className="compare__key">{row.label}</p>
                <p className="compare__cell">
                  <span className="compare__inline" aria-hidden="true">
                    {t.whoLabel}
                  </span>
                  {row.who}
                </p>
                <p className="compare__cell">
                  <span className="compare__inline" aria-hidden="true">
                    {t.dueLabel}
                  </span>
                  {row.due}
                </p>
              </div>
            ))}
          </div>

          <p className="tax-note">{copy.pages.GST_PST_DEADLINES.close}</p>
        </div>
      </section>

      <section className="sec">
        <div className="inner split">
          <div className="reveal">
            <p className="eyebrow intro__eyebrow">{t.selfAssessEyebrow}</p>
            <h2 className="h2">{copy.pages.GST_PST_SELF_ASSESSMENT.h}</h2>
          </div>

          <div className="reveal">
            {copy.pages.GST_PST_SELF_ASSESSMENT.body.map((paragraph, i) => (
              <p key={i} className="detail__p">
                {paragraph}
              </p>
            ))}
            <p className="detail__p">
              <Link to={path('/catch-up-bookkeeping')}>
                {t.catchUpLink}
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Sections some languages have and others do not — empty in English, so
          this renders nothing there. Chinese search demand is not a translation
          of English search demand; see GST_PST_LOCAL_SECTIONS in
          content/pages.ts for what these are and why they exist. */}
      {copy.pages.GST_PST_LOCAL_SECTIONS.length > 0 && (
        <section className="sec">
          <div className="inner">
            <div className="reveal" style={{ maxWidth: '52ch' }}>
              <p className="eyebrow intro__eyebrow">{t.localEyebrow}</p>
              <h2 className="h2">{t.localH2}</h2>
            </div>

            {copy.pages.GST_PST_LOCAL_SECTIONS.map((section, i) => (
              <div
                key={section.h}
                className="reveal"
                style={{ ...revealDelay(i * 60), marginTop: '44px', maxWidth: '68ch' }}
              >
                <h3 className="detail__h">{section.h}</h3>
                {section.body.map((paragraph, j) => (
                  <p key={j} className="detail__p">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Visible questions, no FAQPage markup. FAQ rich results were withdrawn
          on 7 May 2026 — see the note on the `faq` field in content/routes.ts.
          These are here because people ask them. */}
      <section className="sec sec--paper">
        <div className="inner split split--faq">
          <div className="reveal">
            <p className="eyebrow eyebrow--paper intro__eyebrow">{t.faqEyebrow}</p>
            <h2 className="h2 h2--faq">{t.faqH2}</h2>
          </div>

          <div className="reveal">
            {copy.pages.GST_PST_FAQS.map((item) => (
              <details key={item.q} className="faq-item">
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
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
