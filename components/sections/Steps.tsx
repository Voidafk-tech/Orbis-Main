import React from 'react';
import { STEPS } from '../../content/site';
import { revealDelay } from '../useScrollReveal';

const Steps: React.FC = () => (
  <section className="sec sec--rule" id="process">
    <div className="inner">
      <div className="reveal" style={{ maxWidth: '52ch' }}>
        <p className="eyebrow intro__eyebrow">How it works</p>
        <h2 className="h2">Three steps, and no sales call.</h2>
      </div>

      <div className="grid steps">
        {STEPS.map((step, i) => (
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

export default Steps;
