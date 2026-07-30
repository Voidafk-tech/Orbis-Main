import React from 'react';
import { useCopy } from '../LocaleContext';

/**
 * The four-cell band under the hero.
 *
 * Split out of Hero so it can follow the scroll sequence: the sequence pins for
 * several screens, and the strip has to sit after it in the flow rather than
 * inside it.
 */
const TrustStrip: React.FC = () => {
  const copy = useCopy();

  return (
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
  );
};

export default TrustStrip;
