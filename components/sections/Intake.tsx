import React from 'react';
import IntakeForm from '../IntakeForm';
import { CONTACT } from '../../content/site';

interface IntakeProps {
  /** The standalone contact route needs this heading to be the page h1. */
  headingLevel?: 'h1' | 'h2';
}

const Intake: React.FC<IntakeProps> = ({ headingLevel = 'h2' }) => {
  const Heading = headingLevel;

  return (
    <section className="intake" id="start">
      <div className="inner split split--intake">
        <div className="reveal">
          <p className="eyebrow intro__eyebrow">Get a plan and a quote</p>
          <Heading className="h2 h2--intake">
            Tell us where things
            <br />
            actually stand.
          </Heading>
          <p className="intake__p">
            About three minutes. No sales call, and nothing gets set up until you say yes.
          </p>

          <div className="intake__contact">
            <div>
              <p className="micro intake__contact-label">Or email us directly</p>
              <a className="intake__email" href={`mailto:${CONTACT.email}`}>
                {CONTACT.email}
              </a>
            </div>
            <div>
              <p className="micro intake__contact-label">Phone</p>
              <a className="intake__phone" href={CONTACT.phoneHref}>
                {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>

        <div className="reveal">
          <IntakeForm />
        </div>
      </div>
    </section>
  );
};

export default Intake;
