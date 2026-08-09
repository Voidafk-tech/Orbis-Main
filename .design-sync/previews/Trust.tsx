import React from 'react';
import { Trust } from 'orbis-accounting-landing-page';
import './shell.css';

/**
 * The certification block. Its badge image is served by the host app, and the
 * component substitutes a neutral typographic placeholder when the file is not
 * there — which is what a card outside the site shows.
 */
export const Default = () => (
  <main>
    <Trust />
  </main>
);
