# CCDV-F mock exam — 30 questions

Thirty original questions spread across the CCDV-F series, one topic per episode, in the exam's scenario style. Treat it as a 60-minute sitting: two minutes per question.

> **Original practice material written for this project. These questions are not from the real exam, and doing well here is practice, not a prediction.**

**How to sit it:** no notes, 60 minutes, write your letters down, then mark against [mock-exam-answers.md](mock-exam-answers.md). Or take it in the **[interactive player](https://corporatechittychat.github.io/claude-certification-prep/ccdv-f/practice/mock-exam-player.html)**: timed, with per-topic results.

---

### EP 01 — Model selection

**1.** A helpdesk routes about 40,000 short tickets a day into one of six queues. On a labelled set of 500 real tickets, the smallest model scores 97% and the largest scores 98%, but the largest is several times the cost and noticeably slower. Which model should the router use?

- A. The largest model, because one extra point of accuracy matters at this volume
- B. The smallest model, because it clears the accuracy bar on representative data at a fraction of the cost and latency
- C. A mid-tier model as a safe compromise, without testing it on the labelled set
- D. Both models on every ticket, taking the largest model's answer whenever they disagree

**2.** A product manager asks for a monthly cost forecast for a summariser: about 200,000 requests, roughly 3,000 input tokens and 400 output tokens each, with the same 2,000-token system prompt on every call. Which forecast is sound?

- A. Requests × input tokens × the input price, since output is small enough to ignore
- B. Last quarter's bill for a different product, scaled by expected user count
- C. Requests × (input tokens × input price + output tokens × output price), with the repeated system prompt priced at prompt-caching rates
- D. Requests × total tokens × the output price, as a deliberately pessimistic worst case

**3.** An internal assistant sends the same 6,000-token policy manual ahead of every employee's question, and the bill is dominated by input tokens. What reduces cost most directly without changing answer quality?

- A. Put the manual first as a stable prefix and mark it for prompt caching, so repeat requests read it at the cached rate
- B. Store Claude's answers and return a stored answer whenever a new question looks similar
- C. Move the manual after the employee's question so the changing part of the prompt comes first
- D. Send these interactive questions through the Message Batches API to get the batch discount

**4.** An application checks loan agreements for covenant breaches. Hard cases need several reasoning steps across clauses, a few extra seconds of latency is acceptable, and accuracy on those hard cases is poor. Which change targets the problem?

- A. Raise the temperature so the model explores more possibilities
- B. Raise max_tokens and change nothing else
- C. Shorten the prompt so the model has less to read
- D. Enable extended thinking with a sensible budget, then compare accuracy on the hard cases

### EP 02 — Agents & workflows

**5.** About 90% of expense claims follow the same steps: extract the receipt, check it against policy, post it. The rest have unusual receipts that need judgement: ask the employee, escalate, or reject. Which architecture fits?

- A. A fully autonomous agent that decides every step for every claim
- B. A fixed workflow for the standard path, with an agent called only at the exception point
- C. One large prompt that handles extraction, policy checks and exceptions in a single call
- D. A separate subagent for each step of the standard path, coordinated by a manager agent

**6.** An agent writes research briefs that need four independent, document-heavy investigations. Its main conversation fills up with raw search output, and later steps lose track of the brief's goal. What change fits best?

- A. Raise the context window and keep every search result in the main conversation
- B. Run the four investigations one after another in the main conversation, with a reminder of the goal between each
- C. Have an orchestrator hand each investigation to a subagent with its own context, and return only condensed findings
- D. Drop the search tool and let the model answer from what it already knows

**7.** An agent sometimes calls the same search tool 40 times in a row on one task, running up cost without making progress. What is the most reliable fix?

- A. Enforce a tool-call budget and repeat detection in the agent loop's code, and stop with a clear status when the limit is reached
- B. Add a line to the system prompt telling the agent not to repeat searches
- C. Switch to a larger model, which is less likely to loop
- D. Remove the search tool so the loop cannot happen

**8.** A support agent can issue refunds through a tool. Most refunds are correct, but two large wrong refunds went out last month. What control should be added?

- A. A stronger system-prompt instruction to double-check refund amounts
- B. A rule that the agent only runs during business hours
- C. Retiring the refund tool and handling every refund manually
- D. A code-level gate on the refund tool: amounts above a threshold need human approval before they execute, and every refund is logged

### EP 03 — The Messages API

**9.** Users of a chat interface stare at a blank screen for about eight seconds before a long answer appears all at once. The answer is correct. What improves the experience?

- A. Stream the response so text appears as it is generated
- B. Send the requests through the Message Batches API
- C. Lower max_tokens so answers are shorter
- D. Cache the model's previous answers and show one of them first

**10.** A nightly job classifies 25,000 product reviews. Nobody is waiting on any single result, and the output is needed by the next working day. Which approach fits?

- A. Streaming each review so partial labels can be saved as they arrive
- B. The Message Batches API, which is built for large non-interactive jobs and costs less per request
- C. Standard Messages calls, sent one at a time to keep the order stable
- D. Standard Messages calls at the highest concurrency the rate limits allow

**11.** During traffic spikes, an application starts receiving 429 rate-limit errors from the API. What is the right response?

- A. Retry immediately in a tight loop until each request succeeds
- B. Issue a new API key for each burst of traffic so every key stays under its limit
- C. Retry with exponential backoff and jitter (honouring retry-after), smooth or queue bursts, and size traffic to your known limits
- D. Catch the 429 errors and return empty answers so users aren't kept waiting

**12.** Your company's cloud agreement requires all Claude traffic to go through Amazon Bedrock rather than the Anthropic API. You're starting a new application. How should you build it?

- A. Build on the Anthropic API now and move to Bedrock in a later release
- B. Build two complete code paths, one per provider, and choose at random per request
- C. Build on the Anthropic API and treat the agreement as a procurement detail
- D. Call Claude through Bedrock from the start, with the provider client and model IDs kept in configuration rather than spread through the code

### EP 04 — Prompt & context engineering

**13.** Extraction output keeps changing shape from one request to the next. You have four labelled input/output pairs that show exactly the format you want. What is the most direct way to use them?

- A. Fine-tune a custom model on the four pairs before going any further
- B. Describe the format again in longer prose and leave the pairs out
- C. Include the pairs in the prompt as clearly tagged few-shot examples
- D. Raise the temperature so the model tries more formats until one fits

**14.** You send an 80-page contract and ask one specific question about the indemnity clause. Where should each part go?

- A. The question first, so the model knows what to look for, then the contract
- B. The contract first in its own tagged section, with the question at the end
- C. The contract and the question in separate requests, so each stays short
- D. The question repeated after every chapter of the contract

**15.** A downstream service rejects any record that doesn't match its JSON schema, and about 2% of model outputs fail. What should the application do?

- A. Define the schema explicitly (structured output or a tool input schema), validate every response in code, and retry or repair on failure before passing anything on
- B. Ask the model in the prompt to always produce valid JSON and send the output straight downstream
- C. Switch to free text and let the downstream team write their own parser
- D. Have a person check every response before it goes downstream

**16.** After about 30 tool calls, a long-running agent starts ignoring constraints set at the start of the task, even though the full history still fits in the context window. What helps most?

- A. Move to a model with an even larger context window
- B. Restart the agent from scratch every five tool calls
- C. Repeat the full instruction set inside every tool result
- D. Compact the history: clear or summarise stale tool output, and keep the task's goal and constraints visible as active state

**17.** A prompt change was edited straight into production through an admin screen and broke a downstream report. Prompts live in three places: the repository, a config file, and inline strings. What prevents a repeat?

- A. Restrict the admin screen to senior engineers only
- B. Keep prompts in one version-controlled place, require review for changes, and run the eval set before any prompt change ships
- C. Copy the current prompts into a shared document as a backup
- D. Freeze all prompts permanently in their current form

### EP 05 — Tools & MCP

**18.** An agent keeps calling lookup_customer when it should call lookup_account. Both tools have short, similar descriptions. What is the first fix?

- A. Rename the tools and leave the descriptions as they are
- B. Add three more lookup tools so every case has an exact match
- C. Rewrite both descriptions to say what each tool returns, when to use it and when not to, and merge the two if they truly overlap
- D. Tell users to name the right tool in their requests

**19.** An agent passes date: "next Tuesday" to a booking tool that expects an ISO date, and the booking service fails with an unhelpful error. What is the best fix?

- A. Keep the input schema strict (format and description), validate arguments before calling the service, and return a tool result marked as an error that explains the expected format
- B. Loosen the schema so any string is accepted and let the booking service deal with it
- C. Quietly guess a date from the text and book it without telling the model
- D. Stop the whole run whenever a tool argument is invalid

**20.** A team wraps the company ticketing API as an MCP server. People across the organisation will connect to it from their own Claude clients. How should it be deployed?

- A. As a stdio server copied to every laptop, sharing one admin token
- B. As instructions in each repository's CLAUDE.md describing the ticketing API
- C. As a separate custom tool rewritten by each team inside its own application
- D. As a remote MCP server over HTTP, hosted centrally, with authentication and scoped permissions

### EP 06 — Settings & CLAUDE.md

**21.** A team wants every developer using Claude Code in a repository to get the same permission rules, while still letting individuals add personal tweaks. Where should the shared rules live?

- A. In .claude/settings.json committed to the repository, with personal overrides in .claude/settings.local.json, which isn't committed
- B. In each developer's own user settings, copied by hand from a wiki page
- C. In environment variables that each developer exports in their shell
- D. In a paragraph of CLAUDE.md asking Claude to follow the team's permission rules

**22.** A developer has personal preferences (tone of commit messages, preferred test runner) they want in every repository, plus project rules that belong to one repository. How should they arrange the memory files?

- A. Copy the personal preferences into every repository's CLAUDE.md
- B. Put personal preferences in the user-level CLAUDE.md in their home .claude folder, and project rules in the repository's CLAUDE.md
- C. Put everything in one repository's CLAUDE.md and link to it from all the others
- D. Skip memory files and retype the preferences at the start of each session

**23.** A teammate adds the staging database password to the project's CLAUDE.md "so Claude can run migrations". What should happen?

- A. Leave it, because CLAUDE.md is only read by Claude
- B. Move the password to the bottom of the file where it's less visible
- C. Remove it, rotate the password, and give Claude access through the environment or a secret store with permissions limited to what migrations need
- D. Base64-encode the password inside CLAUDE.md

### EP 07 — Claude Code: hooks, skills, headless

**24.** A team wants to make sure Claude Code can never run destructive shell commands such as recursive deletes against protected paths, whatever the prompt says. What fits?

- A. A strongly worded rule in CLAUDE.md
- B. Running with all permission checks bypassed and reviewing the transcript afterwards
- C. Asking developers to watch every command as it runs
- D. A PreToolUse hook that inspects each Bash command and blocks the destructive patterns before they execute

**25.** A CI pipeline needs Claude Code to run a fixed review task on every pull request, with no one there to approve prompts, and pass the result to the next pipeline step. How should it be set up?

- A. Run it non-interactively in print (headless) mode, allow only the tools the task needs, and capture structured output for the next step
- B. Run an interactive session and have an engineer approve each prompt from the pipeline logs
- C. Turn off permission checks globally on every machine so nothing ever asks
- D. Replace Claude Code with a shell script that pastes the diff into a chat window

**26.** Your team has a release-notes procedure: a set of instructions plus two helper scripts. You want Claude to pick it up automatically whenever someone asks for release notes in the repository. What's the best home for it?

- A. Paste the full procedure into the repository's CLAUDE.md so it's always in context
- B. A Skill in the repository's .claude/skills folder: a SKILL.md with a clear description, plus the scripts, committed for the whole team
- C. A text file in each developer's downloads folder, attached when needed
- D. An MCP server that returns the instructions as a single text resource

### EP 08 — Requirements & build life cycle

**27.** The business brief says: "Use agents to help analysts produce client memos faster." You're asked to turn it into work engineering can start on. What comes first?

- A. Choose the model tier the memos will run on
- B. Build a prototype and show it to the analysts
- C. Write the functional and non-functional requirements: inputs, outputs, data access, latency, review steps and how "faster" will be measured
- D. Look up what agent products competitors have released

**28.** An API parameter your application uses in about 40 places is deprecated, with six months before removal and a replacement that behaves slightly differently. How should you migrate?

- A. Change all 40 call sites in one commit the week before removal
- B. Wrap the old parameter in a helper and leave it until it breaks
- C. Change all 40 call sites today in one large commit, with no extra tests
- D. Add regression tests that pin the current behaviour, then migrate the call sites in batches, checking each batch against the tests

### EP 09 — Eval, testing & debugging

**29.** A team wants to rewrite a production prompt to improve answers on billing questions. How do they know the rewrite is safe to ship?

- A. Run a representative eval set, including billing and other edge cases with graded expectations, on both the old and new prompt, and ship only if billing improves without regressions elsewhere
- B. Try five billing questions by hand and ship if they look better
- C. Ship it to everyone and watch for complaints
- D. Ask the model to rate its own new answers

**30.** An application starts mentioning facts that aren't in the documents it was given. The team calls it hallucination and proposes a bigger model. What should come first?

- A. Upgrade to the bigger model and see whether the problem goes away
- B. Look at full traces of the failing requests to find out what happened (missing or wrong retrieved context, truncation, injected text, or genuine fabrication) before choosing a fix
- C. Add "do not make things up" to the system prompt
- D. Lower the temperature to zero for all requests
