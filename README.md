# Claude Certification Prep

Free, community-written study material for Anthropic's Claude certifications — study notes per exam domain, original practice questions, a full mock exam, and a printable recap deck.

Built alongside the **[CCAO-F Exam Prep video series](https://www.youtube.com/playlist?list=PLFbwN1bk0S4c)** on [CorporateChittyChat](https://www.youtube.com/@Corporatechittychat), a channel for non-developer IT professionals — project managers, business analysts, delivery leads — working with AI. The **[CCDV-F Exam Prep series](https://www.youtube.com/playlist?list=PLHvgccck0QgI)** covers the developer certification, with runnable code in [ccdvf-course](https://github.com/chittychat-studio/ccdvf-course).

> **Independent study material. Not affiliated with, endorsed by, or approved by Anthropic.** "Claude" and certification names are Anthropic's trademarks, used here only to identify what these materials help you study for. Every practice question in this repo is original material written for this project — nothing here is from, or derived from, any real exam.

## Certifications covered

| Track | Status | Material |
|---|---|---|
| **Claude Certified Associate – Foundations (CCAO-F)** | Complete | [`ccao-f/`](ccao-f/) — 7 domain study guides, 37 practice questions, recap deck, video series |
| **Claude Certified Developer – Foundations (CCDV-F)** | Complete | [`ccdv-f/`](ccdv-f/) — episode index, video series, 30-question mock exam; runnable code per episode in [chittychat-studio/ccdvf-course](https://github.com/chittychat-studio/ccdvf-course) |
| Claude Certified Architect – Foundations (CCAR-F) | Planned | — |
| Claude Certified Architect – Professional (CCAR-P) | Planned | — |

Each certification gets its own top-level folder with the same shape: `domains/` study notes, `practice/` questions and mock exams, `assets/` printable material, and a README mapping everything to the companion videos. The developer track is code-first, so its runnable builds live in a separate companion repo and `ccdv-f/` maps each episode to them.

## Start here (CCAO-F)

1. **Watch or skim** the [video series](https://www.youtube.com/playlist?list=PLFbwN1bk0S4c) — 10 videos: one domain per episode plus a bonus on why people fail the exam, ~6–7 minutes each, each ending with a worked practice question.
2. **Read** the [domain study guides](ccao-f/domains/) for the written version of every move, trap, and rule.
3. **Test yourself** with the [episode questions](ccao-f/practice/episode-questions.md) and the [30-question mock exam](ccao-f/practice/mock-exam.md).
4. **The night before**, run through the [recap deck](ccao-f/assets/ccaof-recap-deck.pdf) and the [exam tips](ccao-f/exam-tips.md).

Exam format, registration, and validity details: [`ccao-f/exam-logistics.md`](ccao-f/exam-logistics.md) (with an as-of date — always confirm against the official page).

## Start here (CCDV-F)

1. **Read** the [CCDV-F overview](ccdv-f/) for the episode-by-domain map.
2. **Watch** the [video series](https://www.youtube.com/playlist?list=PLHvgccck0QgI) — 12 videos: Episode 00 covers the exam itself, then one domain per episode, EP 10 on security, and a wrap-up.
3. **Build** each episode's hands-on project from the [companion code repo](https://github.com/chittychat-studio/ccdvf-course) — Python and TypeScript, one folder per episode.
4. **Test yourself** with the [30-question mock exam](ccdv-f/practice/mock-exam.md) ([interactive version](https://corporatechittychat.github.io/claude-certification-prep/ccdv-f/practice/mock-exam-player.html)) and each episode's `PRACTICE.md` (EP 04 onward).

## Flashcards and traps

**[Flashcards & traps](https://corporatechittychat.github.io/claude-certification-prep/flashcards.html)** — illustrated flip-card revision for both tracks (CCAO-F and CCDV-F), each answer with a mini diagram, a worked example and a memory hook, plus a "traps only" filter, saved progress, and a printable sheet that puts every exam trap next to the rule that beats it. ([source](flashcards.html))

## Contributing

Corrections and clarifications are welcome as issues or pull requests. Two hard rules for contributions: nothing from any real exam, ever (original practice material only), and no claims about Claude's behavior or Anthropic's products that current official documentation doesn't support.

## License

[CC BY-NC-SA 4.0](LICENSE.md) — share and adapt with credit, non-commercially, under the same license.
