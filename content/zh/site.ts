/**
 * Simplified Chinese translation of content/site.ts.
 *
 * Every export is typed as `Widen<typeof En.X>`, so TypeScript fails the build
 * if this file drops a field, misspells a key or changes a nested shape. That
 * is the guarantee that a translated page cannot quietly render `undefined`.
 *
 * Values that are not copy — the email address, the phone number, logo paths,
 * image dimensions — reference the English module directly rather than being
 * retyped here, so they cannot drift apart.
 *
 * Terminology decisions, including the BC-specific place names, are recorded in
 * content/zh/glossary.md. Read that before editing.
 */
import type { Widen } from '../i18n';
import * as En from '../site';

export const CONTACT: Widen<typeof En.CONTACT> = {
  email: En.CONTACT.email,
  phone: En.CONTACT.phone,
  phoneHref: En.CONTACT.phoneHref,
  locality: '卑诗省西温哥华',
  tagline: '卑诗省小型企业记账服务 · 西温哥华',
};

/**
 * Only `alt` is translated. The account name and the Weixin ID are handles —
 * they are what a visitor types into WeChat's search box, so they have to match
 * the account character for character in both languages.
 */
export const WECHAT: Widen<typeof En.WECHAT> = {
  account: En.WECHAT.account,
  id: En.WECHAT.id,
  src: En.WECHAT.src,
  alt: '微信二维码：Tina - Orbis，微信号 Online_Bookkeeper',
};

/**
 * Figures and the helper that formats them, re-exported rather than retyped.
 * A tax rate is not copy: both languages render the same numbers, and a rate
 * change has to land in both at once or one half of the site is wrong.
 */
export const TAX_RATES = En.TAX_RATES;
export const COMBINED_TAX_RATE = En.COMBINED_TAX_RATE;
export const percent = En.percent;

export const RATES_AS_OF = '2026 年 7 月';

export const OG_IMAGE_ALT: Widen<typeof En.OG_IMAGE_ALT> =
  'Orbis Accounting — 卑诗省小型企业记账服务，西温哥华';

export const PROADVISOR_BADGE: Widen<typeof En.PROADVISOR_BADGE> = {
  src: En.PROADVISOR_BADGE.src,
  alt: 'Intuit QuickBooks 认证 QuickBooks Online 高级 ProAdvisor',
};

export const TRUST_STRIP: Widen<typeof En.TRUST_STRIP> = [
  { label: '认证资格', lines: ['QuickBooks Online', '高级 ProAdvisor'] },
  { label: '所在地', lines: ['卑诗省西温哥华', '服务全卑诗省'] },
  { label: '销售税', lines: ['GST 与 PST', '两者皆代为申报'] },
  // Legally load-bearing: engagements are contract based, never "no contract".
  { label: '合作方式', lines: ['以合约为准', '期限按客户约定'] },
];

export const PAINS: Widen<typeof En.PAINS> = [
  {
    n: '01',
    h: '收据到处都是',
    p: '鞋盒里、邮箱附件里，还有一份从三月起就没再更新的表格。',
  },
  {
    n: '02',
    h: '两种销售税',
    p: 'GST 交给加拿大税务局（CRA），PST 交给卑诗省财政厅。两次注册、两套截止日期、两套规则。',
  },
  {
    n: '03',
    h: '晚上都搭进去了',
    p: '每月十个小时花在分类记账上，而不是真正赚钱的事情上。',
  },
  {
    n: '04',
    h: '看不清全貌',
    p: '你知道银行账户里有多少钱，却不知道自己的利润率是多少。',
  },
];

export const DIFFERENTIATORS: Widen<typeof En.DIFFERENTIATORS> = [
  {
    h: 'QuickBooks Online、Xero 或 Sage 50',
    p: '三套系统我们都用，并把 Shopify 和 Stripe 接入你正在用的那一套。如果你目前只用表格，我们负责迁移。',
  },
  {
    h: '专为卑诗省，而不是笼统的加拿大',
    p: 'GST 与 PST 都代为申报。WorkSafeBC 和 CRA 的截止日期由我们盯着，不必你来记。',
  },
  {
    h: '每月由同一个人处理你的账',
    p: '不必每个季度换一个人、重新解释一遍你的生意。没有任何东西需要重新学一次。',
  },
  {
    h: '固定月费，不按小时计费',
    p: '开始之前你就知道价钱。账目乱一点的月份，不会变成一张意外的账单。',
  },
];

