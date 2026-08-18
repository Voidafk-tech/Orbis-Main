import React from 'react';
import { useCopy } from '../LocaleContext';
import { revealDelay } from '../useScrollReveal';

const Pains: React.FC = () => {
  const copy = useCopy();
  const { pains } = copy.ui;

  return (
    <section className="sec">
      <div className="inner">
        <div className="reveal">
          <h2 className="h2" style={{ maxWidth: '22ch' }}>
            {pains.h2}
          </h2>
          <p className="lede intro__p" style={{ maxWidth: '60ch' }}>
            {pains.lede}
          </p>
        </div>

        <div className="grid pains">
          {copy.site.PAINS.map((pain, i) => (
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
};

export default Pains;
