# English copy — house style

The Chinese side has `content/zh/glossary.md`. This is its English counterpart,
written after a review found the copy reading as machine-generated. Every rule
below is here because the copy actually broke it, with the count at the time.

Read this before editing anything in `content/ui.ts`, `content/site.ts` or
`content/pages.ts`.

## Six things not to write

**1. "X rather than Y" (was: 37 times).** It was the single loudest tic. Say the
positive thing and stop, or use "instead of" / "not" if the contrast is real.

> ~~The month gets closed rather than left open indefinitely.~~
> We close each month instead of leaving it open.

**2. Explaining the significance of your own previous sentence (was: ~8).**
"That distinction matters at year end:", "That is the whole argument for…",
"which is why so many owners…". A person states the thing and trusts the reader.
If the point needs a second sentence, make that sentence carry new information.

**3. Negate, then correct (was: ~12).** "The point is not the documents. It is
that…" / "It does not roll into the monthly figure or turn up later as…". Lead
with what is true.

**4. "actually" as an intensifier (was: 18).** Almost always deletable. It
survives only where it marks a genuine contrast with a claim the reader has
already heard — "what bookkeeping actually costs" is fine.

**5. Em-dash asides.** Fine as a list separator or a real interruption; not as
the default way to bolt a clause on. If a sentence has two, it needs to be two
sentences.

**6. Passive and agentless.** "Payroll runs on your schedule", "the month is
closed", "transactions are categorized". Name who does it — it is almost always
"we".

> ~~Accounts are reconciled against the statements, the month is closed…~~
> We reconcile the accounts against the statements, close the month…

## What to do instead

- **Short sentences beat clever ones.** Two plain sentences beat one with a
  subordinate clause and a dash.
- **"We" and "you".** This is a small practice writing to an owner. Not "the
  practice" and "the client".
- **Concrete over abstract.** "Forty lines a month is a different job from 400"
  beats "the plans are sized according to volume".
- **Never soften a real limit.** If something costs extra, is out of scope, or
  will take time, say so in the plainest sentence available.

## Rules that are not about tone and still apply

- **Titles and subtitles carry no punctuation.** No terminal full stop and no
  internal comma in any `h1`, `h2` or eyebrow. Rewrite the heading if a comma
  was doing real work. Body copy keeps full punctuation.
- **No figure of ours appears anywhere.** See the header of `content/site.ts`.
  The only dollar amounts on the site are competitor ranges and the CRA's
  registration threshold.
- **Describe the work, never the designation.** Nothing about who is entitled to
  sign a return, in either direction.

## Checking your work

```sh
# Should return only code comments, never copy.
grep -nE "rather than| actually |which is why|The point is not" \
  content/ui.ts content/site.ts content/pages.ts
```
