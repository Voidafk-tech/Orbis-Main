# Chinese terminology — Orbis Accounting

Simplified Chinese (zh-Hans), written for a **British Columbia** audience.
This file exists so a reviewer can check the terminology decisions in one place
rather than inferring them from the copy, and so future edits stay consistent.

## The rule for tax terms

**Use the English abbreviation on its own, everywhere, including first use.**
The forms, portals and letters these owners actually receive are in English, so
the abbreviation is the string they recognise and search for; the Chinese
gloss in brackets added length without adding information.

> GST — not 商品及服务税（GST）

This reverses an earlier convention. Do not reintroduce the bracketed
Chinese-first forms.

**Three deliberate exceptions,** all on `/zh/gst-pst-bc`, where explaining what
the abbreviations stand for *is* the page's job: 联邦消费税 GST 5%，加上省销售税
PST 7% in `GST_PST_INTRO` and the matching FAQ answer, and the official form
name 省销售税申报表 for the FIN 400. 消费税 is also the term this audience
searches — see the note above `taxCalculator` in content/zh/ui.ts. These are
appositives that carry information, not translations of an abbreviation that
already reads fine on its own.

## Place names

**British Columbia is written BC省**, set with a space after any preceding Han
character — 服务全 BC省, 在 BC省注册 — the same way every other Latin token in
this copy is set (交给 CRA, GST 与 PST). 卑诗省 was the earlier convention and
is no longer used anywhere in the copy.

City names keep their BC transliterations. BC's Chinese-language press and the
provincial government's own Chinese materials use a settled set that differs
from the Mainland-standard ones; these are the BC forms and should not be
"corrected".

| English | Used here | Mainland-standard alternative |
|---|---|---|
| British Columbia | BC省 | 卑诗省 / 不列颠哥伦比亚省 |
| West Vancouver | 西温哥华 | — |
| North Vancouver | 北温哥华 | — |
| Vancouver | 温哥华 | — |
| Burnaby | 本拿比 | 伯纳比 |
| Coquitlam | 高贵林 | 科奎特兰 |
| Richmond | 列治文 | 里士满 |
| Surrey | 素里 | 萨里 |
| North Shore | 北岸 | — |
| Metro Vancouver | 大温哥华地区（短形式 大温地区） | — |
| Lower Mainland | 低陆平原 | — |

The hero eyebrow uses the short form 大温地区 rather than 大温哥华地区: the line
is set in uppercase mono at `11px` and already carries 西温哥华 and 中英双语, so
the long form crowds it. Both forms are current in BC's Chinese-language press.

## Tax and government

| English | Chinese |
|---|---|
| GST (Goods and Services Tax) | GST |
| PST (Provincial Sales Tax) | PST |
| CRA (Canada Revenue Agency) | CRA |
| BC Ministry of Finance | BC省政府 |
| WorkSafeBC | WorkSafeBC |
| T4 | T4 表 |
| ROE (Record of Employment) | ROE |
| T1 personal return | T1 个人所得税申报 |
| T2 corporate return | T2 公司所得税申报 |
| CCPC | CCPC |
| source deductions | 源头扣缴 |
| GST registration threshold | GST 注册门槛 |

## Accounting

| English | Chinese |
|---|---|
| bookkeeping | 记账 |
| bookkeeper | 记账员 |
| accountant | 会计师 |
| reconciliation | 对账 |
| chart of accounts | 会计科目表 |
| profit and loss statement | 损益表 |
| balance sheet | 资产负债表 |
| payroll | 薪资 |
| transactions (count) | 交易笔数 |
| catch-up bookkeeping | 补做旧账 |
| close the books (monthly) | 结账 |
| sole proprietor | 独资经营 |
| incorporated | 有限公司 |
| partnership | 合伙企业 |

## Left in English

Product and company names are not translated: QuickBooks Online, Xero, Sage 50,
Shopify, Stripe, Wave, ProAdvisor, WorkSafeBC, Orbis Accounting.

## Punctuation in display type

**Headings carry no punctuation.** Every `h1`, `h2` and eyebrow ends without 。
and contains no ，. Where a clause break is needed, either rewrite the heading
so it does not need one (六件事，从你桌上拿走。 became 八项服务 从您的日程中移除)
or split it across `headline` / `headlineEm`, which render as two lines.

Body copy is unaffected and keeps full punctuation — card paragraphs, FAQ
answers, legal text and long-form prose all read as properly punctuated
sentences. The line is display type versus prose, not Chinese versus English:
the English copy follows the same rule.

## Tone

**书面语 throughout — the register of a professional services firm.** Direct
address is 您 or 贵公司; 你 does not appear anywhere in the copy. Sentences stay
short and claims stay concrete.

