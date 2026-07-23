import React from 'react';
import { Link } from 'react-router-dom';

const CTA: React.FC = () => {
  return (
    <section className="py-20 bg-background-dark">
      <div className="max-w-6xl mx-auto px-6">

        <div className="relative bg-gray-800 border border-white/5 rounded-[32px]
          px-10 py-20 text-center overflow-hidden">

          {/* Green radial glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[360px]
            pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(195,254,132,0.07) 0%, transparent 70%)' }} />

          <div className="relative z-10">
            <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-gray-400 block mb-6">
              Remote-first · BC businesses
            </span>

            <h2 className="font-display font-extrabold uppercase leading-none
              text-[clamp(42px,6.5vw,76px)] text-white mb-5">
              Ready to hand off<br />your books?
            </h2>

            <p className="text-base text-gray-400 mb-10 tracking-wide">
              Pricing starts at{' '}
              <strong className="text-primary font-semibold">$299/month</strong>
            </p>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2.5 px-10 py-4 rounded-full
                font-semibold text-[15px] text-white transition-all
                hover:opacity-85 hover:-translate-y-0.5"
              style={{ background: '#076CFC' }}
            >
              Contact Us
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CTA;
