import React from 'react';
import { Anchor } from 'orbis-accounting-landing-page';
import './shell.css';

/**
 * The hero and the sequence both use it as the page's primary call to action:
 * `className="btn btn--primary"` pointing at the intake section.
 */
export const PrimaryButton = () => (
  <div style={{ padding: '28px 24px' }}>
    <Anchor to="start" className="btn btn--primary">
      Get a plan and a quote
    </Anchor>
  </div>
);

/**
 * Unstyled, as the header and footer nav use it — it inherits the link colour
 * of whatever list it sits in.
 */
export const InlineLink = () => (
  <div style={{ padding: '28px 24px' }}>
    <p className="lede" style={{ margin: 0 }}>
      Still deciding? <Anchor to="questions">Read the questions</Anchor>.
    </p>
  </div>
);
