import React, { useEffect, useRef } from 'react';
import Anchor from '../Anchor';
import { useCopy } from '../LocaleContext';
import { ACT, createScene } from '../heroSequenceScene';

/**
 * The homepage opening: a pinned scene that plays as you scroll, ending on the
 * hero headline, after which the page carries on into the trust strip and the
 * rest of the site.
 *
 * Progressive enhancement is the whole architecture here. What renders — and
 * what the prerender bakes into dist/ — is the ordinary hero: h1, subhead, CTA.
 * The acts and the canvas are display:none until the effect below adds
 * `is-live`, which it only does with a working canvas and no reduced-motion
 * preference. So the sequence is strictly additive: if the script fails, if the
 * browser has no 2D context, or if the visitor has asked for less motion, the
 * homepage is exactly the page it was before this existed.
 *
 * DOM order puts the h1 first even though it is revealed last. Heading order
 * has to survive — the handoff requires exactly one h1 and the acts are h2s —
 * and the reveal is positioned rather than in flow, so its place in the markup
 * costs nothing visually.
 */
const HeroSequence: React.FC = () => {
  const copy = useCopy();
  const { hero, heroSequence } = copy.ui;

  const rootRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    const measure = () => {
      const total = root.offsetHeight - window.innerHeight;
      target =
        total <= 0 ? 0 : Math.min(Math.max(-root.getBoundingClientRect().top / total, 0), 1);
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
    <div className="hero-seq" ref={rootRef} id="top">
      <div className="hero-seq__pin" ref={pinRef}>
        {/* The payoff, and the page's only h1. */}
        <div className="hero-seq__reveal">
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
      </div>
    </div>
  );
};

export default HeroSequence;
