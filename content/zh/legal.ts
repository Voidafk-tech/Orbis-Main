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
  lastUpdated: '最后更新：2026 年 7 月',
  sections: [
    {
      h: '信息收集',
      p: '我们收集提供会计服务所必需的信息，包括财务数据和企业联系方式。',
    },
    {
      h: '通过本网站提出的查询',
      p: '你通过本站表格发送的内容，仅用于撰写你的报价和回复你。不会被加入邮件名单，也不会为营销目的出售或分享。',
    },
    {
      // Accurate only while MEASUREMENT_ID in components/analytics.ts is set.
      h: '网站分析',
      p: '我们使用 Google Analytics 了解访客浏览了哪些页面、其中哪些页面带来了查询，以便判断网站上哪些内容值得保留。它会记录浏览过的页面、是否提交了查询表格、是否点击了电话或邮件链接，以及浏览器一般会发送的信息，例如大致位置、设备类型和来源网站。它不会被用于识别你的个人身份，你填入查询表格的内容也绝不会发送给它。如果你不希望被统计，任何浏览器层面的追踪拦截工具都可以阻止它。',
    },
    {
      h: '数据保护',
      p: '你的数据以业界标准的加密方式保护，并存放在符合规范的云端环境中，例如 Sage 和 QuickBooks Online。',
    },
    {
      h: '信息共享',
      p: '我们不出售你的数据。信息仅在合规要求的情况下与政府机构共享。',
    },
  ],
  note: '隐私相关查询请联系 privacy@orbisaccounting.ca。本页为英文版隐私政策的中文译本，仅供参考；如中英文版本有任何不一致，以英文版为准。',
};

export const TERMS: Widen<typeof En.TERMS> = {
  title: '服务条款',
  lastUpdated: '最后更新：2024 年 1 月',
  sections: [
    {
      h: '服务约定',
      p: '委托 Orbis Accounting 即表示你同意提供准确的财务记录，以便我们及时处理。合作以合约进行，期限按客户约定。',
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
