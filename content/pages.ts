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
}

export const SERVICE_DETAIL: ServiceDetail[] = [
  {
    n: '01',
    h: 'Monthly bookkeeping',
    summary: 'Every transaction categorized, every account reconciled, books closed each month.',
    detail: [
      'We reconcile your bank accounts and credit cards against the statements, so the books match the bank. We categorize transactions against a chart of accounts built for how your business earns and spends, not a generic template.',
      'We close each month instead of leaving it open. At year end that saves you money: nobody has to re-open a closed month, re-check it and bill you before the return can be prepared.',
    ],
  },
  {
    n: '02',
    h: 'GST and PST filing',
    summary: 'Both returns prepared and filed on schedule. GST to the CRA, PST to the province.',
    detail: [
      'Two separate taxes, two registrations, two sets of deadlines, two lists of what is taxable. Being registered for one tells you nothing about the other. That is how so many BC businesses end up filing one and quietly missing the other.',
      'We prepare and file both. GST returns go to the CRA, PST returns to the BC Ministry of Finance. If you should have registered for one and have not, we tell you straight away and explain what fixing it takes before we do anything.',
    ],
  },
  {
    n: '03',
    h: 'Payroll and T4s',
    summary: 'Staff paid on time, source deductions remitted, T4s and ROEs handled at year end.',
    detail: [
      'We run payroll on your schedule and remit source deductions to the CRA on the schedule they assigned you. We issue records of employment when someone leaves, and prepare and file T4s at year end.',
      'We handle WorkSafeBC reporting alongside it. For most BC employers the two run off the same numbers, and splitting them just creates a second place for things to go wrong.',
    ],
  },
  {
    n: '04',
    h: 'Financial reporting',
    summary: 'A profit and loss and a balance sheet each month, in plain language.',
    detail: [
      'Every month you get a profit and loss statement and a balance sheet, with the figures that moved marked, so you are not hunting through a wall of numbers.',
      'So you can answer three questions any time: what your margin is, who owes you, and what you owe. Not just at year end.',
    ],
  },
  {
    n: '05',
    h: 'Software setup and migration',
    summary: 'QuickBooks Online, Xero or Sage 50 — set up properly, once.',
    detail: [
      'We build a chart of accounts around your business and wire in your sales channels, so Shopify and Stripe reconcile against the books instead of being re-keyed every month.',
      'Moving from another platform, from spreadsheets, or from nothing at all, we handle the migration as part of setup. It ends with a training session so you can find things in the file without calling to ask.',
    ],
  },
  {
    n: '06',
    h: 'Catch-up bookkeeping',
    summary: 'Months or years behind is the most common reason people get in touch.',
    detail: [
      'We look at how far behind the books are, then quote the catch-up as one number, agreed before we start. We clear the backlog, file whatever is outstanding, and begin the monthly plan on clean books instead of on top of a mess.',
      'You are not the first business to arrive this way, and we will not lecture you about it. Waiting longer is the only thing that makes it worse.',
    ],
  },
  {
    n: '07',
    h: 'T1 personal returns',
    summary: 'Personal income tax for sole proprietors and the self-employed.',
    detail: [
      'If you run an unincorporated business, your business income goes on your personal return as part of the T1. We prepare the statement of business activities from the books we already keep, so the figures on the return are the figures in the file. Nothing gets reconstructed.',
      'We work out business use of home, vehicle expenses and capital cost allowance from what the books already show. Where the treatment of something is genuinely open, we give you the options before we file, not after.',
    ],
  },
  {
    n: '08',
    h: 'T2 corporate returns',
    summary: 'Corporate income tax for Canadian-controlled private corporations.',
    detail: [
      'For an incorporated small business, we prepare and file the T2 and its schedules from books we already closed month by month. That is the case for having one practice do both: year end becomes a filing, not an excavation.',
      'Where it makes sense we prepare the corporate return and the owners’ personal returns together, so salary, dividends and shareholder accounts line up across both. No reconciling after the fact.',
    ],
  },
];

/**
 * How the monthly work and the year-end work fit together. Says the same thing
 * FAQ 2 in content/site.ts says, at more length. The two are read by the same
 * person in the same session and have to agree.
 *
 * History, so this does not get reverted by someone reading an old draft: this
 * section used to be a boundary — first a flat "we do not file your corporate
 * return", later a softer "our plans cover the monthly work". Both understated
 * what the practice does. T1 returns for the self-employed and T2 returns for
 * CCPCs are now services in their own right, in SERVICE_DETAIL and in SERVICES.
 *
 * What this section must not do is turn into a discussion of professional
 * designations. Describe the work, not who is allowed to sign it.
 */
