import React from 'react';

/**
 * The brand mark: a green disc, an ink disc offset right to cut a crescent,
 * and a pure white satellite dot sitting in that crescent. The dot is the
 * core motif and reappears as list bullets and step markers.
 */
export const LogoMark: React.FC<{ size?: number; className?: string }> = ({
  size = 25,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    className={className}
    aria-hidden="true"
    focusable="false"
  >
    <circle cx="20" cy="20" r="18" fill="#6DC64F" />
    <circle cx="22.5" cy="20" r="13.4" fill="#0A0C0A" />
    <circle cx="7.6" cy="20" r="4.1" fill="#FFFFFF" />
  </svg>
);

/** The same motif as a list bullet, for use on the light sections. */
export const SatelliteBullet: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className="why-row__bullet"
    aria-hidden="true"
    focusable="false"
  >
    <circle cx="12" cy="12" r="11" fill="none" stroke="#3F7A2C" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="3.5" fill="#3F7A2C" />
  </svg>
);
