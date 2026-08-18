/**
 * Simplified Chinese translation of content/legal.ts.
 *
 * The English version governs. Each page carries a line saying so — see `note`
 * — because a translated legal document that is also binding is a liability the
 * practice has not had reviewed. Translating for readability while keeping the
 * English authoritative is the standard arrangement.
 */
import type { Widen } from '../i18n';
import * as En from '../legal';

export const PRIVACY: Widen<typeof En.PRIVACY> = {
  title: '隐私政策',
  lastUpdated: '最后更新：2026 年 8 月',
  sections: [
    {
      h: '信息收集',
      p: '我们收集提供会计服务所必需的信息，包括财务数据和企业联系方式。',
    },
    {
      h: '通过本网站提出的查询',
      p: '您通过本站表格发送的内容，仅用于编制报价与回复，不会加入邮件名单，也不会为营销目的出售或共享。表格由表单投递服务 Web3Forms 送达我们的邮箱，信息在传送过程中经由该服务处理。其服务器位于加拿大境外，因此您发送的内容在到达我们之前会经过跨境传输。若您不希望如此，请改以电子邮件或电话与我们联系，两者均列于联系页面。',
    },
    {
      // Accurate only while MEASUREMENT_ID in components/analytics.ts is set.
      h: '网站分析',
      p: '我们使用 Google Analytics 了解访客浏览了哪些页面、其中哪些页面带来了查询，以便判断网站上哪些内容值得保留。它会记录浏览过的页面、是否提交了查询表格，以及是否使用了电话、邮件或微信联系方式，还有浏览器一般会发送的信息，例如大致位置、设备类型和来源网站。表格提交时，它还会记录您在下拉菜单中选择的四项答案——每月交易量区间、目前使用的软件、账目更新的程度，以及所属行业——以便我们了解网站实际带来的查询类型。您手动填写的内容不会被发送，包括姓名、企业名称、邮箱、电话，以及您以自己的表述填写的任何内容。上述信息会发送至 Google，存放于其位于加拿大境外的服务器。这些信息不会用于识别您的个人身份。若您不希望被统计，任何浏览器层面的追踪拦截工具均可将其阻止。',
    },
    {
      h: '数据保护',
      p: '您的数据以业界标准的加密方式保护，并存放于符合规范的云端环境中，例如 Sage 与 QuickBooks Online。',
    },
    {
      h: '信息共享',
      p: '我们不出售您的数据，也不会为营销目的共享。您的信息仅会提供给以下三类第三方，此外没有其他：运行本网站及我们所用记账软件的服务提供商，即上文以及委托函中列明的各方；我们代为申报的政府机构，例如 CRA 与 BC省政府；以及法律要求我们披露的对象。其中数家服务提供商在加拿大境外运营，这意味着存放于其处的信息可能受其所在国法律管辖。',
    },
    {
      h: '我们保存多久',
      p: '未转为正式合作的查询保存十二个月，之后删除。客户的记录在相关税务年度之后至少保存六年，因为这是 CRA 的要求。',
    },
    {
      h: '查询或更正我们持有的信息',
      p: '您可查询我们持有您哪些个人信息、索取副本，并要求更正其中有误的内容。请发送邮件至 info@orbisaccounting.ca，我们会在三十天内回复。若您对我们处理隐私事项的方式存有异议，可向加拿大隐私专员公署（Office of the Privacy Commissioner of Canada）提出。',
    },
  ],
  note: '隐私相关查询请联系 info@orbisaccounting.ca。本页为英文版隐私政策的中文译本，仅供参考；如中英文版本有任何不一致，以英文版为准。',
};

export const TERMS: Widen<typeof En.TERMS> = {
  title: '服务条款',
  lastUpdated: '最后更新：2024 年 1 月',
  sections: [
    {
      h: '服务约定',
      p: '委托 Orbis Accounting 即表示您同意提供准确的财务记录，以便我们及时处理。合作以合约为准，期限按客户约定。',
    },
    {
      h: '付款条件',
      p: '月费于服务周期开始时开具账单。按项目计费的服务需支付 50% 订金。',
    },
    {
      h: '责任',
      p: '我们会尽最大努力确保准确，但所有已提交文件的最终核实责任由客户承担。',
    },
  ],
  note: '使用我们的服务即表示接受本条款。本页为英文版服务条款的中文译本，仅供参考；如中英文版本有任何不一致，以英文版为准。',
};
