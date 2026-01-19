import React, { useState } from 'react';
import { useLanguage } from './App';

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "Yb33391f2-bcb7-471d-a4b5-076d32f8c8fc",
          name: formState.name,
          email: formState.email,
          message: formState.message,
          from_name: "Orbis Accounting Website",
          subject: "New Contact Form Submission",
          // Adding botcheck to help prevent future rate-limiting blocks
          botcheck: "" 
        }),
      });

      const result = await response.json();
      
      if (response.status === 429) {
        setErrorMessage("Too many attempts. Please wait 30 minutes and try again.");
        return;
      }

      if (result.success) {
        setIsSubmitted(true);
        setFormState({ name: '', email: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        setErrorMessage(result.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      // This catches the "NetworkError" seen in your console logs
      setErrorMessage("Network error: The submission was blocked. Try using a different internet connection (like mobile data).");
    } finally {
      setIsSubmitting(false);
    }
  };

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
            {isSubmitted ? (
              <div className="h-96 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-icons-outlined text-4xl">check_circle</span>
                </div>
                <h3 className="text-2xl font-bold">{t.contact.success}</h3>
                <p className="text-gray-400">{t.contact.successDesc}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot field for bot protection */}
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
                
                {errorMessage && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
                    {errorMessage}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-bold mb-2 uppercase tracking-wide opacity-60">{t.contact.formName}</label>
                  <input 
                    required
                    type="text" 
                    name="name"
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all disabled:opacity-50"
                    placeholder={t.contact.placeholderName}
                    value={formState.name}
                    onChange={e => setFormState({...formState, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 uppercase tracking-wide opacity-60">{t.contact.formEmail}</label>
                  <input 
                    required
                    type="email" 
                    name="email"
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all disabled:opacity-50"
                    placeholder={t.contact.placeholderEmail}
                    value={formState.email}
                    onChange={e => setFormState({...formState, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 uppercase tracking-wide opacity-60">{t.contact.formHelp}</label>
                  <textarea 
                    name="message"
                    required
                    disabled={isSubmitting}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all disabled:opacity-50"
                    placeholder={t.contact.placeholderMessage}
                    value={formState.message}
                    onChange={e => setFormState({...formState, message: e.target.value})}
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-4 bg-primary text-gray-900 font-extrabold rounded-xl hover:brightness-110 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></span>
                      Sending...
                    </>
                  ) : t.contact.formBtn}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
