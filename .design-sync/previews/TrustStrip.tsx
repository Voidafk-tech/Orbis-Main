import React from 'react';
import { TrustStrip } from 'orbis-accounting-landing-page';
import './shell.css';

/**
 * The four-cell band Home.tsx runs directly under the hero — certification,
 * location and filing facts in mono labels over Archivo values.
 */
export const Default = () => (
  <main>
    <TrustStrip />
  </main>
);
