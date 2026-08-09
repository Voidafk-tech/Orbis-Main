import React from 'react';
import { TaxExplainer } from 'orbis-accounting-landing-page';
import './shell.css';

/** GST and PST side by side, with the rate cards on the ink ground. */
export const Default = () => (
  <main>
    <TaxExplainer />
  </main>
);
