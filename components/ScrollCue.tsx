import React, { useEffect, useRef } from 'react';
import { useCopy } from './LocaleContext';

/**
 * A chevron at the foot of the first screen, pointing into the scroll sequence.
 *
 * It answers the one question a pinned section cannot answer for itself: that
 * there is more below. It retires the moment it has been understood — the first
 * scroll of any size hides it — so it never sits over the page as decoration.
 *
 * A real link rather than an ornament, so it is reachable by keyboard and does
 * what it appears to do.
 */
const ScrollCue: React.FC = () => {
  const copy = useCopy();
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    el.classList.add('is-live');

    // Any deliberate scroll means the point is made.
    const onScroll = () => {
      el.classList.toggle('is-gone', window.scrollY > 80);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      el.classList.remove('is-live', 'is-gone');
    };
  }, []);

  return (
    <a className="scroll-cue" href="#story" ref={ref}>
      <span className="visually-hidden">{copy.ui.heroSequence.cue}</span>
      <svg viewBox="0 0 24 14" aria-hidden="true" focusable="false">
        <path d="M2 2 L12 12 L22 2" />
      </svg>
    </a>
  );
};

export default ScrollCue;
