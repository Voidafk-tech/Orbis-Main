/**
 * Single source of truth for the site's copy and figures.
 *
 * Anything a non-developer is likely to want changed lives here: prices, the
 * tax-rate date stamp, FAQ answers, form options. Keep the FAQ list in sync
 * with the FAQPage JSON-LD in index.html.
 */

export const CONTACT = {
  email: 'info@orbisaccounting.ca',
  phone: '604-203-7799',
  phoneHref: 'tel:+16042037799',
  locality: 'West Vancouver, BC',
  tagline: 'Bookkeeping for BC small business · West Vancouver, BC',
} as const;

/** Date stamp on the published GST/PST rates. Review on a set cadence. */
export const RATES_AS_OF = 'July 2026';

export const TRUST_STRIP = [
  { label: 'Certified', lines: ['QuickBooks Online', 'Advanced ProAdvisor'] },
  { label: 'Based in', lines: ['West Vancouver, BC', 'Serving all of BC'] },
  { label: 'Sales tax', lines: ['GST and PST', 'both filed'] },
  // Legally load-bearing: engagements are contract based, never "no contract".
  { label: 'Terms', lines: ['Contract based', 'term set per client'] },
] as const;

export const PAINS = [
  {
    n: '01',
    h: 'Receipts everywhere',
    p: 'Shoeboxes, inbox attachments, and a spreadsheet you stopped updating in March.',
  },
  {
    n: '02',
    h: 'Two sales taxes',
    p: 'GST to the CRA, PST to the BC Ministry of Finance. Two registrations, two deadlines, two sets of rules.',
  },
  {
    n: '03',
    h: 'Evenings gone',
    p: 'Ten hours a month on categorization instead of on the work that actually pays.',
  },
  {
    n: '04',
    h: 'No clear picture',
    p: 'You know what is in the bank. You do not know what your margin is.',
  },
] as const;

export const DIFFERENTIATORS = [
  {
    h: 'QuickBooks Online, Xero or Sage 50',
    p: 'We work in all three and connect Shopify and Stripe into whichever one you use. If you are on spreadsheets, we migrate you.',
  },
  {
    h: 'Built for BC, not for Canada in general',
    p: 'GST and PST both filed. WorkSafeBC and CRA deadlines tracked so you are not the one remembering them.',
  },
  {
    h: 'One person does your books every month',
    p: 'You are not re-explaining your business to a new name each quarter. Nothing gets re-learned.',
  },
  {
    h: 'Fixed monthly price, no hourly billing',
    p: 'You know the number before you start. A messy month does not turn into a surprise invoice.',
  },
] as const;

export const SERVICES = [
  {
    n: '01',
    h: 'Monthly bookkeeping',
    p: 'Bank and credit card reconciliation, every transaction categorized, books closed each month.',
  },
  {
    n: '02',
    h: 'GST and PST filing',
    p: 'Both returns prepared and filed on schedule. GST to the CRA, PST to the province.',
  },
  {
    n: '03',
    h: 'Payroll and T4s',
    p: 'Staff paid on time, source deductions remitted, T4s and ROEs handled at year end.',
  },
  {
    n: '04',
    h: 'Financial reporting',
    p: 'A profit and loss and a balance sheet each month, in plain language, with the numbers that matter marked.',
  },
  {
    n: '05',
    h: 'Software setup and migration',
    p: 'QuickBooks Online, Xero or Sage 50. Chart of accounts, bank feeds, Shopify and Stripe connected, one training session with you.',
  },
  {
    n: '06',
    h: 'Catch-up bookkeeping',
    p: 'Months or years behind is the most common reason people call. We clear the backlog first, then start monthly.',
    tag: 'Most common',
  },
] as const;

/**
 * Platform marquee. Heights are individually tuned for optical balance —
 * they are not meant to be normalized to one value.
 */
export const PLATFORMS = [
  { src: '/logos/logo-quickbooks.png', alt: 'QuickBooks', height: 30 },
  { src: '/logos/logo-xero.png', alt: 'Xero', height: 33 },
  { src: '/logos/logo-sage50.png', alt: 'Sage 50', height: 27 },
  { src: '/logos/logo-shopify.png', alt: 'Shopify', height: 25 },
  { src: '/logos/logo-stripe.png', alt: 'Stripe', height: 23 },
] as const;

export const STEPS = [
  {
    n: '1',
    h: 'Tell us about your business',
    p: 'Fill out the form at the bottom of this page. Ten short questions, about three minutes.',
  },
  {
    n: '2',
    h: 'Get a plan and a quote',
    p: 'Within one business day you get a written scope and a fixed monthly price. In writing, so you can compare it to anyone else.',
  },
  {
    n: '3',
    h: 'We take it from here',
    p: 'We connect to your accounting software, clear any backlog, and close your books every month from then on.',
  },
] as const;

export interface Tier {
  name: string;
  audience: string;
  price: string;
  cap: string;
  featured?: boolean;
  features: { text: string; included: boolean }[];
}

