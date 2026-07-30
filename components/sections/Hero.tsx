import React from 'react';
import Anchor from '../Anchor';
import { useCopy } from '../LocaleContext';

/**
 * The conventional hero, back at the top of the page ahead of the scroll
 * sequence.
 *
 * It is here for two reasons that are really one reason. A visitor who never
 * scrolls still gets the pitch rather than a pile of receipts, and a visitor
 * who does scroll learns that scrolling works — the page moves normally here,
 * before the sequence below pins and stops moving. A pinned first screen has to
 * teach both at once, and teaches neither well.
 *
 * The trust strip lives in TrustStrip, and the display line reappears at the
 * end of the sequence — stated here, earned there.
 */
const Hero: React.FC = () => {
  const copy = useCopy();
  const { hero } = copy.ui;

  return (
    <div className="hero reveal" id="top">
      {/* The display line carries no search terms, and the h1 is the strongest
          on-page signal there is. The eyebrow is inside it as a block span
          rather than a separate <p>, so what renders is unchanged. */}
      <h1 className="h1 h1--wide">
        <span className="eyebrow h1__eyebrow">{hero.eyebrow}</span>
        {hero.headline} <em>{hero.headlineEm}</em>
      </h1>

      <p className="hero__sub">{hero.sub}</p>

      <div className="hero__cta">
        <Anchor to="start" className="btn btn--primary">
          {hero.cta}
        </Anchor>
      </div>
    </div>
  );
};

export default Hero;
