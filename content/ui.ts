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
    eyebrow: 'Bookkeeping for BC small business · West Vancouver, BC',
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
    /** Names the control for anyone who reaches it by keyboard or screen reader. */
    skip: 'Skip the intro animation',
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
    p: 'Bookkeeping for BC businesses is the only thing we do. No tax planning sideline, no other provinces, no work we are learning on your file.',
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
    lede: 'Pick the plan that matches your transaction volume. If you are not sure, guess low and we will tell you in the quote.',
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
    finePrintLabel: 'The fine print',
    finePrint:
      'All plans are contract based, with the term set per client. Every plan is a fixed monthly figure, quoted in writing before any work starts, in CAD plus GST. No hourly billing. Over 400 transactions a month, ask and we will quote it.',
    notSure: 'Not included: ',
  },

  tax: {
    eyebrow: 'In plain terms',
    h2: 'GST and PST are two different taxes.',
    p: 'This is the thing that catches out almost every business owner in BC.',
    noteBefore:
      'If you have only ever registered for one of the two, you are not unusual, and it is fixable. Say so in the form and we will check both in the quote. Rates current as of ',
    more: 'How GST and PST actually differ →',
    noteAfter: '.',
    taxes: [
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
    ],
  },

  trust: {
    certEyebrow: 'Certification',
    certP: 'QuickBooks Online Advanced ProAdvisor — the level above the standard certification — plus Intuit payroll certification. Certified in Xero and Sage 50 as well, not just working in them.',
    badgePlaceholder: 'QuickBooks Advanced ProAdvisor badge to be supplied',
    whoEyebrow: 'Who we work with',
    commitEyebrow: 'What we commit to',
    commitment: 'Every enquiry gets a written plan and a price within one business day.',
    commitP: 'If we cannot help, we will say so in that reply rather than book a call to tell you.',
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
    eyebrow: 'Plans and pricing',
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
    areasLede:
      'Because nothing depends on being nearby, where your business sits does not change the scope or the number. We are based in West Vancouver and work across the province.',
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
    whatWeDoEyebrow: 'What we do',
    ctaH2: 'Not sure which you are registered for?',
    ctaP: 'Say so in the form. We check both against what you actually sell and confirm them in the written quote, before anything is filed.',
  },

  catchUpPage: {
    eyebrow: 'Catch-up bookkeeping',
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
