import { LOCALES, LOCALE_SLUG, localizePath, type BuiltLocale } from './i18n';

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
  /**
   * The route's identity, and its English URL where one is built. Each locale
   * prefixes it — `/services` becomes `/zh/services` — so a page that exists in
   * only some languages still needs a path here; see `only` below.
   */
  path: string;
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
   * The locales this route is built in. Omit for a page that exists in every
   * language, which is nearly all of them.
   *
   * Set it for a page that answers a question only one audience asks. Chinese
   * search demand is not a translation of English search demand: the
   * Chinese-language audit found the market's central confusion is 记账 versus
   * 报税 — bookkeeping versus tax filing — which has no English equivalent
   * because the two are already understood as separate purchases here.
   * Translating such a page into English would produce a page nobody searches
   * for.
   */
  only?: readonly BuiltLocale[];
  /**
   * Title, description and crumb per locale. Keyed on `BuiltLocale`, so adding
   * a language to LOCALES fails the build here until every route has text for
   * it — which is the point. This used to be an English block at the top level
   * and a single nested `zh`, and `ALL_ROUTES` resolved it with
   * `locale === 'en' ? english : zh`. A third language would have taken the
   * else branch and served Simplified titles, descriptions and breadcrumbs on
   * every Traditional page, with no type error and no failed build.
   */
  text: Record<BuiltLocale, RouteText>;
}