export const SERVICES: Widen<typeof En.SERVICES> = [
  {
    n: '01',
    h: '每月记账',
    p: '银行与信用卡对账、每笔交易分类、每月结账。',
  },
  {
    n: '02',
    h: 'GST 与 PST 申报',
    p: '两份申报表都按时准备并提交。GST 交给 CRA，PST 交给省政府。',
  },
  {
    n: '03',
    h: '薪资与 T4',
    p: '员工按时发薪、源头扣缴按时汇缴，年终的 T4 表与就业记录表（ROE）一并处理。',
  },
  {
    n: '04',
    h: '财务报表',
    p: '每月一份损益表和一份资产负债表，用大白话写，并标出真正重要的数字。',
  },
  {
    n: '05',
    h: '软件设置与迁移',
    p: 'QuickBooks Online、Xero 或 Sage 50。会计科目表、银行数据自动同步、接入 Shopify 与 Stripe，另含一次培训。',
  },
  {
    n: '06',
    h: '补做旧账',
    p: '落后几个月甚至几年，是大多数人来找我们的原因。我们先把积压清掉，再开始按月处理。',
    tag: '最常见',
  },
];

/** Brand marks and their dimensions are not copy. */
export const PLATFORMS: Widen<typeof En.PLATFORMS> = En.PLATFORMS.map((logo) => ({ ...logo }));

export const STEPS: Widen<typeof En.STEPS> = [
  {
    n: '1',
    h: '告诉我们你的生意情况',
    p: '填写本页下方的表格。十个简短问题，大约三分钟。',
  },
  {
    n: '2',
    h: '收到方案和报价',
    p: '一个工作日内，你会收到书面的服务范围和固定月费。白纸黑字，方便你拿去和别家比较。',
  },
  {
    n: '3',
    h: '接下来交给我们',
    p: '我们接入你的会计软件，清掉积压的账目，之后每月替你结账。',
  },
];

export const TIERS: Widen<typeof En.TIERS> = [
  {
    name: 'Foundation',
    audience: '账务简单的独资经营者',
    cap: '每月最多 50 笔交易',
    features: [
      { text: '银行与信用卡对账', included: true },
      { text: '交易分类', included: true },
      { text: '每月损益表、资产负债表', included: true },
      { text: 'GST 与 PST 申报', included: false },
      { text: '薪资与 T4', included: false },
    ],
  },
  {
    name: 'Standard',
    audience: '已站稳脚跟的小型企业',
    cap: '每月最多 150 笔交易',
    featured: true,
    features: [
      { text: '包含 Foundation 的全部内容', included: true },
      { text: '向 CRA 申报 GST', included: true },
      { text: '向卑诗省财政厅申报 PST', included: true },
      { text: '销售渠道对账：Shopify、Stripe', included: true },
      { text: '薪资与 T4', included: false },
    ],
  },
  {
    name: 'Complete',
    audience: '有员工需要发薪的企业',
    cap: '每月最多 400 笔交易',
    features: [
      { text: '包含 Standard 的全部内容', included: true },
      { text: '薪资、源头扣缴、T4 表与就业记录表（ROE）', included: true },
      { text: '应付账款管理', included: true },
      { text: 'WorkSafeBC 申报', included: true },
      { text: '每季度一次回顾通话', included: true },
    ],
  },
];

export const INDUSTRIES_SERVED: Widen<typeof En.INDUSTRIES_SERVED> = [
  '建筑与技工行业',
  '餐饮与食品服务',
  '零售与电商',
  '专业服务',
  '健康与养生',
  '进口与批发分销',
];

