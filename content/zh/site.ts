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
  locality: 'BC省西温哥华',
  tagline: 'BC省小型企业代理记账 · 西温哥华',
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
  'Orbis Accounting — BC省小型企业代理记账，西温哥华';

/** Only `alt` is translated; the artwork paths are assets, not copy. */
export const CERTIFICATION_BADGES: Widen<typeof En.CERTIFICATION_BADGES> = [
  {
    src: En.CERTIFICATION_BADGES[0].src,
    alt: 'Intuit QuickBooks 认证 QuickBooks Online 高级 ProAdvisor',
  },
];

export const TRUST_STRIP: Widen<typeof En.TRUST_STRIP> = [
  { label: '认证资格', lines: ['QuickBooks Online', '高级 ProAdvisor'] },
  { label: '所在地', lines: ['BC省西温哥华', '服务全 BC省'] },
  { label: '销售税', lines: ['GST 与 PST', '两者均代为申报'] },
  // Legally load-bearing: engagements are contract based, never "no contract".
  { label: '合作方式', lines: ['以合约为准', '期限按客户约定'] },
];

export const PAINS: Widen<typeof En.PAINS> = [
  {
    n: '01',
    h: '单据分散在各处',
    p: '纸盒、邮箱附件，以及一份自三月起便未再更新的表格。',
  },
  {
    n: '02',
    h: '两种销售税',
    p: 'GST 交给 CRA，PST 交给 BC省政府。两次注册、两套申报期限、两套规则。',
  },
  {
    n: '03',
    h: '时间成本被低估',
    p: '每月十小时用于交易分类，真正产生收入的业务只能延后。',
  },
  {
    n: '04',
    h: '缺乏整体判断依据',
    p: '银行账户余额是清楚的，利润率是多少则无从判断。',
  },
];

export const DIFFERENTIATORS: Widen<typeof En.DIFFERENTIATORS> = [
  {
    h: 'QuickBooks Online、Xero 或 Sage 50',
    p: '三套系统我们均可使用，并将 Shopify 与 Stripe 接入贵公司现用的系统。若目前仅使用电子表格，迁移工作由我们负责。',
  },
  {
    h: '专做 BC省，不做全国通用',
    p: 'GST 与 PST 均由我们申报，WorkSafeBC 与 CRA 的各项期限也由我们跟进，无需您记。',
  },
  {
    h: '全年由同一位专责人员处理',
    p: '业务只需说明一次。不会每季度换一位对接人，再从头解释一遍。',
  },
  {
    h: '固定月费，不按小时计费',
    p: '费用在合作开始之前即已确定。账务繁杂的月份，不会变成一张意外的账单。',
  },
];

export const SERVICES: Widen<typeof En.SERVICES> = [
  {
    n: '01',
    h: '每月记账',
    p: '银行与信用卡对账、逐笔交易分类、每月结账。',
  },
  {
    n: '02',
    h: 'GST 与 PST 申报',
    p: '两份申报表均按时编制并提交。GST 交给 CRA，PST 交给 BC省政府。',
  },
  {
    n: '03',
    h: '薪资与 T4',
    p: '员工按时发薪、源头扣缴按时汇缴，年终的 T4 表与 ROE 一并处理。',
  },
  {
    n: '04',
    h: '财务报表',
    p: '每月提供损益表与资产负债表各一份，并标出有变动的数字。',
  },
  {
    n: '05',
    h: '软件设置与迁移',
    p: 'QuickBooks Online、Xero 或 Sage 50。会计科目表、接入 Shopify 与 Stripe，另含一次培训。',
  },
  {
    n: '06',
    h: '补做旧账',
    p: '账目落后数月甚至数年，是多数客户前来咨询的原因。我们先清理积压，再转入按月处理。',
    tag: '最常见',
  },
  {
    n: '07',
    h: 'T1 个人所得税申报',
    p: '面向独资经营与自雇人士的个人所得税申报，依据我们全年记录的账目编制。',
  },
  {
    n: '08',
    h: 'T2 公司所得税申报',
    p: '面向 CCPC 的公司所得税申报，从已按月结账的账簿直接编制，无需在年终还原全年。',
  },
];

/** Brand marks and their dimensions are not copy. */
export const PLATFORMS: Widen<typeof En.PLATFORMS> = En.PLATFORMS.map((logo) => ({ ...logo }));

export const STEPS: Widen<typeof En.STEPS> = [
  {
    n: '1',
    h: '说明贵公司的业务情况',
    p: '填写本页下方的表格。十个简短问题，约需三分钟。',
  },
  {
    n: '2',
    h: '收到方案与报价',
    p: '一个工作日内，您将收到书面的服务范围与固定月费，便于与其他机构的报价并列比较。',
  },
  {
    n: '3',
    h: '后续工作由我们承接',
    p: '我们接入贵公司的会计系统，清理积压账目，此后按月结账并办理相应申报。',
  },
];