export const TIERS: Tier[] = [
  {
    name: 'Foundation',
    audience: 'Sole proprietors with simple books',
    price: '$299',
    cap: 'Up to 50 transactions a month',
    features: [
      { text: 'Bank and credit card reconciliation', included: true },
      { text: 'Transaction categorization', included: true },
      { text: 'Monthly profit and loss, balance sheet', included: true },
      { text: 'GST and PST filing', included: false },
      { text: 'Payroll and T4s', included: false },
    ],
  },
  {
    name: 'Standard',
    audience: 'Established small businesses',
    price: '$499',
    cap: 'Up to 150 transactions a month',
    featured: true,
    features: [
      { text: 'Everything in Foundation', included: true },
      { text: 'GST filing to the CRA', included: true },
      { text: 'PST filing to the BC Ministry of Finance', included: true },
      { text: 'Sales channels reconciled: Shopify, Stripe', included: true },
      { text: 'Payroll and T4s', included: false },
    ],
  },
  {
    name: 'Complete',
    audience: 'Businesses with staff on payroll',
    price: '$899',
    cap: 'Up to 400 transactions a month',
    features: [
      { text: 'Everything in Standard', included: true },
      { text: 'Payroll, source deductions, T4s and ROEs', included: true },
      { text: 'Accounts payable managed', included: true },
      { text: 'WorkSafeBC reporting', included: true },
      { text: 'Quarterly review call', included: true },
    ],
  },
];

export const INDUSTRIES_SERVED = [
  'Construction and trades',
  'Restaurants and food service',
  'Retail and e-commerce',
  'Professional services',
  'Health and wellness',
  'Import and distribution',
] as const;

/** Keep in sync with the FAQPage JSON-LD block in index.html. */
export const FAQS = [
  {
    q: 'How much does a bookkeeper cost in Vancouver?',
    a: 'Local firms billing hourly are usually $75 to $150 an hour, which lands most small businesses between $600 and $2,000 in a typical month. Flat monthly plans in this market run roughly $300 to $2,000 depending on volume. Ours are $299, $499 and $899, fixed, with no hourly billing.',
  },
  {
    q: 'What is the difference between a bookkeeper and an accountant, and which do I need?',
    a: 'A bookkeeper handles the day to day: receipts, categorization, reconciliation, payroll, GST and PST remittances, and your monthly reports. An accountant steps in for corporate tax returns and higher level planning. Most BC small businesses work with a bookkeeper all year and bring in an accountant at year end. We hand your accountant a clean, closed set of books, which makes their bill smaller.',
  },
  {
    q: 'Do I have to register for PST in BC?',
    a: 'It depends on what you sell, not just on how much. Most businesses selling goods in BC need to register. Many service businesses do not. Because PST is separate from GST, plenty of owners register for one and not the other without realising. Tell us what you sell and we will confirm both in your quote.',
  },
  {
    q: 'What if my books are a year behind?',
    a: 'That is the most common reason people get in touch. We look at how far behind you are and quote the catch-up as one number before starting. We clear it, file whatever is outstanding, then start the monthly plan from a clean position. You are not the first and there is no lecture.',
  },
  {
    q: 'Do you work with businesses outside West Vancouver?',
    a: 'Yes. We are based in West Vancouver and work with businesses across British Columbia. Everything is done online, so there is nothing to drop off and no office visit required.',
  },
  {
    q: 'Do I need to use QuickBooks Online?',
    a: 'No. We work in QuickBooks Online, Xero and Sage 50, so you can stay on whichever one you already use. If you are on Wave, spreadsheets or nothing at all, we will recommend one and the migration is part of setup. Shopify and Stripe connect to all three, so your sales reconcile automatically.',
  },
  {
    q: 'How do I switch from my current bookkeeper?',
    a: 'You give us access to your accounting file and we take it from the next month. You do not need to have an awkward conversation first, and you do not need to move anything yourself. If the handover reveals problems in the existing books, we will tell you what we found before doing extra work.',
  },
] as const;

/** Intake form dropdowns. The label is what gets emailed with the submission. */
export const FORM_SELECTS = [
  {
    name: 'structure',
    label: 'Business structure',
    options: ['Sole proprietor', 'Incorporated', 'Partnership', 'Not sure'],
  },
  {
    name: 'volume',
    label: 'Transactions a month',
    options: ['Under 50', '50 to 150', '150 to 400', 'Over 400', 'Not sure'],
  },
  { name: 'gst', label: 'Registered for GST', options: ['Yes', 'No', 'Not sure'] },
  { name: 'pst', label: 'Registered for PST', options: ['Yes', 'No', 'Not sure'] },
  {
    name: 'software',
    label: 'Software you use now',
    options: ['QuickBooks Online', 'Xero', 'Sage 50', 'Wave', 'Spreadsheets', 'Nothing yet'],
  },
  {
    name: 'behind',
    label: 'How current are the books',
    options: [
      'Up to date',
      '1 to 3 months behind',
      '3 to 12 months behind',
      'Over a year behind',
    ],
  },
  {
    name: 'industry',
    label: 'Industry',
    fullWidth: true,
    // Deliberately wider than the "who we work with" list on the page.
    options: [
      'Construction and trades',
      'Restaurants and food service',
      'Retail and e-commerce',
      'Professional services',
      'Health and wellness',
      'Real estate',
      'Import and distribution',
      'Other',
    ],
  },
] as const;
