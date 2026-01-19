import React from 'react';
import { useLanguage } from './App';

const Contact: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900/50" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <h2 className="text-4xl font-display font-bold">{t.contact.healthCheck}</h2>
            <p className="text-gray-400 text-lg">{t.contact.healthDesc}</p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-icons-outlined text-xl">email</span>
                </div>
                <a href="mailto:info@orbisaccounting.ca" className="text-sm font-medium hover:text-primary transition-colors">info@orbisaccounting.ca</a>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-icons-outlined text-xl">call</span>
                </div>
                <a href="tel:6042037799" className="text-sm font-medium hover:text-primary transition-colors">604-203-7799</a>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
            {/* Standard POST form for maximum reliability */}
            <form action="https://api.web3forms.com/submit" method="POST" className="space-y-6">
              
              {/* Corrected Access Key (removed the "Y") */}
              <input type="hidden" name="access_key" value="b33391f2-bcb7-471d-a4b5-076d32f8c8fc" />
              
              {/* Optional: Redirects user back to your site after success */}
              <input type="hidden" name="redirect" value="https://orbisaccounting.ca/contact" />
              
              {/* Optional: Honeypot to prevent spam */}
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

              <div>
                <label className="block text-sm font-bold mb-2 uppercase tracking-wide opacity-60">{t.contact.formName}</label>
                <input 
                  required
                  type="text" 
                  name="name"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder={t.contact.placeholderName}
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 uppercase tracking-wide opacity-60">{t.contact.formEmail}</label>
                <input 
                  required
                  type="email" 
                  name="email"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder={t.contact.placeholderEmail}
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 uppercase tracking-wide opacity-60">{t.contact.formHelp}</label>
                <textarea 
                  name="message"
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder={t.contact.placeholderMessage}
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-4 bg-primary text-gray-900 font-extrabold rounded-xl hover:brightness-110 transition-all shadow-lg shadow-primary/20"
              >
                {t.contact.formBtn}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
