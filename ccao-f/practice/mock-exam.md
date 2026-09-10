# CCAO-F mock exam — 30 questions

Thirty original questions weighted across the seven domains, written in the real exam's scenario style. Half the length of the real paper — treat it as a 60-minute sitting (two minutes per question, same pace as the real thing).

> **Original practice material written for this project. These questions are not from the real exam, and doing well here is practice, not a prediction.**

**How to sit it:** no notes, 60 minutes, write your letters down, then mark against [mock-exam-answers.md](mock-exam-answers.md). Passing pace on the real paper allows a good number of misses — what matters is *which* domains you missed, so score per domain and reread those guides.

---

### Domain 1 — Prompting and Task Execution

**1.** A colleague's prompt reads "improve this document." The output is long, generic, and unusable. The highest-value first fix is to:

- A. Run the prompt again — sometimes the second draft is better
- B. Rewrite the prompt to name a role, the audience, the format, and what to skip
- C. Switch to a more capable model
- D. Split the request into ten smaller prompts

**2.** You're asking Claude a question about a sixty-page policy document pasted into the prompt. Where should the question go?

- A. Before the document, so Claude knows what to look for
- B. After the document, at the end of the prompt
- C. In the middle, next to the most relevant section
- D. In a separate follow-up message with no document attached

**3.** One prompt carries your instructions, three paragraphs of background, and a pasted report, all run together. Answers keep confusing the background with the report's content. The fix is to:

- A. Shorten the background
- B. Ask Claude to be more careful about what came from where
- C. Fence each part in its own labeled section — instructions, context, document
- D. Send the background and the report in separate chats

**4.** A monthly data task — extract figures from five reports, reconcile them, then write a summary — keeps failing when asked as one big prompt. The pattern to reach for is:

- A. A more detailed single prompt covering all three stages
- B. Chaining — extract first, then reconcile, then summarize, each step feeding the next
- C. Asking for the summary first and the reconciliation only if it looks wrong
- D. Repeating the prompt until one run gets all three stages right

**5.** A prompt has been rewritten five times. The answers are accurate every time, but far too slow for the daily deadline it serves. The next move is:

- A. Rewrite number six, focused on brevity
- B. Accept the speed — accuracy matters more
- C. Recognize this is no longer a prompt problem and look at model choice instead
- D. Delete the prompt's examples to make it shorter

### Domain 2 — Output Evaluation and Validation

**6.** A market summary cites "the 2025 Meridian Retail Index" — which you cannot find anywhere. The write-up is otherwise excellent. You should treat this as:

- A. A formatting quirk — ask Claude for the correct link
- B. A fabrication tell — verify every claim resting on that source before anything ships
- C. Proof the report is paywalled — cite it as given
- D. Acceptable, as long as the summary's conclusions sound right

**7.** An analysis states a precise figure — "a 34.7 percent reduction" — that appears nowhere in the documents you supplied. The precision of the number means:

- A. Claude computed it from the documents, so it can be trusted
- B. Nothing — precision is not evidence, and an unsourced statistic is a fabrication tell
- C. It came from Claude's general knowledge, which is acceptable for statistics
- D. The documents must contain it somewhere you haven't looked

**8.** You've reviewed a ten-claim output and found one real error. After fixing it, you should:

- A. Ship it — the error has been corrected
- B. Ask Claude what caused the error
- C. Keep auditing — one found error means others are likely
- D. Regenerate the whole output and use whichever version reads better

**9.** Before a research task, you want the output to be easier to verify. The single most effective instruction to add is:

- A. "Be accurate"
- B. "I don't know is an acceptable answer"
- C. "Double-check everything before answering"
- D. "Write in a confident, authoritative tone"

**10.** Your director needs the conclusion of a forty-page analysis; the delivery team needs the method. Claude produced one detailed step-by-step write-up. The right move is:

- A. Send it to both — the content is identical
- B. Send the director the first page only
- C. Produce two shapes of the same content — three lines for the director, the steps for the team
- D. Ask the director to read the summary section

**11.** A structured export passed its format validation — every field present, every bracket closed. This guarantees:

- A. The data inside the fields is correct
- B. The shape only — the contents still need human checking
- C. The totals reconcile
- D. The export is ready for the downstream system, checks complete

### Domain 3 — Product and Model Selection

**12.** Every Monday you produce the same status report from the same folder of documents, re-explaining the format each time. The right door is:

- A. A longer prompt that includes the format
- B. A project — instructions and knowledge saved once, used by every chat inside it
- C. The most capable model, which needs less explaining
- D. Asking Claude to remember the format at the end of each session

**13.** You need real percentage changes computed from a spreadsheet's actual figures, then charted. The right door is:

- A. Ask Claude to estimate the trends from the file
- B. Code execution — compute and chart from the real data
- C. A carefully-worded prompt asking for precise arithmetic
- D. Research

**14.** Eight hundred support tickets need sorting into five categories, one line each. The right rung is:

- A. The most capable model — quality matters everywhere
- B. A fast, light model — high volume, simple judgment
- C. Split the batch across every model family for comparison
- D. Whichever model the team used last

**15.** A long working session has gone soft — answers drifting, earlier details missed. The best next step is:

- A. Keep going but write more forceful prompts
- B. Start a clean session carrying forward just the decisions and key state
- C. Paste the full transcript into a new session so nothing is lost
- D. Switch to a bigger model mid-session and continue

