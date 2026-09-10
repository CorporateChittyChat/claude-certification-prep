# Domain 3 — Product and Model Selection

*Companion video: EP 04 in the [series playlist](https://www.youtube.com/playlist?list=PLFbwN1bk0S4c). The upstream domain — before the prompt, before the checking, two choices decide everything: which tool, and which model.*

## The four moves

### Move 1 — Pick the feature from the job's verb

Claude isn't one door, it's a row of them. Say the task in one verb first:

| The job's verb | The door |
|---|---|
| **Gather** outside information | Research |
| **Compute** or chart real data | Code execution (sandboxed) |
| The **same work** on the same materials every week | A project, with its instructions saved once |
| A deliverable you'll **edit and reuse** | An artifact — its own document panel |
| A procedure you **explain every time** | Save it as a skill |
| Something Claude should **remember next session** | Memory |

The wrong door makes a good prompt look bad.

*(Feature names change over time — verify against [current docs](https://docs.claude.com); the verb-first judgment is the durable part.)*

### Move 2 — Know the ladder

Model families run from fastest to deepest: **Haiku** for volume (quick and light per call), **Sonnet** for the balance most everyday work sits on, **Opus and Fable** for the deepest reasoning and longest-running jobs.

The trade the exam wants you to say out loud: **as capability climbs, speed drops and cost climbs with it. Nobody gets all three.** The question is never "which model is best" — it's which rung fits *this* task, measured on your own work, not chosen on mood.

### Move 3 — Tune before you switch

When an answer disappoints, walk one staircase, **in order**:

1. **Ask what's missing.** If the model never saw the numbers, no model will guess them. Supply the information.
2. **Same model, more room to think.** Deeper reasoning on the same rung is cheaper than a bigger model.
3. **Only then, climb one rung.**

And notice the step that is *not* on the staircase: running the same request again. Same input, same model, same shallow answer. **A retry without new information isn't a lever, it's a lottery ticket** — and the exam will offer it to you anyway.

### Move 4 — Mind the context window

Everything Claude can see in one request lives in one finite context window. As it fills, quality quietly sags — and the *middle* of a long pile is where things get missed. Hygiene, in order:

- **Prune** what the task no longer needs.
- **Pack** a long conversation down to its decisions, and carry those forward.
- **Restart clean** with just the key state when a session has gone soft.

Transcripts aren't treasure. Decisions are.

## Remember

- Verb first, then the door.
- Capability ↑ → speed ↓, cost ↑. Fit the rung; measure on your own tasks.
- Missing info → more thinking → climb a rung. Blind retry is never the answer.
- A full window lies; middle content gets missed; carry decisions, not transcripts.
- Cost is managed by fitting the rung — never by switching features off while you retry.

## Practice

Worked question (the shallow contract analysis): [Q4](../practice/episode-questions.md#q4--domain-3-the-shallow-analysis)
