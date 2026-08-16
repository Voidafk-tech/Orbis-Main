/**
 * Every string that used to sit inline in a component.
 *
 * It lives here for one reason: the site is bilingual, and copy embedded in
 * JSX cannot be translated without duplicating the component. Keeping the
 * markup in one place and the words in another means the Chinese pages are the
 * same components with a different bundle, so a layout fix lands in both
 * languages at once and the two cannot drift apart visually.
 *
 * The Chinese counterpart is content/zh/ui.ts, typed against this file.
 */
import { COMBINED_TAX_RATE, TAX_RATES, percent } from './site';

export const UI = {
  /**
   * Where the practice is, as shown to a reader — footer NAP block and the
   * contact page. Copy rather than a read of BUSINESS.addressLocality, because
   * this is the one NAP field that should be translated: on a Chinese page it
   * reads 西温哥华，卑诗省. The machine-readable form stays English in the JSON-LD,
   * which is what Google matches against the Business Profile, so translating
   * the visible string costs no NAP consistency.
   *
   * No street or postal code here by design — see content/business.ts.
   */
  locality: 'West Vancouver, BC',

  header: {
    backToTop: 'Orbis Accounting, back to top',
    /**
     * The root of the breadcrumb trail Google prints under a search result.
     * Not rendered anywhere on the page — the logo is the home link — but it is
     * read by scripts/prerender.mjs, which used to emit the literal 'Home' on
     * every page in every language.
     */
    home: 'Home',
    services: 'Services',
    plans: 'Plans',
    questions: 'Questions',
    ctaFull: 'Get a plan and a quote',
    ctaShort: 'Get a quote',
    // Below 480px the phone number collapses to an icon to fit the row. The
    // number is still announced — this labels the link so it does not read as
    // a bare image to a screen reader.
    call: 'Call',
  },

  footer: {
    services: 'Services',
    plans: 'Plans',
    remote: 'Remote',
    gstPst: 'GST & PST',
    pstRegistration: 'PST registration',
    /** Chinese only — the link renders only where the page exists. */
    vsTax: 'Bookkeeping vs tax filing',
    catchUp: 'Catch-up',
    questions: 'Questions',
    getQuote: 'Get a quote',
    privacy: 'Privacy',
    terms: 'Terms',
    serving: 'Serving all of British Columbia',
    copyright: '© 2026 Orbis Accounting',
  },

  /** Written in the language it switches *to*, so it reads as an offer. */
  languageToggle: {
    label: 'Language',
    toEnglish: 'English',
    toChinese: '中文',
  },

  hero: {
    /**
     * The third segment is the practice's main differentiator and used to be
     * absent from the first screen entirely — the only sign the site was
     * bilingual was the 中文 toggle in the header, which a visitor reading
     * English has no reason to look at.
     *
     * It sits in the eyebrow rather than the paragraph because Hero.tsx renders
     * the eyebrow as a span *inside* the h1, so this is the strongest on-page
     * signal available. Deliberately not the same string as CONTACT.tagline in
     * content/site.ts, which is the shorter form used away from the hero.
     */
    eyebrow:
      'Bookkeeping for Metro Vancouver small business · West Vancouver, BC · English and Mandarin',
    headline: 'Clean books,',
    headlineEm: 'filed on time.',
    sub: 'GST to the CRA, PST to the province, and monthly reports you can actually read. The same person does your books every month, so you are never re-explaining your business.',
    cta: 'Get a plan and a quote',
    reassure: 'A written plan and a price within one business day',
  },

  /**
   * The three acts the scroll sequence moves through before it reveals the
   * hero headline. They are narrative, not navigation — the same ground the
   * Pains, Why and Services sections cover, compressed to one line each so the
   * pile on screen has something to be about.
   */
  heroSequence: {
    /** The chevron is a link; this names it for keyboard and screen reader. */
    cue: 'See how it works',
    acts: [
      {
        eyebrow: 'Where it usually stands',
        headline: 'Two years of receipts',
        headlineEm: 'in a box.',
        p: 'The books are the one part of running a business that nobody set up for you.',
      },
      {
        eyebrow: 'Why Orbis',
        headline: 'One person does your books,',
        headlineEm: 'every month.',
        p: 'You are not re-explaining your business to a new name each quarter.',
      },
      {
        eyebrow: 'What we handle',
        headline: 'Every transaction',
        headlineEm: 'categorized.',
        p: 'Every account reconciled, and the month closed rather than left open indefinitely.',
      },
    ],
  },

  pains: {
    eyebrow: 'Where it usually stands',
    h2: 'Four things you are probably already living with.',
    lede: 'The books are the one part of running a business that nobody set up for you.',
  },

  why: {
    eyebrow: 'Why Orbis',
    h2: 'Narrow on purpose.',
  },

  services: {
    eyebrow: 'What we handle',
    h2: 'Six things, off your desk.',
    more: 'What each of these actually involves →',
    worksWith: 'Works with',
  },

  steps: {
    eyebrow: 'How it works',
    h2: 'Three steps, and no sales call.',
  },

  pricing: {
    eyebrow: 'Plans',
    h2: 'Scoped by how much work there is.',
    more: 'How the number is put together, and what the market charges →',
    mostChosen: 'Most chosen',
    cta: 'Get a plan and a quote',
    oneTimeLabel: 'One-time work',
    catchUpName: 'Catch-up bookkeeping',
    catchUpBody:
      '— Quoted after we see how far behind you are. One number, agreed before any work starts.',
    setupName: 'Software setup and migration',
    setupBody:
      '— Quoted once, on QuickBooks Online, Xero or Sage 50. Chart of accounts, bank feeds, integrations, and one training session.',
    catchUpLink: 'More on catch-up bookkeeping →',
    notSure: 'Not included: ',
  },

  tax: {
    eyebrow: 'In plain terms',
    h2: 'GST and PST are two different taxes.',
    noteBefore:
      'If you have only ever registered for one of the two, you are not unusual, and it is fixable. Say so in the form and we will check both in the quote. Rates current as of ',
    more: 'How GST and PST actually differ →',
    noteAfter: '.',
    taxes: [
      {
        figure: percent(TAX_RATES.gst),
        name: 'GST',
        authority: 'Goes to the CRA',
        body: 'Federal. You generally must register once you pass $30,000 in revenue over four quarters. You charge it on most sales and you claim back the GST you paid on business purchases.',
      },
      {
        figure: percent(TAX_RATES.pst),
        name: 'PST',
        authority: 'Goes to the province',
        body: 'Provincial, and separate. Different registration, different deadlines, and a different list of what is taxable. Many services are exempt while most goods are not. There is no input credit to claim back.',
      },
    ],
  },

  /**
   * The calculator on /gst-pst-bc. Every figure in here is derived from
   * TAX_RATES rather than typed, so the copy cannot state one rate while the
   * arithmetic uses another.
   *
   * `sub` is split around the combined figure so the component can emphasise it
   * without putting markup in a translatable string. That figure is the point of
   * the section: three of the pages outranking this one lead with the combined
   * rate in their title, and this page did not state it anywhere at all.
   */
  taxCalculator: {
    eyebrow: 'Work it out',
    h2: 'BC sales tax calculator',
    subBefore: `GST ${percent(TAX_RATES.gst)} plus PST ${percent(TAX_RATES.pst)} is `,
    subCombined: `${percent(COMBINED_TAX_RATE)} combined`,
    subAfter: ' on most goods in British Columbia.',
    modeLabel: 'Which way round',
    forwardTab: 'Add tax to a price',
    reverseTab: 'Back tax out of a total',
    forwardLabel: 'Amount before tax (CAD)',
    reverseLabel: 'Total including tax (CAD)',
    resultsLabel: 'Result',
    subtotal: 'Subtotal',
    gst: `GST (${percent(TAX_RATES.gst)})`,
    pst: `PST (${percent(TAX_RATES.pst)})`,
    total: 'Total',
    noteBefore:
      'Most goods carry both. Many services are exempt from PST while still attracting GST — ',
    noteLink: 'see what is and is not taxable',
    noteAfter: '. Rates current as of ',
    noteEnd: '.',
    noscript:
      'The calculator needs JavaScript. The figures above are worked out on a $100 purchase, and the arithmetic is the rate times the amount.',
  },

  trust: {
    certEyebrow: 'Certification',
    certP: 'QuickBooks Online Advanced ProAdvisor — the level above the standard certification — plus Intuit payroll certification. Certified in Xero and Sage 50 as well, not just working in them.',
    badgePlaceholder: 'QuickBooks Advanced ProAdvisor badge to be supplied',
    whoEyebrow: 'Who we work with',
    commitEyebrow: 'What we commit to',
    commitment: 'Every enquiry gets a written plan and a price within one business day.',
  },

  faq: {
    eyebrow: 'Questions',
    h2: 'The ones people actually ask.',
    intro: 'If yours is not here, put it in the form and we will answer it in the reply.',
  },

  intake: {
    eyebrow: 'Get a plan and a quote',
    headline: 'Tell us where things',
    headlineSecond: 'actually stand.',
    p: 'About three minutes. No sales call, and nothing gets set up until you say yes.',
    emailLabel: 'Or email us directly',
    phoneLabel: 'Phone',
  },

  /**
   * The WeChat block, used in the intake contact strip and on the contact page.
   *
   * `idLabel` says "Weixin ID" rather than "WeChat ID" on purpose: that is the
   * wording inside the app in both languages, and it is the string someone
   * hunting for the field will recognise.
   *
   * The account name and the ID itself are not here — they are handles rather
   * than copy and live in content/site.ts, identical in both languages.
   */
  wechat: {
    label: 'WeChat',
    idLabel: 'Weixin ID',
    /** Sits under the code. Only makes sense to someone on a second device. */
    scan: 'Scan to add us on WeChat',
    copy: 'Copy',
    copied: 'Copied',
    /** Built into an aria-label with the ID appended, for the copy button. */
    copyAria: 'Copy the Weixin ID',
    // No string for a missing code. There was one, and it shipped: visitors
    // read "WeChat QR code to be supplied" on the live site. When the file is
    // absent the component drops the whole column instead — see
    // components/WeChatContact.tsx.
  },

  form: {
    detailsLegend: 'Your details',
    booksLegend: 'Your books',
    wordsLegend: 'In your words',
    name: 'Full name',
    namePlaceholder: 'Jordan Reyes',
    email: 'Email',
    emailPlaceholder: 'you@company.ca',
    business: 'Business name',
    businessPlaceholder: 'Reyes Contracting Ltd.',
    phone: 'Phone',
    phoneOptional: 'optional',
    phonePlaceholder: '604-555-0134',
    notes: 'What is the main thing you need help with right now',
    notesPlaceholder: 'Two years of receipts in a box and a GST return I have not filed.',
    submit: 'Send my details',
    sending: 'Sending…',
    note: 'We reply within one business day. Your details are used to write your quote and nothing else. No newsletter, no mailing list.',
    errorName: 'We need a name to address the reply to.',
    errorBusiness: 'What is the business called? It goes on the quote.',
    errorEmail: 'That email address does not look right. Check for a typo?',
    errorSendBefore: 'That did not send. Try again, or email ',
    errorSendAfter: ' directly.',
    sentH: 'Got it.',
    sentPBefore:
      'You will hear back within one business day with a written plan and a fixed monthly price. It comes from ',
    sentPAfter: ', so add that address if your inbox is strict.',
    sentAgain: 'Send another',
  },

  servicesPage: {
    eyebrow: 'What we handle',
    headline: 'Bookkeeping services',
    headlineEm: 'for BC small business.',
    sub: 'Six things, off your desk. Monthly bookkeeping, GST and PST filing, payroll and T4s, reporting, software setup and catch-up work — all of it done from West Vancouver, for businesses anywhere in British Columbia.',
    boundaryEyebrow: 'The boundary',
    worksWith: 'Works with',
    platformsNoteA:
      'We work in QuickBooks Online, Xero and Sage 50, so you can stay on whichever one you already use. Shopify and Stripe connect to all three, and ',
    platformsLinkRemote: 'all of it is done remotely',
    platformsNoteB: ' — there is nothing to drop off. ',
    platformsLinkPricing: 'See how the plans are scoped',
    platformsNoteC: ', or ',
    platformsLinkQuestions: 'read the questions people actually ask',
    platformsNoteD: '.',
  },

  pricingPage: {
    eyebrow: 'Plans and pricing for BC small business',
    headline: 'What bookkeeping',
    headlineEm: 'actually costs.',
    sub: 'We work on a fixed monthly plan sized to your transaction volume, not an hourly rate. Here is how the number is put together, what moves it, and what the rest of the market charges.',
    howEyebrow: 'How it works',
    howH2: 'Four things that are always true.',
    marketEyebrow: 'What the market charges',
    marketH2: 'The honest answer to what this costs.',
    factorsEyebrow: 'What moves the number',
    factorsH2: 'Five things we look at.',
    plansEyebrow: 'The plans',
    plansH2: 'Scoped by how much work there is.',
    plansLede:
      'Three plans, sized to your transaction volume. If you are not sure which one you are, guess low and we will tell you in the quote.',
    setupBody: '— Quoted once, on QuickBooks Online, Xero or Sage 50. ',
    setupLink: 'See what setup covers',
    setupAfter: '.',
  },

  remotePage: {
    eyebrow: 'Remote and virtual bookkeeping',
    headline: 'Remote bookkeeping,',
    headlineEm: 'anywhere in BC.',
    sub: 'Nothing to drop off, no office visit, no envelope of receipts sitting in the truck. Your books are done online by the same person every month — whether you are two blocks away in West Vancouver or six hours up the highway.',
    howEyebrow: 'How it actually works',
    howH2: 'Four things that make the drop-off unnecessary.',
    howLede:
      '“Remote” is not a compromise arrangement bolted onto an in-person process. Almost every part of modern bookkeeping already happens online.',
    monthEyebrow: 'What a month looks like',
    monthH2: 'Nothing piles up.',
    tradeoffEyebrow: 'Remote or local',
    tradeoffH2: 'What you gain, and what you give up.',
    areasEyebrow: 'Where this works',
    areasH2: 'All of British Columbia, at the same price.',
    /* Named cities, deliberately. The page was chasing national terms —
       "online bookkeeping services canada" is 20 searches a month at difficulty
       43 — while "bookkeeper vancouver" is 480 a month at difficulty 3. Naming
       the places the work actually happens is the cheapest way to point the
       page at the province instead of the country. */
    areasLede:
      'Because nothing depends on being nearby, where your business sits does not change the scope or the number. We work with businesses in Vancouver, Surrey, Burnaby and Richmond, out to Victoria and Kelowna, and well beyond the highway — the Interior, the Island and the north included. We are based in West Vancouver, and for a remote engagement that is a fact about us rather than a constraint on you.',
    faqEyebrow: 'Questions',
    faqH2: 'The ones remote raises.',
    faqIntroA: 'The rest are on the ',
    faqIntroLink: 'main page',
    faqIntroB: ', or put yours in the form and we will answer it in the reply.',
    ctaH2: 'Tell us where things stand.',
    ctaP: 'Ten short questions, about three minutes. You get a written scope and a fixed monthly price within one business day — no sales call, and nothing gets set up until you say yes.',
    ctaLinkServices: 'What we handle',
    ctaLinkPricing: 'How the plans are scoped',
  },

  contactPage: {
    stepsEyebrow: 'What happens next',
    stepsH2: 'Three steps, and no sales call.',
    expectEyebrow: 'What to expect',
    expectH2: 'A written reply, not a calendar invite.',
    reachEyebrow: 'Reach us directly',
    emailLabel: 'Email',
    phoneLabel: 'Phone',
    hoursEyebrow: 'Hours',
    hours:
      'Monday to Friday, 9am to 5pm Pacific. Enquiries sent outside those hours are answered on the next business day.',
    whereEyebrow: 'Where we work',
    whereP:
      'We work with businesses across British Columbia and everything is done online — there is nothing to drop off and no office visit required.',
    linkServices: 'What we handle',
    linkPricing: 'How the plans are scoped',
  },

  notFound: {
    eyebrow: '404',
    headline: 'That page',
    headlineEm: 'is not here.',
    sub: 'The link may be out of date, or the page may have moved. Everything the site has is one of these.',
    home: 'Home',
    services: 'Bookkeeping services',
    pricing: 'Plans and pricing',
    contact: 'Get a plan and a quote',
  },

  gstPstPage: {
    eyebrow: 'GST and PST in British Columbia',
    headline: 'Two taxes,',
    headlineEm: 'two sets of rules.',
    sub: 'GST goes to the CRA. PST goes to the province. They register separately, file separately and disagree about what is taxable — and being signed up for one tells you nothing about whether you should be signed up for the other.',
    ratesEyebrow: 'The rates',
    comparisonEyebrow: 'Side by side',
    comparisonH2: 'Where the two actually differ.',
    gstLabel: 'GST',
    pstLabel: 'PST',
    mistakesEyebrow: 'What goes wrong',
    mistakesH2: 'Four ways this catches people out.',
    exemptEyebrow: 'What is taxable',
    exemptH2: 'What carries PST, and what does not.',
    registrationEyebrow: 'Registering',
    fin400Eyebrow: 'The return',
    deadlinesEyebrow: 'Deadlines',
    deadlinesH2: 'How often you file, and by when.',
    /* Column labels for the deadlines table, which reuses the comparison
       table's markup — hence the same two-column shape as gstLabel/pstLabel. */
    whoLabel: 'Who it applies to',
    dueLabel: 'When it is due',
    selfAssessEyebrow: 'Self-assessment',
    /* Headings for GST_PST_LOCAL_SECTIONS, which is empty in English — so these
       two strings render nowhere here. They exist because the section list is
       per-language and the headings above it have to be too. */
    localEyebrow: 'In practice',
    localH2: 'Where this comes up most.',
    servicesLink: 'What we file, and what that includes →',
    catchUpLink: 'If you are already behind on this →',
    faqEyebrow: 'Questions',
    faqH2: 'What people ask about PST.',
    whatWeDoEyebrow: 'What we do',
    ctaH2: 'Not sure which you are registered for?',
    ctaP: 'Say so in the form. We check both against what you actually sell and confirm them in the written quote, before anything is filed.',
  },

  /**
   * /bookkeeping-vs-tax-filing, which is built in Chinese only — so none of
   * these strings render anywhere in English. They exist because the page's
   * headings have to be typed somewhere, and the English module is what every
   * translation is typed against.
   */
  vsTaxPage: {
    eyebrow: 'Bookkeeping vs tax filing',
    headline: 'Two jobs,',
    headlineEm: 'two people, two times of year.',
    sub: 'What a bookkeeper does, what an accountant does, and where we stop. Chinese only — see the note above.',
    rolesEyebrow: 'Who does what',
    rolesH2: 'The division of labour.',
    boundaryEyebrow: 'Where we stop',
    boundaryH2: 'What we do, and what we do not.',
    linksBefore: 'More on ',
    linkServices: 'what the monthly work covers',
    linksMiddle: ', and ',
    linkPricing: 'how the plans are scoped',
    linksAfter: '.',
    ctaH2: 'Not sure which one you need?',
    ctaP: 'Tell us where your books stand and we will say so in the written quote.',
  },

  pstRegistrationPage: {
    eyebrow: 'PST registration in BC',
    headline: 'Registering for PST',
    headlineEm: 'in British Columbia.',
    sub: 'Whether you have to, what the province needs from you, and what changes once you are on their books. There is no revenue threshold with PST — it turns on what you sell.',
    explainerLink: 'How GST and PST differ →',
    whoEyebrow: 'Who it applies to',
    whoH2: 'Which side of the line you are on.',
    stepsEyebrow: 'How to register',
    stepsH2: 'Five steps, once you know the answer.',
    afterEyebrow: 'After registration',
    servicesLink: 'What we file, and what that includes →',
    lateEyebrow: 'Late registration',
    ctaH2: 'Not sure whether you need to register?',
    ctaP: 'Tell us what you sell in the form. We check it against both registrations and confirm the answer in the written quote, before anything is filed.',
  },

  catchUpPage: {
    eyebrow: 'Catch-up bookkeeping in British Columbia',
    headline: 'Behind on your books.',
    headlineEm: 'It is fixable.',
    sub: 'Months or years behind is the most common reason anyone gets in touch with us. We look at how far it goes, quote the whole job as one number before starting, then clear it and file what is outstanding.',
    stagesEyebrow: 'How far behind',
    stagesH2: 'Where you are on this list.',
    processEyebrow: 'How it goes',
    processH2: 'Four steps, one number.',
    reassuranceEyebrow: 'To be clear',
    ctaH2: 'Tell us roughly how far behind you are.',
    ctaP: 'A rough answer is fine, and "not sure" is a valid one. You get a written scope and a single figure for the catch-up within one business day — no sales call, and nothing starts until you agree the number.',
  },

  legal: {
    /** Shown on the Chinese legal pages only; empty in English. */
    translationNote: '',
  },
} as const;