**16.** A colleague says their analysis is weak and wants budget for the top model. They haven't checked what the current model was given. The first question is:

- A. Whether the budget covers the bigger model's per-run cost
- B. Whether the model actually saw the information the task needs
- C. Which model the competitor teams use
- D. Whether the analysis can be split across two models

### Domain 4 — Workflow Integration and Solution Design

**17.** You're choosing where Claude helps a five-step process. The step to target is the one where:

- A. The team complains the loudest
- B. Time consumed and language work — reading, drafting, summarizing — both run high
- C. The newest tools are already installed
- D. Automation is technically easiest, whatever the impact

**18.** Incoming requests are mostly routine, with a hard minority needing deep analysis. The pattern that fits is:

- A. A chain — every request through the same steps
- B. A router — easy items to the fast model, hard ones up the ladder
- C. An autonomous agent deciding everything case by case
- D. Parallel passes over every request regardless of difficulty

**19.** A team's document review workflow works well in tools that already hold the data. Leadership wants "AI transformation." The recommendation that survives scrutiny is:

- A. Rebuild the workflow around a new AI-native platform
- B. Wire Claude into the existing tools at the step where it measurably pays, and keep the rest standing
- C. Run the old and a fully new workflow in parallel indefinitely
- D. Wait — transformation this early is all risk

**20.** Presenting your pilot to stakeholders, the strongest slide reports:

- A. The vendor's published case-study results for teams like yours
- B. Your own pilot's measured numbers, its costs, and the steps that keep a human reviewer
- C. Only the wins — limits invite doubt
- D. A projection of company-wide savings from the vendor's calculator

### Domain 5 — Configuration and Knowledge Management

**21.** One workspace has accumulated sales decks, legal templates, and research papers. Answers have grown erratic. The fix is:

- A. Better prompts specifying which materials to use per question
- B. Split into separate projects by purpose — contradictory materials destabilize every answer
- C. Remove all files and paste per-chat instead
- D. Add instructions telling Claude to be more consistent

**22.** You've uploaded the right documents, but answers keep blending them with general knowledge and you can't tell which is which. The instruction to add is:

- A. "Prefer the uploaded documents where possible"
- B. "Answer only from these materials, and say unknown for anything not in them"
- C. "Cite when using general knowledge"
- D. "Be careful about sources"

**23.** To make sure a report project never misses context, a teammate proposes connecting the department's entire shared drive and instructing Claude to ignore irrelevant files. This will:

- A. Work — the instruction handles the noise
- B. Quietly sink accuracy — the irrelevant files join every search anyway; connect the minimum instead
- C. Work, but only with a more capable model
- D. Improve answers, since more context is always better

**24.** A project's instructions were written eight months ago; the business has since renamed two products and changed the report template. The move is:

- A. Nothing — instructions don't expire
- B. Audit the setup: reread instructions against today's purpose, remove stale files, refresh what changed
- C. Add a note telling Claude the instructions may be outdated
- D. Start a new project every month as a rule

### Domain 6 — Governance, Risk, and Responsible Use

**25.** Claude drafts rejection letters from screening notes, and a manager proposes auto-sending them to save a day per week. This is:

- A. Fine — rejections are routine correspondence
- B. Not allowed to run unreviewed — employment decisions are high-stakes and a qualified human reviews before anything reaches a candidate
- C. Fine if the letters are polite and well-written
- D. Fine once accuracy exceeds a threshold in testing

**26.** For a customer-facing assistant, AI involvement must be disclosed:

- A. At the start of every session
- B. When a customer directly asks
- C. In the terms and conditions page
- D. Only for complex queries where errors are likelier

**27.** A briefing on a contested policy topic presents one position thoroughly and dismisses the opposing view in a single line. This is:

- A. Efficient prose — the opposing view was at least mentioned
- B. A slant tell — balance is checked, never assumed, and your review is the last line
- C. Acceptable if the thorough side is the more popular one
- D. A length problem — ask for a longer version

**28.** A teammate wants to paste a customer list with contact details into Claude to draft outreach emails. Before anything else:

- A. Check the organization's data policy — anonymize, get explicit authorization, or keep it out
- B. Proceed — email drafting is a standard use case
- C. Paste it but delete the chat afterwards
- D. Use a personal account to keep it off the company workspace

### Domain 7 — Troubleshooting and Optimization

**29.** A recurring task's outputs have gone inconsistent. The team's proposals: upgrade the model, rewrite the prompt a third time, attach more documents. The right order of work is:

- A. Model upgrade first — inconsistency is a capability problem
- B. Diagnose in order: check the instructions are specific, check the task has the information it needs, then escalate — before spending on anything
- C. All three at once, to fix it fastest
- D. More documents first — context cures inconsistency

**30.** After tuning, a team runs its heavyweight model on everything — including sorting a thousand routine entries a week — and the bill shows it. The durable fix is:

- A. Keep it — the best model gives the best results everywhere
- B. Fit cost to workload — light model for the high-volume sorting, capable model for the deep judgment work
- C. Run the sorting less often
- D. Cap the number of sorting runs and queue the overflow

---

Mark yourself against [mock-exam-answers.md](mock-exam-answers.md) — per domain, not just the total.
