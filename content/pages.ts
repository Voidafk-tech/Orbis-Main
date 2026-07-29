/**
 * Copy for the two standalone landing pages.
 *
 * These exist because /services and /pricing are the URLs people search for and
 * link to, and because a single page cannot rank for a portfolio of queries.
 * Both go deeper than the matching home-page section rather than repeating it —
 * two URLs carrying the same text compete with each other instead of ranking.
 *
 * The no-published-figures rule applies here as everywhere: the only dollar
 * amounts below are the competitor market ranges and the CRA's registration
 * threshold, neither of which are ours.
 */

export interface ServiceDetail {
  n: string;
  h: string;
  /** One line, the same promise the home page makes. */
  summary: string;
  /** What the work actually involves, in the detail the home page has no room for. */
  detail: string[];
  forWho: string;
}

export const SERVICE_DETAIL: ServiceDetail[] = [
  {
    n: '01',
    h: 'Monthly bookkeeping',
    summary: 'Every transaction categorized, every account reconciled, books closed each month.',
    detail: [
      'Your bank accounts and credit cards are reconciled against the statements, so what the books say matches what the bank says. Transactions are categorized against a chart of accounts set up for how your business actually earns and spends, not a generic template.',
      'The month gets closed rather than left open indefinitely. That distinction matters at year end: a closed month is one your accountant does not have to re-open, re-check and bill you for.',
    ],
    forWho: 'Every plan includes this. It is the base the rest of the work sits on.',
  },
  {
    n: '02',
    h: 'GST and PST filing',
    summary: 'Both returns prepared and filed on schedule. GST to the CRA, PST to the province.',
    detail: [
      'These are two separate taxes with two separate registrations, two sets of deadlines and two different lists of what is taxable. Being registered for one tells you nothing about whether you should be registered for the other, which is why so many BC businesses end up filing one and quietly not the other.',
      'We prepare and file both. GST returns go to the CRA, PST returns to the BC Ministry of Finance. If it turns out you should have registered for one and have not, we will say so plainly and tell you what fixing it involves before doing anything.',
    ],
    forWho: 'Included from the Standard plan up.',
  },
  {
    n: '03',
    h: 'Payroll and T4s',
    summary: 'Staff paid on time, source deductions remitted, T4s and ROEs handled at year end.',
    detail: [
      'Payroll runs on your schedule, with source deductions calculated and remitted to the CRA on the remittance schedule your business has been assigned. Records of employment go out when someone leaves, and T4s are prepared and filed at year end.',
      'WorkSafeBC reporting is handled alongside it, because for most employers in BC the two sit on the same set of numbers and separating them just creates a second place for things to go wrong.',
    ],
    forWho: 'Included in the Complete plan, for businesses with staff on payroll.',
  },
  {
    n: '04',
    h: 'Financial reporting',
    summary: 'A profit and loss and a balance sheet each month, in plain language.',
    detail: [
      'Every month you get a profit and loss statement and a balance sheet, with the figures that actually moved marked so you are not reading a wall of numbers looking for the story.',
      'The point is not the documents. It is that you can answer what your margin is, what you are owed, and what you owe, without waiting until year end to find out.',
    ],
    forWho: 'Every plan includes this.',
  },
  {
    n: '05',
    h: 'Software setup and migration',
    summary: 'QuickBooks Online, Xero or Sage 50 — set up properly, once.',
    detail: [
      'A chart of accounts built around your business, bank feeds connected, and your sales channels wired in so Shopify and Stripe reconcile automatically instead of being re-keyed by hand every month.',
      'If you are moving from another platform, from spreadsheets, or from nothing at all, the migration is part of the setup. It ends with one training session so you can find what you need in the file without calling us to ask.',
    ],
    forWho: 'One-time work, quoted before it starts. Not part of the monthly plan.',
  },
  {
    n: '06',
    h: 'Catch-up bookkeeping',
    summary: 'Months or years behind is the most common reason people get in touch.',
    detail: [
      'We look at how far behind the books actually are, then quote the catch-up as a single number agreed before any work starts. The backlog gets cleared, whatever is outstanding gets filed, and the monthly plan starts from a clean position rather than on top of a mess.',
      'You are not the first business to arrive this way and there is no lecture attached. The only thing that makes it worse is waiting longer.',
    ],
    forWho: 'One-time work, quoted before it starts. Most clients start here.',
  },
];

