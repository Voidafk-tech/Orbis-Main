import React from 'react';
import { SatelliteBullet } from '../Logo';
import { DIFFERENTIATORS } from '../../content/site';
import { revealDelay } from '../useScrollReveal';

const WhyOrbis: React.FC = () => (
  <section className="sec sec--paper" id="why">
    <div className="inner split">
      <div className="reveal">
        <p className="eyebrow eyebrow--paper intro__eyebrow">Why Orbis</p>
        <h2 className="h2">Narrow on purpose.</h2>
        {/* If the platform or industry counts change anywhere, re-check this line. */}
        <p className="why__p">
          Bookkeeping for BC businesses is the only thing we do. No tax planning sideline, no
          other provinces, no work we are learning on your file.
        </p>
      </div>

      <div>
        {DIFFERENTIATORS.map((row, i) => (
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

export default WhyOrbis;