Out: colloquialisms (大白话, 烂摊子, 手忙脚乱, 说教, 栽跟头), rhetorical asides,
and second-person chattiness. Also out, and for the same reason: 我们竭诚为您服务
-style filler. Formalising the register is not licence to pad it — the copy
should read as competent and specific, not as a brochure.

This reverses the earlier convention, which deliberately mirrored the blunt
English register ("there is no lecture"). The English copy still reads that way;
the Chinese no longer does, and the two are allowed to differ here.

## 机器味 — the constructions not to write

The Chinese counterpart of `content/STYLE.en.md`. Every rule is here because
the copy actually broke it, with the count at the time.

**The 互联网黑话 vocabulary scores zero and should stay at zero.** 赋能, 抓手,
闭环, 沉淀, 打通, 打造, 助力, 全方位, 一站式, 深度赋能, 全流程, 一体化 — none
of it has ever appeared here. Worth recording, because it means a word-swap
pass over this copy finds nothing and proves nothing. What read as generated
was sentence shape, exactly as on the English side.

**1. X，而非 Y (was: 32; plus 而不是 ×6, 并非 ×12).** The loudest tic by a wide
margin, and the direct analogue of the English "rather than". Say the positive
thing and stop, or use the plain 不是 / 不 when the contrast is real.

> ~~交易随到随分类，而非堆积至月底集中处理。~~
> 交易随到随分类，不堆到月底集中处理。

Three uses survive, all correcting a belief the reader actually holds — for
instance 代收的销售税并非营业收入，而是代政府保管的款项. That is a real
correction of a real misconception, not the reflex.

**2. 破折号 —— as a universal connector (was: 48, now 17).** Fine as glue
between a bolded name and its note, as a list-to-clause connector, or as a
matched pair around a genuine interruption. Not as the default way to bolt one
complete clause onto another — that is a 。 or a ：.

**3. The mechanical connective chain (因此 ×15, 同时 ×9, 此外 ×2).** Generated
Chinese uses connectives at roughly 40% above the human rate. Most of these
carried no logic: the causal relation was already obvious from the order of the
sentences. Keep the ones doing real work.

**4. Explaining your own last sentence (值得注意的是, 其成因大抵如此,
这正是…的原因, 关键在于).** Announcing that a point is coming, instead of
making it. 其成因大抵如此 was deleted outright — the paragraph had already
said it.

**5. 其一 / 其二 / 其三 and other enumerated triplets.** Three parallel items
with matched grammar and matched rhythm is the most reliable structural tell.
Real lists are the length they are. Where the three points were genuine, the
enumeration markers still came out and the colons did the work.

**6. 一般而言 / 大致而言 / 通常情况下 as hedges.** A threshold is a threshold.
If the rule has real exceptions, name them; if it does not, state it.

**7. 贵方 (was: 26, now 0).** This is the register of contracts, not of a
bookkeeper writing to an owner. Direct address is 您, or 贵公司 where the
sentence genuinely means the company rather than the reader. 您 is fully
书面语, so this does not reopen the 你 question — 你 remains at zero.

## Numbers to write to

Measured across the four Chinese modules, in Han characters per sentence:

| | Target | Currently |
|---|---|---|
| Mean sentence | 14–18 chars | 16.0 |
| Median | ≤ 14 | 12 |
| Standard deviation | ≥ 10 — this is the burstiness | 12.5 |
| Over 45 chars | under 3% | 2% |
| 而非 / 而不是 / 并非 | under 5 combined | 3 |
| 破折号 —— | under 20 | 17 |

The spread matters more than the mean. Generated Chinese holds a narrow band of
sentence lengths; a person writes a twelve-character sentence and then a
forty-character one. When a paragraph reads flat, cut one sentence hard and let
the next one run.

## Cut length that carries nothing

书面语 is not the same as long. If the sentence can be shorter without losing
information, the shorter version is better — that is a gain on its own. The
usual sources of slack:

- **Nominalised throat-clearing.** 报表本身并非目的。其意义在于贵方可随时判断…
  became 报表不是目的。有了它，您随时能判断…
- **A closing clause restating the opening one.** If deleting the last clause
  loses nothing, delete it.
- **Stiff verbs where a plain one exists.** 予以确认 → 确认；再行报价 → 再报价；
  须自行承担 → 只能自己补.

## Review status

The translation was produced by an AI, checked for terminology consistency and
structural integrity, and then **reviewed by the client** before shipping.

Any future edit to the Chinese copy needs the same treatment: the type system
guarantees the *shape* matches the English, but nothing guarantees the register
reads naturally. Add new Chinese copy in batches and have it read before it
goes live, rather than one string at a time.