/** What we do not do, said plainly. Being clear about the edge saves both sides a call. */
export const SERVICES_BOUNDARY = {
  h: 'Where a bookkeeper stops and an accountant starts.',
  body: [
    'A bookkeeper handles the day to day: receipts, categorization, reconciliation, payroll, GST and PST remittances, and your monthly reports. An accountant steps in for corporate tax returns and higher level planning.',
    'Most BC small businesses work with a bookkeeper all year and bring in an accountant at year end. We do not file your corporate return and we do not do tax planning. What we do is hand your accountant a clean, closed set of books, which makes their bill smaller than it would otherwise be.',
  ],
};

/** Drives the "what moves the number" list. Mirrors what the intake form asks. */
export const PRICE_FACTORS = [
  {
    h: 'How many transactions you run',
    p: 'The single biggest factor. A business putting through 40 lines a month is a different amount of work from one putting through 400, and the plans are sized accordingly.',
  },
  {
    h: 'How many accounts there are to reconcile',
    p: 'Two bank accounts and a credit card is straightforward. Six accounts across three institutions, a line of credit and a foreign currency account is not.',
  },
  {
    h: 'What you need filed',
    p: 'GST only, PST only, or both. Whether payroll and the remittances that come with it are in scope, and whether WorkSafeBC reporting sits alongside them.',
  },
  {
    h: 'Which sales channels you use',
    p: 'Shopify and Stripe settle in batches with fees taken out before the money lands, so reconciling them to the invoice level is real work. A business taking payment by e-transfer is simpler.',
  },
  {
    h: 'How far behind the books are',
    p: 'Catch-up is quoted separately from the monthly plan, as one number agreed before it starts. It does not roll into the monthly figure or turn up later as a surprise.',
  },
];

export const PRICING_PRINCIPLES = [
  {
    h: 'Fixed monthly, not hourly',
    p: 'You know the number before the work starts. A messy month does not become a bigger invoice, which also means you are never deciding whether a question is worth the phone call.',
  },
  {
    h: 'Quoted in writing, within one business day',
    p: 'Not a range on a call. A written scope and a fixed monthly figure you can put side by side with anyone else you are talking to.',
  },
  {
    h: 'One-time work quoted separately',
    p: 'Catch-up bookkeeping and software setup are each quoted as one number before they start. Neither is folded into the monthly plan.',
  },
  {
    h: 'Contract based, term set per client',
    p: 'Engagements run on a contract with the term agreed up front. Every figure is in CAD plus GST.',
  },
];

/**
 * Copy for the standalone /contact route.
 *
 * The page used to be the intake form and almost nothing else, which is thin
 * enough that Google will treat it as a soft 404 — the same verdict the page
 * was already getting for an unrelated reason. It also has to work as an
 * ordinary contact page for someone searching the practice by name, which
 * means the hours, the service area and what happens next all belong here.
 */
export const CONTACT_STEPS = [
  {
    n: '1',
    h: 'You send the form',
    p: 'Ten short questions, about three minutes. Nothing you answer commits you to anything, and a rough answer is fine — "not sure" is a valid response to most of it.',
  },
  {
    n: '2',
    h: 'We read it properly',
    p: 'We look at your transaction volume, what needs filing, which software you are on and how far behind the books are. If something in your answers changes the scope, we ask before quoting rather than guessing.',
  },
  {
    n: '3',
    h: 'You get a plan and a price',
    p: 'Within one business day, in writing: what we would do each month and the fixed monthly figure for it. If catch-up work is needed, that is quoted separately as its own number. Nothing gets set up until you say yes.',
  },
] as const;

export const CONTACT_EXPECT = [
  {
    h: 'No sales call',
    p: 'There is no scheduler on this site on purpose. You get a written answer you can read on your own time and compare against anyone else you are talking to.',
  },
  {
    h: 'A real answer, including no',
    p: 'If we are not the right fit for your business, we say so in that first reply rather than booking a call to tell you.',
  },
  {
    h: 'Nothing added to a list',
    p: 'What you send is used to write your quote and to reply to you. It is not added to a mailing list and it is not sold or shared for marketing.',
  },
] as const;

/* ---------------------------------------------------------------------------
 * /remote-bookkeeping
 *
 * Targets "remote bookkeeping", "virtual bookkeeping" and "online bookkeeper"
 * — queries with no local pack attached, so they are won on the page rather
 * than on proximity to the searcher. That makes this the one page whose
 * ranking is not capped by where the practice happens to sit.
 *
 * The angle is deliberately the mechanics: how the work actually happens when
 * nobody drops anything off. /services says what gets done; this says how.
 * Nothing here describes a capability the practice does not already have.
 * ------------------------------------------------------------------------- */

