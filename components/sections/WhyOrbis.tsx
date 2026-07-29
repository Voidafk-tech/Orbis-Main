import React from 'react';
import { SatelliteBullet } from '../Logo';
import { useCopy } from '../LocaleContext';
import { revealDelay } from '../useScrollReveal';

const WhyOrbis: React.FC = () => {
  const copy = useCopy();
  const { why } = copy.ui;

  return (
    <section className="sec sec--paper" id="why">
      <div className="inner split">
        <div className="reveal">
          <p className="eyebrow eyebrow--paper intro__eyebrow">{why.eyebrow}</p>
          <h2 className="h2">{why.h2}</h2>
          {/* If the platform or industry counts change anywhere, re-check this line. */}
          <p className="why__p">{why.p}</p>
        </div>

        <div>
          {copy.site.DIFFERENTIATORS.map((row, i) => (
            <div key={row.h} className="why-row reveal" style={revealDelay(i * 90)}>
              <SatelliteBullet />
              <div>
                <h3 className="why-row__h">{row.h}</h3>
                <p className="why-row__p">{row.p}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyOrbis;
