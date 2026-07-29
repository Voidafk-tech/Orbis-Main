import React from 'react';
import { useCopy } from '../components/LocaleContext';

/**
 * The Chinese versions are translations for readability; the English text
 * governs. Each locale's `note` says so, and `translationNote` adds the same
 * statement as a separate line so it is not buried at the end of a paragraph.
 */
const LegalPage: React.FC<{ page: 'privacy' | 'terms' }> = ({ page }) => {
  const copy = useCopy();
  const content = page === 'privacy' ? copy.legal.PRIVACY : copy.legal.TERMS;
  const { translationNote } = copy.ui.legal;

  return (
    <div className="legal">
      <div className="legal__inner">
        <h1>{content.title}</h1>
        <p className="micro legal__updated">{content.lastUpdated}</p>

        {content.sections.map((section) => (
          <section key={section.h}>
            <h2>{section.h}</h2>
            <p>{section.p}</p>
          </section>
        ))}

        <p className="legal__note">{content.note}</p>
        {translationNote ? <p className="legal__note">{translationNote}</p> : null}
      </div>
    </div>
  );
};

export default LegalPage;
