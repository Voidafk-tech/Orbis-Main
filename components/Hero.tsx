import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-40 pb-28 overflow-hidden bg-background-dark text-center">

      {/* Subtle green glow behind headline */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[420px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(195,254,132,0.055) 0%, transparent 65%)' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6">

        <span className="inline-block text-[11px] font-semibold tracking-[0.14em] uppercase text-primary
          bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full mb-9">
          Remote Bookkeeping · British Columbia
        </span>

        <h1 className="font-display font-extrabold uppercase leading-[0.93]
          text-[clamp(58px,10.5vw,106px)] tracking-tight text-white mb-7">
          Books handled.<br />
          <span className="text-primary">Focus on growth.</span>
        </h1>

        <p className="text-lg text-gray-400 leading-relaxed max-w-md mx-auto mb-10">
          Professional remote accounting and bookkeeping for BC businesses — so you can stop worrying about the numbers.
        </p>

        <div className="mb-10">
          <p className="text-sm text-gray-400 tracking-wide mb-1">Pricing starts at</p>
          <p className="font-display font-extrabold uppercase text-primary
            text-[clamp(28px,4.5vw,44px)] tracking-tight">
            $299/month
          </p>
        </div>

        <Link
          to="/contact"
          className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full font-semibold text-[15px]
            text-white transition-all hover:opacity-85 hover:-translate-y-0.5"
          style={{ background: '#076CFC' }}
        >
          Contact Us
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>

      </div>
    </section>
  );
};

export default Hero;
