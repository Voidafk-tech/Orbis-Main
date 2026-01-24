import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../components/App';

const AboutPage: React.FC = () => {
  const { t } = useLanguage();

  const advantageSvgs = [
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>,
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>,
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
  ];

  return (
    <div className="py-20 animate-in fade-in duration-500 bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
          <div>
            <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] rounded mb-6">
              {t.about.badge}
            </div>
            <h1 className="text-6xl lg:text-8xl font-display font-extrabold mb-8 leading-tight text-white">
              {t.about.title}<span className="text-primary">{t.about.titleAccent}</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed mb-6 font-medium">
              {t.about.desc1}
            </p>
            <p className="text-gray-400 leading-relaxed font-sans">
              {t.about.desc2}
            </p>
          </div>
          <div className="relative">
             <div className="absolute inset-0 bg-primary/20 blur-[120px] -z-10"></div>
             <img 
              alt="Professional accounting team" 
              className="rounded-[3rem] shadow-2xl border border-white/10 aspect-[4/3] object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-700" 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200" 
            />
          </div>
        </div>

        {/* Remote Advantage Section */}
        <div className="py-24 border-y border-white/5 my-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-display font-black mb-8 text-white">{t.about.remoteTitle}</h2>
            <p className="text-gray-400 leading-relaxed text-xl mb-16 max-w-2xl mx-auto font-sans">
              {t.about.remoteDesc}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {t.about.icons.map((item, i) => (
                <div key={i} className="p-8 bg-[#1A1A1A] rounded-[2rem] border border-white/5 group hover:border-primary/30 transition-all">
                  <div className="text-primary mb-4 flex justify-center group-hover:scale-110 transition-transform">
                    {advantageSvgs[i]}
                  </div>
                  <div className="text-xs font-black uppercase tracking-widest text-gray-300">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-32 text-center">
          <h2 className="text-4xl lg:text-5xl font-display font-black mb-12 text-white">{t.about.readyTitle}</h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/pricing" className="px-12 py-5 bg-primary text-gray-900 font-black rounded-2xl transition-all shadow-xl uppercase tracking-wider">
              {t.about.readyBtn}
            </Link>
            <Link to="/contact" className="px-12 py-5 border-2 border-white/20 text-white hover:bg-white hover:text-gray-900 font-black rounded-2xl transition-all uppercase tracking-wider">
              {t.about.meetPartners}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;