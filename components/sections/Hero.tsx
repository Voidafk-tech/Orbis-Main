import React from 'react';
import Anchor from '../Anchor';
import { useCopy } from '../LocaleContext';

const Hero: React.FC = () => {
  const copy = useCopy();
  const { hero } = copy.ui;

  return (
    <>
      {/* No decorative graphic here on purpose — see the design handoff. */}
      <div className="hero reveal" id="top">
        {/* The display line carries no search terms, and the h1 is the strongest
            on-page signal there is. The eyebrow is inside it as a block span
            rather than a separate <p>, so what renders is unchanged. */}
        <h1 className="h1 h1--wide">
          <span className="eyebrow h1__eyebrow">{hero.eyebrow}</span>
          {hero.headline}{' '}
          <em>{hero.headlineEm}</em>
        </h1>

        <p className="hero__sub">{hero.sub}</p>

        <div className="hero__cta">
          <Anchor to="start" className="btn btn--primary">
            {hero.cta}
          </Anchor>
        </div>
      </div>

      <div className="trust-strip reveal">
        {copy.site.TRUST_STRIP.map((cell) => (
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
};

export default Hero;
