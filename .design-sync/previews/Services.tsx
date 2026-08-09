import React from 'react';
import { Services } from 'orbis-accounting-landing-page';
import './shell.css';

/**
 * The six service cards plus the platform marquee. The marquee logos are
 * served by the host app from /logos/*, so they are absent outside the site —
 * the cards and the band itself are unaffected.
 */
export const Default = () => (
  <main>
    <Services />
  </main>
);
