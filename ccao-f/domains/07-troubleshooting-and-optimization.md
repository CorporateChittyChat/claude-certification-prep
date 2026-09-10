# Domain 7 — Troubleshooting and Optimization

*Companion video: EP 08 (series finale) in the [series playlist](https://www.youtube.com/playlist?list=PLFbwN1bk0S4c). The last domain, and the one big idea that closes the series: when output disappoints you, don't guess — diagnose. Every earlier domain becomes a diagnostic step here.*

## The four moves

### Move 1 — Diagnose in order

When an answer misses, most people blame the model first. The exam wants a calmer habit — check four things, **in order**:

1. **The prompt.** Were the instructions specific about role, context, task, and format? Most bad outputs are underspecified prompts.
2. **The information.** Did Claude actually have the source material it needed, or did you ask it to guess?
3. **The effort.** Some jobs need more thinking time or a more capable model.
4. **Only then, the setup itself.** Escalate to your developer or architect when the first three checks pass and the problem stays.

Order matters because each check costs less than the one after it.

### Move 2 — Pull the cheapest lever first

Picture a row of levers, arranged by cost:

| Lever | Cost |
|---|---|
| Rewriting the prompt | Free — and fixes the most |
| Adding the right source material | Minutes |
| More room to think | A little time |
| A stronger model | Money, on every single run |
| Changing the whole setup | Days |

The exam loves to offer you an expensive lever while a cheap one sits untried. **If you haven't fixed the prompt and the inputs, you haven't earned the model switch.**

### Move 3 — Measure, don't vibe

"Sounds better" is not evidence. Before you tune anything, write down what a good output looks like — accurate on the key facts, follows the format, cites the source. Then **change one thing at a time** and score the output against your list. Swap the prompt and the model together and you learn nothing about either.

This is the discipline you already use in projects: acceptance criteria first, then testing.

### Move 4 — Fit the cost to the workload

Not every task deserves the most powerful option. Sorting hundreds of tickets is a high-volume, simple job — a fast, light model does it well and cheaply. Reasoning through a messy vendor contract is a deep, careful job — that's where a more capable model earns its keep.

- The **wasteful** pattern: the heavyweight for everything.
- The **risky** pattern: the lightweight for judgment calls.

Match the tool to the task, and revisit the match when the workload changes.

## Remember

- Prompt → information → effort → escalate. In that order, because each check costs less than the next.
- A retry (or yet another rewrite) without a plan is motion, not diagnosis.
- Criteria first; one change at a time.
- Heavy model for depth, light model for volume — never the reverse.

## Practice

Worked question (the inconsistent answers): [Q8](../practice/episode-questions.md#q8--domain-7-the-inconsistent-answers). The [mock exam](../practice/mock-exam.md) carries two more Domain 7 questions.
