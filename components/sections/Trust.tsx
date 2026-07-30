import React, { useEffect, useRef, useState } from 'react';
import { useCopy } from '../LocaleContext';
import { revealDelay } from '../useScrollReveal';

/**
 * Shows the issued certification badge, and degrades to a neutral placeholder
 * if the file is not in place yet — a broken image would be worse than none.
 */
const CertificationBadge: React.FC = () => {
  const copy = useCopy();
  const [missing, setMissing] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // The prerendered markup can fail to load before React attaches onError,
  // so re-check the element once on mount.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setMissing(true);
  }, []);

  if (missing) {
    return <p className="badge-box__placeholder">{copy.ui.trust.badgePlaceholder}</p>;
  }

  return (
    <img
      ref={imgRef}
      src={copy.site.PROADVISOR_BADGE.src}
      alt={copy.site.PROADVISOR_BADGE.alt}
      onError={() => setMissing(true)}
    />
  );
};

/**
 * No testimonials, no client logos, no counts. The practice is new and
 * fabricated social proof would be worse than none.
 */
const Trust: React.FC = () => {
  const copy = useCopy();
  const { trust } = copy.ui;

  return (
    <section className="sec sec--rule">
      <div className="inner trust">
        <div className="reveal">
          <p className="eyebrow trust__eyebrow">{trust.certEyebrow}</p>
          <div className="badge-box">
            <CertificationBadge />
          </div>
          <p className="trust__p">{trust.certP}</p>
        </div>

        <div className="reveal" style={revealDelay(90)}>
          <p className="eyebrow trust__eyebrow">{trust.whoEyebrow}</p>
          <ul className="industry-list">
            {copy.site.INDUSTRIES_SERVED.map((industry) => (
              <li key={industry}>{industry}</li>
            ))}
          </ul>
        </div>

        <div className="reveal" style={revealDelay(180)}>
          <p className="eyebrow trust__eyebrow">{trust.commitEyebrow}</p>
          <p className="commitment">{trust.commitment}</p>
        </div>
      </div>
    </section>
  );
};

export default Trust;
