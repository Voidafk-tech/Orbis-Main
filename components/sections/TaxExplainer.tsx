import React from 'react';
import { Link } from 'react-router';
import { useLocale } from '../LocaleContext';

const TaxExplainer: React.FC = () => {
  const { copy, path } = useLocale();
  const { tax } = copy.ui;

  return (
    <section className="sec">
      <div className="inner split split--tax">
        <div className="reveal">
          <p className="eyebrow intro__eyebrow">{tax.eyebrow}</p>
          <h2 className="h2">{tax.h2}</h2>
        </div>

        <div>
          <div className="tax-pair reveal">
            {tax.taxes.map((item) => (
              <div key={item.name} className="tax-cell">
                <p className="tax-cell__figure">{item.figure}</p>
                <h3 className="tax-cell__name">{item.name}</h3>
                <p className="micro tax-cell__authority">{item.authority}</p>
                <p className="tax-cell__p">{item.body}</p>
              </div>
            ))}
          </div>

          {/* One date stamp, referenced everywhere the rates appear, in both
              languages — a second copy is how a page ends up asserting a stale rate. */}
          <p className="tax-note reveal">
            {tax.noteBefore}
            {copy.site.RATES_AS_OF}
            {tax.noteAfter}
          </p>

          <p className="tax-note reveal">
            <Link to={path('/gst-pst-bc')}>{tax.more}</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default TaxExplainer;
