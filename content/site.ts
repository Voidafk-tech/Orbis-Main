/**
 * Single source of truth for the site's copy and figures.
 *
 * Anything a non-developer is likely to want changed lives here: the plans, the
 * tax-rate date stamp, FAQ answers, form options. The JSON-LD is generated from
 * this file at build time, so editing here updates the structured data too.
 *
 * No plan figures are published on the site. Every number reaches the client in
 * the written quote instead, so nothing here should carry a monthly amount.
 */

export const CONTACT = {
  email: 'info@orbisaccounting.ca',
  /**
   * Hyphens, no parentheses, no spaces. This is the canonical NAP string, and it
   * has to be character-identical to the Google Business Profile and to every
   * directory listing — a phone written two ways is two citations as far as
   * local search is concerned, and the signal splits between them. Directories
   * that reformat it themselves are fine; what cannot happen is a second variant
   * being typed anywhere. Rendered in the header, footer, intake block and
   * contact page, and emitted as `telephone` in the JSON-LD, all from here.
   */
  phone: '604-203-7799',
  phoneHref: 'tel:+16042037799',
  locality: 'West Vancouver, BC',
  tagline: 'Bookkeeping for BC small business · West Vancouver, BC',
} as const;

/**
 * WeChat, for the Chinese-speaking half of the audience — the channel they
 * actually use, where the rest of the site offers only email and a phone number.
 *
 * The ID is the durable part and the QR is the convenience, which is why the
 * block leads with the ID. A published QR image can go dead silently: resetting
 * a personal code in WeChat invalidates every copy of it already in the world,
 * and nothing tells the site. The ID survives that on its own.
 *
 * To replace the code: in WeChat, Me → the QR icon beside the name → ⋯ → save
 * the image, then overwrite `public/wechat-qr.png`. It has to carry its own
 * white field, quiet zone included — the page background is near-black and a
 * transparent PNG will not scan. Until the file is in place the block renders
 * the name and ID with a neutral placeholder in the QR's box rather than a
 * broken image, the same arrangement as CERTIFICATION_BADGES below.
 *
 * `account` and `id` are handles, not copy: they are identical in both
 * languages and the casing on the ID is significant.
 */
export const WECHAT = {
  account: 'Tina - Orbis',
  id: 'Online_Bookkeeper',
  src: '/wechat-qr.png',
  alt: 'WeChat QR code for Tina - Orbis, Weixin ID Online_Bookkeeper',
} as const;

/**
 * The two sales-tax rates, as numbers, and the only place either is written
 * down. The explainer's "5%" and "7%" figures and every number the calculator
 * produces are derived from these, so a rate change is one edit and cannot
 * leave a stale figure somewhere the reader still sees it.
 *
 * Numbers rather than strings for the same reason: a display string cannot be
 * multiplied, so storing "7%" would mean a second, computable copy existing
 * somewhere — which is the drift this exists to prevent. Rates are not copy and
 * are not translated; content/zh/ui.ts renders these same values.
 *
 * Change them only against the published rate, and move RATES_AS_OF with them.
 */
export const TAX_RATES = { gst: 0.05, pst: 0.07 } as const;

/** GST and PST together — the combined figure competing pages lead with. */
export const COMBINED_TAX_RATE = TAX_RATES.gst + TAX_RATES.pst;

/**
 * A rate as a reader sees it: 0.05 becomes "5%". Rounded before formatting
 * because 0.05 + 0.07 is 0.12000000000000001 in binary floating point, which
 * would otherwise render as "12.000000000000002%".
 */
export const percent = (rate: number): string => `${Number((rate * 100).toFixed(2))}%`;

/** Date stamp on the published GST/PST rates. Review on a set cadence. */
export const RATES_AS_OF = 'July 2026';

/**
 * Alt text for the link-preview card (public/og-card.png), read by screen
 * readers on the platforms that surface it and by anything indexing the image.
 *
 * Here rather than in index.html because the card is shared by both languages
 * and the English string was being served on all nine /zh/ URLs. Emitted as
 * `og:image:alt` per route by scripts/prerender.mjs.
 */
export const OG_IMAGE_ALT =
  'Orbis Accounting — bookkeeping for BC small business, West Vancouver';

