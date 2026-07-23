import React from 'react';

const services = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"
        strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
      </svg>
    ),
    name: 'Full-Cycle Bookkeeping',
    desc: 'Bank reconciliations, journal entries, and financial statements handled monthly using Sage50 and QuickBooks Online.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"
        strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
    name: 'AR/AP Management',
    desc: 'Invoicing, collections, and vendor payments managed to maximize your cash flow and supplier relationships.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"
        strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/>
      </svg>
    ),
    name: 'Payroll & T4 Filings',
    desc: 'Bi-weekly payroll processing, ROEs, and year-end T4 preparation with secure CRA submissions.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"
        strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"/>
      </svg>
    ),
    name: 'GST / HST / PST Filing',
    desc: 'Accurate, on-time tax filings and CRA correspondence to keep your business compliant and penalty-free.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"
        strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
      </svg>
    ),
    name: 'WCB & Compliance',
    desc: "Workers' Compensation Board quarterly reporting and audit preparation to keep your business risk-free.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"
        strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
      </svg>
    ),
    name: 'Catch-up & Cleanup',
    desc: 'Behind on your books? We restore order from historic backlogs and get your ledgers audit-ready.',
  },
];

const Services: React.FC = () => {
  return (
    <section className="py-24 bg-background-dark" id="services">
      <div className="max-w-6xl mx-auto px-6">

        <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-gray-400 mb-3">
          What we handle
        </p>
        <h2 className="font-display font-extrabold uppercase leading-none
          text-[clamp(38px,6vw,66px)] text-white mb-14">
          Our <span className="text-primary">Services</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {services.map((s) => (
            <div
              key={s.name}
              className="bg-gray-800 border border-white/5 rounded-[28px] p-8
                flex flex-col gap-3 transition-all duration-300
                hover:border-primary/25 hover:-translate-y-1"
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center
                text-primary bg-primary/10 border border-primary/15 flex-shrink-0 mb-1">
                {s.icon}
              </div>
              <h3 className="font-display font-bold uppercase tracking-wide
                text-[20px] text-white leading-tight">
                {s.name}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;
