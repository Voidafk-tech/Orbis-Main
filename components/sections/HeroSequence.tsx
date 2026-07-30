import React, { useEffect, useRef } from 'react';
import Anchor from '../Anchor';
import { useCopy } from '../LocaleContext';
import { ACT, createScene } from '../heroSequenceScene';

/**
 * The homepage opening: a pinned scene that plays as you scroll, ending on the
 * hero headline, after which the page carries on into the trust strip and the
 * rest of the site.
 *
 * Progressive enhancement is the whole architecture here. Without `is-live` the
 * whole block collapses to nothing but its closing line — the acts, the canvas
 * and the rail are display:none, and the effect below only adds the class given
 * a working 2D context and no reduced-motion preference. So the sequence is
 * strictly additive: if the script fails, if the browser has no canvas, or if
 * the visitor has asked for less motion, the homepage is the hero, the trust
 * strip and the sections, exactly as it was.
 *
 * The closing line repeats the hero's headline and is deliberately *not* a
 * heading. Hero owns the page's only h1; a second copy of the same words as an
 * h1 would be two h1s, and as an h2 it would put a duplicate in the outline.
 * The acts are the h2s here.
 */
const HeroSequence: React.FC = () => {
  const copy = useCopy();
  const { hero, heroSequence } = copy.ui;

  const rootRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const pin = pinRef.current;
    const canvas = canvasRef.current;
    if (!root || !pin || !canvas) return;

    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const scene = createScene(canvas);
    if (!scene) return;

    // The canvas has no box until the sequence is displayed, so the class has
    // to land before the first measurement.
    root.classList.add('is-live');
    scene.resize();

    let target = 0;
    let current = 0;
    let running = false;
    let frameId = 0;

    /*
     * Progress runs over the pin's actual travel rather than the block's whole
     * height. The pin sticks the moment its top meets the header and releases
     * when its foot meets the bottom of the viewport, so those two moments are
     * 0 and 1 — measuring from the block's top instead would begin the story a
     * header's height early and leave it unfinished at the end.
     *
     * The pin is sized `100vh - header`, so the header's height is whatever the
     * viewport has left over. Deriving it beats re-reading the custom property.
     */
    const measure = () => {
      const pinH = pin.offsetHeight;
      const headerH = window.innerHeight - pinH;
      const travel = root.offsetHeight - pinH;
      const passed = headerH - root.getBoundingClientRect().top;
      target = travel <= 0 ? 0 : Math.min(Math.max(passed / travel, 0), 1);
    };

    const actFor = (t: number) =>
      t >= ACT.reveal ? 3 : t >= ACT.pass ? 2 : t >= ACT.arrive ? 1 : 0;

    const frame = () => {
      // Easing toward the scroll target is what the smooth-scroll libraries do
      // internally; one line here spares us the dependency and keeps a trackpad
      // from stepping the scene.
      current += (target - current) * 0.12;
      if (Math.abs(target - current) < 0.0004) current = target;

      scene.draw(current);
      // Written straight to the DOM rather than through state: this runs every
      // frame, and a re-render per frame would cost far more than it buys.
      pin.dataset.act = String(actFor(current));

      // The rail answers "am I stuck, and how much further" — the question that
      // makes people abandon a pinned section.
      const pct = Math.round(current * 100);
      if (railRef.current) railRef.current.style.height = `${pct}%`;
      if (pctRef.current) {
        pctRef.current.style.top = `${pct}%`;
        pctRef.current.textContent = pct < 10 ? `0${pct}` : String(pct);
      }

      if (Math.abs(target - current) > 0.0004) {
        frameId = requestAnimationFrame(frame);
      } else {
        running = false;
      }
    };

    const onScroll = () => {
      measure();
      if (!running) {
        running = true;
        frameId = requestAnimationFrame(frame);
      }
    };

    const onResize = () => {
      scene.resize();
      onScroll();
    };

    measure();
    current = target;
    scene.draw(current);
    pin.dataset.act = String(actFor(current));

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      root.classList.remove('is-live');
    };
  }, []);

  return (
    <div className="hero-seq" ref={rootRef} id="story">
      <div className="hero-seq__pin" ref={pinRef}>
        {/* The payoff. A paragraph, not a heading — Hero owns the only h1 and
            these are the same words. */}
        <div className="hero-seq__reveal">
          <p className="h1 h1--wide hero-seq__line">
            {hero.headline} <em>{hero.headlineEm}</em>
          </p>
          <div className="hero__cta">
            <Anchor to="start" className="btn btn--primary">
              {hero.cta}
            </Anchor>
          </div>
        </div>

        <div className="hero-seq__acts" aria-hidden="true">
          {heroSequence.acts.map((act, i) => (
            <article className="hero-seq__act" key={act.eyebrow} data-act={i}>
              <p className="eyebrow">{act.eyebrow}</p>
              <h2 className="h2 hero-seq__act-h">
                {act.headline} <em>{act.headlineEm}</em>
              </h2>
              <p className="hero-seq__act-p">{act.p}</p>
            </article>
          ))}
        </div>

        <div className="hero-seq__scene">
          <canvas ref={canvasRef} aria-hidden="true" />
        </div>

        <div className="hero-seq__rail" aria-hidden="true">
          <div className="hero-seq__rail-fill" ref={railRef} />
          <span className="hero-seq__rail-pct" ref={pctRef}>
            00
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeroSequence;
