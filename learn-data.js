/* Interim CCAO-F study notes (short draft), replaced by learn-data-ccao-f.js when that ships.
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
const AO = "https://github.com/CorporateChittyChat/claude-certification-prep/blob/main/ccao-f/";
const WQ = AO + "practice/episode-questions.md#";

window.LEARN_DATA = window.LEARN_DATA || {};
Object.assign(window.LEARN_DATA, {
"ccao-f": {
  title: "CCAO-F study notes",
  name: "Claude Certified Associate Operator – Foundations",
  intro: "The seven exam domains, each split into what you need to know and the traps the questions are built around. Read a domain, watch its episode, try its worked question, then test yourself.",
  asOf: "3 November 2026",
  exam: "ccao-f/practice/mock-exam-player.html",
  flash: "flashcards.html?track=ccao-f",
  path: "path.html?track=ccao-f",
  repo: "",
  overview: [
    ["▶", "EP 00 · Before you book: five things to know (4 min)", YT + "NmGsB9LPrB0"],
    ["📄", "Exam logistics", AO + "exam-logistics.md"],
    ["🗂", "Recap deck (PDF)", "ccao-f/assets/ccaof-recap-deck.pdf"]
  ],
  domains: [

  /* ---------------------------------------------------------------- D1 */
  {
    id: "d1", code: "D1", title: "Prompting and task execution", eps: "EP 01", t: 0,
    summary: "Writing prompts a colleague could follow, splitting big jobs into steps, improving prompts against criteria, and fitting the strategy to the task.",
    links: [
      ["▶", "Watch EP 01 (7 min)", YT + "iF-ohGig97A"],
      ["📘", "Full study guide", AO + "domains/01-prompting.md"],
      ["❓", "Worked question Q1", WQ + "q1--domain-1-the-format-lottery"]
    ],
    highlights: [
      "Colleague test: if someone with no background would be confused by the prompt, Claude is too.",
      "Name the role, context, audience, format and what to skip.",
      "A big job in one prompt invites a mess. Chain it, or draft, review and refine.",
      "Formatting problems want three to five examples, not more instructions."
    ],
    subs: [
      {
        title: "Say it clearly",
        know: [
          "A strong prompt names the role Claude plays, the background, the audience, the output format and what to leave out.",
          "When one prompt carries instructions, background and a document, fence each part with labelled tags.",
          "Steps that must happen in order go in a numbered list.",
          "For long documents, put the document first and the question last.",
          "Say what you want, not only what to avoid. 'Keep the table's columns as they are' beats 'do not change the structure'."
        ],
        traps: [
          { move: "The output was weak, so ask the same thing again", why: "The same vague prompt gets the same vague answer. Add the missing role, context and format." },
          { move: "Do not change the structure, without showing what the structure is", why: "Negative rules leave Claude guessing. Show or describe the structure you want kept." }
        ]
      },
      {
        title: "Split the job",
        know: [
          "Chaining: step one's output becomes step two's input. Extract, then transform, then check.",
          "Each link is small enough to inspect, so when something breaks you know which link.",
          "Draft, review, refine: ask for a draft, ask Claude to review it against your criteria, then ask for the improved version.",
          "When several deliverables share a foundation, do the shared extraction once first, then build each deliverable from it."
        ],
        traps: [
          { move: "Put the whole vendor evaluation in one prompt: compare, score and recommend", why: "Too much in one step hides where it went wrong. Derive the criteria, score against them, then weigh the trade-offs." }
        ]
      },
      {
        title: "Test and refine",
        know: [
          "Write down what a good output looks like before you prompt.",
          "Read each failure as a clue: generic output means thin context; the wrong question answered means an unclear task; wrong length or tone means a missing constraint or format.",
          "Change one thing for a reason, then compare. Five changes at once teach you nothing.",
          "If one section misses, revise that section. Don't throw away a draft that is mostly right.",
          "Know when to stop: if the answer is good but slow or costly, the fix is the model or the setup, not another rewrite."
        ],
        traps: [
          { move: "The prompt has been rewritten five times and still fails, so rewrite it again", why: "Some failures are not prompt problems. Check the information, the model and the setup." }
        ]
      },
      {
        title: "Fit the strategy to the task",
        know: [
          "Research: set success criteria, ask for sources checked against each other and the strongest case against the answer.",
          "Deep analysis: give Claude room to think, and check against your criteria before finishing.",
          "Fixed formats: three to five examples, close to the real thing and varied. Claude copies the pattern it is shown.",
          "Rules: phrase them as what to do."
        ],
        traps: [
          { move: "The format keeps drifting, so add more format instructions", why: "Description loses to demonstration. Show three to five examples of the exact format." }
        ]
      }
    ],
    remember: [
      "Colleague test before you send.",
      "Tags for parts, numbers for steps, document first.",
      "Chain big jobs; criteria before prompting.",
      "Examples fix format."
    ]
  },

  /* ---------------------------------------------------------------- D2 */
  {
    id: "d2", code: "D2", title: "Output evaluation and validation", eps: "EP 02, EP 03", t: 1,
    summary: "The biggest slice of the exam. Checking an answer against criteria, spotting invented facts, keeping a qualified person on high-stakes work, and shaping output for its reader and its next stop.",
    links: [
      ["▶", "Watch EP 02, part A (7 min)", YT + "pIaL_jCyt4g"],
      ["▶", "Watch EP 03, part B (6 min)", YT + "BNgWy2hHvz8"],
      ["📘", "Full study guide", AO + "domains/02-output-evaluation.md"],
      ["❓", "Worked question Q2", WQ + "q2--domain-2a-the-statistic-and-the-hour"],
      ["❓", "Worked question Q3", WQ + "q3--domain-2b-who-signs-the-shortlist"]
    ],
    highlights: [
      "How confident Claude sounds and how correct it is are not related.",
      "Verification means you open the source and read it. The model checking itself is always the trap.",
      "Rights, health, money or livelihood: a qualified person reviews before anyone acts.",
      "A fixed format guarantees the shape, nothing else."
    ],
    subs: [
      {
        title: "Judge it like a deliverable",
        know: [
          "Write the criteria before you read the output, or the fluency will have charmed you.",
          "Score separately: faithful to the source, complete against the ask, consistent across runs, right tone for the reader.",
          "Responses vary run to run, even with the same setup. Review is part of the process, not a sign something broke.",
          "Claude's knowledge stops at its training date. Current facts need Research or a source you provide."
        ],
        traps: [
          { move: "Reread the output and it reads well, so it is ready", why: "Reading well is fluency, not accuracy. Check it against criteria you wrote down first." }
        ]
      },
      {
        title: "The four tells of an invented fact",
        know: [
          "A citation that leads nowhere: a plausible title, link or report that does not exist.",
          "A precise number with no source. Precision is doing the job evidence should do.",
          "The answer contradicts itself somewhere.",
          "'Definitely', 'certainly', 'clearly' with nothing behind them.",
          "One error found means look for more. Finding it starts the audit; it does not end it."
        ],
        traps: [
          { move: "Fix the one wrong figure and send the report", why: "One found error suggests others. Check the rest before it goes out." }
        ]
      },
      {
        title: "Make it easier to verify",
        know: [
          "Tell Claude that 'I don't know' is an acceptable answer. It is the single best line against invented facts.",
          "Ask Claude to quote the source before using it, so answers stay inside your documents.",
          "Ask for a citation after every claim, and tell Claude to withdraw any claim it cannot cite.",
          "A citation is not verification. You open it and read what it actually says."
        ],
        traps: [
          { move: "Ask Claude to double-check its own answer", why: "That is the same model marking its own homework. Open the sources yourself." },
          { move: "It cites a source, so it is verified", why: "A real-looking citation can still be wrong or not say what the answer claims. Read it." }
        ]
      },
      {
        title: "When a person must sign",
        know: [
          "Output that touches a person's rights, health, money or livelihood is high-stakes: legal, medical, lending, hiring.",
          "Claude's draft is an input, never the decision. A qualified, accountable person reviews it before anyone acts.",
          "Tell people they are dealing with AI output.",
          "Keep the sign-off where you can point at it. If nobody signed, it didn't ship; it escaped."
        ],
        traps: [
          { move: "A colleague skims the AI shortlist, then it goes to the hiring manager", why: "A skim is not qualified review. The person accountable in that field reviews it, and owns the decision." }
        ]
      },
      {
        title: "Shape it for the reader, pick the container",
        know: [
          "Name the reader in one phrase before you edit: a director wants three lines; an analyst wants every step.",
          "The style of your prompt leaks into the answer. Write the prompt the way you want the output to read.",
          "Something you will edit and reuse gets its own document (an artifact). Data for another system gets a fixed structure. A one-off answer stays as prose in the chat.",
          "Structured output proves every field is present. It does not prove the values are right."
        ],
        traps: [
          { move: "The output matches the schema, so the data is correct", why: "The schema checks shape, not truth. Check the contents too." }
        ]
      }
    ],
    remember: [
      "Confidence is not accuracy.",
      "Dead link, unsourced number, self-contradiction, empty certainty.",
      "Allow 'I don't know', quote first, cite every claim.",
      "High stakes: a qualified person signs, and AI use is disclosed."
    ]
  },

  /* ---------------------------------------------------------------- D3 */
  {
    id: "d3", code: "D3", title: "Product and model selection", eps: "EP 04", t: 2,
    summary: "Choosing the right Claude feature from the job's verb, the right model from the trade-off, and the order to try fixes in before switching.",
    links: [
      ["▶", "Watch EP 04 (6 min)", YT + "6xZXW6I6gl0"],
      ["📘", "Full study guide", AO + "domains/03-product-and-model-selection.md"],
      ["❓", "Worked question Q4", WQ + "q4--domain-3-the-shallow-analysis"]
    ],
    highlights: [
      "Say the job in one verb, then pick the feature.",
      "As capability climbs, speed drops and cost climbs. Fit the rung to the task.",
      "Before switching model: supply what is missing, then give it more room to think, then climb one rung.",
      "A retry with no new information is a lottery ticket, not a fix."
    ],
    subs: [
      {
        title: "Pick the feature from the verb",
        know: [
          "Gather outside or current information: Research.",
          "Compute or chart real data, where the answer must be right and not just plausible: code execution.",
          "The same work on the same materials every week: a project with its instructions and knowledge saved once.",
          "A deliverable you will edit and reuse: an artifact.",
          "A procedure you explain every time: a skill. Something Claude should recall next session: memory.",
          "Feature names change. Check them at docs.claude.com; the verb-first judgement is what lasts."
        ],
        traps: [
          { move: "Paste the same background into a new chat every week", why: "Recurring work with the same context and format belongs in a project, set up once." }
        ]
      },
      {
        title: "Projects, skills, code execution, memory",
        know: [
          "Projects carry context: the standing instructions and knowledge for a workstream.",
          "Skills carry procedure: how a specific task is done, the same way every time.",
          "Code execution carries correctness: calculations that must be right.",
          "Memory carries continuity: facts that should follow you between sessions.",
          "Is a project worth it? Ask: does the task recur, is the background the same each time, is the output format consistent?"
        ],
        traps: [
          { move: "Ask Claude to add up the figures in its answer", why: "Language output can look right and be wrong. Use code execution for numbers that must be correct." }
        ]
      },
      {
        title: "The model ladder",
        know: [
          "Haiku: fast and light per call, for volume such as sorting, tagging and extraction.",
          "Sonnet: the balance most everyday drafting, synthesis and analysis sits on.",
          "Opus and the top tier: the deepest reasoning, ambiguous inputs and high-stakes deliverables.",
          "Nobody gets top capability, top speed and lowest cost at once. Measure on your own tasks.",
          "The line-up changes. Read the current models at docs.claude.com."
        ],
        traps: [
          { move: "Use the most powerful model for everything to be safe", why: "It wastes money and time on simple volume work. Fit the rung to the task." }
        ]
      },
      {
        title: "Tune before you switch, and mind the context",
        know: [
          "Step 1: ask what is missing. If Claude never saw the numbers, no model will guess them.",
          "Step 2: same model, more room to think. Cheaper than a bigger model.",
          "Step 3: only then, one rung up.",
          "Everything in a conversation shares one finite context window. As it fills, quality sags, and the middle gets missed.",
          "Warning signs: Claude stops following instructions it followed earlier, or forgets early details. Prune, condense to decisions, or restart clean with the key state."
        ],
        traps: [
          { move: "Run the same request again and hope for a deeper answer", why: "Same input, same model, same shallow answer. Add information or thinking room first." },
          { move: "Switch off features to save cost while retrying", why: "Cost is managed by fitting the model to the task, not by crippling the tool." }
        ]
      }
    ],
    remember: [
      "Verb first, then the feature.",
      "Capability up, speed down, cost up.",
      "Missing info, more thinking, then one rung up.",
      "Carry decisions forward, not transcripts."
    ]
  },

  /* ---------------------------------------------------------------- D4 */
  {
    id: "d4", code: "D4", title: "Workflow integration and solution design", eps: "EP 05", t: 3,
    summary: "Finding the step where Claude pays off, choosing the simplest pattern that works, improving healthy processes rather than rebuilding them, and presenting the result honestly.",
    links: [
      ["▶", "Watch EP 05 (7 min)", YT + "tzEhyG-QbTE"],
      ["📘", "Full study guide", AO + "domains/04-workflow-integration.md"],
      ["❓", "Worked question Q5", WQ + "q5--domain-4-the-impressive-rebuild"]
    ],
    highlights: [
      "Target the step that eats the most time and is mostly language work.",
      "Start simple. Reach for an agent last, not first.",
      "Augment what works; redesign only what is broken.",
      "Pitch with your own pilot numbers, costs and limits included."
    ],
    subs: [
      {
        title: "Find where it pays",
        know: [
          "Walk the process step by step and mark each one: how much time it takes, and how much of it is reading, drafting, summarising or comparing.",
          "Where both are high, that is your step.",
          "Rank candidates by impact against effort. Start where impact is high and effort is low.",
          "One measured step beats AI installed everywhere at once."
        ],
        traps: [
          { move: "Roll Claude out across the whole department at once for maximum impact", why: "No step is measured, so nothing can be shown to work. Target one high-value step first." }
        ]
      },
      {
        title: "Pick the simplest pattern",
        know: [
          "Start with a direct prompt and built-in features. Add complexity only when the need is proven.",
          "Chain: step one feeds step two.",
          "Router: easy items to a fast model, hard ones up the ladder.",
          "Parallel: sections run separately and merge at the end.",
          "A fixed workflow is predictable. A free-running agent is flexible and harder to control."
        ],
        traps: [
          { move: "Build an autonomous agent; it is the most advanced option", why: "Complexity before evidence. Most work is served by a prompt, a chain or a router." }
        ]
      },
      {
        title: "Augment or redesign",
        know: [
          "If the process works and the tools already hold the data, connect Claude to them and keep the rest standing. That is the default.",
          "Connectors do the joining; nobody has to relearn their job.",
          "Redesign is for a process that is already broken, where steps exist only because old tools forced them.",
          "Earn a redesign with evidence. Never default to one."
        ],
        traps: [
          { move: "Rebuild the whole working process around Claude", why: "It sounds like vision. It is how healthy processes die. Augment the parts that work." }
        ]
      },
      {
        title: "Sell it honestly",
        know: [
          "Quantify the change with your own pilot numbers, never a vendor's.",
          "Say what it costs, where it still fails, and which steps keep a human signature.",
          "Frame it as capacity moved to better work, not people replaced.",
          "If you cannot quantify the value yet, pilot longer."
        ],
        traps: [
          { move: "Quote the vendor's headline productivity figure to the board", why: "Borrowed numbers don't survive the first bad week. Use your own pilot results." }
        ]
      }
    ],
    remember: [
      "Time eaten times language work.",
      "Simple, chain, router, parallel; agent last.",
      "Augment the healthy, redesign the broken.",
      "Own numbers, limits said out loud."
    ]
  },

  /* ---------------------------------------------------------------- D5 */
  {
    id: "d5", code: "D5", title: "Configuration and knowledge management", eps: "EP 06", t: 4,
    summary: "Setting up projects, knowledge sources, instructions and memory so every later prompt is cheaper, faster and safer, and keeping that setup current.",
    links: [
      ["▶", "Watch EP 06 (6 min)", YT + "2yhNNgyyDO8"],
      ["📘", "Full study guide", AO + "domains/05-configuration-and-knowledge.md"],
      ["❓", "Worked question Q6", WQ + "q6--domain-5-the-weekly-report-setup"]
    ],
    highlights: [
      "One project per purpose. Mixed, contradictory material weakens every answer.",
      "Fence the knowledge: answer only from these sources, and say 'unknown' otherwise.",
      "Narrow every connector to what the job needs.",
      "Setup goes stale quietly. Audit it on a rhythm."
    ],
    subs: [
      {
        title: "Build the workspace",
        know: [
          "A project holds the instructions that apply to every chat in it and the knowledge that grounds every answer.",
          "Split projects by purpose: sales material in one, research in another, the weekly report in its own.",
          "Keep recurring things there permanently: templates, past deliverables, standards. Re-explaining context each week is the cost this removes."
        ],
        traps: [
          { move: "Keep everything in one big project so it all sits in one place", why: "Contradictory material in one workspace destabilises every answer. Split by purpose." }
        ]
      },
      {
        title: "Fence the knowledge",
        know: [
          "Uploading files is not enough. Without a fence, Claude fills gaps from general knowledge and you cannot tell which is which.",
          "Say it in the instructions: answer only from these materials, and say unknown for anything not in them.",
          "Connectors follow the same rule: give each one access to the minimum it needs."
        ],
        traps: [
          { move: "Connect the whole shared drive and tell Claude to ignore the irrelevant files", why: "The irrelevant files still join the search, and accuracy pays. Connect only the folders the job needs." }
        ]
      },
      {
        title: "Write instructions Claude can hold",
        know: [
          "Three parts, kept apart: the role, the constraints, the shape of the output. Put each in its own tagged block.",
          "Rules packed into one long paragraph lose their middle.",
          "When two rules can collide, say which wins, for example brevity over completeness.",
          "The colleague test applies: someone with no context should understand the instructions."
        ],
        traps: [
          { move: "Write every rule into one detailed paragraph so nothing is missed", why: "The middle gets lost. Separate role, constraints and format, and state priorities." }
        ]
      },
      {
        title: "Maintain the setup and curate memory",
        know: [
          "Files go stale, synced sources drift, examples stop matching how the business talks.",
          "Reread the instructions on a schedule against what the project is for now. Remove what expired; refresh what changed.",
          "Store decisions, preferences and settled facts in memory, never whole transcripts.",
          "Review memory regularly and delete entries that no longer hold."
        ],
        traps: [
          { move: "Let memory keep everything, so Claude never forgets", why: "A memory that holds everything recalls nothing well. Keep what genuinely recurs." }
        ]
      }
    ],
    remember: [
      "Instructions and knowledge live with the work.",
      "Answer only from these sources; 'unknown' is an answer.",
      "Narrow connectors.",
      "Audit, prune, refresh."
    ]
  },

  /* ---------------------------------------------------------------- D6 */
  {
    id: "d6", code: "D6", title: "Governance, risk and responsible use", eps: "EP 07", t: 5,
    summary: "The high-stakes areas, the two duties that always apply in them, spotting bias, and the data rules that come before any clever use of the tool.",
    links: [
      ["▶", "Watch EP 07 (6 min)", YT + "p5fpyypMERM"],
      ["📘", "Full study guide", AO + "domains/06-governance-risk-responsible-use.md"],
      ["❓", "Worked question Q7", WQ + "q7--domain-6-the-launch-question"]
    ],
    highlights: [
      "Learn the seven high-stakes areas by name.",
      "In them, a qualified person reviews, and people are told about AI at the start.",
      "Organisation policy decides what data may enter the tool. When unsure, ask compliance.",
      "This is the exam's rule set, not legal advice. Your organisation's policy governs real decisions."
    ],
    subs: [
      {
        title: "The seven high-stakes areas",
        know: [
          "Legal work, healthcare, insurance, finance, employment and housing, academic testing, and media.",
          "Each one touches a person's rights, health, money or opportunity.",
          "Duty one: a qualified person reviews before anything acts.",
          "Duty two: people are told AI is involved at the start, not only if they ask. Anything customer-facing discloses."
        ],
        traps: [
          { move: "Disclose AI use only if a customer asks", why: "It sounds balanced and fails the rule. Disclose at the start of the session." }
        ]
      },
      {
        title: "Check the slant",
        know: [
          "Tell one: only one side of a live debate appears.",
          "Tell two: opposing views appear but are dismissed in a line.",
          "Tell three: a group of people is treated unfairly or as a stereotype.",
          "Ask twice: are both sides treated fairly, and would every group described recognise itself? Balance is checked, never assumed."
        ],
        traps: [
          { move: "The output mentions both sides, so it is balanced", why: "A view dismissed in one line is not fair treatment. Check how each side is handled." }
        ]
      },
      {
        title: "Guard the data",
        know: [
          "Before anything enters an AI tool, your organisation's policy decides whether it may.",
          "Personal data is anonymised, explicitly authorised, or kept out. Confidential business data passes the same gate.",
          "Regulated work: confirm outputs can be logged and kept the way the rules require.",
          "Not sure? Don't guess. Escalate to compliance."
        ],
        traps: [
          { move: "Paste the customer records in now; the prompt tells Claude to keep them confidential", why: "No prompt overrides a data rule. Check policy, anonymise or authorise first." }
        ]
      },
      {
        title: "Say the limits",
        know: [
          "Present three things together: what it does well (your measured numbers), what it costs, and where a person must still check every run.",
          "Frame it as capacity moved to better work, never people replaced.",
          "If the value can't be quantified yet, pilot longer."
        ],
        traps: []
      }
    ],
    remember: [
      "Seven areas, two duties.",
      "Disclose at the start.",
      "One-sided, dismissed, stereotyped: the three slant tells.",
      "Policy first; escalate when unsure."
    ]
  },

  /* ---------------------------------------------------------------- D7 */
  {
    id: "d7", code: "D7", title: "Troubleshooting and optimisation", eps: "EP 08", t: 6,
    summary: "When output disappoints, diagnose in order, pull the cheapest lever first, measure against criteria, and match the model to the workload.",
    links: [
      ["▶", "Watch EP 08 (6 min)", YT + "vfaFaZmeXBg"],
      ["📘", "Full study guide", AO + "domains/07-troubleshooting-and-optimization.md"],
      ["❓", "Worked question Q8", WQ + "q8--domain-7-the-inconsistent-answers"]
    ],
    highlights: [
      "Check in order: the prompt, the information, the effort, and only then the setup.",
      "If you haven't fixed the prompt and the inputs, you haven't earned the model switch.",
      "Criteria first; change one thing at a time.",
      "Heavy model for depth, light model for volume, never the reverse."
    ],
    subs: [
      {
        title: "Diagnose in order",
        know: [
          "1. The prompt: specific about role, context, task and format? Most bad output is an underspecified prompt.",
          "2. The information: did Claude have the source material, or was it asked to guess?",
          "3. The effort: does the job need more thinking time or a more capable model?",
          "4. The setup: when the first three pass and the problem stays, escalate to a developer or architect.",
          "The order matters because each check costs less than the next."
        ],
        traps: [
          { move: "The answers are wrong, so switch to the most capable model", why: "The prompt and inputs are cheaper to fix and cause most failures. Check them first." }
        ]
      },
      {
        title: "Pull the cheapest lever first",
        know: [
          "Rewriting the prompt: free, and fixes the most.",
          "Adding the right source material: minutes.",
          "More room to think: a little time.",
          "A stronger model: money on every run.",
          "Changing the whole setup: days."
        ],
        traps: [
          { move: "Rebuild the setup to fix inconsistent answers", why: "That is the most expensive lever, pulled first. Work up from the prompt." }
        ]
      },
      {
        title: "Measure, don't guess",
        know: [
          "'Sounds better' is not evidence.",
          "Write down what good looks like first: key facts right, format followed, source cited.",
          "Change one thing at a time and score the output against your list.",
          "Change the prompt and the model together, and you learn nothing about either."
        ],
        traps: [
          { move: "Retry until an answer looks right", why: "Motion, not diagnosis. Score against criteria and change one variable." }
        ]
      },
      {
        title: "Fit the cost to the workload",
        know: [
          "Sorting hundreds of tickets: high volume, simple. A fast, light model does it well and cheaply.",
          "Reasoning through a messy contract: deep and careful. A more capable model earns its keep.",
          "Wasteful: the heavyweight for everything. Risky: the lightweight for judgement calls.",
          "Revisit the match when the workload changes."
        ],
        traps: []
      }
    ],
    remember: [
      "Prompt, information, effort, escalate.",
      "Cheapest lever first.",
      "Criteria first; one change at a time.",
      "Heavy for depth, light for volume."
    ]
  },

  /* ---------------------------------------------------------------- technique */
  {
    id: "technique", code: "★", title: "Exam technique", eps: "EP 00 and the bonus", t: 7,
    summary: "Five habits that resolve most scenario questions, and how to choose between the last two options.",
    links: [
      ["🎯", "Five exam tips", AO + "exam-tips.md"],
      ["▶", "Bonus · Why people fail the CCAO-F exam (66 min)", YT + "27VlyAMSqO8"],
      ["⚠", "Printable traps sheet", "flashcards.html?track=ccao-f&mode=traps"]
    ],
    highlights: [
      "AI drafts; a person decides.",
      "Policy and data sensitivity outrank everything.",
      "Strike the panicker and the do-nothing, compare the last two, pick the boring one.",
      "Knowing when to escalate is a tested skill."
    ],
    subs: [
      {
        title: "Five habits",
        know: [
          "A human stays in the loop for anything that acts: a decision, a customer message, a shortlist.",
          "AI drafts, you decide. Options that hand the decision itself to Claude are traps.",
          "Know when to escalate: repeated rewrites, integrations or custom tooling are beyond the operator's layer.",
          "Eliminate first: two options are usually clearly wrong (one panics, one does nothing).",
          "Organisation policy and data sensitivity come before any clever technique."
        ],
        traps: [
          { move: "Pick the option that sounds most thorough and diligent", why: "The trap often feels responsible. The right answer is usually cheaper, narrower and more boring." }
        ]
      },
      {
        title: "The night before",
        know: [
          "Run through the recap deck.",
          "Redo the worked episode questions cold.",
          "Read your own organisation's AI usage policy, so the governance questions come from memory, not instinct."
        ],
        traps: []
      }
    ],
    remember: [
      "AI drafts, you decide.",
      "Policy first.",
      "Strike two, compare two.",
      "When torn, pick the boring one."
    ]
  }
  ]
}
});
})();
