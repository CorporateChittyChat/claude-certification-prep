# CCDV-F — Claude Certified Developer – Foundations

Study material for Anthropic's developer-track Claude certification, written by someone who sat and passed it. Where the [CCAO-F track](../ccao-f/) is for people who use Claude at work without writing code, this one is for people who build with it: the API, agents, tools and MCP, and Claude Code.

Episode 00 covers the exam itself: format, eligibility, the eight domains and what to expect on the day. Then one domain per episode: a concept walkthrough, a hands-on build you can run yourself, and a practice question in the exam's own style.

> Independent study material — not affiliated with or endorsed by Anthropic. All practice questions are original, written for this project. None are from the real exam. Exam details change; confirm the current exam guide before you book.

## Where the material lives

The developer track is code-first, so its runnable material lives in its own repo:

- **Companion code:** [chittychat-studio/ccdvf-course](https://github.com/chittychat-studio/ccdvf-course) — one folder per episode, each with a README (how to run it) and, from EP 04 on, a `PRACTICE.md` with hands-on exercises and original practice questions.
- **Videos:** [CCDV-F Exam Prep playlist](https://www.youtube.com/playlist?list=PLHvgccck0QgI)

## Episodes

| Episode | Domain | Companion code | Language | Needs an API key? |
|---|---|---|---|---|
| EP 00 | The exam: format, eligibility, the eight domains | — | — | — |
| EP 01 | Model selection and optimization | [`ep01-models`](https://github.com/chittychat-studio/ccdvf-course/tree/main/ep01-models) | Python | Yes |
| EP 02 | Agents and workflows | [`ep02-agents`](https://github.com/chittychat-studio/ccdvf-course/tree/main/ep02-agents) | TypeScript | Yes |
| EP 03 | Applications and integration, part 1: the Messages API | [`ep03-messages`](https://github.com/chittychat-studio/ccdvf-course/tree/main/ep03-messages) | Python | Yes, except `image_cost.py` |
| EP 04 | Prompt and context engineering | [`ep04-prompting`](https://github.com/chittychat-studio/ccdvf-course/tree/main/ep04-prompting) | Python | Yes, except `check_offline.py` |
| EP 05 | Tools and MCP | [`ep05-tools-mcp`](https://github.com/chittychat-studio/ccdvf-course/tree/main/ep05-tools-mcp) | TypeScript | No |
| EP 06 | Applications and integration, part 2: settings and CLAUDE.md | [`ep06-config-checker`](https://github.com/chittychat-studio/ccdvf-course/tree/main/ep06-config-checker) | TypeScript | No |
| EP 07 | Claude Code: permission modes, hooks, subagents, skills and plugins | [`ep07-guard-hook`](https://github.com/chittychat-studio/ccdvf-course/tree/main/ep07-guard-hook) | TypeScript | No |
| EP 08 | Applications and integration, part 3: requirements, the build life cycle and the seams | [`ep08-gate-checker`](https://github.com/chittychat-studio/ccdvf-course/tree/main/ep08-gate-checker) | Python | No |
| EP 09 | Eval, testing and debugging | [`ep09-failure-checker`](https://github.com/chittychat-studio/ccdvf-course/tree/main/ep09-failure-checker) | TypeScript | No |

## How to use it

1. **Watch** the episode for the concept and the exam trap.
2. **Run** the episode's folder in the companion repo. Keep your API key in `.env`, never in code; episodes 05–09 run without a key.
3. **Practice** with that folder's `PRACTICE.md` (EP 04 onward).
4. **Test yourself** with the mock exam below once you've covered the episodes.

## Practice

- [Mock exam](practice/mock-exam.md) — 30 original questions, one topic per episode. Answers and explanations in [mock-exam-answers.md](practice/mock-exam-answers.md).
- **[Interactive exam player](https://corporatechittychat.github.io/claude-certification-prep/ccdv-f/practice/mock-exam-player.html)** — the same 30 questions as a timed exam simulator (60:00 countdown, strikethrough, flag-for-review, per-topic results with links to each episode's code). Opens in the browser; nothing to install. ([source](practice/mock-exam-player.html))

## A note on product facts

Model ids, prices and limits are deliberately not hard-coded in the companion code — they change. Read them from [Anthropic's documentation](https://docs.claude.com) on the day you run each build.
