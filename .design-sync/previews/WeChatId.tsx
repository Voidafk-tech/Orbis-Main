import React from 'react';
import { WeChatId } from 'orbis-accounting-landing-page';
import './shell.css';

/**
 * The ID on its own, as the contact page's "reach us directly" list uses it.
 * The copy button appears only once an effect confirms clipboard access, so
 * it is present here but its copied-confirmation state is interaction-only.
 */
export const Default = () => (
  <main>
    <section className="sec">
      <div className="inner" style={{ maxWidth: 460 }}>
        <p className="micro wechat__id-label">Weixin ID</p>
        <WeChatId />
      </div>
    </section>
  </main>
);
