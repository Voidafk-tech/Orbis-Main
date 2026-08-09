import React from 'react';
import { Hero } from 'orbis-accounting-landing-page';
import './shell.css';

/**
 * Exactly how Home.tsx opens the page: Hero as the first child of <main>.
 * The section brings its own width, so nothing here constrains it.
 */
export const Default = () => (
  <main>
    <Hero />
  </main>
);
