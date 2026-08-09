import React from 'react';
import { IntakeForm } from 'orbis-accounting-landing-page';
import './shell.css';

/**
 * The form as the Intake section mounts it — inside `.inner` on the dark
 * ground, which is the only place the site uses it. Field values, validation
 * and the sending/sent phases are internal state, so the resting state is what
 * renders statically; the submitted and error phases need a real POST and are
 * recorded as unpreviewable in .design-sync/NOTES.md.
 */
export const Default = () => (
  <main>
    <section className="sec">
      <div className="inner" style={{ maxWidth: 760 }}>
        <IntakeForm />
      </div>
    </section>
  </main>
);
