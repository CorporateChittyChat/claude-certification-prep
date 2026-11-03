/* CCDV-F study notes for learn.html.
   Structure follows Anthropic's CCDV-F exam guide (v1.0, effective July 2026): 8 domains, 25 weighted skills.
   Explanations are paraphrased from Anthropic's Developer course material; traps restate the distractor patterns of a
   practice set in our own words. No exam item is reproduced. Product facts carry an as-of date: confirm at docs.claude.com.
   Sub-skill fields: title, w (weight %), short (the idea in a nutshell), terms [[term, plain meaning]], scope, lesson [paragraphs], tables [{cap, h, r}], code {cap, text},
   know [bullets], build [label, url], traps [{move, why}]. */
(function(){
const REPO = "https://github.com/chittychat-studio/ccdvf-course/tree/main/";
const BLOB = "https://github.com/chittychat-studio/ccdvf-course/blob/main/";
const YT = "https://youtu.be/";
window.LEARN_DATA = window.LEARN_DATA || {};
window.LEARN_DATA["ccdv-f"] = {
  title: "CCDV-F study notes",
  name: "Claude Certified Developer – Foundations",
  intro: "Every skill in the CCDV-F exam guide: lesson, traps and a hands-on build.",
  asOf: "3 November 2026",
  guide: ["📄", "Official exam guide (v1.0, July 2026)", "https://everpath-course-content.s3-accelerate.amazonaws.com/instructor/6nizmqk8tpzpfjvt6qmmav7rh/public/1783542875/Claude+Certified+Developer+%E2%80%93+Foundations+Exam+Guide.pdf"],
  glance: [["Items", "53, multiple choice and multiple response"], ["Time", "120 minutes"], ["Pass mark", "720 on a 100–1,000 scale"], ["Fee", "$125 USD"], ["Delivery", "Pearson VUE, online or test centre"], ["Valid for", "12 months"]],
  exam: "ccdv-f/practice/mock-exam-player.html",
  flash: "flashcards.html?track=ccdv-f",
  path: "path.html?track=ccdv-f",
  repo: "https://github.com/chittychat-studio/ccdvf-course",
  overview: [
    ["▶", "EP 00 · The exam: format and the eight domains (6 min)", YT + "alqhsExgcR8"],
    ["▶", "Wrap-up · Tips and traps per domain (54 min)", YT + "KzK9R89sMtM"]
  ],
  domains: [

  /* ================================================================ D1 */
  {
    id: "d1", code: "D1", title: "Agents and workflows", w: 14.7, eps: "EP 02", t: 1,
    summary: "When a task needs a workflow and when it needs an agent, how to build the loop (raw API, Agent SDK or managed agents), and the patterns that keep multi-step and multi-agent work under control.",
    links: [
      ["▶", "Watch EP 02 (9 min)", YT + "2WyMrBTmmUs"],
      ["⌨", "Build: ep02-agents (TypeScript)", REPO + "ep02-agents"]
    ],
    highlights: [
      "Climb in order: one API call, then a workflow, then an agent. Move up only when the simpler pattern cannot cope with the variation.",
      "Workflow when you can write the steps in code; agent when you can state the goal and tools but not the path.",
      "A subagent starts with a clean context. Its brief, its tools and its exit condition are all it has.",
      "Put the human check in before an irreversible tool is wired, not after the first bad write."
    ],
    subs: [
      {
        title: "Agent architecture", w: 4.5,
        short: "Use a workflow when you can write the steps down, and an agent when you can only state the goal and the tools. When one agent gets overloaded, a manager (supervisor) agent splits the work across subagents that each keep their own context and tools.",
        terms: [
          ["workflow", "code that calls Claude at fixed, pre-written steps; you own the path and the model fills in each step"],
          ["agent", "a loop in which the model picks the next tool call itself until the goal is met or an exit condition fires"],
          ["manager / supervisor agent", "the top-level agent that interprets the request, routes work to subagents, sequences them and reconciles their outputs"],
          ["subagent", "a worker agent started with a clean context, its own short tool list and a brief; it returns a summary, not its whole history"],
          ["hand-off contract", "the agreed shape of what one stage passes to the next (fields, schema), checked before the next stage starts"],
          ["tool budget", "a cap on how many tool calls a subagent may make, enforced by the manager"],
          ["hybrid", "a workflow for the standard path that calls an agent only at the one decision point that needs judgement"]
        ],
        scope: "Principles and trade-offs of agent and workflow design: when to use a workflow versus an agent, manager and supervisor hierarchies, and how subagents improve task execution.",
        lesson: [
          "The first design decision is the pattern, and getting it wrong only shows up in production. A workflow is code that calls Claude at steps you have written down; you own the path and the model fills in each step. An agent is a loop in which the model chooses the next tool call; you give it a goal and a toolset and it finds the path. An agent used where a workflow would do adds context cost, harder debugging and behaviour that lives in transcripts. A workflow used where an agent is needed breaks the first time an input falls outside the path.",
          "Agents carry overhead: coordination, a growing context and more places to fail. Observability needs transcript-level tooling rather than ordinary logs. So the rule is to start with the simplest thing that works (a single call), move to a workflow, and reach for an agent only when the simpler pattern cannot handle the variation the task brings.",
          "Hybrids are often the right answer. A workflow runs the standard path deterministically and an agent is invoked only at the one decision point that needs judgement, such as an invoice in an unexpected format that must be rerouted, queried or flagged for a person.",
          "In a manager (supervisor) hierarchy, a top-level agent interprets the request, routes it, sequences specialised subagents and reconciles their outputs. Each subagent has its own tools and its own short history, isolated from the others. Isolation keeps each worker focused; the manager is where quality control lives: tool budgets per subagent, schema checks on outputs, and explicit hand-off contracts between stages.",
          "Why subagents improve task execution. Each one sees only its own brief and tools, so its tool choice is sharper and its window isn't filled with other workers' history. Independent subagents can run in parallel. A failure stays inside one worker, where the manager can retry or replace it. The price is coordination and tokens, so split only where the parts are genuinely separate."
        ],
        tables: [{
          cap: "Workflow or agent",
          h: ["Choose a workflow when…", "Choose an agent when…"],
          r: [
            ["You can write the exact steps in code.", "You can state the goal and the tools, but not the path."],
            ["A wrong step is costly and step-level guardrails matter.", "The path cannot be listed in advance."],
            ["You need observability with standard tooling.", "Some non-determinism is acceptable and the toolset bounds what the agent can do."],
            ["Inputs come from a known, constrained set.", "Inputs vary unpredictably in content and structure."],
            ["Every run follows the same sequence.", "The task needs the model to sequence tools creatively."]
          ]
        }],
        know: [
          "Simplest first: single call, then workflow, then agent.",
          "A manager or supervisor agent routes, sequences and reconciles; subagents each keep isolated context and their own tool list.",
          "When subagents duplicate tool calls, overrun budgets or contradict each other, the fix is a stronger manager layer: per-subagent tool budgets, schema validation before passing work on, and explicit hand-off contracts.",
          "A ticket that spans billing, shipping and product issues is a case for an orchestrator delegating each sub-issue to a dedicated subagent, so each is tracked separately.",
          "Workflow for the standard path plus an agent at the exception point is often better than either pure form.",
          "Subagents help through focus (own brief, own tools), isolation (own window) and parallelism; they cost coordination and tokens."
        ],
        build: ["Build: ep02-agents", REPO + "ep02-agents"],
        traps: [
          { move: "Use a fully autonomous agent for every invoice, standard or not", why: "Known steps gain nothing from model-directed control and still pay its cost and risk. Use a workflow for the standard path and call an agent only at the decision point." },
          { move: "Let subagents read each other's outputs and settle contradictions among themselves", why: "That removes the one place where checking happens. Strengthen the manager: tool budgets, schema checks and hand-off contracts." },
          { move: "Collapse the three subagents into one large-context call", why: "You lose focus and isolation, and the missing oversight is still missing. Fix the coordination layer instead." },
          { move: "Add retries and a shared trace log to each subagent so the team can audit later", why: "Auditing after the fact does not stop redundant calls or contradictions reaching the user. Enforce budgets and validation in the manager." },
          { move: "A multi-issue ticket just needs more detailed prompting to track what is resolved", why: "Prompting alone does not give each sub-issue its own state. An orchestrator with dedicated subagents does." },
          { move: "Let the supervisor and its subagents share one growing conversation history", why: "Isolation is the point. Each subagent keeps its own short history and tool list; the manager reconciles." },
          { move: "Give every standard, known step its own subagent under a manager", why: "Known steps need a workflow, not agentic overhead. Use an agent only at the exception point." },
          { move: "Hard-code a fixed billing, then shipping, then product sequence for every ticket", why: "Tickets differ in which sub-issues they hold. An orchestrator delegates each one it finds to a dedicated subagent." }
        ]
      },
      {
        title: "Agent construction with Claude", w: 5.3,
        short: "You can run the agent loop yourself on the Messages API, let the Agent SDK run it inside your own process, or have Anthropic run it for you as a Managed Agent. Choose by where the data may live and what you must control, then add hooks for anything that must happen every time.",
        terms: [
          ["agent loop", "send a request, run any tools Claude asks for, send the results back, repeat until an exit condition"],
          ["harness", "the code around the model that runs the loop: dispatches tool calls, manages history and context, applies permissions and hooks, stops the run"],
          ["Claude Agent SDK", "Anthropic's library (Python, TypeScript) that gives you Claude Code's loop, tools, permissions and hooks inside your own process"],
          ["Managed Agents", "Anthropic-hosted agent runtime: you define the agent as an API resource and Anthropic runs the loop and a sandbox server-side (beta at the time of writing)"],
          ["self-hosted vs Anthropic-hosted", "whether the loop and tool execution run on infrastructure you control (SDK or raw loop, possibly in your own cloud) or on Anthropic's"],
          ["hook (SDK)", "a callback the harness runs at a lifecycle point, such as before a tool call, whatever the model decides"],
          ["checkpoint", "saved intermediate state that a long task can resume from after an interruption"],
          ["ZDR", "Zero Data Retention: an arrangement under which request and response data are not stored after the call; eligibility varies by feature and model"]
        ],
        scope: "Methods, tools and platforms for building Claude agents: the Agent SDK, custom loops and harnesses, managed deployment (self-hosted or Anthropic-hosted), and hooks for deterministic actions.",
        lesson: [
          "There are three wiring paths for the same loop, ordered by how much runtime you hand off. A raw loop on the Messages API: your code sends each request, reads the tool_use blocks, runs the tools and appends the results. Full control, and every behaviour (context management, parallel tool handling, retries) is code you write and test. The Agent SDK: the same loop inside your own process, with tool execution plumbing, context management and iteration already built. Claude Managed Agents: Anthropic runs the loop and the execution sandbox server-side; you define the agent once (model, system prompt, tools, MCP servers, skills) as a versioned API resource, refer to it by id and stream results back.",
          "A harness is everything around the model that turns one call into a dependable agent: the loop, tool dispatch, history and context management, permissions, hooks, retries and the stop rule. Writing a custom loop means writing a harness. The Agent SDK ships one, the same one that runs Claude Code: built-in tools, permission modes, a per-call allow-or-deny callback, subagents, resumable sessions, and hooks (callbacks on events such as PreToolUse and PostToolUse) for actions that must happen deterministically, such as blocking a write outside the workspace or logging every call. Don't rely on the SDK's default for loading CLAUDE.md and filesystem settings; set it explicitly (check the option name and default at docs.claude.com).",
          "Choose by deployment and compliance constraints, not by what is fastest to prototype. Managed sessions are stateful and stored by Anthropic, which is why (as the course states) they are not currently eligible for Zero Data Retention or a HIPAA BAA. A workload carrying PHI or under a ZDR requirement goes to the Agent SDK or a raw loop on a covered configuration, however well the managed path fits operationally. A common progression is to prototype on the SDK and move to managed agents for production; expect to re-express the definition, not export it.",
          "Whatever the path, four things hold: register the tools, scope the system prompt to the task (a broad prompt gives broad, unreliable routing), handle every tool_use with a tool_result, and define exit conditions that do not depend on the model volunteering to stop. Add at least one human-in-the-loop point.",
          "When a team has chosen the SDK to avoid writing a loop, it should let the SDK handle the loop, dispatch and history. When an agent has accumulated customisations over SDK defaults, judge each one on its original reason and on what the SDK can now do; neither revert all nor keep all on trust."
        ],
        tables: [
          {
            cap: "Three wiring paths",
            h: ["Path", "Who runs the loop", "Pick it when", "What you take on"],
            r: [
              ["Raw Messages API loop", "Your code, every iteration", "You need full control or have constraints a library won't fit", "Context management, parallel tools, retries: all yours to build and test"],
              ["Agent SDK", "The SDK, in your process", "You want the loop built but must keep execution in your environment (e.g. PHI, ZDR)", "Your code still executes tools; config is code and filesystem based"],
              ["Managed Agents", "Anthropic, server-side, with a sandbox", "Long-running tasks, you want a managed sandbox, no loop to build", "Server-side stateful sessions that can run for minutes or hours, results streamed back over SSE, agent-as-resource format, the managed sandbox's tools; public beta at the time of writing"]
            ]
          },
          {
            cap: "Where the human check goes",
            h: ["Insertion point", "Trigger", "Risk it addresses"],
            r: [
              ["Before a destructive tool call", "About to write, delete or send", "High: irreversible actions"],
              ["After a planning step", "Plan made, execution about to start", "Medium: a wrong plan wastes every later step"],
              ["On unexpected output", "Error flag, empty result, value out of bounds", "Variable: failures retries alone won't fix"]
            ]
          }
        ],
        know: [
          "Loop checklist: tools registered, system prompt scoped, tool-use loop handled, human check placed, exit conditions defined.",
          "Regulated data decides the endpoint, credentials, region and log destination before any prompt design: privilege, HIPAA, GDPR and residency, FedRAMP, internal policy.",
          "Per the course, the direct API does not currently offer EU data residency; EU residency routes through Bedrock or Vertex with the region pinned.",
          "A residency rule decides the deployment first: self-host the loop in the required region (bring your own cloud) or use a cloud platform with the region pinned, even if the team wants to ship fast; reduce the operational load afterwards.",
          "Long tasks with clear checkpoints: persist intermediate state and resume from the last good checkpoint.",
          "Hooks give deterministic actions inside the agent; they run whether or not the model 'remembers' a rule.",
          "The system prompt must not mention tools the agent doesn't have; it invites calls that can't succeed.",
          "Per the course, privileged or regulated work goes through the firm's approved LLM gateway with SSO and full request logging, because the direct API does not keep conversation content for you to audit."
        ],
        build: ["Build: ep02-agents", REPO + "ep02-agents"],
        traps: [
          { move: "We chose the Agent SDK, but we'll write our own loop and history layer next to it", why: "That rebuilds what you adopted the SDK to avoid. Let it handle the loop, dispatch and history." },
          { move: "Revert every customisation to SDK defaults to simplify maintenance", why: "Some were added for real reasons. Decide each on its original rationale and the SDK's current capability." },
          { move: "Ship on Anthropic-hosted infrastructure now and flag data residency for a compliance review after launch", why: "That breaches the policy from day one. Meet residency first (self-host, or a region-pinned platform), then cut the operational overhead." },
          { move: "Raise the timeout to hours so interruptions are rare enough to ignore", why: "Rare is not never. Checkpoint intermediate state and reload it on resume." },
          { move: "Run two copies of every long task and take whichever finishes first", why: "Double the cost and still no ability to resume. Checkpointing is the pattern." },
          { move: "Pilot on self-hosting, then move to the hosted path once data handling is understood", why: "Residency applies for the life of the system, not just the pilot." },
          { move: "Deploy on the hosted path while asking compliance to change the residency policy", why: "You are in breach until the policy changes, if it ever does." }
        ]
      },
      {
        title: "Agent patterns and frameworks", w: 4.9,
        short: "Most agents are built from a few patterns: the tool-use loop, chaining, routing, parallel fan-out, orchestrator and workers, evaluator and optimiser, and graphs for work that loops back. Frameworks such as Strands, LangGraph and PydanticAI package these patterns; you still choose the pattern and own memory and context.",
        terms: [
          ["tool-use loop", "the model calls a tool, reads the result and decides the next step, until it ends its turn"],
          ["prompt chaining", "a fixed sequence of calls in which each step's output feeds the next"],
          ["routing", "classify the input first, then send it to the prompt or model built for that class"],
          ["orchestrator-workers", "a lead agent decomposes the task, fans out to subagents in their own contexts, then synthesises"],
          ["evaluator-optimiser", "one call drafts, another critiques it against a bar, repeat until it passes"],
          ["graph / state machine", "stages as nodes, with the next edge chosen by the current state, so work can return to an earlier stage"],
          ["agent memory", "state that outlives one call: in-context, external storage, summarised carry-over, or none (stateless)"],
          ["agentic framework", "a library (Strands Agents, LangGraph, PydanticAI) that supplies loop, state and tool plumbing so you write less harness code"]
        ],
        scope: "Common agent design patterns (tool-use loops, subagents, memory, context-window management) and agentic frameworks for multi-step work.",
        lesson: [
          "The core pattern is the tool-use loop: the model calls a tool, reads the result and continues. Around it sit several named patterns. Prompt chaining feeds one step's output into the next. Routing classifies the input and sends it to the prompt or model built for it. Parallelisation runs independent subtasks at once, or the same task several times to vote. Orchestrator and workers has a lead agent decompose the task, fan out to subagents that work in parallel in their own contexts, and synthesise the answer. Evaluator-optimiser has one call generate and another critique until a bar is met.",
          "Two more names recur. Multi-step decomposition breaks a large task into ordered subtasks before any tool runs. Plan-then-execute has the agent write the plan first and then carry it out; a human check right after planning catches a wrong plan before any step is wasted.",
          "When work has to move back and forth between stages, a graph or state-machine pattern fits: for claim processing that iterates between fact extraction and eligibility checks before a decision, each stage is a node with its own success criteria and the claim's state decides the next move. A strict linear chain has no return path.",
          "Multi-agent is a cost decision. The course cites Anthropic's own research system: a lead with parallel subagents beat a single agent on internal evals, at roughly fifteen times the tokens. It pays off only when the work genuinely splits into independent parts (broad research across many sources); it is weak for tightly coupled work like coding, where each step depends on the last. Each subagent also needs its own retry and fallback handling.",
          "Context-window management is part of the pattern choice, not an afterthought. A single long loop accumulates every tool result. Orchestrator-workers keeps each worker's window small and returns summaries. A graph can carry only a compact state object between nodes. Plan-then-execute keeps a short plan visible while the details come and go. Domain 6 covers pruning, compaction and clearing in detail.",
          "Memory scope is decided by the shape of the session. In-context memory is free to read but inflates every call and dies with the session. External storage survives sessions and can be shared between users or agent instances, at the cost of read and write logic and latency. Summarised memory is cheap but keeps only what the summariser prompt chose to keep. Stateless is right for self-contained jobs. Choosing at design time takes minutes; refactoring under production pressure takes much longer.",
          "Frameworks implement these patterns for you. Strands Agents (an open-source SDK from AWS) is model-driven: you supply a model, a prompt and tools, and its loop does the rest. LangGraph (from the LangChain team) models an agent as a graph of nodes and edges over shared state, which suits loops back between stages and checkpointed, resumable runs. PydanticAI puts typed, validated inputs and outputs at the centre, so a result that doesn't match its Pydantic model is caught and retried. The trade-off is the same for all of them: less code to write, more abstraction between you and the prompts and responses. Start with direct API calls where you can; if you adopt a framework, know what it sends to the model underneath, because that is what you debug."
        ],
        tables: [{
          cap: "Memory scope",
          h: ["Scope", "What persists", "Cost", "Use when", "What you lose"],
          r: [
            ["In-context", "State within the active session", "No retrieval; token cost grows with the session", "Short sessions that need not survive a restart", "Everything when the session ends"],
            ["External storage", "State in a database, read back on start or demand", "Retrieval latency plus read/write logic", "State must survive sessions, move between users or be shared by agents", "Little, if read and write logic is right"],
            ["Summarised", "A condensed carry-over injected next session", "Cheap", "A short summary is enough continuity", "Anything the summariser prompt didn't keep"],
            ["Stateless", "Nothing", "None", "Each job is self-contained", "Nothing to lose"]
          ]
        }],
        know: [
          "Chain, route, parallelise, orchestrator-workers, evaluator-optimiser: know the shape of each.",
          "Iteration between stages: graph-based pattern with each stage judged on its own criteria.",
          "Decompose-and-delegate research: orchestrator and specialised subagents, then consolidate.",
          "Orchestrator-workers multiplies tokens (about 15x in Anthropic's reported case) and only pays off on parallel, independent work.",
          "The exam guide names frameworks such as Strands, LangGraph and PydanticAI: know they exist to build agents and workflows; the patterns above are what they implement.",
          "Subagents start clean: they do not inherit the parent's history or skills (they do inherit its permission context).",
          "Plan-then-execute: put the human check straight after planning.",
          "A /clear or a new session wipes in-context memory; anything that must survive goes to external storage.",
          "Strands: model-driven loop (AWS). LangGraph: graph of nodes over shared state, with checkpoints. PydanticAI: typed, validated outputs."
        ],
        build: ["Build: ep02-agents", REPO + "ep02-agents"],
        traps: [
          { move: "Process every claim through a fixed linear chain with no return paths", why: "The work needs to go back a stage. Use a graph-based pattern driven by the claim's state." },
          { move: "One tool-use loop with every tool for every subtask", why: "Tool choice degrades and one context fills with unrelated history. Decompose to scoped subagents." },
          { move: "Store the whole research history in memory up front, before any subtask starts", why: "That is not decomposition. Use an orchestrator that hands each piece to a focused subagent." },
          { move: "Multi-agent is always better because it scored higher", why: "It costs many times the tokens. Use it only when the task genuinely splits into independent parts." },
          { move: "Adopt a framework so you never need to look at the prompts and tool calls it sends", why: "When it misbehaves you debug what it sends. Know what runs underneath, or start on the API directly." }
        ]
      }
    ],
    remember: [
      "Call, workflow, agent: climb only when forced.",
      "The manager owns quality: budgets, schemas, hand-offs.",
      "Pick the wiring path by compliance, not convenience.",
      "Memory scope follows the session's shape."
    ]
  },

  /* ================================================================ D2 */
  {
    id: "d2", code: "D2", title: "Applications and integration", w: 33.1, eps: "EP 03, EP 06, EP 08", t: 2,
    summary: "A third of the exam. Requirements and the build life cycle, the Messages API in depth, software engineering practice around Claude code, application design choices, and configuration under version control.",
    links: [
      ["▶", "Watch EP 03 · Messages API (9 min)", YT + "iMBVThGLJi0"],
      ["▶", "Watch EP 06 · Settings and CLAUDE.md (8 min)", YT + "3dEtqvjJEoc"],
      ["▶", "Watch EP 08 · Requirements and life cycle (9 min)", YT + "S_wwjrwVpQg"],
      ["⌨", "Build: ep03-messages", REPO + "ep03-messages"],
      ["⌨", "Build: ep06-config-checker", REPO + "ep06-config-checker"],
      ["⌨", "Build: ep08-gate-checker", REPO + "ep08-gate-checker"]
    ],
    highlights: [
      "The largest domain at 33.1%: spend a third of your study time here.",
      "Turn the business ask into functional and infrastructure requirements before choosing platform or model.",
      "Who is waiting decides the call: synchronous, streamed, or the Message Batches API.",
      "Prompts, model ids, settings and plugin versions are code: pinned, version-controlled, reviewed."
    ],
    subs: [
      {
        title: "Understanding requirements", w: 3.4,
        short: "Turn the business ask into checkable functional requirements (what it must do) and infrastructure requirements (latency, scale, residency, regulation, audit, cost), and let the existing solution architecture constrain both. Only then choose the platform and model.",
        terms: [
          ["business requirement", "the outcome the organisation wants, in its own words: help support agents answer faster"],
          ["functional requirement", "a checkable statement of what the system must do: classify each ticket into one of four queues"],
          ["infrastructure (non-functional) requirement", "a constraint on how it runs: latency, throughput, residency, regulation, audit, availability, cost"],
          ["solution architecture", "the existing systems, cloud, identity provider and data flows the new piece must fit into"],
          ["requirements record", "a short written list of requirements, each tied to its source (a regulation, an SLA), so later choices can be defended"],
          ["trust boundary", "the line between what you control and what you don't; it decides which inputs are untrusted and which actions are allowed"]
        ],
        scope: "Functional and infrastructure requirements derived from business requirements and solution architecture.",
        lesson: [
          "A business problem is not yet a requirement. 'Help support agents answer faster' becomes functional requirements you can check: classify each ticket into one of four queues; draft a reply that cites the relevant policy; never auto-send without a person approving it.",
          "Infrastructure requirements are the non-functional constraints, and the business problem rarely states them. You derive them by asking: how fast must a response be, measured where the user is? How many requests, and at what peak? Where must data be processed? Which regulation applies? Who must be able to audit what? What is the cost ceiling?",
          "Solution architecture is the other input. If the company runs on one cloud and already has an identity provider and an approved LLM gateway, those are constraints, not options. A requirement such as 'every call goes through the approved gateway with SSO and full request logging' comes from the architecture, not from the business ask.",
          "Write both down in a short requirements record, with the regulation each constraint comes from. The platform and model decisions will be reviewed by people who were not in the room; the record lets you defend the choice as following from requirements rather than familiarity. A design document goes further: success criteria specific enough to grade, the failures the system must survive (each marked retriable or terminal), the cost and latency budget with a reliability floor, and the trust boundary (which inputs are untrusted, which actions are allowed)."
        ],
        know: [
          "The first step on any 'make analysts faster' brief: interpret the functional and infrastructure requirements the goal implies.",
          "Functional = what it must do, checkable. Infrastructure = latency, scale, residency, regulation, audit, cost.",
          "Set cost and latency budgets before the architecture, so the design can be checked against them.",
          "Name the trust boundary on paper; it becomes least privilege you enforce with a hook.",
          "For a throwaway prototype with no regulated data, light notes are enough; a regulated deployment is not.",
          "A pass/fail compliance requirement (residency, HIPAA, FedRAMP) decides the platform by itself; latency and cost then choose among what's left."
        ],
        build: ["Build: ep08-gate-checker", REPO + "ep08-gate-checker"],
        traps: [
          { move: "Start by asking analysts where Claude could slot into their process", why: "Useful later, but it skips defining what is being built. Derive functional and infrastructure requirements first." },
          { move: "Survey similar agent features in the industry and copy the approach", why: "Precedent is not a requirement. Start from what this goal needs." },
          { move: "Pick the model tier first, then design around it", why: "The model follows from the requirements, not the other way round." }
        ]
      },
      {
        title: "Systems life cycle", w: 2.8,
        short: "A Claude application goes through the same life cycle as any system: requirements, design, build, test, deploy, operate, iterate. Gates between phases (residency before build, an eval before promotion) keep control, and shipping starts the operate-and-maintain phase rather than ending the work.",
        terms: [
          ["SDLC", "software development life cycle: the phases a system moves through from requirements to retirement"],
          ["phase gate", "a check that must pass before work moves to the next phase"],
          ["waterfall / agile / DevOps", "life-cycle frameworks: phases once in sequence; short cycles that each ship a working slice; one continuous build-deploy-operate loop owned by one team"],
          ["canary", "sending a small share of traffic to a new version and comparing it with the baseline before full rollout"],
          ["operate and maintain", "monitoring, incident response, updates and planned evolution once the system is live"],
          ["deprecation / retirement", "a model or API feature scheduled for removal; maintenance includes migrating before the date"]
        ],
        scope: "Life-cycle concepts and frameworks for developing, implementing, operating and maintaining systems.",
        lesson: [
          "A Claude application moves through the same phases as any system: requirements (functional and infrastructure needs), design (platform, model and trust boundaries), build (agent, tools, prompts), test (evals plus unit, integration and end-to-end checks), deploy (pin the version, gate promotion on the eval), operate (instrument cost, latency and errors; enforce guardrails), and iterate (feed production findings back into requirements).",
          "Gates between phases are where a regulated engagement keeps control: no build until the platform meets the residency requirement; no full production until the new version clears the eval against the pinned baseline. Teams under deadline are tempted to skip gates. A one-off experiment may collapse phases; a regulated deployment cannot.",
          "Shipping is the start of the operate phase, not the end of the work: monitoring, responding to issues and planning the next change.",
          "The exam guide asks for life-cycle frameworks as well as phases. Waterfall runs the phases once, in sequence. Agile runs short cycles that each deliver a working slice. DevOps (and its machine-learning cousin, MLOps) treats build, deploy and operate as one continuous loop owned by the same team. LLM applications suit the iterative shape, because the eval set and the prompts keep changing as production teaches you.",
          "Maintenance has an LLM-specific item: models are deprecated and retired on a published schedule (partner platforms keep their own dates), so a pinned model is a migration you plan, not a permanent choice. Reuse is part of maintenance too: a build you will deploy again (an agent template, an MCP server package, an eval suite) is packaged with per-customer values parameterised and documented, credentials referenced rather than embedded, its assumptions and the eval that defines 'working' written down, and its audit trail included. A one-off doesn't need packaging."
        ],
        tables: [{
          cap: "Life cycle applied to a Claude application",
          h: ["Phase", "What happens", "Gate out of it"],
          r: [
            ["Requirements", "Functional and infrastructure needs captured", "Requirements record agreed"],
            ["Design", "Platform, model, trust boundaries chosen", "Platform satisfies residency and compliance"],
            ["Build", "Agent, tools, prompts written", "Tests pass"],
            ["Test", "Evals, unit, integration, end-to-end", "Eval clears the bar"],
            ["Deploy", "Pin the version; canary against baseline", "New version beats or matches pinned baseline"],
            ["Operate", "Instrument cost, latency, errors; guardrails on", "Findings logged"],
            ["Iterate", "Production findings feed requirements", "Back to requirements"]
          ]
        }],
        know: [
          "Seven phases: requirements, design, build, test, deploy, operate, iterate.",
          "After shipping: operate and maintain (monitor, respond, plan evolution).",
          "The eval is the deployment gate, not a one-off test.",
          "A formal testing strategy covers unit, integration (the Claude integration) and end-to-end tests for critical flows, applied consistently.",
          "Plan model migrations: retirement dates are published, and partner platforms may differ from Anthropic's."
        ],
        build: ["Build: ep08-gate-checker", REPO + "ep08-gate-checker"],
        traps: [
          { move: "Shipping to production is the final stage", why: "Shipping starts operate-and-maintain: monitoring, fixing and planning evolution." },
          { move: "Hand the system to a separate operations team who run it independently", why: "No continuity. The team that built it operates and evolves it." },
          { move: "Hold a formal post-deployment review of the development phase before any further work", why: "Operating the live system can't wait on a retrospective." },
          { move: "Make TDD, or end-to-end tests alone, the whole testing strategy", why: "Each covers one layer. Use unit, Claude-integration and end-to-end tests, applied consistently." }
        ]
      },
      {
        title: "Claude API mechanics", w: 6.8,
        short: "Every call to Claude is one stateless Messages API request: model, system prompt, messages made of content blocks, and max_tokens. Read stop_reason every time, answer every tool_use with a matching tool_result, act on streamed blocks only once they close, and send work nobody is waiting for to the Message Batches API.",
        terms: [
          ["Messages API", "the endpoint (POST /v1/messages) behind every Claude call; stateless, so you resend the conversation each turn"],
          ["content block", "one typed piece of a message: text, image, document, tool_use, tool_result, thinking"],
          ["stop_reason", "the field on every response that says why generation stopped: end_turn, max_tokens, stop_sequence, tool_use, pause_turn, refusal, model_context_window_exceeded"],
          ["tool_use / tool_result", "Claude's request to run a tool (with a unique id) and your answer, which must carry the same id in the next user turn"],
          ["server-sent events (SSE)", "the one-way HTTP stream the API uses for streaming, as named events"],
          ["thinking block", "the block holding Claude's reasoning when thinking is on; it comes before the answer and carries a signature that must not be altered"],
          ["Message Batches API", "asynchronous bulk endpoint: submit many requests, poll, collect results within 24 hours at a lower price"],
          ["Files API", "upload a file once, get a file_id, and reference it in later requests instead of resending the bytes (beta; confirm at docs.claude.com)"]
        ],
        scope: "Messages, tools, streaming, vision, thinking, caching, calling Claude through third-party vendors, Messages API data access patterns, the batch API, and choosing realtime versus batch.",
        lesson: [
          "A Messages API request carries the model id, an optional system prompt, the list of messages and max_tokens. The API is stateless: it remembers nothing between calls, so you resend the whole conversation each turn. Each message is a role (user or assistant) plus a list of content blocks: text, image, document (PDFs), tool_use, tool_result and thinking.",
          "Tool turns have a strict structure. When Claude wants tools, the assistant turn holds one or more tool_use blocks, each with a unique id. The next user turn must answer every one of them with a tool_result carrying the matching tool_use_id; a result placed in a later turn fails validation. The id is what links each result to its call when several run in parallel and finish in a different order. Keep the full assistant content array when you append it, including any text block beside a tool_use. Example: Claude asks for get_order(41) and get_customer(7) in one turn; you run both and send one user turn containing two tool_result blocks, one per id.",
          "Read stop_reason on every response. end_turn: finished. max_tokens: cut off at your limit, so the output may be incomplete. stop_sequence: one of your custom stop strings was hit. tool_use: Claude wants a tool run. pause_turn: a long server-tool turn was paused; send the response back as it is to let it continue. refusal: Claude declined for safety reasons; it arrives as HTTP 200, so only stop_reason tells you. model_context_window_exceeded: the input fitted but generation hit the window ceiling, and the partial output is returned. An input already larger than the window is rejected with a validation error before generation.",
          "Streaming sends server-sent events: message_start, then for each block content_block_start, content_block_delta and content_block_stop, then message_delta (carrying stop_reason and final usage) and message_stop. Text arrives as text_delta. A tool_use block opens with its name and id but no input; the input arrives as input_json_delta fragments (partial_json) that you accumulate by block index and parse only when the block stops.",
          "Three rules follow. Act on a block only after content_block_stop. Commit a turn to history only after message_stop, and read stop_reason from message_delta before deciding the next step of the loop. On an interrupted stream, discard the partial turn and retry the request: a half-built tool_use left in history is the classic cause of a validation error on the next call.",
          "Thinking. Turn it on with the thinking parameter where a model doesn't think by default (current models use adaptive thinking steered by an effort level; older ones took a fixed budget_tokens). Thinking blocks come before the answer, and each carries a signature. In a tool loop, pass thinking blocks back exactly as received: editing, summarising or dropping them makes the next request fail. On the newest models the reasoning text may be omitted or summarised in the response by default, while you still pay for the thinking tokens. Confirm per-model behaviour at docs.claude.com.",
          "Vision and documents. Per the course, an image costs about ⌈width/28⌉ × ⌈height/28⌉ visual tokens (a 1,000 × 1,000 image is about 1,296; the hard limit is 8,000 × 8,000 px). Each model has a maximum native resolution; larger images are downscaled first and the cost is worked out on the scaled size, so a resize step before upload is often the fix for an over-budget pipeline. Send images as base64 (resent with every request), a URL, or a Files API file_id (upload once, reuse). PDFs use a document block with the same three source options and optional title and context fields. Price image cost against the largest production input, not test thumbnails. Confirm the formula and limits at docs.claude.com.",
          "Messages API data access patterns are the ways data reaches a request. Inline: text or base64 in the message (simple, resent every turn). By reference: a URL or a Files API file_id. Retrieved on demand: a client tool your code runs (a database query, a search) returns only the slice needed. Through Anthropic's side: server tools such as web search and web fetch, or the MCP connector, which lets the API call a remote MCP server directly. Choose by size, reuse and freshness: a manual reused all day is a file reference plus a cached prefix; a customer record is a tool call; the open web is a server tool. Caching (cache_control on a block, visible in usage as cache_creation_input_tokens and cache_read_input_tokens) is covered under Cost and token management.",
          "The Message Batches API takes up to 100,000 requests or 256 MB per batch, whichever comes first, at half the standard price. You submit, receive a batch id, poll until processing ends, then download results matched by each request's custom_id. A batch finishes within 24 hours, often much sooner, at a lower per-token price, but the completion time is not predictable. It suits nightly pipelines, eval runs and backfills, and never anything a user is waiting on. Calling the synchronous API in a loop is not batching. A textbook combination: a nightly job classifying images against a fixed taxonomy uses the Files API (no re-uploads), Batches (latency absorbed) and structured output.",
          "Third-party platforms. Claude in Amazon Bedrock, Google Cloud Vertex AI and Microsoft Foundry is called with that cloud's identity, endpoints, model-id formats and regions, and may get features later than the first-party API. Per the course, Claude Platform on AWS is different: billed through the customer's AWS account, but with Anthropic's model ids, lifecycle and terms, and inference run by Anthropic outside the AWS boundary. Pick by the customer's contract, compliance and region first; keep application logic provider-agnostic and the provider details in configuration. Confirm platform details at docs.claude.com."
        ],
        tables: [
          {
            cap: "Realtime or batch",
            h: ["Use case", "Right pattern", "Why"],
            r: [
              ["User uploads a photo and expects a classification now", "Synchronous API", "A user is waiting; batch latency is unacceptable"],
              ["Nightly pipeline classifies 5,000 records", "Message Batches API", "No one waiting; lower cost wins"],
              ["Eval run over 2,000 examples", "Message Batches API", "Offline, cost matters more than speed"],
              ["Chatbot reply", "Synchronous, usually streamed", "User is watching the answer arrive"]
            ]
          },
          {
            cap: "Streaming events",
            h: ["Event", "Signals", "Your handler"],
            r: [
              ["message_start", "A new message begins", "Set up an empty content array"],
              ["content_block_start", "A block opens (text, tool_use, thinking) at an index", "Create the block at that index"],
              ["content_block_delta", "A fragment of text or partial tool JSON", "Append; don't parse tool JSON yet"],
              ["content_block_stop", "That block is complete", "Now parse and act on it"],
              ["message_delta", "stop_reason and final usage", "Record stop_reason"],
              ["message_stop", "Stream complete", "Commit the turn to history"]
            ]
          }
        ],
        know: [
          "tool_use ↔ tool_result pairing by id, in the very next user turn; structural, not fixable by prompting.",
          "Refusal is HTTP 200 with stop_reason refusal: raise it, log it, don't retry silently.",
          "Batches: up to 100,000 requests or 256 MB, up to 24 h, cheaper per token.",
          "Files API for assets reused across requests; base64 for one-offs.",
          "Bedrock or similar contract: call Claude through that platform's path from day one, logic provider-agnostic.",
          "Token counting endpoint takes the same body as a messages call and returns the count without running inference.",
          "stop_sequence = your stop string was hit; pause_turn = send the response back to let a server-tool turn continue.",
          "Streaming: text_delta for text, input_json_delta for tool input; read stop_reason from message_delta.",
          "Thinking blocks go back unchanged in a tool loop; their signatures are checked.",
          "Data reaches a request inline, by reference (URL, file_id), through a client tool, or through server tools and the MCP connector."
        ],
        build: ["Build: ep03-messages", REPO + "ep03-messages"],
        traps: [
          { move: "Stream each of the 10,000 overnight emails into the database as tokens arrive", why: "Nobody is watching. Non-interactive work with a flexible deadline belongs on the Message Batches API." },
          { move: "Concurrent realtime calls finish the overnight job fastest, so use those", why: "Speed isn't the requirement; cost is. Batches are cheaper and the window is flexible." },
          { move: "Build on the direct API now and move to Bedrock in a later release", why: "The contract applies today. Use the Bedrock path from the start, with provider-agnostic logic." },
          { move: "Build two parallel implementations and pick the faster one at runtime", why: "Double the code, and one path still breaches the contract." },
          { move: "Parse the tool input as each delta arrives to save time", why: "Partial JSON isn't valid until content_block_stop. Act only on closed blocks." },
          { move: "Retry with the half-built tool_use from the dropped stream still in history", why: "The partial block fails validation. Discard the partial turn, then retry the request." },
          { move: "Send each image as base64 in every request of the nightly job", why: "The bytes are resent every time. Upload once with the Files API and reference the file_id." },
          { move: "Run a user-facing photo classifier through the Message Batches API to save money", why: "Batches can take hours and a user is waiting. Use the synchronous API." }
        ]
      },
      {
        title: "Software engineering foundations", w: 7.4,
        short: "Code that calls Claude is ordinary production code: called over REST with JSON, async where the service is async, kept in version control, run through CI and code review, and refactored with tests first. Keep it proportionate: no abstraction layer or full deploy that the requirement doesn't need.",
        terms: [
          ["REST API", "an HTTP interface: send a method (POST), headers and a JSON body to a URL; get a status code and JSON back"],
          ["JSON", "the text format for request and response bodies; parse it and validate it against a schema rather than trusting its shape"],
          ["async / await", "a style in which a call in flight doesn't block other work; AsyncAnthropic in Python, promises in TypeScript"],
          ["event loop", "the scheduler an async service runs on; one blocking call stalls every request it is serving"],
          ["CI quality gate", "an automated check (tests, lint) that must pass on every pull request before merge"],
          ["regression test", "a test that pins current behaviour, so a change that alters it fails loudly"],
          ["refactoring", "changing code's structure without changing its behaviour; small (rename, extract a function) or large (migrate many call sites)"]
        ],
        scope: "REST APIs, JSON, asynchronous programming, version control, SDLC integration, code review, and small- and large-scale refactoring.",
        lesson: [
          "Under the SDK sits plain REST. A Claude call is an HTTPS POST to /v1/messages with headers for the key (x-api-key) and the API version (anthropic-version) and a JSON body; the response is JSON plus a status code. 4xx codes mean fix the request; 5xx and 529 mean try again later. Treat every JSON body as untrusted until it is parsed and validated: a missing field or a wrong type should raise a handled error, not crash the worker.",
          "Version control holds everything that changes behaviour: code, prompts, model ids, CLAUDE.md and settings. Each change goes on a branch and is merged through a reviewed pull request, so any change in behaviour has a commit you can find and revert.",
          "Claude code is ordinary code and goes through the same discipline. In an async service (handling concurrent requests), use the SDK's async client in Python (AsyncAnthropic) or await the promise-based client in TypeScript, so Claude calls sit beside the rest of the event loop. Blocking the loop with synchronous calls, isolating calls in a separate thread pool, or rewriting the service as synchronous all fight the architecture.",
          "Every pull request runs the same quality gates as other services: automated tests of the Claude integration, linting and the team's usual checks. A full production deploy per PR is excessive; moving Claude tests to manual pre-release review leaves gaps before merge.",
          "Code review for a Claude feature asks for three things in one pass: prompt and model configuration moved out of inline code into a configurable location, error handling for API failures, and tests for the integration. Approving 'because it works on the happy path' lets known gaps ship.",
          "Refactoring comes in two sizes. Small-scale refactoring (rename, extract a function, remove a duplicate) happens continuously under existing tests. When prompt-handling code has gathered duplication and tangled control flow that slows every feature, plan a dedicated pass (consolidate, separate concerns, simplify) before adding features, rather than cleaning up inside feature tickets.",
          "Large-scale refactoring needs a safety net. For a deprecated API parameter used in about forty places with a six-month window: write regression tests for the current behaviour first, then migrate call sites in batches, each validated against the tests. A last-minute big-bang change risks a broad break; a permanent wrapper only delays the migration."
        ],
        code: { cap: "Async client in an async service (Python)", text: "from anthropic import AsyncAnthropic\nclient = AsyncAnthropic()  # reads ANTHROPIC_API_KEY from the environment\n\nasync def summarise(text: str) -> str:\n    msg = await client.messages.create(\n        model=MODEL_ID,          # pinned id from config, not inline\n        max_tokens=512,\n        messages=[{\"role\": \"user\", \"content\": text}],\n    )\n    return msg.content[0].text" },
        know: [
          "Async service → async client and awaitable Claude calls.",
          "CI on every PR: integration tests, linting, standard gates.",
          "Code review: configurable prompt/model, error handling, tests, all before merge.",
          "Deprecation: regression tests first, then batched migration.",
          "Tangled code that slows new features: a planned refactoring pass, not cleanup smuggled into feature tickets.",
          "No multi-provider need on the roadmap → integrate directly through the Claude SDK; an abstraction layer is cost without benefit.",
          "REST basics: POST, headers (key, API version), JSON body; 4xx means fix the request, 5xx and 529 mean retry later.",
          "Small refactors continuously under tests; large ones planned, tested first, migrated in batches."
        ],
        build: ["Build: ep03-messages", REPO + "ep03-messages"],
        traps: [
          { move: "Run Claude calls in a separate thread pool so the event loop is untouched", why: "It works against the async design. Use the async client and await the calls." },
          { move: "Approve the PR and add error handling and tests in a follow-up", why: "Known gaps ship and stay. Request configuration, error handling and tests now." },
          { move: "Migrate all forty call sites in one change just before the removal date", why: "One broad, hard-to-debug break. Add regression tests and migrate in validated batches." },
          { move: "Wrap the deprecated parameter in a helper so the codebase never has to change", why: "The parameter is still being removed. A wrapper only delays the work." },
          { move: "Add a multi-provider abstraction layer for long-term flexibility", why: "With no portability need, it adds complexity and a dependency for nothing. Use the Claude SDK directly." },
          { move: "Run a full production deploy on every pull request", why: "Excessive. Integration tests, linting and the standard gates are enough before merge." },
          { move: "Leave the Claude integration tests to a manual pre-release review", why: "Gaps reach main before anyone checks. Automate them in CI on every pull request." },
          { move: "Refactor bit by bit inside each feature ticket, or defer it two releases", why: "The tangle keeps slowing every feature. Plan a dedicated refactoring pass first." }
        ]
      },
      {
        title: "Claude application design", w: 8.6,
        short: "Each Claude surface (claude.ai, Desktop, Claude Code, the API, the SDKs) adds different context, so design for the one your users actually run. Split work into stages, decide what data may cross to the model, give outputs a schema, define when sessions end or reset, and pin plugin versions.",
        terms: [
          ["interface / surface", "where Claude runs: claude.ai and Desktop (Anthropic's apps), Claude Code (terminal agent), the API and SDKs (your code)"],
          ["content boundary", "the rule for what data may leave your application for the model, enforced by filtering or redaction at that edge"],
          ["schema design", "defining the exact shape (fields, types, required keys, enums) of what Claude returns or receives, so consumers can validate it"],
          ["session hygiene", "rules for how long a conversation lives, what resets it and when to start fresh, so stale context doesn't leak"],
          ["plugin management", "tracking which plugins (and versions) a project uses, pinning them and upgrading deliberately"],
          ["settingSources", "Agent SDK option deciding whether filesystem settings and CLAUDE.md are loaded; set it explicitly"]
        ],
        scope: "Design considerations for Claude applications: how Claude interprets instructions across interfaces (Claude Code, Desktop, claude.ai, API, SDKs), content boundaries, schema design, session hygiene and plugin management.",
        lesson: [
          "Different interfaces load different context, so the same instruction can behave differently on two surfaces. On the API there is no system prompt unless you send one, and nothing persists between calls: Claude sees exactly what you send. claude.ai and Desktop add Anthropic's own system prompt, the user's project instructions and features such as memory and connectors, none of which you control. Claude Code adds its own system prompt plus CLAUDE.md, rules, skill descriptions and tool definitions from the filesystem. The Agent SDK loads filesystem settings only if its settingSources configuration says so. Design and test on the interface your users actually run.",
          "Split work into calls by stage when stages have different inputs, outputs and success criteria: triage (classify) and response (draft) as separate, focused calls beat one call doing both. For long documents, decide which property matters (cross-section reasoning favours the whole document; per-section citation accuracy favours chunks) from the real use case, then validate on representative documents.",
          "Content boundaries: decide what may leave your application for the model, and filter or redact the rest at the boundary. Schema design: give downstream consumers a defined shape and validate against it. Keep it flat where you can, use enums for fixed categories, mark as required only what is always known, allow null or 'unknown' rather than forcing invented values, and version the schema when it changes.",
          "Session hygiene: define explicit expiry rules, triggers that reset state (a new customer, a changed task, a permission change) and rules for starting a fresh session, so stale context never leaks into a new conversation. In Claude Code the same habit is /clear between unrelated tasks and /compact when a long task must carry on.",
          "Plugin management: track and pin plugin versions in project configuration so a regression can be traced to a version and upgrades are deliberate. Know where each plugin comes from (an approved marketplace), and check that what it relies on travels with it: absolute paths and unbundled hooks or deny rules break on the next machine."
        ],
        know: [
          "Separate calls for stages with distinct success criteria (triage then response).",
          "Whole document versus chunks: let the use case decide which property matters, then validate.",
          "Session lifecycle = expiry rules + reset triggers + fresh-session rules, per session.",
          "Plugin versions tracked and pinned; upgrade on purpose.",
          "Agent SDK: CLAUDE.md and filesystem settings load only when settingSources includes them.",
          "API: Claude sees only what you send. claude.ai and Desktop: Anthropic's system prompt plus user features. Claude Code: its own prompt plus CLAUDE.md, rules, skills, tools.",
          "Schema: flat, enums for categories, required only when always known, an explicit unknown option, versioned."
        ],
        build: ["Build: ep06-config-checker", REPO + "ep06-config-checker"],
        traps: [
          { move: "One call for triage and drafting is cheaper in every setup", why: "Mixing stages blurs both prompts and their criteria. Separate focused calls." },
          { move: "Draft several replies in parallel and have a fourth call pick the best", why: "Complexity without matching the natural stage boundaries." },
          { move: "One short timeout is a complete session-lifecycle design", why: "It covers only part of it. Add reset triggers and fresh-session rules." },
          { move: "Upgrade every plugin to latest on a schedule to keep drift small", why: "When something breaks you can't tell which version worked. Track and pin versions." },
          { move: "Judge chunked processing on its citation results alone", why: "Looking at one side's results skips the real question: which property does this use case need?" }
        ]
      },
      {
        title: "Configuration management", w: 4.1,
        short: "Everything that changes Claude's behaviour is configuration and is treated like code: CLAUDE.md, settings.json, the pinned model id, prompt versions and plugin dependencies live in version control, per environment, and change only through reviewed pull requests.",
        terms: [
          ["model pinning", "naming an exact model snapshot so the model can't change under you"],
          ["alias", "a short model name that points at the latest snapshot and moves when a new one ships"],
          ["prompt versioning", "keeping prompts in one source under version control with review, so each change is traceable and revertible"],
          ["settings.json", "Claude Code's configuration file (permissions, hooks, env, model, plugins) at managed, project, local and user levels"],
          ["plugin dependency", "a plugin, its source marketplace and version that the project relies on, recorded so every machine gets the same one"],
          ["per-environment config record", "a versioned file stating the model pin, prompt version and plugin set for dev, staging and production"]
        ],
        scope: "Configuration management for Claude components: CLAUDE.md files, settings.json, model version pinning, prompt versioning and plugin dependencies.",
        lesson: [
          "Configuration that is scattered across environment variables, hard-coded values and undocumented scripts becomes a version-controlled record per environment: the pinned model version, the prompt version and the plugin dependencies for dev, staging and production. Environments may legitimately differ; the point is that every difference is written down and reviewable.",
          "Pin the model you ship. Aliases move to newer snapshots and can resolve differently across platforms. Per the course, from Claude 4.6 onwards the model id alone pins a snapshot; earlier models need the id plus a date suffix. Check the current convention in the docs. Promote a new version by sending a share of traffic, comparing with the pinned baseline on the eval, and promoting or rolling back.",
          "Prompts belong in one source of truth, under version control, with mandatory review; a recent unreviewed prompt change is the symptom of skipping this. CLAUDE.md and settings.json are versioned in the same repository as the code, changed through pull requests.",
          "Plugin dependencies are recorded the same way: which plugins the project enables, from which marketplace, at which version. In Claude Code this lives in settings (an enabled-plugins list and the marketplaces the team should know about); administrators can allowlist marketplaces in managed settings, which restricts sources but registers nothing by itself. Check the exact setting names at docs.claude.com.",
          "Before rolling out a prompt or model change used by several downstream systems, assess the impact on each consumer and coordinate with their owners; staging tests alone don't show how each consumer reacts."
        ],
        know: [
          "Per-environment config in version control: model pin, prompt version, plugin dependencies.",
          "Prompts: single source of truth, versioned, reviewed.",
          "CLAUDE.md and settings.json live with the code and go through PRs.",
          "Assess downstream impact before a configuration rollout.",
          "Moving aliases are fine for a throwaway prototype; pinning is for what ships.",
          "Plugin dependencies: enabled plugins, their marketplace and version, in committed settings; marketplaces allowlisted by admins."
        ],
        build: ["Build: ep06-config-checker", REPO + "ep06-config-checker"],
        traps: [
          { move: "Stop pinning and run the latest model everywhere to cut maintenance", why: "Every upstream change becomes a silent production change. Pin and promote through the eval." },
          { move: "Hard-code all configuration so there are fewer sources to track", why: "Changes then need code edits and lose per-environment clarity. Use a versioned config record." },
          { move: "Make every environment identical to remove the differences", why: "Environments may need to differ. Document the differences instead." },
          { move: "Keep settings in a separate config repo so it evolves independently", why: "It loses its link to the code it governs. Version it with the code." },
          { move: "Staging passed, so log the change in the changelog and roll out", why: "Staging doesn't show every downstream consumer's reaction. Assess each and coordinate." },
          { move: "Keep prompts in a spreadsheet, or build them inline at runtime to skip review", why: "Prompts are logic. One versioned source with mandatory review." },
          { move: "One source of truth for prompts, but review optional for urgent changes", why: "That is how the unreviewed change shipped. Review is mandatory." },
          { move: "Copy CLAUDE.md and settings into several repos for redundancy", why: "Copies drift. Version one copy with the code it governs, through pull requests." }
        ]
      }
    ],
    remember: [
      "Business goal → functional + infrastructure requirements.",
      "stop_reason, block pairing, closed blocks only.",
      "Who waits decides sync, stream or batch.",
      "Pinned, versioned, reviewed: models, prompts, settings, plugins."
    ]
  },

  /* ================================================================ D3 */
  {
    id: "d3", code: "D3", title: "Claude Code", w: 3.1, eps: "EP 06, EP 07", t: 6,
    summary: "Operating Claude Code: the explore–plan–code loop, permission modes, the settings hierarchy, CLAUDE.md and rules files, hooks, subagents, skills and commands, plugins, and headless runs.",
    links: [
      ["▶", "Watch EP 07 (10 min)", YT + "meUspuAi6HY"],
      ["▶", "Watch EP 06 (8 min)", YT + "3dEtqvjJEoc"],
      ["⌨", "Build: ep07-guard-hook (no key)", REPO + "ep07-guard-hook"],
      ["❓", "PRACTICE.md (EP 07)", BLOB + "ep07-guard-hook/PRACTICE.md"]
    ],
    highlights: [
      "Only 3.1%, but its ideas recur in Security (hooks) and Applications (configuration).",
      "Managed settings beat project, local and user; a deny rule beats any allow, in any mode.",
      "CLAUDE.md is guidance loaded every session; a hook is enforcement that runs every time.",
      "CI uses headless mode with permissions set in settings, never prompts disabled everywhere."
    ],
    subs: [
      {
        title: "Claude Code operation", w: 3.1,
        short: "Claude Code is an agent in your terminal: it explores, plans and edits under a permission mode you choose, guided by the CLAUDE.md hierarchy and rules, extended with skills, subagents, hooks and plugins, and configured through layered settings.json files. For CI it runs headless with claude -p and permissions set in settings.",
        terms: [
          ["CLAUDE.md", "markdown instructions and project context Claude Code loads into every session; layered from managed, user, project and subdirectory files"],
          ["rules (.claude/rules/)", "extra instruction files; with a paths glob in frontmatter they load only when Claude works on matching files"],
          ["skill", "a folder with SKILL.md (name, description, instructions) plus optional scripts; only the description loads until the task matches or you type /skill-name"],
          ["slash command", "a / instruction in a session: built-in ones such as /init, /clear, /compact, /permissions, /hooks, /agents, or custom ones you write as skills"],
          ["subagent", "a delegated worker (built-in, such as Explore and Plan, or custom in .claude/agents/) with its own context, tools and prompt, returning a summary"],
          ["permission mode", "how much Claude may do without asking: default, acceptEdits, plan, auto, dontAsk, bypassPermissions"],
          ["headless mode", "a non-interactive run with claude -p; output as text, json or stream-json for scripts and CI"],
          ["auto mode", "a permission mode in which a separate classifier model reviews each action and blocks anything beyond your request, instead of asking you each time; reads and in-folder edits skip the check, and explicit ask rules still prompt"]
        ],
        scope: "Core components (rules, skills, commands, agents, agent memory), features (session management, built-in and custom slash commands, headless mode, streaming mode, auto mode), the CLAUDE.md hierarchy, repository initialisation and settings.json.",
        lesson: [
          "Claude Code runs the agent loop in your terminal with a permission layer on top. It explores (reads files, traces logic), plans (a structured description of intended edits) and then codes once the plan is approved. Plan mode holds it in exploration, blocking edits and shell commands until you release it: the safe default for unfamiliar or high-stakes code.",
          "Permission modes trade speed for oversight. default asks before each edit and shell command (reads are free): the baseline for a new codebase. acceptEdits lets file edits in the working directory through but still asks for commands. plan is read-only until you approve the plan. auto hands routine approvals to a safety classifier that lets low-risk actions run and stops risky ones: a middle ground between asking every time and never asking. dontAsk denies anything not already allowed by a rule, which suits locked-down automation. bypassPermissions skips every prompt and the protected-path guard: use it only in an isolated sandbox or container.",
          "Shift+Tab cycles modes during a session, and defaultMode in settings sets the starting one. Allow, ask and deny rules sit on top of any mode, and deny beats ask beats allow. The list of modes changes between releases; confirm it at docs.claude.com.",
          "Settings live at four levels. User (~/.claude/settings.json) follows you everywhere. Project (.claude/settings.json, committed) binds everyone who clones the repo. Local (.claude/settings.local.json, git-ignored) holds personal overrides. Managed or enterprise settings, set by administrators, cannot be overridden; a managed deny rule is the most durable control and holds even under a bypass mode. A settings.json holds permissions (allow, ask and deny lists, defaultMode), hooks, environment variables, the default model, enabled plugins and MCP server approvals.",
          "Agent memory in Claude Code is the CLAUDE.md hierarchy, loaded at session start. A managed (organisation) file set by administrators. Your user file (~/.claude/CLAUDE.md) for personal preferences in every project. The project file (./CLAUDE.md or ./.claude/CLAUDE.md, committed) for team standards. CLAUDE.md files in subdirectories, which load when Claude works in that folder. Files can import others with @path. More specific files add to broader ones; they don't replace them. A hierarchy puts team-wide standards at a broad level and project specifics in each repo, instead of copying or linking one file everywhere.",
          "Claude Code also keeps an auto memory: notes Claude writes itself from your corrections and preferences, stored per repository on your machine and loaded at the start of each session (only the first part of the file, so it stays short). It is on by default in local sessions; /memory lists the CLAUDE.md files, toggles auto memory and opens its folder. A subagent does not inherit the main auto memory, but can be given its own with the memory field in its definition. All of it is guidance added to the context, not enforcement, and a secret committed in CLAUDE.md is leaked twice: in git history and in every session's context.",
          "Repository initialisation: /init reads the codebase and drafts a CLAUDE.md (build and test commands, layout, conventions). Review and trim it, because whatever it guesses is loaded every session. Keep CLAUDE.md small, since every line dilutes the rule that matters: move occasional procedures into skills and path-specific guidance into rules. Rules files in .claude/rules/ carry a paths glob in their frontmatter (for example src/db/**/*.sql) so they load only when Claude works on matching files; subfolders under rules/ only organise them; without a paths field they load every session like CLAUDE.md.",
          "Session management. Sessions are saved and can be picked up again: claude --continue (-c) resumes the most recent one, claude --resume (-r) or /resume chooses one, and a resumed session can be forked into a new one. Inside a session, /clear empties the context between unrelated tasks, /compact summarises it (optionally told what to keep) when a long task must carry on, and /rewind returns code and conversation to an earlier checkpoint.",
          "Slash commands. Built-in ones include /init, /clear, /compact, /model, /permissions, /hooks, /agents, /mcp, /memory, /config and /cost. Custom commands are now written as skills and invoked as /skill-name; the older .claude/commands/ files still work. A skill with disable-model-invocation: true runs only when someone types its name, never on Claude's own initiative.",
          "Hooks run your scripts at lifecycle events. They are defined in settings and inspected with /hooks; each has an event, an optional matcher (which tools) and a command. PreToolUse can block a call (exit code 2 with the reason on stderr, or a deny decision). PostToolUse runs after success for formatting, tests and audit logs; it can't undo the call. UserPromptSubmit can validate a prompt or add context. Stop fires when Claude finishes responding. SessionStart (also on resume) and SessionEnd bracket a session. Notification fires when Claude needs permission or has sat idle. A hook's output reaches Claude only if it is returned to it.",
          "Subagents run a delegated task in their own context and return a summary. Built-in ones include Explore (fast, read-only search) and Plan (research during plan mode). Custom ones live in .claude/agents/ (or ~/.claude/agents/) as markdown files with a name, description, tool list and prompt, managed with /agents. They don't inherit the main history or its skills, so a custom subagent must list the skills it needs.",
          "Skills live in .claude/skills/<name>/SKILL.md (or ~/.claude/skills/ for personal ones). Only the name and description load at start; the body loads when a request matches or you type /name. Plugins bundle skills, subagents, hooks and MCP servers behind one manifest. Add a marketplace with /plugin marketplace add, install from it with /plugin, and expect plugin commands to be namespaced (/plugin-name:command). A plugin deployed at managed scope can't be overridden by users.",
          "Headless mode runs Claude Code without the interactive interface: claude -p 'run the tests and summarise failures' prints the result and exits. --output-format chooses text (the default), json (one result object with cost and session id) or stream-json (one JSON event per line as the run progresses: the streaming mode that scripts and dashboards read live); --input-format stream-json streams input in. Permissions come from settings or --allowedTools, never from a person at a prompt. The Agent SDK exposes the same engine in code."
        ],
        tables: [
          {
            cap: "Where project knowledge belongs",
            h: ["Mechanism", "Loads", "Context cost", "Belongs here"],
            r: [
              ["CLAUDE.md", "Every session, unconditionally", "Fixed, grows with size", "Universal constraints, commands, framework decisions"],
              ["Rules file (with paths)", "Only when working on matching files", "Only when triggered", "Path-specific guidance"],
              ["Hook", "Runs at its event; adds no context", "Minimal", "Enforced guardrails, side effects, audit logs"],
              ["Subagent", "Its own isolated context", "Returns a summary only", "Exploration and parallel tasks that would bloat the main context"],
              ["Skill", "Name and description at start; body on match", "Low until used", "Task-specific procedures used sometimes"]
            ]
          },
          {
            cap: "Settings levels",
            h: ["Level", "File", "Applies to"],
            r: [
              ["Managed (enterprise)", "managed settings, admin-deployed", "Everyone; cannot be overridden"],
              ["Project", ".claude/settings.json (committed)", "Everyone who clones the repo"],
              ["Local", ".claude/settings.local.json (git-ignored)", "You, in this project"],
              ["User", "~/.claude/settings.json", "You, in every project"]
            ]
          }
        ],
        know: [
          "Team-wide permissions, model defaults and environment behaviour → project settings.json, committed.",
          "Shared standards and project context → CLAUDE.md at the repo root after /init.",
          "Duplicate CLAUDE.md content across repos → use the hierarchy instead.",
          "Team skill with instructions and scripts → a recognised skills directory, discoverable in sessions.",
          "CI → headless mode, scoped permissions in settings.json, captured output.",
          "Place the human gate by worst-case cost: cheap reversible actions run; hard-to-undo or sensitive actions are gated; sensitive code is never reviewed by the agent alone.",
          "Unrelated next task → /clear. Long task near the limit → /compact, saying what to keep. Pick up yesterday's work → claude --continue or --resume.",
          "Personal overrides → .claude/settings.local.json (git-ignored). Org-wide, unoverridable → managed settings.",
          "dontAsk denies whatever isn't pre-allowed; auto lets a classifier decide routine approvals; bypassPermissions only in a sandbox.",
          "Live progress from a CI run → claude -p with --output-format stream-json; a single result → json.",
          "Codebase modernisation: plan mode first, CLAUDE.md carrying the target patterns, hooks guarding paths, a PostToolUse audit log, and a named approver per phase."
        ],
        build: ["Build: ep07-guard-hook", REPO + "ep07-guard-hook"],
        traps: [
          { move: "Each developer sets project permissions with environment variables", why: "No consistency. Use the project-level settings.json committed with the repo." },
          { move: "Put the coding standards in the README and point developers at it", why: "Claude Code does not load the README automatically. Use CLAUDE.md." },
          { move: "Paste the skill as a long instruction at the top of every CLAUDE.md", why: "It loads every session and bloats context. Put it in the skills directory to load on demand." },
          { move: "Disable confirmation prompts globally so the pipeline never stalls", why: "That removes the gates everywhere. Run headless with scoped permissions for the pipeline." },
          { move: "Have a developer approve each prompt while the CI job runs interactively", why: "That defeats automation. Headless mode with pre-approved permissions." },
          { move: "Make one repo's CLAUDE.md the central source and link to it from the rest", why: "Linking doesn't scope. Use broad and project-level CLAUDE.md files in a hierarchy." },
          { move: "Commit defaultMode bypassPermissions in project settings so the team stops seeing prompts", why: "Every clone loses its gates. Allow-list the safe commands and keep bypass for isolated sandboxes." },
          { move: "Keep one long session for every task so Claude remembers everything", why: "Stale context from old tasks dilutes the new one. /clear between unrelated tasks; compact long ones." },
          { move: "Write the procedure as a custom subagent and assume it can use the team's skills", why: "Subagents don't inherit skills. List the skills it needs, or keep it as a skill." }
        ]
      }
    ],
    remember: [
      "Explore, plan, code; plan mode for the unfamiliar.",
      "Managed > project > local > user. Deny > ask > allow.",
      "CLAUDE.md small; rules scoped; skills on demand.",
      "Hooks enforce; headless for CI."
    ]
  },

  /* ================================================================ D4 */
  {
    id: "d4", code: "D4", title: "Eval, testing and debugging", w: 2.6, eps: "EP 09", t: 8,
    summary: "Identifying the error type, choosing a recovery strategy, reading traces to find the failure mode, and telling an integration fault from a model-output fault. Evals and test levels support all of it.",
    links: [
      ["▶", "Watch EP 09 (9 min)", YT + "4vvEK4fWEXw"],
      ["⌨", "Build: ep09-failure-checker (no key)", REPO + "ep09-failure-checker"],
      ["❓", "PRACTICE.md (EP 09)", BLOB + "ep09-failure-checker/PRACTICE.md"]
    ],
    highlights: [
      "Small weight (2.6%), but 'what do you do first' questions in every domain reward the same habit: look at the traces.",
      "Retriable (wait and retry would work) versus terminal (fix the request): decide per error.",
      "A refusal is a success code with a refusal stop reason. Never retry it silently.",
      "Tool failures go back to Claude with is_error set to true, never as an empty result."
    ],
    subs: [
      {
        title: "Debugging and error handling", w: 2.6,
        short: "When something fails, first ask whether the same request could succeed later: retriable errors (429, 529, 5xx, timeouts) get backoff, terminal ones (400, 401, 403, 404, refusals) get fixed. Then read the trace to see whether the bad value came from your integration code or from the model's output, and prove the fix with an eval.",
        terms: [
          ["retriable vs terminal", "an error that may succeed if repeated later (rate limit, overload) versus one that fails the same way until the request changes"],
          ["exponential backoff with jitter", "waiting longer after each failed attempt, with a random offset so many clients don't retry in step"],
          ["retry-after", "a response header on 429 and 529 saying how long to wait before trying again"],
          ["is_error", "the flag on a tool_result telling Claude the tool failed, so it can retry, change approach or stop"],
          ["trace", "the recorded steps of one run: prompts, tool calls, intermediate outputs, timings, stop_reason"],
          ["failure mode", "the named kind of failure: hallucination, lost context, injection, format drift, refusal, truncation, integration fault"],
          ["eval", "a set of cases, the expected behaviour and a grader, run to define and check 'done'"],
          ["LLM judge", "a model call that grades open-ended output against a rubric; calibrate it against human labels"]
        ],
        scope: "Identifying error types, choosing recovery strategies, trace analysis to find failure modes, and isolating whether a problem comes from the integration layer or the model's output.",
        lesson: [
          "Every failure starts with one question: would waiting and sending the identical request again plausibly work? If yes it is retriable (429 rate limit, 529 overloaded, 500, 502, 503, 504, timeouts, dropped streams). If no it is terminal (400 bad request, 401, 403, 404); retrying wastes time and budget. Repeated timeouts on expensive requests mean fix the request, not retry it.",
          "The SDK already retries transient failures with progressive delays, up to a configurable number of attempts. Know that before adding your own loop: two loops wrapped round the same call multiply retries, so choose one owner. Honour the retry-after header that 429 and 529 responses carry; it is more precise than guessing. A 529 reflects Anthropic-side load, not your rate limit. When unsure whether an error is retriable, treat it as terminal.",
          "Rate limits are set per organisation (requests, input tokens and output tokens per minute), and response headers report what is left and when it resets. Design to stay under them at peak: smooth or queue traffic and back off exponentially when you hit them. Streaming a response or bundling payloads does not raise a limit.",
          "When a tool fails, return a tool_result with is_error set to true and a useful message. The model can then retry, change approach, ask or stop. An empty result is read as valid data and the agent carries on confidently on a false premise.",
          "Traces record each step of a run: the prompt, tool calls, intermediate outputs, timings and stop reason. They turn 'the case failed' into 'step four, the parser, raised a KeyError on a field the model did not return'. Compare a good run with a bad run, then name the failure mode before choosing a fix: model hallucination, lost context, prompt injection, format drift, a refusal trigger, a truncation, or a fault in your own integration.",
          "Isolating the origin: integration layer or model output? Take the exact request your code sent (from the trace) and the raw response that came back. If the raw response was right and the user still saw something wrong, the fault is in your code: parsing, history assembly, a truncated tool result, a mismatched tool_use_id, a dropped stream. If the raw response was already wrong, it is the model's output given that context: check the prompt, what context was really present and stop_reason (a max_tokens truncation looks like a model fault but is a limit you set), then the model choice. Replaying the logged request on its own, in a script or the Console, separates the two quickly.",
          "Format drift is a named failure mode: output keeps its format early in a session and loses it as the history grows. Look at how the context grows turn by turn, then fix it with context management (compaction, restating the format) or with schema validation and structured outputs, not by truncating replies, restarting every turn or swapping the model.",
          "Evals define done: a set of cases, expected behaviour and a grader. Exact match for single correct answers (cheap, brittle). Code checks for structure (valid JSON, fields present, values in range). An LLM judge for open-ended quality, asked for strengths, weaknesses and reasoning before the score; without that reasoning step a judge tends to cluster around a middling score. Calibrate the judge by measuring its agreement with human-labelled cases; if agreement is low, define what each score means and add good and bad examples.",
          "Coverage beats perfection: twenty varied cases with slightly noisy grading beat three perfect ones, and Claude can draft more cases from a labelled seed set if you spot-check them. Low first scores are normal. Change one thing at a time and read results per case, because a steady average can hide three fixes and three new breaks. Map failures to causes: format failures point at the output instructions, factual errors on retrieved content at retrieval, failures only on long inputs at context handling. Run cheap code checks on every commit and the judge (one extra call per case) on a schedule.",
          "Test levels each see a different break: unit (one function), functional (one Claude call's shape), integration (the hand-off between two components, where silent failures hide) and end-to-end (the whole flow, which shows that something broke but not where)."
        ],
        tables: [
          {
            cap: "Error handling by type",
            h: ["Error", "Retry?", "Strategy", "Fallback"],
            r: [
              ["429 rate limit", "Retriable", "Exponential backoff with jitter, honour retry-after, cap attempts", "Clean error or a cached or simpler result"],
              ["529 overloaded", "Retriable", "Backoff; it's Anthropic-side load", "Fail over or return a graceful error"],
              ["400 bad request", "Fail fast", "No retry; it fails identically", "Fix or reject the input, surface the error"],
              ["Tool error", "Depends on cause", "Retry only if transient", "Return is_error to Claude; never silence it"],
              ["Refusal (200, stop_reason refusal)", "Fail fast", "No retry; it's a content decision", "Raise to the caller and log it"]
            ]
          },
          {
            cap: "Choosing a grader",
            h: ["Output shape", "Grader", "Catches", "Weak at"],
            r: [
              ["One correct label or value", "Exact match", "Wrong answers, near-zero cost", "Every valid paraphrase fails"],
              ["Structured or code output", "Code check", "Invalid JSON, missing fields, out-of-range values", "Says nothing about quality"],
              ["Open-ended quality", "LLM judge (calibrated)", "Faithfulness, completeness, tone", "Noisy and costly until calibrated"]
            ]
          }
        ],
        code: { cap: "Returning a tool failure to Claude", text: "def run_tool(tool_use):\n    try:\n        result = execute(tool_use)\n        return {\"type\": \"tool_result\", \"tool_use_id\": tool_use.id, \"content\": result}\n    except Exception as e:\n        # surface the error so Claude can react; never return an empty result\n        return {\"type\": \"tool_result\", \"tool_use_id\": tool_use.id,\n                \"is_error\": True, \"content\": f\"Tool failed: {e}\"}" },
        know: [
          "First step for refusals, odd outputs or 'hallucinations': examine the traces of the failing requests.",
          "Inconsistent outputs for similar inputs: capture full traces (input, system prompt, messages, output, parameters) and compare consistent with inconsistent runs.",
          "Rate limits: know them, design to stay under them at peak, back off exponentially when hit.",
          "Error routing: categorise by impact and recoverability; page for outages, log the rest.",
          "Validation failures are a recognised error path with retry, repair or fallback.",
          "Integration fault or model fault? The trace shows which step produced the bad value.",
          "Replay the logged request: right raw response → your integration code; wrong raw response → prompt, context or model.",
          "Format drift over a long session → name it, then manage context or validate output.",
          "Retries have one owner: the SDK's built-in retries or your loop, not both.",
          "Judge: reasoning before the score, calibrated against human labels, run on a schedule; code checks on every commit."
        ],
        build: ["Build: ep09-failure-checker", REPO + "ep09-failure-checker"],
        traps: [
          { move: "Remove or tweak the suspect instructions and see if the refusals stop", why: "That guesses before diagnosing. Examine traces of the refused requests to find the trigger." },
          { move: "It's hallucinating, so move to a bigger model", why: "It may be lost context or injection. Read the traces first." },
          { move: "Lower the temperature and re-run the inconsistent inputs", why: "Skips root cause. Capture full traces and compare good and bad runs." },
          { move: "Retry the same request until valid JSON appears", why: "Blind retries add latency with no guarantee. Validate and use a defined retry or fallback path." },
          { move: "Page on every error so nothing is missed", why: "Alert fatigue hides the real outage. Route by severity." },
          { move: "Treat inconsistency as normal non-determinism and document it", why: "Variation is expected; persistent inconsistency on similar inputs is a bug to trace." },
          { move: "Move peak traffic to streaming or bundle payloads to get round rate limits", why: "Neither raises the limit. Know the limits, design under them at peak, back off exponentially." },
          { move: "Add RAG grounding before reading the traces", why: "A fix for an undiagnosed cause. Traces first." },
          { move: "Truncate each reply, restart every turn or try a smaller model to stop format drift", why: "None targets the cause. Name the failure mode, then manage context or validate output." },
          { move: "Wrap your own retry loop round the SDK's default retries", why: "Two loops multiply attempts against an overloaded service. Pick one owner and configure it." }
        ]
      }
    ],
    remember: [
      "Traces before theories.",
      "Retriable or terminal; honour retry-after.",
      "is_error back to Claude.",
      "Grader matches the output shape."
    ]
  },

  /* ================================================================ D5 */
  {
    id: "d5", code: "D5", title: "Model selection and optimisation", w: 16.8, eps: "EP 01, EP 03", t: 0,
    summary: "How LLMs behave (tokens, context, sampling, reasoning modes, prompting modes), the technical substrate (SDKs over REST, sync, streaming, async, WebSockets), choosing a model tier, and keeping token cost in budget.",
    links: [
      ["▶", "Watch EP 01 (8 min)", YT + "Vm1Gmjkb3fM"],
      ["▶", "Watch EP 03 (9 min)", YT + "iMBVThGLJi0"],
      ["⌨", "Build: ep01-models (Python)", REPO + "ep01-models"]
    ],
    highlights: [
      "Second-largest domain (16.8%).",
      "Model choice and reasoning mode are separate decisions: which model runs, and whether it thinks first.",
      "Start on the balanced default; move up or down a tier only when your own eval says so.",
      "Measure tokens per feature before cutting cost; cache the stable prefix, never the answer."
    ],
    subs: [
      {
        title: "LLM fundamentals", w: 5.2,
        short: "An LLM generates text one token at a time by sampling from a probability distribution, inside a fixed context window, so the same prompt can produce different correct wordings. Model options (extended or adaptive thinking, effort levels, fast mode) change how it works on a request; zero-, one- and multi-shot prompts change what it sees.",
        terms: [
          ["token", "the unit the model reads, writes and bills; a word may be one token or several, and the ratio changes between tokenisers"],
          ["context window", "the fixed token budget for everything in one request: system prompt, history, tools, tool results and the reply"],
          ["next-token generation", "the model scores every possible next token, picks one, appends it and repeats, each step conditioned on all before it"],
          ["sampling and non-determinism", "the next token is drawn from a distribution, so the same input can give different text; temperature (where a model accepts it) sharpens or flattens the distribution"],
          ["extended thinking", "the feature that lets Claude reason in thinking blocks before answering; thinking tokens bill as output tokens"],
          ["adaptive thinking / effort", "on current models Claude decides how much to think; the effort level tunes depth against cost and latency"],
          ["fast mode", "speed: \"fast\" on a supported Opus model: up to 2.5x the output tokens per second at a premium price; same model, same reasoning"],
          ["zero-, one-, multi-shot", "prompting with no examples, one example, or several examples of input and desired output"]
        ],
        scope: "Tokens, context windows, sampling, non-determinism and next-token generation; model options (fast mode, extended thinking, adaptive thinking, effort levels); zero-shot, single-shot and multi-shot prompting.",
        lesson: [
          "Claude reads and writes tokens, not characters or words. The characters-per-token ratio depends on the model's tokeniser and changes between generations, so count with the API (the count_tokens endpoint), not a rule of thumb. Everything is counted: system prompt, history, tool definitions, tool results and the reply. Tokens are the unit of price and of the context budget.",
          "The context window is one fixed budget for everything in a request, including the output. Input already larger than the window is rejected with a validation error before generation. Input that fits can still hit the ceiling during generation; current models then stop and return what they have with stop_reason model_context_window_exceeded.",
          "Generation is next-token prediction, one token at a time. The model scores every possible next token, samples one, appends it and repeats, each step conditioned on everything before it. That is why output streams, why the model can't revise a token it has already written, and why everything in the context shapes every step.",
          "Temperature shapes the distribution: lower is more repeatable, higher more varied. Per the course, the newest models reject non-default temperature, top_p or top_k with an error, so behaviour is steered through the prompt instead; where temperature is accepted, 0 makes output more repeatable but does not guarantee identical text. Pinning a model snapshot doesn't remove sampling variation either. Because output is sampled, the same prompt can give different wording when both answers are correct. That is generation, not a bug in your request code, and it is why tests assert properties (a field is present, a value is in range, the output parses) and use a judge for meaning, not exact text.",
          "Choosing a model and choosing whether it reasons are independent levers. Extended thinking is the feature: Claude reasons in thinking blocks before it answers. On current models it runs as adaptive thinking: the model decides how much to think, and you tune depth with an effort level (from low upwards; the levels available vary by model). The older fixed budget_tokens control is deprecated and returns an error on the newest models. Some models think adaptively by default, others only when you turn thinking on. Exam items may say 'extended thinking' or 'adaptive thinking'; both mean letting the model reason before it answers.",
          "Thinking tokens bill like output tokens, so enable reasoning for multi-step work (derivations, multi-hop logic, planning dependent actions, weighing competing hypotheses) and leave it off or low for lookups, classification and format conversion. Set effort to the problem rather than to maximum on every call.",
          "Fast mode is a different lever. On supported models it generates output tokens noticeably faster at a premium price. It is the same model with the same reasoning, so it answers 'we need this quicker', not 'we need this smarter' or 'cheaper'. You opt in per request with speed set to fast; it works only on supported Opus models (generally available on the newest, research preview on some older ones as of November 2026), it is not available through the Batch API, and switching speeds misses the prompt cache. Check the model list on the day.",
          "Zero-shot gives instructions only; one-shot adds one input-output example; multi-shot (few-shot) adds several. Examples sit in the prompt (they are not training data) and show the exact shape a description fails to pin down; one or two correct examples often fix a format faster than another paragraph. Each costs tokens on every call. A more capable model may succeed zero-shot where a smaller one needs examples, so decide model and examples together."
        ],
        tables: [{
          cap: "When to turn reasoning on",
          h: ["Task shape", "Thinking", "Why"],
          r: [
            ["Multi-step reasoning holding several constraints", "On, effort matched to depth", "The reasoning pass works through dependencies the model would otherwise skip"],
            ["Lookup, classification, format conversion, one-field extraction", "Off", "Pays for reasoning that doesn't change the answer"],
            ["Agentic loop planning across several tool calls", "On, budgeted for the planning step", "Planning is where the depth matters"]
          ]
        }],
        know: [
          "Same prompt, different text: explain sampling, then how the app copes (validation, retries, property-based tests, temperature where supported).",
          "Temperature controls randomness; it has nothing to do with context capacity, cost or accuracy.",
          "Context-window errors → summarise, chunk or prune.",
          "Labelled examples you already have → put them in the prompt as few-shot examples.",
          "In tool loops, thinking blocks (and redacted thinking blocks) go back to the API exactly as received, or the next request fails.",
          "Extended thinking = the feature; adaptive thinking + effort = how current models control it; budget_tokens = the deprecated older control.",
          "Fast mode = same model, faster output, higher price. Not a reasoning lever and not a cost saving.",
          "Pinning a snapshot doesn't stop sampling variation; even temperature 0 isn't a guarantee of identical text."
        ],
        build: ["Build: ep01-models", REPO + "ep01-models"],
        traps: [
          { move: "The output varies run to run, so the request construction has a bug", why: "Token-by-token sampling varies the wording. That's how generation works, not a request bug." },
          { move: "The variation comes from network latency, or from Claude being updated continuously", why: "Neither. It's sampling. Explain it and show how the app validates and retries." },
          { move: "Raise the temperature (and max_tokens) to fix context-window limits", why: "Temperature is about randomness, not capacity. Summarise or chunk the input." },
          { move: "Fine-tune a custom model on the handful of edge-case examples", why: "Disproportionate. Put the labelled examples in the prompt as few-shot examples." },
          { move: "Store the examples in a database for the model to find at inference", why: "The model only uses what's in its context. Without retrieval wired in it never sees them." },
          { move: "Use fast mode or a smaller model for multi-step clinical reasoning", why: "Fast mode buys output speed, not depth, and a smaller model may lack the reasoning. Turn on extended (adaptive) thinking with effort matched to the task." },
          { move: "Pin the model snapshot so the wording stops varying", why: "Pinning fixes the model, not the sampling. Assert properties, validate and retry instead." },
          { move: "Set the highest effort on every call to be safe", why: "Thinking tokens bill as output and add latency. Match effort to the task." }
        ]
      },
      {
        title: "Technical fundamentals", w: 6.1,
        short: "The official SDKs are a thin layer over Claude's REST API that handle auth, retries and parsing, so use them through their documented patterns. Pick the call shape by who is waiting (sync, streamed, async, batch), and use a WebSocket only when you need a persistent, two-way, real-time link.",
        terms: [
          ["SDK", "Anthropic's client library (Python, TypeScript and others) wrapping the REST API: auth, request building, typed responses, retries"],
          ["REST", "request and response over HTTP: method, URL, headers, JSON body, status code"],
          ["synchronous call", "send the request and wait for the complete reply"],
          ["streaming (SSE)", "the reply arrives as server-sent events while it is generated; one-way, server to client, over HTTP"],
          ["asynchronous client", "AsyncAnthropic in Python, or the promise-based TypeScript client: a call in flight doesn't block other work"],
          ["WebSocket", "a persistent, full-duplex connection opened by an HTTP upgrade; either side can send at any time"],
          ["max_retries / timeout", "SDK client options controlling how often transient errors are retried and how long a call may take"]
        ],
        scope: "Engineering practices that support AI applications, including SDKs that wrap REST APIs, and WebSockets.",
        lesson: [
          "Claude is reached over an HTTP REST API: your code sends a JSON body with your key to an endpoint and reads JSON back. The official SDKs (Python, TypeScript and others) are a thin layer over the same API that handle authentication, request building, retries and response parsing. Same API, same model, less boilerplate. Use the SDK through its documented patterns unless you have a specific reason not to.",
          "Three response shapes. Synchronous: send and wait for the whole reply; fine for short responses and back-end jobs. Streaming: the reply arrives as server-sent events while it's generated, so a watching user sees text immediately. Asynchronous: Python's AsyncAnthropic (or awaiting TypeScript's promise-based client) lets your app do other work while calls are in flight; it is still a realtime call, just non-blocking. The Message Batches API is a separate pattern for bulk offline work.",
          "The SDK retries many transient errors by default with backoff; the number of retries and the timeouts are configurable. Tune or extend that behaviour rather than wrapping a second retry loop round it.",
          "WebSockets versus SSE. Claude's API streams with server-sent events: one-way, from server to client, over ordinary HTTP. A WebSocket is a single long-lived connection, opened with an HTTP upgrade, over which both sides send messages whenever they like. Use one for a persistent, bidirectional, real-time link: a browser chat that can interrupt or steer a run, a voice or collaborative front end, or a service that pushes updates continuously. A common shape is a WebSocket between the browser and your server, and SSE streaming between your server and Claude. Repeated short HTTP polls, an HTTP request held open without framing, or polling files on disk are all poorer fits.",
          "The SDKs also save you code you'd otherwise write: typed errors (rate limit, overloaded, bad request) you can catch by class, stream helpers that assemble events into a final message, token counting, and a tool runner that executes the tool loop for you (beta). Check what your SDK version offers before building it yourself."
        ],
        know: [
          "SDK = auth, retries, parsing, over REST. Raw HTTP is extra work, not extra capability.",
          "Sync for short jobs, streaming when a person watches, async for concurrency, batches for bulk offline.",
          "SDK default retries cover many transient errors and are configurable.",
          "Persistent bidirectional real-time link → WebSocket.",
          "Python application → the Claude Python SDK, not shelling out or another provider's SDK.",
          "Show text as it's generated → streaming; it cuts time to first text, not total time.",
          "SSE is one-way (how Claude streams); a WebSocket is two-way and persistent (often browser ↔ your server)."
        ],
        build: ["Build: ep03-messages", REPO + "ep03-messages"],
        traps: [
          { move: "Call the REST API with raw HTTP to avoid the SDK's abstraction", why: "You re-implement auth, retries and parsing for nothing." },
          { move: "Use another provider's SDK and translate responses, for future portability", why: "Fragile translation for portability nobody asked for." },
          { move: "The SDK retries a fixed number of times and you can't change it", why: "Retries are on by default and configurable." },
          { move: "The SDK retries network errors but leaves rate limits entirely to you", why: "Default retries cover many transient errors; tune them rather than assume nothing happens." },
          { move: "Poll the streaming service with short-lived HTTP requests", why: "A persistent bidirectional connection is what WebSockets are for." },
          { move: "Use structured output, the Batch API or prompt caching to show text as it arrives", why: "Only streaming delivers tokens progressively. Caching changes cost; batches add delay." }
        ]
      },
      {
        title: "Model selection and tradeoffs", w: 2.7,
        short: "Start on Sonnet, the balanced default, and move up to Opus (or the top tier) or down to Haiku only when your own eval says so, fitting quality, latency and cost together. Check which features each model supports, such as adaptive thinking, and treat every upgrade as a change that can break behaviour.",
        terms: [
          ["model tier", "the capability and price level: Haiku (fast, cheap), Sonnet (balanced default), Opus (demanding work), plus any top tier the docs list"],
          ["quality / latency / cost", "the three parameters every model choice trades; they interact, so fit them together"],
          ["routing", "choosing the model per request from a cheap signal (task type, length, difficulty)"],
          ["model snapshot", "a fixed, dated version of a model; behaviour can change between snapshots"],
          ["breaking behaviour change", "a new release changing something your app depends on: output format, a removed parameter, a new stop_reason, token counts"],
          ["feature flag", "a switch that turns the new model on for some traffic and off again without a deploy"]
        ],
        scope: "Model capabilities (Opus, Sonnet and Haiku use cases, adaptive thinking support), trade-offs across quality, latency and cost, and breaking behaviour changes between model releases.",
        lesson: [
          "The course describes four tiers: Fable (most capable, for the hardest reasoning, coding and agentic work), Opus (demanding work above Sonnet), Sonnet (the balanced default for most production work) and Haiku (speed and cost efficiency for tasks within its range). Confirm the current line-up and prices in the docs on the day.",
          "Typical use cases. Haiku: high-volume classification, extraction, routing, simple subagent tasks and real-time chat where latency dominates. Sonnet: most production work, including coding and agents. Opus (and any tier above it): the hardest multi-step reasoning and long agentic tasks, where a wrong answer is costly. Capabilities differ by model, not just quality: check per model whether it supports adaptive thinking and which effort levels, its context window and output limit, vision, and which parameters it accepts.",
          "Start on Sonnet. Move up only when an eval shows the current tier missing your quality bar on the hardest cases and a wrong answer is costly. Move down only when an eval shows the cheaper tier holding the bar on the bulk of traffic. Quality, latency and cost interact, and a bigger model can even be cheaper if it finishes in fewer tokens. Fit all three together rather than optimising one first and checking the others later.",
          "Routing: a default model with an override chosen from a cheap signal (task type, input length, a difficulty classification). Uniform traffic at one quality bar doesn't need a router; pin one model.",
          "New releases can change behaviour your app depends on. Breaking changes come in several forms: a parameter that now returns an error (budget_tokens, or non-default sampling on the newest models), a new stop_reason your code doesn't handle, a tokeniser change that shifts token counts and cost, and changes in verbosity or output format. Adapt the prompts to the new model, re-run the eval against what the downstream parser expects, and roll out behind a feature flag with a per-workflow way back. Upgrade only once the regression is gone, not because the headline gain outweighs it."
        ],
        know: [
          "High-volume, simple, latency- and cost-sensitive classification → a smaller, faster model.",
          "No targets given ('use whatever gives the best results') → ask for quality, latency and cost targets first.",
          "Model changes are promoted on a measured eval, in both directions.",
          "Breaking format change on upgrade → adapt prompts, re-evaluate, flag-gated rollout with revert.",
          "Check support per model (adaptive thinking, effort levels, window, parameters) before choosing it.",
          "Haiku for volume and speed, Sonnet as the default, Opus for the hardest, costliest-to-get-wrong work."
        ],
        build: ["Build: ep01-models", REPO + "ep01-models"],
        traps: [
          { move: "Pick the largest model because 'best results' means highest quality", why: "No targets, no basis. Get quality, latency and cost targets, then choose." },
          { move: "Run every model on a generic benchmark and take the winner", why: "A generic benchmark isn't your workload or your trade-offs." },
          { move: "Default to a mid-tier model because it suits most tasks", why: "A default skips the decision the task needs." },
          { move: "Upgrade now: an 8% reasoning gain outweighs 3% malformed output", why: "That ships a known regression. Adapt the prompt and re-evaluate first." },
          { move: "Upgrade and add a downstream check to catch the malformed share", why: "Still ships the regression and pushes the cost downstream." },
          { move: "Stay on the old model permanently to avoid format changes", why: "Freezing forfeits the gains and every future release. Adapt and re-validate." },
          { move: "Swap the model id and fix parsing failures as they surface", why: "Users find your regressions. Constrain the format, re-evaluate, ship behind a flag." },
          { move: "Meet the latency target first and check quality afterwards", why: "The three interact. Fit quality, latency and cost together." },
          { move: "Rewrite the downstream parsers to accept any format the new model produces", why: "Costly and fragile. Constrain the prompt, re-evaluate, ship behind a flag." },
          { move: "Chain several models on each simple classification for accuracy", why: "Adds cost and latency to a simple task. Use a smaller, faster model that clears the bar." }
        ]
      },
      {
        title: "Cost and token management", w: 2.8,
        short: "Measure tokens per feature first, model cost from volume and separate input and output prices, then cut the bill with prompt caching: put the stable prefix first and mark cache checkpoints (cache_control breakpoints) so repeat requests read it back cheaply.",
        terms: [
          ["usage block", "the token counts on every response: input_tokens, output_tokens, cache_creation_input_tokens, cache_read_input_tokens"],
          ["cost model", "volume × (input tokens × input price + output tokens × output price), adjusted for caching and batch discounts"],
          ["prompt caching", "storing the processed form of a request's stable prefix so later requests that start the same way read it cheaply"],
          ["cache breakpoint / checkpoint", "a cache_control marker on a block; everything up to and including it is cached as a prefix (up to four per request)"],
          ["TTL", "how long a cache entry lives: five minutes by default, refreshed on each hit, or one hour at a higher write price"],
          ["cache write vs read", "the first request pays a premium to write the cache; later hits pay a small fraction of the input price"],
          ["reliability floor", "the latency ceiling and retry budget you must hold before optimising for cost"]
        ],
        scope: "Token budgeting and cost management: token usage tracking, cost modelling, and caching techniques (prompt caching, cache checkpointing).",
        lesson: [
          "Instrument every call with three metrics: input and output tokens, latency and error rate, aggregated per request and per feature. A cost spike then becomes 'which step on which request type' instead of 'why is the bill high'. Untracked cost growth starts with adding per-feature tracking, not with uniform cuts.",
          "A cost projection combines request volume, average input tokens, average output tokens, the chosen model's prices (output is typically priced higher than input) and any caching saving. Borrowing another app's per-request average, or leaving output tokens out, makes it unreliable.",
          "Prompt caching stores the processing of a stable prefix so later requests that start identically read it back cheaply. Requests are processed in a fixed order (tools, then system prompt, then messages), so put stable content first and changing user input last. The prefix must match exactly: one changed character, a timestamp or a reordered tool list invalidates everything after it.",
          "Cache checkpointing is how you mark what to cache. A cache_control breakpoint (type ephemeral) on a block caches everything up to and including that block, and you can set up to four. Typical places: after the tool definitions (tools cached, messages stay dynamic), after the system prompt and reference documents, and on the latest message of a long conversation so each turn reuses the turns before it. Automatic caching (a single top-level setting where available) moves that last breakpoint forward for you. A request only looks back a limited number of blocks (about 20) for an earlier cache hit, so very long conversations need an intermediate breakpoint.",
          "There is a minimum cacheable length, and it varies by model: 512 tokens on the current Claude 5 family, 1,024 to 4,096 on some earlier models (docs as of November 2026). A shorter prefix is simply not cached, with no error. The default lifetime is five minutes, refreshed free on each hit, or one hour with ttl set to 1h; writes cost 1.25x (five minutes) or 2x (one hour) the base input price, and reads 0.1x on most models (cheaper still on the newest ones). An expired cache means paying the write again for nothing, and a cached prefix may be stale for as long as it lives. Prove it works from the usage block: cache_creation_input_tokens on the first call, cache_read_input_tokens on later ones. If reads stay at zero, something before the breakpoint is changing, or the prefix is under the minimum.",
          "Other levers: model tier, prompt and context size, number of tool calls, streamed versus batched. Batching and caching compound for scheduled jobs that reuse a long fixed prefix. Orchestrator-worker fan-out multiplies tokens. Set a reliability floor first (latency ceiling, retry budget) and tune cost above it."
        ],
        tables: [{
          cap: "Does caching help this workload?",
          h: ["Property", "Helps when", "Doesn't help when"],
          r: [
            ["Identical prefix", "System prompt, tools and reference documents are fixed", "Anything before the breakpoint changes per request"],
            ["Recurs soon", "The same prefix is reused several times a minute", "It's reused once an hour on the five-minute lifetime"],
            ["Long enough", "A long fixed system prompt or document", "The prompt is below the model's minimum"]
          ]
        }],
        know: [
          "Track tokens per feature before recommending changes.",
          "Cost model: volume × (input tokens × input price + output tokens × output price), minus cache savings.",
          "Cache the static parts (system prompt, instructions, shared context), not the model's output and not the user's changing input.",
          "Multi-turn chats: caching the stable earlier context means each turn pays full price only for what's new.",
          "Pruning reduces volume; caching reduces the cost of repeated tokens. Different problems.",
          "Cache checkpoint = a cache_control breakpoint; up to four; place each after a stable section.",
          "Caching works if cache_read_input_tokens is above zero on repeat calls.",
          "Per-call instrumentation often shows one step driving most of the spend; fix that step first."
        ],
        build: ["Build: ep01-models", REPO + "ep01-models"],
        traps: [
          { move: "Cut token usage by half evenly across all features", why: "Blind cuts hit features that need their tokens. Measure per feature first." },
          { move: "Switch every feature to the smallest model", why: "Cuts quality where it's needed. Find the costly features first." },
          { move: "Cost growth is unavoidable at scale; there's no point investigating", why: "Per-feature tracking usually finds a lever." },
          { move: "Cache the model's output so similar queries skip the call", why: "That's a response cache with its own staleness risk. Prompt caching reuses the input prefix." },
          { move: "Leave output tokens out of the projection", why: "Output is usually priced higher per token. Model both." },
          { move: "Move every chat turn to the Batch API to cut cost", why: "Batches can take hours and users are waiting. Cache the static context instead." },
          { move: "Summarise after every turn, or keep only the last two messages, to cut multi-turn cost", why: "Loses fidelity or continuity. Cache the stable earlier context instead." },
          { move: "Put the current timestamp at the start of the system prompt for freshness", why: "It changes every request, so nothing after it ever caches. Put changing content after the breakpoint." },
          { move: "Input and output cost the same per token, so use one blended rate", why: "Output is usually dearer. A blended rate understates the cost." }
        ]
      }
    ],
    remember: [
      "Tokens are the unit of price and budget.",
      "Model choice ≠ reasoning mode.",
      "Default tier; move only on an eval.",
      "Measure per feature; cache the stable prefix."
    ]
  },

  /* ================================================================ D6 */
  {
    id: "d6", code: "D6", title: "Prompt and context engineering", w: 11.0, eps: "EP 04", t: 3,
    summary: "Managing what stays in the context window over long tasks, writing prompts that hold their shape, and producing, validating and consuming output safely.",
    links: [
      ["▶", "Watch EP 04 (8 min)", YT + "HS6K4A7Gl5o"],
      ["⌨", "Build: ep04-prompting (Python)", REPO + "ep04-prompting"],
      ["❓", "PRACTICE.md (EP 04)", BLOB + "ep04-prompting/PRACTICE.md"]
    ],
    highlights: [
      "Prompt engineering shapes one request; context engineering manages what stays visible across many turns and steps.",
      "Name the failure, add the one technique that fixes it: wrong shape → output constraint; drift → system prompt; invented structure → examples.",
      "A bigger window never fixes buried information. Prune, compact, isolate, clear.",
      "Confident output is not verified output. Validate, then parse defensively."
    ],
    subs: [
      {
        title: "Context engineering", w: 3.8,
        short: "Context engineering decides what stays in the window across many turns and steps: prune tool outputs nobody needs, compact old history into a summary, isolate subtasks in subagents, and clear when starting over. Prompt engineering shapes one request; context engineering manages state across all of them.",
        terms: [
          ["context drift", "after many turns the model over-weights stale content or loses early constraints"],
          ["context bloat", "the window filling with tool outputs and history that no longer help, raising cost and burying what matters"],
          ["tool-output pruning", "removing old tool results that later steps don't need (the API's context editing can clear them automatically; beta)"],
          ["compaction", "summarising older history into fewer tokens while keeping task-critical state (/compact, or server-side compaction in the API; beta)"],
          ["context isolation", "running a subtask in its own window (a subagent or a separate workflow step) and passing back only its result"],
          ["RAG", "retrieval-augmented generation: fetch only the relevant slice (from an index or by agentic search) and put it in the prompt"],
          ["count_tokens", "the API endpoint that counts a request's tokens without running it, to measure pressure before a request fails"]
        ],
        scope: "Context and memory management: window management, preventing context drift and bloat (tool-output pruning, compaction), and context isolation through subagents or multi-step workflows.",
        lesson: [
          "Prompt engineering shapes what you ask for in one request. Context engineering governs what is visible across many turns and steps: what enters the window, what is summarised, what is isolated and what is dropped. They are related but different jobs; a perfect prompt still fails if by turn forty it is buried under stale tool output.",
          "Every tool result is appended to the window and stays for the rest of the session. In production, tool outputs run three to five times longer than test fixtures, so a session that held fifty turns in development can fill at turn eight. Context engineering is deciding in advance what enters the window, what comes back out as a summary and what never enters at all.",
          "Four strategies. Pruning drops what later steps don't need: old tool outputs, or (in the course's sense) rewinding to an earlier message and discarding everything after it, as /rewind does in Claude Code; you lose the work after that point. In the API, context editing can clear old tool results automatically past a threshold (beta). Compaction summarises older history into fewer tokens (/compact in Claude Code; server-side compaction in the API, beta, or your own summariser). Subagent hand-offs spawn a worker in its own window with only its task and return a short summary. Clearing starts fresh (/clear, or a new API session) when nothing needs to carry over.",
          "Subagent hand-offs work when each subagent gets a scoped task, minimal context, only the prior results it needs, its tools and a clear exit condition. Design this at architecture time; skip it if usage never nears the limit.",
          "Compaction keeps only what the summariser keeps. 'Summarise the conversation so far' loses file paths and decisions; 'summarise, preserving every file path modified, every decision made, and every error with its resolution' keeps the task-critical state.",
          "Drift: after many turns or tool calls the model gives stale content too much weight or ignores early constraints. Compaction keeps the gist while lowering the weight of old specifics. Use the count_tokens endpoint to measure pressure before a request fails. Memory that must outlive the window goes outside it: a file or database the agent reads and writes (the API offers a memory tool for this, beta), or the CLAUDE.md files Claude Code loads.",
          "Retrieval comes in two forms. Classical RAG chunks, embeds and indexes documents ahead of time, then runs a similarity search at query time: inspectable and testable, but you own building, syncing and securing the index, and it goes stale. Agentic search has no index: the model searches and reads sources at query time over several rounds (Claude Code's own search works this way): always current, but more tokens and time per query and harder to inspect. A stable corpus with simple lookups favours an index; a changing corpus or multi-step questions favour agentic search; a cheap classifier can route between them when traffic is mixed, and uniform traffic needs no router.",
          "Classical RAG can break in three places: at chunking (too small loses context, too large dilutes; use a little overlap), at the embedding match (semantic search can miss an exact identifier, so lexical search sometimes runs alongside) and at assembly into the prompt. Retrieval keeps per-request cost flat as the corpus grows, but it is only as good as what it finds; descriptive file names and grouped files retrieve better."
        ],
        tables: [{
          cap: "Four ways to stay in budget",
          h: ["Strategy", "What it does", "Apply when", "What you lose"],
          r: [
            ["Pruning", "Drops tool outputs later steps don't need", "Each step's output is needed only briefly", "The exact older outputs"],
            ["Compaction", "Summarises older turns", "Long sessions where the gist must carry on", "Whatever the summariser didn't keep"],
            ["Subagent hand-off", "Isolated worker returns a summary", "Self-contained subtasks, especially exploration", "The worker's journey; you keep its answer"],
            ["Clearing", "Starts with an empty context", "The old context is no longer useful", "Everything"]
          ]
        }],
        know: [
          "Agent loses focus after about 20 tool calls → prune or compact while keeping the active task state visible.",
          "Model weights stale content heavily → compaction.",
          "Steps must reason without the full history → context isolation via subagents or multi-step workflows.",
          "Thinking blocks can't be stripped to save context; manage history around them.",
          "Prompt engineering = one request; context engineering = state across turns and steps.",
          "Caching ≠ pruning: caching lowers the price of repeated tokens, pruning lowers how many there are.",
          "Stable corpus, simple lookups → an index (classical RAG); changing corpus or multi-step questions → agentic search."
        ],
        build: ["Build: ep04-prompting", REPO + "ep04-prompting"],
        traps: [
          { move: "Increase the context window so every tool output stays in full", why: "Buried information stays buried and cost grows every turn." },
          { move: "Restart the agent every five tool calls to prevent drift", why: "It throws away task state it needs. Compact instead." },
          { move: "Truncate to the most recent turn to keep costs low", why: "Loses needed continuity. Summarise older turns." },
          { move: "Switch to a framework that advertises automatic context management", why: "Doesn't address the cause in your loop." },
          { move: "Merge tools into larger multi-purpose tools to cut the number of calls", why: "Fewer calls, worse selection, same buried results." },
          { move: "Give every step the full prior history so it has everything", why: "Works against isolation; scope each step to what it needs." },
          { move: "Prompt and context engineering are the same practice under two names", why: "One shapes a single request; the other manages state across turns. Treating them as one skips pruning, compaction and isolation." },
          { move: "Prompt-cache the piled-up tool outputs instead of pruning them", why: "Caching cuts price, not volume. The window still fills. Prune what later steps don't need." }
        ]
      },
      {
        title: "Prompt engineering", w: 4.6,
        short: "Write the behavioural contract once in the system prompt, put data in tags, show the format with a few examples and state the output constraint. When output goes wrong, diagnose which of those is missing, change one thing and prove the fix with an eval.",
        terms: [
          ["system prompt", "the top-level instructions for the whole conversation (role, rules, format), sent in the system field rather than as a user message"],
          ["XML tags", "named delimiters such as <document> or <ticket> that separate instructions, data and examples"],
          ["few-shot examples", "sample inputs with ideal outputs inside the prompt; they show the shape and are not training data"],
          ["output constraint", "an explicit statement of the form, the fields and where to stop: return only the label"],
          ["prompt placement", "where each instruction lives: system prompt, user turn, tool description, CLAUDE.md or skill"],
          ["iterative refinement", "change the prompt for a measured weakness, re-run the eval, keep it only if it improves without regressions"],
          ["input sanitisation", "cleaning and delimiting untrusted input (escape anything that mimics your tags, wrap it as data) before it enters a prompt"]
        ],
        scope: "Instruction clarity, few-shot examples, system versus user placement, output constraints, prompt and instruction placement across components, iterative refinement, prompt adjustment and input sanitisation.",
        lesson: [
          "Instruction clarity comes first. Write as if briefing a capable new colleague who has no context: say what the output is for and who reads it, give the steps in order (numbered if order matters), say what good looks like and what to do when unsure ('if a field is missing, return null'). Explain why a rule exists; Claude generalises better from the reason than from a bare 'never'. Current models follow instructions closely and literally, so ask for exactly what you want.",
          "Four techniques give a reliable output shape. A system prompt carries the behavioural contract for the whole session: role, format and rules that must not change. XML tags separate instructions from data and examples from the task. Few-shot examples show the exact pattern. Output constraints name the form, the field names and where to stop.",
          "Diagnose before re-prompting. Output in the wrong shape means a missing output constraint. Wrong content, or behaviour off-role from the first turns, means an underspecified system prompt. Structure that degrades gradually as the history grows is context drift: manage the context and validate the output (see Context engineering). Correct task but invented structure means examples are needed. Good on simple inputs but broken on edge cases means no constraint covers that variant.",
          "Rewording rarely helps, because none of these are phrasing problems. If a prompt grows longer with every pass, you are skipping diagnosis. Don't stack all four techniques on a task that needs one.",
          "Placement: behavioural and format instructions belong in the system prompt, consolidated in one place; user messages carry the user's input. Instructions scattered across both, some repeated, cause inconsistency. Across components, each instruction has one home: how to use a tool goes in that tool's description, repository conventions in CLAUDE.md, an occasional procedure in a skill, the task itself in the user turn.",
          "With long documents, put the documents at the top inside tags and the question at the end; queries placed after long context tend to be answered better. With images, put the image before the question and name the ambiguities images carry that text doesn't (overlap, depth, occlusion, handwriting): 'if objects overlap, list each separately and note the overlap'. A bare 'describe this image' gives shallow output.",
          "A prompt that has grown to hundreds of lines with overlapping, contradictory and obsolete rules needs an audit and refactor, not another rule on top.",
          "Iterate with evals: change the prompt to target the weak category, run the eval to confirm it improved and that common cases didn't regress, repeat. Untrusted input is sanitised (escape anything that imitates your tags or instructions) and wrapped in tags as data before it goes into a prompt, and the system prompt says that content inside those tags is data, never instructions."
        ],
        code: { cap: "Output constraint + tags + few-shot (support ticket classifier)", text: "System: You are a support classifier. Classify each ticket into exactly one of:\nBILLING, TECHNICAL, ESCALATION. Return only the label. No other text.\n<sample_input>My account shows two charges for April.</sample_input>\n<ideal_output>BILLING</ideal_output>\n<sample_input>The API keeps returning a 429 error.</sample_input>\n<ideal_output>TECHNICAL</ideal_output>\n\nUser: <ticket>I was charged twice for the same month.</ticket>" },
        know: [
          "Downstream rejects anything off-schema → spell out the schema and say produce only conforming output (then enforce it in the API; see Output handling).",
          "A small set of labelled examples showing the format → multi-shot prompting.",
          "Prompt underperforms on a growing category → iterate on it and validate with evals.",
          "Write descriptions as decision rules: when to, and when not to.",
          "Long documents: at the top, in tags; the question at the end.",
          "Each instruction has one home: system prompt, tool description, CLAUDE.md, skill or user turn.",
          "Clarity: purpose, audience, ordered steps, what to do when unsure, and the reason behind each rule."
        ],
        build: ["Build: ep04-prompting", REPO + "ep04-prompting"],
        traps: [
          { move: "Move all instructions into the user message to control behaviour at input", why: "Instructions belong consolidated in the system prompt." },
          { move: "Repeat every instruction in the system and user messages so it's seen twice", why: "Duplicates drift apart and conflict." },
          { move: "Add more rules so the newest ones dominate", why: "Deepens the contradictions. Audit and refactor." },
          { move: "Fix only the contradictory rules now and the rest later", why: "Overlap and dead rules keep causing confusion. Refactor the whole prompt." },
          { move: "Split the prompt across several system prompts so the model sees less at once", why: "Moves the mess without removing it." },
          { move: "Replace the prompt with one tuned for the weak category and accept a dip elsewhere", why: "Iterate, and prove with evals that common cases still hold." },
          { move: "Let Claude choose whichever format suits each request", why: "Downstream rejects what doesn't match. Constrain the format." },
          { move: "Send the weak category to a separate app, or warn users away from it", why: "Workarounds, not fixes. Iterate the prompt on that category and prove it with evals." },
          { move: "Put the question first and the 80-page document after it", why: "Long context goes at the top in tags; the question goes last, nearest the answer." }
        ]
      },
      {
        title: "Output handling", w: 2.6,
        short: "Ask for a shape in the prompt, enforce it with structured outputs (a JSON schema or strict tool use), check stop_reason, validate before anything downstream trusts the result, and parse defensively. Confident wording is not evidence: verify or source it.",
        terms: [
          ["structured outputs", "API feature constraining the response to a JSON schema (output_config.format) or tool arguments to their input schema (strict: true)"],
          ["JSON schema", "a machine-readable description of fields, types, required keys and allowed values"],
          ["response validation", "checking output against the schema and business rules before use, with retry, repair or fallback on failure"],
          ["defensive parsing", "code that tolerates unexpected fields, missing values and wrong types instead of crashing"],
          ["prefill", "starting the assistant's reply yourself to steer format; can't be combined with JSON outputs and is rejected by some newer models"],
          ["confidence calibration", "making stated certainty match real accuracy, for example by requiring sources or allowing an explicit unknown"]
        ],
        scope: "Producing, validating and consuming Claude output: structured output patterns, response validation, defensive parsing, and scepticism toward confident output.",
        lesson: [
          "A prompt asks for a shape; structured outputs enforce it. With JSON outputs (output_config.format with a json_schema) the final response is constrained to your schema during generation. With strict tool use (strict set to true on a tool) the arguments Claude passes to that tool are validated against its input schema. Costs: the first request on a new schema compiles a grammar (cached for 24 hours from last use), the API adds a small format prompt you pay for, and JSON outputs can't be combined with prefilling the assistant message.",
          "A guaranteed schema is not a guaranteed success: a refusal (stop_reason refusal) or a truncation (stop_reason max_tokens) still returns output that doesn't match. Always check stop_reason before parsing.",
          "Treat validation failure as an expected error path: retry, repair or fall back before failing the user's request. Never pass malformed output downstream, drop it silently or switch validation off. Parse defensively: handle unexpected fields, missing values and type mismatches rather than crashing. Example: the schema says amount is a number, but an older prompt version returns '£12.50' as a string and adds a currency field. A defensive parser converts or rejects the value with a logged error, ignores the unknown field, and sends the record to repair instead of crashing the batch.",
          "Fluent, confident phrasing is not a reliability signal. Before generated text is treated as ground truth, add validation steps, sourcing requirements or confidence calibration: require a source or quote for each claim (citations on document blocks do this natively), give the schema an explicit unknown or null option so the model isn't forced to guess, and cross-check key facts in code or with a second call."
        ],
        know: [
          "Full loop: define the schema, prompt for it, enforce or validate it, then pass it on.",
          "Occasional malformed JSON → validate against the schema; a recognised error path with retry or fallback.",
          "Defensive parsing for unexpected fields, missing values and wrong types.",
          "Check stop_reason: refusals and truncations break the schema guarantee.",
          "Confident ≠ correct: validate before downstream systems trust it.",
          "Give schemas an explicit unknown option; forcing a value invites an invented one."
        ],
        build: ["Build: ep04-prompting", REPO + "ep04-prompting"],
        traps: [
          { move: "Treat every validation failure as terminal and fail the request", why: "Retry, repair or fall back first." },
          { move: "Disable validation until the root cause is fixed", why: "Bad output flows downstream in the meantime." },
          { move: "Pass validation failures to each downstream system to handle", why: "Pushes the failure onto every consumer." },
          { move: "Silently drop output that doesn't match", why: "Hides failures. Handle them as a recognised path." },
          { move: "Have a person inspect every response for malformed JSON", why: "Doesn't scale. Validate in code." },
          { move: "Lower the temperature so answers sound less confident", why: "Tone isn't accuracy. Add validation and sourcing." },
          { move: "Add a 'please verify' disclaimer as the main control", why: "Doesn't make the content correct." },
          { move: "Ship now and add schema enforcement in a later phase", why: "Downstream breaks in the meantime. Parse defensively and validate now." }
        ]
      }
    ],
    remember: [
      "Prune, compact, isolate, clear.",
      "Name the failure, add one technique.",
      "Instructions in the system prompt; data in tags.",
      "Enforce the schema, check stop_reason, parse defensively."
    ]
  },

  /* ================================================================ D7 */
  {
    id: "d7", code: "D7", title: "Security and safety", w: 8.1, eps: "EP 10", t: 3,
    summary: "AI-specific threats and their defences, layered guardrails and secure-by-design deployment, hooks as enforced controls, and identity, secrets and key management.",
    links: [
      ["▶", "Watch EP 10 (8 min)", YT + "Z5FIb8Y5G5A"],
      ["⌨", "Applied: ep07-guard-hook (blocking hook)", REPO + "ep07-guard-hook"],
      ["⌨", "Applied: ep04-prompting (untrusted input as data)", REPO + "ep04-prompting"]
    ],
    highlights: [
      "Anything the agent reads that someone else can write is untrusted data, never instructions.",
      "Prompts ask; hooks, filters and least privilege enforce.",
      "Layer the defences so one failure doesn't expose the application.",
      "Secrets never in committed config. A leaked key can only be rotated, not un-leaked."
    ],
    subs: [
      {
        title: "AI application security", w: 3.2,
        short: "Anything the model reads that someone else could have written is untrusted data, not instructions: validate it, wrap it as data, and limit what the model can do after reading it. Keep sensitive data inside your boundary by redacting before the call, and keep the classic properties too: authentication, authorisation, confidentiality, privacy and integrity.",
        terms: [
          ["prompt injection", "instructions hidden in content the model reads (pages, documents, tool results, emails) that try to hijack your application"],
          ["indirect injection", "injection planted in data the agent will fetch later, not typed by the current user"],
          ["jailbreak", "a crafted prompt that tries to make the model ignore its own safety constraints"],
          ["data leakage", "sensitive data escaping through prompts, context, logs or outputs to places it shouldn't go"],
          ["PII", "personally identifiable information: names, addresses, account numbers, anything that identifies a person"],
          ["authentication vs authorisation", "proving who a caller is versus deciding what that caller may do; check both on every tool call, not just at login"],
          ["confidentiality / integrity", "only the right people see the data / data and actions aren't altered without authorisation"]
        ],
        scope: "Prompt injection awareness and mitigation, jailbreak defence, untrusted input handling, data leakage prevention, PII handling, and authentication, authorisation, confidentiality, privacy and integrity.",
        lesson: [
          "The model reads its whole context as one stream of tokens; nothing marks which text you wrote and which a fetched page smuggled in. Prompt injection hides instructions in content the agent reads: web pages, shared documents, database records, email bodies, tool results. It can be indirect, planted now for the agent to read later. Trusting your users doesn't help, because the hostile text usually arrives in retrieved content.",
          "The defence follows from the mechanism. Treat fetched and user-supplied content as data to examine, never as instructions to follow: validate and sanitise it, wrap it in delimiters and tell the model the contents are data. That lowers the odds, but delimiters are a soft boundary: content can imitate them, and injections hide in white text, image text or off-screen elements. Anthropic trains models and runs classifiers against injection, yet no agent is fully immune. What bounds the damage is limiting what the model can do afterwards: least-privilege tools, and a hook that refuses sensitive actions triggered while handling untrusted input.",
          "A jailbreak tries to make the model ignore its own safety constraints; an injection tries to hijack your application's instructions. Different targets, same layered shape: validate what reaches the model and constrain what it may do.",
          "Data boundaries: define the application boundary, decide what may cross it to the model, and filter or redact sensitive data (account numbers, passwords, PII) before the call. Logging and reviewing later, or asking the model to ignore sensitive data, doesn't prevent the exposure.",
          "The classic properties still apply to the application around the model. Authentication: the app knows which user is calling, and tools act with that user's rights, not a super-user key. Authorisation: each tool call is checked against what this user may do; the model choosing to call a tool is not permission. Confidentiality and privacy: one user's data never reaches another user's context, and PII is minimised, redacted or tokenised before the call and kept out of logs. Integrity: outputs that change records are validated, and an audit trail records who changed what."
        ],
        tables: [{
          cap: "Defence checklist",
          h: ["Threat", "Where it enters", "Control", "What gets logged"],
          r: [
            ["Prompt injection", "Hidden text in pages, documents, tool results", "Treat as data, plus a hook refusing actions triggered by untrusted input", "Source, attempted action, the block"],
            ["Jailbreak", "A crafted user prompt", "Input validation plus limits on allowed actions", "Flagged prompt and refusal"],
            ["Over-broad access", "An identity scoped wider than the task", "Least privilege, secrets manager, locked auth config", "Every privileged action and its identity"],
            ["Sandbox escape", "A steered agent reaching paths or endpoints no rule covers", "OS-level filesystem and network sandboxing", "Blocked access attempts"]
          ]
        }],
        know: [
          "AI-specific threat categories: prompt injection, data leakage via prompts or context, jailbreaks, unsafe output that bypasses controls.",
          "Untrusted input: validated, sanitised, treated as data.",
          "Sensitive data: redact at the boundary before it leaves the app.",
          "Zero data retention eligibility varies by model and platform; confirm it per model.",
          "Tools act with the calling user's rights; the model choosing a tool is not authorisation.",
          "Delimiters lower the odds of injection; least privilege and hooks bound the damage."
        ],
        traps: [
          { move: "Add XSS and SQL injection to the threat model; that covers the Claude app", why: "Those are traditional threats. Add injection, leakage, jailbreaks and unsafe output." },
          { move: "The SDK is the only new attack surface, so watch its supply chain", why: "The model's inputs and outputs are the new surface." },
          { move: "Tell Claude in the system prompt to disregard sensitive data", why: "It has already left your boundary. Redact first." },
          { move: "Filter the common sensitive patterns now and add more from production findings", why: "Every gap leaks until it's found. Define what may cross the boundary up front." },
          { move: "Route untrusted input through a second app with laxer controls", why: "Moves the risk somewhere weaker." },
          { move: "Block all external input", why: "Throws away legitimate use. Validate and treat it as data." },
          { move: "Raise the temperature or use a bigger model against hidden instructions", why: "Neither is a control. Isolate untrusted content and gate actions." },
          { move: "Wrap fetched pages in tags and rely on that as the defence", why: "Delimiters lower the odds; content can mimic them. Limit what the agent can do after reading untrusted input." },
          { move: "Give the agent's tools one service key with full access so every user's request works", why: "Every user then acts with super-user rights. Act with the caller's identity and check authorisation per call." }
        ]
      },
      {
        title: "Guardrails and safe deployment", w: 2.3,
        short: "No single control is enough, so layer them: content treated as data, least-privilege access, hooks and deterministic filters in code, and OS-level sandboxing underneath. Anything that must never happen is enforced in code, not requested in a prompt.",
        terms: [
          ["guardrail layering (defence in depth)", "several independent controls, so one failure doesn't expose the application"],
          ["content policy", "the rules for what the app may produce or do; hard rules are enforced by deterministic filters"],
          ["deterministic output filter", "code that checks every response against the policy before a user sees it"],
          ["secure by design", "privacy, identity and least privilege decided in the design, not added after an incident"],
          ["IAM", "identity and access management: who or what each identity is and which resources it may use"],
          ["least privilege", "each identity, tool and component gets only the access its task needs, with explicit denies"],
          ["sandboxing", "OS-enforced limits on the filesystem paths and network endpoints a process can reach"]
        ],
        scope: "Safe and responsible deployment (content policy, guardrail layering) and secure-by-design principles (privacy, identity and access management, least privilege).",
        lesson: [
          "Security is layered and each layer has a job. Model training and classifiers reduce how often an injection lands. Treating content as data reduces how often a landed injection is acted on. Least privilege and locked configuration bound what a successful action can reach. Hooks enforce those bounds before the action and log it. OS-level sandboxing holds when a hook or rule doesn't cover a path or endpoint.",
          "A content policy that must never be broken needs deterministic output filtering in code before responses reach users. A stronger system prompt is probabilistic; user reporting acts after the harm.",
          "Least privilege is a design principle: give each identity, tool and component the narrowest access its task needs, with explicit denies. In IAM terms that means a separate service identity per component, roles with explicit allows and denies, and short-lived credentials where the platform offers them. Assume an injection gets through everything else: what happens next is bounded entirely by what the agent is allowed to touch. Editing the agent's role is itself a privileged action and belongs behind the same protection as the secrets.",
          "Sandboxing is the floor. In Claude Code it is configured in settings: filesystem isolation to the working directory and network isolation to an allowed list of endpoints, enforced by the operating system rather than by the model. In a multi-component application (an API call that triggers a Claude Code task that calls an MCP server), every seam is a trust boundary: what one component outputs is untrusted data to the next.",
          "Regulated reviewers ask three things early: where is data processed (residency), how is access logged (audit trail), and can an administrator lock the configuration centrally (managed settings). Name them during scoping."
        ],
        code: { cap: "Least-privilege role (illustrative)", text: "api_key = os.environ[\"SERVICE_API_KEY\"]      # from the environment, never committed\nagent_role = Role(\n    allow_write=[\"/workspace/output\"],          # one write path\n    allow_read=[\"/workspace/input\"],\n    deny=[\"/etc\", \"/secrets\", \"~/.aws\"],        # explicit denies bound the blast radius\n)" },
        know: [
          "Guardrail strategy: layer several, so a single failure doesn't expose the app.",
          "Hard content policy → a deterministic output filter before delivery.",
          "Least privilege for every identity and component; the app is only as contained as its most privileged seam.",
          "Data residency, audit logging, managed configuration: the regulated trio.",
          "Every seam between components is a trust boundary.",
          "OS-level sandboxing (filesystem and network) holds where hooks and rules have gaps."
        ],
        build: ["Build: ep07-guard-hook", REPO + "ep07-guard-hook"],
        traps: [
          { move: "One comprehensive system-prompt guardrail, validated against expected inputs", why: "A single, probabilistic point of failure. Layer guardrails." },
          { move: "Guardrails at the output only, with flagged responses sent to a reviewer", why: "One layer. Combine input, action and output controls." },
          { move: "Rely on the model's built-in safety for anything the guardrail misses", why: "Still a single layer. Defence in depth." },
          { move: "Strengthen the system prompt with examples as the content-policy enforcement", why: "Prompts can be bypassed. Filter output in code." }
        ]
      },
      {
        title: "Claude hooks", w: 1.0,
        short: "A hook is your code that runs at a fixed point in the agent's lifecycle, every time, whatever the model decides. Use PreToolUse to block destructive actions before they run and PostToolUse to log them, scoped to the risky actions only.",
        terms: [
          ["hook", "a command or callback run at a lifecycle event (PreToolUse, PostToolUse, UserPromptSubmit, Stop, SessionStart and others)"],
          ["PreToolUse", "fires before a tool runs; can allow, ask or deny it (exit code 2 or a deny decision blocks it)"],
          ["PostToolUse", "fires after a tool succeeds; can log, format or test, but can't undo the call"],
          ["matcher", "the filter deciding which tools a hook applies to, such as Bash, Write or an MCP tool name pattern"],
          ["exit code 2", "the hook's blocking signal; its stderr text is passed to Claude as the reason"],
          ["permissionDecision", "the structured output a PreToolUse hook can return instead: allow, ask or deny, with a reason"]
        ],
        scope: "Using hooks for guardrails and safety controls that prevent destructive actions.",
        lesson: [
          "A rule in CLAUDE.md is followed most of the time; a hook runs every time, because it fires independently of what the model decides. That is the difference between a convention and a guardrail.",
          "A PreToolUse hook sees the tool call before it runs and can block it (exit code 2 with the reason on stderr, or a deny permission decision), so a destructive database query or a write outside the permitted path never executes. A PostToolUse hook can't block, but it can log every call and its parameters to an audit store a compliance reviewer can inspect. When several hooks or rules apply, deny beats ask beats allow.",
          "Example: a PreToolUse hook with the matcher Bash reads the command; if it contains DROP TABLE, or rm -rf outside the workspace, it exits with code 2 and the reason. The call never runs, and Claude reads the reason and takes another route. The same idea works in your own agents, because the Agent SDK offers hooks as callbacks.",
          "Scope hooks to the high-risk actions (destructive operations, sensitive paths and data) rather than every action, which slows the agent for no safety gain. A hook only covers what it checks: one that guards write_file doesn't block a network call, which is why sandboxing sits underneath."
        ],
        code: { cap: "PreToolUse hook blocking writes outside the allowed path (illustrative)", text: "def pre_tool_use(event):\n    if event.tool == \"write_file\" and not event.path.startswith(\"/workspace/output\"):\n        log_audit(action=\"write_file\", path=event.path, result=\"BLOCKED\")\n        return {\"hookSpecificOutput\": {\n            \"hookEventName\": \"PreToolUse\",\n            \"permissionDecision\": \"deny\",\n            \"permissionDecisionReason\": \"write outside the permitted path\"}}" },
        know: [
          "Destructive query incident → hooks that intercept database operations and block or require approval before execution.",
          "Hooks slowing everything → scope them to high-risk actions only.",
          "PreToolUse can block; PostToolUse logs and formats.",
          "A hook enforces its rule in every session and every permission mode."
        ],
        build: ["Build: ep07-guard-hook", REPO + "ep07-guard-hook"],
        traps: [
          { move: "Tell the agent in the system prompt to be careful with the database", why: "A request, not a control. Intercept with a hook." },
          { move: "Use a more capable model so it won't run destructive queries", why: "Capability isn't a guarantee." },
          { move: "Run the agent only in business hours when people can watch", why: "The schedule doesn't prevent the action." },
          { move: "Replace hooks with prompt instructions to remove the overhead", why: "Trades enforcement for hope. Narrow the hooks' scope instead." },
          { move: "Disable hooks while you re-scope them", why: "Leaves a window with no enforcement." }
        ]
      },
      {
        title: "Identity, secrets and key management", w: 1.6,
        short: "Keep secrets out of code and config: reference them, store them in the environment or a secrets manager, and rotate them. Use a separate key per environment, grant access through an approval step at the lowest level that works, and monitor who uses what.",
        terms: [
          ["secret", "any credential whose value grants access: API keys, tokens, passwords, certificates"],
          ["secrets manager", "a service that stores secrets centrally, controls who can read them and logs access"],
          ["rotation", "replacing a credential with a new one, on a schedule or after suspected exposure"],
          ["OAuth", "a sign-in flow that issues a scoped, revocable token for a user's identity instead of sharing a password or key"],
          ["access approval and level verification", "access is requested, approved by an owner, granted at the lowest level the task needs, and re-checked periodically"],
          ["workspace", "a Console grouping of API keys with its own limits and usage reporting, used to separate teams or environments (confirm at docs.claude.com)"],
          ["access monitoring", "logging and alerting on who used which credential, when and for what, so unusual use is noticed"]
        ],
        scope: "Managing secrets, credentials and API keys across development and production: identity validation and authentication, access approval and level verification, and monitoring authorised access.",
        lesson: [
          "Three practices. Separation: a credential never travels with the configuration that references it; the file holds a variable name and the value lives elsewhere. Storage: an environment variable injected at run time for one machine or pipeline, a secrets manager for values several services or people need. Rotation: on a schedule and immediately after any suspected exposure. A key in repository history stays exposed even after you delete the file, so only a new key fixes it.",
          "Use distinct keys per environment (dev, staging, production) so a compromise in one doesn't reach the others. Scope each credential to the narrowest access its task needs, and record which services use each one, so a rotation doesn't surprise anyone.",
          "Authentication patterns: OAuth for remote services with user identity (the server returns 401 and the client runs a browser sign-in); environment-held service credentials for internal APIs; file-system permissions and deny rules for local resources. Audit with PostToolUse logs; let administrators lock the auth configuration through managed settings.",
          "Access approval and level verification: nobody gets a key or a role by asking in chat. Access is requested, approved by its owner, granted at the lowest level that works (read-only before write, one workspace before the whole organisation), recorded, and reviewed on a schedule so unused access is removed. Identity validation means checking the caller is who they claim before acting: verify tokens on every request, and require a stronger check for privileged actions.",
          "Authorised access monitoring closes the loop: per-key usage reporting, audit logs of privileged actions, and alerts on unusual volume, location or timing. Separate workspaces per team or environment make usage, spend limits and the owner of each key easy to read."
        ],
        tables: [{
          cap: "Authentication by service type",
          h: ["Service", "Auth method", "Where secrets live", "Who locks config"],
          r: [
            ["Remote, user identity (SaaS, cloud)", "OAuth", "Token issued by the provider, stored by the client", "Admin via managed settings"],
            ["Remote, service identity (internal API)", "Service credential / API key", "Environment or secrets manager, never committed", "Admin via managed settings"],
            ["Local (files, local DB)", "File-system permissions", "None needed; deny rules enforce paths", "Deny rules in managed settings"]
          ]
        }],
        know: [
          "Keys in a secrets manager or environment config, loaded at run time, never in the repo.",
          "Distinct keys per environment.",
          "Leaked key → rotate. Deleting the file doesn't undo the exposure.",
          "Never put an API key in .mcp.json; reference an environment variable or use OAuth.",
          "A secret in CLAUDE.md is committed and loaded into context: remove it, rotate it, supply it from the environment.",
          "Access: request, owner approval, lowest workable level, periodic review; monitor usage per key."
        ],
        traps: [
          { move: "Use one key across all environments for simplicity", why: "A leak anywhere exposes everything." },
          { move: "Rotate the same key at random intervals across environments", why: "Rotation isn't isolation. Use distinct keys." },
          { move: "Use the dev key everywhere because production keys are risky to deploy", why: "No isolation, and production runs on a dev credential." },
          { move: "Check the config file with the keys into the repo", why: "Permanent exposure in history." },
          { move: "Email keys to developers to paste locally", why: "Uncontrolled copies. Use a secrets manager." },
          { move: "Delete the key from CLAUDE.md and push; the problem is solved", why: "Git history keeps the old value. Rotate the key as well." },
          { move: "Give the new developer admin rights on the production key so they aren't blocked", why: "Over-broad access. Approve the lowest level that works and review it later." }
        ]
      }
    ],
    remember: [
      "Read content is data, never orders.",
      "Layered controls; code enforces.",
      "Hooks on the risky actions; deny beats allow.",
      "Separate, store, rotate; one key per environment."
    ]
  },

  /* ================================================================ D8 */
  {
    id: "d8", code: "D8", title: "Tools and MCPs", w: 10.6, eps: "EP 05", t: 4,
    summary: "Implementing tools Claude selects and calls correctly, building and deploying MCP servers, and choosing between built-in tools, custom tools, skills and MCP servers.",
    links: [
      ["▶", "Watch EP 05 (8 min)", YT + "T0pDaobW79c"],
      ["⌨", "Build: ep05-tools-mcp (TypeScript, no key)", REPO + "ep05-tools-mcp"],
      ["❓", "PRACTICE.md (EP 05)", BLOB + "ep05-tools-mcp/PRACTICE.md"]
    ],
    highlights: [
      "Claude doesn't run tools; it asks your code to. The tool_use → tool_result loop is yours.",
      "Wrong-tool selection traces to the schema, usually the description. Add when-not-to-use.",
      "stdio for a local process, HTTP for a shared or remote server; secrets never in .mcp.json.",
      "A skill packages know-how the model loads; an MCP server exposes capabilities through a standard interface."
    ],
    subs: [
      {
        title: "Tool implementation", w: 4.4,
        short: "Claude never runs a tool itself: it returns a tool_use block, and your harness runs the matching function and sends back a tool_result. Good tools have specific names, descriptions that say when and when not to use them, strict schemas, explicit errors, and a person approving anything destructive.",
        terms: [
          ["tool use / function calling", "Claude choosing a defined function and supplying its arguments as JSON for your code to run"],
          ["input_schema", "the JSON Schema for a tool's arguments: types, required fields, enums"],
          ["client-side tool", "a tool your code executes; you return its tool_result"],
          ["server-side tool", "a tool Anthropic executes during the request (web search, web fetch, code execution); results come back in the same response"],
          ["harness dispatch", "the loop code that maps each tool_use name to a handler, runs it and returns the result by id"],
          ["tool_choice", "request option: auto (Claude decides), any (must use some tool), tool (must use the named one), none"],
          ["strict", "tool flag making the API validate arguments against the input_schema"],
          ["approval pattern", "a person or policy confirming a tool call before it runs, used for destructive or costly actions"]
        ],
        scope: "Tool use and function calling, configuration for external systems, writing tool descriptions, error handling, usage patterns (agentic harness dispatch, client-side versus server-side tools, approval patterns) and building a good tool set.",
        lesson: [
          "The common misconception is that Claude runs tools. It reads your definitions, decides which fits and returns a tool_use block (name, unique id, input). Your code executes the tool and sends a tool_result with the matching id in the next user turn; Claude continues from there. If your code doesn't complete that step, the loop breaks.",
          "Client-side versus server-side. Client tools (your own functions, and Anthropic-defined tools such as bash or the text editor that your code still executes) run in your environment, so your code handles auth, errors and the tool_result. Server tools (web search, web fetch, code execution) run on Anthropic's platform within the same request: you list them in tools, Claude calls them, and their results arrive already in the response; you send no tool_result. A long server-tool turn can end with stop_reason pause_turn, which you continue by sending the response back.",
          "Harness dispatch: the agentic harness keeps a registry from tool name to handler, runs each tool_use it receives (in parallel when independent), catches failures, and returns every result with its id in one user turn. Configuration for the external system (base URL, credentials, timeouts, retries, rate limits) lives in that handler and its config, never in the prompt or the tool description. The SDKs also offer a tool runner that does this loop for you (beta).",
          "A tool definition has a name, a description and an input_schema (JSON Schema). Claude routes on name plus description, with parameter types as a secondary signal; when two tools share a signature, routing falls to the description alone. Use specific names (get_account_balance, not get_data).",
          "Write three or four sentences of description: what it does, when to use it, what it returns, and an exclusion condition (when not to use it). Example: search_knowledge_base 'Searches published help articles by keyword. Use for how-to and policy questions. Returns up to five titles with snippets. Do not use for a customer's own orders; use get_order.' Where the input format matters, show one valid input in the description. Mark as required only what's truly needed, or Claude has to invent values; give optional fields defaults. If two tools need ever-longer descriptions to stay apart, merge them into one tool with a type parameter.",
          "Validate arguments against the schema before dispatching, or set strict to true so the API validates them, and return a structured error the agent can retry against. Keep the schema strict; loosening it lets invalid calls reach downstream services. Handle the external service's failures explicitly and return them with is_error.",
          "Independent calls can run in parallel (several tool_use blocks in one turn, which current models do by default); dependent calls run in sequence across turns; disable_parallel_tool_use forces one per turn. tool_choice controls whether Claude must call a tool: auto (the default) lets it decide, any forces some tool, tool forces a named one (useful for guaranteed structured extraction), and none forbids tools.",
          "Over-tooling is the common production problem: selection quality drops as the tool surface grows, so start minimal, consolidate overlaps and remove unused tools. Approval patterns put a decision before risky calls: a confirm step in your UI before a destructive tool runs, a permission callback or PreToolUse hook in the Agent SDK, or permission modes and allow and deny rules in Claude Code. Gate by worst-case cost: reads run freely; writes to sensitive systems wait for a person."
        ],
        tables: [{
          cap: "Schema design decisions",
          h: ["Decision", "How to handle it", "Why it matters"],
          r: [
            ["Dependent subtasks", "Separate turns; parallel only when independent", "The second call needs the first result"],
            ["Required fields", "Only what the tool truly can't run without", "Over-required fields force invented values"],
            ["Optional fields", "Leave out of required; give defaults", "Lets Claude omit what it doesn't know"],
            ["Description length", "Three or four sentences, including when not to use it", "Too short: guessing. Too long: the triggers get buried"],
            ["Overlapping parameter types", "Name the domain or trigger in each description, or merge", "Identical signatures route on description alone"]
          ]
        }],
        know: [
          "Custom tool for a pricing service: clear schema, precise when-to-call description, explicit error handling.",
          "Undeclared arguments → strict schema, validate before dispatch, structured error.",
          "Too many overlapping tools → consolidate, remove unused, sharpen descriptions.",
          "Descriptions stay in the tool definition: the model reads them at decision time.",
          "Exclusion conditions rely on full history being passed; truncated history breaks them silently.",
          "Server tools: no tool_result from you; pause_turn means send the response back to continue.",
          "tool_choice: auto lets Claude decide; any or a named tool forces a call; none forbids tools.",
          "External-system config (URLs, credentials, timeouts) lives in the handler, not the prompt."
        ],
        build: ["Build: ep05-tools-mcp", REPO + "ep05-tools-mcp"],
        traps: [
          { move: "Loosen the schema so the tool accepts whatever the model sends", why: "Invalid calls reach the downstream service. Keep it strict and validate." },
          { move: "Log invalid tool_use blocks and dispatch them anyway", why: "Bad arguments hit a real system." },
          { move: "Retry until the model produces a valid tool_use", why: "Blind retries. Validate and return a structured error." },
          { move: "Replace tools with text descriptions of what the model would do", why: "Loses the capability." },
          { move: "Drop the description; the name is descriptive enough", why: "The model chooses from the description." },
          { move: "Move descriptions to a separate docs file to keep definitions short", why: "The model can't read it at decision time." },
          { move: "Add more tools so every request has an exact match", why: "More overlap, worse choices." },
          { move: "Add examples to each overlapping tool's description as the fix", why: "Treats the symptom. Remove the overlap." },
          { move: "Replace the prose descriptions with example calls", why: "Examples don't say when to use the tool or when not to. Keep the description; add an example only where format matters." },
          { move: "Return a tool_result for each server tool call such as web search", why: "Server tools run on Anthropic's side and their results arrive in the response. You only answer client tools." },
          { move: "Let the agent call the refund tool freely because the prompt says to be careful", why: "A prompt isn't an approval gate. Put a confirm step or hook before destructive tools." }
        ]
      },
      {
        title: "MCP server development", w: 2.1,
        short: "An MCP server packages tools, resources and prompts behind the Model Context Protocol so any MCP client (Claude Code, Desktop, your SDK app, the API's MCP connector) can use them. Use stdio for a local subprocess and Streamable HTTP for a shared remote server, scope the config to who needs it, and keep secrets out of it.",
        terms: [
          ["MCP", "Model Context Protocol: an open standard, built on JSON-RPC 2.0 messages, for connecting AI applications to tools and data"],
          ["host / client / server", "the host app (e.g. Claude Code) runs one MCP client per connected server; the server exposes capabilities"],
          ["tools / resources / prompts", "model-called actions / read-only data the app fetches by URI / instruction templates the user invokes"],
          ["stdio transport", "the client starts the server as a local subprocess and talks over standard input and output"],
          ["Streamable HTTP", "the remote transport: the client POSTs messages to one endpoint and the server can stream replies over SSE; the older SSE-only transport is deprecated"],
          ["MCP connector", "the API feature that lets a Messages request call a remote MCP server directly (beta header; HTTP servers only)"],
          [".mcp.json", "project-scoped MCP config committed at the repo root; it references secrets through environment variables"]
        ],
        scope: "Authoring and deploying MCP servers, integrating them with Claude applications, MCP resources, tools and prompts, and communication patterns (stdio, sockets, client versus server).",
        lesson: [
          "Wiring a tool into one application puts its schema and code in that app; three apps means three integrations. An MCP server separates the capability into its own process that any MCP client can use: build it once and every client gets it. It exposes tools (actions the model calls), resources (read-only data the client fetches into context by address; direct resources have fixed addresses, templates take parameters) and prompts (vetted instruction templates invoked by name). The tool-use loop doesn't change: the client lists the server's tools and passes them to Claude.",
          "Communication pattern: client and server. MCP messages are JSON-RPC 2.0 requests, responses and notifications. The client opens with an initialise handshake that agrees capabilities, then calls tools/list and tools/call, resources/list and resources/read, prompts/list and prompts/get. Servers can also notify the client, for example that their tool list changed. Who controls each primitive: tools are model-controlled, resources application-controlled, prompts user-controlled.",
          "Authoring: the official SDKs (TypeScript, Python and others) handle the protocol. In Python, FastMCP lets you declare a tool as a decorated function whose type hints and docstring become the schema and description; in TypeScript you register each tool with a schema. Write descriptions to the same standard as any tool, and test with the MCP Inspector before connecting a client.",
          "Transport follows where the server runs. stdio: the client launches the server as a local subprocess and talks over standard input and output; right for local tools and personal scripts, with no network setup. Streamable HTTP: the server runs remotely and clients connect over the network (sockets rather than pipes); right for shared or team servers. The older SSE-only transport is deprecated; new remote servers use Streamable HTTP, which can still stream over SSE.",
          "One running stdio server can't be shared across a team, because it lives on one machine. A project-scoped stdio entry in .mcp.json can be committed, but each clone then spawns its own copy and needs the runtime installed (for example Node for npx). Per the course, the API's MCP connector reaches only remote HTTP servers; a stdio server needs an MCP client you run yourself, or Claude Code or Desktop as the client.",
          "Scope decides who loads it in Claude Code: local (just you, this project, stored in ~/.claude.json), user (you, every project), project (.mcp.json committed at the repo root, for everyone who clones) and enterprise (pushed by administrators). Secrets go in environment variables or OAuth, never inline in .mcp.json. Permission rules can target single tools as mcp__server__tool.",
          "Each connected server adds tool definitions to the context, even when they are not used. By default Claude Code defers them and searches for tools on demand. On the API connector, an mcp_toolset entry in tools has a default configuration plus per-tool settings: defer loading, or enable and disable individual tools, which works as an allowlist or denylist (it needs a beta header; confirm at docs.claude.com). Permission rules and the enabled flag do different jobs: the rule decides whether an exposed tool may run (governance), the flag decides whether the model sees it at all (context and scope). A deny on one tool overrides an allow on its server.",
          "Connect only the servers a task needs. A server several applications use needs clear definitions, a chosen transport and deployment somewhere they can all reach. The server gives breadth, allowlisting narrows the set, and tuned descriptions add precision."
        ],
        tables: [{
          cap: "MCP setup reference",
          h: ["Context", "Transport", "Scope", "Config", "Secrets"],
          r: [
            ["Personal local tool", "stdio", "Local", "~/.claude.json (per project)", "Environment variables only"],
            ["Shared team server", "HTTP", "Project", ".mcp.json committed at the repo root", "OAuth or env vars; never committed"],
            ["Personal experiment", "stdio or HTTP", "Local", "Personal settings", "Environment variables only"],
            ["Organisation-wide", "HTTP", "Enterprise", "Managed settings", "Managed by admins; config locked"]
          ]
        }],
        know: [
          "Local Claude Code session + local server → stdio.",
          "Several apps must reach it → defined resources, tools and prompts; a chosen transport; accessible hosting.",
          "GitHub's server: remote HTTP, personal access token from an environment variable as a Bearer header. Linear's: OAuth sign-in.",
          "Use an existing, maintained server when one covers your operations; write schemas yourself when none does or you need precise control.",
          "Tools are model-controlled, resources application-controlled, prompts user-controlled.",
          "MCP messages are JSON-RPC 2.0: initialise, then list and call tools, read resources, get prompts.",
          "SSE-only transport is deprecated; use Streamable HTTP for remote servers."
        ],
        build: ["Build: ep05-tools-mcp", REPO + "ep05-tools-mcp"],
        traps: [
          { move: "HTTP is always preferable, even for a local server", why: "stdio fits a local process with no network setup." },
          { move: "Run stdio and HTTP together for redundancy", why: "Needless complexity." },
          { move: "Scope the server to the first app and extend it per request", why: "Defeats a shared server. Define it for reuse from the start." },
          { move: "Deploy it on developer machines only", why: "Other apps can't reach it." },
          { move: "Commit the API key in .mcp.json so teammates can connect", why: "It's in repo history for good. Use an environment variable or OAuth." },
          { move: "Point the API's MCP connector at a stdio server on a developer laptop", why: "The connector reaches remote HTTP servers only. Host the server, or run your own MCP client for stdio." }
        ]
      },
      {
        title: "Agentic customisation", w: 4.1,
        short: "Choose between a built-in tool, a custom tool, a skill and an MCP server by scope, reuse and integration: built-in if it covers the need, a custom tool for one app's own capability, a skill for reusable know-how the model loads, an MCP server for a capability many apps call.",
        terms: [
          ["built-in tool", "a tool the platform already provides (in Claude Code: Read, Edit, Bash, Grep; on the API: server tools such as web search)"],
          ["custom tool", "your own schema and function, defined in one application"],
          ["skill", "a SKILL.md package of instructions, scripts and data, loaded when its description matches"],
          ["progressive disclosure", "loading only a skill's name and description up front, its body on match, and its bundled files only when needed"],
          ["MCP server", "a separate process exposing tools, resources and prompts to any MCP client"],
          ["plugin", "an installable bundle of skills, subagents, hooks and MCP servers, distributed through a marketplace"]
        ],
        scope: "Trade-offs among built-in tools, custom tools, skills and MCP servers for a given use case.",
        lesson: [
          "Pick the mechanism by scope, reuse needs and integration context, not familiarity, novelty or ease of building. A built-in tool fits when it covers the need; when it nearly does, decide whether the missing feature can be added by extending it or genuinely needs a custom tool. A custom tool fits a capability specific to one application.",
          "A skill bundles instructions, scripts and data into a package the model loads as a unit when a request matches its description; only the name and description cost context until then. Write the description as the matching criterion, don't assume a local filesystem (a skill that shells out works in Claude Code but breaks on the API, where skills run in a code-execution container), and remember subagents don't inherit skills.",
          "An MCP server exposes tools, resources and prompts through a standard client interface, so many applications and teams can connect, and it's maintained independently of any one app. Skills and MCP servers are both built for independent reuse across teams; they solve different problems. A shared library each team imports and keeps in sync, or copying a tool between agents, gives you neither.",
          "Worked choices. A team wants Claude to follow the company's release checklist and run its version-bump script in several repos: a skill. Several apps need live stock levels from an internal REST service: an MCP server. One app needs to call its own pricing function: a custom tool. Searching the web: the built-in web search tool. When a built-in nearly fits, ask whether the missing feature can be added by extending it before writing a custom tool."
        ],
        tables: [{
          cap: "Choosing the mechanism",
          h: ["Mechanism", "What it is", "Choose when"],
          r: [
            ["Built-in tool", "Provided by the platform", "It covers the need, or extending it closes the gap"],
            ["Custom tool", "Your schema and function in one app", "The capability is specific to that application"],
            ["Skill", "SKILL.md plus scripts and data, loaded on match", "Reusable know-how or a procedure the model should follow"],
            ["MCP server", "A separate process exposing tools, resources and prompts", "Many apps or teams call the capability through a standard interface"]
          ]
        }],
        know: [
          "A capability reused independently by several teams → a skill or an MCP server.",
          "An internal REST service reused across apps and maintained on its own → an MCP server exposing its operations as tools.",
          "Skill vs MCP: a package the model loads vs an interface clients call.",
          "Plugins bundle skills, hooks, subagents and MCP servers for one-step install."
        ],
        build: ["Build: ep05-tools-mcp", REPO + "ep05-tools-mcp"],
        traps: [
          { move: "Choose the option the team knows best", why: "Familiarity isn't fit. Match scope, reuse and integration." },
          { move: "Choose the newest option, or the easiest to build", why: "Convenience factors, not fit factors." },
          { move: "Ship a shared library each team imports and maintains", why: "Every team carries the drift. Skills and MCP servers are built for this." },
          { move: "Skills and MCP servers are interchangeable", why: "Different mechanisms for different jobs." },
          { move: "Skills are the older mechanism, so always prefer MCP", why: "Neither replaces the other." },
          { move: "Built-in tools can reach any internal REST API", why: "They can't. Expose it through an MCP server or a custom tool." },
          { move: "Decide from what the team built last time, or assume the built-in is enough without checking the missing feature", why: "The decision is whether extending the built-in closes that specific gap." }
        ]
      }
    ],
    remember: [
      "Your code runs the tool; the ids must match.",
      "Description with when-not-to; a strict schema.",
      "stdio local, HTTP shared; scope decides who loads it.",
      "Built-in, custom, skill, MCP: choose by fit."
    ]
  },

  /* ================================================================ technique */
  {
    id: "technique", code: "★", title: "Exam technique", w: null, eps: "Wrap-up", t: 9,
    summary: "How to choose between two plausible answers, and the distractor patterns that recur across every domain.",
    links: [
      ["▶", "Watch the wrap-up (54 min)", YT + "KzK9R89sMtM"],
      ["⚠", "Printable traps sheet", "flashcards.html?track=ccdv-f&mode=traps"]
    ],
    highlights: [
      "53 items in 120 minutes: a little over two minutes each. Multiple-response items say how many to pick.",
      "If it must always hold, enforce it in code. A prompt instruction is never the guarantee.",
      "'First step' questions: diagnose (traces, measurements, requirements) before changing anything.",
      "Compliance, residency and safety constraints outrank speed and convenience."
    ],
    subs: [
      {
        title: "Strike, compare, pick", w: null, scope: "",
        short: "Strike the option that does nothing or pushes the problem elsewhere and the one that tears everything down, then compare the last two against the stem's qualifier (first, best, must). The right answer is usually complete, proportionate and enforced in code.",
        terms: [
          ["qualifier", "the word in the stem that sets the test: first, best, most effective, must, least"],
          ["distractor", "a plausible wrong option written to catch a common misconception"],
          ["partial fix", "an option that solves one part of the problem (one environment, only the contradictions) and leaves the rest"],
          ["proportionate", "the smallest change that fully meets the requirement; no abstraction or rebuild nobody asked for"],
          ["multiple response", "an item where you pick more than one option; the stem says how many"]
        ],
        lesson: [
          "Most items offer one option that does nothing or hands the problem to someone else, one that tears everything down, and two plausible ones. Strike the first two, then read the qualifier in the stem (first, best, most effective, must) and compare the last two against it.",
          "Distractors in this exam are often partial: they fix one part of the problem (only the contradictions, only the common patterns, only one environment) or do the right thing at the wrong time (after launch, in a follow-up release). The correct option is usually complete, proportionate and enforced in code."
        ],
        know: [
          "Strike: do nothing, push it to users or downstream, defer it, disable it, rebuild everything.",
          "Prefer the option that measures or traces before changing anything.",
          "Prefer the deterministic mechanism (hook, filter, schema, deny rule) over asking the model.",
          "Prefer the proportionate fix over the impressive one (the direct SDK over an abstraction nobody needs)."
        ],
        traps: [
          { move: "Pick the most thorough-sounding option", why: "Thorough at the wrong step is wrong. Re-read the qualifier." }
        ]
      },
      {
        title: "Distractors that recur", w: null, scope: "",
        short: "The same wrong levers recur in every domain: a bigger window, a bigger model, a temperature change, more retries, more tools, more instructions. Each sounds like progress and none addresses the cause.",
        terms: [
          ["wrong lever", "a change that sounds like progress but doesn't touch the cause, such as a bigger window for buried information"],
          ["diagnose first", "reading traces, measurements or requirements before changing anything"],
          ["deterministic control", "a hook, filter, schema or deny rule that holds every time, unlike a prompt instruction"],
          ["right thing, wrong time", "a correct action placed after launch or in a follow-up release when the stem needs it now"]
        ],
        lesson: [
          "Bigger context window, bigger model, higher or lower temperature, more retries, more tools, more instructions: these are the exam's favourite wrong levers. Each sounds like progress and none addresses the cause.",
          "Product facts change between releases. The exam is marked against its guide; the durable judgement is what's tested. Confirm names, limits and prices at docs.claude.com before you sit it."
        ],
        know: [
          "Temperature: never the fix for capacity, accuracy, injection or confidence.",
          "'Increase the context window': almost always a distractor.",
          "Retry without a cause: wrong for 400s and refusals.",
          "A system-prompt instruction as the primary control: wrong whenever something must always hold."
        ],
        traps: [
          { move: "Bigger window, bigger model or a new temperature will fix it", why: "None touches the cause. Name the failure first, then pick the lever that targets it." },
          { move: "Do the right thing in a follow-up release after launch", why: "Compliance, safety and known gaps apply from day one. Right action, wrong time." },
          { move: "Add a system-prompt instruction as the main control", why: "A prompt asks; it doesn't enforce. Use a hook, filter, schema or deny rule when it must always hold." }
        ]
      }
    ],
    remember: [
      "Strike two, compare two.",
      "Read the qualifier.",
      "Code enforces; prompts ask.",
      "Diagnose first."
    ]
  }
  ]
};
})();

