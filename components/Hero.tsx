import React from 'react';

const Hero: React.FC = () => {
  return (
    <header
      id="top"
      className="relative flex flex-col items-center justify-center text-center px-6 pt-5 pb-8
        min-h-[calc(100svh-80px)]"
    >
      {/* Ambient lime glow */}
      <div
        className="absolute top-[8%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] max-w-[92vw] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(163,236,109,.10), transparent 62%)' }}
      />

      <div className="relative orbit-float w-40 h-40">
        <svg width="160" height="160" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="86" fill="none" stroke="#1c1c20" strokeWidth="1.4" />
          <circle cx="100" cy="100" r="62" fill="none" stroke="#161618" strokeWidth="1.4" />
          <circle cx="100" cy="100" r="38" fill="none" stroke="#141416" strokeWidth="1.4" />
          <circle cx="100" cy="100" r="86" fill="none" stroke="#a3ec6d" strokeWidth="2.4"
            strokeLinecap="round" strokeDasharray="64 480" className="orbit-arc-outer" />
          <circle cx="100" cy="100" r="62" fill="none" stroke="#0a84ff" strokeWidth="2.4"
            strokeLinecap="round" strokeDasharray="44 350" className="orbit-arc-inner" />
          <circle cx="100" cy="14" r="4.6" fill="#a3ec6d" className="orbit-dot-outer" />
          <circle cx="162" cy="100" r="3.4" fill="#0a84ff" className="orbit-dot-inner" />
          <circle cx="100" cy="100" r="7.5" fill="#f5f5f7" />
        </svg>
      </div>

      <span className="inline-flex items-center mt-[22px] px-4 py-2 rounded-full font-semibold
        text-[11px] tracking-[0.14em] uppercase text-primary bg-primary/5 border border-primary/[0.32]">
        Remote Bookkeeping · British Columbia
      </span>

      <h1 className="mt-[18px] mx-auto max-w-[640px] font-semibold text-[clamp(38px,7vw,46px)]
        leading-[1.04] tracking-[-0.032em] text-gray-100">
        Your books,<br />handled in orbit.
      </h1>

      <p className="mt-[18px] mx-auto max-w-[420px] text-[16.5px] leading-[1.5] text-gray-400">
        Remote accounting and bookkeeping for BC businesses.
      </p>

      <div className="mt-[26px] flex flex-col items-center gap-3.5">
        <a
          href="#contact"
          className="inline-flex items-center gap-2 font-semibold text-[17px] text-white
            px-12 py-[19px] rounded-full transition-all hover:opacity-85 hover:-translate-y-0.5"
          style={{ background: '#0a84ff', boxShadow: '0 8px 28px rgba(10,132,255,.32)' }}
        >
          Get Started →
        </a>
        <span className="text-sm text-[#6e6e73]">
          from <span className="text-primary font-semibold">$299</span>/month
        </span>
      </div>
    </header>
  );
};

export default Hero;
