/* CCDV-F study notes for learn.html.
   Structure follows Anthropic's CCDV-F exam guide (v1.0, effective July 2026): 8 domains, 25 weighted skills.
   Explanations are paraphrased from Anthropic's Developer course material; traps restate the distractor patterns of a
   practice set in our own words. No exam item is reproduced. Product facts carry an as-of date: confirm at docs.claude.com.
   Sub-skill fields: title, w (weight %), scope, lesson [paragraphs], tables [{cap, h, r}], code {cap, text},
   know [bullets], build [label, url], traps [{move, why}]. */
(function(){
const REPO = "https://github.com/chittychat-studio/ccdvf-course/tree/main/";
const BLOB = "https://github.com/chittychat-studio/ccdvf-course/blob/main/";
const YT = "https://youtu.be/";
window.LEARN_DATA = window.LEARN_DATA || {};
window.LEARN_DATA["ccdv-f"] = {
  title: "CCDV-F study notes",
  name: "Claude Certified Developer – Foundations",
  intro: "Every domain and skill from Anthropic's CCDV-F exam guide, with its official weight. Each skill has the lesson, the decision tables, the facts to know and the traps the questions are built around, linked to its episode and its build in the companion repo.",
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
        scope: "Principles and trade-offs of agent and workflow design: when to use a workflow versus an agent, manager and supervisor hierarchies, and how subagents improve task execution.",
        lesson: [
          "The first design decision is the pattern, and getting it wrong only shows up in production. A workflow is code that calls Claude at steps you have written down; you own the path and the model fills in each step. An agent is a loop in which the model chooses the next tool call; you give it a goal and a toolset and it finds the path. An agent used where a workflow would do adds context cost, harder debugging and behaviour that lives in transcripts. A workflow used where an agent is needed breaks the first time an input falls outside the path.",
          "Agents carry overhead: coordination, a growing context and more places to fail. Observability needs transcript-level tooling rather than ordinary logs. So the rule is to start with the simplest thing that works (a single call), move to a workflow, and reach for an agent only when the simpler pattern cannot handle the variation the task brings.",
          "Hybrids are often the right answer. A workflow runs the standard path deterministically and an agent is invoked only at the one decision point that needs judgement, such as an invoice in an unexpected format that must be rerouted, queried or flagged for a person.",
          "In a manager (supervisor) hierarchy, a top-level agent interprets the request, routes it, sequences specialised subagents and reconciles their outputs. Each subagent has its own tools and its own short history, isolated from the others. Isolation keeps each worker focused; the manager is where quality control lives: tool budgets per subagent, schema checks on outputs, and explicit hand-off contracts between stages."
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
          "Workflow for the standard path plus an agent at the exception point is often better than either pure form."
        ],
        build: ["Build: ep02-agents", REPO + "ep02-agents"],
        traps: [
          { move: "Use a fully autonomous agent for every invoice, standard or not", why: "Known steps gain nothing from model-directed control and still pay its cost and risk. Use a workflow for the standard path and call an agent only at the decision point." },
          { move: "Let subagents read each other's outputs and settle contradictions among themselves", why: "That removes the one place where checking happens. Strengthen the manager: tool budgets, schema checks and hand-off contracts." },
          { move: "Collapse the three subagents into one large-context call", why: "You lose focus and isolation, and the missing oversight is still missing. Fix the coordination layer instead." },
          { move: "Add retries and a shared trace log to each subagent so the team can audit later", why: "Auditing after the fact does not stop redundant calls or contradictions reaching the user. Enforce budgets and validation in the manager." },
          { move: "A multi-issue ticket just needs more detailed prompting to track what is resolved", why: "Prompting alone does not give each sub-issue its own state. An orchestrator with dedicated subagents does." }
        ]
      },
      {
        title: "Agent construction with Claude", w: 5.3,
        scope: "Methods, tools and platforms for building Claude agents: the Agent SDK, custom loops and harnesses, managed deployment (self-hosted or Anthropic-hosted), and hooks for deterministic actions.",
        lesson: [
          "There are three wiring paths for the same loop, ordered by how much runtime you hand off. A raw loop on the Messages API: your code sends each request, reads the tool_use blocks, runs the tools and appends the results. Full control, and every behaviour (context management, parallel tool handling, retries) is code you write and test. The Agent SDK: the same loop inside your own process, with tool execution plumbing, context management and iteration already built. Claude Managed Agents: Anthropic runs the loop and the execution sandbox server-side; you define the agent once (model, system prompt, tools, MCP servers, skills) as a versioned API resource, refer to it by id and stream results back.",
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
              ["Managed Agents", "Anthropic, server-side, with a sandbox", "Long-running tasks, you want a managed sandbox, no loop to build", "Server-side stateful sessions, agent-as-resource format, a beta surface"]
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
          "Self-hosting (bring your own cloud) is the answer when residency rules apply, even if the team wants to ship fast; reduce the operational load afterwards.",
          "Long tasks with clear checkpoints: persist intermediate state and resume from the last good checkpoint.",
          "Hooks give deterministic actions inside the agent; they run whether or not the model 'remembers' a rule."
        ],
        build: ["Build: ep02-agents", REPO + "ep02-agents"],
        traps: [
          { move: "We chose the Agent SDK, but we'll write our own loop and history layer next to it", why: "That rebuilds what you adopted the SDK to avoid. Let it handle the loop, dispatch and history." },
          { move: "Revert every customisation to SDK defaults to simplify maintenance", why: "Some were added for real reasons. Decide each on its original rationale and the SDK's current capability." },
          { move: "Ship on Anthropic-hosted infrastructure now and flag data residency for a compliance review after launch", why: "That breaches the policy from day one. Meet residency first (self-host), then cut the operational overhead." },
          { move: "Raise the timeout to hours so interruptions are rare enough to ignore", why: "Rare is not never. Checkpoint intermediate state and reload it on resume." },
          { move: "Run two copies of every long task and take whichever finishes first", why: "Double the cost and still no ability to resume. Checkpointing is the pattern." }
        ]
      },
      {
        title: "Agent patterns and frameworks", w: 4.9,
        scope: "Common agent design patterns (tool-use loops, subagents, memory, context-window management) and agentic frameworks for multi-step work.",
        lesson: [
          "The core pattern is the tool-use loop: the model calls a tool, reads the result and continues. Around it sit several named patterns. Prompt chaining feeds one step's output into the next. Routing classifies the input and sends it to the prompt or model built for it. Parallelisation runs independent subtasks at once, or the same task several times to vote. Orchestrator and workers has a lead agent decompose the task, fan out to subagents that work in parallel in their own contexts, and synthesise the answer. Evaluator-optimiser has one call generate and another critique until a bar is met.",
          "When work has to move back and forth between stages, a graph or state-machine pattern fits: for claim processing that iterates between fact extraction and eligibility checks before a decision, each stage is a node with its own success criteria and the claim's state decides the next move. A strict linear chain has no return path.",
          "Multi-agent is a cost decision. The course cites Anthropic's own research system: a lead with parallel subagents beat a single agent on internal evals, at roughly fifteen times the tokens. It pays off only when the work genuinely splits into independent parts (broad research across many sources); it is weak for tightly coupled work like coding, where each step depends on the last. Each subagent also needs its own retry and fallback handling.",
          "Memory scope is decided by the shape of the session. In-context memory is free to read but inflates every call and dies with the session. External storage survives sessions and can be shared between users or agent instances, at the cost of read and write logic and latency. Summarised memory is cheap but keeps only what the summariser prompt chose to keep. Stateless is right for self-contained jobs. Choosing at design time takes minutes; refactoring under production pressure takes much longer."
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
          "Subagents start clean: they do not inherit the parent's history or skills (they do inherit its permission context)."
        ],
        build: ["Build: ep02-agents", REPO + "ep02-agents"],
        traps: [
          { move: "Process every claim through a fixed linear chain with no return paths", why: "The work needs to go back a stage. Use a graph-based pattern driven by the claim's state." },
          { move: "One tool-use loop with every tool for every subtask", why: "Tool choice degrades and one context fills with unrelated history. Decompose to scoped subagents." },
          { move: "Store the whole research history in memory up front, before any subtask starts", why: "That is not decomposition. Use an orchestrator that hands each piece to a focused subagent." },
          { move: "Multi-agent is always better because it scored higher", why: "It costs many times the tokens. Use it only when the task genuinely splits into independent parts." }
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
        scope: "Functional and infrastructure requirements derived from business requirements and solution architecture.",
        lesson: [
          "A business problem is not yet a requirement. 'Help support agents answer faster' becomes functional requirements you can check: classify each ticket into one of four queues; draft a reply that cites the relevant policy; never auto-send without a person approving it.",
          "Infrastructure requirements are the non-functional constraints, and the business problem rarely states them. You derive them by asking: how fast must a response be, measured where the user is? How many requests, and at what peak? Where must data be processed? Which regulation applies? Who must be able to audit what? What is the cost ceiling?",
          "Write both down in a short requirements record, with the regulation each constraint comes from. The platform and model decisions will be reviewed by people who were not in the room; the record lets you defend the choice as following from requirements rather than familiarity. A design document goes further: success criteria specific enough to grade, the failures the system must survive (each marked retriable or terminal), the cost and latency budget with a reliability floor, and the trust boundary (which inputs are untrusted, which actions are allowed)."
        ],
        know: [
          "The first step on any 'make analysts faster' brief: interpret the functional and infrastructure requirements the goal implies.",
          "Functional = what it must do, checkable. Infrastructure = latency, scale, residency, regulation, audit, cost.",
          "Set cost and latency budgets before the architecture, so the design can be checked against them.",
          "Name the trust boundary on paper; it becomes least privilege you enforce with a hook.",
          "For a throwaway prototype with no regulated data, light notes are enough; a regulated deployment is not."
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
        scope: "Life-cycle concepts and frameworks for developing, implementing, operating and maintaining systems.",
        lesson: [
          "A Claude application moves through the same phases as any system: requirements (functional and infrastructure needs), design (platform, model and trust boundaries), build (agent, tools, prompts), test (evals plus unit, integration and end-to-end checks), deploy (pin the version, gate promotion on the eval), operate (instrument cost, latency and errors; enforce guardrails), and iterate (feed production findings back into requirements).",
          "Gates between phases are where a regulated engagement keeps control: no build until the platform meets the residency requirement; no full production until the new version clears the eval against the pinned baseline. Teams under deadline are tempted to skip gates. A one-off experiment may collapse phases; a regulated deployment cannot.",
          "Shipping is the start of the operate phase, not the end of the work: monitoring, responding to issues and planning the next change."
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
          "A formal testing strategy covers unit, integration (the Claude integration) and end-to-end tests for critical flows, applied consistently."
        ],
        build: ["Build: ep08-gate-checker", REPO + "ep08-gate-checker"],
        traps: [
          { move: "Shipping to production is the final stage", why: "Shipping starts operate-and-maintain: monitoring, fixing and planning evolution." },
          { move: "Hand the system to a separate operations team who run it independently", why: "No continuity. The team that built it operates and evolves it." },
          { move: "Hold a formal post-deployment review of the development phase before any further work", why: "Operating the live system can't wait on a retrospective." }
        ]
      },
      {
        title: "Claude API mechanics", w: 6.8,
        scope: "Messages, tools, streaming, vision, thinking, caching, calling Claude through third-party vendors, Messages API data access patterns, the batch API, and choosing realtime versus batch.",
        lesson: [
          "A Messages API request carries the model id, an optional system prompt, the list of messages (each a list of content blocks) and max_tokens. The API is stateless: you resend the conversation each turn. Content block types: text, image, document (PDFs), tool_use, tool_result and thinking. Every tool_use in an assistant turn must be answered by a tool_result with the matching id in the immediately following user turn, or the request fails validation. Keep the full content array when appending a turn, including any text block next to a tool_use.",
          "Read stop_reason on every response: end_turn (finished), max_tokens (cut off), tool_use (wants a tool), refusal (declined; arrives as an HTTP 200) or model_context_window_exceeded (the input fitted but generation hit the window ceiling, and the partial output is returned). An input already larger than the window is rejected with a validation error before generation.",
          "Streaming sends server-sent events: message_start, then per block content_block_start, content_block_delta and content_block_stop, then message_delta (carrying stop_reason and final usage) and message_stop. Tool inputs arrive as partial JSON across deltas and are not valid until the block stops. Rules: act on a block only after content_block_stop; commit a turn to history only after message_stop; on an interrupted stream discard the partial turn and retry the request.",
          "Vision and documents: an image costs about ⌈width/28⌉ × ⌈height/28⌉ visual tokens (a 1,000 × 1,000 image is about 1,296), with a per-image ceiling that varies by model. Send images as base64 (one-off), URL, or a Files API file_id (reused assets). PDFs use a document block with the same source options. Calculate image cost against the largest production input, not test thumbnails.",
          "The Message Batches API takes up to 100,000 requests or 256 MB per batch, returns a batch id to poll, and completes within 24 hours (often much sooner) at a lower per-token price. It suits nightly pipelines, eval runs and backfills; never anything a user is waiting on. Calling the synchronous API in a loop is not batching. Through third-party vendors (Amazon Bedrock, Google Vertex AI, Microsoft Foundry, Claude Platform on AWS) you call the same models with that platform's identity, endpoints and model-id formats; keep application logic provider-agnostic."
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
          "Token counting endpoint takes the same body as a messages call and returns the count without running inference."
        ],
        build: ["Build: ep03-messages", REPO + "ep03-messages"],
        traps: [
          { move: "Stream each of the 10,000 overnight emails into the database as tokens arrive", why: "Nobody is watching. Non-interactive work with a flexible deadline belongs on the Message Batches API." },
          { move: "Concurrent realtime calls finish the overnight job fastest, so use those", why: "Speed isn't the requirement; cost is. Batches are cheaper and the window is flexible." },
          { move: "Build on the direct API now and move to Bedrock in a later release", why: "The contract applies today. Use the Bedrock path from the start, with provider-agnostic logic." },
          { move: "Build two parallel implementations and pick the faster one at runtime", why: "Double the code, and one path still breaches the contract." },
          { move: "Parse the tool input as each delta arrives to save time", why: "Partial JSON isn't valid until content_block_stop. Act only on closed blocks." }
        ]
      },
      {
        title: "Software engineering foundations", w: 7.4,
        scope: "REST APIs, JSON, asynchronous programming, version control, SDLC integration, code review, and small- and large-scale refactoring.",
        lesson: [
          "Claude code is ordinary code and goes through the same discipline. In an async service (handling concurrent requests), use the SDK's async client in Python (AsyncAnthropic) or await the promise-based client in TypeScript, so Claude calls sit beside the rest of the event loop. Blocking the loop with synchronous calls, isolating calls in a separate thread pool, or rewriting the service as synchronous all fight the architecture.",
          "Every pull request runs the same quality gates as other services: automated tests of the Claude integration, linting and the team's usual checks. A full production deploy per PR is excessive; moving Claude tests to manual pre-release review leaves gaps before merge.",
          "Code review for a Claude feature asks for three things in one pass: prompt and model configuration moved out of inline code into a configurable location, error handling for API failures, and tests for the integration. Approving 'because it works on the happy path' lets known gaps ship.",
          "Refactoring: when prompt-handling code has gathered duplication and tangled control flow, plan a dedicated pass (consolidate, separate concerns, simplify) before adding features. For a deprecated API parameter used in about forty places with a six-month window: write regression tests for the current behaviour first, then migrate call sites in batches, each validated against the tests. A last-minute big-bang change risks a broad break; a permanent wrapper only delays the migration."
        ],
        code: { cap: "Async client in an async service (Python)", text: "from anthropic import AsyncAnthropic\nclient = AsyncAnthropic()  # reads ANTHROPIC_API_KEY from the environment\n\nasync def summarise(text: str) -> str:\n    msg = await client.messages.create(\n        model=MODEL_ID,          # pinned id from config, not inline\n        max_tokens=512,\n        messages=[{\"role\": \"user\", \"content\": text}],\n    )\n    return msg.content[0].text" },
        know: [
          "Async service → async client and awaitable Claude calls.",
          "CI on every PR: integration tests, linting, standard gates.",
          "Code review: configurable prompt/model, error handling, tests, all before merge.",
          "Deprecation: regression tests first, then batched migration.",
          "Tangled code that slows new features: a planned refactoring pass, not cleanup smuggled into feature tickets.",
          "No multi-provider need on the roadmap → integrate directly through the Claude SDK; an abstraction layer is cost without benefit."
        ],
        build: ["Build: ep03-messages", REPO + "ep03-messages"],
        traps: [
          { move: "Run Claude calls in a separate thread pool so the event loop is untouched", why: "It works against the async design. Use the async client and await the calls." },
          { move: "Approve the PR and add error handling and tests in a follow-up", why: "Known gaps ship and stay. Request configuration, error handling and tests now." },
          { move: "Migrate all forty call sites in one change just before the removal date", why: "One broad, hard-to-debug break. Add regression tests and migrate in validated batches." },
          { move: "Wrap the deprecated parameter in a helper so the codebase never has to change", why: "The parameter is still being removed. A wrapper only delays the work." },
          { move: "Add a multi-provider abstraction layer for long-term flexibility", why: "With no portability need, it adds complexity and a dependency for nothing. Use the Claude SDK directly." }
        ]
      },
      {
        title: "Claude application design", w: 8.6,
        scope: "Design considerations for Claude applications: how Claude interprets instructions across interfaces (Claude Code, Desktop, claude.ai, API, SDKs), content boundaries, schema design, session hygiene and plugin management.",
        lesson: [
          "Different interfaces load different context. claude.ai and Desktop add their own system behaviour and features; Claude Code loads CLAUDE.md, rules, settings and skills from the filesystem; the API gives you exactly what you send; the Agent SDK loads filesystem settings only if its settingSources configuration says so. Design for the interface your users actually run.",
          "Split work into calls by stage when stages have different inputs, outputs and success criteria: triage (classify) and response (draft) as separate, focused calls beat one call doing both. For long documents, decide which property matters (cross-section reasoning favours the whole document; per-section citation accuracy favours chunks) from the real use case, then validate on representative documents.",
          "Content boundaries: decide what may leave your application for the model, and filter or redact the rest at the boundary. Schema design: give downstream consumers a defined shape and validate against it.",
          "Session hygiene: define explicit expiry rules, triggers that reset state, and rules for starting a fresh session so stale context never leaks into a new conversation. Plugin management: track and pin plugin versions in project configuration so a regression can be traced to a version and upgrades are deliberate."
        ],
        know: [
          "Separate calls for stages with distinct success criteria (triage then response).",
          "Whole document versus chunks: let the use case decide which property matters, then validate.",
          "Session lifecycle = expiry rules + reset triggers + fresh-session rules, per session.",
          "Plugin versions tracked and pinned; upgrade on purpose.",
          "Agent SDK: CLAUDE.md and filesystem settings load only when settingSources includes them."
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
        scope: "Configuration management for Claude components: CLAUDE.md files, settings.json, model version pinning, prompt versioning and plugin dependencies.",
        lesson: [
          "Configuration that is scattered across environment variables, hard-coded values and undocumented scripts becomes a version-controlled record per environment: the pinned model version, the prompt version and the plugin dependencies for dev, staging and production. Environments may legitimately differ; the point is that every difference is written down and reviewable.",
          "Pin the model you ship. Aliases move to newer snapshots and can resolve differently across platforms. Per the course, from Claude 4.6 onwards the model id alone pins a snapshot; earlier models need the id plus a date suffix. Check the current convention in the docs. Promote a new version by sending a share of traffic, comparing with the pinned baseline on the eval, and promoting or rolling back.",
          "Prompts belong in one source of truth, under version control, with mandatory review; a recent unreviewed prompt change is the symptom of skipping this. CLAUDE.md and settings.json are versioned in the same repository as the code, changed through pull requests.",
          "Before rolling out a prompt or model change used by several downstream systems, assess the impact on each consumer and coordinate with their owners; staging tests alone don't show how each consumer reacts."
        ],
        know: [
          "Per-environment config in version control: model pin, prompt version, plugin dependencies.",
          "Prompts: single source of truth, versioned, reviewed.",
          "CLAUDE.md and settings.json live with the code and go through PRs.",
          "Assess downstream impact before a configuration rollout.",
          "Moving aliases are fine for a throwaway prototype; pinning is for what ships."
        ],
        build: ["Build: ep06-config-checker", REPO + "ep06-config-checker"],
        traps: [
          { move: "Stop pinning and run the latest model everywhere to cut maintenance", why: "Every upstream change becomes a silent production change. Pin and promote through the eval." },
          { move: "Hard-code all configuration so there are fewer sources to track", why: "Changes then need code edits and lose per-environment clarity. Use a versioned config record." },
          { move: "Make every environment identical to remove the differences", why: "Environments may need to differ. Document the differences instead." },
          { move: "Keep settings in a separate config repo so it evolves independently", why: "It loses its link to the code it governs. Version it with the code." },
          { move: "Staging passed, so log the change in the changelog and roll out", why: "Staging doesn't show every downstream consumer's reaction. Assess each and coordinate." }
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
        scope: "Core components (rules, skills, commands, agents, agent memory), features (session management, built-in and custom slash commands, headless mode, streaming mode, auto mode), the CLAUDE.md hierarchy, repository initialisation and settings.json.",
        lesson: [
          "Claude Code runs the agent loop in your terminal with a permission layer on top. It explores (reads files, traces logic), plans (a structured description of intended edits) and then codes once the plan is approved. Plan mode holds it in exploration, blocking edits and shell commands until you release it: the safe default for unfamiliar or high-stakes code.",
          "Permission modes trade speed for oversight: default (asks before edits and commands), acceptEdits (lets edits in the working directory through), plan (read-only until approved), auto, dontAsk, and bypassPermissions. Bypass removes every prompt and the protected-path guard; use it only in an isolated sandbox. Allow and deny rules sit on top of the mode; precedence is deny over ask over allow.",
          "Settings live at four levels. User (~/.claude/settings.json) follows you everywhere. Project (.claude/settings.json, committed) binds everyone who clones the repo. Local (.claude/settings.local.json, git-ignored) holds personal overrides. Managed or enterprise settings, set by administrators, cannot be overridden; a managed deny rule is the most durable control and holds even under a bypass mode.",
          "Durable context: CLAUDE.md at the repo root loads into every session; /init drafts one from the codebase and you then refine it. Keep it small, because every line dilutes the rule that matters. A CLAUDE.md hierarchy puts team-wide standards at a broad level and project specifics in each repo. Rules files in .claude/rules/ can carry a paths glob in their frontmatter so they load only when Claude works on matching files; without a paths field they load every session like CLAUDE.md.",
          "Hooks run your scripts at lifecycle events: PreToolUse (can block a call, by exit code 2 with the reason on stderr or a deny decision), PostToolUse (formatting, tests, audit logging; cannot block), UserPromptSubmit, Stop, Notification and SessionStart. Subagents run delegated tasks in an isolated context and return a summary; they don't inherit history or skills, and custom subagents in .claude/agents must list the skills they need. Skills live in .claude/skills/<name>/SKILL.md; only the name and description load at start, the body loads on match or on /skill-name. Plugins bundle skills, hooks, subagents and MCP servers, are installed from marketplaces, and namespace their commands (/plugin:command). Headless (print) mode runs Claude Code non-interactively for CI, with permissions from settings and output captured for the next step."
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
          "Place the human gate by worst-case cost: cheap reversible actions run; hard-to-undo or sensitive actions are gated; sensitive code is never reviewed by the agent alone."
        ],
        build: ["Build: ep07-guard-hook", REPO + "ep07-guard-hook"],
        traps: [
          { move: "Each developer sets project permissions with environment variables", why: "No consistency. Use the project-level settings.json committed with the repo." },
          { move: "Put the coding standards in the README and point developers at it", why: "Claude Code does not load the README automatically. Use CLAUDE.md." },
          { move: "Paste the skill as a long instruction at the top of every CLAUDE.md", why: "It loads every session and bloats context. Put it in the skills directory to load on demand." },
          { move: "Disable confirmation prompts globally so the pipeline never stalls", why: "That removes the gates everywhere. Run headless with scoped permissions for the pipeline." },
          { move: "Have a developer approve each prompt while the CI job runs interactively", why: "That defeats automation. Headless mode with pre-approved permissions." },
          { move: "Make one repo's CLAUDE.md the central source and link to it from the rest", why: "Linking doesn't scope. Use broad and project-level CLAUDE.md files in a hierarchy." }
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
        scope: "Identifying error types, choosing recovery strategies, trace analysis to find failure modes, and isolating whether a problem comes from the integration layer or the model's output.",
        lesson: [
          "Every failure starts with one question: would waiting and sending the identical request again plausibly work? If yes it is retriable (429 rate limit, 529 overloaded, 500, 502, 503, 504, timeouts, dropped streams). If no it is terminal (400 bad request, 401, 403, 404); retrying wastes time and budget. Repeated timeouts on expensive requests mean fix the request, not retry it.",
          "The SDK already retries transient failures with progressive delays, up to a configurable number of attempts. Know that before adding your own loop: two loops wrapped round the same call multiply retries. Honour the retry-after header that 429 and 529 responses carry; it is more precise than guessing. A 529 reflects Anthropic-side load, not your rate limit.",
          "When a tool fails, return a tool_result with is_error set to true and a useful message. The model can then retry, change approach, ask or stop. An empty result is read as valid data and the agent carries on confidently on a false premise.",
          "Traces record each step of a run: the prompt, tool calls, intermediate outputs, timings and stop reason. They turn 'the case failed' into 'step four, the parser, raised a KeyError on a field the model did not return'. Compare a good run with a bad run, then name the failure mode before choosing a fix: model hallucination, lost context, prompt injection, format drift, a refusal trigger, a truncation, or a fault in your own integration.",
          "Evals define done: a set of cases, expected behaviour and a grader. Exact match for single correct answers (cheap, brittle); code checks for structure (valid JSON, fields present, values in range); an LLM judge for open-ended quality, asked for strengths, weaknesses and reasoning before the score, and calibrated against human-labelled cases. Twenty varied cases with slightly noisy grading beat three perfect ones. Change one thing at a time. Test levels each see a different break: unit (one function), functional (one Claude call's shape), integration (the hand-off between two components, where silent failures hide) and end-to-end (the whole flow, which shows something broke but not where)."
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
          "Integration fault or model fault? The trace shows which step produced the bad value."
        ],
        build: ["Build: ep09-failure-checker", REPO + "ep09-failure-checker"],
        traps: [
          { move: "Remove or tweak the suspect instructions and see if the refusals stop", why: "That guesses before diagnosing. Examine traces of the refused requests to find the trigger." },
          { move: "It's hallucinating, so move to a bigger model", why: "It may be lost context or injection. Read the traces first." },
          { move: "Lower the temperature and re-run the inconsistent inputs", why: "Skips root cause. Capture full traces and compare good and bad runs." },
          { move: "Retry the same request until valid JSON appears", why: "Blind retries add latency with no guarantee. Validate and use a defined retry or fallback path." },
          { move: "Page on every error so nothing is missed", why: "Alert fatigue hides the real outage. Route by severity." },
          { move: "Treat inconsistency as normal non-determinism and document it", why: "Variation is expected; persistent inconsistency on similar inputs is a bug to trace." }
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
        scope: "Tokens, context windows, sampling, non-determinism and next-token generation; model options (fast mode, extended thinking, adaptive thinking, effort levels); zero-shot, single-shot and multi-shot prompting.",
        lesson: [
          "Claude reads and writes tokens, not characters or words. The characters-per-token ratio depends on the model's tokeniser and changes between generations, so count with the API (the count_tokens endpoint), not a rule of thumb. Everything is counted: system prompt, history, tool definitions, tool results and the reply. Tokens are the unit of price and of the context budget.",
          "The context window is one fixed budget for everything in a request, including the output. Input already larger than the window is rejected with a validation error before generation. Input that fits can still hit the ceiling during generation; current models then stop and return what they have with stop_reason model_context_window_exceeded.",
          "At each step the model produces a probability distribution over next tokens and samples from it. Temperature shapes that distribution (lower is more repeatable, higher more varied); note that the newest models do not accept non-default sampling parameters. Because output is sampled, the same prompt can give different wording when both answers are correct. That is generation, not a bug in your request code, and it is why tests assert properties (a field is present, a value is in range, the output parses) and use a judge for meaning, not exact text.",
          "Choosing a model and choosing whether it reasons are independent levers. On current models reasoning is adaptive thinking: the model decides how much to think and you tune depth with an effort level; the older budget_tokens control is deprecated and returns an error on the newest models. Thinking tokens bill like output tokens, so enable reasoning for multi-step work (derivations, multi-hop logic, planning dependent actions, weighing competing hypotheses) and leave it off for lookups, classification and format conversion. Fast mode trades reasoning depth for latency.",
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
          "In tool loops, thinking blocks (and redacted thinking blocks) go back to the API exactly as received, or the next request fails."
        ],
        build: ["Build: ep01-models", REPO + "ep01-models"],
        traps: [
          { move: "The output varies run to run, so the request construction has a bug", why: "Token-by-token sampling varies the wording. That's how generation works, not a request bug." },
          { move: "The variation comes from network latency, or from Claude being updated continuously", why: "Neither. It's sampling. Explain it and show how the app validates and retries." },
          { move: "Raise the temperature (and max_tokens) to fix context-window limits", why: "Temperature is about randomness, not capacity. Summarise or chunk the input." },
          { move: "Fine-tune a custom model on the handful of edge-case examples", why: "Disproportionate. Put the labelled examples in the prompt as few-shot examples." },
          { move: "Store the examples in a database for the model to find at inference", why: "The model only uses what's in its context. Without retrieval wired in it never sees them." },
          { move: "Use fast mode or a smaller model for multi-step clinical reasoning", why: "Both cut reasoning depth. Extended thinking fits a task that needs intermediate reasoning." }
        ]
      },
      {
        title: "Technical fundamentals", w: 6.1,
        scope: "Engineering practices that support AI applications, including SDKs that wrap REST APIs, and WebSockets.",
        lesson: [
          "Claude is reached over an HTTP REST API: your code sends a JSON body with your key to an endpoint and reads JSON back. The official SDKs (Python, TypeScript and others) are a thin layer over the same API that handle authentication, request building, retries and response parsing. Same API, same model, less boilerplate. Use the SDK through its documented patterns unless you have a specific reason not to.",
          "Three response shapes. Synchronous: send and wait for the whole reply; fine for short responses and back-end jobs. Streaming: the reply arrives as server-sent events while it's generated, so a watching user sees text immediately. Asynchronous: Python's AsyncAnthropic (or awaiting TypeScript's promise-based client) lets your app do other work while calls are in flight; it is still a realtime call, just non-blocking. The Message Batches API is a separate pattern for bulk offline work.",
          "The SDK retries many transient errors by default with backoff; the number of retries and the timeouts are configurable. Tune or extend that behaviour rather than wrapping a second retry loop round it.",
          "For a persistent, bidirectional, real-time connection to a service that streams updates, use a WebSocket. Repeated short HTTP polls, an HTTP request held open without framing, or polling files on disk are all poorer fits."
        ],
        know: [
          "SDK = auth, retries, parsing, over REST. Raw HTTP is extra work, not extra capability.",
          "Sync for short jobs, streaming when a person watches, async for concurrency, batches for bulk offline.",
          "SDK default retries cover many transient errors and are configurable.",
          "Persistent bidirectional real-time link → WebSocket.",
          "Python application → the Claude Python SDK, not shelling out or another provider's SDK."
        ],
        build: ["Build: ep03-messages", REPO + "ep03-messages"],
        traps: [
          { move: "Call the REST API with raw HTTP to avoid the SDK's abstraction", why: "You re-implement auth, retries and parsing for nothing." },
          { move: "Use another provider's SDK and translate responses, for future portability", why: "Fragile translation for portability nobody asked for." },
          { move: "The SDK retries a fixed number of times and you can't change it", why: "Retries are on by default and configurable." },
          { move: "The SDK retries network errors but leaves rate limits entirely to you", why: "Default retries cover many transient errors; tune them rather than assume nothing happens." },
          { move: "Poll the streaming service with short-lived HTTP requests", why: "A persistent bidirectional connection is what WebSockets are for." }
        ]
      },
      {
        title: "Model selection and tradeoffs", w: 2.7,
        scope: "Model capabilities (Opus, Sonnet and Haiku use cases, adaptive thinking support), trade-offs across quality, latency and cost, and breaking behaviour changes between model releases.",
        lesson: [
          "The course describes four tiers: Fable (most capable, for the hardest reasoning, coding and agentic work), Opus (demanding work above Sonnet), Sonnet (the balanced default for most production work) and Haiku (speed and cost efficiency for tasks within its range). Confirm the current line-up and prices in the docs on the day.",
          "Start on Sonnet. Move up only when an eval shows the current tier missing your quality bar on the hardest cases and a wrong answer is costly. Move down only when an eval shows the cheaper tier holding the bar on the bulk of traffic. Quality, latency and cost interact, and a bigger model can even be cheaper if it finishes in fewer tokens. Fit all three together rather than optimising one first and checking the others later.",
          "Routing: a default model with an override chosen from a cheap signal (task type, input length, a difficulty classification). Uniform traffic at one quality bar doesn't need a router; pin one model.",
          "New releases can change behaviour your app depends on, such as output format. Adapt the prompts to the new model, re-run the eval against what the downstream parser expects, and roll out behind a feature flag with a per-workflow way back. Upgrade only once the regression is gone, not because the headline gain outweighs it."
        ],
        know: [
          "High-volume, simple, latency- and cost-sensitive classification → a smaller, faster model.",
          "No targets given ('use whatever gives the best results') → ask for quality, latency and cost targets first.",
          "Model changes are promoted on a measured eval, in both directions.",
          "Breaking format change on upgrade → adapt prompts, re-evaluate, flag-gated rollout with revert."
        ],
        build: ["Build: ep01-models", REPO + "ep01-models"],
        traps: [
          { move: "Pick the largest model because 'best results' means highest quality", why: "No targets, no basis. Get quality, latency and cost targets, then choose." },
          { move: "Run every model on a generic benchmark and take the winner", why: "A generic benchmark isn't your workload or your trade-offs." },
          { move: "Default to a mid-tier model because it suits most tasks", why: "A default skips the decision the task needs." },
          { move: "Upgrade now: an 8% reasoning gain outweighs 3% malformed output", why: "That ships a known regression. Adapt the prompt and re-evaluate first." },
          { move: "Upgrade and add a downstream check to catch the malformed share", why: "Still ships the regression and pushes the cost downstream." },
          { move: "Stay on the old model permanently to avoid format changes", why: "Freezing forfeits the gains and every future release. Adapt and re-validate." },
          { move: "Swap the model id and fix parsing failures as they surface", why: "Users find your regressions. Constrain the format, re-evaluate, ship behind a flag." }
        ]
      },
      {
        title: "Cost and token management", w: 2.8,
        scope: "Token budgeting and cost management: token usage tracking, cost modelling, and caching techniques (prompt caching, cache checkpointing).",
        lesson: [
          "Instrument every call with three metrics: input and output tokens, latency and error rate, aggregated per request and per feature. A cost spike then becomes 'which step on which request type' instead of 'why is the bill high'. Untracked cost growth starts with adding per-feature tracking, not with uniform cuts.",
          "A cost projection combines request volume, average input tokens, average output tokens, the chosen model's prices (output is typically priced higher than input) and any caching saving. Borrowing another app's per-request average, or leaving output tokens out, makes it unreliable.",
          "Prompt caching stores the processing of a stable prefix so later requests that start identically read it back cheaply. Requests are processed in a fixed order (tools, system prompt, messages), so put stable content first. Turn it on with automatic caching (one top-level flag, the recommended start) or explicit cache_control breakpoints of type ephemeral (up to four), which cache everything up to and including that block. The prefix must match exactly; one changed character invalidates it. There is a minimum cacheable length that varies by model. The default lifetime is five minutes, refreshed on each hit; a one-hour lifetime costs more. Per the course, cache writes are billed at a premium (1.25x for five minutes, 2x for one hour) and reads at a small fraction of the base input price. A cached prefix may be stale for as long as it lives.",
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
          "Pruning reduces volume; caching reduces the cost of repeated tokens. Different problems."
        ],
        build: ["Build: ep01-models", REPO + "ep01-models"],
        traps: [
          { move: "Cut token usage by half evenly across all features", why: "Blind cuts hit features that need their tokens. Measure per feature first." },
          { move: "Switch every feature to the smallest model", why: "Cuts quality where it's needed. Find the costly features first." },
          { move: "Cost growth is unavoidable at scale; there's no point investigating", why: "Per-feature tracking usually finds a lever." },
          { move: "Cache the model's output so similar queries skip the call", why: "That's a response cache with its own staleness risk. Prompt caching reuses the input prefix." },
          { move: "Leave output tokens out of the projection", why: "Output is usually priced higher per token. Model both." },
          { move: "Move every chat turn to the Batch API to cut cost", why: "Batches can take hours and users are waiting. Cache the static context instead." }
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
        scope: "Context and memory management: window management, preventing context drift and bloat (tool-output pruning, compaction), and context isolation through subagents or multi-step workflows.",
        lesson: [
          "Every tool result is appended to the window and stays for the rest of the session. In production, tool outputs run three to five times longer than test fixtures, so a session that held fifty turns in development can fill at turn eight. Context engineering is deciding in advance what enters the window, what comes back out as a summary and what never enters at all.",
          "Four strategies. Pruning removes tool outputs no later step needs. Compaction summarises older history into fewer tokens (/compact in Claude Code; server-side compaction in the API, or your own summariser). Subagent hand-offs spawn a worker in its own window with only its task and return a short summary. Clearing starts fresh (/clear, or a new API session) when nothing needs to carry over.",
          "Compaction keeps only what the summariser keeps. 'Summarise the conversation so far' loses file paths and decisions; 'summarise, preserving every file path modified, every decision made, and every error with its resolution' keeps the task-critical state.",
          "Drift: after many turns or tool calls the model gives stale content too much weight or ignores early constraints. Compaction keeps the gist while lowering the weight of old specifics. Use the count_tokens endpoint to measure pressure before a request fails. Retrieval (RAG) brings in only the slice a request needs; it can break at chunking (too small loses context, too large dilutes; use a little overlap), at the embedding match (semantic search can miss an exact identifier, so lexical search sometimes runs alongside) or at assembly into the prompt."
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
          "Thinking blocks can't be stripped to save context; manage history around them."
        ],
        build: ["Build: ep04-prompting", REPO + "ep04-prompting"],
        traps: [
          { move: "Increase the context window so every tool output stays in full", why: "Buried information stays buried and cost grows every turn." },
          { move: "Restart the agent every five tool calls to prevent drift", why: "It throws away task state it needs. Compact instead." },
          { move: "Truncate to the most recent turn to keep costs low", why: "Loses needed continuity. Summarise older turns." },
          { move: "Switch to a framework that advertises automatic context management", why: "Doesn't address the cause in your loop." },
          { move: "Merge tools into larger multi-purpose tools to cut the number of calls", why: "Fewer calls, worse selection, same buried results." },
          { move: "Give every step the full prior history so it has everything", why: "Works against isolation; scope each step to what it needs." }
        ]
      },
      {
        title: "Prompt engineering", w: 4.6,
        scope: "Instruction clarity, few-shot examples, system versus user placement, output constraints, prompt and instruction placement across components, iterative refinement, prompt adjustment and input sanitisation.",
        lesson: [
          "Four techniques give a reliable output shape. A system prompt carries the behavioural contract for the whole session: role, format and rules that must not change. XML tags separate instructions from data and examples from the task. Few-shot examples show the exact pattern. Output constraints name the form, the field names and where to stop.",
          "Diagnose before re-prompting. Output in the wrong shape means a missing output constraint. Wrong content or drift across turns means an underspecified system prompt. Correct task but invented structure means examples are needed. Good on simple inputs but broken on edge cases means no constraint covers that variant. Rewording rarely helps, because none of these are phrasing problems. If a prompt grows longer with every pass, you are skipping diagnosis. Don't stack all four techniques on a task that needs one.",
          "Placement: behavioural and format instructions belong in the system prompt, consolidated in one place; user messages carry the user's input. Instructions scattered across both, some repeated, cause inconsistency. A prompt that has grown to hundreds of lines with overlapping, contradictory and obsolete rules needs an audit and refactor, not another rule on top.",
          "Iterate with evals: change the prompt to target the weak category, run the eval to confirm it improved and that common cases didn't regress, repeat. Untrusted input is sanitised and wrapped in tags as data before it goes into a prompt."
        ],
        code: { cap: "Output constraint + tags + few-shot (support ticket classifier)", text: "System: You are a support classifier. Classify each ticket into exactly one of:\nBILLING, TECHNICAL, ESCALATION. Return only the label. No other text.\n<sample_input>My account shows two charges for April.</sample_input>\n<ideal_output>BILLING</ideal_output>\n<sample_input>The API keeps returning a 429 error.</sample_input>\n<ideal_output>TECHNICAL</ideal_output>\n\nUser: <ticket>I was charged twice for the same month.</ticket>" },
        know: [
          "Downstream rejects anything off-schema → spell out the schema and say produce only conforming output (then enforce it in the API; see Output handling).",
          "A small set of labelled examples showing the format → multi-shot prompting.",
          "Prompt underperforms on a growing category → iterate on it and validate with evals.",
          "Write descriptions as decision rules: when to, and when not to."
        ],
        build: ["Build: ep04-prompting", REPO + "ep04-prompting"],
        traps: [
          { move: "Move all instructions into the user message to control behaviour at input", why: "Instructions belong consolidated in the system prompt." },
          { move: "Repeat every instruction in the system and user messages so it's seen twice", why: "Duplicates drift apart and conflict." },
          { move: "Add more rules so the newest ones dominate", why: "Deepens the contradictions. Audit and refactor." },
          { move: "Fix only the contradictory rules now and the rest later", why: "Overlap and dead rules keep causing confusion. Refactor the whole prompt." },
          { move: "Split the prompt across several system prompts so the model sees less at once", why: "Moves the mess without removing it." },
          { move: "Replace the prompt with one tuned for the weak category and accept a dip elsewhere", why: "Iterate, and prove with evals that common cases still hold." },
          { move: "Let Claude choose whichever format suits each request", why: "Downstream rejects what doesn't match. Constrain the format." }
        ]
      },
      {
        title: "Output handling", w: 2.6,
        scope: "Producing, validating and consuming Claude output: structured output patterns, response validation, defensive parsing, and scepticism toward confident output.",
        lesson: [
          "A prompt asks for a shape; structured outputs enforce it. With JSON outputs (output_config.format with a json_schema) the final response is constrained to your schema during generation. With strict tool use (strict set to true on a tool) the arguments Claude passes to that tool are validated against its input schema. Costs: the first request on a new schema compiles a grammar (cached for 24 hours from last use), the API adds a small format prompt you pay for, and JSON outputs can't be combined with prefilling the assistant message.",
          "A guaranteed schema is not a guaranteed success: a refusal (stop_reason refusal) or a truncation (stop_reason max_tokens) still returns output that doesn't match. Always check stop_reason before parsing.",
          "Treat validation failure as an expected error path: retry, repair or fall back before failing the user's request. Never pass malformed output downstream, drop it silently or switch validation off. Parse defensively: handle unexpected fields, missing values and type mismatches rather than crashing.",
          "Fluent, confident phrasing is not a reliability signal. Before generated text is treated as ground truth, add validation steps, sourcing requirements or confidence calibration."
        ],
        know: [
          "Full loop: define the schema, prompt for it, enforce or validate it, then pass it on.",
          "Occasional malformed JSON → validate against the schema; a recognised error path with retry or fallback.",
          "Defensive parsing for unexpected fields, missing values and wrong types.",
          "Check stop_reason: refusals and truncations break the schema guarantee.",
          "Confident ≠ correct: validate before downstream systems trust it."
        ],
        build: ["Build: ep04-prompting", REPO + "ep04-prompting"],
        traps: [
          { move: "Treat every validation failure as terminal and fail the request", why: "Retry, repair or fall back first." },
          { move: "Disable validation until the root cause is fixed", why: "Bad output flows downstream in the meantime." },
          { move: "Pass validation failures to each downstream system to handle", why: "Pushes the failure onto every consumer." },
          { move: "Silently drop output that doesn't match", why: "Hides failures. Handle them as a recognised path." },
          { move: "Have a person inspect every response for malformed JSON", why: "Doesn't scale. Validate in code." },
          { move: "Lower the temperature so answers sound less confident", why: "Tone isn't accuracy. Add validation and sourcing." },
          { move: "Add a 'please verify' disclaimer as the main control", why: "Doesn't make the content correct." }
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
        scope: "Prompt injection awareness and mitigation, jailbreak defence, untrusted input handling, data leakage prevention, PII handling, and authentication, authorisation, confidentiality, privacy and integrity.",
        lesson: [
          "The model reads its whole context as one stream of tokens; nothing marks which text you wrote and which a fetched page smuggled in. Prompt injection hides instructions in content the agent reads: web pages, shared documents, database records, email bodies, tool results. It can be indirect, planted now for the agent to read later. Trusting your users doesn't help, because the hostile text usually arrives in retrieved content.",
          "The defence follows from the mechanism. Treat fetched and user-supplied content as data to examine, never as instructions to follow: validate and sanitise it, wrap it in delimiters and tell the model the contents are data. That lowers the odds. What bounds the damage is limiting what the model can do afterwards: least-privilege tools, and a hook that refuses sensitive actions triggered while handling untrusted input.",
          "A jailbreak tries to make the model ignore its own safety constraints; an injection tries to hijack your application's instructions. Different targets, same layered shape: validate what reaches the model and constrain what it may do.",
          "Data boundaries: define the application boundary, decide what may cross it to the model, and filter or redact sensitive data (account numbers, passwords, PII) before the call. Logging and reviewing later, or asking the model to ignore sensitive data, doesn't prevent the exposure."
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
          "Zero data retention eligibility varies by model and platform; confirm it per model."
        ],
        traps: [
          { move: "Add XSS and SQL injection to the threat model; that covers the Claude app", why: "Those are traditional threats. Add injection, leakage, jailbreaks and unsafe output." },
          { move: "The SDK is the only new attack surface, so watch its supply chain", why: "The model's inputs and outputs are the new surface." },
          { move: "Tell Claude in the system prompt to disregard sensitive data", why: "It has already left your boundary. Redact first." },
          { move: "Filter the common sensitive patterns now and add more from production findings", why: "Every gap leaks until it's found. Define what may cross the boundary up front." },
          { move: "Route untrusted input through a second app with laxer controls", why: "Moves the risk somewhere weaker." },
          { move: "Block all external input", why: "Throws away legitimate use. Validate and treat it as data." },
          { move: "Raise the temperature or use a bigger model against hidden instructions", why: "Neither is a control. Isolate untrusted content and gate actions." }
        ]
      },
      {
        title: "Guardrails and safe deployment", w: 2.3,
        scope: "Safe and responsible deployment (content policy, guardrail layering) and secure-by-design principles (privacy, identity and access management, least privilege).",
        lesson: [
          "Security is layered and each layer has a job. Model training and classifiers reduce how often an injection lands. Treating content as data reduces how often a landed injection is acted on. Least privilege and locked configuration bound what a successful action can reach. Hooks enforce those bounds before the action and log it. OS-level sandboxing holds when a hook or rule doesn't cover a path or endpoint.",
          "A content policy that must never be broken needs deterministic output filtering in code before responses reach users. A stronger system prompt is probabilistic; user reporting acts after the harm.",
          "Least privilege is a design principle: give each identity, tool and component the narrowest access its task needs, with explicit denies. Assume an injection gets through everything else: what happens next is bounded entirely by what the agent is allowed to touch. Editing the agent's role is itself a privileged action and belongs behind the same protection as the secrets.",
          "Regulated reviewers ask three things early: where is data processed (residency), how is access logged (audit trail), and can an administrator lock the configuration centrally (managed settings). Name them during scoping."
        ],
        code: { cap: "Least-privilege role (illustrative)", text: "api_key = os.environ[\"SERVICE_API_KEY\"]      # from the environment, never committed\nagent_role = Role(\n    allow_write=[\"/workspace/output\"],          # one write path\n    allow_read=[\"/workspace/input\"],\n    deny=[\"/etc\", \"/secrets\", \"~/.aws\"],        # explicit denies bound the blast radius\n)" },
        know: [
          "Guardrail strategy: layer several, so a single failure doesn't expose the app.",
          "Hard content policy → a deterministic output filter before delivery.",
          "Least privilege for every identity and component; the app is only as contained as its most privileged seam.",
          "Data residency, audit logging, managed configuration: the regulated trio."
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
        scope: "Using hooks for guardrails and safety controls that prevent destructive actions.",
        lesson: [
          "A rule in CLAUDE.md is followed most of the time; a hook runs every time, because it fires independently of what the model decides. That is the difference between a convention and a guardrail.",
          "A PreToolUse hook sees the tool call before it runs and can block it (exit code 2 with the reason on stderr, or a deny permission decision), so a destructive database query or a write outside the permitted path never executes. A PostToolUse hook can't block, but it can log every call and its parameters to an audit store a compliance reviewer can inspect. When several hooks or rules apply, deny beats ask beats allow.",
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
        scope: "Managing secrets, credentials and API keys across development and production: identity validation and authentication, access approval and level verification, and monitoring authorised access.",
        lesson: [
          "Three practices. Separation: a credential never travels with the configuration that references it; the file holds a variable name and the value lives elsewhere. Storage: an environment variable injected at run time for one machine or pipeline, a secrets manager for values several services or people need. Rotation: on a schedule and immediately after any suspected exposure. A key in repository history stays exposed even after you delete the file, so only a new key fixes it.",
          "Use distinct keys per environment (dev, staging, production) so a compromise in one doesn't reach the others. Scope each credential to the narrowest access its task needs, and record which services use each one, so a rotation doesn't surprise anyone.",
          "Authentication patterns: OAuth for remote services with user identity (the server returns 401 and the client runs a browser sign-in); environment-held service credentials for internal APIs; file-system permissions and deny rules for local resources. Audit with PostToolUse logs; let administrators lock the auth configuration through managed settings."
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
          "Never put an API key in .mcp.json; reference an environment variable or use OAuth."
        ],
        traps: [
          { move: "Use one key across all environments for simplicity", why: "A leak anywhere exposes everything." },
          { move: "Rotate the same key at random intervals across environments", why: "Rotation isn't isolation. Use distinct keys." },
          { move: "Use the dev key everywhere because production keys are risky to deploy", why: "No isolation, and production runs on a dev credential." },
          { move: "Check the config file with the keys into the repo", why: "Permanent exposure in history." },
          { move: "Email keys to developers to paste locally", why: "Uncontrolled copies. Use a secrets manager." }
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
        scope: "Tool use and function calling, configuration for external systems, writing tool descriptions, error handling, usage patterns (agentic harness dispatch, client-side versus server-side tools, approval patterns) and building a good tool set.",
        lesson: [
          "The common misconception is that Claude runs tools. It reads your definitions, decides which fits and returns a tool_use block (name, unique id, input). Your code executes the tool and sends a tool_result with the matching id in the next user turn; Claude continues from there. If your code doesn't complete that step, the loop breaks. Client-side tools are executed by your code; server-side tools are executed on Anthropic's platform.",
          "A tool definition has a name, a description and an input_schema (JSON Schema). Claude routes on name plus description, with parameter types as a secondary signal; when two tools share a signature, routing falls to the description alone. Write three or four sentences: what it does, when to use it, what it returns, and an exclusion condition (when not to use it). Mark as required only what's truly needed, or Claude has to invent values; give optional fields defaults. If two tools need ever-longer descriptions to stay apart, merge them into one tool with a type parameter.",
          "Validate arguments against the schema before dispatching, or set strict to true so the API validates them, and return a structured error the agent can retry against. Keep the schema strict; loosening it lets invalid calls reach downstream services. Handle the external service's failures explicitly and return them with is_error.",
          "Independent calls can run in parallel (several tool_use blocks in one turn, which current models do by default); dependent calls run in sequence across turns; disable_parallel_tool_use forces one per turn. Over-tooling is the common production problem: selection quality drops as the tool surface grows, so start minimal, consolidate overlaps and remove unused tools. Approval patterns put a person before destructive tools."
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
          "Exclusion conditions rely on full history being passed; truncated history breaks them silently."
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
          { move: "Add examples to each overlapping tool's description as the fix", why: "Treats the symptom. Remove the overlap." }
        ]
      },
      {
        title: "MCP server development", w: 2.1,
        scope: "Authoring and deploying MCP servers, integrating them with Claude applications, MCP resources, tools and prompts, and communication patterns (stdio, sockets, client versus server).",
        lesson: [
          "Wiring a tool into one application puts its schema and code in that app; three apps means three integrations. An MCP server separates the capability into its own process that any MCP client can use: build it once and every client gets it. It exposes tools (actions the model calls), resources (read-only data the client fetches into context by address; direct resources have fixed addresses, templates take parameters) and prompts (vetted instruction templates invoked by name). The tool-use loop doesn't change: the client lists the server's tools and passes them to Claude.",
          "Transport follows where the server runs. stdio: the client launches the server as a local subprocess and talks over standard input and output; right for local tools and personal scripts, and avoids network setup. Streamable HTTP: the server runs remotely and clients connect over the network; right for shared or team servers (SSE is the older remote transport). A stdio server can't be shared across a team because it runs on one machine. Per the course, the API's MCP connector supports only remote servers.",
          "Scope decides who loads it in Claude Code: local (just you, this project, stored in ~/.claude.json), user (you, every project), project (.mcp.json committed at the repo root, for everyone who clones) and enterprise (pushed by administrators). Secrets go in environment variables or OAuth, never inline in .mcp.json. Permission rules can target single tools as mcp__server__tool.",
          "Each connected server adds tool definitions to the context. By default Claude Code defers them and searches for tools on demand; on the API connector an mcp_toolset can defer loading or disable individual tools. Connect only the servers a task needs. A server several applications use needs clear definitions, a chosen transport and deployment somewhere they can all reach."
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
          "Use an existing, maintained server when one covers your operations; write schemas yourself when none does or you need precise control."
        ],
        build: ["Build: ep05-tools-mcp", REPO + "ep05-tools-mcp"],
        traps: [
          { move: "HTTP is always preferable, even for a local server", why: "stdio fits a local process with no network setup." },
          { move: "Run stdio and HTTP together for redundancy", why: "Needless complexity." },
          { move: "Scope the server to the first app and extend it per request", why: "Defeats a shared server. Define it for reuse from the start." },
          { move: "Deploy it on developer machines only", why: "Other apps can't reach it." },
          { move: "Commit the API key in .mcp.json so teammates can connect", why: "It's in repo history for good. Use an environment variable or OAuth." }
        ]
      },
      {
        title: "Agentic customisation", w: 4.1,
        scope: "Trade-offs among built-in tools, custom tools, skills and MCP servers for a given use case.",
        lesson: [
          "Pick the mechanism by scope, reuse needs and integration context, not familiarity, novelty or ease of building. A built-in tool fits when it covers the need; when it nearly does, decide whether the missing feature can be added by extending it or genuinely needs a custom tool. A custom tool fits a capability specific to one application.",
          "A skill bundles instructions, scripts and data into a package the model loads as a unit when a request matches its description; only the name and description cost context until then. Write the description as the matching criterion, don't assume a local filesystem (a skill that shells out works in Claude Code but breaks on the API, where skills run in a code-execution container), and remember subagents don't inherit skills.",
          "An MCP server exposes tools, resources and prompts through a standard client interface, so many applications and teams can connect, and it's maintained independently of any one app. Skills and MCP servers are both built for independent reuse across teams; they solve different problems. A shared library each team imports and keeps in sync, or copying a tool between agents, gives you neither."
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
          { move: "Built-in tools can reach any internal REST API", why: "They can't. Expose it through an MCP server or a custom tool." }
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
        traps: []
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
