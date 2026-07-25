import React from 'react';
import { RATES_AS_OF } from '../../content/site';

const TAXES = [
  {
    figure: '5%',
    name: 'GST',
    authority: 'Goes to the CRA',
    body: 'Federal. You generally must register once you pass $30,000 in revenue over four quarters. You charge it on most sales and you claim back the GST you paid on business purchases.',
  },
  {
    figure: '7%',
    name: 'PST',
    authority: 'Goes to the province',
    body: 'Provincial, and separate. Different registration, different deadlines, and a different list of what is taxable. Many services are exempt while most goods are not. There is no input credit to claim back.',
  },
];

const TaxExplainer: React.FC = () => (
  <section className="sec">
    <div className="inner split split--tax">
      <div className="reveal">
        <p className="eyebrow intro__eyebrow">In plain terms</p>
        <h2 className="h2">GST and PST are two different taxes.</h2>
        <p className="tax__p">
          This is the thing that catches out almost every business owner in BC.
        </p>
      </div>

      <div>
        <div className="tax-pair reveal">
          {TAXES.map((tax) => (
            <div key={tax.name} className="tax-cell">
              <p className="tax-cell__figure">{tax.figure}</p>
              <h3 className="tax-cell__name">{tax.name}</h3>
              <p className="micro tax-cell__authority">{tax.authority}</p>
              <p className="tax-cell__p">{tax.body}</p>
            </div>
          ))}
        </div>

        <p className="tax-note reveal">
          If you have only ever registered for one of the two, you are not unusual, and it is
          fixable. Say so in the form and we will check both in the quote. Rates current as of{' '}
          {RATES_AS_OF}.
        </p>
      </div>
    </div>
  </section>
);

export default TaxExplainer;
