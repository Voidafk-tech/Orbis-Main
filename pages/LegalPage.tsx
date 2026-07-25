import React from 'react';
import type { LegalPage as LegalPageContent } from '../content/legal';

const LegalPage: React.FC<{ content: LegalPageContent }> = ({ content }) => (
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
    </div>
  </div>
);

export default LegalPage;
