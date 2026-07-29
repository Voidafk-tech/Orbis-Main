import React from 'react';
import IntakeForm from '../IntakeForm';
import { useCopy } from '../LocaleContext';

interface IntakeProps {
  /** The standalone contact route needs this heading to be the page h1. */
  headingLevel?: 'h1' | 'h2';
}

const Intake: React.FC<IntakeProps> = ({ headingLevel = 'h2' }) => {
  const copy = useCopy();
  const { intake } = copy.ui;
  const { CONTACT } = copy.site;
  const Heading = headingLevel;

  return (
    <section className="intake" id="start">
      <div className="inner split split--intake">
        <div className="reveal">
          <p className="eyebrow intro__eyebrow">{intake.eyebrow}</p>
          <Heading className="h2 h2--intake">
            {intake.headline}
            <br />
            {intake.headlineSecond}
          </Heading>
          <p className="intake__p">{intake.p}</p>

          <div className="intake__contact">
            <div>
              <p className="micro intake__contact-label">{intake.emailLabel}</p>
              <a className="intake__email" href={`mailto:${CONTACT.email}`}>
                {CONTACT.email}
              </a>
            </div>
            <div>
              <p className="micro intake__contact-label">{intake.phoneLabel}</p>
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