export const FAQS: Widen<typeof En.FAQS> = [
  {
    q: '在温哥华请一位记账员要多少钱？',
    a: '本地按小时计费的事务所通常收费每小时 75 至 150 加元，多数小型企业每月因此落在 600 至 2,000 加元之间。本地的固定月费方案大致在 300 至 2,000 加元，视业务量而定。我们采用固定月费，而不是按小时计费。把你的交易笔数和需要申报的项目告诉我们，一个工作日内你会收到书面报价。',
  },
  {
    q: '记账员和会计师有什么区别？我需要哪一种？',
    // 与 content/site.ts 的 FAQ 2 及 content/zh/pages.ts 的 SERVICES_BOUNDARY
    // 保持一致：不宣传公司税表申报，但也不再写死「我们不做」——想问的人照样可以拿到报价。
    a: '记账员处理日常事务：收据、分类、对账、薪资、GST 与 PST 汇缴，以及你每月的报表。会计师则负责年终申报和更高层面的规划。卑诗省多数小型企业全年由记账员处理账务，年终再请人介入。我们的方案涵盖的是每月的工作。想知道年终我们能接哪些，在表格里问一声，我们会在报价里告诉你。',
  },
  {
    q: '我在卑诗省必须注册 PST 吗？',
    a: '这取决于你卖什么，而不只是卖了多少。在卑诗省销售商品的企业大多需要注册，许多服务类企业则不需要。由于 PST 与 GST 是分开的，不少老板注册了其中一项、却没注册另一项而不自知。告诉我们你卖什么，我们会在报价中把两项都确认清楚。',
  },
  {
    q: '如果我的账已经落后一年了怎么办？',
    a: '这正是最多人来找我们的原因。我们会先看落后到什么程度，在动工之前把补做旧账报成一个数字。我们把积压清掉、把该报的报掉，然后从干净的状态开始按月处理。你不是第一个，也不会有人说教。',
  },
  {
    q: '你们只服务西温哥华以外的企业吗？',
    a: '我们位于西温哥华，服务遍及整个卑诗省。所有工作都在线上完成，没有东西需要送来，也不需要到办公室见面。',
  },
  {
    q: '我一定要用 QuickBooks Online 吗？',
    a: '不需要。我们使用 QuickBooks Online、Xero 和 Sage 50，你可以继续用现在这套。如果你在用 Wave、表格，或者什么都还没有，我们会推荐一套，迁移包含在设置服务里。Shopify 和 Stripe 都能接入这三套系统，销售数据会自动对账。',
  },
  {
    q: '要怎么从现在的记账员换过来？',
    a: '你把会计文件的访问权限给我们，我们从下个月开始接手。你不需要事先去谈一场尴尬的对话，也不需要自己搬任何东西。如果交接过程中发现原有账目存在问题，我们会先告诉你发现了什么，再决定是否需要额外的工作。',
  },
];

export const FORM_SELECTS: Widen<typeof En.FORM_SELECTS> = [
  {
    name: 'structure',
    label: '企业类型',
    options: [
      { value: 'Sole proprietor', label: '独资经营' },
      { value: 'Incorporated', label: '有限公司' },
      { value: 'Partnership', label: '合伙企业' },
      { value: 'Not sure', label: '不确定' },
    ],
  },
  {
    name: 'volume',
    label: '每月交易笔数',
    options: [
      { value: 'Under 50', label: '50 笔以下' },
      { value: '50 to 150', label: '50 至 150 笔' },
      { value: '150 to 400', label: '150 至 400 笔' },
      { value: 'Over 400', label: '400 笔以上' },
      { value: 'Not sure', label: '不确定' },
    ],
  },
  {
    name: 'gst',
    label: '是否已注册 GST',
    options: [
      { value: 'Yes', label: '是' },
      { value: 'No', label: '否' },
      { value: 'Not sure', label: '不确定' },
    ],
  },
  {
    name: 'pst',
    label: '是否已注册 PST',
    options: [
      { value: 'Yes', label: '是' },
      { value: 'No', label: '否' },
      { value: 'Not sure', label: '不确定' },
    ],
  },
  {
    name: 'software',
    label: '目前使用的软件',
    options: [
      { value: 'QuickBooks Online', label: 'QuickBooks Online' },
      { value: 'Xero', label: 'Xero' },
      { value: 'Sage 50', label: 'Sage 50' },
      { value: 'Wave', label: 'Wave' },
      { value: 'Spreadsheets', label: '电子表格' },
      { value: 'Nothing yet', label: '还没有' },
    ],
  },
  {
    name: 'behind',
    label: '账目更新到什么程度',
    options: [
      { value: 'Up to date', label: '已是最新' },
      { value: '1 to 3 months behind', label: '落后 1 至 3 个月' },
      { value: '3 to 12 months behind', label: '落后 3 至 12 个月' },
      { value: 'Over a year behind', label: '落后一年以上' },
    ],
  },
  {
    name: 'industry',
    label: '所属行业',
    fullWidth: true,
    options: [
      { value: 'Construction and trades', label: '建筑与技工行业' },
      { value: 'Restaurants and food service', label: '餐饮与食品服务' },
      { value: 'Retail and e-commerce', label: '零售与电商' },
      { value: 'Professional services', label: '专业服务' },
      { value: 'Health and wellness', label: '健康与养生' },
      { value: 'Real estate', label: '房地产' },
      { value: 'Import and distribution', label: '进口与批发分销' },
      { value: 'Other', label: '其他' },
    ],
  },
];
