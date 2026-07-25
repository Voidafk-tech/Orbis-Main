import { useEffect } from 'react';

/**
 * Reveals every `.reveal` element once, as it enters the viewport.
 *
 * Two rules keep this from feeling gratuitous:
 *  - anything already above the fold on load is shown immediately and never
 *    animates, so the hero cannot flash empty;
 *  - reduced-motion visitors get everything shown at once, with no observer.
 */
export function useScrollReveal(key?: string) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    if (els.length === 0) return;

    const show = (el: HTMLElement, instant: boolean) => {
      if (instant) el.classList.add('is-instant');
      el.classList.add('is-in');
    };

    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced || typeof IntersectionObserver === 'undefined') {
      els.forEach((el) => show(el, true));
      return;
    }

    const fold = window.innerHeight * 0.92;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          show(entry.target as HTMLElement, false);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' },
    );

    els.forEach((el) => {
      if (el.getBoundingClientRect().top < fold) {
        show(el, true);
        return;
      }
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [key]);
}

/** Stagger helper: sibling cards carry increasing delays. */
export function revealDelay(ms: number): React.CSSProperties {
  return { '--reveal-delay': `${ms}ms` } as React.CSSProperties;
}
