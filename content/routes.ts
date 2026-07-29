/**
 * Every route, and the metadata that describes it. One list, read twice:
 *
 *   - scripts/prerender.mjs bakes the head tags, decides which routes carry
 *     which structured data, and writes the sitemap from it;
 *   - components/App.tsx sets document.title from it on client-side navigation.
 *
 * Keeping them on one list is the point. Titles previously lived in both places
 * and could disagree, which shows up as a page whose tab says one thing and
 * whose search result says another.
 */

export interface RouteMeta {
  path: string;
  /** Aim for under about 60 characters — Google truncates past that. */
  title: string;
  /** Aim for about 150 characters. */
  description: string;
  /** Sitemap hints. */
  priority: string;
  changefreq: 'monthly' | 'yearly';
  /**
   * Which FAQ set this page's JSON-LD should declare, if any. Must only be set
   * on a route that actually shows those questions — structured data describing
   * content a visitor cannot see is a violation.
   *
   * Only the home page sets it, and only because the markup was already there
   * and is now generated rather than hand-maintained. Do not add it to a new
   * page: FAQ rich results were withdrawn on 7 May 2026, so it produces no
   * search feature and is pure weight.
   */
  faq?: 'home' | 'remote';
  /**
   * Short label for the BreadcrumbList JSON-LD, which is what Google shows in
   * place of the raw URL under a search result. Omitted on the home page, which
   * is the trail's root rather than a step in it.
   */
  crumb?: string;
}

export const ROUTES: RouteMeta[] = [
  {
    path: '/',
    title: 'Bookkeeping Services in Vancouver & BC | Fixed Monthly',
    description:
      'Fixed monthly bookkeeping for BC small business, from West Vancouver. GST and PST both filed, plans sized to your volume, a written quote in one day.',
    priority: '1.0',
    changefreq: 'monthly',
    faq: 'home',
  },
  {
    path: '/services',
    title: 'Bookkeeping Services: GST, PST, Payroll, Catch-Up | Orbis',
    description:
      'Monthly bookkeeping, GST and PST filing, payroll and T4s, reporting, software setup and catch-up work for BC small business, at a fixed monthly price.',
    priority: '0.9',
    changefreq: 'monthly',
    crumb: 'Services',
  },
  {
    path: '/remote-bookkeeping',
    title: 'Remote & Virtual Bookkeeping in BC | Orbis Accounting',
    description:
      'Remote bookkeeping for BC small business. No drop-offs and no office visit — how the work happens online, what a month looks like, and what it costs you.',
    priority: '0.9',
    changefreq: 'monthly',
    crumb: 'Remote bookkeeping',
    // The page renders its own FAQ, but deliberately carries no FAQPage markup.
    // Google stopped showing FAQ rich results on 7 May 2026, so adding the
    // schema to a new page buys nothing; the questions are there for readers.
  },
  {
    path: '/pricing',
    title: 'What Does a Bookkeeper Cost in BC? Plans & Pricing',
    description:
      'What a bookkeeper costs in BC, what moves the number, and how our fixed monthly plans are scoped. A written quote in one business day, and no hourly billing.',
    priority: '0.9',
    changefreq: 'monthly',
    crumb: 'Plans and pricing',
  },
  {
    path: '/contact',
    title: 'Get a Plan and a Quote | Orbis Accounting',
    description:
      'Tell us where your books stand and get a written plan and a fixed monthly price within one business day. No sales call, and nothing set up until you say yes.',
    priority: '0.9',
    changefreq: 'monthly',
    crumb: 'Contact',
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy | Orbis Accounting',
    description:
      'How Orbis Accounting collects, uses and protects your information, what the enquiry form does with what you send, and what website analytics records.',
    priority: '0.2',
    changefreq: 'yearly',
    crumb: 'Privacy policy',
  },
  {
    path: '/terms-of-service',
    title: 'Terms of Service | Orbis Accounting',
    description:
      'The terms that apply to bookkeeping engagements with Orbis Accounting: scope of work, fees, the responsibilities on both sides, and how an engagement ends.',
    priority: '0.2',
    changefreq: 'yearly',
    crumb: 'Terms of service',
  },
];

export const NOT_FOUND_META = {
  title: 'Page not found | Orbis Accounting',
  description: 'That page is not here. Links to everything the site has.',
} as const;

/**
 * Paths that existed before /services and /pricing became real pages, plus the
 * aliases people type. GitHub Pages cannot issue a 301 and a client-side
 * redirect only runs after a 404 has already been served, so the prerender step
 * writes each of these as a stub carrying a canonical to its destination and a
 * zero-delay meta refresh — the redirect signal a static host can give.
 *
 * Deliberately absent from the sitemap: a sitemap lists destinations, not the
 * URLs pointing at them.
 */
export const REDIRECTS = [
  { from: '/plans', to: '/pricing' },
  { from: '/process', to: '/#process' },
  { from: '/about', to: '/#why' },
  { from: '/growth-strategy', to: '/pricing' },
] as const;
