/**
 * Simplified Chinese translation of content/ui.ts.
 *
 * Typed against the English module, so a missing or renamed key fails the
 * build rather than rendering `undefined` on a page nobody checked.
 * Terminology decisions live in content/zh/glossary.md.
 */
import type { Widen } from '../i18n';
import type { UI as EnUI } from '../ui';

export const UI: Widen<typeof EnUI> = {
  // Full-width comma, per the rest of the Chinese copy.
  locality: '西温哥华，卑诗省',

  header: {
    backToTop: 'Orbis Accounting，回到顶部',
    services: '服务项目',
    plans: '方案',
    questions: '常见问题',
    ctaFull: '获取方案与报价',
    ctaShort: '获取报价',
    call: '致电',
  },

  footer: {
    services: '服务项目',
    plans: '方案',
    remote: '远程记账',
    gstPst: 'GST 与 PST',
    catchUp: '补做旧账',
    questions: '常见问题',
    getQuote: '获取报价',
    privacy: '隐私政策',
    terms: '服务条款',
    serving: '服务全卑诗省',
    copyright: '© 2026 Orbis Accounting',
  },

  languageToggle: {
    label: '语言',
    toEnglish: 'English',
    toChinese: '中文',
  },

  hero: {
    // 第三段是主要差异点，原本整个首屏都没有提到。见 content/ui.ts 的说明。
    eyebrow: '卑诗省小型企业记账服务 · 西温哥华 · 中英双语',
    headline: '账目清楚，',
    headlineEm: '按时申报。',
    sub: 'GST 交给 CRA，PST 交给省政府，每月还有一份你真的读得懂的报表。每个月由同一个人处理你的账，你不必反复解释自己的生意。',
    cta: '获取方案与报价',
    reassure: '一个工作日内提供书面方案与价格',
  },

  /** Eyebrows reuse the existing section translations verbatim, so the acts
      cannot drift from the sections they preview. */
  heroSequence: {
    cue: '看看具体怎么做',
    acts: [
      {
        eyebrow: '通常的状况',
        headline: '两年的单据，',
        headlineEm: '装在一个箱子里。',
        p: '记账是经营生意当中，唯一没有人替你事先安排好的部分。',
      },
      {
        eyebrow: '为什么选 Orbis',
        headline: '每个月，',
        headlineEm: '都由同一个人处理。',
        p: '你不必每个季度都向一个新的名字重新解释自己的生意。',
      },
      {
        eyebrow: '我们负责什么',
        headline: '每一笔交易，',
        headlineEm: '都归好类。',
        p: '每个账户都对过账，月度账目按时关账，而不是一直挂着。',
      },
    ],
  },

  pains: {
    eyebrow: '通常的状况',
    h2: '四件你多半正在忍受的事。',
    lede: '记账是经营生意当中，唯一没有人替你事先安排好的部分。',
  },

  why: {
    eyebrow: '为什么选 Orbis',
    h2: '刻意做得窄。',
  },

  services: {
    eyebrow: '我们负责什么',
    h2: '六件事，从你桌上拿走。',
    more: '每一项具体包含什么 →',
    worksWith: '支持的系统',
  },

  steps: {
    eyebrow: '流程',
    h2: '三个步骤，没有销售电话。',
  },

  pricing: {
    eyebrow: '方案',
    h2: '按工作量划分。',
    more: '价格是怎么算出来的，以及市场行情 →',
    mostChosen: '最多人选',
    cta: '获取方案与报价',
    oneTimeLabel: '一次性服务',
    catchUpName: '补做旧账',
    catchUpBody: '——先看你落后到什么程度再报价。一个数字，动工前谈定。',
    setupName: '软件设置与迁移',
    setupBody:
      '——一次性报价，适用于 QuickBooks Online、Xero 或 Sage 50。会计科目表、银行数据自动同步、系统对接，以及一次培训。',
    catchUpLink: '关于补做旧账的更多说明 →',
    notSure: '不包含：',
  },

  tax: {
    eyebrow: '说白了',
    h2: 'GST 和 PST 是两种不同的税。',
    noteBefore:
      '如果你只注册了其中一项，你并不特殊，而且这是可以补救的。在表格里说明，我们会在报价中把两项都核对一遍。税率数据截至 ',
    more: 'GST 与 PST 究竟差在哪里 →',
    noteAfter: '。',
    taxes: [
      {
        figure: '5%',
        name: 'GST',
        authority: '交给 CRA',
        body: '联邦税。一般来说，连续四个季度营业额超过 3 万加元后就必须注册。多数销售都要收取，而你为业务采购所支付的 GST 可以申报抵回。',
      },
      {
        figure: '7%',
        name: 'PST',
        authority: '交给省政府',
        body: '省级税，且完全独立：注册不同、截止日期不同、应税项目清单也不同。许多服务免税，多数商品则不免。它没有可以抵回的进项税额。',
      },
    ],
  },

  trust: {
    certEyebrow: '认证资格',
    certP:
      'QuickBooks Online 高级 ProAdvisor，是标准认证之上的一级，另持有 Intuit 薪资认证。Xero 和 Sage 50 同样持有认证，而不只是会用。',
    badgePlaceholder: 'QuickBooks 高级 ProAdvisor 徽章待提供',
    whoEyebrow: '我们的客户类型',
    commitEyebrow: '我们的承诺',
    commitment: '每一份查询，都会在一个工作日内收到书面方案与价格。',
  },

  faq: {
    eyebrow: '常见问题',
    h2: '大家真正会问的那些。',
    intro: '如果这里没有你的问题，写在表格里，我们会在回复中一并解答。',
  },

  intake: {
    eyebrow: '获取方案与报价',
    headline: '告诉我们',
    headlineSecond: '目前的真实状况。',
    p: '大约三分钟。没有销售电话，在你点头之前也不会设置任何东西。',
    emailLabel: '或直接发邮件给我们',
    phoneLabel: '电话',
  },

  wechat: {
    label: '微信',
    idLabel: '微信号',
    scan: '扫码添加我们的微信',
    copy: '复制',
    copied: '已复制',
    copyAria: '复制微信号',
  },

  form: {
    detailsLegend: '你的资料',
    booksLegend: '你的账务',
    wordsLegend: '你的说明',
    name: '姓名',
    namePlaceholder: '陈志明',
    email: '电子邮箱',
    emailPlaceholder: 'you@company.ca',
    business: '公司名称',
    businessPlaceholder: 'Reyes Contracting Ltd.',
    phone: '电话',
    phoneOptional: '选填',
    phonePlaceholder: '604-555-0134',
    notes: '你目前最需要帮忙的是什么',
    notesPlaceholder: '一箱两年份的收据，还有一份没报的 GST 申报表。',
    submit: '发送我的资料',
    sending: '发送中…',
    note: '我们会在一个工作日内回复。你的资料只用于撰写报价，不作其他用途。没有电子报，也不会加入邮件名单。',
    errorName: '我们需要一个称呼，才知道回复要写给谁。',
    errorBusiness: '公司叫什么名字？报价上会用到。',
    errorEmail: '这个邮箱地址看起来不太对，要不要检查一下有没有打错？',
    errorSendBefore: '没有发送成功。请再试一次，或直接发邮件到 ',
    errorSendAfter: '。',
    sentH: '收到了。',
    sentPBefore: '你会在一个工作日内收到书面方案和固定月费。邮件来自 ',
    sentPAfter: '，如果你的邮箱过滤较严，请先把这个地址加入白名单。',
    sentAgain: '再发一份',
  },

  servicesPage: {
    eyebrow: '我们负责什么',
    headline: '记账服务，',
    headlineEm: '专为卑诗省小型企业。',
    sub: '六件事，从你桌上拿走：每月记账、GST 与 PST 申报、薪资与 T4、财务报表、软件设置，以及补做旧账。全部在西温哥华完成，服务卑诗省各地的企业。',
    boundaryEyebrow: '界线在哪里',
    worksWith: '支持的系统',
    platformsNoteA:
      '我们使用 QuickBooks Online、Xero 和 Sage 50，你可以继续用现在这套。Shopify 和 Stripe 都能接入这三套，而且',
    platformsLinkRemote: '全部工作都以远程方式完成',
    platformsNoteB: '——没有东西需要送来。',
    platformsLinkPricing: '看看方案如何划分',
    platformsNoteC: '，或者',
    platformsLinkQuestions: '读一读大家真正会问的问题',
    platformsNoteD: '。',
  },

  pricingPage: {
    eyebrow: '方案与价格',
    headline: '记账到底',
    headlineEm: '要花多少钱。',
    sub: '我们采用与你交易笔数相符的固定月费，而不是按小时计费。以下说明这个数字是怎么构成的、什么会影响它，以及市场上其他人怎么收费。',
    howEyebrow: '运作方式',
    howH2: '四件始终成立的事。',
    marketEyebrow: '市场行情',
    marketH2: '关于花多少钱的老实答案。',
    factorsEyebrow: '什么会影响价格',
    factorsH2: '我们会看的五件事。',
    plansEyebrow: '方案',
    plansH2: '按工作量划分。',
    plansLede: '三个方案，依交易笔数划分。如果不确定属于哪一档，往低了猜，我们会在报价中告诉你。',
    setupBody: '——一次性报价，适用于 QuickBooks Online、Xero 或 Sage 50。',
    setupLink: '看看设置服务包含什么',
    setupAfter: '。',
  },

  remotePage: {
    eyebrow: '远程与线上记账',
    headline: '远程记账，',
    headlineEm: '服务全卑诗省。',
    sub: '没有东西要送来，不必到访办公室，也不会有一信封收据一直放在车上。你的账每个月由同一个人在线上完成——无论你在西温哥华隔两条街，还是在高速公路尽头六小时车程之外。',
    howEyebrow: '实际怎么运作',
    howH2: '四件事，让「送资料」变得没有必要。',
    howLede:
      '「远程」并不是在面对面流程上勉强加装的折衷方案。现代记账的几乎每一个环节，本来就已经在线上进行。',
    monthEyebrow: '一个月是什么样子',
    monthH2: '什么都不会堆积。',
    tradeoffEyebrow: '远程还是本地',
    tradeoffH2: '你得到什么，又放弃什么。',
    areasEyebrow: '适用范围',
    areasH2: '整个卑诗省，价格相同。',
    areasLede:
      '因为整套做法本来就不依赖「离得近」，你的公司在哪里并不会改变服务范围或价格。我们位于西温哥华，服务遍及全省。',
    faqEyebrow: '常见问题',
    faqH2: '关于远程的那些疑问。',
    faqIntroA: '其余问题在',
    faqIntroLink: '主页',
    faqIntroB: '，或者写在表格里，我们会在回复中一并解答。',
    ctaH2: '告诉我们目前的状况。',
    ctaP: '十个简短问题，大约三分钟。一个工作日内你会收到书面的服务范围和固定月费——没有销售电话，在你点头之前也不会设置任何东西。',
    ctaLinkServices: '我们负责什么',
    ctaLinkPricing: '方案如何划分',
  },

  contactPage: {
    stepsEyebrow: '接下来会发生什么',
    stepsH2: '三个步骤，没有销售电话。',
    expectEyebrow: '你可以期待什么',
    expectH2: '一封书面回复，而不是一张会议邀请。',
    reachEyebrow: '直接联系我们',
    emailLabel: '电子邮箱',
    phoneLabel: '电话',
    hoursEyebrow: '服务时间',
    hours: '周一至周五，太平洋时间上午 9 点至下午 5 点。在此之外送出的查询，会在下一个工作日回复。',
    whereEyebrow: '服务范围',
    whereP: '我们服务卑诗省各地的企业，所有工作都在线上完成——没有东西需要送来，也不需要到办公室见面。',
    linkServices: '我们负责什么',
    linkPricing: '方案如何划分',
  },

  notFound: {
    eyebrow: '404',
    headline: '这个页面',
    headlineEm: '不在这里。',
    sub: '链接可能已经过期，或者页面已经移走。本站的全部内容就是下面这几个。',
    home: '首页',
    services: '记账服务',
    pricing: '方案与价格',
    contact: '获取方案与报价',
  },

  gstPstPage: {
    eyebrow: '卑诗省的 GST 与 PST',
    headline: '两种税，',
    headlineEm: '两套规则。',
    sub: 'GST 交给 CRA，PST 交给省政府。两者分别注册、分别申报，对什么应税的看法也不一致——而且注册了其中一项，完全说明不了你是否也该注册另一项。',
    ratesEyebrow: '税率',
    comparisonEyebrow: '并排对照',
    comparisonH2: '两者真正的差别在哪里。',
    gstLabel: 'GST',
    pstLabel: 'PST',
    mistakesEyebrow: '常见的问题',
    mistakesH2: '四种最容易栽跟头的情况。',
    whatWeDoEyebrow: '我们会做什么',
    ctaH2: '不确定自己注册了哪一项？',
    ctaP: '在表格里说明即可。我们会对照你实际销售的内容核对两项，并在书面报价中确认清楚，然后才会去申报任何东西。',
  },

  catchUpPage: {
    eyebrow: '补做旧账',
    headline: '账目落后了。',
    headlineEm: '这是可以解决的。',
    sub: '落后几个月甚至几年，是大多数人来找我们的原因。我们会先看落后到什么程度，在动工之前把整件事报成一个数字，然后清掉积压、补上该报的申报。',
    stagesEyebrow: '落后多久',
    stagesH2: '你在这份清单的哪个位置。',
    processEyebrow: '流程',
    processH2: '四个步骤，一个数字。',
    reassuranceEyebrow: '把话说清楚',
    ctaH2: '告诉我们大概落后多久。',
    ctaP: '答得粗略没关系，「不确定」也是有效答案。一个工作日内你会收到书面的服务范围和补做旧账的单一金额——没有销售电话，在你同意这个数字之前不会开始任何工作。',
  },

  legal: {
    translationNote: '本页为英文版的中文译本，仅供参考；如中英文版本有任何不一致，以英文版为准。',
  },
};
