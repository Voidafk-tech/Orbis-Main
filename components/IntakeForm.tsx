import React, { useRef, useState } from 'react';
import { LogoMark } from './Logo';
import { useCopy } from './LocaleContext';
import { FORM_SELECTS as EN_FORM_SELECTS } from '../content/site';
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

/**
 * Caps on what each field will accept, kept here so the numbers are in one
 * place rather than scattered through the markup.
 *
 * Set well above any real answer — the longest business name anyone types is
 * not close to 120 characters, and `email` is the RFC 5321 maximum — so this
 * cannot turn a genuine enquiry away. It is a ceiling, not validation.
 *
 * Worth being clear about the scope: this constrains the form, not the
 * endpoint. The Web3Forms access key is public by design, so anything posting
 * to the endpoint directly skips this and both honeypots. Capping the fields
 * is what can be done from here; a captcha on the Web3Forms side is what would
 * bound the rest, and it is deliberately not enabled — see the note on
 * `botcheck` below.
 */
const MAX_LENGTHS: Record<string, number> = {
  name: 100,
  email: 254,
  business: 120,
  phone: 40,
  notes: 2000,
};

/**
 * Web3Forms' own honeypot, and the second of two — which is the point.
 *
 * `company_url` above is checked here, in this file, and a bot that drives a
 * real browser can simply not run this code: override the submit handler, call
 * fetch itself, and the check never happens. `botcheck` is checked by Web3Forms
 * after the request arrives, so passing it through means the rejection happens
 * somewhere the client cannot reach. That is the only reason to carry both.
 *
 * It has to be *sent* to do anything. This form builds a JSON payload by hand
 * rather than posting the form element, so a hidden input nobody reads is
 * inert — the field is only a honeypot if its value rides along. Hence the
 * state below and the entry in the payload.
 *
 * Honest about the ceiling: this catches bots that fill the DOM and submit.
 * It does nothing about a script posting straight to api.web3forms.com with
 * the public key, which is the case that can burn a monthly submission quota
 * and take the contact channel down with it. Only a captcha or domain
 * restriction, both enabled on the Web3Forms side, bound that one.
 */
const BOTCHECK_FIELD = 'botcheck';

type Selects = ReturnType<typeof useCopy>['site']['FORM_SELECTS'];

