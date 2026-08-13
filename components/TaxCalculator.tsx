import React, { useMemo, useState } from 'react';
import { useCopy } from './LocaleContext';
import { COMBINED_TAX_RATE, TAX_RATES } from '../content/site';

/**
 * The BC sales tax calculator on /gst-pst-bc.
 *
 * Why a tool and not more prose: the live results for "gst pst bc" are five
 * calculators in the top eighteen, and this page was a well-written explainer
 * competing against them. It also never stated the combined rate anywhere — a
 * figure that appears in three competing page titles — which is why the
 * sub-heading leads with it.
 *
 * Every number here comes from TAX_RATES in content/site.ts, including the
 * percentages in the labels. Nothing is typed twice, so a rate change is one
 * edit and cannot leave the copy saying one thing while the arithmetic does
 * another.
 */

type Mode = 'forward' | 'reverse';

/**
 * The default input, which makes the prerendered HTML a worked example rather
 * than a column of zeroes: $100 in, $5.00 / $7.00 / $112.00 out. That is what a
 * reader with JavaScript disabled sees, what a crawler indexes, and what the
 * page shows in the moment before hydration.
 */
const EXAMPLE_AMOUNT = '100';

/** Both languages show CAD figures, and a dollar amount reads the same in each. */
const money = (value: number): string => `$${value.toFixed(2)}`;

const TaxCalculator: React.FC = () => {
  const copy = useCopy();
  const t = copy.ui.taxCalculator;

  const [mode, setMode] = useState<Mode>('forward');
  const [amount, setAmount] = useState(EXAMPLE_AMOUNT);

  const figures = useMemo(() => {
    // Anything that is not a positive finite number is treated as zero rather
    // than thrown on: an empty field, a half-typed "1.", "abc" and a pasted
    // negative all have to render something.
    const entered = Number.parseFloat(amount);
    const value = Number.isFinite(entered) && entered > 0 ? entered : 0;

    // Forward: the figure is the base. Reverse: the figure already includes
    // both taxes, so divide it back out rather than subtracting 12% of it —
    // which is the mistake this mode exists to save people from.
    const base = mode === 'forward' ? value : value / (1 + COMBINED_TAX_RATE);
    const gst = base * TAX_RATES.gst;
    const pst = base * TAX_RATES.pst;

    return { base, gst, pst, total: base + gst + pst };
  }, [amount, mode]);

  const modes: { id: Mode; label: string }[] = [
    { id: 'forward', label: t.forwardTab },
    { id: 'reverse', label: t.reverseTab },
  ];

  return (
    <section className="calc" aria-labelledby="calc-heading">
      <p className="eyebrow intro__eyebrow">{t.eyebrow}</p>
      <h2 className="h2 calc__h" id="calc-heading">
        {t.h2}
      </h2>
      <p className="calc__sub">
        {t.subBefore}
        <strong className="calc__combined">{t.subCombined}</strong>
        {t.subAfter}
      </p>

      {/* Toggle buttons rather than the tablist the handoff sketched. This
          switches what the single field below means, it does not swap panels,
          so announcing it as a tablist would describe a structure that is not
          there. aria-pressed says exactly what is true. */}
      <div className="calc__modes" role="group" aria-label={t.modeLabel}>
        {modes.map((item) => (
          <button
            key={item.id}
            type="button"
            className="calc__mode"
            aria-pressed={mode === item.id}
            onClick={() => setMode(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <label className="calc__label" htmlFor="calc-amount">
        {mode === 'forward' ? t.forwardLabel : t.reverseLabel}
      </label>
      <input
        id="calc-amount"
        className="calc__input"
        type="number"
        inputMode="decimal"
        min="0"
        step="0.01"
        value={amount}
        // The field ships pre-filled with the worked example, so a tap should
        // replace it rather than make someone clear it first.
        onFocus={(event) => event.currentTarget.select()}
        onChange={(event) => setAmount(event.currentTarget.value)}
      />

      <dl className="calc__out" aria-live="polite" aria-label={t.resultsLabel}>
        <div className="calc__row">
          <dt>{t.subtotal}</dt>
          <dd>{money(figures.base)}</dd>
        </div>
        <div className="calc__row">
          <dt>{t.gst}</dt>
          <dd>{money(figures.gst)}</dd>
        </div>
        <div className="calc__row">
          <dt>{t.pst}</dt>
          <dd>{money(figures.pst)}</dd>
        </div>
        <div className="calc__row calc__row--total">
          <dt>{t.total}</dt>
          <dd>{money(figures.total)}</dd>
        </div>
      </dl>

      <p className="calc__note">
        {t.noteBefore}
        <a href="#exemptions">{t.noteLink}</a>
        {t.noteAfter}
        {copy.site.RATES_AS_OF}
        {t.noteEnd}
      </p>

      <noscript>
        <p className="calc__note">{t.noscript}</p>
      </noscript>
    </section>
  );
};

export default TaxCalculator;
