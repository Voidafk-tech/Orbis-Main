import React from 'react';
import { useCopy } from '../LocaleContext';
import { revealDelay } from '../useScrollReveal';

const Steps: React.FC = () => {
  const copy = useCopy();

  return (
    <section className="sec sec--rule" id="process">
      <div className="inner">
        <div className="reveal" style={{ maxWidth: '52ch' }}>
          <h2 className="h2">{copy.ui.steps.h2}</h2>
        </div>

        <div className="grid steps">
          {copy.site.STEPS.map((step, i) => (
            <article key={step.n} className="reveal" style={revealDelay(i * 120)}>
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
  );
};

export default Steps;
