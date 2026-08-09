import React from 'react';
import { Faq } from 'orbis-accounting-landing-page';
import './shell.css';

/**
 * The questions block as Home.tsx places it — a `.sec--paper` section, so it
 * paints its own light ground over the site's ink.
 */
export const Default = () => (
  <main>
    <Faq />
  </main>
);
