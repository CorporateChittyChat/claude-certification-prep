/* Study notes for learn.html, one entry per track.
   Original material written for this project. Nothing here is from, or derived from, a real exam.
   Domain shape:
     id, code, title, eps (episodes covered), summary,
     t (flashcard topic index), links ([icon, label, url]),
     highlights (key exam points), subs ([{title, know:[...], traps:[{move, why}]}]), remember.
   Product facts (model ids, prices, limits, feature names) change: the page tells learners to confirm them
   at docs.claude.com on the day. The judgement is what is being taught. */
(function(){
const REPO = "https://github.com/chittychat-studio/ccdvf-course/tree/main/";
const BLOB = "https://github.com/chittychat-studio/ccdvf-course/blob/main/";
const YT = "https://youtu.be/";

window.LEARN_DATA = {
"ccdv-f": {
  title: "CCDV-F study notes",
  name: "Claude Certified Developer – Foundations",
  intro: "The eight exam domains, each split into what you need to know and the traps the questions are built around. Read a domain, watch its episode, run its build in the companion repo, then test yourself.",
  asOf: "3 November 2026",
  exam: "ccdv-f/practice/mock-exam-player.html",
  flash: "flashcards.html?track=ccdv-f",
  path: "path.html?track=ccdv-f",
  repo: "https://github.com/chittychat-studio/ccdvf-course",
  overview: [
    ["▶", "EP 00 · The exam: format and the eight domains (6 min)", YT + "alqhsExgcR8"],
    ["▶", "Wrap-up · Tips and traps per domain (54 min)", YT + "KzK9R89sMtM"]
  ],
  domains: [

  /* ---------------------------------------------------------------- D1 */
  {
    id: "d1", code: "D1", title: "Agents and workflows", eps: "EP 02", t: 1,
    summary: "When to use a workflow, when to use an agent, how to wire the loop, and how to split work across subagents without losing control.",
    links: [
      ["▶", "Watch EP 02 (9 min)", YT + "2WyMrBTmmUs"],
      ["⌨", "Build: ep02-agents (TypeScript)", REPO + "ep02-agents"]
    ],
    highlights: [
      "Start with the simplest thing that works: a single call, then a workflow, then an agent. Each step up costs money, latency and predictability.",
      "Fixed, known steps belong in a workflow. An agent earns its place only where the path cannot be written down in advance.",
      "A subagent sees only what you hand it. The delegation brief is the whole of its context.",
      "Every agent loop needs an exit condition in code and a human gate before anything irreversible."
    ],
    subs: [
      {
        title: "Workflow or agent: decide before you build",
        know: [
          "A workflow is code that calls Claude at fixed steps. You choose the path; the model fills in each step.",
          "An agent is a loop where the model chooses the next tool call. You give it the goal and the tools, not the path.",
          "Choose a workflow when you can list every step, when a wrong step is costly, and when you need ordinary logging and tests.",
          "Choose an agent when inputs vary too much to script, and the work needs the model to sequence tools itself.",
          "Hybrids are common and usually right: a workflow for the standard path, and an agent called only at the one decision point that needs judgement."
        ],
        traps: [
          { move: "Use an agent for everything because it is the most capable option", why: "A fixed path gains nothing from model-directed control flow and still pays the extra cost, latency and error risk. Put known, repeating steps in a workflow." },
          { move: "One giant prompt can handle the standard cases and the odd ones in a single call", why: "It mixes cheap, predictable work with judgement calls and makes failures hard to find. Split the standard path from the exception path." }
        ]
      },
      {
        title: "Agent patterns: chain, router, parallel, orchestrator",
        know: [
          "Prompt chain: step A's output feeds step B. Good when stages have different success criteria (triage, then draft a reply).",
          "Router: classify the input first, then send it to the prompt or model built for that kind of input.",
          "Parallel: run independent subtasks at once and merge the results, or run the same task several times and vote.",
          "Orchestrator and workers: a lead agent breaks the job down, hands each piece to a focused subagent and reconciles the answers.",
          "Graph or state machine: when work must loop back (extract, check, extract again), model the states and the allowed moves between them."
        ],
        traps: [
          { move: "A strict linear chain fits a process that sometimes needs to go back a step", why: "A chain has no return path. When a stage can fail and send work back, use a graph with explicit states and transitions." },
          { move: "Give one agent every tool it might need across all subtasks", why: "Tool choice degrades as the tool list grows, and one context fills with unrelated history. Scope tools and context per subtask." }
        ]
      },
      {
        title: "Subagents and context isolation",
        know: [
          "A subagent starts with a fresh context. It does not see the lead's conversation unless the runtime forks it.",
          "The brief must carry the goal, the relevant earlier results, the constraints and policies, the tools, and when to stop.",
          "Isolation is a feature: each worker reasons over a small, relevant context and returns a summary, not its whole history.",
          "The lead owns quality. It sets tool budgets, checks each worker's output against a schema and resolves contradictions before passing anything on."
        ],
        traps: [
          { move: "The worker will follow the policy we agreed with the lead agent", why: "Unless it is a fork, the worker never saw that conversation. State the policy in every delegation brief." },
          { move: "Let subagents read each other's outputs so they can sort out contradictions themselves", why: "That removes the one place where checking happens. Strengthen the lead: budgets, schema checks and explicit hand-off contracts." }
        ]
      },
      {
        title: "Wiring the loop: API loop, Agent SDK, managed agents",
        know: [
          "Three ways to run the same loop: write it yourself on the Messages API, use the Agent SDK, or use a hosted managed-agent service.",
          "Writing it yourself gives full control and full responsibility: dispatch, history, retries, limits.",
          "The Agent SDK runs the loop, tool dispatch and history for you. If you chose it to avoid a custom loop, let it do that job.",
          "A hosted service also takes the sandbox and session state off your hands. Regulated data or residency rules can rule it out, so check those first.",
          "Whatever the path: register the tools, scope the system prompt, define the exit condition, and place at least one human check."
        ],
        traps: [
          { move: "Use the SDK's tool interface, but write our own loop and history store alongside it", why: "That rebuilds the part you adopted the SDK to avoid. Use its loop, dispatch and history unless a specific need says otherwise." },
          { move: "The agent will stop when it decides the task is done", why: "An exit condition must not depend on the model volunteering to stop. Cap turns, cost or time in code." }
        ]
      },
      {
        title: "Human in the loop and long-running work",
        know: [
          "Gate before any destructive or outward action: write, delete, send, pay.",
          "Gate after a plan and before it runs when a wrong plan would waste every later step.",
          "Gate on unexpected output: an error flag, an empty result, or a value outside the expected range.",
          "Long tasks need checkpoints: save intermediate state so an interrupted run resumes from the last good step instead of starting over.",
          "Memory scope follows the session's shape: in-context for one session, external storage for state that must survive or be shared, a summary when a condensed carry-over is enough."
        ],
        traps: [
          { move: "Raise the timeout so interruptions become rare", why: "Rare is not never, and a 60-minute task that restarts from zero wastes the whole run. Persist checkpoints and resume from them." }
        ]
      }
    ],
    remember: [
      "Simplest first: call, workflow, agent.",
      "Known steps go in a workflow; judgement goes in an agent.",
      "The brief is the subagent's whole world.",
      "Exit conditions and human gates live in code."
    ]
  },

  /* ---------------------------------------------------------------- D2 */
  {
    id: "d2", code: "D2", title: "Applications and integration", eps: "EP 03, EP 06, EP 08", t: 2,
    summary: "Calling Claude from real software: the SDK and Messages API, streaming, files and batches, configuration as code, and taking a feature from business ask to production.",
    links: [
      ["▶", "Watch EP 03 (9 min)", YT + "iMBVThGLJi0"],
      ["▶", "Watch EP 06 (8 min)", YT + "3dEtqvjJEoc"],
      ["▶", "Watch EP 08 (9 min)", YT + "S_wwjrwVpQg"],
      ["⌨", "Build: ep03-messages (Python)", REPO + "ep03-messages"],
      ["⌨", "Build: ep06-config-checker (TypeScript, no key)", REPO + "ep06-config-checker"],
      ["⌨", "Build: ep08-gate-checker (Python, no key)", REPO + "ep08-gate-checker"],
      ["❓", "PRACTICE.md (EP 06)", BLOB + "ep06-config-checker/PRACTICE.md"],
      ["❓", "PRACTICE.md (EP 08)", BLOB + "ep08-gate-checker/PRACTICE.md"]
    ],
    highlights: [
      "Use the official SDK. It handles auth, retries and parsing over the same REST API.",
      "Match the call shape to who is waiting: synchronous for short backend calls, streaming when a person watches, the batch API when nobody does.",
      "Prompts, model ids and settings are code: one source of truth, version control, review.",
      "Turn the business ask into functional and infrastructure requirements before you pick a model."
    ],
    subs: [
      {
        title: "SDK, REST and the Messages API",
        know: [
          "Claude is reached over HTTPS: a JSON request with your key, a JSON response back. The SDKs are a thin layer over that same API.",
          "The SDK gives you authentication, request building, default retries for transient errors and typed responses. You can configure those retries.",
          "In an async service, use the async client (Python) or await the promise-based client (TypeScript). Never block the event loop on a sync call.",
          "A request carries a model id, a system prompt, the message list and a max output length. The API is stateless: you resend the history each turn.",
          "Every response carries a stop reason. Read it before you trust the content: end of turn, hit the output limit, wants a tool, refused, or ran out of context."
        ],
        traps: [
          { move: "Call the REST endpoint with raw HTTP to avoid the SDK's abstraction", why: "You rebuild auth, retries and parsing by hand for no gain. Use the SDK unless you have a specific reason not to." },
          { move: "Treat every 200 response as a usable answer", why: "A refusal and a truncated answer both arrive as 200. Check the stop reason before using the output." }
        ]
      },
      {
        title: "Streaming, files and the batch API",
        know: [
          "Streaming sends the reply as events while it is generated, so a user sees text at once. Your code rebuilds the message from the events.",
          "Act on a block only after its stop event. A half-received tool call has half its arguments.",
          "A stream ending is not the same as a message completing. Check the final stop reason, and recover cleanly if the connection drops.",
          "Images and PDFs go in as content blocks: inline base64, a URL, or a file id from the Files API when the same file is reused.",
          "Image size drives token cost. Estimate from the largest image you expect in production, not the small ones in your test set.",
          "The Message Batches API takes many requests at once, runs them asynchronously at a lower price and returns results later. Fit: nightly jobs, eval runs, back-fills."
        ],
        traps: [
          { move: "Use the batch API for chat replies to cut cost", why: "Batches can take hours. Anything a person waits on needs a synchronous or streamed call." },
          { move: "Use streaming for a 10,000-item overnight job", why: "Streaming helps a person watching, and nobody is. The batch API fits non-interactive work with a flexible deadline." }
        ]
      },
      {
        title: "Configuration as code: prompts, models and environments",
        know: [
          "Keep prompts in one place, in version control, changed through review like any other code.",
          "Pin the model id that ships. Aliases move to newer snapshots; a pinned id does not. Check the current naming convention in the docs.",
          "Keep a per-environment config for model, prompt version and dependencies, and keep it in the repo.",
          "Secrets never go in the repo: use a secrets manager or environment-only values, and a different key per environment.",
          "Before changing a prompt or model, find every system that consumes the output and check the change against each."
        ],
        traps: [
          { move: "Prompts live in a spreadsheet so non-developers can edit them quickly", why: "Edits skip review and history, which is how an unreviewed change reaches production. Keep prompts with the code." },
          { move: "Use the same API key in dev, staging and production for simplicity", why: "One leak then exposes every environment. Separate keys keep the damage to one." }
        ]
      },
      {
        title: "Requirements and the build life cycle",
        know: [
          "Start from the business goal and write down the functional requirements (what it must do) and the infrastructure ones (where it runs, data rules, cost and latency budgets).",
          "Set the cost ceiling, latency target and reliability floor before choosing the architecture, so you can check the design against them.",
          "Life cycle: requirements, design, build, test, deploy, operate, iterate. Shipping starts the operate phase; it does not end the work.",
          "Gate each phase: no deploy without a passing eval, no promotion without a pinned version and a way back.",
          "Code review for a Claude feature asks for configurable prompt and model, real error handling and integration tests in the same pass."
        ],
        traps: [
          { move: "Pick the model first, then work out what the feature needs", why: "The model choice depends on the requirements. Derive functional and infrastructure needs from the goal first." },
          { move: "Approve the PR now; error handling and tests can follow in a later commit", why: "Known gaps ship and stay. Ask for configuration, error handling and tests before merge." }
        ]
      },
      {
        title: "Where it runs: platforms, residency and model upgrades",
        know: [
          "Claude is available through Anthropic's API and through cloud platforms. The customer's cloud contract and compliance posture usually decide which.",
          "If a contract says calls go through a cloud platform, build on that path from day one and keep your business logic provider-agnostic.",
          "Data residency is a hard constraint. It outranks shipping speed; you reduce the operational cost afterwards, you do not defer compliance.",
          "Upgrading a model is a change like any other: adjust prompts for format differences, re-run evals, roll out behind a flag with a per-workflow way back.",
          "Deprecations: add regression tests for the old behaviour first, then migrate call sites in batches you can check."
        ],
        traps: [
          { move: "Ship on the faster platform now and raise residency in a follow-up compliance review", why: "That breaks the policy from launch day. Meet the residency requirement first, then work on the overhead." },
          { move: "Swap the model id and fix parsing failures as they surface", why: "Production users find your regressions. Re-evaluate against the downstream format, then roll out behind a flag." }
        ]
      }
    ],
    remember: [
      "SDK first. Read the stop reason.",
      "Who is waiting decides sync, stream or batch.",
      "Prompts and model ids are code: pinned, versioned, reviewed.",
      "Requirements before model. Compliance before speed."
    ]
  },

  /* ---------------------------------------------------------------- D3 */
  {
    id: "d3", code: "D3", title: "Claude Code", eps: "EP 06, EP 07", t: 6,
    summary: "How Claude Code works through a task, where its settings live, and the mechanisms for durable context and enforcement: CLAUDE.md, rules, hooks, subagents, skills, plugins and headless mode.",
    links: [
      ["▶", "Watch EP 07 (10 min)", YT + "meUspuAi6HY"],
      ["▶", "Watch EP 06 (8 min)", YT + "3dEtqvjJEoc"],
      ["⌨", "Build: ep07-guard-hook (TypeScript, no key)", REPO + "ep07-guard-hook"],
      ["❓", "PRACTICE.md (EP 07)", BLOB + "ep07-guard-hook/PRACTICE.md"]
    ],
    highlights: [
      "If a rule must always hold, enforce it with a hook or a deny rule. CLAUDE.md is guidance, not enforcement.",
      "Settings layer from managed (cannot be overridden) to project (shared) to local (personal, git-ignored) to user.",
      "Deny beats ask beats allow, whatever the permission mode.",
      "CI runs Claude Code headless, with permissions set in settings, not by turning prompts off everywhere."
    ],
    subs: [
      {
        title: "The loop and the permission modes",
        know: [
          "Claude Code explores the code first, then proposes a plan, then edits. The permission system gates each action.",
          "Default mode asks before edits and commands. Plan mode keeps it read-only until you approve the plan: good for unfamiliar or risky code.",
          "Accept-edits mode lets file edits through and still gates riskier actions. Fits low-stakes, reversible work in a trusted repo.",
          "Bypass modes remove the prompts. Use them only in an isolated sandbox, never on a machine with live credentials.",
          "Place the human gate by worst-case cost: let cheap reversible actions run, gate anything hard to undo, and never let the agent be the only reviewer of sensitive code."
        ],
        traps: [
          { move: "Switch to a bypass mode because the prompts slow the team down", why: "It removes every check between the agent and live files. Allow the specific safe commands instead, and keep the gate on risky ones." }
        ]
      },
      {
        title: "Settings: where configuration lives and who it binds",
        know: [
          "User settings in your home folder follow you across every project.",
          "Project settings in .claude/settings.json are committed and apply to everyone who clones the repo.",
          "Local settings in .claude/settings.local.json are personal overrides for one project and are git-ignored.",
          "Managed (enterprise) settings are set by administrators and cannot be overridden. The most durable control is a managed deny rule.",
          "Allow and deny rules sit on top of the mode. A single deny wins over any number of allows."
        ],
        traps: [
          { move: "Each developer sets the team's permissions with their own environment variables", why: "Nothing keeps them consistent. Put shared rules in the committed project settings file." },
          { move: "Keep settings files in a separate config repo so they evolve on their own", why: "Changes lose their link to the code they govern. Version CLAUDE.md and settings with the code and review them in PRs." }
        ]
      },
      {
        title: "Durable context: CLAUDE.md, rules files and memory",
        know: [
          "CLAUDE.md at the repo root loads into every session: commands, conventions, paths not to touch. /init drafts one; edit it before you trust it.",
          "Files layer: a user-level CLAUDE.md for your standards everywhere, the project one for the repo, nested ones for sub-folders.",
          "Size is the failure mode. Every extra line dilutes the rules that matter. Keep only what changes behaviour.",
          "Rules files can be scoped to paths so guidance loads only when Claude works on matching files.",
          "Anything conditional or long belongs in a skill that loads on demand, not in CLAUDE.md."
        ],
        traps: [
          { move: "Copy the team's standards into every repository's CLAUDE.md", why: "The copies drift. Put shared standards at a broader level and keep only project-specific context in each repo." },
          { move: "Put the never-touch-production rule in CLAUDE.md and rely on it", why: "Instructions are followed most of the time, not always. Enforce it with a hook or deny rule." }
        ]
      },
      {
        title: "Hooks, subagents, skills and plugins",
        know: [
          "Hooks run your script at lifecycle events. A pre-tool hook can block a call and tell the agent why; a post-tool hook can log or format. They add no context cost.",
          "Scope hooks to the risky actions (destructive commands, sensitive paths). Hooking every action slows everything for no safety gain.",
          "Subagents take a delegated task in an isolated context and return a summary, which keeps the main session clean.",
          "Skills live in a recognised skills folder as SKILL.md plus any scripts. Only the name and description load up front; the body loads when it matches.",
          "Custom commands give an explicit entry point. Plugins bundle skills, hooks, subagents and MCP servers as one versioned install."
        ],
        traps: [
          { move: "Replace hooks with system-prompt instructions to reduce overhead", why: "That trades a deterministic block for a request the model may not follow. Narrow the hooks' scope instead." },
          { move: "Upgrade every plugin to latest on a schedule to keep drift small", why: "When something breaks you cannot tell which version worked. Track and pin plugin versions, and upgrade on purpose." }
        ]
      },
      {
        title: "Headless and CI",
        know: [
          "Headless (print) mode runs Claude Code without an interactive session, so a pipeline can call it and capture the output.",
          "Grant exactly the tools the job needs in the project settings or on the command line. Deny everything else.",
          "Capture structured output for the next pipeline step, and keep a person on the merge decision for sensitive code.",
          "Treat it like any CI job: same quality gates, logs kept, secrets from the CI secret store."
        ],
        traps: [
          { move: "Turn off confirmation prompts globally so the pipeline never stalls", why: "That removes the gates on every machine and every environment. Use headless mode with a scoped allow list for the pipeline only." }
        ]
      }
    ],
    remember: [
      "If it must always hold, enforce it in code.",
      "Managed beats project beats user; deny beats allow.",
      "CLAUDE.md small, skills on demand.",
      "Headless plus a scoped allow list for CI."
    ]
  },

  /* ---------------------------------------------------------------- D4 */
  {
    id: "d4", code: "D4", title: "Eval, testing and debugging", eps: "EP 09", t: 8,
    summary: "Defining done with evals, testing at the right level, tracing failures to their cause, and handling errors by type.",
    links: [
      ["▶", "Watch EP 09 (9 min)", YT + "4vvEK4fWEXw"],
      ["⌨", "Build: ep09-failure-checker (TypeScript, no key)", REPO + "ep09-failure-checker"],
      ["❓", "PRACTICE.md (EP 09)", BLOB + "ep09-failure-checker/PRACTICE.md"]
    ],
    highlights: [
      "Diagnose before you fix. The first step is almost always: look at the traces.",
      "Pick the grader by the shape of the output: exact match, code check, or a calibrated LLM judge.",
      "Sort every error: retriable (back off and retry) or terminal (fail fast and say so).",
      "Validation failures are an expected path: retry, repair or fall back, never crash or pass bad data on."
    ],
    subs: [
      {
        title: "Evals: define done before you ship",
        know: [
          "An eval is the test set that says what the feature must do. Build it from real, representative inputs, including the awkward ones.",
          "Exact match fits one correct answer, such as a label. Cheap and brittle.",
          "Code checks fit structured output: valid JSON, required fields, values in range. They say nothing about quality.",
          "An LLM judge fits open-ended quality. Calibrate it against human-graded examples before you trust its number.",
          "Re-run the eval on every prompt or model change, and validate a fix for one category against all the others."
        ],
        traps: [
          { move: "Pick the model that scores best on a public benchmark", why: "A benchmark is not your workload. Score candidates on your own representative set." },
          { move: "Rewrite the prompt for the weak category and accept a dip on common cases", why: "Iterate on the weak category and use the eval to prove the common cases did not regress." }
        ]
      },
      {
        title: "Testing at four levels",
        know: [
          "Unit: one function on its own, such as a parser or a tool wrapper.",
          "Functional: one Claude call returns the expected shape for a given input.",
          "Integration: the seam where two parts hand over, such as retrieval feeding the model.",
          "End to end: the full flow a user runs. It shows that something broke, not where.",
          "A testing strategy uses all four on purpose. Claude code goes through the same CI gates as any other service."
        ],
        traps: [
          { move: "Standardise on end-to-end tests for everything", why: "They are slow and cannot locate the break. Layer unit, integration and end-to-end tests." }
        ]
      },
      {
        title: "Debugging: traces first",
        know: [
          "Capture full traces: input, system prompt, messages, tool calls, output, parameters and stop reason.",
          "Compare a good run with a bad run. The difference points to the cause.",
          "Name the failure mode before choosing the fix: hallucination, lost context, format drift, prompt injection, wrong tool, truncation.",
          "Variation between runs is expected from sampling. Persistent inconsistency on similar inputs is a bug to trace.",
          "Temperature changes randomness. It does nothing for context size, accuracy or cost."
        ],
        traps: [
          { move: "It is probably hallucinating, so switch to a bigger model", why: "That guesses the cause. Read the traces; it may be lost context or injected content." },
          { move: "Raise the temperature to fix context-window errors", why: "Temperature controls sampling, not capacity. Summarise, chunk or prune." }
        ]
      },
      {
        title: "Errors by type",
        know: [
          "Rate limited (429) and overloaded (529): retriable. Exponential backoff with jitter, honour retry-after, cap the attempts.",
          "Bad request (400): terminal. The same request fails again, so fix or reject the input.",
          "Refusal: arrives as a success with a refusal stop reason. Do not retry it silently or treat it as valid output.",
          "Tool errors go back to Claude as a tool result with the error flag set, so the model can react. Never drop them.",
          "The SDK already retries some transient errors. Know what it covers before adding your own layer. Route errors by impact: page for outages, log the rest."
        ],
        traps: [
          { move: "Retry every failure until it works", why: "A 400 or a refusal fails the same way every time. Retry only what is transient, with a cap." },
          { move: "Page the on-call engineer for every error so nothing is missed", why: "Alert fatigue means the real outage is missed. Categorise by impact and route accordingly." }
        ]
      }
    ],
    remember: [
      "Traces before theories.",
      "Grader matches output shape.",
      "Retriable or terminal: decide per error.",
      "Bad output is an error path, not a crash."
    ]
  },

  /* ---------------------------------------------------------------- D5 */
  {
    id: "d5", code: "D5", title: "Model selection and optimisation", eps: "EP 01", t: 0,
    summary: "Choosing a model against quality, latency and cost together, and the levers that keep a production bill and response time in budget.",
    links: [
      ["▶", "Watch EP 01 (8 min)", YT + "Vm1Gmjkb3fM"],
      ["⌨", "Build: ep01-models (Python)", REPO + "ep01-models"]
    ],
    highlights: [
      "The right model is the smallest one that clears your quality bar on your own data, within the latency and cost budget.",
      "No targets? Ask for them. 'Best results' is not a requirement.",
      "Measure before you cut: track tokens per feature, then optimise the feature that costs most.",
      "Prompt caching is for the static prefix. Output is never what you cache."
    ],
    subs: [
      {
        title: "Tokens, context and sampling",
        know: [
          "Everything is counted in tokens: system prompt, history, tool definitions, tool results and the reply. Tokens are the unit of price and of the context budget.",
          "Characters per token depends on the model's tokeniser. Count with the API's token counter, not a rule of thumb.",
          "The context window is a fixed budget for input plus output. Too-large input is rejected; output that hits the ceiling stops early with its own stop reason.",
          "Sampling makes output vary run to run. That is normal behaviour, not a bug, and it is why tests check properties, not exact text.",
          "Output tokens are typically priced higher than input tokens. Read today's prices from the docs."
        ],
        traps: [
          { move: "The same prompt returned different text, so the request code has a bug", why: "Sampling makes generation non-deterministic. Validate the properties you need instead of exact strings." }
        ]
      },
      {
        title: "Choosing a model",
        know: [
          "The family runs from small and fast to large and most capable. Read the current line-up and prices from the docs on the day.",
          "Quality, latency and cost trade against each other. Fit all three together, not one first and the others after.",
          "Simple, high-volume, latency-sensitive tasks such as classification suit the smaller tiers.",
          "Route when traffic is mixed: a default model plus an override for the hard cases. For uniform traffic, pin one model and skip the router.",
          "Extended thinking is a setting, not a different model. Turn it on for multi-step reasoning, leave it off for lookups and formatting."
        ],
        traps: [
          { move: "Use the largest model because the product team asked for the best results", why: "Without quality, latency and cost targets there is no basis for a choice. Get the targets, then pick." },
          { move: "Default to a mid-tier model because it suits most tasks", why: "A default skips the decision. Test the candidates on your task against your targets." }
        ]
      },
      {
        title: "Cost and latency levers",
        know: [
          "Track token use per feature first. You cannot optimise what you cannot attribute.",
          "Levers: model tier, prompt and context size, number of tool calls, streamed versus batched, caching.",
          "A cost projection needs request volume, average input tokens, average output tokens, the model's prices and any cache savings.",
          "The batch API trades latency for a lower price on non-interactive work.",
          "Hold a reliability floor first, then tune cost within it. Cost pressure is louder; reliability failures are worse."
        ],
        traps: [
          { move: "Cut cost by moving every feature to the smallest model", why: "That cuts blind and may break the features that need a bigger one. Measure per feature, then act where it matters." },
          { move: "Leave output tokens out of the projection; they are a small share", why: "Output is often priced higher per token. Model both." }
        ]
      },
      {
        title: "Prompt caching",
        know: [
          "Caching stores the processing of a stable prefix so later requests that start with the same content reuse it at a lower price.",
          "Put stable content first (tools, system prompt, reference documents) and changing content last.",
          "You mark a cache point, or let automatic mode manage it. The prefix must clear a minimum length, which varies by model.",
          "The cache expires after a short idle time unless you choose a longer lifetime. It pays off only when the same prefix comes back soon.",
          "In multi-turn chat, caching the earlier history means each new turn pays full price only for what is new."
        ],
        traps: [
          { move: "Cache the model's answers so similar questions skip the call", why: "That is a response cache, a different thing with its own staleness risks. Prompt caching reuses the static input prefix." },
          { move: "Cache the user's message because it changes the most", why: "Changing content breaks the prefix match. Cache what stays the same." }
        ]
      }
    ],
    remember: [
      "Smallest model that clears the bar on your data.",
      "No targets, no choice: ask for them.",
      "Measure per feature, then cut.",
      "Cache the stable prefix, not the answer."
    ]
  },

  /* ---------------------------------------------------------------- D6 */
  {
    id: "d6", code: "D6", title: "Prompt and context engineering", eps: "EP 04", t: 3,
    summary: "Prompts that produce a reliable shape, examples that teach a pattern, and managing what stays visible across a long, multi-step task.",
    links: [
      ["▶", "Watch EP 04 (8 min)", YT + "HS6K4A7Gl5o"],
      ["⌨", "Build: ep04-prompting (Python)", REPO + "ep04-prompting"],
      ["❓", "PRACTICE.md (EP 04)", BLOB + "ep04-prompting/PRACTICE.md"]
    ],
    highlights: [
      "The failure type names the missing technique: wrong shape needs an output constraint, drifting behaviour needs a clearer system prompt, wrong structure needs examples.",
      "Prompt engineering shapes one request. Context engineering manages what stays visible across many.",
      "Labelled examples go in the prompt as few-shot examples. No database or fine-tune needed.",
      "A bigger context window is never the fix for buried information. Prune, compact or isolate."
    ],
    subs: [
      {
        title: "Building a prompt that holds its shape",
        know: [
          "System prompt: the role, the rules and the output format, stated once. User messages carry the user's input.",
          "XML-style tags separate instructions from data, so a document can't be mistaken for an instruction.",
          "Output constraints: name the format, the fields and where to stop. If a schema matters, describe it exactly.",
          "Structured outputs move the shape into the API, which is stronger than asking in prose. Still check the stop reason: refusals and truncation do not match the schema.",
          "Diagnose before adding: find which technique is missing rather than piling on more instructions."
        ],
        traps: [
          { move: "Repeat every instruction in the system prompt and the user message so the model sees it twice", why: "Duplication causes conflicts when one copy changes. Consolidate instructions in the system prompt." },
          { move: "The prompt has grown contradictory, so add a new rule on top to override the old ones", why: "Adding rules deepens the mess. Audit for overlap, contradictions and dead rules, then refactor." }
        ]
      },
      {
        title: "Zero-shot, one-shot, few-shot",
        know: [
          "Zero-shot: instructions only. Fine when the task is clear and the format is simple.",
          "One-shot and few-shot: worked examples in the prompt. The model copies the pattern, which is the fastest fix for format and edge cases.",
          "Examples cost tokens on every call. Add them where they change the result, and pick varied ones so the model does not copy surface details.",
          "Labelled edge cases you already have make good few-shot examples."
        ],
        traps: [
          { move: "Train a custom model on our handful of labelled examples", why: "Far more work than the problem needs. Put the examples in the prompt." },
          { move: "Store the examples in a database for the model to find", why: "The model only uses what is in its context. Without retrieval wired in, it never sees them." }
        ]
      },
      {
        title: "Context engineering for long tasks",
        know: [
          "Long agent runs fill the window with old tool output. Focus fades and early constraints get ignored.",
          "Prune: drop tool output no later step needs.",
          "Compact: summarise older turns. What survives depends on how you write the summariser prompt, so tell it what to keep.",
          "Isolate: give a subagent only the context its step needs.",
          "Clear: start a fresh session when the old context is no longer useful. Nothing carries forward."
        ],
        traps: [
          { move: "Increase the context window so every tool output stays at full detail", why: "The information is still buried, and cost grows each turn. Prune, compact or isolate." },
          { move: "Restart the agent every few steps to prevent drift", why: "It loses the task state it needs. Compact the history and keep the active state visible." }
        ]
      },
      {
        title: "Extended thinking and retrieval",
        know: [
          "Extended thinking gives the model a reasoning pass before it answers. Use it for multi-step reasoning and planning, not for lookups or formatting.",
          "Match the effort level to the problem; reasoning tokens are billed.",
          "In a tool loop, return thinking blocks to the API unchanged.",
          "Retrieval (RAG) pulls in only the passages a request needs. It can break at chunking, at retrieval, or at the model's use of what it got.",
          "Chunk by sentence or section with a little overlap, so facts that span a boundary are not split."
        ],
        traps: [
          { move: "Turn on extended thinking everywhere for better quality", why: "It adds cost and latency to tasks that gain nothing. Use it where the reasoning is the hard part." }
        ]
      }
    ],
    remember: [
      "Failure type names the fix.",
      "Instructions in the system prompt, data in tags.",
      "Examples teach format fastest.",
      "Prune, compact, isolate. Never just a bigger window."
    ]
  },

  /* ---------------------------------------------------------------- D7 */
  {
    id: "d7", code: "D7", title: "Security and safety", eps: "EP 10", t: 3,
    summary: "The threats that are specific to LLM applications, and the layered, deterministic controls that stop them.",
    links: [
      ["▶", "Watch EP 10 (8 min)", YT + "Z5FIb8Y5G5A"],
      ["⌨", "Applied in: ep07-guard-hook (a blocking hook)", REPO + "ep07-guard-hook"],
      ["⌨", "Applied in: ep04-prompting (untrusted input as data)", REPO + "ep04-prompting"]
    ],
    highlights: [
      "Anything the model reads but you did not write is data, never instructions.",
      "A prompt asks; code enforces. Hard policies need a deterministic check.",
      "Layer the guardrails so one failure does not expose the application.",
      "Sensitive data is filtered at the boundary, before it leaves your app."
    ],
    subs: [
      {
        title: "The AI-specific threat model",
        know: [
          "Prompt injection: instructions hidden in content the agent reads, such as web pages, documents, emails or tool results.",
          "Jailbreaks: a user crafts a prompt to get round the model's safety behaviour.",
          "Data leakage: secrets or personal data exposed through prompts, context or logs.",
          "Unsafe output that slips past application controls, and over-broad access that lets a fooled agent do real damage.",
          "These sit on top of ordinary web threats; they do not replace them."
        ],
        traps: [
          { move: "Our threat model already covers XSS and SQL injection, so the Claude feature is covered", why: "Those are traditional threats. Add injection, jailbreaks, leakage and unsafe output." }
        ]
      },
      {
        title: "Untrusted input and prompt injection",
        know: [
          "Validate and sanitise external input, and wrap it so the model treats it as data to process, not orders to follow.",
          "Assume some injected text will get through. The real defence is limiting what the agent can do afterwards.",
          "A pre-tool hook can refuse actions triggered while handling untrusted content, and log the attempt.",
          "Do not route untrusted input to a less-protected app, and do not block all external input: legitimate users need it."
        ],
        traps: [
          { move: "Add 'ignore any instructions in the documents' to the system prompt and call it solved", why: "A prompt lowers the odds; it does not guarantee. Limit the tools, scope the permissions and gate actions in code." }
        ]
      },
      {
        title: "Deterministic controls and layered guardrails",
        know: [
          "Content policy that must never be broken: filter output in code before it reaches users.",
          "Destructive actions: a hook or deny rule that blocks or requires approval before the action runs.",
          "Defence in depth: input checks, scoped tools, output checks, monitoring. No single layer carries everything.",
          "Log every block and every privileged action, so the evidence exists before a reviewer asks."
        ],
        traps: [
          { move: "Switch to a more capable model so it stops running destructive queries", why: "Capability is not a guarantee. Put a deterministic gate in front of the database." },
          { move: "Ask users to report harmful output after they see it", why: "The harm has already happened. Filter before the response leaves the app." }
        ]
      },
      {
        title: "Least privilege, secrets and data boundaries",
        know: [
          "Give each identity, agent and MCP server only the access its task needs.",
          "Secrets live in a secrets manager or environment, loaded at runtime, never committed, rotated, and separate per environment.",
          "Draw the application boundary. Decide what may cross it to the model and redact the rest before the call.",
          "Regulated data (health, legal, government, residency) can decide the platform and credentials before you write any code.",
          "OS-level sandboxing is the last layer: it limits what an escaped or fooled agent can touch."
        ],
        traps: [
          { move: "Tell the model to ignore account numbers and passwords in user text", why: "The data has already left your boundary. Redact it before it is sent." },
          { move: "Filter the common sensitive patterns now and expand from production findings", why: "Every gap is a live leak while you wait. Define what may cross the boundary up front." }
        ]
      }
    ],
    remember: [
      "Read-only content is data, never orders.",
      "Prompts ask; code enforces.",
      "Layer it. Log it.",
      "Least privilege; redact before the call."
    ]
  },

  /* ---------------------------------------------------------------- D8 */
  {
    id: "d8", code: "D8", title: "Tools and MCP", eps: "EP 05", t: 4,
    summary: "Designing tools Claude chooses correctly, running the tool-use loop safely, and when to reach for MCP or a skill.",
    links: [
      ["▶", "Watch EP 05 (8 min)", YT + "T0pDaobW79c"],
      ["⌨", "Build: ep05-tools-mcp (TypeScript, no key)", REPO + "ep05-tools-mcp"],
      ["❓", "PRACTICE.md (EP 05)", BLOB + "ep05-tools-mcp/PRACTICE.md"]
    ],
    highlights: [
      "Wrong-tool choices trace back to the schema, and most often to the description.",
      "Keep schemas strict and validate arguments before you run anything.",
      "Fewer, distinct tools beat many overlapping ones.",
      "MCP and skills are for reuse across apps and teams. Choose by scope, reuse and integration, not familiarity."
    ],
    subs: [
      {
        title: "The tool-use loop",
        know: [
          "You define tools (name, description, input schema) and send them with the request.",
          "Claude replies with a tool-use block: the tool name, an id and the arguments. The stop reason says it wants a tool.",
          "Your code runs the tool and sends back a tool-result block with the matching id. Claude continues from there.",
          "On failure, send the tool result with the error flag set and a useful message. The model can then retry or change course.",
          "The loop ends on your exit condition, not when the model happens to stop calling tools."
        ],
        traps: [
          { move: "Log invalid tool calls and dispatch them anyway; the tool will report any error", why: "Bad arguments reach a real system. Validate against the schema first and return a structured error." }
        ]
      },
      {
        title: "Designing schemas Claude selects correctly",
        know: [
          "The description is how the model decides when to call the tool. Say what it does, when to use it and when not to.",
          "Mark the parameters the tool truly needs as required. Use enums and formats to remove guesswork.",
          "Names help, but they are not enough when two tools sound alike. Descriptions disambiguate.",
          "Overlapping tools cause wrong picks. Consolidate them, remove unused ones and give each a distinct purpose.",
          "Start with the minimum tool set. Add a tool only when a real gap appears."
        ],
        traps: [
          { move: "Loosen the schema so the tool accepts whatever the model sends", why: "Invalid calls then reach the downstream service. Keep it strict, validate, return an error the agent can act on." },
          { move: "Add more tools so the agent has an exact match for every request", why: "More overlap means more wrong choices. Fewer, distinct tools work better." },
          { move: "The tool name is descriptive, so the description can go", why: "The model decides from the description. Remove it and you remove the information it needs." }
        ]
      },
      {
        title: "MCP servers: transport and scope",
        know: [
          "An MCP server exposes tools, resources and prompts through a standard interface any MCP client can use.",
          "Transport: stdio for a local process on the same machine; HTTP for a shared or remote server.",
          "Scope in Claude Code: local (just you), project (.mcp.json committed for the team), or managed by administrators for the organisation.",
          "Secrets never go in .mcp.json. Use environment variables or OAuth.",
          "A server shared by several apps needs clear definitions and somewhere they can all reach it, not a developer's laptop."
        ],
        traps: [
          { move: "Use HTTP for the local server because it works in every context", why: "For a local process, stdio needs no network, ports or extra setup." },
          { move: "Commit the API key in .mcp.json so teammates can connect", why: "It is now in the repo's history. Reference an environment variable or use OAuth." }
        ]
      },
      {
        title: "Built-in tool, custom tool, skill or MCP server",
        know: [
          "Built-in tool: use it when it covers the need, or extend it when one feature is missing.",
          "Custom tool: a capability specific to one application.",
          "Skill: instructions, scripts and data bundled as a package the model loads when the task matches.",
          "MCP server: a capability exposed through a standard interface, so many clients and teams can reuse it.",
          "Choose by scope, reuse and integration context. Familiarity, novelty and ease of building are not reasons."
        ],
        traps: [
          { move: "Ship it as a shared library each team imports and keeps up to date", why: "Every team carries the integration and the drift. Skills and MCP servers are built for independent reuse." },
          { move: "Skills and MCP servers are interchangeable, so pick either", why: "A skill is a package the model loads; an MCP server is an interface clients call. Pick the one that fits." }
        ]
      }
    ],
    remember: [
      "The description decides the pick.",
      "Strict schema, validate, structured error.",
      "Few distinct tools.",
      "stdio local, HTTP shared, secrets never committed."
    ]
  },

  /* ---------------------------------------------------------------- technique */
  {
    id: "technique", code: "★", title: "Exam technique", eps: "Wrap-up", t: 9,
    summary: "How to choose between two plausible answers on the day. These moves recur across every domain.",
    links: [
      ["▶", "Watch the wrap-up (54 min)", YT + "KzK9R89sMtM"],
      ["⚠", "Printable traps sheet", "flashcards.html?track=ccdv-f&mode=traps"]
    ],
    highlights: [
      "If it must always hold, enforce it in code. A prompt instruction is never the guarantee.",
      "When the question says first, the answer is usually to diagnose: traces, measurements, requirements.",
      "Proportion wins: the simplest option that fully meets the need beats the impressive one.",
      "Compliance, data residency and safety constraints outrank speed and convenience."
    ],
    subs: [
      {
        title: "Strike, compare, pick",
        know: [
          "Strike the extremes first: the option that does nothing, and the option that tears everything down (disable it, remove it, rebuild it).",
          "Strike options that move the problem to someone else: users, downstream systems, a follow-up release.",
          "Compare the last two on the qualifier in the question: first, best, most effective, must, always.",
          "Prefer the option that names a deterministic mechanism over one that asks the model to behave.",
          "Prefer the option that measures before it changes anything."
        ],
        traps: [
          { move: "Both remaining options sound right, so pick the more thorough-sounding one", why: "Go back to the qualifier. If the question asks for the first step, the thorough plan is often the second step." }
        ]
      },
      {
        title: "Patterns that recur",
        know: [
          "Bigger context window, bigger model, higher temperature: almost always distractors.",
          "Retry until it works: wrong for 400s and refusals, right only with backoff and a cap for transient errors.",
          "Partial fixes (only the contradictions, only the common patterns, only one environment) lose to the complete one.",
          "Product facts change. The exam rewards the durable judgement; confirm names, limits and prices at docs.claude.com."
        ],
        traps: []
      }
    ],
    remember: [
      "Strike the do-nothing and the tear-it-down.",
      "Read the qualifier.",
      "Code enforces; prompts ask.",
      "Diagnose first."
    ]
  }
  ]
}
};
})();