export const TIERS: Widen<typeof En.TIERS> = [
  {
    name: 'Foundation',
    audience: '账务结构简单的独资经营者',
    cap: '每月最多 50 笔交易',
    features: [
      { text: '银行与信用卡对账', included: true },
      { text: '交易分类', included: true },
      { text: '每月损益表与资产负债表', included: true },
      { text: 'GST 与 PST 申报', included: false },
      { text: '薪资与 T4', included: false },
    ],
  },
  {
    name: 'Standard',
    audience: '经营已趋稳定的小型企业',
    cap: '每月最多 150 笔交易',
    featured: true,
    features: [
      { text: '包含 Foundation 的全部内容', included: true },
      { text: '向 CRA 申报 GST', included: true },
      { text: '向 BC省政府申报 PST', included: true },
      { text: '销售渠道对账：Shopify、Stripe', included: true },
      { text: '薪资与 T4', included: false },
    ],
  },
  {
    name: 'Complete',
    audience: '设有员工并需办理薪资的企业',
    cap: '每月最多 400 笔交易',
    features: [
      { text: '包含 Standard 的全部内容', included: true },
      { text: '薪资、源头扣缴、T4 表与 ROE', included: true },
      { text: '应付账款管理', included: true },
      { text: 'WorkSafeBC 申报', included: true },
      { text: '每季度一次账务回顾通话', included: true },
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
    q: '在温哥华委托代理记账需要多少费用？',
    a: '本地按小时计费的事务所通常收费每小时 75 至 150 加元，多数小型企业每月因此支出 600 至 2,000 加元。本地的固定月费方案大致为每月 300 至 2,000 加元，视业务量而定。我们采用固定月费，不按小时计费。请告知您的交易笔数与需要申报的项目，一个工作日内即可收到书面报价。',
  },
  {
    q: '记账与报税有什么区别？我需要哪一种？',
    // 与 content/site.ts 的 FAQ 2 及 content/zh/pages.ts 的 SERVICES_BOUNDARY
    // 保持一致：两项业务都承接，年终申报不再交给外部会计师。
    // 只描述业务范围，不涉及执业资格。
    a: '这是两项不同的工作，通常发生在一年当中的不同时间。每月的工作指日常账务：单据处理、交易分类、账户对账、薪资、GST 与 PST 汇缴，以及每月的财务报表。年终的工作指所得税申报：未注册公司报 T1 及其营业收支表，已注册公司报 T2 及其附表。两项我们都承接，年终申报直接以全年逐月结账的账簿为准，无需在次年春季重新还原一整年。若年终申报已有他人负责，我们也可只做每月账务，向对方移交一套已结账的完整账簿。',
  },
  {
    q: '在 BC省是否必须注册 PST？',
    a: '这取决于您销售的内容，与销售额无关。在 BC省销售商品的企业多数需要注册，许多服务类企业则不需要。PST 与 GST 相互独立，不少经营者只注册了其中一项，自己并未察觉。请告知销售的内容，我们会在报价中就两项注册一并确认。',
  },
  {
    q: '账目已经落后一年，应当如何处理？',
    a: '落后一年并不算多。我们会先评估落后的程度，在动工之前把补做旧账报成一个金额。积压清理完毕、应申报的项目补报到位后，即从一套干净的账簿转入按月处理。这种情况很常见，我们不会作任何评判。',
  },
  {
    q: '贵司的服务范围仅限西温哥华吗？',
    a: '我们位于西温哥华，服务范围覆盖整个 BC省。所有工作均在线上完成，无需寄送资料，也无需到访办公室。',
  },
  {
    q: '是否必须使用 QuickBooks Online？',
    a: '不必。我们使用 QuickBooks Online、Xero 与 Sage 50，贵公司可继续沿用现有系统。若目前使用 Wave、电子表格，或尚未使用任何系统，我们会提出建议，迁移工作包含在设置服务之内。Shopify 与 Stripe 均可接入这三套系统，销售数据可与账簿对账。',
  },
  {
    q: '如何从现有的记账服务机构转出？',
    a: '您授予我们会计文件的访问权限，我们自下月起接手。无需事先与任何人交涉，也无需自行转移资料。交接中若发现原有账目存在问题，我们会先说明具体情况，再商定是否需要额外的工作。',
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
      { value: 'Nothing yet', label: '尚未使用' },
    ],
  },
  {
    name: 'behind',
    label: '账目更新至何时',
    options: [
      { value: 'Up to date', label: '已更新至最新' },
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
