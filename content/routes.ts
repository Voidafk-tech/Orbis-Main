import { LOCALES, localizePath, type Locale } from './i18n';

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

/** Title, description and breadcrumb label for one route in one language. */
export interface RouteText {
  /** Aim for under about 60 characters — Google truncates past that. */
  title: string;
  /** Aim for about 150 characters. English only; CJK truncates by width, not count. */
  description: string;
  /** Short label for the BreadcrumbList JSON-LD. Omitted on the home page. */
  crumb?: string;
}

export interface RouteMeta {
  /** The English path. The Chinese one is this prefixed with /zh. */
  path: string;
  /** Aim for under about 60 characters — Google truncates past that. */
  title: string;
  /** Aim for about 150 characters. */
  description: string;
  /**
   * Not emitted, and not a mistake. Google has said for years that it ignores
   * both `<priority>` and `<changefreq>`, so scripts/prerender.mjs leaves them
   * out of the sitemap rather than publishing values nothing reads. They are
   * kept here only because they cost nothing and would be needed by a crawler
   * that does honour them; the sitemap's one real hint is `lastmod`, which
   * comes from git — see scripts/lastmod.mjs.
   */
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
  /** The same three fields in Simplified Chinese, for the /zh/ counterpart. */
  zh: RouteText;
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
    zh: {
      title: '卑诗省小型企业记账服务 | 固定月费 | Orbis',
      description:
        '西温哥华的卑诗省小型企业记账服务。GST 与 PST 都代为申报，方案按交易量划分，一个工作日内提供书面报价。',
    },
  },
  {
    path: '/services',
    title: 'Bookkeeping Services in BC: GST, PST, Payroll, Catch-Up',
    description:
      'Monthly bookkeeping, GST and PST filing, payroll and T4s, reporting, software setup and catch-up work for BC small business, at a fixed monthly price.',
    priority: '0.9',
    changefreq: 'monthly',
    crumb: 'Services',
    zh: {
      title: '卑诗省记账服务：GST、PST、薪资、补做旧账 | Orbis',
      description:
        '每月记账、GST 与 PST 申报、薪资与 T4、财务报表、软件设置与补做旧账，服务卑诗省小型企业，固定月费。',
      crumb: '服务项目',
    },
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
    zh: {
      title: '远程与线上记账服务 · 全卑诗省 | Orbis',
      description:
        '面向卑诗省小型企业的远程记账。没有东西要送来，不必到访办公室——线上如何运作、一个月是什么样子，以及你放弃了什么。',
      crumb: '远程记账',
    },
  },
  {
    path: '/gst-pst-bc',
    title: 'GST and PST in BC: What Small Businesses Must Know',
    description:
      'GST goes to the CRA, PST goes to the province. Where the two differ, when each one requires registration, and the four mistakes that catch BC owners out.',
    priority: '0.9',
    changefreq: 'monthly',
    crumb: 'GST and PST in BC',
    zh: {
      title: '卑诗省的 GST 与 PST：小型企业须知 | Orbis',
      description:
        'GST 交给 CRA，PST 交给省政府。两者的差别在哪里、各自何时必须注册，以及最容易让卑诗省企业主栽跟头的四种情况。',
      crumb: 'GST 与 PST',
    },
  },
  {
    path: '/bc-pst-registration',
    title: 'BC PST Registration: Do You Need to Register?',
    description:
      'Whether you have to register for PST in BC, what the province needs from you, and what changes once you do. It turns on what you sell, not on revenue.',
    priority: '0.9',
    changefreq: 'monthly',
    crumb: 'PST registration',
    zh: {
      title: '卑诗省 PST 注册：你需要注册吗？| Orbis',
      description:
        '你在卑诗省是否必须注册 PST、省政府需要哪些资料，以及注册之后有什么不同。它取决于你卖什么，而不是营业额。',
      crumb: 'PST 注册',
    },
  },
  {
    path: '/catch-up-bookkeeping',
    title: 'Catch-Up Bookkeeping in BC | Behind on Your Books?',
    description:
      'Months or years behind is the most common reason BC owners call. How far behind you are, what clearing it involves, and one number agreed up front.',
    priority: '0.9',
    changefreq: 'monthly',
    crumb: 'Catch-up bookkeeping',
    zh: {
      title: '补做旧账 · 卑诗省记账服务 | Orbis Accounting',
      description:
        '落后几个月甚至几年，是大多数人来电的原因。你落后到什么程度、清理需要做什么，以及一个在动工前就谈定的单一报价。',
      crumb: '补做旧账',
    },
  },
  {
    path: '/pricing',
    title: 'What Does a Bookkeeper Cost in BC? Plans & Pricing',
    description:
      'What a bookkeeper costs in BC, what moves the number, and how our fixed monthly plans are scoped. A written quote in one business day, and no hourly billing.',
    priority: '0.9',
    changefreq: 'monthly',
    crumb: 'Plans and pricing',
    zh: {
      title: '在卑诗省请记账员要多少钱？方案与价格 | Orbis',
      description:
        '在卑诗省请记账员的费用、哪些因素会影响价格，以及我们的固定月费方案如何划分。一个工作日内书面报价，不按小时计费。',
      crumb: '方案与价格',
    },
  },
  {
    path: '/contact',
    title: 'Get a Bookkeeping Quote in BC | Orbis Accounting',
    description:
      'Tell us where your books stand and get a written plan and a fixed monthly price within one business day. No sales call, and nothing set up until you say yes.',
    priority: '0.9',
    changefreq: 'monthly',
    crumb: 'Contact',
    zh: {
      title: '获取方案与报价 | Orbis Accounting',
      description:
        '告诉我们你的账目现况，一个工作日内获得书面方案与固定月费。没有销售电话，也没有任何义务。',
      crumb: '联系我们',
    },
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy | Orbis Accounting',
    description:
      'How Orbis Accounting collects, uses and protects your information, what the enquiry form does with what you send, and what website analytics records.',
    priority: '0.2',
    changefreq: 'yearly',
    crumb: 'Privacy policy',
    zh: {
      title: '隐私政策 | Orbis Accounting',
      description:
        'Orbis Accounting 如何收集、使用和保护你的信息，查询表格如何处理你发送的内容，以及网站分析记录了什么。',
      crumb: '隐私政策',
    },
  },
  {
    path: '/terms-of-service',
    title: 'Terms of Service | Orbis Accounting',
    description:
      'The terms that apply to bookkeeping engagements with Orbis Accounting: scope of work, fees, the responsibilities on both sides, and how an engagement ends.',
    priority: '0.2',
    changefreq: 'yearly',
    crumb: 'Terms of service',
    zh: {
      title: '服务条款 | Orbis Accounting',
      description:
        '与 Orbis Accounting 合作时适用的条款：服务范围、费用、双方各自的责任，以及合作如何终止。',
      crumb: '服务条款',
    },
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

/** One route in one language, with its path already localized. */
export interface ResolvedRoute extends RouteText {
  /** The localized path: `/services` in English, `/zh/services` in Chinese. */
  path: string;
  /** The English path, which is the identifier the two languages share. */
  englishPath: string;
  locale: Locale;
  priority: string;
  changefreq: 'monthly' | 'yearly';
  faq?: 'home' | 'remote';
}

/**
 * Every route in every language — the list the prerender step walks and the
 * app reads titles from. Derived rather than hand-written, so adding a language
 * or a page cannot leave one of the two halves behind.
 */
export const ALL_ROUTES: ResolvedRoute[] = ROUTES.flatMap((route) =>
  LOCALES.map((locale) => {
    const text: RouteText =
      locale === 'en'
        ? { title: route.title, description: route.description, crumb: route.crumb }
        : route.zh;

    return {
      ...text,
      path: localizePath(route.path, locale),
      englishPath: route.path,
      locale,
      priority: route.priority,
      changefreq: route.changefreq,
      faq: route.faq,
    };
  }),
);
