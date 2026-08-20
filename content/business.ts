/**
 * The practice as a local business: the facts Google cross-checks against the
 * Google Business Profile and directory listings.
 *
 * NAP consistency is the point. The name, address and phone here must match the
 * Business Profile character for character — a street abbreviated one way here
 * and another way there is a real, measurable drag on local rankings. If the
 * Business Profile is edited, edit this at the same time.
 *
 * `streetAddress` and `postalCode` are deliberately not rendered anywhere on the
 * site: the footer and the contact page show locality and region only. They are
 * still emitted in the JSON-LD, because that is what local search reads and
 * dropping them would break the Business Profile match.
 *
 * Note what that does and does not achieve. JSON-LD is page source — "view
 * source" shows it, and so does any scraper. Not rendering the street address
 * keeps it off the visible page; it does not make it private. If the goal is
 * privacy rather than layout, the fields have to come out of the schema here as
 * well, and the Business Profile has to be switched to a service-area listing
 * with the address hidden — otherwise Google publishes it regardless.
 */

export const BUSINESS = {
  name: 'Orbis Accounting',
  streetAddress: '918 Keith Road',
  addressLocality: 'West Vancouver',
  addressRegion: 'BC',
  postalCode: 'V7T 1M3',
  addressCountry: 'CA',
  /** Used by the `geo` property, and by map links. */
  latitude: 49.329576,
  longitude: -123.139528,
  /**
   * Deliberately the coarse `$$` band rather than a figure range. The technical
   * handoff (§4.2, §5.5, §7) requires that no figure of ours appears anywhere,
   * including in structured data, and a range in page source is published
   * whether or not anything renders it. `$$` gives Google the affordability
   * signal without publishing a number.
   */
  priceRange: '$$',
} as const;

/**
 * Profiles that represent this same business elsewhere. `sameAs` is how Google
 * ties this site and the Google Business Profile together as one entity, which
 * is one of the stronger local signals available — and it is currently empty,
 * so it is doing nothing.
 *
 * To fill it in, from the Business Profile:
 *   1. Search Google for "Orbis Accounting West Vancouver" while signed in as
 *      the profile owner, or open business.google.com and pick the profile.
 *   2. In the profile panel, use Share → Copy link. That produces a URL of the
 *      form https://maps.app.goo.gl/… or a https://www.google.com/maps/place/…
 *      link; either works.
 *   3. Add it below. Add any directory or association listings the same way —
 *      LinkedIn, the CPB Canada directory, Yelp, BBB.
 *
 * Every URL here must genuinely be this business. `sameAs` pointing at
 * something that is not us is a spam signal, not a boost.
 */
export const SAME_AS: string[] = [
  // Google Business Profile. A share.google shortlink resolves fine, but a
  // canonical https://www.google.com/maps/place/… URL is more durable — swap it
  // in if one is to hand, since shortlinks can rot.
  'https://share.google/AP3Klv3AoRDpdiH51',
  // Add each directory profile here as it goes live — Bing Places, Apple
  // Business Connect, the Facebook page, Find-a-ProAdvisor, Yellow Pages,
  // Yelp, LinkedIn. This list is what turns those listings from unconnected
  // records into citations pointing at this entity, so a profile that exists
  // and is not listed here is doing a fraction of the work it could.
];

/**
 * The people who do the work. **Currently not published anywhere.**
 *
 * This used to be emitted as `employee` in the AccountingService JSON-LD, which
 * meant both names appeared in the page source of all eighteen URLs — "view
 * source" showed them, and so did every scraper. That is not what a reader sees,
 * but it is unambiguously public, and the practice asked for the names to stay
 * off the site. scripts/prerender.mjs no longer reads this.
 *
 * It is kept, rather than deleted, because the decision is about publication and
 * not about the facts: if a named bio and a `Person` block are wanted later,
 * this is the source and re-enabling it is one line in prerender.mjs. Do not
 * re-enable it without asking.
 *
 * Named at the client's direction, and exactly as directed: Tina by first name
 * only, Kevin Feng in full. Do not expand or abbreviate either — it concerns
 * real people.
 *
 * Note this is not the only place a name can reach the page: WECHAT.account in
 * content/site.ts renders "Tina - Orbis" in the WeChat block on the home page
 * and /contact. That one is a handle on a public account rather than a
 * disclosure, which is why it stays.
 */
export const PEOPLE = [{ name: 'Tina' }, { name: 'Kevin Feng' }] as const;

/**
 * Certifications held by the practice, described so they are machine-readable
 * rather than only an image with alt text. For a small professional practice a
 * verifiable credential is one of the few hard expertise signals available, and
 * Google's quality guidance leans heavily on demonstrable expertise for
 * anything financial.
 *
 * These are attached to the practice, not to a named individual — which of the
 * two people above holds which is not recorded here, and guessing would be
 * publishing a claim about a real person.
 *
 * Only add a credential that is actually held and currently valid. Overstating
 * one is worse than listing none, and certifications lapse.
 */
export const CREDENTIALS = [
  // Intuit's core path runs Certified then Advanced, the same shape as Xero's
  // levels below, so both are listed for the same reason those three are.
  { name: 'QuickBooks Online ProAdvisor', issuer: 'Intuit' },
  { name: 'QuickBooks Online Advanced ProAdvisor', issuer: 'Intuit' },
  { name: 'Intuit Payroll Certification', issuer: 'Intuit' },
  // Xero's core path is levelled L1 to L3; the two below sit outside it as
  // subject certifications, which is why holding both is not double counting.
  { name: 'Xero L1 Certified Associate', issuer: 'Xero' },
  { name: 'Xero L2 Certified Professional', issuer: 'Xero' },
  { name: 'Xero L3 Certified Specialist', issuer: 'Xero' },
  { name: 'Xero Payroll Certification', issuer: 'Xero' },
  { name: 'Xero Migration Certification', issuer: 'Xero' },
  { name: 'Sage 50 Certification', issuer: 'Sage' },
] as const;

/**
 * Places named individually in the structured data. Google matches a query's
 * implied location against these, so naming the metro areas beats one blanket
 * "British Columbia" — that is why the regions and the cities are both here.
 */
export const AREAS_SERVED = [
  'West Vancouver',
  'North Vancouver',
  'Vancouver',
  'Burnaby',
  'Coquitlam',
  'Richmond',
  'Surrey',
  'North Shore',
  'Metro Vancouver',
  'Lower Mainland',
  'British Columbia',
] as const;

/**
 * Ratings shown in search results come from the Google Business Profile, which
 * aggregates real reviews. `aggregateRating` in a site's own markup is
 * "self-serving" — Google has not rendered review stars from it for
 * LocalBusiness types since 2019 — and inventing the numbers behind it risks a
 * structured-data manual action on the whole property.
 *
 * So this stays empty until there are real reviews to count, at which point set
 * `ratingValue` and `reviewCount` to what the Business Profile actually shows,
 * and surface the reviews on the page as well: markup has to describe content a
 * visitor can see.
 */
export const AGGREGATE_RATING: { ratingValue: number; reviewCount: number } | null = null;