/**
 * Issued certification marks, in `public/`, rendered as a row in the Trust
 * section. Certification marks carry usage rules, so each of these must be the
 * file the issuer supplied — never a redrawn copy, and never a product logo
 * standing in for a certification the artwork does not actually assert.
 *
 * The list is the whole reason this is an array: Xero and Sage certifications
 * are held (see CREDENTIALS in content/business.ts, which is what feeds the
 * `hasCredential` JSON-LD) but the issued artwork is not in the repo yet.
 * Adding them later is a matter of dropping the files into `public/` and adding
 * two entries here and in content/zh/site.ts — no component change. Do not add
 * an entry before its file exists: an entry with no artwork renders as an empty
 * slot, and an unfinished-looking row is worse than a short one.
 */
export const CERTIFICATION_BADGES = [
  {
    src: '/badge-quickbooks-advanced-proadvisor.png',
    alt: 'Intuit QuickBooks Certified Advanced QuickBooks Online ProAdvisor',
  },
] as const;

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
    p: 'Ten hours a month sorting transactions instead of doing the work that pays.',
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
    p: 'We work in all three, and we connect Shopify and Stripe to whichever one you use. If you are on spreadsheets, we move you across.',
  },
  {
    h: 'Built for BC, not for Canada in general',
    p: 'We file both GST and PST. We track the WorkSafeBC and CRA deadlines so you do not have to.',
  },
  {
    h: 'One person does your books every month',
    p: 'You explain your business once. Nobody hands it to a new person next quarter.',
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
    p: 'A profit and loss and a balance sheet every month, with the numbers that moved marked for you.',
  },
  {
    n: '05',
    h: 'Software setup and migration',
    p: 'QuickBooks Online, Xero or Sage 50. Chart of accounts, Shopify and Stripe connected, one training session with you.',
  },
  {
    n: '06',
    h: 'Catch-up bookkeeping',
    p: 'Being months or years behind is the most common reason people call. We clear the backlog, then start monthly.',
    tag: 'Most common',
  },
  {
    n: '07',
    h: 'T1 personal returns',
    p: 'Personal income tax for sole proprietors and the self-employed, prepared from the books we keep all year.',
  },
  {
    n: '08',
    h: 'T2 corporate returns',
    p: 'Corporate income tax for CCPCs, filed from books we closed month by month as the year went.',
  },
] as const;

/**
 * Platform marquee. Heights are individually tuned for optical balance —
 * they are not meant to be normalized to one value.
 *
 * `width` is the rendered height scaled by each file's real aspect ratio. It is
 * there to reserve the space before the image loads: these are lazy-loaded, and
 * without a width they occupy nothing and then shove the row sideways on load.
 * Recalculate it if a logo file is replaced.
 */
export const PLATFORMS = [
  { src: '/logos/logo-quickbooks.png', alt: 'QuickBooks', height: 30, width: 137 },
  { src: '/logos/logo-xero.png', alt: 'Xero', height: 33, width: 33 },
  { src: '/logos/logo-sage50.png', alt: 'Sage 50', height: 27, width: 77 },
  { src: '/logos/logo-shopify.png', alt: 'Shopify', height: 25, width: 87 },
  { src: '/logos/logo-stripe.png', alt: 'Stripe', height: 23, width: 55 },
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
    p: 'Within one business day you get a written scope and a fixed monthly price you can compare against anyone else.',
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
  cap: string;
  featured?: boolean;
  features: { text: string; included: boolean }[];
}

