import React from 'react';
import Anchor from '../Anchor';
import { TRUST_STRIP } from '../../content/site';

const Hero: React.FC = () => (
  <>
    {/* No decorative graphic here on purpose — see the design handoff. */}
    <div className="hero reveal" id="top">
      {/* The display line carries no search terms, and the h1 is the strongest
          on-page signal there is. The eyebrow is inside it as a block span
          rather than a separate <p>, so what renders is unchanged. */}
      <h1 className="h1">
        <span className="eyebrow h1__eyebrow">
          Bookkeeping for BC small business · West Vancouver, BC
        </span>
        Clean books,
        <br />
        <em>filed on time.</em>
      </h1>

      <p className="hero__sub">
        GST to the CRA, PST to the province, and monthly reports you can actually read. The same
        person does your books every month, so you are never re-explaining your business.
      </p>

      <div className="hero__cta">
        <Anchor to="start" className="btn btn--primary">
          Get a plan and a quote
        </Anchor>
        <p className="hero__reassure">A written plan and a price within one business day</p>
      </div>
    </div>

    <div className="trust-strip reveal">
      {TRUST_STRIP.map((cell) => (
        <div key={cell.label}>
          <p className="micro trust-strip__label">{cell.label}</p>
          <p className="trust-strip__value">
            {cell.lines[0]}
            <br />
            {cell.lines[1]}
          </p>
        </div>
      ))}
    </div>
  </>
);

export default Hero;
