# CCDV-F mock exam — answers and explanations

Score per topic. Any topic where you missed two or more: rewatch that episode and work through its companion code before booking.

> Original practice material — not from the real exam.

### EP 01 — Model selection

**1 — B.** Fit the model to the task, measured on your own data. A simple, high-volume, latency-sensitive classifier that already clears the bar on the small model doesn't earn the large model's price. C skips the evidence you already have; D pays for both models on every request.

**2 — C.** A real forecast prices input and output separately (output tokens cost more per token) and accounts for caching on the repeated prefix. A drops the expensive side; B borrows someone else's traffic shape; D is a guess dressed up as caution.

**3 — A.** Prompt caching works on a stable prefix, which is exactly what a repeated manual is. B replaces fresh answers with stale guesses for 'similar' questions; C breaks the prefix so nothing caches; D is for non-interactive work and makes users wait.

**4 — D.** Multi-step reasoning with latency to spare is what extended thinking is for, and the eval on hard cases tells you whether it paid off. Temperature (A) changes randomness, not reasoning depth; max_tokens alone (B) only lifts the output ceiling; C removes context the reasoning needs.

*Companion code: [ep01-models](https://github.com/chittychat-studio/ccdvf-course/tree/main/ep01-models)*

### EP 02 — Agents & workflows

**5 — B.** Use a workflow where the steps are known and an agent only where judgement is needed. A pays for flexibility on the 90% that doesn't need it; C gives up the checkpoints; D adds coordination overhead to steps that are already deterministic.

**6 — C.** Subagents isolate the heavy, independent work and hand back only what the orchestrator needs, which keeps the main context focused. A and B keep the noise that caused the problem; D throws away the evidence.

**7 — A.** Limits that must always hold belong in code, not in the prompt. B is a request the model may ignore; C may reduce loops but guarantees nothing; D fixes the loop by breaking the agent.

**8 — D.** Irreversible, costly actions get a deterministic gate plus a human for the risky band. A is advice, not a control; B moves the risk to different hours; C throws away the automation that works for most refunds.

*Companion code: [ep02-agents](https://github.com/chittychat-studio/ccdvf-course/tree/main/ep02-agents)*

### EP 03 — The Messages API

**9 — A.** Streaming delivers tokens as they're generated, so time-to-first-text drops even though total time doesn't. Batches (B) are slower by design; C cuts the content users came for; D shows the wrong answer quickly.

**10 — B.** Large, non-interactive, deadline-tolerant work is the Message Batches API's job, at a discount. Streaming (A) is for a person watching; C is slow; D works but pays full price and spends rate-limit headroom on work that doesn't need it.

**11 — C.** Back off, respect the server's hint, and shape traffic to the limits you actually have. The SDKs already retry some errors by default, and you can tune that. A makes the spike worse; B is trying to get around limits rather than designing for them; D hides the failure from users.

**12 — D.** Contractual routing is a requirement from day one, not a later migration. Keeping provider details in configuration keeps the rest of the code clean. A and C break the agreement; B doubles the surface area for no benefit.

*Companion code: [ep03-messages](https://github.com/chittychat-studio/ccdvf-course/tree/main/ep03-messages)*

### EP 04 — Prompt & context engineering

**13 — C.** A handful of well-chosen examples in the prompt is the cheapest, strongest way to pin down format. A is a big project for a few examples; B is what's already failing; D adds variation when you want less.

**14 — B.** Long documents go at the top, wrapped in clear tags, with the question at the end, closest to where the answer starts. A buries the question under 80 pages; C means the model never sees both together; D is noise.

**15 — A.** Constrain the output, then verify it in code: a known failure path with retry or repair. B relies on a request; C moves the problem to someone else; D doesn't scale and still lets mistakes through.

**16 — D.** The problem is relevance, not capacity: old tool output is burying what matters. Compaction and pruning keep the active state in front of the model. A makes room for more noise; B loses progress; C bloats every turn.

**17 — B.** Prompts are code: one source of truth, version history, review, and evals as a gate. A still allows unreviewed changes; C is a snapshot, not a process; D stops the prompts from ever improving.

*Companion code: [ep04-prompting](https://github.com/chittychat-studio/ccdvf-course/tree/main/ep04-prompting)*

### EP 05 — Tools & MCP

**18 — C.** The model chooses tools mainly from their descriptions, so make each one distinct and explicit. A helps a little but leaves the ambiguity; B multiplies it; D pushes the job onto the user.

**19 — A.** Validate before you dispatch, and turn invalid input into an error the model can read and fix. B passes bad data further down; C books the wrong date silently; D turns a recoverable mistake into an outage.

**20 — D.** A shared, many-client server belongs on a remote transport with real authentication. stdio suits a single local process. A spreads one powerful credential everywhere; B describes the API but doesn't connect to it; C duplicates the integration in every team.

*Companion code: [ep05-tools-mcp](https://github.com/chittychat-studio/ccdvf-course/tree/main/ep05-tools-mcp)*

### EP 06 — Settings & CLAUDE.md

**21 — A.** Project settings are committed and shared; local settings are personal and stay out of git. B and C drift across machines; D turns enforced permissions into advice.

**22 — B.** CLAUDE.md files are layered: user-level for what's yours everywhere, project-level for what belongs to the repository. A spreads personal taste into shared files; C ties every repository to one; D forgets everything each time.

**23 — C.** CLAUDE.md is committed and loaded into context, so a secret there is leaked twice. Remove it, rotate it (git history keeps the old value), and supply credentials the proper way. A and B leave it exposed; D is not encryption.

*Companion code: [ep06-config-checker](https://github.com/chittychat-studio/ccdvf-course/tree/main/ep06-config-checker)*

### EP 07 — Claude Code: hooks, skills, headless

**24 — D.** Hooks run your code at fixed points, so the block happens every time. A PreToolUse hook can refuse the call before it runs. A is guidance the model can miss; B removes the safety net; C depends on attention that runs out.

**25 — A.** Headless mode is built for automation: non-interactive, scoped permissions, machine-readable output. B isn't automation; C removes safeguards everywhere, not just in CI; D gives up the tooling.

**26 — B.** Skills package instructions and scripts, and load only when their description matches the task. A puts the procedure into every session's context whether it's needed or not; C isn't shared or discoverable; D builds a server for something that is mostly instructions.

*Companion code: [ep07-guard-hook](https://github.com/chittychat-studio/ccdvf-course/tree/main/ep07-guard-hook)*

### EP 08 — Requirements & build life cycle

**27 — C.** Requirements translate the goal into something testable, and every later choice is judged against them. A and B pick solutions before the problem is defined; D gathers background, not requirements.

**28 — D.** Tests first, then small batches you can check: the semantics differ, so you need evidence at each step. A and C are big-bang changes with no safety net; B delays the problem until it becomes an outage.

*Companion code: [ep08-gate-checker](https://github.com/chittychat-studio/ccdvf-course/tree/main/ep08-gate-checker)*

### EP 09 — Eval, testing & debugging

**29 — A.** Evals compare before and after on the cases that matter, including the ones you're not trying to change. B is anecdote; C makes users the test suite; D is self-grading with no reference.

**30 — B.** Diagnose before you treat. The same symptom has different causes, and the trace shows which one this is. A, C and D are fixes chosen before the fault has been found.

*Companion code: [ep09-failure-checker](https://github.com/chittychat-studio/ccdvf-course/tree/main/ep09-failure-checker)*

---

**Next:** take the [interactive version](https://corporatechittychat.github.io/claude-certification-prep/ccdv-f/practice/mock-exam-player.html) for timed practice, and see the [CCDV-F overview](../README.md) for the episode map.
