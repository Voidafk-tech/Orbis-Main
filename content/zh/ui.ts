/**
 * Simplified Chinese translation of content/ui.ts.
 *
 * Typed against the English module, so a missing or renamed key fails the
 * build rather than rendering `undefined` on a page nobody checked.
 * Terminology decisions live in content/zh/glossary.md.
 *
 * Two conventions this file follows and the English one does not:
 *
 *   - Display type carries no punctuation. Every `h1`, `h2` and eyebrow ends
 *     without 。 and contains no ，— where a clause break is needed the copy is
 *     rewritten, or the headline is split across `headline` / `headlineEm`,
 *     which render as two lines. Body copy keeps full punctuation.
 *   - Terms that reach the reader in English stay in English: BC省, CRA, GST,
 *     PST, ROE, WorkSafeBC. See content/zh/glossary.md.
 */
import type { Widen } from '../i18n';
import type { UI as EnUI } from '../ui';
// Rates are figures, not copy. Both languages render the same numbers from the
// same constants, so a rate change cannot land in one language and not the other.
import { COMBINED_TAX_RATE, TAX_RATES, percent } from '../site';

export const UI: Widen<typeof EnUI> = {
  // Full-width comma, per the rest of the Chinese copy.
  locality: '西温哥华，BC省',

  header: {
    backToTop: 'Orbis Accounting，回到顶部',
    home: '首页',
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
    pstRegistration: 'PST 注册',
    vsTax: '记账 vs 报税',
    catchUp: '补做旧账',
    questions: '常见问题',
    getQuote: '获取报价',
    privacy: '隐私政策',
    terms: '服务条款',
    serving: '服务全 BC省',
    copyright: '© 2026 Orbis Accounting',
  },

  languageToggle: {
    label: '语言',
    toEnglish: 'English',
    toChinese: '中文',
  },

  hero: {
    // 第三段是主要差异点，原本整个首屏都没有提到。见 content/ui.ts 的说明。
    eyebrow: '大温地区代理记账 · 西温哥华 · 中英双语',
    headline: '账目准确',
    headlineEm: '申报及时',
    sub: 'GST 交给 CRA，PST 交给 BC省政府，每月另附一份表述清晰的财务报表。全年由同一位专责人员处理贵公司账务，无需反复说明业务情况。',
    cta: '获取方案与报价',
    reassure: '一个工作日内提供书面方案与价格',
  },

  pains: {
    h2: '四项多数经营者正在承担的负担',
    lede: '在经营一家企业所需的各项事务当中，账务是唯一没有人事先为您安排好的部分',
  },

  why: {
    eyebrow: '为什么选 Orbis',
    // 原文为「刻意做得窄。」。业务并不窄：每月账务与年终申报均承接，
    // 这一节的四项差异点正是由同一家机构同时承接两者所带来的。
    h2: '账务与报税 由同一家承接',
  },

  services: {
    h2: '八项服务 从您的日程中移除',
    more: '每一项具体包含什么 →',
    worksWith: '支持的系统',
  },

  steps: {
    h2: '三个步骤 无需销售通话',
  },

  pricing: {
    h2: '方案如何划分',
    more: '价格如何构成，以及市场行情 →',
    mostChosen: '最多人选',
    cta: '获取方案与报价',
    oneTimeLabel: '一次性服务',
    catchUpName: '补做旧账',
    catchUpBody: '——先评估落后程度再行报价。单一金额，动工之前确定。',
    setupName: '软件设置与迁移',
    setupBody:
      '——一次性报价，适用于 QuickBooks Online、Xero 或 Sage 50。包含会计科目表、系统对接及一次培训。',
    taxFilingName: '年终所得税申报',
    taxFilingBody:
      '——独资经营与自雇人士申报 T1，已注册公司申报 T2。与月度方案分开报价。',
    catchUpLink: '关于补做旧账的更多说明 →',
    notSure: '不包含：',
  },

  tax: {
    h2: 'GST 与 PST 是两种不同的税',
    noteBefore:
      '若贵公司仅注册了其中一项，这种情况相当普遍，且可以补正。请在表格中说明，我们会在报价中一并核对两项。税率数据截至 ',
    more: 'GST 与 PST 究竟差在哪里 →',
    noteAfter: '。',
    taxes: [
      {
        figure: percent(TAX_RATES.gst),
        name: 'GST',
        authority: '交给 CRA',
        body: '联邦税。一般而言，连续四个季度营业额超过 3 万加元后即须注册。多数销售均须收取，而为业务采购所支付的 GST 可申报抵扣。',
      },
      {
        figure: percent(TAX_RATES.pst),
        name: 'PST',
        authority: '交给 BC省政府',
        body: '省级税，且完全独立：注册程序、申报期限与应税项目清单均不相同。多数服务免税，多数商品则须课税。此项税款没有可抵扣的进项税额。',
      },
    ],
  },

  // 计算器界面用词按中文 SEO 手册第 3.2 节。BC省消费税 而不是 BC省销售税：
  // 查税率的人搜的是「BC省税是多少」，而 消费税 是 GST/PST 在本地最自然的说法。
  // 税种后面补上 联邦税 / 省税，是因为搜索时中英文常常混着用。
  taxCalculator: {
    eyebrow: '税额试算',
    h2: 'BC省消费税计算器',
    subBefore: `GST ${percent(TAX_RATES.gst)} + PST ${percent(TAX_RATES.pst)} = `,
    subCombined: `合计 ${percent(COMBINED_TAX_RATE)}`,
    subAfter: '，适用于 BC省大部分商品。',
    modeLabel: '计算方向',
    forwardTab: '税前金额算总价',
    reverseTab: '总价倒推税前金额',
    forwardLabel: '税前金额（加元）',
    reverseLabel: '含税总额（加元）',
    resultsLabel: '计算结果',
    subtotal: '税前小计',
    gst: `GST 联邦税（${percent(TAX_RATES.gst)}）`,
    pst: `PST 省税（${percent(TAX_RATES.pst)}）`,
    total: '总计',
    noteBefore: '多数商品两种税均须收取。许多服务免收 PST，但仍须收取 GST——',
    noteLink: '查看哪些应税、哪些免税',
    noteAfter: '。税率数据截至 ',
    noteEnd: '。',
    noscript: '计算器需要 JavaScript。上方数字以 100 加元的消费为例，算法为税率乘以金额。',
  },

  trust: {
    certEyebrow: '认证资格',
    badgePlaceholder: 'QuickBooks 高级 ProAdvisor 徽章待提供',
    whoEyebrow: '我们的客户类型',
    commitEyebrow: '我们的承诺',
    commitment: '每一份查询，均于一个工作日内收到书面方案与价格。',
  },

  faq: {
    h2: '客户最常提出的问题',
    intro: '若此处没有您的问题，请写在表格中，我们会在回复时一并解答。',
  },

  intake: {
    eyebrow: '获取方案与报价',
    headline: '请说明贵公司',
    headlineSecond: '目前的实际状况',
    p: '约需三分钟。没有销售电话，在您确认之前不会设置任何内容。',
    emailLabel: '或直接发送邮件',
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
    detailsLegend: '基本信息',
    booksLegend: '账务状况',
    wordsLegend: '补充说明',
    name: '姓名',
    namePlaceholder: '陈志明',
    email: '电子邮箱',
    emailPlaceholder: 'you@company.ca',
    business: '公司名称',
    businessPlaceholder: 'Reyes Contracting Ltd.',
    phone: '电话',
    phoneOptional: '选填',
    phonePlaceholder: '604-555-0134',
    notes: '目前最需要协助的事项',
    notesPlaceholder: '积压两年的单据，以及一份尚未提交的 GST 申报表。',
    submit: '发送',
    sending: '发送中…',
    note: '我们会在一个工作日内回复。您提供的信息仅用于编制报价，不作其他用途。我们没有电子报，也不会将您加入任何邮件名单。',
    errorName: '请留下称呼，以便我们知道回复的对象。',
    errorBusiness: '请填写公司名称，报价文件中会使用。',
    errorEmail: '此邮箱地址似有误，请检查是否输入正确。',
    errorSendBefore: '发送未成功。请重试，或直接发送邮件至 ',
    errorSendAfter: '。',
    sentH: '已收到',
    sentPBefore: '您将于一个工作日内收到书面方案与固定月费。邮件来自 ',
    sentPAfter: '，若贵方邮箱过滤较严，请先将此地址加入白名单。',
    sentAgain: '再发送一份',
  },

  servicesPage: {
    eyebrow: '我们负责什么',
    headline: '代理记账服务',
    headlineEm: '专为 BC省小型企业',
    sub: '八项服务，从您的日程中移除：每月记账、GST 与 PST 申报、薪资与 T4、财务报表、软件设置、补做旧账，以及年终的 T1 与 T2 申报。全部于西温哥华完成，服务 BC省各地的企业。',
    boundaryEyebrow: '一年是怎么衔接的',
    worksWith: '支持的系统',
    platformsNoteA:
      '我们使用 QuickBooks Online、Xero 和 Sage 50，贵公司可继续沿用现有系统。Shopify 与 Stripe 均可接入这三套系统，且',
    platformsLinkRemote: '全部工作以远程方式完成',
    platformsNoteB: '——无需寄送任何资料。',
    platformsLinkPricing: '查看方案如何划分',
    platformsNoteC: '，或',
    platformsLinkQuestions: '阅读客户最常提出的问题',
    platformsNoteD: '。',
  },

  pricingPage: {
    eyebrow: 'BC省小型企业的方案与价格',
    headline: '代理记账',
    headlineEm: '的实际费用',
    sub: '我们按贵公司的交易笔数采用固定月费，而非按小时计费。以下说明这一数字的构成、影响因素，以及市场上的普遍收费水平。',
    howEyebrow: '运作方式',
    howH2: '四项始终成立的原则',
    marketEyebrow: '市场行情',
    marketH2: '关于费用水平的客观说明',
    factorsEyebrow: '什么会影响价格',
    factorsH2: '我们评估的五项因素',
    plansEyebrow: '方案',
    plansH2: '按实际工作量划分',
    plansLede: '三个方案，依交易笔数划分。若不确定属于哪一档，可按较低一档估计，我们会在报价中予以确认。',
    setupBody: '——一次性报价，适用于 QuickBooks Online、Xero 或 Sage 50。',
    setupLink: '查看设置服务的具体内容',
    setupAfter: '。',
  },

  remotePage: {
    eyebrow: '远程与线上记账',
    headline: '远程代理记账',
    headlineEm: '服务全 BC省',
    sub: '无需寄送资料，无需到访办公室，也不必让单据长期堆放在车内。贵公司的账务每月由同一位专责人员在线上完成——无论贵公司位于西温哥华，还是在数小时车程之外。',
    howEyebrow: '实际运作方式',
    howH2: '四项安排 使递送资料不再必要',
    howLede:
      '「远程」并非在面对面流程之上勉强加装的折衷方案。现代账务处理的几乎每一个环节，本就已在线上进行。',
    monthEyebrow: '一个月的工作节奏',
    monthH2: '不会有任何事项积压',
    tradeoffEyebrow: '远程还是本地',
    tradeoffH2: '所得与所失',
    areasEyebrow: '适用范围',
    areasH2: '全 BC省适用 价格一致',
    areasLede:
      '由于整套做法本就不依赖地理位置，贵公司所在地并不影响服务范围或价格。我们的客户遍及温哥华、素里、本拿比与列治文，远至维多利亚与基隆拿，亦包括内陆、温哥华岛与北部地区。我们位于西温哥华——就远程合作而言，这只是关于我们的一项事实，而非对贵方的限制。',
    faqEyebrow: '常见问题',
    faqH2: '关于远程合作的疑问',
    faqIntroA: '其余问题请见',
    faqIntroLink: '主页',
    faqIntroB: '，或写在表格中，我们会在回复时一并解答。',
    ctaH2: '请说明贵公司目前的状况',
    ctaP: '十个简短问题，约需三分钟。一个工作日内您将收到书面的服务范围与固定月费——没有销售电话，在您确认之前不会设置任何内容。',
    ctaLinkServices: '我们负责什么',
    ctaLinkPricing: '方案如何划分',
  },

  contactPage: {
    stepsEyebrow: '接下来的流程',
    stepsH2: '三个步骤 无需销售通话',
    expectEyebrow: '您可以期待什么',
    expectH2: '一封书面回复 而非一张会议邀请',
    reachEyebrow: '直接联系我们',
    emailLabel: '电子邮箱',
    phoneLabel: '电话',
    hoursEyebrow: '服务时间',
    hours: '周一至周五，太平洋时间上午 9 时至下午 5 时。此时段之外送出的查询，将于下一个工作日回复。',
    whereEyebrow: '服务范围',
    whereP: '我们服务 BC省各地的企业，所有工作均在线上完成——无需寄送资料，也无需到访办公室。',
    linkServices: '我们负责什么',
    linkPricing: '方案如何划分',
  },

  notFound: {
    eyebrow: '404',
    headline: '此页面',
    headlineEm: '并不存在',
    sub: '链接可能已失效，或页面已迁移。本站的全部内容如下。',
    home: '首页',
    services: '代理记账服务',
    pricing: '方案与价格',
    contact: '获取方案与报价',
  },

  gstPstPage: {
    eyebrow: 'BC省的 GST 与 PST',
    headline: '两种税',
    headlineEm: '两套规则',
    sub: 'GST 交给 CRA，PST 交给 BC省政府。两者分别注册、分别申报，对应税范围的界定亦不一致——注册了其中一项，并不能说明是否也应注册另一项。',
    ratesEyebrow: '税率',
    comparisonEyebrow: '并排对照',
    comparisonH2: '两者的实质差别',
    gstLabel: 'GST',
    pstLabel: 'PST',
    mistakesEyebrow: '常见问题',
    mistakesH2: '四种最容易出错的情形',
    exemptEyebrow: '应税范围',
    exemptH2: '哪些须收 PST 哪些不须',
    registrationEyebrow: '注册',
    fin400Eyebrow: '申报表',
    deadlinesEyebrow: '申报期限',
    deadlinesH2: '申报频率与到期时间',
    whoLabel: '适用对象',
    dueLabel: '截止日',
    selfAssessEyebrow: '自我评税',
    localEyebrow: '实务中的常见情形',
    localH2: '进口 餐饮零售与电商',
    servicesLink: '我们代为申报的范围与内容 →',
    catchUpLink: '若此方面已有积压 →',
    faqEyebrow: '常见问题',
    faqH2: '关于 PST 的常见提问',
    whatWeDoEyebrow: '我们会做什么',
    ctaH2: '不确定已注册哪一项？',
    ctaP: '请在表格中说明。我们会对照贵公司实际销售的内容核对两项注册，并在书面报价中予以确认，之后才会办理任何申报。',
  },

  vsTaxPage: {
    eyebrow: '记账 vs 报税',
    headline: '两项工作',
    headlineEm: '一年当中的两个时间',
    sub: '每月账务包含什么、年终申报包含什么、两者在何处衔接，以及我们各承接到什么程度。这一点值得写清楚，因为行业内含糊其辞的表述过多。',
    rolesEyebrow: '各自包含什么',
    rolesH2: '工作如何划分',
    boundaryEyebrow: '我们承接的范围',
    boundaryH2: '每月与年终 我们各做什么',
    linksBefore: '更多内容：',
    linkServices: '每月工作的具体内容',
    linksMiddle: '，以及',
    linkPricing: '方案如何划分',
    linksAfter: '。',
    ctaH2: '不确定需要哪一项服务？',
    ctaP: '请说明贵公司目前的账务状况，我们会在书面报价中直接给出建议。',
  },

  pstRegistrationPage: {
    eyebrow: 'BC省的 PST 注册',
    headline: '在 BC省',
    headlineEm: '注册 PST',
    sub: '贵公司是否需要注册、BC省政府需要哪些材料，以及完成登记之后有何不同。PST 没有营业额门槛——它取决于贵公司销售的内容。',
    explainerLink: 'GST 与 PST 的区别 →',
    whoEyebrow: '适用对象',
    whoH2: '贵公司属于哪一类',
    stepsEyebrow: '如何注册',
    stepsH2: '答案确定之后的五个步骤',
    afterEyebrow: '注册之后',
    servicesLink: '我们代为申报的范围与内容 →',
    lateEyebrow: '补注册',
    ctaH2: '不确定是否需要注册？',
    ctaP: '请在表格中说明贵公司销售的内容。我们会对照两项注册逐一核对，并在书面报价中确认结论，之后才会办理任何申报。',
  },

  catchUpPage: {
    eyebrow: 'BC省的补做旧账',
    headline: '账目已经落后',
    headlineEm: '这是可以解决的',
    sub: '账目落后数月甚至数年，是多数客户前来咨询的原因。我们会先评估落后的程度，在动工之前将整项工作报成一个金额，随后清理积压并补齐应报的申报。',
    stagesEyebrow: '落后程度',
    stagesH2: '贵公司处于哪一阶段',
    processEyebrow: '流程',
    processH2: '四个步骤 一个金额',
    reassuranceEyebrow: '需要说明的几点',
    ctaH2: '请告知大致落后多久',
    ctaP: '概括说明即可，「不确定」也是有效答案。一个工作日内您将收到书面的服务范围与补做旧账的单一金额——没有销售电话，在您认可该金额之前不会开始任何工作。',
  },

  legal: {
    translationNote: '本页为英文版的中文译本，仅供参考；如中英文版本有任何不一致，以英文版为准。',
  },
};
