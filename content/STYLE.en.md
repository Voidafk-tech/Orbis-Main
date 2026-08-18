# English copy — house style

The Chinese side has `content/zh/glossary.md`. This is its English counterpart,
written after a review found the copy reading as machine-generated. Every rule
below is here because the copy actually broke it, with the count at the time.

Read this before editing anything in `content/ui.ts`, `content/site.ts` or
`content/pages.ts`.

## Six things not to write

**1. "X rather than Y" (was: 39 times).** It was the single loudest tic. Say the
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

## The word list, which is not the problem here

The obvious tell of machine-written copy is vocabulary: *delve, comprehensive,
crucial, pivotal, intricate, underscore, utilize, meticulous, robust, seamless,
leverage, streamline, ensure, foster, landscape, realm, tapestry, ecosystem,
empower, elevate, navigate, harness, unlock, embark, testament, myriad,
holistic, synergy, bespoke, curated, unparalleled, transformative, tailored,
peace of mind, hassle-free, state-of-the-art*, and the openers *in today's…*,
*when it comes to…*, *it is important to note…*, *rest assured*, *look no
further*, *a wide range of*.

**That list has scored zero on this copy from the start, and it should stay
zero.** Worth saying plainly, because it means a word-swap pass finds nothing
and proves nothing. What made the copy read as generated was never the
vocabulary. It was sentence shape:

- **The negation pivot** — "X is not A. It is B." Covered above as rule 3, and
  it is the single most reliable tell, more than any word.
- **"Not only A, but also B."** Same move wearing a different hat.
- **The triplet.** Three parallel items, three times in a row, every list the
  same length. Real lists are the length they are: two items, or five. If three
  items arrive with matched grammar and matched rhythm, one of them is usually
  filler. The worst case found here used *separate* five times in one sentence.
- **Uniform sentence length.** Generated prose clusters around 15–20 words with
  little variance. Human paragraphs jump: a 25-word sentence, then a 4-word one.
- **The em-dash as universal connector**, at several times the rate a person
  uses it. Rule 5.

## Numbers to write to

Measured across `ui.ts`, `site.ts` and `pages.ts` (comments excluded):

| | Target | Currently |
|---|---|---|
| Mean sentence | 12–15 words | 13.0 |
| Median | ≤ 13 | 12 |
| Standard deviation | ≥ 6 — this is the burstiness | 6.5 |
| Under 8 words | ≥ 18% | 23% |
| Over 30 words | ~0% | 0% |
| Em-dashes | under ~25 total | 20 |
| "rather than" | under 5 | 1 |

The standard deviation matters more than the mean. Copy where every sentence is
13 words is worse than copy averaging 13 with a spread of 4 to 29, even though
the mean is identical. When a paragraph reads flat, the fix is to cut one
sentence hard and let the next one run.

## Cut length that carries nothing

If it can be said in fewer words without losing information, the shorter version
is better — that is a gain on its own, not a trade. The usual sources of slack:

- **Throat-clearing before the sentence starts.** "What that buys you is the
  ability to answer three questions" → "So you can answer three questions".
- **A closing clause restating the opening one.** If the last clause could be
  deleted and nothing is lost, delete it.
- **"It is worth knowing that…", "The principle is straightforward…", "In
  practice what this means is…"** — announcements that a point is coming.
  Make the point.
- **Hedged verbs.** "you are required to register" → "you must register";
  "is able to" → "can"; "in order to" → "to".

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
grep -nE "rather than| actually |which is why|not only|The point is not" \
  content/ui.ts content/site.ts content/pages.ts

# Em-dash count in copy. Over ~25 and they have become the default connector.
grep -o "—" content/ui.ts content/site.ts content/pages.ts | wc -l
```

Then read the paragraph out loud. The tells that survive a grep are rhythmic,
and the ear catches them where the eye does not.
