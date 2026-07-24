import React, { useState } from 'react';
import { useLanguage } from './App';

const WEB3FORMS_ACCESS_KEY = '47a2f9ae-8824-40f2-be79-f1be7deb2465';

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [formState, setFormState] = useState({ name: '', email: '', businessName: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New contact form submission from ${formState.name}`,
          ...formState,
        }),
      });
      const result = await response.json();

      if (result.success) {
        setFormState({ name: '', email: '', businessName: '', message: '' });
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        setError(result.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-24 md:py-[100px] px-6 md:px-10 border-t border-white/[0.06]" id="contact">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[520px] h-[520px] max-w-[90vw] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(10,132,255,.10), transparent 62%)' }}
      />
      <div className="relative max-w-[920px] mx-auto grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <h2 className="font-display font-bold text-4xl">{t.contact.healthCheck}</h2>
          <p className="text-gray-400 text-base leading-relaxed mt-5">{t.contact.healthDesc}</p>
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <a href="mailto:info@orbisaccounting.ca" className="text-sm font-medium text-primary hover:opacity-80 transition-opacity">info@orbisaccounting.ca</a>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </div>
              <a href={t.contact.phoneUrl} className="text-sm font-medium text-gray-100 hover:text-primary transition-colors">{t.contact.phone}</a>
            </div>
            {t.contact.wechat && (
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-xl">chat</span>
                </div>
                <span className="text-sm font-medium text-gray-100">{t.contact.wechat}</span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-800 p-[30px] rounded-[20px] border border-white/[0.08]">
          {isSubmitted ? (
            <div className="h-96 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="font-display text-2xl font-bold text-gray-100">{t.contact.success}</h3>
              <p className="text-gray-400">{t.contact.successDesc}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
              <input
                required
                type="text"
                aria-label={t.contact.formName}
                className="bg-gray-900 border border-white/10 rounded-xl px-4 py-3.5 text-[15px] text-gray-100 outline-none focus:border-primary/50 transition-colors"
                placeholder={t.contact.placeholderName}
                value={formState.name}
                onChange={e => setFormState({ ...formState, name: e.target.value })}
              />
              <input
                required
                type="email"
                aria-label={t.contact.formEmail}
                className="bg-gray-900 border border-white/10 rounded-xl px-4 py-3.5 text-[15px] text-gray-100 outline-none focus:border-primary/50 transition-colors"
                placeholder={t.contact.placeholderEmail}
                value={formState.email}
                onChange={e => setFormState({ ...formState, email: e.target.value })}
              />
              <input
                type="text"
                aria-label={t.contact.formBusiness}
                className="bg-gray-900 border border-white/10 rounded-xl px-4 py-3.5 text-[15px] text-gray-100 outline-none focus:border-primary/50 transition-colors"
                placeholder={t.contact.placeholderBusiness}
                value={formState.businessName}
                onChange={e => setFormState({ ...formState, businessName: e.target.value })}
              />
              <textarea
                rows={3}
                aria-label={t.contact.formHelp}
                className="bg-gray-900 border border-white/10 rounded-xl px-4 py-3.5 text-[15px] text-gray-100 outline-none focus:border-primary/50 transition-colors resize-none"
                placeholder={t.contact.placeholderMessage}
                value={formState.message}
                onChange={e => setFormState({ ...formState, message: e.target.value })}
              />
              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-1 text-white font-semibold text-base py-[17px] rounded-xl transition-all hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ background: '#0a84ff', boxShadow: '0 8px 24px rgba(10,132,255,.3)' }}
              >
                {isSubmitting ? '...' : t.contact.formBtn}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