export const TIERS: Tier[] = [
  {
    name: 'Foundation',
    audience: 'Sole proprietors with simple books',
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

/** Also the source of the FAQPage JSON-LD, built in scripts/prerender.mjs. */
export const FAQS = [
  {
    q: 'How much does a bookkeeper cost in Vancouver?',
    a: 'Local firms billing hourly charge $75 to $150 an hour, which puts most small businesses between $600 and $2,000 in a typical month. Flat monthly plans here run roughly $300 to $2,000 depending on volume. We charge a fixed monthly fee, not an hourly rate. Tell us your transaction volume and what you need filed, and we will send your number in writing within one business day.',
  },
  {
    q: 'What is the difference between a bookkeeper and an accountant, and which do I need?',
    // The monthly work and the year-end return are two different jobs, and this
    // answer describes both because the practice does both. It used to hand the
    // year end to an outside accountant, which understated the service list.
    //
    // Describe the work, never the designation — this answer must not become a
    // discussion of who is entitled to sign what.
    //
    // SERVICES_BOUNDARY in content/pages.ts makes the same point at length on
    // /services and has to keep saying the same thing as this. Edit the two
    // together, in both languages.
    a: 'They are two different jobs, usually done at two different times of year. The monthly work is the day to day: receipts, categorization, reconciliation, payroll, GST and PST remittances, and your monthly reports. The year-end work is the income tax return. If you are unincorporated that means a T1 with a statement of business activities. If you are a corporation it means a T2 and its schedules. We do both, so your return comes from books we closed month by month as the year went. If someone else already does your year end, we can handle the monthly work alone and hand them a clean, closed set of books.',
  },
  {
    q: 'Do I have to register for PST in BC?',
    a: 'It depends on what you sell, not just how much. Most businesses selling goods in BC need to register. Many service businesses do not. PST is separate from GST, so plenty of owners register for one and never realise they missed the other. Tell us what you sell and we will confirm both in your quote.',
  },
  {
    q: 'What if my books are a year behind?',
    a: 'That is the most common reason people get in touch. We look at how far behind you are and quote the whole catch-up as one number before we start. We clear it, file whatever is outstanding, then begin the monthly plan from a clean set of books. You are not the first, and we will not lecture you about it.',
  },
  {
    q: 'Do you work with businesses outside West Vancouver?',
    a: 'Yes. We are based in West Vancouver and work with businesses across British Columbia. Everything happens online, so there is nothing to drop off and no office to visit.',
  },
  {
    q: 'Do I need to use QuickBooks Online?',
    a: 'No. We work in QuickBooks Online, Xero and Sage 50, so you can stay on whichever one you already use. If you are on Wave, spreadsheets or nothing at all, we will recommend one and move you across as part of setup. Shopify and Stripe connect to all three, so your sales reconcile automatically.',
  },
  {
    q: 'How do I switch from my current bookkeeper?',
    a: 'You give us access to your accounting file and we take over from the next month. There is no awkward conversation to have first and nothing for you to move. If we find problems in the existing books during handover, we will tell you what we found before doing any extra work.',
  },
] as const;

/**
 * Intake form dropdowns.
 *
 * `value` is what gets emailed to the practice; `label` is what the visitor
 * reads. They are identical in English and diverge in Chinese, so an enquiry
 * from a Chinese-language visitor still arrives in a readable form.
 */
export const FORM_SELECTS = [
  {
    name: 'structure',
    label: 'Business structure',
    options: [
      { value: 'Sole proprietor', label: 'Sole proprietor' },
      { value: 'Incorporated', label: 'Incorporated' },
      { value: 'Partnership', label: 'Partnership' },
      { value: 'Not sure', label: 'Not sure' },
    ],
  },
  {
    name: 'volume',
    label: 'Transactions a month',
    options: [
      { value: 'Under 50', label: 'Under 50' },
      { value: '50 to 150', label: '50 to 150' },
      { value: '150 to 400', label: '150 to 400' },
      { value: 'Over 400', label: 'Over 400' },
      { value: 'Not sure', label: 'Not sure' },
    ],
  },
  {
    name: 'gst',
    label: 'Registered for GST',
    options: [
      { value: 'Yes', label: 'Yes' },
      { value: 'No', label: 'No' },
      { value: 'Not sure', label: 'Not sure' },
    ],
  },
  {
    name: 'pst',
    label: 'Registered for PST',
    options: [
      { value: 'Yes', label: 'Yes' },
      { value: 'No', label: 'No' },
      { value: 'Not sure', label: 'Not sure' },
    ],
  },
  {
    name: 'software',
    label: 'Software you use now',
    options: [
      { value: 'QuickBooks Online', label: 'QuickBooks Online' },
      { value: 'Xero', label: 'Xero' },
      { value: 'Sage 50', label: 'Sage 50' },
      { value: 'Wave', label: 'Wave' },
      { value: 'Spreadsheets', label: 'Spreadsheets' },
      { value: 'Nothing yet', label: 'Nothing yet' },
    ],
  },
  {
    name: 'behind',
    label: 'How current are the books',
    options: [
      { value: 'Up to date', label: 'Up to date' },
      { value: '1 to 3 months behind', label: '1 to 3 months behind' },
      { value: '3 to 12 months behind', label: '3 to 12 months behind' },
      { value: 'Over a year behind', label: 'Over a year behind' },
    ],
  },
  {
    name: 'industry',
    label: 'Industry',
    fullWidth: true,
    // Deliberately wider than the "who we work with" list on the page.
    options: [
      { value: 'Construction and trades', label: 'Construction and trades' },
      { value: 'Restaurants and food service', label: 'Restaurants and food service' },
      { value: 'Retail and e-commerce', label: 'Retail and e-commerce' },
      { value: 'Professional services', label: 'Professional services' },
      { value: 'Health and wellness', label: 'Health and wellness' },
      { value: 'Real estate', label: 'Real estate' },
      { value: 'Import and distribution', label: 'Import and distribution' },
      { value: 'Other', label: 'Other' },
    ],
  },
] as const;