export const REMOTE_MECHANICS = [
  {
    n: '01',
    h: 'You grant access, not paperwork',
    p: 'We work inside your accounting file as an invited user, the same way you would add an employee. You control that access from your own account and can withdraw it at any time, and your records stay in your platform rather than being copied into ours.',
  },
  {
    n: '02',
    h: 'Bank feeds do the fetching',
    p: 'QuickBooks Online, Xero and Sage 50 all pull transactions from your bank and credit card accounts directly. Nobody is keying in a statement, which is where a lot of the errors in manual bookkeeping come from in the first place.',
  },
  {
    n: '03',
    h: 'Receipts go where you already are',
    p: 'Email them, forward them, or attach them to the transaction in the app on your phone. There is no envelope to fill up and no monthly trip to hand it over.',
  },
  {
    n: '04',
    h: 'Filings are electronic anyway',
    p: 'GST returns to the CRA and PST returns to the BC Ministry of Finance are filed online. That part of the job was never in-person, wherever your bookkeeper sits.',
  },
] as const;

export const REMOTE_MONTH = [
  {
    n: '1',
    h: 'Through the month',
    p: 'Transactions come in through the bank feeds and get categorized as they land, rather than piling up into a month-end scramble. If something is ambiguous we ask about it while you still remember what it was.',
  },
  {
    n: '2',
    h: 'At month end',
    p: 'Accounts are reconciled against the statements, the month is closed, and you get a profit and loss and a balance sheet with the figures that actually moved marked.',
  },
  {
    n: '3',
    h: 'When something is due',
    p: 'GST, PST, payroll remittances, T4s, WorkSafeBC — whatever is in your plan is prepared and filed on schedule. You are not the one holding the deadline calendar.',
  },
] as const;

/**
 * The honest comparison. Being straight about what remote gives up is more
 * persuasive than pretending it gives up nothing, and it is the objection
 * everyone arrives with.
 */
export const REMOTE_TRADEOFF = {
  gains: [
    {
      h: 'The same person every month',
      p: 'Not whoever is free at the local firm this quarter. You are not re-explaining how your business works each time something changes hands.',
    },
    {
      h: 'Questions answered when they come up',
      p: 'A question does not have to wait for an appointment, and answering it does not cost you a trip across town or an hour of billable time.',
    },
    {
      h: 'Your books are wherever you are',
      p: 'The file is online, so you can open it from a job site, a kitchen table or somewhere else entirely. You are not waiting on an emailed PDF to know where you stand.',
    },
  ],
  gives_up: {
    h: 'What you give up',
    p: 'Sitting across a desk. If a face-to-face meeting each month is the part you value most, a local firm is a reasonable choice and we will say so rather than talk you out of it. What we would push back on is paying a premium for proximity you never actually use — for most owners the drop-off visit was the worst part of the arrangement, not the point of it.',
  },
} as const;

/** Distinct from the home page FAQ: these are the questions remote raises. */
export const REMOTE_FAQS = [
  {
    q: 'Is remote bookkeeping secure?',
    a: 'Your financial records stay in your own accounting platform — QuickBooks Online, Xero or Sage 50 — rather than being copied somewhere else. We work inside that file as an invited user, which is access you grant from your own account and can revoke yourself at any time, and every action taken in the file is attributed to that user. That is a tighter arrangement than emailing spreadsheets back and forth, which is what the alternative usually looks like in practice.',
  },
  {
    q: 'How do I get my receipts and documents to you?',
    a: 'Whichever way suits you. Email them as they arrive, forward them in a batch, or photograph and attach them to the transaction in your accounting app while you are standing there. QuickBooks Online, Xero and Sage 50 all support attachments against a transaction, which also means the receipt stays with the entry rather than in a folder somewhere.',
  },
  {
    q: 'What if I want to talk to someone?',
    a: 'You can call or email, and you get the same person rather than a queue. What we do not do is require a meeting before answering a question. If your plan includes a quarterly review call, that is scheduled; everything else is answered as it comes up.',
  },
  {
    q: 'Does this work if my business is outside Metro Vancouver?',
    a: 'Yes, and it is the same service at the same price. We are based in West Vancouver and work with businesses across British Columbia — the Interior, the Island and the north included. Because nothing depends on being nearby, where you are does not change the scope or the number.',
  },
  {
    q: 'Do I need to be on cloud accounting software already?',
    a: 'No. If you are on spreadsheets, on a desktop file, or on nothing at all, migrating you is part of setup and is quoted before it starts. We work in QuickBooks Online, Xero and Sage 50, and Shopify and Stripe connect to all three so your sales reconcile automatically.',
  },
] as const;
