import React from 'react';
import { PAINS } from '../../content/site';
import { revealDelay } from '../useScrollReveal';

const Pains: React.FC = () => (
  <section className="sec">
    <div className="inner">
      <div className="reveal">
        <p className="eyebrow intro__eyebrow">Where it usually stands</p>
        <h2 className="h2" style={{ maxWidth: '22ch' }}>
          Four things you are probably already living with.
        </h2>
        <p className="lede intro__p" style={{ maxWidth: '60ch' }}>
          The books are the one part of running a business that nobody set up for you.
        </p>
      </div>

      <div className="grid pains">
        {PAINS.map((pain, i) => (
          <article key={pain.n} className="pain reveal" style={revealDelay(i * 90)}>
            <p className="pain__n">{pain.n}</p>
            <h3 className="pain__h">{pain.h}</h3>
            <p className="pain__p">{pain.p}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Pains;
