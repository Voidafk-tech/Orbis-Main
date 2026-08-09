import React from 'react';
import { SatelliteBullet } from 'orbis-accounting-landing-page';
import './shell.css';

/**
 * The bullet is drawn in --green-dark for the light sections, which is the
 * only place the site uses it: the WhyOrbis rows on `.sec--paper`.
 */
export const OnPaper = () => (
  <section className="sec sec--paper">
    <div className="inner">
      <div className="why-row" style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
        <SatelliteBullet />
        <div>
          <h3 className="why-row__h">QuickBooks Online, Xero or Sage 50</h3>
          <p className="why-row__p">
            We work in all three and connect Shopify and Stripe if you use them.
          </p>
        </div>
      </div>
    </div>
  </section>
);

/** The motif at the sizes it is drawn at. */
export const Sizes = () => (
  <section className="sec sec--paper">
    <div className="inner" style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
      {[14, 18, 24, 36].map((size) => (
        <SatelliteBullet key={size} size={size} />
      ))}
    </div>
  </section>
);
