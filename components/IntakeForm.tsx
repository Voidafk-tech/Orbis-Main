import React, { useRef, useState } from 'react';
import { LogoMark } from './Logo';
import { CONTACT, FORM_SELECTS } from '../content/site';
import { EVENTS, trackEvent } from './analytics';

/**
 * Web3Forms delivers the submission straight to the practice inbox.
 * The key is a public submission key by design — it only allows posting to
 * the address it was issued for.
 */
const WEB3FORMS_ACCESS_KEY = '47a2f9ae-8824-40f2-be79-f1be7deb2465';
const ENDPOINT = 'https://api.web3forms.com/submit';

type Values = Record<string, string>;

const TEXT_DEFAULTS: Values = {
  name: '',
  email: '',
  business: '',
  phone: '',
  notes: '',
  company_url: '', // honeypot
};

const initialValues = (): Values => {
  const values: Values = { ...TEXT_DEFAULTS };
  // Selects show their first option, so every submission carries an answer.
  FORM_SELECTS.forEach((select) => {
    values[select.name] = select.options[0];
  });
  return values;
};

/** Everything the dropdowns captured, laid out for the email body. */
const composeMessage = (v: Values): string => {
  const lines: string[] = [];

  lines.push('WHAT THEY NEED HELP WITH');
  lines.push(v.notes.trim() || 'Not answered');
  lines.push('');
  lines.push('THEIR DETAILS');
  lines.push(`Full name: ${v.name.trim()}`);
  lines.push(`Business name: ${v.business.trim()}`);
  lines.push(`Email: ${v.email.trim()}`);
  lines.push(`Phone: ${v.phone.trim() || 'Not provided'}`);
  lines.push('');
  lines.push('THEIR BOOKS');
  FORM_SELECTS.forEach((select) => {
    lines.push(`${select.label}: ${v[select.name]}`);
  });
  lines.push('');
  lines.push(`Sent from the intake form at orbisaccounting.ca`);

  return lines.join('\n');
};

const IntakeForm: React.FC = () => {
  const [values, setValues] = useState<Values>(initialValues);
  const [err, setErr] = useState('');
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const confirmationRef = useRef<HTMLHeadingElement>(null);

  const set = (field: string) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Honeypot: a bot filled the hidden field. Stop, say nothing.
    if (values.company_url.trim() !== '') return;

    const name = values.name.trim();
    const business = values.business.trim();
    const email = values.email.trim();

    if (!name) {
      setErr('We need a name to address the reply to.');
      return;
    }
    if (!business) {
      setErr('What is the business called? It goes on the quote.');
      return;
    }
    // Deliberately loose. A strict pattern rejects valid addresses and
    // a rejected address is a lost lead.
    if (!email || email.indexOf('@') < 1 || email.indexOf('.') < 3) {
      setErr('That email address does not look right. Check for a typo?');
      return;
    }

    setErr('');
    setSending(true);

    const payload: Record<string, string> = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `New enquiry from ${business} (${name})`,
      from_name: 'Orbis Accounting website',
      replyto: email,
      // Readable keys, because Web3Forms emails the payload as a field table.
      'Full name': name,
      'Business name': business,
      Email: email,
      Phone: values.phone.trim() || 'Not provided',
      'What they need help with': values.notes.trim() || 'Not answered',
      message: composeMessage(values),
    };
    FORM_SELECTS.forEach((select) => {
      payload[select.label] = values[select.name];
    });

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success) {
        // Keep everything they typed — do not clear the form.
        setErr(`That did not send. Try again, or email ${CONTACT.email} directly.`);
        trackEvent(EVENTS.formError, { reason: 'rejected' });
        return;
      }

      // The one action on the site that is worth measuring.
      trackEvent(EVENTS.lead, {
        volume: values.volume,
        software: values.software,
        behind: values.behind,
        industry: values.industry,
      });

      setValues(initialValues());
      setErr('');
      setSent(true);
      window.setTimeout(() => {
        confirmationRef.current?.focus();
        const target = document.getElementById('start');
        if (target) {
          window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 90 });
        }
      }, 40);
    } catch {
      setErr(`That did not send. Try again, or email ${CONTACT.email} directly.`);
      trackEvent(EVENTS.formError, { reason: 'network' });
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="sent">
        <div className="sent__mark">
          <LogoMark size={34} />
        </div>
        <h3 className="sent__h" tabIndex={-1} ref={confirmationRef}>
          Got it.
        </h3>
        <p className="sent__p">
          You will hear back within one business day with a written plan and a fixed monthly
          price. It comes from {CONTACT.email}, so add that address if your inbox is strict.
        </p>
        <button type="button" className="btn btn--ghost" onClick={() => setSent(false)}>
          Send another
        </button>
      </div>
    );
  }

  return (
    <div className="form-shell">
      <form className="form" onSubmit={handleSubmit} noValidate>
        <fieldset>
          <legend>Your details</legend>
          <div className="form__grid">
            <label className="field">
              <span className="field__label">Full name</span>
              <input
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Jordan Reyes"
                value={values.name}
                onChange={set('name')}
              />
            </label>
            <label className="field">
              <span className="field__label">Email</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@company.ca"
                value={values.email}
                onChange={set('email')}
              />
            </label>
            <label className="field">
              <span className="field__label">Business name</span>
              <input
                name="business"
                type="text"
                autoComplete="organization"
                placeholder="Reyes Contracting Ltd."
                value={values.business}
                onChange={set('business')}
              />
            </label>
            <label className="field">
              <span className="field__label">
                Phone <span className="field__optional">optional</span>
              </span>
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="604-555-0134"
                value={values.phone}
                onChange={set('phone')}
              />
            </label>
          </div>
        </fieldset>

        <fieldset>
          <legend>Your books</legend>
          <div className="form__grid">
            {FORM_SELECTS.map((select) => (
              <label
                key={select.name}
                className={`field${'fullWidth' in select && select.fullWidth ? ' field--full' : ''}`}
              >
                <span className="field__label">{select.label}</span>
                <select
                  name={select.name}
                  value={values[select.name]}
                  onChange={set(select.name)}
                >
                  {select.options.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>In your words</legend>
          <label className="field">
            <span className="field__label">
              What is the main thing you need help with right now
            </span>
            <textarea
              name="notes"
              rows={3}
              placeholder="Two years of receipts in a box and a GST return I have not filed."
              value={values.notes}
              onChange={set('notes')}
            />
          </label>

          <div className="honeypot" aria-hidden="true">
            <label>
              Do not fill this in
              <input
                name="company_url"
                tabIndex={-1}
                autoComplete="off"
                value={values.company_url}
                onChange={set('company_url')}
              />
            </label>
          </div>
        </fieldset>

        <p className="form__error" aria-live="polite">
          {err}
        </p>

        <button type="submit" className="btn btn--primary btn--block form__submit" disabled={sending}>
          {sending ? 'Sending…' : 'Send my details'}
        </button>

        <p className="form__note">
          We reply within one business day. Your details are used to write your quote and nothing
          else. No newsletter, no mailing list.
        </p>
      </form>
    </div>
  );
};

export default IntakeForm;