export const SERVICES_BOUNDARY = {
  h: 'The monthly work and the year-end work',
  body: [
    'The monthly side is the day to day: receipts, categorization, reconciliation, payroll, GST and PST remittances, and your monthly reports. The year-end side is the return — a T1 with a statement of business activities if you are unincorporated, a T2 with its schedules if you are a corporation.',
    'Most practices do one or the other. That is why so many owners spend December handing a year of records to someone who has never seen them. We do both, so your return comes from books we closed month by month as the year went. If your accountant already handles year end, that works too. We hand over clean, closed books and the reconciliations they will ask for.',
  ],
};

/** Drives the "what moves the number" list. Mirrors what the intake form asks. */
export const PRICE_FACTORS = [
  {
    h: 'How many transactions you run',
    p: 'The single biggest factor. Forty lines a month is a different job from 400, and the plans are sized to match.',
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
    p: 'We quote catch-up separately from the monthly plan, as one number agreed before it starts. It never rolls into the monthly figure or shows up later as a surprise.',
  },
];

export const PRICING_PRINCIPLES = [
  {
    h: 'Fixed monthly, not hourly',
    p: 'You know the number before the work starts. A messy month does not become a bigger invoice, so you never have to weigh up whether a question is worth the phone call.',
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
    p: 'We look at your transaction volume, what needs filing, which software you are on and how far behind the books are. If something in your answers changes the scope, we ask before quoting. We do not guess.',
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
    p: 'If we are not the right fit for your business, we say so in that first reply. We will not book a call to tell you.',
  },
  {
    h: 'Nothing added to a list',
    p: 'We use what you send to write your quote and reply to you. We do not add it to a mailing list, and we do not sell or share it for marketing.',
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
    p: 'We work inside your accounting file as an invited user, the same way you would add an employee. You control that access from your own account and can withdraw it any time. Your records stay in your platform. We never copy them into ours.',
  },
  {
    n: '02',
    h: 'The file is the single copy',
    p: 'We work inside your accounting file, not a copy that gets emailed back and forth. One version of your books, open to you, current today rather than as of the last exchange.',
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
    p: 'We categorize transactions as they come in, so nothing piles up into a month-end scramble. If something is unclear we ask while you still remember what it was.',
  },
  {
    n: '2',
    h: 'At month end',
    p: 'We reconcile the accounts against the statements, close the month, and send you a profit and loss and a balance sheet with the figures that moved marked.',
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
      p: 'Not whoever is free at the local firm this quarter. You explain how your business works once.',
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
    p: 'Sitting across a desk. If a monthly face-to-face is the part you value most, a local firm is the right choice and we will tell you so. What we would question is paying extra for proximity you never use. For most owners the drop-off visit was the worst part of the arrangement, not the point of it.',
  },
} as const;

