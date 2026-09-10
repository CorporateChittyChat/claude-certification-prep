# Domain 2 — Output Evaluation and Validation

*Companion videos: EP 02 (Part A, the trust half) and EP 03 (Part B, the shipping half) in the [series playlist](https://www.youtube.com/playlist?list=PLFbwN1bk0S4c). The biggest slice of the exam blueprint — it gets two episodes and the most mock-exam questions.*

**The rule the whole domain runs on: how confident Claude sounds and how correct Claude is are not related.**

## Part A — the trust half

### Move 1 — Judge it like a deliverable, not a conversation

Fluent isn't the same as faithful. Score an answer on separate dimensions, written down *before* you read the output (afterwards, the fluency has already charmed you):

- **Faithful** to the source?
- **Complete** against what you asked for?
- **Consistent** — same question, same answer?
- **Right tone** for the reader?

> On the exam: the answer that checks against stated criteria beats the answer that rereads the output and feels good about it.

### Move 2 — The four tells of a fabricated fact

1. **A citation that doesn't exist** — a plausible paper title, link, or report name that leads nowhere.
2. **A precise number with no source** — precision doing the job evidence should be doing.
3. **The answer disagrees with itself** — an internal contradiction is a fabrication signal, not a style problem.
4. **"Definitely, certainly, clearly" with nothing behind them** — assertion isn't evidence.

Both halves of the first two tells share a shape: the detail is specific enough to *feel* checked, and nobody checked it. That feeling of specificity is exactly the thing to distrust.

**Bonus habit:** when you find one real error, don't relax after fixing it. One found error means there are likely others — finding it *starts* the audit.

### Move 3 — Make it easier to verify up front

Three instructions from the official guidance:

1. Tell Claude **"I don't know" is an acceptable answer** — the most effective single line for cutting fabricated facts.
2. Make Claude **quote the source before using it** — grounding in exact quotes keeps answers inside your documents.
3. Require **a citation after every claim**, and tell Claude to withdraw any claim it can't cite.

### The verification trap

**A citation is not verification.** An answer can wear a real-looking source and still be wrong. And asking Claude to double-check itself is the same model marking its own homework. Verification means *you open the citation and read what it actually says.*

> On the exam: when an option says "the model confirmed its own answer" — that option is bait. Always.

## Part B — the shipping half

An answer can be correct and still be shipped wrong.

### Move 4 — Know when a human must sign

When an output touches a person's **rights, health, money, or livelihood**, it's high-stakes work: legal advice, medical answers, lending, hiring. For those, Claude's draft is an *input, never a decision*. A **qualified person** — licensed or accountable in that field — reviews before anyone acts. Not a colleague skimming it; the person whose name can stand under it.

Two habits ride along: **disclose** that people are dealing with AI output (part of responsible use, not a courtesy), and **keep the sign-off where you can point at it** — if nobody signed, it didn't ship, it escaped.

### Move 5 — Shape it for the reader

The same content is a different deliverable in different hands: the director wants three short lines, the analyst wants every step in order, the external partner wants formal prose. **Name the reader in one phrase before you edit anything**, then ask for that shape.

Also: the style of your prompt leaks into the style of the answer — a bullet-heavy prompt comes back as bullets. Write the prompt the way you want the output to read.

### Move 6 — Pick the container

- Work you'll **edit and reuse** → its own document.
- Data heading **into another system** → structured, fixed shape software can read.
- A **one-off answer** → plain prose in the chat.

The container follows the *use*, never the habit. And the schema limit: **a fixed shape guarantees the shape, and nothing else.** Structure can promise every field is present and every bracket closes — it can't promise the numbers are right. Format compliance is not verification. The container is checked by machines; the contents are still checked by you.

## Remember

- Confidence ≠ accuracy. Criteria before reading.
- Four tells: dead citation, unsourced precision, self-contradiction, evidence-free assertion.
- "I don't know" allowed + quote first + cite every claim.
- Verification = you open the source. Self-check is always bait.
- Rights / health / money / livelihood → qualified human signs, and AI use is disclosed.
- Name the reader; pick the container by downstream use; schema ≠ truth.

## Practice

Worked questions: [Q2 (the statistic and the deadline)](../practice/episode-questions.md#q2--domain-2a-the-statistic-and-the-hour) and [Q3 (the hiring shortlist)](../practice/episode-questions.md#q3--domain-2b-who-signs-the-shortlist)
