import React from 'react';
import IntakeForm from '../IntakeForm';
import WeChatContact from '../WeChatContact';
import { useCopy } from '../LocaleContext';

interface IntakeProps {
  /** The standalone contact route needs this heading to be the page h1. */
  headingLevel?: 'h1' | 'h2';
  /**
   * The one-business-day promise. It ran under all six page heroes as faint
   * mono microcopy; it now appears in exactly one place, on /contact, where
   * someone is deciding whether to actually send the form.
   */
  reassurance?: boolean;
}

const Intake: React.FC<IntakeProps> = ({ headingLevel = 'h2', reassurance = false }) => {
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
          {reassurance && <p className="intake__reassure">{copy.ui.hero.reassure}</p>}

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

            {/* This section is rendered twice — at the foot of the home page and
                at the head of /contact — so putting WeChat here is what puts it
                on both, and is why the contact page's own list carries the ID
                without a second copy of the code. */}
            <WeChatContact />
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
