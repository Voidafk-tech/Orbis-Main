import React from 'react';
import { Intake } from 'orbis-accounting-landing-page';
import './shell.css';

/** As Home.tsx closes the page: the section heading is an h2. */
export const OnHomePage = () => (
  <main>
    <Intake />
  </main>
);

/**
 * As ContactPage.tsx opens its route: the heading becomes the page h1 and the
 * one-business-day reply promise runs under the form.
 */
export const OnContactRoute = () => (
  <main>
    <Intake headingLevel="h1" reassurance />
  </main>
);
