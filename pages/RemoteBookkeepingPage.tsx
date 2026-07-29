import React from 'react';
import { Link } from 'react-router';
import { REMOTE_FAQS, REMOTE_MECHANICS, REMOTE_MONTH, REMOTE_TRADEOFF } from '../content/pages';
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
const RemoteBookkeepingPage: React.FC = () => (
  <>
    <div className="hero reveal">
      <h1 className="h1">
        <span className="eyebrow h1__eyebrow">Remote and virtual bookkeeping</span>
        Remote bookkeeping,
        <br />
        <em>anywhere in BC.</em>
      </h1>

      <p className="hero__sub">
        Nothing to drop off, no office visit, no envelope of receipts sitting in the truck. Your
        books are done online by the same person every month — whether you are two blocks away in
        West Vancouver or six hours up the highway.
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
        <div className="reveal" style={{ maxWidth: '56ch' }}>
          <p className="eyebrow intro__eyebrow">How it actually works</p>
          <h2 className="h2">Four things that make the drop-off unnecessary.</h2>
          <p className="lede intro__p">
            &ldquo;Remote&rdquo; is not a compromise arrangement bolted onto an in-person process.
            Almost every part of modern bookkeeping already happens online.
          </p>
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
          <p className="eyebrow eyebrow--paper intro__eyebrow">What a month looks like</p>
          <h2 className="h2">Nothing piles up.</h2>
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
          <p className="eyebrow intro__eyebrow">Remote or local</p>
          <h2 className="h2">What you gain, and what you give up.</h2>
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
          <p className="eyebrow intro__eyebrow">Where this works</p>
          <h2 className="h2">All of British Columbia, at the same price.</h2>
          <p className="lede intro__p">
            Because nothing depends on being nearby, where your business sits does not change the
            scope or the number. We are based in West Vancouver and work across the province.
          </p>
        </div>

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
          <p className="eyebrow eyebrow--paper intro__eyebrow">Questions</p>
          <h2 className="h2 h2--faq">The ones remote raises.</h2>
          <p className="faq__intro-p">
            The rest are on the <Link to="/">main page</Link>, or put yours in the form and we will
            answer it in the reply.
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
          Tell us where things stand.
        </h2>
        <p className="detail__p">
          Ten short questions, about three minutes. You get a written scope and a fixed monthly
          price within one business day — no sales call, and nothing gets set up until you say yes.
        </p>
        <div className="hero__cta">
          <Link to="/contact" className="btn btn--primary">
            Get a plan and a quote
          </Link>
        </div>
        <p className="detail__p remote-cta__links">
          <Link to="/services">What we handle</Link> ·{' '}
          <Link to="/pricing">How the plans are scoped</Link>
        </p>
      </div>
    </section>
  </>
);

export default RemoteBookkeepingPage;
