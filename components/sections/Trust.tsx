import React, { useEffect, useRef, useState } from 'react';
import { useCopy } from '../LocaleContext';
import { revealDelay } from '../useScrollReveal';

/**
 * One issued certification mark. Renders nothing at all if the file is missing:
 * a broken image is worse than none, and so is an empty slot holding space for
 * artwork that has not been supplied. The row is sized by what exists.
 *
 * The placeholder text is kept for the single-badge case — if the one mark the
 * row has fails to load, the section would otherwise be an eyebrow over
 * nothing, which reads as a rendering fault rather than as a short row.
 */
const CertificationBadge: React.FC<{ src: string; alt: string; only: boolean }> = ({
  src,
  alt,
  only,
}) => {
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
    return only ? <p className="badge-box__placeholder">{copy.ui.trust.badgePlaceholder}</p> : null;
  }

  return <img ref={imgRef} src={src} alt={alt} onError={() => setMissing(true)} />;
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
            {copy.site.CERTIFICATION_BADGES.map((badge) => (
              <CertificationBadge
                key={badge.src}
                src={badge.src}
                alt={badge.alt}
                only={copy.site.CERTIFICATION_BADGES.length === 1}
              />
            ))}
          </div>
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
