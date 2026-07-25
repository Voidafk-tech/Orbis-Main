import React from 'react';
import { INDUSTRIES_SERVED } from '../../content/site';
import { revealDelay } from '../useScrollReveal';

/**
 * No testimonials, no client logos, no counts. The practice is new and
 * fabricated social proof would be worse than none.
 */
const Trust: React.FC = () => (
  <section className="sec sec--rule">
    <div className="inner trust">
      <div className="reveal">
        <p className="eyebrow trust__eyebrow">Certification</p>
        {/* Placeholder until the client supplies the Intuit-issued badge file. */}
        <div className="badge-box">
          <p className="badge-box__placeholder">
            QuickBooks Advanced ProAdvisor badge to be supplied
          </p>
        </div>
        <p className="trust__p">
          QuickBooks Online Advanced ProAdvisor, the certification level above the standard one. We
          work in Xero and Sage 50 as well.
        </p>
      </div>

      <div className="reveal" style={revealDelay(90)}>
        <p className="eyebrow trust__eyebrow">Who we work with</p>
        <ul className="industry-list">
          {INDUSTRIES_SERVED.map((industry) => (
            <li key={industry}>{industry}</li>
          ))}
        </ul>
      </div>

      <div className="reveal" style={revealDelay(180)}>
        <p className="eyebrow trust__eyebrow">What we commit to</p>
        <p className="commitment">
          Every enquiry gets a written plan and a price within one business day.
        </p>
        <p className="trust__p">
          If we cannot help, we will say so in that reply rather than book a call to tell you.
        </p>
      </div>
    </div>
  </section>
);

export default Trust;
