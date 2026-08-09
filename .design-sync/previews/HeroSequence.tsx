import React from 'react';
import { HeroSequence } from 'orbis-accounting-landing-page';
import './shell.css';

/**
 * The scroll-driven sequence. It pins for several screens and animates a
 * canvas against scroll progress, so a static card can only show its opening
 * act — the scattered receipts before the pass. `.page` is required: its
 * `overflow-x: clip` is what lets the pin stick.
 */
export const OpeningAct = () => (
  <div className="page">
    <main>
      <HeroSequence />
    </main>
  </div>
);
