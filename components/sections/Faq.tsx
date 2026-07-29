import React from 'react';
import { useCopy } from '../LocaleContext';

const Faq: React.FC = () => {
  const copy = useCopy();

  return (
    <section className="sec sec--paper" id="questions">
      <div className="inner split split--faq">
        <div className="reveal">
          <p className="eyebrow eyebrow--paper intro__eyebrow">{copy.ui.faq.eyebrow}</p>
          <h2 className="h2 h2--faq">{copy.ui.faq.h2}</h2>
          <p className="faq__intro-p">{copy.ui.faq.intro}</p>
        </div>

        {/* Native details/summary — no JavaScript, and open by keyboard. */}
        <div className="reveal">
          {copy.site.FAQS.map((item) => (
            <details key={item.q} className="faq-item">
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
