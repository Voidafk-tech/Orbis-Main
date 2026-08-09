import React from 'react';
import { ScrollCue } from 'orbis-accounting-landing-page';
import './shell.css';

/**
 * The cue is `position: fixed` at the foot of the first screen and only
 * displays once its own effect adds `.is-live`, so it needs a screen-height box
 * to sit in rather than a content-sized one. Nothing is composed around it on
 * purpose: anything tall enough to be realistic scrolls the fixed cue out of the
 * captured frame, and anything short enough to keep it crops the neighbour.
 *
 * Its retirement — the first 80px of scroll hides it — is scroll-driven and
 * cannot render statically.
 */
export const AtRest = () => (
  <div style={{ minHeight: '100vh', position: 'relative' }}>
    <ScrollCue />
  </div>
);
