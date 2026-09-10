# Domain 1 — Prompting and Task Execution

*Companion video: EP 01 in the [series playlist](https://www.youtube.com/playlist?list=PLFbwN1bk0S4c). Prompting is where every other domain starts — a weak prompt makes good models, good verification, and good setup all look bad.*

## The four moves

### Move 1 — Say it clearly

Claude responds best to instructions that are **clear, explicit, and specific**. The official guidance has a simple test: show your prompt to a colleague with almost no context — if they're confused, Claude is too.

A weak prompt ("summarize this report") names no role, no audience, no format, no limits. A strong prompt names:

- the **role** Claude should play,
- the **context** / background,
- the **audience** it's for,
- the **format** it should come back in,
- and what to **skip**.

**Structure is the second half of clarity.** When one prompt carries instructions, background, and a document all at once, fence each part off with labeled tags (instructions in one fence, context in another, the document in its own). Steps that must happen in order become a numbered list. For long documents: **document at the top, question at the end.**

> On the exam: the answer that names role, context, and format beats the answer that just asks again. Tagged and numbered beats clever and vague.

### Move 2 — Split the job

A big task in one prompt invites a mess. Two patterns to know:

- **Chaining** — step one's output becomes step two's input. Extract, then transform, then check. Each link is small enough to inspect, so when something breaks you know *which link*.
- **Draft → review → refine** — ask for a draft, ask Claude to review that draft against your criteria, then ask for the refined version. Same model, three passes, better answer.

> On the exam: when a scenario shows one giant failing prompt, the right answer usually splits it.

### Move 3 — Test and refine

Iteration is criteria, not vibes. Write down what a good output looks like *before* you prompt. Run it, compare, change **one thing for a reason** — not five things on a feeling.

And know when to stop polishing: some failures are not prompt problems. If the answers are good but slow, or good but expensive, the fix is a different model or setup — not rewrite number six.

> Exam bait: "the prompt has been rewritten five times and it's still failing." The answer is rarely another rewrite.

### Move 4 — Fit the strategy to the task

| Task shape | Strategy |
|---|---|
| Research | Success criteria + cross-checking; ask for sources checked against each other, and the strongest case *against* the answer |
| Deep analysis | Room to think — let Claude reason longer, and verify against your criteria before finishing |
| Formatting / fixed output | **Examples** — three to five, close to the real thing and varied; Claude copies the pattern it's shown |
| Rules | Phrase as **do**, not do-not — say what you want, not what to avoid |

Mismatching task shape and strategy is most of the wrong answers you'll meet in this domain.

## Remember

- Colleague test: no-context reader confused → Claude confused.
- Fence parts with labeled tags; number ordered steps; long document first, question last.
- Chain big jobs; draft-review-refine on the same model.
- Criteria before prompting; change one thing at a time.
- Formatting problems want 3–5 examples, not more instructions.
- Negative phrasing ("do not change the structure") without showing the structure is a classic trap.

## Practice

Worked question for this domain (the committee-format scenario): [episode-questions.md → Q1](../practice/episode-questions.md#q1--domain-1-the-format-lottery)
