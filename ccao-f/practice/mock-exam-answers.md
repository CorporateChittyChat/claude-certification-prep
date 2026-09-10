# Mock exam — answers and explanations

Score per domain. Any domain where you missed two or more: reread that [domain guide](../domains/) before booking.

> Original practice material — not from the real exam.

### Domain 1 — Prompting and Task Execution

**1 — B.** "Improve this document" is underspecified: no role, no audience, no format. Rerunning (A) is the same lottery; a bigger model (C) answers a vague question more fluently, not more usefully; ten prompts (D) is structure without clarity. *(Guide: [Move 1](../domains/01-prompting.md))*

**2 — B.** Long document at the top, question at the end. Putting the question first (A) buries it under sixty pages by the time Claude answers.

**3 — C.** Fence the parts with labeled sections so nothing is guessed about where instructions end and the document begins. B asks the model to fix what the prompt structure should prevent.

**4 — B.** Chaining: each link small enough to inspect, so when something breaks you know which link. A recreates the original problem with more words.

**5 — C.** Accurate-but-slow is not a prompt problem — five rewrites have proven that. This is the "know when to stop polishing" exam bait: the fix lives in model/effort choice (Domain 3), not rewrite number six.

### Domain 2 — Output Evaluation and Validation

**6 — B.** A plausible-sounding source that leads nowhere is tell number one of a fabricated fact. Everything resting on it is unverified until a human finds the real source or removes the claim.

**7 — B.** Unsourced precision is tell number two — the number is specific enough to *feel* checked, and nobody checked it. That feeling is exactly the thing to distrust.

**8 — C.** One found error starts the audit; it doesn't end it. Shipping after one fix (A) assumes the error was alone — the tells travel in groups.

**9 — B.** Permission to say "I don't know" is the single most effective line for cutting fabricated facts. C is the self-check trap wearing an instruction's clothes; D actively makes the problem worse.

**10 — C.** Same content, different readers, different deliverables. Name the reader, then ask for that shape — sending everyone the analyst version (A) serves nobody.

**11 — B.** The schema limit: a fixed shape guarantees the shape and nothing else. Fields present and brackets closed says nothing about whether the numbers are right. Contents are still checked by you.

### Domain 3 — Product and Model Selection

**12 — B.** Same work, same materials, every week — that's a project: instructions and knowledge saved once. A re-pays the explanation tax weekly; D relies on memory for what configuration should hold.

**13 — B.** Real arithmetic on real data is code execution's job. Asking a language model to "be precise" about computation (C) is hoping, not computing.

**14 — B.** High volume, simple judgment — the fast light rung. The heavyweight (A) does it too, at a price the task never earns. This is the wasteful pattern from Domain 7 arriving early.

**15 — B.** Restart clean with the key state. Transcripts aren't treasure — decisions are; pasting the whole history (C) rebuilds the same overloaded window in a new room.

**16 — B.** First staircase step: what's missing? If the model never saw the information, no model will guess it — and no budget line fixes it. The upgrade conversation is premature until the cheap levers are tried.

### Domain 4 — Workflow Integration and Solution Design

**17 — B.** Mark every step for time eaten and language work; target where both run high. Loudest complaints (A) and easiest tech (D) are how AI ends up installed where it doesn't pay.

**18 — B.** Mixed difficulty is the router's home ground: easy items to the fast rung, hard ones up the ladder. An agent (C) is the most flexibility and the least control — reached for last.

**19 — B.** Augment the healthy. The workflow works and the tools hold the data — wire Claude in at the paying step and measure. A rebuilds a healthy process (how healthy processes die); D wastes a real opening.

**20 — B.** Your numbers, from your own pilot, limits included — that's the pitch that survives its first bad week. Vendor case-study figures (A, D) are someone else's workflow wearing your slide template.

### Domain 5 — Configuration and Knowledge Management

**21 — B.** Contradictory materials in one workspace destabilize every answer it gives. Per-question steering (A) fights the setup instead of fixing it — split by purpose.

**22 — B.** The fence, verbatim: answer only from these materials, say unknown for the rest. "Prefer where possible" (A) leaves the gap-filling door open, and you still can't tell which is which.

**23 — B.** The whole-drive connector is the domain's signature trap — it *feels* thorough. The irrelevant files join every search anyway; scope every connector to the minimum it needs.

**24 — B.** Configuration rots in silence. Audit on a rhythm: reread against today's purpose, remove what expired, refresh what changed. A note about possible staleness (C) delegates your maintenance job to the model.

### Domain 6 — Governance, Risk, and Responsible Use

**25 — B.** Employment is one of the seven high-stakes areas: a qualified human reviews before anything touches a candidate, and rejections are exactly where the rule applies hardest. Polish (C) and accuracy thresholds (D) don't substitute for accountable review.

**26 — A.** Disclosure happens at the start of the session, always, for anything customer-facing. On-request (B) is the trap that sounds like balance; burying it in terms (C) is A with paperwork.

**27 — B.** Opposing views dismissed in a line is slant tell number two. Ask the question twice: are both sides treated fairly, and would every group recognize themselves?

**28 — A.** Personal information passes the org-policy gate before it enters any tool: anonymize, get explicit authorization, or keep it out. C and D are policy violations with extra steps.

### Domain 7 — Troubleshooting and Optimization

**29 — B.** Diagnose in order — instructions, then information, then effort, then escalate — because each check costs less than the one after it. Everything-at-once (C) means learning nothing about what fixed it; the upgrade-first reflex (A) spends before finding the fault.

**30 — B.** Fit cost to workload: the heavyweight-for-everything pattern is wasteful by definition. Rationing runs (C, D) treats the symptom and keeps paying the mismatch.

---

**Suggested reading order after scoring:** weakest domain first, then [exam-tips.md](../exam-tips.md), then the [recap deck](../assets/ccaof-recap-deck.pdf) the night before.
