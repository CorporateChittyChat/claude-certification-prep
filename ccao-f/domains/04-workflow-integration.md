# Domain 4 — Workflow Integration and Solution Design

*Companion video: EP 05 in the [series playlist](https://www.youtube.com/playlist?list=PLFbwN1bk0S4c). The second-biggest blueprint slice — where single answers become systems, and where the exam's most tempting trap lives: the impressive rebuild.*

## The four moves

### Move 1 — Find where it pays

A process is a chain of steps, and Claude doesn't improve all of them equally. Walk the chain and mark two things on every step: **how much time it eats**, and **how much of it is language work** (reading, drafting, summarizing, comparing). Where both run high, that's your step.

Then rank candidates by **impact against effort**, and start where impact is high and effort is low.

> On the exam: the answer that targets one measured step beats the answer that installs AI everywhere at once.

### Move 2 — Pick the simplest pattern

The guidance is blunt: the most successful implementations **start simple** — a direct prompt and built-in features — and add complexity only when the need is proven. When one prompt isn't enough, three patterns cover most work:

- **Chain** — step one's output feeds step two (you met it in Domain 1).
- **Router** — easy items go to the fast model, hard ones go up the ladder.
- **Parallel** — sections run separately and merge at the end.

A fixed **workflow** is predictable. A free-running **agent** is flexible — and harder to control. **Reach for the agent last, not first.**

### Move 3 — Augment or redesign

If a workflow already works and the tools already hold the data, **wire Claude into them and keep everything else standing**. That's augmentation, and it's the default — connectors do the joining, and nobody relearns their job.

**Redesign** is for the workflow that's already broken, where half the steps exist only because the old tools demanded them. Rebuilding a *healthy* process around a new tool is how healthy processes die.

> On the exam: the answer that preserves working tools usually beats the answer that replaces them. Earn a redesign; never default to one.

### Move 4 — Sell it honestly

When you take a Claude solution to stakeholders:

- Quantify what changed — **your numbers, from your own pilot**, never numbers borrowed from a vendor page.
- Say the other half out loud: what it **costs**, where it still **fails**, which steps keep a **human signature** (Domain 2).
- Frame it as **capacity moving to better work**, not people being replaced.

An honest pitch survives its first bad week. A hyped one doesn't get a second one. And if the value can't be quantified yet, that's not a presentation problem — it's a signal to pilot longer.

## Remember

- Mark every step: time eaten × language work. Target the one step where both run high.
- Simple → chain → router → parallel → (last) agent.
- Augment the healthy; redesign only the broken.
- Own pilot numbers, limits included; capacity framing, not replacement.
- "Rebuild it all around an agent" sounds like vision. It's complexity before evidence.

## Practice

Worked question (the rebuild proposal): [Q5](../practice/episode-questions.md#q5--domain-4-the-impressive-rebuild)
