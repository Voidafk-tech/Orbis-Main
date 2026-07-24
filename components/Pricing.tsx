import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from './App';

interface PricingProps {
  showTitle?: boolean;
  /** Hides the "Specialized Solutions" add-on grid for use in condensed layouts like Home. */
  compact?: boolean;
}

const Pricing: React.FC<PricingProps> = ({ showTitle = true, compact = false }) => {
  const { t, lang } = useLanguage();

  const coreTiers = [
    {
      name: t.pricing.monthly.name,
      price: t.pricing.monthly.price,
      period: t.pricing.mo,
      desc: t.pricing.monthly.desc,
      items: t.pricing.monthly.items,
      featured: true
    },
    {
      name: t.pricing.catchup.name,
      price: t.pricing.catchup.price,
      period: t.pricing.once || '',
      desc: t.pricing.catchup.desc,
      items: t.pricing.catchup.items,
    },
    {
      name: t.pricing.quarterly.name,
      price: t.pricing.quarterly.price,
      period: t.pricing.qtr,
      desc: t.pricing.quarterly.desc,
      items: t.pricing.quarterly.items,
    },
    {
      name: t.pricing.yearly.name,
      price: t.pricing.yearly.price,
      period: t.pricing.yr,
      desc: t.pricing.yearly.desc,
      items: t.pricing.yearly.items,
    }
  ];

  const isNumeric = (val: string) => /^\d+/.test(val.replace(/[^0-9]/g, ''));

  return (
    <section className="py-24 border-t border-white/[0.06] bg-white dark:bg-background-dark" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showTitle && (
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-[#1A1A1A] dark:text-white">
              {t.pricing.title}<span className="text-primary">{t.pricing.titleAccent}</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg font-sans text-center">
              {t.pricing.subtitle}
            </p>
          </div>
        )}

        {/* Core Bookkeeping Plans */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {coreTiers.map((tier, idx) => (
            <div 
              key={idx} 
              className={`relative rounded-3xl overflow-hidden flex flex-col shadow-2xl transition-all duration-300 group hover:translate-y-[-4px] border-2 ${
                tier.featured 
                ? 'bg-primary/5 dark:bg-primary/10 border-primary scale-105 z-10' 
                : 'bg-white dark:bg-gray-800/80 border-primary/30 dark:border-primary/20'
              }`}
            >
              <div className="p-8 flex flex-col flex-grow">
                <h3 className={`text-xl font-display font-black text-[#1A1A1A] dark:text-white mb-4 ${lang === 'zh' ? 'text-center' : ''}`}>
                  {tier.name}
                </h3>
                
                <p className={`text-[#333333] dark:text-gray-400 mb-8 leading-relaxed text-sm font-sans font-medium ${lang === 'zh' ? 'text-center' : ''}`}>
                  {tier.desc}
                </p>

                {tier.items && (
                  <ul className={`space-y-4 mb-10 list-none text-[#1A1A1A] dark:text-gray-200 font-sans text-xs ${lang === 'zh' ? 'text-center' : 'ml-4'}`}>
                    {tier.items.map((item, i) => (
                      <li key={i} className={`flex items-center gap-2 ${lang === 'zh' ? 'justify-center' : ''}`}>
                        {lang !== 'zh' && <div className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />}
                        <span className={`w-full ${lang === 'zh' ? 'text-center' : ''}`}>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-auto pt-6 border-t border-primary/20 dark:border-white/10">
                  <div className={`text-lg font-display italic font-bold text-[#1A1A1A] dark:text-white mb-6 ${lang === 'zh' ? 'text-center' : ''}`}>
                    <span className="text-2xl text-primary">
                      {isNumeric(tier.price) ? `$${tier.price}` : tier.price}
                    </span>{' '}
                    <span className="text-xs opacity-60">{tier.period}</span>
                  </div>
                  <Link 
                    to="/contact"
                    className={`inline-block w-full text-center px-6 py-4 font-display font-black rounded-full transition-all border-2 uppercase tracking-wider text-[10px] shadow-md ${
                      tier.featured
                      ? 'bg-primary text-gray-900 border-primary hover:brightness-110'
                      : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-primary/50 hover:bg-primary hover:text-gray-900 hover:border-primary'
                    }`}
                  >
                    {t.pricing.cta}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!compact && (
          <>
            {/* Specialized Section Header */}
            <div className="mt-40 text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-display font-black text-[#1A1A1A] dark:text-white mb-4">{t.pricing.additionalTitle}</h2>
              <p className="text-gray-400 max-w-3xl mx-auto text-lg font-sans text-center">
                {t.pricing.additionalSubtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              <div className="relative bg-[#CFD9D6] dark:bg-gray-800/80 rounded-3xl overflow-hidden flex flex-col shadow-xl border border-black/5 dark:border-white/5 group hover:translate-y-[-4px] transition-all duration-300">
                <div className="p-10 flex flex-col flex-grow">
                  <h3 className={`text-2xl font-display font-black text-[#1A1A1A] dark:text-white mb-4 ${lang === 'zh' ? 'text-center' : ''}`}>
                    {t.pricing.launchpad.name}
                  </h3>
                  <p className={`text-[#333333] dark:text-gray-300 mb-8 leading-relaxed text-base font-sans font-medium ${lang === 'zh' ? 'text-center' : ''}`}>
                    {t.pricing.launchpad.desc}
                  </p>
                  <ul className={`space-y-3 mb-10 list-none text-[#1A1A1A] dark:text-gray-200 font-sans text-sm ${lang === 'zh' ? 'text-center' : 'ml-4'}`}>
                    {t.pricing.launchpad.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-8 border-t border-black/10 dark:border-white/10">
                    <div className={`text-lg font-display italic font-bold text-[#1A1A1A] dark:text-white mb-6 ${lang === 'zh' ? 'text-center' : ''}`}>
                      <span className="text-2xl text-primary">
                        {isNumeric(t.pricing.launchpad.price) ? `$${t.pricing.launchpad.price}` : t.pricing.launchpad.price}
                      </span>{' '}
                      <span className="text-xs opacity-60">{t.pricing.once}</span>
                    </div>
                    <Link
                      to="/contact"
                      className="inline-block px-10 py-4 bg-gray-900 dark:bg-gray-700 text-white font-display font-black rounded-full hover:brightness-110 transition-all border border-black/10 uppercase tracking-wider text-xs shadow-md text-center"
                    >
                      {t.pricing.launchpad.cta}
                    </Link>
                  </div>
                </div>
              </div>

              {t.pricing.additional.map((service, idx) => (
                <div key={idx} className="relative bg-[#CFD9D6] dark:bg-gray-800/80 rounded-3xl overflow-hidden flex flex-col shadow-xl border border-black/5 dark:border-white/5 group hover:translate-y-[-4px] transition-all duration-300">
                  <div className="p-10 flex flex-col flex-grow">
                    <h3 className={`text-2xl font-display font-black text-[#1A1A1A] dark:text-white mb-6 ${lang === 'zh' ? 'text-center' : ''}`}>
                      {service.title}
                    </h3>
                    <p className={`text-[#333333] dark:text-gray-300 mb-10 leading-relaxed text-base font-sans font-medium flex-grow ${lang === 'zh' ? 'text-center' : ''}`}>
                      {service.desc}
                    </p>
                    <div className="mt-auto pt-8 border-t border-black/10 dark:border-white/10">
                      <Link
                        to="/contact"
                        className="inline-block px-10 py-4 bg-primary text-gray-900 font-display font-black rounded-full hover:brightness-110 transition-all border border-black/10 uppercase tracking-wider text-xs shadow-md text-center w-full"
                      >
                        {t.pricing.additionalCta}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Pricing;