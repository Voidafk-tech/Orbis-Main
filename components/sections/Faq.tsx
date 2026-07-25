import React from 'react';
import { FAQS } from '../../content/site';

const Faq: React.FC = () => (
  <section className="sec sec--paper" id="questions">
    <div className="inner split split--faq">
      <div className="reveal">
        <p className="eyebrow eyebrow--paper intro__eyebrow">Questions</p>
        <h2 className="h2 h2--faq">The ones people actually ask.</h2>
        <p className="faq__intro-p">
          If yours is not here, put it in the form and we will answer it in the reply.
        </p>
      </div>

      {/* Native details/summary — no JavaScript, and open by keyboard. */}
      <div className="reveal">
        {FAQS.map((item) => (
          <details key={item.q} className="faq-item">
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

export default Faq;