export const ROUTES: RouteMeta[] = [
  {
    path: '/',
    priority: '1.0',
    changefreq: 'monthly',
    faq: 'home',
    text: {
      en: {
        title: 'Bookkeeping Services in Vancouver & BC | Fixed Monthly',
        description:
          'Fixed monthly bookkeeping for BC small business, from West Vancouver. GST and PST both filed, plans sized to your volume, a written quote in one day.',
      },
      'zh-hans': {
        title: '温哥华记账服务 | 小生意固定月费 · GST/PST申报 | Orbis',
        description:
          '西温出发，服务温哥华及全 BC省的小生意记账。GST 与 PST 都代为申报，工资 T4 一并处理，中英双语沟通，按交易量定价，一个工作日内出书面报价。',
      },
    },
  },
  {
    path: '/services',
    priority: '0.9',
    changefreq: 'monthly',
    text: {
      en: {
        title: 'Bookkeeping Services in BC: GST, PST, Payroll, Catch-Up',
        description:
          'Monthly bookkeeping, GST and PST filing, payroll and T4s, reporting, software setup and catch-up work for BC small business, at a fixed monthly price.',
        crumb: 'Services',
      },
      'zh-hans': {
        title: '温哥华记账服务内容：对账、GST/PST申报、工资 T4、补做旧账 | Orbis',
        description:
          '每月对账结账、GST 与 PST 申报、工资与 T4、财务报表、软件设置，以及补做旧账。服务温哥华及全 BC省的小生意，中英双语，固定月费，不按小时计费。',
        crumb: '服务项目',
      },
    },
  },
  {
    path: '/remote-bookkeeping',
    priority: '0.9',
    changefreq: 'monthly',
    // The page renders its own FAQ, but deliberately carries no FAQPage markup.
    // Google stopped showing FAQ rich results on 7 May 2026, so adding the
    // schema to a new page buys nothing; the questions are there for readers.
    text: {
      en: {
        title: 'Remote & Virtual Bookkeeping in BC | Orbis Accounting',
        description:
          'Remote bookkeeping for BC small business. No drop-offs and no office visit — how the work happens online, what a month looks like, and what it costs you.',
        crumb: 'Remote bookkeeping',
      },
      // Handle with care. This page ranks #3 for 温哥华 记账 — the best position
      // anything on this site holds in either language — so the title gains
      // 温哥华 and nothing else, and the URL is not touched at all. Verify the
      // position holds for four weeks before changing anything further here.
      'zh-hans': {
        title: '远程线上记账服务 · 全 BC省 · 温哥华 | Orbis Accounting',
        description:
          '面向温哥华及全 BC省小生意的远程线上记账。没有东西要送来，也不必到访办公室——线上怎么运作、一个月是什么样子，以及你放弃了什么。中英双语。',
        crumb: '远程记账',
      },
    },
  },
  {
    path: '/gst-pst-bc',
    priority: '0.9',
    changefreq: 'monthly',
    text: {
      en: {
        title: 'GST and PST in BC: What Small Businesses Must Know',
        description:
          'GST goes to the CRA, PST goes to the province. Where the two differ, when each one requires registration, and the four mistakes that catch BC owners out.',
        crumb: 'GST and PST in BC',
      },
      // BC省 rather than BC省, and deliberately so. BC省 is the Vancouver
      // Chinese press standard and is right everywhere else on the site, but on
      // tax queries specifically the Mainland abbreviation is what gets typed.
      // The structure mirrors the forum thread currently holding position 19 for
      // this cluster: 完整指南 is the format signal the SERP rewards.
      'zh-hans': {
        title: 'BC省 GST 与 PST 完整指南：区别、注册、申报与豁免 | Orbis',
        description:
          'BC省消费税 GST 5% 加 PST 7%，合计 12%。两者的区别、各自何时必须注册、怎么申报、哪些可以豁免，以及最容易出错的地方。附计算器，中英双语。',
        crumb: 'GST 与 PST',
      },
    },
  },
  {
    path: '/bc-pst-registration',
    priority: '0.9',
    changefreq: 'monthly',
    text: {
      en: {
        title: 'BC PST Registration: Do You Need to Register?',
        description:
          'Whether you have to register for PST in BC, what the province needs from you, and what changes once you do. It turns on what you sell, not on revenue.',
        crumb: 'PST registration',
      },
      // BC省 for the same reason as /gst-pst-bc above: this is a tax query.
      'zh-hans': {
        title: 'BC省 PST 注册指南：谁需要注册、怎么注册 | Orbis',
        description:
          '你在 BC省 是否必须注册 PST、要准备哪些资料、怎么在 eTaxBC 办理，以及注册之后有什么不同。它取决于你卖什么，而不是营业额。中英双语，服务温哥华。',
        crumb: 'PST 注册',
      },
    },
  },
  {
    path: '/catch-up-bookkeeping',
    priority: '0.9',
    changefreq: 'monthly',
    text: {
      en: {
        title: 'Catch-Up Bookkeeping in BC | Behind on Your Books?',
        description:
          'Months or years behind is the most common reason BC owners call. How far behind you are, what clearing it involves, and one number agreed up front.',
        crumb: 'Catch-up bookkeeping',
      },
      'zh-hans': {
        title: '账目落后一年怎么办？温哥华补做旧账服务 | Orbis',
        description:
          '账目落后几个月甚至几年，是大多数人来找我们的原因。你落后到什么程度、清理要做哪些事，以及一个在动工之前就谈定的单一报价。中英双语，服务温哥华。',
        crumb: '补做旧账',
      },
    },
  },
  {
    path: '/pricing',
    priority: '0.9',
    changefreq: 'monthly',
    text: {
      en: {
        title: 'What Does a Bookkeeper Cost in BC? Plans & Pricing',
        description:
          'What a bookkeeper costs in BC, what moves the number, and how our fixed monthly plans are scoped. A written quote in one business day, and no hourly billing.',
        crumb: 'Plans and pricing',
      },
      // A question, and city-led. Published pricing is close to nonexistent in
      // this market — the competing firms say 请联系我们 throughout — so the
      // candour the English page already has travels unusually well here.
      'zh-hans': {
        title: '温哥华记账收费标准：小生意一个月多少钱？| Orbis',
        description:
          '在温哥华请人记账一个月要多少钱、哪些因素会影响价格，以及我们的固定月费方案怎么划分。中英双语，一个工作日内出书面报价，不按小时计费。',
        crumb: '方案与价格',
      },
    },
  },
  {
    path: '/contact',
    priority: '0.9',
    changefreq: 'monthly',
    text: {
      en: {
        title: 'Get a Bookkeeping Quote in BC | Orbis Accounting',
        description:
          'Tell us where your books stand and get a written plan and a fixed monthly price within one business day. No sales call, and nothing set up until you say yes.',
        crumb: 'Contact',
      },
      'zh-hans': {
        title: '温哥华记账报价 · 一个工作日内书面回复 | Orbis',
        description:
          '告诉我们你的账目现况，一个工作日内收到书面方案与固定月费。没有销售电话，在你同意之前不会开始任何工作。中英双语，也可以直接用微信联系我们。',
        crumb: '联系我们',
      },
    },
  },
  {
    path: '/bookkeeping-vs-tax-filing',
    priority: '0.8',
    changefreq: 'monthly',
    // Chinese only. The English market already treats bookkeeping and tax filing
    // as separate purchases, so the English version of this page would answer a
    // question nobody asks. In Chinese it is the market's central confusion —
    // the mental model is 会计师帮我报税, and monthly bookkeeping is not an
    // established category — which makes it the highest-converting page
    // available in this language and the one that has no English counterpart.
    only: ['zh-hans'],
    text: {
      en: {
        // Not built. Kept because RouteText is required per locale, and because
        // an English version is a real option later if the split between the
        // monthly work and the year-end return needs stating in both languages.
        title: 'Bookkeeping vs tax filing',
        description:
          'What the monthly work covers, what the year-end return covers, and why a small business needs both. Not built in English — see the `only` field above.',
        crumb: 'Bookkeeping vs tax filing',
      },
      'zh-hans': {
        title: '记账和报税有什么区别？温哥华小生意必读 | Orbis',
        description:
          '每月账务包含什么，年终申报包含什么，为什么两项都不能省，以及账目完整对年终费用的影响。面向温哥华及全 BC省的小型企业，中英双语，T1 与 T2 申报均可承接。',
        crumb: '记账与报税',
      },
    },
  },
  {
    path: '/privacy-policy',
    priority: '0.2',
    changefreq: 'yearly',
    text: {
      en: {
        title: 'Privacy Policy | Orbis Accounting',
        description:
          'How Orbis Accounting collects, uses and protects your information, what the enquiry form does with what you send, and what website analytics records.',
        crumb: 'Privacy policy',
      },
      'zh-hans': {
        title: '隐私政策 | Orbis Accounting',
        description:
          'Orbis Accounting 如何收集、使用和保护你的信息，查询表格如何处理你发送的内容，网站分析记录了什么，以及你可以要求我们做什么。',
        crumb: '隐私政策',
      },
    },
  },
  {
    path: '/terms-of-service',
    priority: '0.2',
    changefreq: 'yearly',
    text: {
      en: {
        title: 'Terms of Service | Orbis Accounting',
        description:
          'The terms that apply to bookkeeping engagements with Orbis Accounting: scope of work, fees, the responsibilities on both sides, and how an engagement ends.',
        crumb: 'Terms of service',
      },
      'zh-hans': {
        title: '服务条款 | Orbis Accounting',
        description:
          '与 Orbis Accounting 合作记账时适用的条款：服务范围、费用与付款方式、双方各自的责任、保密与资料归属，以及合作如何开始与如何终止。',
        crumb: '服务条款',
      },
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
  /**
   * The unprefixed path, which is the identifier every language shares and the
   * key `PAGE_FOR` and scripts/lastmod.mjs are indexed by.
   *
   * Not necessarily a URL that exists. A route carrying `only` is built in some
   * languages and not others, so this can name a page with no English version —
   * which is why `hreflangFor` in scripts/prerender.mjs checks how many
   * languages a route resolved to before pointing `x-default` at it.
   */
  englishPath: string;
  locale: BuiltLocale;
  /**
   * The locale's URL prefix and content directory — `''` for English, `zh` for
   * Simplified Chinese. Carried here so scripts/lastmod.mjs can find the copy
   * behind a route without keeping its own copy of LOCALE_SLUG; that file is
   * plain JS and runs before the SSR bundle is loaded.
   */
  slug: string;
  priority: string;
  changefreq: 'monthly' | 'yearly';
  faq?: 'home' | 'remote';
}

/**
 * Every route in every language it is built in — the list the prerender step
 * walks, the app registers routes from, and the sitemap is written from.
 *
 * Derived rather than hand-written, so adding a language or a page cannot leave
 * one of the halves behind. That claim used to be half true: the flatMap
 * generalised, but the text lookup inside it was
 * `locale === 'en' ? english : zh` — an else branch that would have served
 * Simplified titles and descriptions on every page of a third language without
 * a type error or a failed build. It reads the per-locale map now, so a missing
 * translation is a compile error in ROUTES above.
 */
/**
 * Whether a route is built in a given language.
 *
 * For navigation that has to survive a page existing in some languages and not
 * others — the footer would otherwise link every reader to a URL that only
 * resolves for some of them, which is a 404 for the rest and an orphan for the
 * page itself.
 */
export const routeExists = (englishPath: string, locale: BuiltLocale): boolean =>
  ALL_ROUTES.some((route) => route.englishPath === englishPath && route.locale === locale);

export const ALL_ROUTES: ResolvedRoute[] = ROUTES.flatMap((route) =>
  LOCALES.filter((locale) => route.only === undefined || route.only.includes(locale)).map(
    (locale) => ({
      ...route.text[locale],
      path: localizePath(route.path, locale),
      englishPath: route.path,
      locale,
      slug: LOCALE_SLUG[locale],
      priority: route.priority,
      changefreq: route.changefreq,
      faq: route.faq,
    }),
  ),
);
