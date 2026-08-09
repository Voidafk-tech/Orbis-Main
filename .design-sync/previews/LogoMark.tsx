import React from 'react';
import { LogoMark } from 'orbis-accounting-landing-page';
import './shell.css';

/**
 * The sizes the site actually renders the mark at: 25px in the header lockup
 * (SiteHeader.tsx) and in the footer, larger only for brand surfaces.
 */
export const Sizes = () => (
  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 32, padding: '28px 24px' }}>
    {[18, 25, 40, 64].map((size) => (
      <div key={size} style={{ display: 'grid', justifyItems: 'center', gap: 12 }}>
        <LogoMark size={size} />
        <span className="micro">{size}px</span>
      </div>
    ))}
  </div>
);

/**
 * How the header composes it — the `.lockup` from SiteHeader.tsx: the mark at
 * 25px beside the letter-spaced wordmark.
 */
export const InLockup = () => (
  <div style={{ padding: '28px 24px' }}>
    <span className="lockup">
      <LogoMark size={25} />
      <span className="wordmark">ORBIS</span>
    </span>
  </div>
);