/* Hands-on practice per domain: the episode folders in chittychat-studio/ccdvf-course (checked against each README).
   ep: episode, dir: folder, what: what you build, files: [file, what it shows], run: commands, key: needs an API key, practice: has PRACTICE.md */
(function(){
  const EP = {
    ep01: { ep: "EP 01", dir: "ep01-models", lang: "Python", key: true, practice: false,
      what: "Count, price and cache: count a request's tokens before sending it, turn a response's usage into a per-ticket cost with a budget stop, and cache a stable system prompt.",
      files: [["count.py", "count input tokens before sending (free endpoint)"], ["price.py", "usage block → cost per ticket, refuse past a budget"], ["cache.py", "cache_control on the system prompt, read the cache fields back"]],
      run: "pip install -r requirements.txt\ncp .env.example .env   # your key, never in code\npython count.py" },
    ep02: { ep: "EP 02", dir: "ep02-agents", lang: "TypeScript", key: true, practice: false,
      what: "One agent loop on the Messages API wired to the checklist: minimum tools with a 'do not use' line, a scoped system prompt, every tool_use answered by id, a human gate before a send, and an exit condition.",
      files: [["tools.ts", "the minimum tool set, each with when not to use it"], ["loop.ts", "system prompt, the tool-use loop, MAX_TURNS exit"], ["gate.ts", "the human-in-the-loop gate before an action"]],
      run: "npm install\ncp .env.example .env   # ANTHROPIC_API_KEY and CLAUDE_MODEL\nnpm run loop           # with the gate\nnpm run loop:nogate    # watch what it does without one" },
    ep03: { ep: "EP 03", dir: "ep03-messages", lang: "Python", key: true, practice: false,
      what: "API mechanics, one file per move: Messages and history growth, a stream handler that acts only on closed blocks, image token cost, documents, and the Message Batches API.",
      files: [["messages_basics.py", "a request, stop_reason, and how history grows"], ["stream_handler.py", "assemble streamed events safely"], ["image_cost.py", "image token arithmetic (no API call)"], ["send_document.py", "a PDF as a document block"], ["batch_run.py", "submit and poll a batch"]],
      run: "pip install -r requirements.txt\ncp .env.example .env\npython messages_basics.py --show-growth\npython stream_handler.py\npython image_cost.py   # no key needed" },
    ep04: { ep: "EP 04", dir: "ep04-prompting", lang: "Python", key: true, practice: true,
      what: "The support-ticket classifier, built properly: system prompt, tags, few-shot examples and an output constraint, plus an offline check that proves its safety checks work with no key.",
      files: [["classify.py", "the classifier from the episode"], ["check_offline.py", "feeds fake responses to prove the checks (no key, no spend)"]],
      run: "pip install -r requirements.txt\ncp .env.example .env\npython classify.py \"Login page shows a blank screen on Safari.\"\npython check_offline.py   # no key needed" },
    ep05: { ep: "EP 05", dir: "ep05-tools-mcp", lang: "TypeScript", key: false, practice: true,
      what: "A small MCP server with two tools, one resource and one prompt, plus a real MCP client that starts it over stdio and calls everything. No API key.",
      files: [["server.ts", "the MCP server: tools, a resource, a prompt"], ["try.ts", "an MCP client playing Claude Code's part"]],
      run: "npm install\nnpm run try" },
    ep06: { ep: "EP 06", dir: "ep06-config-checker", lang: "TypeScript", key: false, practice: true,
      what: "A config checker that reads a repo's Claude Code settings the way the layers stack (user, project, local) and flags what won't travel to the next machine, run against a sample repo.",
      files: [["check-config.ts", "the checker"], ["fixtures/priya-repo/", "team and local settings, CLAUDE.md, a versioned prompt"]],
      run: "npm install\nnpm run check" },
    ep07: { ep: "EP 07", dir: "ep07-guard-hook", lang: "TypeScript", key: false, practice: true,
      what: "A PreToolUse guard hook that reads one tool call and blocks it if it deletes a folder or touches the secrets file, with least-privilege allow and deny rules ready to copy.",
      files: [["guard.ts", "the hook"], ["try-guard.ts", "feeds sample calls the way Claude Code does"], ["settings.example.json", "allow/deny rules and the hook wiring"]],
      run: "npm install\nnpm run try" },
    ep08: { ep: "EP 08", dir: "ep08-gate-checker", lang: "Python", key: false, practice: true,
      what: "A gate checker that reads a requirements record and a release file and prints what blocks the next life-cycle gate: vague requirements, the wrong region, no eval.",
      files: [["gate_check.py", "the checker"], ["fixtures/ravi-plan/", "the first plan, with three problems"], ["fixtures/ravi-fixed/", "the same plan after the fixes"]],
      run: "python gate_check.py\npython gate_check.py fixtures/ravi-fixed" },
    ep09: { ep: "EP 09", dir: "ep09-failure-checker", lang: "TypeScript", key: false, practice: true,
      what: "A failure checker that reads recorded traces and, for each failed run, names the step that broke, whether it was your code or the model, and whether to retry or fail fast.",
      files: [["checker.ts", "the checker"], ["traces.json", "five runs: rate limit, bad tool request, confident wrong answer, pass, refusal"]],
      run: "npm install\nnpm run try" }
  };
  const BY_DOMAIN = { d1: ["ep02"], d2: ["ep03", "ep06", "ep08"], d3: ["ep07", "ep06"], d4: ["ep09"], d5: ["ep01", "ep03"], d6: ["ep04"], d7: ["ep07", "ep04"], d8: ["ep05"] };
  const T = window.LEARN_DATA["ccdv-f"];
  T.practiceRepo = "https://github.com/chittychat-studio/ccdvf-course";
  T.domains.forEach(d => { if(BY_DOMAIN[d.id]) d.practice = BY_DOMAIN[d.id].map(k => EP[k]); });
})();
