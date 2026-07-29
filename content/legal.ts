/**
 * Legal page copy. Carried over from the previous site — the client should
 * review both pages, and the privacy policy in particular, since the intake
 * form makes a data-use claim that this page has to back up.
 */

export interface LegalPage {
  title: string;
  lastUpdated: string;
  sections: { h: string; p: string }[];
  note: string;
}

export const PRIVACY: LegalPage = {
  title: 'Privacy Policy',
  lastUpdated: 'Last updated: July 2026',
  sections: [
    {
      h: 'Information collection',
      p: 'We collect information necessary to provide accounting services, including financial data and business contact details.',
    },
    {
      h: 'Enquiries through this website',
      p: 'What you send through the form on this site is used to write your quote and to reply to you. It is not added to a mailing list and it is not sold or shared for marketing.',
    },
    {
      // Accurate only while MEASUREMENT_ID in components/analytics.ts is set.
      // The two are meant to be switched on and off together.
      h: 'Website analytics',
      p: 'We use Google Analytics to see which pages people visit and which of them lead to an enquiry, so we know what is worth keeping on the site. It records pages viewed, whether the enquiry form was submitted, and whether the phone or email link was tapped, along with the general information a browser sends such as approximate location, device type and referring site. It is not used to identify you personally, and what you type into the enquiry form is never sent to it. If you would rather not be counted, any browser-level tracking blocker will stop it.',
    },
    {
      h: 'Data protection',
      p: 'Your data is secured using industry-standard encryption and stored in compliant cloud environments like Sage and QuickBooks Online.',
    },
    {
      h: 'Information sharing',
      p: 'We do not sell your data. Information is only shared with government bodies as required for compliance.',
    },
  ],
  note: 'For privacy enquiries, contact privacy@orbisaccounting.ca',
};

export const TERMS: LegalPage = {
  title: 'Terms of Service',
  lastUpdated: 'Last updated: January 2024',
  sections: [
    {
      h: 'Service agreement',
      p: 'By engaging Orbis Accounting, you agree to provide accurate financial records for timely processing. Engagements are contract based, with the term set per client.',
    },
    {
      h: 'Payment terms',
      p: 'Monthly fees are billed at the start of the service period. Project-based fees require a 50% deposit.',
    },
    {
      h: 'Liability',
      p: 'While we ensure maximum accuracy, clients are responsible for the final verification of all filed documents.',
    },
  ],
  note: 'Use of our services constitutes acceptance of these terms.',
};
