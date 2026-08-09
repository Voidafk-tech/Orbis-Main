import React from 'react';
import { WeChatContact } from 'orbis-accounting-landing-page';
import './shell.css';

/**
 * How the intake section places it: the account name, the Weixin ID with its
 * copy control, and the QR column beside them. The QR column removes itself
 * when the image is not served, which is the state a card outside the site
 * renders — that is the component's own designed degradation, not a break.
 */
export const Default = () => (
  <main>
    <section className="sec">
      <div className="inner" style={{ maxWidth: 560 }}>
        <WeChatContact />
      </div>
    </section>
  </main>
);
