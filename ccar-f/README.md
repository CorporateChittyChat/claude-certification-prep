# Claude Certified Architect – Foundations (CCAR-F)

Study material for the architect certification, built alongside the CCAR-F video series on
[CorporateChittyChat](https://www.youtube.com/@Corporatechittychat). This track is **in progress**: it grows one
lesson at a time, and the site will list it once the study notes, flashcards and mock exam are ready.

> **Independent study material. Not affiliated with, endorsed by, or approved by Anthropic.** "Claude" and
> certification names are Anthropic's trademarks, used here only to identify what this material helps you study for.

## What this exam tests

The foundations exams ask whether you can use Claude well. This one asks whether you can **design** with it. It
assumes you have built something with Claude and run into the problems it asks about. Two people can both drive across
town, but only the one who has built an engine can tell you why the car stalls.

## The exam at a glance

As of November 2026. Always confirm against Anthropic's official certification page before you book.

| | |
|---|---|
| Questions | 60 |
| Time | 120 minutes |
| Question types | Pick one answer, or pick several (each question says how many) |
| Delivery | Proctored through Pearson VUE, online or at a test centre |
| Pass mark | 720, on a scale of 100 to 1,000 |
| Valid for | 12 months |

After the exam you get a score report showing your percent correct on each objective, so a weak area cannot hide
behind a strong one.

## The five domains

They are not weighted equally. Domain 1 is the largest; check the official exam guide for the current weights.

1. **Agentic architecture**: how an agent runs in a loop, hands work to other agents, and stays under control.
2. **Tools and MCP**: designing the tools an agent can call, and plugging outside services into it.
3. **Claude Code**: setting it up for real team workflows: settings, hooks, permissions and your build pipeline.
4. **Prompts and structured output**: prompts that hold up in production, and answers in a shape your code can use.
5. **Context and reliability**: what goes in the context window, keeping long conversations useful, and keeping a
   system working when things go wrong.

## Lessons

Every lesson has three parts: the idea in plain words, a build you code along with, and the code in this folder.

| # | Lesson | Video | Build |
|---|---|---|---|
| 0 | Start here: the exam and the map | [Watch](https://youtu.be/_ZGCvPUaPEU) | — |
| 1.1 | Agentic loops | Coming soon | [`builds/1-1-agentic-loops/`](builds/1-1-agentic-loops/) |
| 1.2 | Multi-agent orchestration | Coming soon | — |

## Running the builds

Every build runs **free by default**: a mock client replays a scripted conversation and enforces the documented message
rules, so you can learn the loop with no account and no key. Each build has offline tests (`pytest -q`).

If you want to call the real API:

- The API is billed through the **Claude Console**, separately from a claude.ai subscription. **You do not need a Pro
  plan for this course.** Buy a small amount of API credits instead, and set a monthly spend limit first.
- **Use Haiku only.** It is the smallest model family and plenty for learning. Confirm the exact model id on the
  Console's Models page on the day.
- Keep your key in `.env` (git-ignored). Never commit it or show it in a screenshot.
