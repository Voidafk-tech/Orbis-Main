import React from 'react';

const services = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="14" fill="none" stroke="#a3ec6d" strokeWidth="2.6" />
        <circle cx="20" cy="20" r="4" fill="#a3ec6d" />
      </svg>
    ),
    name: 'Bookkeeping',
    desc: 'Monthly reconciliations in QuickBooks Online or Sage 50, so your books stay accurate and ready anytime.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 40 40">
        <rect x="8" y="8" width="24" height="24" rx="6" fill="none" stroke="#a3ec6d" strokeWidth="2.6" />
        <line x1="8" y1="18" x2="32" y2="18" stroke="#a3ec6d" strokeWidth="2.6" />
      </svg>
    ),
    name: 'Payroll & WCB',
    desc: 'Accurate, on-time payroll and full WorkSafeBC compliance for your whole team, every pay period.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 40 40">
        <path d="M12 26 L12 14 M20 26 L20 10 M28 26 L28 18" stroke="#a3ec6d" strokeWidth="2.6" strokeLinecap="round" />
      </svg>
    ),
    name: 'AP / AR',
    desc: "We pay your bills and collect what you're owed, keeping cash flow steady without the chasing.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 40 40">
        <path d="M20 7 L31 12 V21 C31 28 26 32 20 34 C14 32 9 28 9 21 V12 Z" fill="none" stroke="#a3ec6d" strokeWidth="2.6" strokeLinejoin="round" />
      </svg>
    ),
    name: 'Compliance',
    desc: 'GST, PST, and CRA filings submitted accurately and on time, so tax season never catches you off guard.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 40 40">
        <rect x="9" y="9" width="22" height="22" rx="4" fill="none" stroke="#a3ec6d" strokeWidth="2.6" />
        <path d="M14 22 L18 18 L22 21 L27 15" fill="none" stroke="#a3ec6d" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    name: 'Reporting',
    desc: 'Clear monthly financial statements that show exactly where your business stands.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 40 40">
        <circle cx="15" cy="16" r="5" fill="none" stroke="#a3ec6d" strokeWidth="2.6" />
        <circle cx="26" cy="22" r="5" fill="none" stroke="#a3ec6d" strokeWidth="2.6" />
      </svg>
    ),
    name: 'Fractional CFO',
    desc: 'Senior financial guidance when big decisions come up, without the cost of a full-time hire.',
  },
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 px-10 border-t border-white/[0.06] bg-background-dark">
      <div className="max-w-[1080px] mx-auto">

        <div className="text-center max-w-[600px] mx-auto mb-[52px]">
          <div className="font-semibold text-[11px] tracking-[0.14em] uppercase text-primary">
            What we handle
          </div>
          <h2 className="mt-4 font-display font-semibold text-[clamp(30px,5vw,40px)] leading-[1.08] tracking-[-0.028em] text-gray-100">
            Everything your books need, in one place.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[18px]">
          {services.map((s) => (
            <div
              key={s.name}
              className="p-7 border border-white/[0.08] rounded-[18px] bg-gray-800
                transition-all duration-300 hover:border-primary/25 hover:-translate-y-1"
            >
              {s.icon}
              <h3 className="mt-[18px] mb-[7px] font-display font-semibold text-[18px] leading-[1.2] text-gray-100">
                {s.name}
              </h3>
              <p className="text-[14.5px] leading-[1.55] text-gray-400">{s.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;
