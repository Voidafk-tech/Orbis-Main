import React from 'react';
import { Link } from 'react-router';
import { PLATFORMS, SERVICES } from '../../content/site';
import { revealDelay } from '../useScrollReveal';

/**
 * One half of the marquee: the five logos twice over, so a half is always
 * wider than the viewport and the -50% loop never shows a gap.
 */
const MarqueeHalf: React.FC<{ hidden?: boolean }> = ({ hidden }) => (
  <div className="marquee__half" aria-hidden={hidden || undefined}>
    {[0, 1].map((pass) =>
      PLATFORMS.map((logo) => (
        <img
          key={`${pass}-${logo.alt}`}
          src={logo.src}
          width={logo.width}
          height={logo.height}
          style={{ height: `${logo.height}px` }}
          alt={hidden || pass === 1 ? '' : logo.alt}
          loading="lazy"
          decoding="async"
        />
      )),
    )}
  </div>
);

const Services: React.FC = () => (
  <section className="sec" id="services">
    <div className="inner">
      <div className="reveal" style={{ maxWidth: '56ch' }}>
        <p className="eyebrow intro__eyebrow">What we handle</p>
        <h2 className="h2">Six things, off your desk.</h2>
        <p className="lede intro__p">
          <Link to="/services">What each of these actually involves →</Link>
        </p>
      </div>

      <div className="grid services">
        {SERVICES.map((service, i) => (
          <article
            key={service.n}
            className="service reveal"
            style={revealDelay((i % 3) * 70)}
          >
            <div className="service__top">
              <span className="service__n">{service.n}</span>
              {'tag' in service && service.tag ? (
                <span className="tag">{service.tag}</span>
              ) : null}
            </div>
            <h3 className="service__h">{service.h}</h3>
            <p className="card__p">{service.p}</p>
          </article>
        ))}
      </div>

      <div className="marquee-block reveal">
        <p className="micro">Works with</p>
        <div className="marquee">
          <div className="marquee__track">
            <MarqueeHalf />
            <MarqueeHalf hidden />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Services;
