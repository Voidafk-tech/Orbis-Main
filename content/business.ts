/**
 * The practice as a local business: the facts Google cross-checks against the
 * Google Business Profile and directory listings.
 *
 * NAP consistency is the point. The name, address and phone here must match the
 * Business Profile character for character — a street abbreviated one way here
 * and another way there is a real, measurable drag on local rankings. If the
 * Business Profile is edited, edit this at the same time.
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
   * A band, not a quote — schema.org treats this as free text and Google reads
   * it as a rough affordability signal, not a price list.
   *
   * Note this is the one place the practice's own figures are published. The
   * rest of the site deliberately carries none; see the README.
   */
  priceRange: '$499-$1499',
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
];

/**
 * The certification, described so it is machine-readable rather than only an
 * image with alt text. For a solo professional practice a verifiable credential
 * is one of the few hard expertise signals available.
 */
export const CREDENTIAL = {
  name: 'QuickBooks Online Advanced ProAdvisor',
  issuer: 'Intuit',
} as const;

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
