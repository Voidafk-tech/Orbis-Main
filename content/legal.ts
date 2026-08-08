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
  lastUpdated: 'Last updated: August 2026',
  sections: [
    {
      h: 'Information collection',
      p: 'We collect information necessary to provide accounting services, including financial data and business contact details.',
    },
    {
      // Naming Web3Forms is not optional politeness. The form claims on the page
      // that what you send is used to write your quote and nothing else, and
      // that claim is only true if the service carrying the message is
      // accounted for. See components/IntakeForm.tsx.
      h: 'Enquiries through this website',
      p: 'What you send through the form on this site is used to write your quote and to reply to you. It is not added to a mailing list and it is not sold or shared for marketing. The form itself is delivered to our inbox by Web3Forms, a form-delivery service, which handles the message while it is in transit. Their servers are outside Canada, so what you send crosses a border on the way to us. If you would rather it did not, email or phone us instead — both are on the contact page.',
    },
    {
      // Accurate only while MEASUREMENT_ID in components/analytics.ts is set.
      // The two are meant to be switched on and off together.
      //
      // The four dropdown answers named below are the exact params passed to
      // the `generate_lead` event in components/IntakeForm.tsx. This paragraph
      // used to end "what you type into the enquiry form is never sent to it",
      // which was true of the typed fields and false of the page as a whole:
      // volume, software, behind and industry were already going to Google
      // when it was written. Adding a param there means amending this list —
      // the distinction the sentence now draws is between what you *type* and
      // what you *pick*, and it only holds while that stays true.
      h: 'Website analytics',
      p: 'We use Google Analytics to see which pages people visit and which of them lead to an enquiry, so we know what is worth keeping on the site. It records pages viewed, whether the enquiry form was submitted, and whether the phone, email or WeChat details were used, along with the general information a browser sends such as approximate location, device type and referring site. When the form is submitted it also records four of the answers you picked from its dropdown lists — roughly how many transactions a month, what software you use now, how current the books are, and your industry — so we can see which kinds of enquiry the site actually brings in. Nothing you type is sent: not your name, your business name, your email, your phone number, nor anything you wrote in your own words. That information goes to Google and is held on their servers, which are outside Canada. It is not used to identify you personally. If you would rather not be counted, any browser-level tracking blocker will stop it.',
    },
    {
      h: 'Data protection',
      p: 'Your data is secured using industry-standard encryption and stored in compliant cloud environments like Sage and QuickBooks Online.',
    },
    {
      // This section used to say information was "only shared with government
      // bodies as required for compliance", which the site itself contradicted:
      // every enquiry passes through Web3Forms and every page view reaches
      // Google. A policy that describes something other than what the software
      // does is worse than a thin one, because it is relied on.
      h: 'Information sharing',
      p: 'We do not sell your data, and we do not share it for marketing. It reaches three kinds of third party and no others: the service providers that run this website and our bookkeeping software, named above and in your engagement letter; the government bodies we file to on your behalf, such as the CRA and the BC Ministry of Finance; and anyone we are required by law to disclose to. Several of those providers operate outside Canada, which means information held with them can be subject to the laws of the country it sits in.',
    },
    {
      // Both figures confirmed by the practice. Twelve months is their own
      // answer for unconverted enquiries and can be changed if the working
      // practice changes. The six years is not ours to set: it is the CRA's
      // retention requirement, so it can be lengthened but never shortened.
      h: 'How long we keep it',
      p: 'An enquiry that does not turn into an engagement is kept for twelve months and then deleted. Records belonging to clients are kept for at least six years after the tax year they relate to, because the CRA requires it.',
    },
    {
      h: 'Seeing or correcting what we hold',
      p: 'You can ask what personal information we hold about you, ask for a copy of it, and ask us to correct anything that is wrong. Write to info@orbisaccounting.ca and we will answer within thirty days. If you are not satisfied with how we have handled a privacy question, you can take it to the Office of the Privacy Commissioner of Canada.',
    },
  ],
  // The practice inbox, deliberately, rather than a privacy@ alias. An alias
  // nobody monitors is worse than none here: it looks like a route for access
  // requests while quietly dropping everyone who uses it.
  note: 'For privacy enquiries, contact info@orbisaccounting.ca',
};

export const TERMS: LegalPage = {
  title: 'Terms of Service',
  /**
   * Deliberately still January 2024, two and a half years behind the privacy
   * policy beside it. That gap looks like neglect and was very nearly "fixed"
   * by restamping — but this text has not been reviewed since, and a date is a
   * claim about when someone last read the document. Moving it forward without
   * that having happened would turn an honestly stale page into a page that
   * lies about being current, which is the worse of the two.
   *
   * The fix is a review, not an edit here: have these three clauses read
   * against how the practice actually engages clients now, then restamp.
   */
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