const initialValues = (selects: Selects): Values => {
  const values: Values = { ...TEXT_DEFAULTS };
  // Selects show their first option, so every submission carries an answer.
  selects.forEach((select) => {
    values[select.name] = select.options[0].value;
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
  // Always the English label. The visitor may have filled this in in Chinese,
  // but the enquiry is read by the practice, so the email stays in English.
  EN_FORM_SELECTS.forEach((select) => {
    lines.push(`${select.label}: ${v[select.name]}`);
  });
  lines.push('');
  lines.push(`Sent from the intake form at orbisaccounting.ca`);

  return lines.join('\n');
};

const IntakeForm: React.FC = () => {
  const copy = useCopy();
  const { CONTACT, FORM_SELECTS } = copy.site;
  const t = copy.ui.form;
  const [values, setValues] = useState<Values>(() => initialValues(FORM_SELECTS));
  // Boolean rather than another entry in `values`, because Web3Forms tests it
  // for truthiness and a checkbox is what a form-filling bot ticks.
  const [botcheck, setBotcheck] = useState(false);
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
      setErr(t.errorName);
      return;
    }
    if (!business) {
      setErr(t.errorBusiness);
      return;
    }
    // Deliberately loose. A strict pattern rejects valid addresses and
    // a rejected address is a lost lead.
    if (!email || email.indexOf('@') < 1 || email.indexOf('.') < 3) {
      setErr(t.errorEmail);
      return;
    }

    setErr('');
    setSending(true);

    const payload: Record<string, string | boolean> = {
      access_key: WEB3FORMS_ACCESS_KEY,
      // Always present, normally false. Web3Forms rejects the submission when
      // it is true, which is the whole mechanism — see BOTCHECK_FIELD.
      [BOTCHECK_FIELD]: botcheck,
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
    EN_FORM_SELECTS.forEach((select) => {
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
        setErr(`${t.errorSendBefore}${CONTACT.email}${t.errorSendAfter}`);
        trackEvent(EVENTS.formError, { reason: 'rejected' });
        return;
      }

      // The one action on the site that is worth measuring.
      //
      // These four go to Google, so the privacy policy names them — see the
      // "Website analytics" section in content/legal.ts. It draws the line at
      // what the visitor *types*: the typed fields above (name, business,
      // email, phone, notes) are deliberately absent here and must stay that
      // way. Adding a param means amending that paragraph in both languages,
      // or the policy stops describing the software.
      trackEvent(EVENTS.lead, {
        volume: values.volume,
        software: values.software,
        behind: values.behind,
        industry: values.industry,
      });

      setValues(initialValues(FORM_SELECTS));
      setBotcheck(false);
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
      setErr(`${t.errorSendBefore}${CONTACT.email}${t.errorSendAfter}`);
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
          {t.sentH}
        </h3>
        <p className="sent__p">
          {t.sentPBefore}
          {CONTACT.email}
          {t.sentPAfter}
        </p>
        <button type="button" className="btn btn--ghost" onClick={() => setSent(false)}>
          {t.sentAgain}
        </button>
      </div>
    );
  }

  return (
    <div className="form-shell">
      <form className="form" onSubmit={handleSubmit} noValidate>
        <fieldset>
          <legend>{t.detailsLegend}</legend>
          <div className="form__grid">
            <label className="field">
              <span className="field__label">{t.name}</span>
              <input
                name="name"
                type="text"
                autoComplete="name"
                maxLength={MAX_LENGTHS.name}
                placeholder={t.namePlaceholder}
                value={values.name}
                onChange={set('name')}
              />
            </label>
            <label className="field">
              <span className="field__label">{t.email}</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                maxLength={MAX_LENGTHS.email}
                placeholder={t.emailPlaceholder}
                value={values.email}
                onChange={set('email')}
              />
            </label>
            <label className="field">
              <span className="field__label">{t.business}</span>
              <input
                name="business"
                type="text"
                autoComplete="organization"
                maxLength={MAX_LENGTHS.business}
                placeholder={t.businessPlaceholder}
                value={values.business}
                onChange={set('business')}
              />
            </label>
            <label className="field">
              <span className="field__label">
                {t.phone} <span className="field__optional">{t.phoneOptional}</span>
              </span>
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                maxLength={MAX_LENGTHS.phone}
                placeholder={t.phonePlaceholder}
                value={values.phone}
                onChange={set('phone')}
              />
            </label>
          </div>
        </fieldset>

        <fieldset>
          <legend>{t.booksLegend}</legend>
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
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>{t.wordsLegend}</legend>
          <label className="field">
            <span className="field__label">{t.notes}</span>
            <textarea
              name="notes"
              rows={3}
              maxLength={MAX_LENGTHS.notes}
              placeholder={t.notesPlaceholder}
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
            {/* The name is Web3Forms' and cannot be changed — it is the field
                their endpoint looks for. Kept off-screen with the other
                honeypot rather than `display: none`, since a bot skipping
                undisplayed inputs is exactly the bot worth catching. */}
            <label>
              Leave this checkbox alone
              <input
                type="checkbox"
                name={BOTCHECK_FIELD}
                tabIndex={-1}
                autoComplete="off"
                checked={botcheck}
                onChange={(event) => setBotcheck(event.target.checked)}
              />
            </label>
          </div>
        </fieldset>

        <p className="form__error" aria-live="polite">
          {err}
        </p>

        <button type="submit" className="btn btn--primary btn--block form__submit" disabled={sending}>
          {sending ? t.sending : t.submit}
        </button>

        <p className="form__note">{t.note}</p>
      </form>
    </div>
  );
};

export default IntakeForm;