/** Distinct from the home page FAQ: these are the questions remote raises. */
export const REMOTE_FAQS = [
  {
    q: 'Is remote bookkeeping secure?',
    a: 'Your records stay in your own platform, whether that is QuickBooks Online, Xero or Sage 50. We never copy them elsewhere. We work in that file as an invited user: you grant the access, you can revoke it any time, and every action is logged against that user. The usual alternative is emailing spreadsheets around.',
  },
  {
    q: 'How do I get my receipts and documents to you?',
    a: 'Whichever way suits you. Email them as they arrive, forward them in a batch, or photograph and attach them to the transaction in your accounting app while you are standing there. QuickBooks Online, Xero and Sage 50 all support attachments against a transaction, which keeps the receipt attached to the entry instead of sitting in a folder somewhere.',
  },
  {
    q: 'What if I want to talk to someone?',
    a: 'Call or email and you get the same person, not a queue. We will never make you sit through a meeting to get an answer. If your plan includes a quarterly review call, that one is scheduled. Everything else we answer as it comes up.',
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

/* ---------------------------------------------------------------------------
 * /gst-pst-bc
 *
 * The home page's GST/PST explainer promoted to its own page. It was the best
 * content on the site and it was buried inside a section of a page trying to do
 * six other jobs.
 *
 * Everything factual here is either already-vetted copy from the home page or
 * the CRA's own $30,000 registration threshold. Deliberately no penalty
 * formulas, no PST small-seller figures and no exemption lists: those turn on
 * specifics of a business, they change, and a bookkeeping site asserting one
 * wrongly is worse than not answering. The page routes those to the quote.
 *
 * Rates carry RATES_AS_OF, the single date-stamp constant. Do not add a second.
 * ------------------------------------------------------------------------- */

export const GST_PST_INTRO = [
  'Most BC owners meet these two taxes in the wrong order: they register for one, assume it covers them, then hear about the other from a letter. Two governments, two registrations, two sets of deadlines, two definitions of what is taxable.',
  'Neither one tells you anything about the other. Being registered for GST does not mean you should be registered for PST, and being exempt from PST does not exempt you from GST.',
];

export const GST_PST_COMPARISON = [
  {
    label: 'Who collects it',
    gst: 'The Canada Revenue Agency (CRA), federally.',
    pst: 'The BC Ministry of Finance, provincially.',
  },
  {
    label: 'When you must register',
    gst: 'Generally once you pass $30,000 in revenue over four consecutive quarters. You can register earlier by choice.',
    pst: 'It turns on what you sell, not how much. Most businesses selling goods in BC need to register; many service businesses do not.',
  },
  {
    label: 'What it applies to',
    gst: 'Most goods and services, with a defined set of zero-rated and exempt categories.',
    pst: 'A different list again. Many services are exempt while most goods are not, and the two lists do not line up.',
  },
  {
    label: 'Can you claim it back',
    gst: 'Yes. You claim input tax credits for the GST you paid on business purchases, so you remit the difference.',
    pst: 'No. There is no input credit. PST you pay on business inputs is generally a cost, not something you recover.',
  },
  {
    label: 'How often you file',
    gst: 'Monthly, quarterly or annually, on the schedule the CRA assigns you.',
    pst: 'On the schedule the province assigns you, which will not necessarily match your GST period.',
  },
];

export const GST_PST_MISTAKES = [
  {
    n: '01',
    h: 'Registering for one and assuming it covers both',
    p: 'The most common one by a distance. They are different registrations with different numbers. Having a GST number does not put you on the province’s books, and nobody writes to tell you.',
  },
  {
    n: '02',
    h: 'Charging PST on something exempt, or missing it on something taxable',
    p: 'Both directions cause problems. Charge tax you should not have, and you owe your customer a refund. Miss tax you should have charged, and you pay it out of your own margin, because the customer is long gone.',
  },
  {
    n: '03',
    h: 'Treating the two filing calendars as one',
    p: 'The periods are assigned separately and often do not align. A business that files GST quarterly can easily be on a different PST cycle, and remembering only one of them is how a return gets missed.',
  },
  {
    n: '04',
    h: 'Leaving the money in the operating account',
    p: 'Sales tax you collect is not revenue. It is money you are holding for a government. Spending it in a good month and finding it gone at the deadline is extremely common, and the shortfall comes out of the owner’s pocket.',
  },
];

export const GST_PST_WHAT_WE_DO = {
  h: 'What we do about it',
  body: [
    'We confirm both registrations at the start, not at the first deadline. If you should be registered for something and are not, you hear it in the written quote, not a year later.',
    'From there we prepare and file both returns on schedule, GST to the CRA and PST to the BC Ministry of Finance, and we hold the deadlines. The amounts owing come out of books reconciled during the month, so the figure on the return matches the figure in the bank.',
    'If you should have registered earlier than you did, we explain what that involves before we do anything about it. Coming forward voluntarily usually puts you in a better position than being found. Either way you should hear the options from your bookkeeper, not from a letter.',
  ],
};

/**
 * What tends to carry PST and what tends not to.
 *
 * Illustrative, and it says so. An exhaustive list is exactly what the note at
 * the top of this section warns against: the categories are defined narrowly,
 * they have been changed before, and a business reading a list here and
 * concluding it is exempt has been misled by us rather than helped.
 *
 * Note what is deliberately *not* said. There is no claim that services as a
 * class are outside PST — the taxable-services list is specific and has been
 * widened before, so a sentence like "services are exempt" would be a hostage
 * to the next change rather than a fact. The examples on the exempt side are
 * long-standing goods exemptions for that reason.
 */
export const GST_PST_EXEMPT = {
  intro: [
    'The two lists do not line up, and neither one follows a rule you can guess from first principles. PST has its own definition of what is taxable, and it is narrower than GST in some places and wider in others.',
    'What follows is the shape of it, not the whole of it. The categories are drawn tightly and have been redrawn before, and the only version that matters is the one covering what you sell.',
  ],
  columns: [
    {
      h: 'Usually carries PST',
      items: [
        'Goods sold or leased in BC — stock, equipment, furniture, tools, vehicles',
        'Software, and telecommunication services',
        'Work performed on goods: repairs, maintenance, restoration',
        'Legal services',
        'Accommodation',
        'Goods bought outside BC and brought in for use here',
      ],
    },
    {
      h: 'Usually does not',
      items: [
        'Food for human consumption',
        'Books, newspapers and magazines',
        "Children's clothing and footwear",
        'Bicycles',
        'Prescription medications',
        'Labour to improve real property — though the materials are a different question',
      ],
    },
  ],
  caveat:
    'That last one catches contractors in particular. You generally do not charge PST on improving real property, but you usually do pay PST on the materials that go into it. Those materials are a cost to you, not something you collect and pass along. It is the single most common place a trades business prices a job wrong.',
  close:
    'If you are not certain which side your work falls on, that is a reasonable position to be in and a bad one to guess at. Say what you sell in the form and we will tell you in the quote.',
};

/**
 * Registration, kept short here on purpose: /bc-pst-registration covers it
 * properly and this section exists to hand the reader over rather than to
 * compete with it. Two pages saying the same thing at half the depth is worse
 * than one saying it once.
 */
export const GST_PST_REGISTRATION = {
  h: 'Whether you have to register at all',
  body: [
    'The GST test is about size: broadly, once you pass $30,000 in revenue over four consecutive quarters you must register. You can register earlier by choice.',
    'PST does not work that way. It turns on what you sell, not how much, so a small business can be required to register from its first sale while a much larger one never is. There is no revenue figure to wait for. That is why so many people find out late.',
  ],
  linkText: 'How to register for PST in BC →',
};

/**
 * The return itself. Naming the form is the point — a competitor holds position
 * 12 for "pst bc" on essentially nothing but FIN 400 coverage, because it is
 * what people search once they have the obligation and not before.
 */
export const GST_PST_FIN400 = {
  h: 'Filing the return: the FIN 400',
  body: [
    'The PST return is form FIN 400. Most businesses file it online through eTaxBC instead of on paper. You report what you sold, what PST you collected, and any PST you owe on things you bought without paying it, then pay the balance with the return.',
    'The return itself is not the hard part. Filing it from unreconciled books is. The figure on the return has to match the figure in the bank, and if the month was never closed there is nothing to check it against. You end up defending a number you cannot trace.',
    'There is no input credit either, which is the other half of why PST catches people out. Unlike GST, what you collect is what you remit. PST you paid on your own purchases does not come off it.',
  ],
};

/**
 * Deadlines. Reported as the province actually operates it — it assigns the
 * period and tells you — rather than by publishing the dollar bands that decide
 * which one you get. Those are exactly the kind of figure that moves.
 */
export const GST_PST_DEADLINES = {
  intro: [
    'You do not choose your reporting period. The province assigns one when you register, based on how much PST it expects you to collect, and tells you what it is. It can be changed later, and it changes on their initiative as often as yours.',
    'Whichever you are on, the rule is the same: the return and the payment must arrive by the last day of the month after the period ends.',
  ],
  rows: [
    {
      label: 'Monthly',
      who: 'The highest collection volumes.',
      due: 'Last day of the following month — so January is due 28 February.',
    },
    {
      label: 'Quarterly',
      who: 'The band most small businesses that collect PST land in.',
      due: 'Last day of the month after the quarter ends.',
    },
    {
      label: 'Semi-annual',
      who: 'Lower volumes, assigned at the province’s discretion.',
      due: 'Last day of the month after the six months end.',
    },
    {
      label: 'Annual',
      who: 'The smallest collectors.',
      due: 'Last day of the month after the year ends.',
    },
  ],
  close:
    'The trap is assuming this lines up with GST. It generally does not. The CRA assigns your GST period and the province assigns your PST period, independently, using different information. A business filing GST quarterly can easily be on a monthly PST cycle, and a calendar built around one of them will miss the other.',
};

/**
 * PST self-assessment. There is written demand and almost no written supply —
 * a YouTube video holds position 18 for "pst bc" on this topic, which is what
 * an unanswered question looks like in a search result.
 */
export const GST_PST_SELF_ASSESSMENT = {
  h: 'When you owe PST nobody charged you',
  body: [
    'PST also runs the other way. You can owe it on your own purchases, and that is the part almost nobody knows about until a review turns it up.',
    'The principle is simple: buy something for use in BC where PST should have applied but was not charged, and you have to report and pay it yourself. That is self-assessment, and it goes on the same return.',
    'In practice it shows up in three places. Buying equipment or supplies from an out-of-province seller who is not registered here. Importing goods for use in the business. And taking something out of your own resale stock to use yourself, which is a sale to you as far as PST is concerned even though no money moved.',
    'None of those feel like taxable events while they are happening, and that is the problem. They are ordinary purchases that arrive without PST on the invoice, and the obligation sits with the buyer, not the seller.',
  ],
};

/**
 * Questions taken from the search terms this page already receives impressions
 * for, answered at the length the question deserves.
 *
 * Rendered as visible content only. There is deliberately no FAQPage markup
 * here: FAQ rich results were withdrawn on 7 May 2026, so the schema produces
 * no search feature and is pure weight — see the note on the `faq` field in
 * content/routes.ts. The questions are here for readers.
 */
export const GST_PST_FAQS = [
  {
    q: 'What is GST and PST in BC?',
    a: 'Two separate sales taxes that both apply in British Columbia. GST is federal, 5%, and goes to the Canada Revenue Agency. PST is provincial, 7%, and goes to the BC Ministry of Finance. On most goods you charge both, for a combined 12%. They have separate registrations, separate returns, separate deadlines and different rules about what is taxable.',
  },
  {
    q: 'What is the difference between GST and PST?',
    a: 'Three differences matter in practice. Who you register and file with: the CRA for GST, the province for PST. What triggers registration: revenue for GST, what you sell for PST. And whether you get it back: GST on business purchases comes off what you remit, PST never does. PST is a cost.',
  },
  {
    q: 'Do I need to register for PST in BC?',
    a: 'It depends on what you sell, not how much. Most businesses selling or leasing goods in BC need to register, as do those selling certain specified services. Many service businesses do not. There is no revenue threshold to wait for the way there is with GST, so this is worth checking properly instead of assuming.',
  },
  {
    q: 'What is a PST number in BC?',
    a: 'The registration number the province issues once you are registered to collect PST. It is separate from your GST number and from your business number, and it goes on your invoices and on your returns. Having one of the two numbers tells you nothing about whether you should have the other.',
  },
  {
    q: 'How do I file PST in BC?',
    a: 'On form FIN 400, the Provincial Sales Tax Return, filed online through eTaxBC for most businesses. You report your sales, the PST you collected and any PST you owe on your own purchases, and pay the balance with the return. It is due by the last day of the month after your reporting period ends.',
  },
  {
    q: 'What happens if I should have registered for PST and did not?',
    a: 'You owe the PST you should have collected, plus interest, whether or not you charged it. If you did not charge it, it comes out of your own margin, because those customers are long gone. Coming forward voluntarily usually beats being found. Get advice before you do either.',
  },
  {
    q: 'Do GST and PST have the same filing deadline?',
    a: 'No, and assuming they do is one of the more common ways a return gets missed. The CRA assigns your GST reporting period and the province assigns your PST one, separately and using different information. They frequently do not align.',
  },
];

/** A prose section with a heading, for content that only some languages carry. */
export interface LocalSection {
  h: string;
  body: readonly string[];
}

/* ---------------------------------------------------------------------------
 * /bookkeeping-vs-tax-filing — 记账 vs 报税
 *
 * Chinese only, and empty here for the same reason GST_PST_LOCAL_SECTIONS is:
 * the page answers a confusion this market has and the English one does not.
 * The Chinese-language mental model is 会计师帮我报税 — "my accountant does my
 * taxes" — with monthly bookkeeping not established as a separate thing anyone
 * buys. The English market already draws that line, so an English version would
 * be a page nobody searches for.
 *
 * The page contrasts two kinds of work, not two kinds of people: the monthly
 * books and the year-end return, both of which the practice does. It used to
 * close on a refusal — T1 and T2 returns stated as out of scope — which was
 * never accurate and is now plainly wrong. Do not reintroduce it, and keep the
 * page describing the work rather than who is entitled to sign it.
 * ------------------------------------------------------------------------- */

export const VS_TAX_INTRO: readonly string[] = [];
export const VS_TAX_ROLES: readonly LocalSection[] = [];
export const VS_TAX_BOUNDARY: readonly LocalSection[] = [];

/**
 * Sections of /gst-pst-bc that exist in one language and not another.
 *
 * Empty in English, and deliberately so. Search demand is not a translation of
 * itself: the Chinese-language audit found queries this market asks that the
 * English one does not — PST on goods imported from mainland China, sales tax
 * for the restaurant and retail trades that are the highest-density
 * Chinese-owned sectors in Metro Vancouver, Shopify and online stores. Writing
 * the English equivalents would produce pages nobody searches for.
 *
 * The type annotation is load-bearing. Declared `as const`, an empty array types
 * as `readonly []`, and `Widen<>` would then forbid the translation from having
 * any entries at all — the build would fail with a message about tuple length
 * that says nothing about the actual problem. Annotating it keeps the element
 * type and lets each language carry as many as it has.
 */
export const GST_PST_LOCAL_SECTIONS: readonly LocalSection[] = [];

/* ---------------------------------------------------------------------------
 * /bc-pst-registration
 *
 * Navigational intent: someone searching "bc pst registration" wants to do the
 * thing, not read about it. So the page is short intro, then steps, then the
 * edge cases — and it does not restate the GST/PST explainer, it links to it.
 *
 * Same restraint as /gst-pst-bc on figures. What registration turns on is
 * described in kind rather than by publishing a threshold table, because the
 * categories are narrow and have been widened before. The one number here is
 * the CRA's $30,000 GST threshold, which is stated to draw the contrast.
 * ------------------------------------------------------------------------- */

export const PST_REG_INTRO = [
  'Registering for PST is not difficult and it does not take long. The hard part is the question before it — whether you have to at all — because PST does not use the revenue threshold people expect from GST.',
  'There is no turnover figure to cross. It turns on what you sell, so the answer can be yes from your first sale, or no at any size.',
];

export const PST_REG_WHO = {
  columns: [
    {
      h: 'Generally must register',
      items: [
        'You sell or lease goods in BC in the ordinary course of business',
        'You sell software or telecommunication services here',
        'You provide legal services',
        'You perform work on goods — repairs, maintenance, restoration',
        'You provide accommodation in BC',
        'You are outside BC but sell goods into it above the province’s thresholds',
      ],
    },
    {
      h: 'Generally need not',
      items: [
        'Everything you sell falls in an exempt category',
        'You only make wholesale sales to registered resellers who give you their number',
        'You provide services that are not on the taxable list',
        'You are not carrying on business in BC at all',
      ],
    },
  ],
  caveat:
    'The second column is where people get it wrong. "My work is a service" feels like a complete answer and is not. The taxable-services list is specific, follows no obvious principle, and has been widened before. Check what you sell against the list instead of reasoning from your industry.',
};

export const PST_REG_STEPS = [
  {
    n: '1',
    h: 'Work out whether you have to',
    p: 'Before anything else, and against what you sell, not what your industry is called. This step decides the other four, and it is the one worth a second opinion.',
  },
  {
    n: '2',
    h: 'Get your details together',
    p: 'Your business number, the legal name and structure, what you sell, where you operate from, when you started or expect to start making taxable sales, and your banking details. Nothing exotic, but assembling it first turns the registration into a single sitting.',
  },
  {
    n: '3',
    h: 'Register through eTaxBC',
    p: 'Online, through the province’s eTaxBC system, which is where you will file the return later. You can register before your first taxable sale instead of waiting for it, and that is usually tidier.',
  },
  {
    n: '4',
    h: 'You get a PST number',
    p: 'A registration number of your own, separate from your GST number and from your business number. It belongs on your invoices, and you will need it to file. Having one of the two tax numbers never implies the other.',
  },
  {
    n: '5',
    h: 'Start charging, and start tracking',
    p: 'From your effective date you charge PST on taxable sales, keep it separate from your own money, and file on the reporting period the province assigns you. What you collect is what you remit. There is no input credit to net it down.',
  },
];

export const PST_REG_AFTER = {
  h: 'What changes once you are registered',
  body: [
    'You are collecting money for the province from the effective date, not from the date the paperwork clears. If you registered late, the obligation still runs from when you should have started.',
    'A reporting period arrives with the registration — monthly, quarterly, semi-annual or annual — and it will not necessarily match your GST period. Two calendars, kept separately, is the ordinary state of affairs and the most common thing to get caught by.',
    'The practical advice is dull and it works: move the PST out of the operating account as you collect it. Sales tax that sits in the current account gets spent during a good month, and the shortfall at the deadline is the owner’s to cover.',
  ],
};

export const PST_REG_LATE = {
  h: 'If you should have registered earlier',
  body: [
    'Common, and fixable. You owe the PST you should have collected, plus interest. If you never charged it, that comes out of your own margin, because those customers are long gone.',
    'Coming forward voluntarily generally puts you in a better position than being found. Understand the options before you do either. That takes a conversation, not a form.',
  ],
  linkText: 'How we handle a backlog →',
};

/* ---------------------------------------------------------------------------
 * /catch-up-bookkeeping
 *
 * The distress offer, and by the practice's own account the most common reason
 * anyone gets in touch. Commercial intent, an urgent buyer, and it converts
 * into recurring work.
 *
 * The register is deliberately calm. Someone reading this already knows they
 * are behind; the page's job is to make the next step feel ordinary, not to
 * remind them it is bad.
 * ------------------------------------------------------------------------- */

export const CATCH_UP_INTRO = [
  'Being behind on your books is not a character defect and it is not rare. It usually starts with one busy month, and then the pile is big enough that starting feels worse than ignoring it.',
  'The only thing that reliably makes it worse is more time. Everything else about it is fixable, and the fixing is routine work.',
];

export const CATCH_UP_STAGES = [
  {
    n: '01',
    h: 'A few months behind',
    p: 'Straightforward. The records still exist, the statements can be worked through in order, and nothing has been missed that cannot be filed on time or close to it. This is the cheapest version of the problem and the easiest to price.',
  },
  {
    n: '02',
    h: 'Most of a year behind',
    p: 'Still routine, but there is more of it, and usually at least one filing deadline has already gone. We work out what is outstanding before quoting, so the number covers the whole job, not just the easy part.',
  },
  {
    n: '03',
    h: 'More than a year, or several years',
    p: 'Bigger, and it is where owners are most reluctant to make the call. It is also the case where waiting costs the most, because interest and penalties on anything outstanding keep accruing whether or not the books are done.',
  },
  {
    n: '04',
    h: 'You are not sure how far behind you are',
    p: 'A completely normal answer, and not a problem. Say so in the form. Working out the actual state of things is the first thing we would do anyway, and it happens before you are asked to commit to anything.',
  },
];

export const CATCH_UP_PROCESS = [
  {
    n: '1',
    h: 'We find out how deep it goes',
    p: 'What exists, what is missing, which registrations you hold and what has not been filed. This comes before the quote, because quoting a backlog you have not looked at is guesswork.',
  },
  {
    n: '2',
    h: 'You get one number',
    p: 'The catch-up is quoted as a single figure, agreed before any work starts. It does not roll into your monthly fee and it does not turn into a bigger invoice halfway through because the job was worse than it looked.',
  },
  {
    n: '3',
    h: 'We clear it and file what is outstanding',
    p: 'We reconcile and close the backlog, then file whatever is owed to the CRA or the province. You will know the liability before it lands, not after.',
  },
  {
    n: '4',
    h: 'Monthly starts from a clean position',
    p: 'From then on it is the ordinary monthly plan, on books that are correct. Clearing the backlog is what stops it rebuilding.',
  },
];

export const CATCH_UP_REASSURANCE = {
  h: 'What this is not',
  body: [
    'It is not a lecture. We have not yet met the business that got behind on purpose, and telling you it should have been done sooner helps nobody.',
    'Waiting did make the job bigger than it would have been. But the number reflects the work in front of us, not a penalty for the delay.',
    'And it is not a commitment to anything else. Some people have the backlog cleared and take the monthly plan; some have it cleared, get handed clean books, and carry on alone. Both are fine, and the quote does not change based on which one you are.',
  ],
};
