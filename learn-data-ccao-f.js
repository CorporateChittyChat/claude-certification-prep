/* CCAO-F study notes for learn.html.
   Structure follows Anthropic's CCAO-F exam guide (v1.0, effective July 2026): 7 domains, 30 skills.
   The guide weights the domains only (14/21/12/16/12/15/10); it gives no weight per skill, so every sub has w: null.
   Explanations are paraphrased from Anthropic's Associate course material and this repo's own guides; traps restate
   the distractor patterns of our original practice set in our own words. No exam item is reproduced.
   Product facts (feature names, plan availability, model line-up, limits) carry an as-of date: confirm at docs.claude.com.
   Sub-skill fields: title, w (null: the guide has no skill weights), scope, lesson [paragraphs], tables [{cap, h, r}],
   code {cap, text} (an example prompt), know [bullets], build [label, url] (the domain's worked question),
   traps [{move, why}]. */
(function(){
const YT = "https://youtu.be/";
const AO = "https://github.com/CorporateChittyChat/claude-certification-prep/blob/main/ccao-f/";
const WQ = AO + "practice/episode-questions.md#";
window.LEARN_DATA = window.LEARN_DATA || {};
window.LEARN_DATA["ccao-f"] = {
  title: "CCAO-F study notes",
  name: "Claude Certified Associate – Foundations",
  intro: "Every domain and skill from Anthropic's CCAO-F exam guide, with the official domain weights (the guide weights domains, not individual skills). Each skill has the lesson, the decision tables, the facts to know and the traps the questions are built around, linked to its episode, its study guide and a worked question. For people who use Claude at work; no code needed.",
  asOf: "3 November 2026",
  guide: ["📄", "Official exam guide (v1.0, July 2026)", "https://everpath-course-content.s3-accelerate.amazonaws.com/instructor/6nizmqk8tpzpfjvt6qmmav7rh/public/1783542847/Claude+Certified+Associate+%E2%80%93+Foundations+Exam+Guide.pdf"],
  glance: [["Items", "60, multiple choice and multiple response"], ["Time", "120 minutes"], ["Pass mark", "720 on a 100–1,000 scale"], ["Fee", "$99 USD"], ["Delivery", "Pearson VUE, online or test centre"], ["Valid for", "12 months"]],
  exam: "ccao-f/practice/mock-exam-player.html",
  flash: "flashcards.html?track=ccao-f",
  path: "path.html?track=ccao-f",
  repo: "",
  overview: [
    ["▶", "EP 00 · Before you book: five things to know (4 min)", YT + "NmGsB9LPrB0"],
    ["▶", "Bonus · Why people fail the CCAO-F exam, and how to fix it (66 min)", YT + "27VlyAMSqO8"],
    ["📄", "Exam logistics", AO + "exam-logistics.md"],
    ["🗂", "Recap deck (PDF)", "ccao-f/assets/ccaof-recap-deck.pdf"]
  ],
  domains: [

  /* ================================================================ D1 */
  {
    id: "d1", code: "D1", title: "Prompting and task execution", w: 14, eps: "EP 01", t: 0,
    summary: "Writing prompts that carry everything Claude cannot guess, splitting big jobs into checkable steps, improving a prompt by fixing the part that failed, and setting the balance of control and freedom to suit the task.",
    links: [
      ["▶", "Watch EP 01 (7 min)", YT + "iF-ohGig97A"],
      ["📘", "Full study guide", AO + "domains/01-prompting.md"],
      ["❓", "Worked question Q1", WQ + "q1--domain-1-the-format-lottery"]
    ],
    highlights: [
      "Five parts carry a work prompt: role, context, task, constraints, output format. Context is the one people leave out.",
      "A job with several stages in one prompt gets shallow work at every stage. Split it, and check the foundation before building on it.",
      "Read a weak output as a clue to which part of the prompt failed. Change that part only.",
      "Analysis wants tight criteria; brainstorming wants room. Set the dial to the task."
    ],
    subs: [
      {
        title: "Create effective prompts", w: null,
        scope: "Write prompts for business and technical tasks that state clearly what is wanted, with the background and structure Claude needs to do it well.",
        lesson: [
          "The same request phrased two ways gives two different levels of quality, and the model did not change between them. Prompting is a communication skill with a learnable structure, not a knack. Anthropic's course calls the competency Description: telling Claude precisely what you want instead of assuming it will infer it.",
          "Five components carry almost every professional prompt. The role sets the vocabulary and depth Claude brings (an editor, a financial analyst, a policy reviewer). The context is everything Claude cannot know unless you say it: who the reader is, the situation, earlier decisions, the source material. The task is one clear action with one main verb: summarise, compare, draft, identify. Constraints are the limits: length, tone, what to include and what to leave out. The output format is the shape you want back: a table, three bullets, a short memo, an email. A one-line question may need only the task; a deliverable for a client usually needs every component. Judging which ones a given job needs is the skill.",
          "Context is the part people forget, and a context gap is the most common reason a prompt underperforms. Claude cannot see your inbox, your organisation chart or last week's meeting unless you paste it or connect a source, and even a connector shows only what you have allowed. A useful test from Anthropic's guidance: imagine handing the prompt to a capable colleague with no background. If they would need to ask questions, so will Claude, and it will answer them with guesses.",
          "Structure is the other half of clarity. When one prompt carries instructions, background and a document, fence each part with labelled tags so nothing is guessed about where the instructions end and the document begins. Put steps that must happen in order in a numbered list. With a long document, put the document first and the question at the end. Say what you want rather than only what to avoid: 'keep the existing column headings' gives Claude something to aim at; 'do not change the structure' does not. When the output must follow an exact format, three to five short examples teach the pattern better than more description."
        ],
        tables: [{
          cap: "The component stack",
          h: ["Component", "What it controls", "Missing it gives you"],
          r: [
            ["Role", "Vocabulary, depth and assumptions", "A generalist answer to a specialist question"],
            ["Context", "Audience, situation, prior decisions, source material", "Generic output that could be about any company"],
            ["Task", "The one action, stated with a clear verb", "The wrong action, or several half-done ones"],
            ["Constraints", "Length, tone, include and exclude", "The right content at the wrong length or tone"],
            ["Output format", "The shape of the result", "An extra round just to reshape it"]
          ]
        }],
        code: { cap: "Example prompt with the five components (our own scenario)", text: "Role: You are an internal communications editor.\n\nContext: I run training for a 40-person customer service team. Our refund policy changed on 1 March:\nrefunds over £200 now need a team leader's approval. Agents are busy and skim emails.\n\n<policy_change>\n[paste the policy change here]\n</policy_change>\n\nTask: Draft an email telling agents what changed and what they must do differently.\n\nConstraints: Under 150 words. Plain, friendly tone. Do not restate parts of the policy that did not change.\n\nFormat: A subject line, one opening sentence, then three bullets: what changed, what to do, who to ask." },
        know: [
          "Five components: role, context, task, constraints, output format. Use the ones the task needs; a client deliverable needs all five.",
          "Context is the most often omitted component and the most common cause of generic output.",
          "Colleague test: if a capable person with no background would be confused by the prompt, Claude is too.",
          "Fence instructions, background and documents in labelled tags; number steps that must happen in order.",
          "Long document first, question last.",
          "Say what to do, not only what to avoid. For a strict format, show three to five examples.",
          "Thirty seconds of specification usually saves several rounds of correction."
        ],
        build: ["Worked question Q1: the format lottery", WQ + "q1--domain-1-the-format-lottery"],
        traps: [
          { move: "The output was generic, so send the same prompt again", why: "The same vague prompt gives the same vague answer, just worded differently. Add the missing context, audience and format." },
          { move: "Switch to a more capable model to get a less generic answer", why: "A stronger model answers a vague question more fluently, not more usefully. The gap is in the prompt: supply the context it lacks." },
          { move: "Tell Claude the last version was poor and to do better", why: "Encouragement carries no information. Say who it is for, what matters and what shape you want back." },
          { move: "Tell Claude not to change the structure, without saying what the structure is", why: "A rule that only names what to avoid leaves Claude guessing. Describe or show the structure to keep." },
          { move: "Put the question first and paste the sixty-page document underneath", why: "With long material, the document goes first and the question last, so the question is fresh when Claude answers." },
          { move: "Write instructions, background and the document as one block of prose", why: "Claude has to guess where each part ends. Fence each part in its own labelled section." }
        ]
      },
      {
        title: "Apply task decomposition", w: null,
        scope: "Break complex, multi-part requests into discrete, ordered steps so that each step can be done well and checked.",
        lesson: [
          "Some requests are several tasks wearing one sentence. 'Evaluate these three suppliers and tell me which to pick' hides four jobs: invent criteria, apply them, weigh the trade-offs and recommend. Done in a single pass, each gets a thin treatment, and the reasoning stays invisible. Decomposition splits the job into ordered steps and runs them in sequence: derive the criteria from the requirements, score each option against them, set out the trade-offs, then recommend.",
          "The gain is not only quality. Each step leaves a result you can check. If the criteria in step one are wrong, you catch it before anything is scored, not after the recommendation has gone to your manager. The work also becomes auditable, which matters when someone asks how the decision was reached. Anthropic calls this chaining: one step's output becomes the next step's input. A related pattern is draft, review, refine: ask for a draft, ask Claude to review it against criteria you name, then ask for the improved version.",
          "When several deliverables share one foundation, build and confirm the foundation first. Say a revised expenses policy must become a briefing for managers, an intranet page and a short note for new starters. Pull out what actually changed first and check that list against the policy itself. Only then draft the three documents from the confirmed list. Drafting any of them before the extraction is checked risks copying the same misreading into all three.",
          "Run dependent steps in the same conversation, where later steps can read the earlier results. Open a new one for a step that stands alone, or once the thread is long enough that its opening detail is fading (see context management in Domain 3)."
        ],
        tables: [{
          cap: "One sentence, four tasks: a supplier choice",
          h: ["Step", "What Claude does", "What you check before moving on"],
          r: [
            ["1. Derive criteria", "Pulls the criteria and their weights from the requirements document", "Are these the criteria that matter, weighted the way the business would?"],
            ["2. Score", "Scores each supplier against the agreed criteria", "Is each score traceable to evidence in the proposals?"],
            ["3. Trade-offs", "Sets out where each option wins and loses", "Are the trade-offs real, or artefacts of the scoring?"],
            ["4. Recommend", "Recommends with the reasoning shown", "Would you defend this reasoning to the decision-maker?"]
          ]
        }],
        know: [
          "A multi-stage request in one prompt gets shallow work at every stage and hides the reasoning.",
          "Chaining: each step's output feeds the next. Each link is small enough to inspect, so you know which link broke.",
          "Draft, review against named criteria, refine: three passes on the same model.",
          "Shared foundation first: extract and confirm once, then build each deliverable from the confirmed version.",
          "Dependent steps stay in one conversation; independent steps, or a conversation that has grown too long, move to a new one.",
          "Decomposed work is auditable: you can show how the recommendation was reached."
        ],
        build: ["Worked question Q1: the format lottery", WQ + "q1--domain-1-the-format-lottery"],
        traps: [
          { move: "Ask for the full evaluation and the recommendation in one detailed prompt", why: "More words do not separate the stages. Derive criteria, score, weigh trade-offs, then recommend, checking each result." },
          { move: "Get Claude's pick first, then ask it to explain why", why: "That builds the reasoning backwards to fit a conclusion. Criteria come before scores, scores before the recommendation." },
          { move: "Assess each supplier in a different chat, judged on whatever Claude thinks matters", why: "The scores cannot be compared. Agree one set of criteria first, then apply it to every option." },
          { move: "Draft the announcement, FAQ and briefing in parallel straight from the policy", why: "Any misreading is copied into all three. Extract and confirm the changes once, then draft from that list." },
          { move: "Split the job into ten tiny prompts so nothing can go wrong", why: "Splitting is not the goal; checkable stages are. Too many fragments lose the thread and add work without adding control." }
        ]
      },
      {
        title: "Iterate prompts to improve output", w: null,
        scope: "Refine prompts based on what the output reveals, changing the part that failed, and recognise when further iteration has stopped paying.",
        lesson: [
          "First drafts seldom land exactly. When one disappoints, resist rewriting the whole prompt. Treat the output as evidence of which component was weak, and change only that. Output that is generic points to thin context. An answer to the wrong question points to an unclear task verb. The right content at the wrong length, tone or shape points to a missing constraint or format. Output that is good except for one section calls for revising that section, not discarding the draft.",
          "A full rewrite costs twice: the good parts go in the bin, and afterwards nobody knows which edit made the difference. Adjust one component, resend, compare. Write down what a good output looks like before you start, so you are comparing against criteria rather than against a feeling.",
          "A typical cycle: a chaser to a supplier about an overdue insurance certificate comes back vague and a little curt, naming neither the document nor the deadline. Round two adds which certificate, the date it was due, what happens if it does not arrive, a tone instruction (firm but courteous) and a word limit. The result works but the subject line is bland, so round three asks only for a subject line that makes the deadline obvious. Three rounds, each fixing exactly what the last output exposed, and nothing that worked was thrown away.",
          "Know when to stop. Iteration has converged when another round brings marginal change rather than improvement; a quick manual edit is then cheaper than another prompt. And some failures are not prompt problems at all: if the answer is accurate but too slow or too costly, or a number is subtly wrong, the fix is the model or the feature (Domains 3 and 7), not rewrite number six. If rounds have stopped improving a high-stakes deliverable, the next step is a person, not another prompt (Domain 2)."
        ],
        tables: [{
          cap: "Read the symptom, fix the component",
          h: ["Symptom", "Likely cause", "Fix"],
          r: [
            ["Generic or off-target", "Thin context", "Add the background Claude could not infer"],
            ["Answered the wrong question", "Ambiguous task verb", "Sharpen the instruction"],
            ["Wrong length, tone or shape", "Missing constraint or format", "Add it"],
            ["Close, but one section misses", "That section only", "Iterate on that section; keep the rest"],
            ["Good but slow or costly; numbers subtly off", "Not a prompt problem", "Change the model or use code execution"]
          ]
        }],
        know: [
          "Each disappointment points to a component. Change that component only, then compare.",
          "Write the success criteria before you prompt.",
          "Never discard a draft that is mostly right; revise the weak section.",
          "Wholesale rewrites lose what worked and hide what fixed the problem.",
          "Stop when rounds bring marginal change: edit by hand, or change the model or feature if the problem is not in the prompt.",
          "Flat improvement on a high-stakes deliverable is a signal to bring in a person."
        ],
        build: ["Worked question Q1: the format lottery", WQ + "q1--domain-1-the-format-lottery"],
        traps: [
          { move: "The memo is accurate but too long and formal, so rewrite the prompt from scratch", why: "Only the length and tone failed. Adjust those constraints and resend; keep what worked." },
          { move: "The prompt has been rewritten five times and the answer is still slow, so rewrite it again", why: "Speed and cost are not prompt problems. Look at the model or the setup instead." },
          { move: "Change the wording, the format and the model together to save a round", why: "If it improves, you will not know which change did it. One change per round." },
          { move: "Keep prompting until the output is perfect", why: "Past convergence, each round adds little. A manual edit is cheaper; the goal is usable, not perfect." },
          { move: "Run the same prompt several times and keep the best one", why: "That samples variation without fixing the cause. Diagnose the missing component and fix it." },
          { move: "Throw away the draft because one section missed", why: "Iterate on that section only. A draft that is mostly right is the best base you have." }
        ]
      },
      {
        title: "Adapt prompting strategy to the task type", w: null,
        scope: "Fit the prompting approach to the kind of work: analysis, research, drafting or brainstorming, each with a different balance of specification and latitude.",
        lesson: [
          "Every prompt uses the same components; what changes with the task is which ones you tighten. One fixed style used for everything costs quality wherever it does not fit. The underlying decision is the same each time: where do you need control, and where do you need range?",
          "Analysis wants tight constraints and explicit criteria: what to measure, against which standard, how to handle ambiguity, and the exact output shape. For deep analysis, give Claude room to reason before it answers, and check the result against your criteria. Research wants a clear question, defined scope and source discipline: say whether current sources are needed and ask for citations so every claim can be checked. A quick current fact can come from web search in a chat; deep investigation across many sources is what Research is for (check plan availability at docs.claude.com). Citations from a grounded search can be checked; citations produced from training memory alone look just as confident and must be verified.",
          "Drafting wants the audience, tone and format fixed, with room for Claude to find the wording: the shape is yours and the wording is Claude's. Brainstorming wants the lightest touch: give the goal and a guardrail or two, ask for volume and range, and narrow afterwards. Over-specifying a brainstorm kills the divergence you wanted. Rules of any kind work better phrased as what to do; formats that must be exact are taught best by three to five examples.",
          "Example: a marketing lead asks for twenty campaign angles for faster month-end close, with only the goal and one guardrail, and the instruction not to self-edit yet. Once the range exists, a second prompt applies the brand rules and picks a shortlist. Putting the brand rules in the first prompt would have produced twenty variations of the same safe idea."
        ],
        tables: [{
          cap: "Strategy by task type",
          h: ["Task type", "Tighten", "Loosen", "Typical extras"],
          r: [
            ["Analysis", "Criteria, standards, scope, output shape", "Phrasing", "Room to reason; check against criteria"],
            ["Research", "The question, the sources, citations", "How the synthesis is organised", "Web search for a quick fact; Research for deep multi-source work; ask for the case against"],
            ["Drafting", "Audience, tone, length, format", "Word choice", "A worked example of the voice if it matters"],
            ["Brainstorming", "Goal and one or two guardrails only", "Quantity and direction", "Ask for range first; narrow in a second step"]
          ]
        }],
        know: [
          "Same five components every time; the task decides how tightly each is set.",
          "Analysis: high specification, low latitude. Brainstorming: low specification, high latitude. Drafting sits between.",
          "Research: define scope and require citations you can check; flag what cannot be verified.",
          "A citation from training memory is not grounded; one from web search or Research can be traced.",
          "Exact formats are taught by three to five varied examples, not more description.",
          "Brainstorm wide first, then filter in a separate step."
        ],
        build: ["Worked question Q1: the format lottery", WQ + "q1--domain-1-the-format-lottery"],
        traps: [
          { move: "Load the brainstorm prompt with every brand rule and word limit from the start", why: "Over-specifying kills the range you wanted. Give the goal and a guardrail, ask for volume, then narrow." },
          { move: "Ask for one polished concept so there is less to sift", why: "Brainstorming exists to produce options. One idea skips the divergence and anchors on the first thought." },
          { move: "The format keeps drifting, so add more format instructions", why: "Description loses to demonstration. Show three to five examples of the exact format." },
          { move: "Use the same detailed prompt template for every kind of task", why: "Analysis and brainstorming need opposite settings. Fit the balance of control and room to the task." },
          { move: "Trust the citations because Claude supplied them in a research answer", why: "Citations recalled from training can look real and be wrong. Use a grounded search and open the sources." }
        ]
      }
    ],
    remember: [
      "Role, context, task, constraints, format.",
      "Split it; confirm the foundation first.",
      "Fix the part that failed; stop when rounds go flat.",
      "Tight for analysis, loose for ideas."
    ]
  },

  /* ================================================================ D2 */
  {
    id: "d2", code: "D2", title: "Output evaluation and validation", w: 21, eps: "EP 02, EP 03", t: 1,
    summary: "The largest domain. Checking output against requirements, sources and professional standards; recognising invented facts, contradictions and slant; building verification into the prompt; knowing when a person must review; and shaping and packaging the result for its reader.",
    links: [
      ["▶", "Watch EP 02, part A (7 min)", YT + "pIaL_jCyt4g"],
      ["▶", "Watch EP 03, part B (6 min)", YT + "BNgWy2hHvz8"],
      ["📘", "Full study guide", AO + "domains/02-output-evaluation.md"],
      ["❓", "Worked question Q2", WQ + "q2--domain-2a-the-statistic-and-the-hour"],
      ["❓", "Worked question Q3", WQ + "q3--domain-2b-who-signs-the-shortlist"]
    ],
    highlights: [
      "How confident Claude sounds tells you nothing about whether it is right.",
      "Check against three references: what you asked for, the source material, and your field's standards. Check completeness separately.",
      "Verification means you open an authoritative source. Asking Claude to check or rate itself is always the trap.",
      "Stakes, reversibility, audience and regulation decide when a person must review, and you set that line in advance."
    ],
    subs: [
      {
        title: "Evaluate output for accuracy and completeness", w: null,
        scope: "Judge Claude-generated output against the requirements, the source material and professional standards, checking both what is there and what is missing.",
        lesson: [
          "Your name on a deliverable makes every claim in it yours, whether you typed it or Claude did. Accountability is why this domain carries the most weight. The time Claude saves is small and visible; the cost of an unchecked error is large and arrives later, usually in front of someone whose trust you needed. The course calls the evaluating skill Discernment and the deciding-and-owning skill Diligence.",
          "Evaluating is not deciding the output looks fine. It is a repeatable check against three references, done the same way each time. Requirements: go back to your own request and tick off each part, including the awkward ones. Source material: follow individual claims back to the documents you gave Claude rather than assuming it read them closely. Professional standards: would a peer in your field accept it? Figures missing their units, advice with no reasons and references you cannot find all fail, however smooth the prose. Write the criteria before you read, or the fluency will have charmed you.",
          "Accuracy and completeness fail independently. Accuracy is about whether what is on the page is right; completeness is about what is not on the page at all. An output can be entirely accurate and still leave out the one factor that changes the decision, and missing things are harder to spot because a gap gives you nothing to look at. A common pattern: asked to compare a batch of documents, Claude produces a thorough-looking list of differences that is silent on the single most important file. Completeness failures gather where attention is lowest.",
          "Depth of review follows the stakes, and stakes depend on the field. Legal analysis, financial figures and compliance reporting are zero-tolerance: every claim is checked. An internal brainstorm needs a light read. The mistake is giving both the same casual glance, or wasting the saved time by over-checking a low-stakes draft. After review, sort the output into one of three states and note why: ready to use, needs revision (name the gap and iterate), or needs a person to take over (the stakes, errors or uncertainty mean it cannot go out on Claude's draft)."
        ],
        tables: [{
          cap: "Three verdicts after review",
          h: ["Verdict", "When it applies", "Example"],
          r: [
            ["Ready to use", "Meets the requirements, matches the sources, clears your field's standards, stakes fit the review done", "Five agenda ideas for an internal away-day"],
            ["Needs revision", "Close, with a specific, nameable gap", "A comparison of three quotes that left out a delivery surcharge stated in one of the PDFs"],
            ["Needs a person", "Stakes, errors or uncertainty mean it cannot ship on Claude's draft", "A gap analysis against an employment rule Claude recalled from training rather than a copy you supplied"]
          ]
        }],
        know: [
          "You are accountable for everything you ship, whoever drafted it.",
          "Three references: requirements, source material, professional standards. Same check every time.",
          "Completeness is a separate check from accuracy: look for what is missing, especially in the hardest material.",
          "Decide the stakes before you decide how deep to review.",
          "Three verdicts: ready, needs revision, needs a person. Write down why.",
          "Responses vary run to run, even with a configured Skill. Review is part of the process, not a sign something broke.",
          "Claude's knowledge stops at a training date; current facts need a connected source, web search or Research."
        ],
        build: ["Worked question Q2: the statistic and the hour", WQ + "q2--domain-2a-the-statistic-and-the-hour"],
        traps: [
          { move: "Every figure checked out, so the report is complete", why: "Accuracy and completeness fail separately. Check the report against the requirements for what is missing." },
          { move: "Have Claude list its own omissions and treat that as the completeness check", why: "The same model marking its own homework. Check completeness yourself against the requirements and the sources." },
          { move: "It reads well and sounds authoritative, so it is ready", why: "Fluency is not accuracy. Check against criteria written before you read." },
          { move: "Verify every line of every output to the same depth", why: "That spends the time Claude saved on low-stakes drafts. Set the review depth by the stakes." },
          { move: "Regenerate the report on a bigger model as the accuracy check", why: "A different model gives another unchecked draft. Evaluation means checking against requirements and sources." }
        ]
      },
      {
        title: "Identify hallucinations, inconsistencies and bias", w: null,
        scope: "Recognise the signatures of fabricated content, internal contradictions and biased framing in Claude's responses.",
        lesson: [
          "Claude writes with the same fluency whether it is right or wrong, so you cannot use tone to find errors. What you can do is learn the shapes errors take. The most dangerous is the plausible but unsupported claim: it fits the topic and sounds reasonable, with no basis in the source or in fact. Close behind are fabricated specifics: invented statistics, dates, names, quotations and citations. Detail feels like evidence, and that is what makes made-up detail convincing. An uncited '58 per cent of regional logistics firms' is a guess wearing a number's clothes; real figures that precise come with a source.",
          "Four tells to scan for: a citation that leads nowhere (a plausible report title or link that does not exist); a precise number with no source; an answer that contradicts itself; and words like 'definitely' and 'clearly' with nothing behind them. Confident tone also masks uncertainty: a question about whether a contract clause is enforceable in a particular jurisdiction should hedge and often does not. Assurance is not evidence. When you find one error, do not relax after fixing it; one error means there are likely others. Finding it starts the audit.",
          "Inconsistencies hide in long outputs because nobody reads fifty pages with every number in mind. Section 2 puts the customer base at about 40,000; section 9 builds its forecast on 46,000. Each reads fine alone. Long outputs need a consistency pass across the whole document, not just a paragraph-by-paragraph read. A related failure is capability hallucination: Claude says 'I have emailed your team' or 'I have saved the file' when it had no tool to do so. Treat any claimed external action as unverified until you see it happened.",
          "Bias has two sources worth naming. Confirmation bias in framing: if your prompt hints at the answer you want, Claude may lean towards it, so be wary of output that agrees with you too readily on a question that should be open. Slant on sensitive topics: only one side of a live debate appears, the other side appears but is dismissed in a line, or a group of people is treated unfairly or as a stereotype. Ask two questions of anything people-facing: are both sides treated fairly, and would every group described recognise itself?"
        ],
        tables: [{
          cap: "Failure signatures",
          h: ["Pattern", "How it shows up", "What to do"],
          r: [
            ["Unsupported claim", "Reasonable-sounding statement with no basis in the source", "Trace it to the source or remove it"],
            ["Fabricated specific", "Precise statistic, date, name, quote or citation with nothing checkable behind it", "Find the real source; if you cannot, cut it"],
            ["Confident uncertainty", "A jurisdiction- or date-sensitive answer stated flatly", "Treat as unverified; check an authoritative source or an expert"],
            ["Internal contradiction", "Two figures for the same thing in a long document", "Consistency pass across the whole output"],
            ["Capability hallucination", "Claims to have sent, saved or booked something", "Confirm the action happened outside the chat"],
            ["Framing or slant", "Agrees too readily; one side missing or dismissed; a group stereotyped", "Re-ask neutrally; check fairness to each side and group"]
          ]
        }],
        know: [
          "Four tells: a citation that leads nowhere, an unsourced precise number, self-contradiction, certainty with nothing behind it.",
          "Precision is not evidence; it is often the tell.",
          "One error found means look for more.",
          "Long outputs need a whole-document consistency pass.",
          "Claimed actions (sent, saved, booked) are unverified until you see them happen.",
          "A leading prompt invites a leaning answer. Ask open questions openly.",
          "Three slant tells: one side only, the other side dismissed in a line, a group treated unfairly or as a stereotype."
        ],
        build: ["Worked question Q2: the statistic and the hour", WQ + "q2--domain-2a-the-statistic-and-the-hour"],
        traps: [
          { move: "The statistic is precise and confidently stated, so it is probably reliable", why: "Precision without a source is a classic fabrication tell. Find the source or remove the figure." },
          { move: "Fix the one wrong figure and send the report", why: "One found error suggests others. Finish checking the rest before it goes out." },
          { move: "Claude said it emailed the summary to the team, so tick that off", why: "Claude cannot act without a tool for it. Confirm the email exists before relying on it." },
          { move: "The output mentions both sides, so it is balanced", why: "A view dismissed in a single line is not fair treatment. Check how each side is handled." },
          { move: "Read each page carefully on its own and approve the document", why: "Contradictions sit between pages. Run a consistency pass across the whole document." },
          { move: "It agrees with my view, which confirms I was right", why: "A prompt that signals the answer you want invites agreement. Re-ask neutrally and test the opposite case." }
        ]
      },
      {
        title: "Apply fact-checking and validation techniques", w: null,
        scope: "Use prompt techniques and external checks to reduce fabrication and to verify claims before relying on them.",
        lesson: [
          "The cheapest verification happens in the prompt, before there is any output to check. Three lines from Anthropic's guidance do most of the work. Give permission not to know: say that 'the provided materials do not cover this' is an acceptable answer; a model that thinks it must always answer will sometimes plug the gap with an invention. Restrict to the sources: for document work, tell Claude to answer only from the materials supplied and to list anything they do not cover; that turns open-ended generation into bounded retrieval. Require citations you can audit: ask for the section and clause behind each claim, and tell Claude to withdraw any claim it cannot cite.",
          "Two more techniques help with long or important material. Quote first, then analyse: ask Claude to extract the exact sentences that bear on the question before it draws conclusions, so both the reasoning and any errors become visible. Compare several runs: re-run the same request and compare. Where runs agree, confidence rises a little; where they differ is where a person should look hardest.",
          "None of that replaces the last step. For claims that matter, check against an authoritative external source: the regulation itself, the original report, the system of record. A citation is not verification; a real-looking reference can be wrong or not say what the answer claims, so you open it and read it. A second Claude response, or Claude rating its own confidence, is not an independent check. In some tools, in-product aids help: Claude in Excel, for example, can cite the specific cells a figure came from (confirm availability on your plan).",
          "Numbers are a special case. A figure written in prose is the model's best guess at a calculation. When a number will be reported or will feed a decision, have Claude compute it with code execution and check that totals reconcile with their line items. A subtotal that does not match its rows is a stop sign, whatever the formatting looks like."
        ],
        code: { cap: "Verification lines to paste into a document prompt (our wording)", text: "Answer using only the attached supplier contract. Do not use general knowledge.\nIf the contract does not address something I ask, list it under 'Not covered by this contract'.\nIt is fine to say you do not know.\n\nBefore you analyse, copy the exact clauses that bear on my question.\nThen base your answer only on those clauses, and cite the clause number after every claim.\nIf you cannot cite a clause for a statement, remove the statement." },
        know: [
          "Permit 'I don't know': the single most effective line against invented facts.",
          "Restrict to the supplied sources and ask for a 'not covered' list.",
          "Require auditable citations (section, clause, page) and tell Claude to drop what it cannot cite.",
          "Quote first, then analyse, for long documents.",
          "Comparing several runs shows where the answer is soft; agreement is not proof.",
          "Verification means opening an authoritative source and reading it. Self-checks and self-rated confidence are not verification.",
          "Numbers that matter are computed with code execution, and totals are reconciled before use."
        ],
        build: ["Worked question Q2: the statistic and the hour", WQ + "q2--domain-2a-the-statistic-and-the-hour"],
        traps: [
          { move: "Ask Claude to double-check its own answer before sending it", why: "The same model marking its own homework. Open the authoritative source yourself." },
          { move: "Have Claude score its own reliability out of ten and act on a high score", why: "Self-reported confidence is not an accuracy signal. Check the claim against the source." },
          { move: "It cites a subsection, so the claim is verified", why: "A citation can be invented or misread. Open the cited text and confirm it says what the answer claims." },
          { move: "Generate several answers and treat the majority view as verified", why: "Agreement between guesses is still a guess. Restrict to sources, require citations and check the important claims." },
          { move: "Tidy the wording and layout so the briefing looks authoritative", why: "Polish does nothing for correctness. Verify the claims first." },
          { move: "The other figures look plausible, so let one total that does not add up pass", why: "A total that does not reconcile is an error. Recompute with code execution and resolve it before use." }
        ]
      },
      {
        title: "Determine when human review is required", w: null,
        scope: "Recognise the thresholds at which an output needs human review or further verification before use, and escalate rather than iterate when judgement is needed.",
        lesson: [
          "Some work should never leave on a Claude draft alone, no matter how polished. Diligence is deciding where those lines sit before you need them, so escalation follows a rule you set calmly rather than a judgement made after something has slipped. Four questions set the threshold. Stakes: what does it cost if this is wrong? Reversibility: can it be undone? Once a report is filed or a deliverable sent, it cannot be pulled back, so it needs more checking than a draft. Audience: external, executive and regulatory readers raise the bar above internal working drafts. Regulatory exposure: does a law, rule or contract govern this content?",
          "Agree a short list of things that always get human review, and do not reopen it under deadline: finished work for clients; figures that matter to an audit or the accounts; anything touching regulated, confidential or very sensitive data; public statements and legal correspondence where an error would last. When output touches a person's rights, health, money or livelihood (legal advice, medical answers, lending, hiring), Claude's draft is an input, never the decision. A qualified person, accountable in that field, reviews before anyone acts. A colleague skimming it is not qualified review.",
          "Iterating and escalating are different moves. Iteration is worth it while each round gets better. Once rounds stop helping, especially on a high-stakes external deliverable, the next move is not another prompt; it is a person with the expertise or a fresh read. More prompting cannot manufacture judgement the situation needs. What tells you to stop is progress levelling off, not an error you can see.",
          "Three quick cases. Discussion questions for a team retrospective: low stakes, reversible, internal, unregulated; use them. A price schedule going to a major customer: money, an external reader and a commitment that is hard to withdraw; a person checks it and the figures are computed with code execution. A funding bid on its sixth round where the last three rounds barely moved: stop prompting and hand it to a colleague for a fresh read. Keep the sign-off where you can point to it; if nobody signed, it did not ship, it escaped."
        ],
        tables: [{
          cap: "Four thresholds",
          h: ["Threshold", "Ask", "Raises the bar when"],
          r: [
            ["Stakes", "What does an error cost?", "Money, safety, reputation or a person's opportunity is affected"],
            ["Reversibility", "Can it be undone?", "It is sent, filed, published or acted on"],
            ["Audience", "Who sees it?", "Clients, executives, regulators or the public"],
            ["Regulatory exposure", "Does a rule, contract or law govern it?", "Regulated content, contractual commitments, legal statements"]
          ]
        }],
        know: [
          "Four thresholds: stakes, reversibility, audience, regulatory exposure. Set the line before the moment.",
          "Fixed list: final client deliverables, material figures, sensitive or regulated data, public or legal communications.",
          "Rights, health, money or livelihood: a qualified, accountable person reviews before anyone acts.",
          "Accountability does not transfer to the tool. Work shipped with Claude is your work.",
          "When iteration stops improving a high-stakes output, escalate to a person instead of prompting again.",
          "A clean appearance is irrelevant to whether review is needed."
        ],
        build: ["Worked question Q3: who signs the shortlist", WQ + "q3--domain-2b-who-signs-the-shortlist"],
        traps: [
          { move: "The draft reads with total assurance, so it can go to the client unchecked", why: "Confidence is not a review. If the thresholds are tripped, a person checks it first." },
          { move: "A colleague skims the AI shortlist, then it goes to the hiring manager", why: "A skim is not qualified review. The accountable person in that field reviews and owns the decision." },
          { move: "Iterate the proposal a sixth time to get it over the line", why: "Rounds have stopped improving it. Escalate to a colleague or expert for a fresh read." },
          { move: "Send the report on time and correct the figures in a follow-up note", why: "Irreversible and regulated: resolve it before it leaves. Review comes before use, not after." },
          { move: "It is only an internal agenda, but send it for formal review to be safe", why: "Low stakes, reversible and internal: over-reviewing wastes the time saved. Review depth follows the thresholds." },
          { move: "Add a disclaimer that AI drafted it instead of having it reviewed", why: "A label does not replace accountable review. High-stakes output needs a qualified person's sign-off." }
        ]
      },
      {
        title: "Edit, adapt, refine and compare outputs for the audience", w: null,
        scope: "Turn raw output into a finished deliverable for its intended reader, and compare candidate drafts to pick the strongest base.",
        lesson: [
          "Claude drafts; you deliver. An accurate draft is still not finished. The editing pass is where your knowledge of the reader and your professional standards are applied. Three passes do most of it. Clarity: strip the hedges, firm up slack sentences and delete whatever adds nothing; Claude errs towards saying more, and editing is where you say it exactly. Tone: set the register for the relationship, because a colleague, a customer and an inspector hear the same words differently. Format: lay it out for the way it will be read, quick to scan for a director, full for the people doing the work, tidy for anyone outside.",
          "One analysis often has to become several deliverables. An executive version leads with the decision and the impact in a line or two. A working-team version keeps the method and the detail and adds the next action and owner. An external version decides what may be shared and how to put it. The facts do not change; the selection, depth and tone do. Name the reader in one phrase before you edit anything, then ask for that shape.",
          "The style of your prompt leaks into the answer: a prompt full of bullets tends to come back as bullets. Write the prompt the way you want the output to read. When quality matters, do not commit to the first response: ask for two or three drafts (rerun it, or try another model) and edit the best of them. Picking between candidates costs less than repairing a poor one, and a second draft often frames the point in a way you had not considered.",
          "Example: a raw paragraph says customer complaints seem to have risen by around 12 per cent this quarter, which may partly reflect the change of courier and possibly the new returns form, and that it might be worth reviewing both. The executive cut: 'Complaints up 12% this quarter, mainly the new courier and the returns form. Recommend a joint review with the courier this month.' The team cut keeps both causes, the evidence for each and an owner for the courier review. Neither is the raw draft, which suited nobody."
        ],
        tables: [{
          cap: "Same facts, three readers",
          h: ["Reader", "Lead with", "Keep", "Drop"],
          r: [
            ["Executive", "Decision and impact", "One number, one recommendation", "Method and hedging"],
            ["Working team", "What happened and what to do", "Method, drivers, owner and timeline", "Executive framing"],
            ["External", "What they need to know", "Agreed facts, careful framing", "Internal detail and anything not cleared to share"]
          ]
        }],
        know: [
          "Three editing passes: clarity, tone, format.",
          "Name the reader in one phrase, then ask for that shape.",
          "One analysis, several deliverables: facts fixed, selection and depth vary.",
          "Your prompt's style leaks into the output.",
          "When quality matters, compare several drafts and edit the strongest.",
          "An accurate draft is not a finished deliverable."
        ],
        build: ["Worked question Q3: who signs the shortlist", WQ + "q3--domain-2b-who-signs-the-shortlist"],
        traps: [
          { move: "One version for everyone keeps the message consistent", why: "It serves neither. Lead with the decision for executives; keep the method for the team." },
          { move: "The board can read Claude's draft as it stands", why: "A raw draft is not a deliverable. Edit for clarity, tone and format first." },
          { move: "Let Claude choose which readers to prioritise", why: "Both readers need serving, and that is your call. Produce a version for each." },
          { move: "Accept the first draft because regenerating wastes time", why: "When quality matters, comparing two or three drafts is cheaper than rescuing a weak one." },
          { move: "Edit only for grammar and leave the structure as Claude wrote it", why: "Structure is part of fitting the reader. Reshape the format for how it will be read." }
        ]
      },
      {
        title: "Organise information and select output formats", w: null,
        scope: "Curate inputs so outputs come back organised, and choose the format (artifact, inline, structured data, code-executed) that fits the use and the reliability needed.",
        lesson: [
          "The output format is a reliability decision as well as a presentation choice. Inline replies are for answers you will act on within the conversation. Artifacts are for deliverables: documents, tables, reports and code that appear as a separate, editable block beside the chat, ready to refine and reuse. Structured formats (tables, fixed schemas) are for data that a reader or another tool will consume directly. And when numbers must be right, have Claude compute them with code execution rather than write them.",
          "Code execution is the verified-output path. A total written in prose is a plausible guess at adding up a column; code execution runs the calculation over the actual file and returns a computed figure you can trace to the rows that produced it, plus charts and processed files. Be precise about what that guarantees: Claude writes the code, so the logic can still contain a bug. The guarantee is that the calculation can be read, checked and re-run, not that it is automatically correct. For a low-stakes gut check a prose figure may be fine; for anything that gets reported, use code execution.",
          "A fixed shape guarantees the shape and nothing else. Structured output can promise every field is present; it cannot promise the values are right. Format compliance is not verification: machines check the container, you still check the contents.",
          "Organised inputs give organised outputs, and curating inputs means removing as well as adding. De-duplicate, so Claude is not reconciling three near-identical drafts of the same memo. Label each input's role ('this is the approved policy; these are the draft responses'). Prune anything not relevant to the question, because noise in becomes noise out. Then state the structure you want back. Six overlapping files with contradictory drafts give a muddled summary; one approved version, clearly labelled, gives a clean one."
        ],
        tables: [{
          cap: "Pick the container by use and reliability",
          h: ["Output", "Use it for", "Watch out for"],
          r: [
            ["Inline reply", "Answers you act on in the chat", "Not a standalone deliverable"],
            ["Artifact", "Documents, tables, reports, small tools you will edit and reuse", "Still needs review before it is sent"],
            ["Structured data", "Tables or schemas another reader or tool consumes", "Shape is guaranteed; values are not"],
            ["Code-executed result", "Figures that will be reported or drive a decision; charts from real data", "Code can have a bug: read and re-run what matters"]
          ]
        }],
        know: [
          "Inline for replies, artifacts for deliverables, structured formats for data, code execution for numbers that must be right.",
          "A figure written as prose is an estimate dressed as a result; a figure from code execution can be traced.",
          "Code execution makes a calculation checkable, not automatically correct.",
          "Schema compliance is not verification: the contents are still yours to check.",
          "Curate inputs: de-duplicate, label each input's role, prune the irrelevant, and state the output structure.",
          "Choose the format by what the result is for, not by habit."
        ],
        build: ["Worked question Q2: the statistic and the hour", WQ + "q2--domain-2a-the-statistic-and-the-hour"],
        traps: [
          { move: "The output matches the schema, so the data is correct", why: "A schema checks shape, not truth. Check the values too." },
          { move: "Have Claude work out the figure in its reply and eyeball the result", why: "A prose figure cannot be traced. Use code execution so the calculation can be checked and re-run." },
          { move: "Request the figure as a neatly formatted table to make it reliable", why: "Formatting does not make arithmetic right. Compute it with code execution." },
          { move: "Include every draft version of the memo so nothing is missed", why: "Duplicates and contradictions muddle the result. Keep the approved version, label inputs, prune the rest." },
          { move: "Fix the muddled summary by moving to a bigger model with the same pile of files", why: "The inputs are the problem. Curate them before reaching for a bigger model." },
          { move: "Code execution produced the number, so it needs no review", why: "Claude wrote the code, and code can be wrong. Read and re-run the logic behind figures that matter." }
        ]
      }
    ],
    remember: [
      "Confidence is not accuracy; completeness is a separate check.",
      "Allow 'I don't know', fence the sources, cite every claim, open the source.",
      "Set the review line in advance; escalate when rounds go flat.",
      "Name the reader; pick the container by reliability."
    ]
  },

  /* ================================================================ D3 */
  {
    id: "d3", code: "D3", title: "Product and model selection", w: 12, eps: "EP 04", t: 2,
    summary: "The decisions made before the first prompt: which entry point (Chat, Projects, Artifacts, Research), which capability layers (Skills, code execution, Memory), which model tier, and how to manage the context budget across a session.",
    links: [
      ["▶", "Watch EP 04 (6 min)", YT + "6xZXW6I6gl0"],
      ["📘", "Full study guide", AO + "domains/03-product-and-model-selection.md"],
      ["❓", "Worked question Q4", WQ + "q4--domain-3-the-shallow-analysis"]
    ],
    highlights: [
      "Say the job in one verb, then pick the feature. The wrong door makes a good prompt look bad.",
      "Projects carry context, Skills carry procedure, code execution carries correctness, Memory carries continuity.",
      "Haiku for structured volume, Sonnet for most work, Opus for complex, high-stakes judgement. Capability up, speed down, cost up.",
      "Context is a budget. When a long session drifts: restart, summarise, or persist."
    ],
    subs: [
      {
        title: "Select appropriate Claude product features", w: null,
        scope: "Choose between Chat, Projects, Research and Artifacts, and the capability features layered on them (Skills, code execution, Memory), for a given professional task.",
        lesson: [
          "Claude has one interface but several working entry points, and choosing before you start decides how efficient the session is and whether today's context carries forward. Chat is the default: an unstructured conversation for one-off questions, quick drafts and exploration. Chats are saved and can be continued, and Memory can carry some context forward, but Chat does not give you a Project's deliberate persistence. Once you catch yourself re-pasting last week's background paragraph, the work belongs somewhere more permanent.",
          "A Project is a persistent workspace with three things: standing instructions that apply to every conversation in it, a knowledge base of documents uploaded once, and its own list of conversations. Conversations in a Project share the instructions and knowledge but not each other's context. The test for building one: does the task recur, is the background the same each time, is the output format consistent? Two yeses and the set-up time is usually recovered within two or three sessions. Example: a team lead who re-types the client background into a new chat before every fortnightly update moves that background and the update template into a Project; the quarter of an hour spent setting the scene disappears, and the updates are no worse.",
          "Artifacts are the right output when the result is a deliverable rather than a reply: draft documents, data tables, formatted reports, code, even a small interactive tool, shown as a separate editable block. Research runs multi-step searches across many sources and synthesises them; use it for deep investigation or current information beyond a quick lookup. Ordinary Chat can also search the web through a per-chat toggle; on Team and Enterprise plans an owner may have to enable web search for the organisation first. Plan availability for these features changes: confirm at docs.claude.com and support.claude.com.",
          "On top of the entry point sit capability layers, each solving a different problem. Projects carry context. Skills carry procedure: reusable instructions for doing a task type the same way every time; Anthropic provides built-in ones for spreadsheets, documents, slide decks and PDFs, and custom Skills can be added. Skills live at account level and Claude invokes them where relevant, inside or outside a Project. Code execution carries correctness: it runs calculations and processes files in a sandbox so results are computed, not guessed. Memory carries continuity: work-relevant facts that follow you between sessions. The layers are independent; a one-off question needs none, a recurring analytical workflow may use all four. Even a well-built Skill reduces variation without removing it, so review stays in the workflow."
        ],
        tables: [
          {
            cap: "Entry point from the job",
            h: ["The job", "Entry point", "Why"],
            r: [
              ["A one-off question or draft you will not repeat", "Chat", "Starts and ends in the session; no set-up worth paying for"],
              ["The same work on the same background every week", "Project", "Instructions and knowledge set once, reused every session"],
              ["A document, table, report or small tool someone will open", "Artifact", "A separate, editable deliverable rather than a reply"],
              ["Deep or current information across many sources", "Research (web search in Chat for a quick fact)", "Multi-step search and synthesis beyond training data"]
            ]
          },
          {
            cap: "Four capability layers",
            h: ["Layer", "Solves", "Ask"],
            r: [
              ["Project", "Context", "Which background and standing rules apply to this workstream?"],
              ["Skill", "Procedure", "Which steps are the same every time?"],
              ["Code execution", "Correctness", "Which outputs must be computed, not just sound right?"],
              ["Memory", "Continuity", "Which facts should carry over without re-entry?"]
            ]
          },
          {
            cap: "Putting it together (our own scenarios)",
            h: ["Scenario", "Configuration"],
            r: [
              ["A one-off thank-you letter to a retiring volunteer", "Chat, with an artifact for the letter · Sonnet"],
              ["Fortnightly project update in the same template for a year", "Project + Skill · Sonnet"],
              ["Which regulators issued guidance on a topic in the last two months", "Research · Sonnet"],
              ["Attendance rates by site from 1,200 training records, flagging sites under 70%", "Code execution · Haiku or Sonnet"],
              ["A recommendation to the leadership team drawn from three consultants' reports that disagree", "Project knowledge base + artifact · Opus"],
              ["Monthly stock reconciliation in a fixed template, flagging items more than 5% out", "Project + code execution + Skill · Sonnet"]
            ]
          }
        ],
        know: [
          "Chat for one-off work; Project for recurring work with stable context; Artifact for deliverables; Research for deep or current multi-source work.",
          "Project test: recurs, same background, consistent format. Two yeses: build it.",
          "Conversations in one Project share instructions and knowledge, not each other's history.",
          "Projects carry context, Skills carry procedure, code execution carries correctness, Memory carries continuity.",
          "Skills sit at account level and apply wherever relevant; built-in ones cover Excel, Word, PowerPoint and PDF work.",
          "Configured Skills reduce variation; they do not remove the need to review.",
          "Feature names and plan availability change: confirm at docs.claude.com on the day."
        ],
        build: ["Worked question Q4: the shallow analysis", WQ + "q4--domain-3-the-shallow-analysis"],
        traps: [
          { move: "Paste the same background into a new chat every week", why: "Recurring work with the same context and format belongs in a Project, set up once." },
          { move: "Ask Claude to add up the figures in its answer", why: "A language answer can look right and be wrong. Use code execution for numbers that must be correct." },
          { move: "Use plain chat from training knowledge for what competitors launched last month", why: "That is after the training cut-off. Use Research, or web search for a quick fact." },
          { move: "Build a Project for a question you will ask once", why: "Set-up costs time that a one-off never repays. Use Chat." },
          { move: "Rely on Memory to hold the weekly report's format and background", why: "That is standing configuration. Put it in the Project's instructions and knowledge base, or a Skill." },
          { move: "The Skill is configured, so the output no longer needs checking", why: "Skills reduce variation; they do not remove it. Review stays in the workflow." }
        ]
      },
      {
        title: "Differentiate Claude model types", w: null,
        scope: "Distinguish Haiku, Sonnet and Opus by their capability characteristics and the kinds of task each fits.",
        lesson: [
          "The capability layer decides what Claude does; the model decides how well it does it, and at what cost in speed. The exam uses a three-tier frame. Haiku is the fastest and most efficient: it handles structured work well (classification, extraction, formatting, straightforward summaries) and high-volume routine jobs where speed matters and an imperfect output costs little. When a task runs across hundreds of items, Haiku's speed advantage compounds.",
          "Sonnet is the balanced tier and the right starting point for most knowledge work: drafting, synthesis, analysis, research help and document review, with strong quality across task types. If quality falls short on a complex task, move up to Opus; if the task is structured and speed or volume matters most, consider Haiku.",
          "Opus is the higher-capability tier for nuanced judgement, complex multi-step reasoning, ambiguous inputs that need interpretation, and anything where getting it right matters more than getting it fast: work for clients, dense document review, strategy, and pulling many sources together when the stakes are high. It produces better output on complex tasks at the price of being slower and, on metered plans, using more per call.",
          "The line-up moves. The course notes that by mid-2026 a further tier sat above Opus and that Opus latency had improved, but the certification teaches the three-tier Haiku, Sonnet, Opus frame. Which models appear in your picker, which is the default and whether the product switches automatically all vary by plan and over time. Learn the frame; read the current line-up at docs.claude.com."
        ],
        tables: [{
          cap: "The three tiers",
          h: ["Tier", "Strengths", "Typical work", "Trade-off"],
          r: [
            ["Haiku", "Fastest, most efficient", "Classify, extract, tag, format, simple summaries at volume", "Not for nuanced judgement"],
            ["Sonnet", "Balanced quality and speed", "Most drafting, synthesis, analysis and review", "May fall short on the hardest, most ambiguous work"],
            ["Opus", "Highest capability of the three", "Complex judgement, ambiguous inputs, high-stakes deliverables", "Slower; uses more per call on metered plans"]
          ]
        }],
        know: [
          "Haiku: structured, routine, high volume, low cost of an imperfect output.",
          "Sonnet: the default for most professional drafting, synthesis and analysis.",
          "Opus: nuanced judgement, multi-step reasoning, ambiguous inputs, high stakes.",
          "Capability up, speed down, cost up. Nobody gets all three at the top.",
          "The exam frame is three tiers; the real line-up, default and auto-switching vary by plan and time.",
          "Measure on your own tasks rather than choosing a tier on mood."
        ],
        build: ["Worked question Q4: the shallow analysis", WQ + "q4--domain-3-the-shallow-analysis"],
        traps: [
          { move: "Use the most powerful model for everything to be safe", why: "It wastes money and time on simple volume work. Fit the tier to the task." },
          { move: "Use the fastest model for a strategic analysis of ambiguous reports to save time", why: "Speed tiers are for structured work. Ambiguous, high-stakes judgement belongs on a more capable tier." },
          { move: "Sonnet is the middle option, so it is never the right answer", why: "Sonnet is the default for most knowledge work. Move up or down only for a reason." },
          { move: "Memorise this month's model names as the thing being tested", why: "Names change. The durable skill is matching the tier's characteristics to the task." }
        ]
      },
      {
        title: "Align model selection with task requirements", w: null,
        scope: "Match the model to the task's needs for quality, speed and cost, and adjust before switching when results fall short.",
        lesson: [
          "Matching tier to task avoids two opposite mistakes: paying for depth that routine work never uses, and starving important analysis of the depth it needs. Start with the task profile. Repetitive, well-structured sorting or extraction in bulk: Haiku. Everyday drafting, synthesis and analysis: Sonnet. Hard judgement, high-stakes output, ambiguous or layered inputs: Opus. Example: a large batch of short, routine reply drafts, where turnaround and cost count for more than depth, suits a fast, low-cost tier, with the most capable model kept for the rare complex case.",
          "Cost depends on the plan. On metered or usage-budgeted plans (including API access), the speed-versus-capability trade is also a per-call cost trade: a higher tier uses more per call. On a standard claude.ai subscription, treat efficiency (speed and usage headroom) as the practical stand-in for cost. The selection logic is the same either way. Cost is managed by fitting the tier to the task, never by switching features off.",
          "When an answer disappoints, do not jump straight to a bigger model. Walk the staircase in order. First, ask what is missing: if Claude never saw the numbers or the contract, no model will guess them. Second, same model, more room to think: deeper reasoning on the same tier is cheaper than a bigger model. Third, only then move up one tier. Notice what is not on the staircase: re-running the same request. Same input, same model, same shallow answer; a retry with no new information is a lottery ticket, not a fix.",
          "Workloads change, so revisit the match. A mixed queue can be split: route the easy items to the fast tier and the hard ones up the ladder, instead of running everything on one."
        ],
        tables: [{
          cap: "Tune before you switch",
          h: ["Step", "Move", "Cost"],
          r: [
            ["1", "Supply what is missing: the data, the document, the context", "Minutes"],
            ["2", "Same model, more room to think", "A little time"],
            ["3", "Move up one tier", "More per call on every run"],
            ["Not a step", "Run the same request again", "A lottery ticket"]
          ]
        }],
        know: [
          "Task profile first, then tier: volume and structure, everyday knowledge work, or complex judgement.",
          "On metered plans higher tiers cost more per call; on subscriptions think speed and usage headroom.",
          "Staircase: missing information, then more thinking, then one tier up.",
          "A blind retry is never the fix.",
          "Cost is managed by fitting the tier, not by turning features off.",
          "Mixed workloads can be routed: easy items to the fast tier, hard ones up."
        ],
        build: ["Worked question Q4: the shallow analysis", WQ + "q4--domain-3-the-shallow-analysis"],
        traps: [
          { move: "Run the same request again and hope for a deeper answer", why: "Same input, same model, same answer. Add the missing information or room to think first." },
          { move: "The analysis was shallow, so request budget for the top model straight away", why: "Check whether Claude had the information it needed, then give it more room to think. Move up a tier last." },
          { move: "Save money by disabling Research and code execution for the whole team", why: "Cost is controlled by matching the tier to the task, not by crippling the tool." },
          { move: "Move the whole team to another tool because one batch ran slowly", why: "The trade-off is solved inside the model choice. Pick a faster tier for routine volume." },
          { move: "Run every item in a mixed queue on the top tier so the hard ones are covered", why: "Most items do not need it. Route easy items to a fast tier and send only hard ones up." }
        ]
      },
      {
        title: "Manage context limitations and memory", w: null,
        scope: "Recognise context limits and decide when to restart, summarise or persist information, including how Memory, project-scoped Memory and Incognito behave.",
        lesson: [
          "Every conversation has a working-memory budget, and it runs down as messages and documents pile up. The course describes claude.ai automatically summarising earlier messages as a conversation nears its limit (on paid plans with code execution enabled), so the session can continue. Summaries compress detail. That is why instructions Claude followed in the first ten minutes can lose force ninety minutes later: Claude has not chosen to ignore them; the summary has squeezed them. Long piles of material also have a soft middle, where things are most easily missed.",
          "Signs a session needs help: Claude stops following instructions it followed earlier; responses address only the latest message and ignore earlier decisions; accuracy drops in ways consistent with missing early context. Three responses. Restart: open a new conversation; in a Project the instructions and knowledge carry over, the thread does not. Right when the session has drifted beyond recovery or you are starting a genuinely new task. Summarise: before restarting, ask Claude for the current state (decisions made, work in progress, open questions) and paste that into the new conversation. Carry decisions forward, not transcripts. Persist: information every future session needs goes into Memory or the Project knowledge base, so it never has to be re-entered.",
          "Memory keeps work-relevant facts across sessions: your role, format preferences, frequent collaborators, standing constraints. It is most useful when curated. A memory that was true last quarter and never reviewed can actively mislead, so review it regularly (the course suggests monthly for active users), delete what has expired and keep it to what genuinely recurs. Project-scoped Memory keeps each Project's memory separate, so client A's context never appears in client B's sessions. Incognito chats stay out of Memory and chat history; use them for sensitive or exploratory conversations, remembering that they still follow your organisation's data retention (Domain 6). Memory import from other assistants was described as experimental in mid-2026; check availability on your plan.",
          "Usage limits also shape long work. Per the course, limits apply over more than one period (a rolling short window and, on paid plans, a weekly allowance), and the details differ by plan. Heavy sessions on higher tiers can hit a limit mid-task. Plan for it: split big jobs into parts, park interim results in the knowledge base, and pick up from a summary instead of running one marathon session. Confirm current limits in the Help Center."
        ],
        tables: [{
          cap: "Restart, summarise or persist",
          h: ["Response", "Use when", "What carries over"],
          r: [
            ["Restart", "The session has drifted beyond recovery, or a new task begins", "Project instructions and knowledge; not the thread"],
            ["Summarise", "You need continuity but the window is degraded", "A pasted summary of decisions, work in progress and open questions"],
            ["Persist", "Every future session needs this information", "Memory or the Project knowledge base, automatically"]
          ]
        }],
        know: [
          "Context is a budget. As it fills, earlier detail is compressed and early instructions lose force.",
          "Warning signs: instructions it followed earlier are dropped, earlier decisions ignored, accuracy slips.",
          "Restart, summarise or persist. Carry decisions forward, not transcripts.",
          "Memory is curated: review regularly, delete what expired, keep what recurs.",
          "Project-scoped Memory keeps workstreams and clients apart.",
          "Incognito keeps a chat out of Memory and history; it does not override organisational retention.",
          "Plan long work around usage limits: segment, save interim results, restart from a summary."
        ],
        build: ["Worked question Q4: the shallow analysis", WQ + "q4--domain-3-the-shallow-analysis"],
        traps: [
          { move: "Paste the whole previous transcript into the new chat so nothing is lost", why: "That rebuilds the same overloaded window. Carry a summary of the decisions and open items instead." },
          { move: "Repeat the formatting instruction louder in the same two-hour session", why: "The session's early context has degraded. Restart from a summary, or persist the format as a standing instruction." },
          { move: "Let Memory keep everything so Claude never forgets", why: "Stale and excess entries mislead. Keep what genuinely recurs and review it." },
          { move: "Keep one long conversation running all week to save setting up", why: "Quality sags as the window fills. Persist what recurs and start fresh conversations." },
          { move: "Use one Project for two competing clients and rely on careful prompting to keep them apart", why: "Separate Projects with their own scoped Memory are what keep contexts apart." }
        ]
      }
    ],
    remember: [
      "Verb first, then the door.",
      "Context, procedure, correctness, continuity.",
      "Missing information, more thinking, then one tier up.",
      "Restart, summarise, persist."
    ]
  },

  /* ================================================================ D4 */
  {
    id: "d4", code: "D4", title: "Workflow integration and solution design", w: 16, eps: "EP 05", t: 3,
    summary: "Turning personal Claude use into a team workflow: extracting requirements, planning on verified numbers, iterating a solution, deciding step by step what to delegate, and describing the result to stakeholders without overstating it.",
    links: [
      ["▶", "Watch EP 05 (7 min)", YT + "tzEhyG-QbTE"],
      ["📘", "Full study guide", AO + "domains/04-workflow-integration.md"],
      ["❓", "Worked question Q5", WQ + "q5--domain-4-the-impressive-rebuild"]
    ],
    highlights: [
      "The value is in picking which steps Claude takes on, not in giving it the whole process.",
      "Map each step on reversibility, stakes and accountability: AI-appropriate, collaborative or human-retained.",
      "Augment a healthy process; redesign only a broken one. Start simple; reach for an agent last.",
      "Say what it does and name the human checkpoint in the same breath. Use your own pilot numbers."
    ],
    subs: [
      {
        title: "Analyse requirements and use cases with Claude", w: null,
        scope: "Use Claude to turn messy inputs into structured, testable requirements, and to identify where in a process Claude adds value.",
        lesson: [
          "Work rarely arrives tidy. It comes as a long document, a tangle of emails or something said in a corridor. Claude is good at converting that into requirements others can work from. Upload the raw inputs and ask for a structured analysis rather than a narrative summary: each requirement as a row, with its source, its status and anything ambiguous or missing flagged.",
          "A business need stated as 'we need better reporting' is not actionable. Claude can help turn it into task definitions you can build against and check: which report, for whom, how often, from which data, in which format. Example: a bid team turns a 40-page tender document and a scattered email thread into a table of every distinct requirement, each traced to its section, marked answered or open, with ambiguities flagged as clarifying questions for the client. Because this recurs, it lives in a Project: past winning bids in the knowledge base, the extraction format in the standing instructions, the formatting procedure in a Skill. No technical build is needed.",
          "Extraction is the first pass; pressure-testing makes it trustworthy. Then ask Claude to attack the list it produced: which requirements are ambiguous as written, which could two people read two ways, which are implied only indirectly by an evaluation criterion or a subordinate clause? Those hidden requirements are the ones that lose bids. A requirement like 'reports must load quickly' is the kind to flag: two teams would build different things until someone puts a number on it. Then you, not Claude, confirm the list against the source.",
          "The same analysis finds use cases. Walk the process step by step and mark two things on each step: how much time it takes and how much of it is language work (reading, drafting, summarising, comparing). Where both are high, Claude is likely to pay off. Rank candidates by impact against effort and start where impact is high and effort low. One measured step beats AI installed everywhere at once."
        ],
        code: { cap: "Requirements extraction prompt (our own scenario)", text: "From the attached tender document and the email thread, list every distinct requirement the client asks us to meet.\nReturn a table with: a short label, the tender section it comes from, whether our thread already answers it (yes / partly / no),\nand a note if the requirement is ambiguous or could be read two ways.\nDo not merge requirements that appear in different sections.\n\nThen, separately: list any requirement the document implies only indirectly, for example through a scoring criterion." },
        know: [
          "Ask for structure (a requirements table with sources and status), not a narrative summary.",
          "Turn vague needs into task definitions: what, for whom, how often, from which data, in which format.",
          "Pressure-test the list: ambiguous, two readings, implied indirectly.",
          "Vague words like large, fast, user-friendly mark a requirement that needs a number.",
          "Recurring extraction work belongs in a Project with a Skill for the format.",
          "Find use cases by marking each step for time taken and language work; start high-impact, low-effort."
        ],
        build: ["Worked question Q5: the impressive rebuild", WQ + "q5--domain-4-the-impressive-rebuild"],
        traps: [
          { move: "Ask Claude for a narrative summary of the tender and work from that", why: "A summary is not a checklist. Ask for each requirement as a traced, status-marked row." },
          { move: "Accept the extracted requirements list as complete and start writing", why: "Extraction misses implied and ambiguous requirements. Pressure-test the list, then check it against the source." },
          { move: "Roll Claude out across the whole department at once for maximum impact", why: "Nothing is measured, so nothing can be shown to work. Target the step where time and language work are both high." },
          { move: "Start with the step people complain about loudest", why: "Loud is not the same as valuable. Rank steps by time taken and language work, then impact against effort." }
        ]
      },
      {
        title: "Leverage Claude for research, planning and process optimisation", w: null,
        scope: "Use Claude to synthesise research, build plans and improve processes, pairing synthesis with computed analysis and keeping judgement steps human.",
        lesson: [
          "Plans combine two kinds of work that need different treatment: pulling ideas together, which Claude does well, and arithmetic, which must be computed and checked. Claude can gather the considerations, lay out the options and set out the trade-offs. For information after its training date, web search covers quick lookups and Research supplies deeper current inputs. Synthesis is also where unverified claims enter a plan, so the checking habits from Domain 2 apply throughout.",
          "Where the plan depends on figures, get them computed. Give Claude the dataset and let code execution work out trends, rates and totals and to draw the charts, then have Claude synthesise the recommendation from those computed figures. A staffing plan built on a guessed utilisation rate is a guess; one built on a computed analysis of the actual timesheets stands up to questions about every line. Marking which parts of a plan depend on a figure shows you where checking matters most.",
          "Not every step benefits equally. Synthesis steps, where many considerations must be weighed and structured, are where Claude adds most. Judgement steps, where a person weighs risk appetite, budget reality or politics Claude cannot see, stay human. Example: a training manager uploads two years of course bookings, has code execution work out growth by course type and the average number of delegates per session, and asks Claude to recommend how many trainer days to book next year, with its assumptions listed. Claude's contribution is a recommendation the data supports; whether to commit the budget, given a spending freeze Claude cannot see, is the manager's call.",
          "For process optimisation, the same method applies: map the current steps, find the repeated and language-heavy ones, and test an improvement on one step with a measure you care about (time per cycle, revision rounds, errors caught) before changing more."
        ],
        code: { cap: "Planning on computed figures (our own scenario)", text: "Use code execution on the attached booking export (24 months).\n1. Calculate year-on-year growth in bookings for each course type and the average delegates per session.\n2. Show the figures in a small table and a line chart.\n3. From those figures only, recommend how many trainer days to book next year to keep sessions at no more than 12 delegates.\n   List every assumption you make, separately from the calculation." },
        know: [
          "Claude synthesises; code execution computes. Plans rest on computed numbers.",
          "Current information: web search for a quick fact, Research for depth.",
          "Ask Claude to show its assumptions separately from its figures.",
          "Synthesis steps go to Claude; judgement steps (risk appetite, budget, politics) stay with a person.",
          "Optimise one step at a time against a measure you chose in advance."
        ],
        build: ["Worked question Q5: the impressive rebuild", WQ + "q5--domain-4-the-impressive-rebuild"],
        traps: [
          { move: "Ask Claude to estimate growth and throughput from the data in prose", why: "Plans need computed figures. Use code execution, then synthesise from the verified numbers." },
          { move: "Use industry averages from Research instead of your own data", why: "Your own data is what the plan must fit. Compute from it; use outside figures only as context." },
          { move: "Let Claude decide whether to hire because its analysis is thorough", why: "The hiring decision weighs budget and constraints Claude cannot see. Claude recommends; the lead decides." },
          { move: "Have Claude recall typical figures from its training data for the plan", why: "Recalled figures may be dated or invented. Compute from the actual dataset." }
        ]
      },
      {
        title: "Support solution design, development and iteration", w: null,
        scope: "Use Claude as a design collaborator through an explicit loop of ideation, prototype, feedback and refinement, and recognise when a solution has outgrown the associate's scope.",
        lesson: [
          "Treat Claude as a partner in design rather than a machine that dispenses answers. The value comes from a deliberate loop: generate options, make one concrete as a prototype, gather feedback, refine, and repeat until the solution holds. Running the loop inside a Project keeps the context, constraints and earlier decisions stable, so every round starts from where the previous one ended.",
          "Non-developers can get a long way by describing changes rather than coding them. Example: a team wants a simple holiday-cover planner. Round one asks Claude for an artifact showing who is off when, from the attached rota. Round two highlights days that fall below minimum cover and adds a filter by team. Round three adds a printable month view. Three rounds, and nobody on the team wrote any code. The same loop works for a process design, a template or a training plan.",
          "Know the escalation signal. The planner worked because it served one small team's internal need. When a solution becomes something others depend on, with expectations of uptime, security, access control or integration with other systems, it has outgrown associate scope. If other departments start planning their staffing around that planner, the next step is to bring in a Claude Developer or Architect, not another prompt. Recognising that boundary and escalating across it is itself a tested skill.",
          "Keep the loop honest: test each version against the need you started from, collect feedback from the people who will use it, and change one thing per cycle so you know what helped."
        ],
        know: [
          "The loop: ideate, prototype, feedback, refine, repeat.",
          "Run it in a Project so context and decisions stay stable between cycles.",
          "Describe the change you want; artifacts let non-developers build small tools by iteration.",
          "When others depend on it as infrastructure (uptime, security, integration), escalate to Developer or Architect expertise.",
          "Test each version against the original need, with the real users."
        ],
        build: ["Worked question Q5: the impressive rebuild", WQ + "q5--domain-4-the-impressive-rebuild"],
        traps: [
          { move: "Other departments now plan around the artifact, so keep extending it by prompt", why: "It has become a system others depend on. Escalate to Developer or Architect expertise." },
          { move: "Move to a more capable model so the artifact can serve the whole company", why: "The issue is dependency, security and integration, not model power. Escalate the build." },
          { move: "Start each iteration in a fresh chat so Claude sees the problem with fresh eyes", why: "You lose the constraints and decisions already made. Keep the loop in a Project." },
          { move: "Ask Claude for the finished tool in one prompt with every feature listed", why: "Big-bang requests hide what went wrong. Build, get feedback and refine in cycles." }
        ]
      },
      {
        title: "Integrate Claude into existing workflows", w: null,
        scope: "Augment or redesign workflows by deciding, step by step, which work is AI-appropriate, collaborative or human-retained, and embedding the right feature at each AI step.",
        lesson: [
          "There is a difference between 'I use Claude' and 'our workflow uses Claude'. The second is a repeatable process where Claude does specific steps every time, and it can go wrong when teams delegate the wrong steps. Picture two finance teams using Claude for supplier invoice queries. One has Claude draft each reply and a clerk check it against the ledger before it goes; replies get faster and stay accurate. The other lets Claude send replies itself; one promises a credit nobody approved, and the tool is switched off. Same product; different delegation. The course calls this competency Delegation.",
          "Map the workflow step by step and classify each step as AI-appropriate, collaborative or human-retained, judged on three criteria. Reversibility: if Claude gets this step wrong, can it be put right? Stakes: what does an error at this step cost? Accountability: who answers for the result? Claude can draft; it cannot take the blame. Then fit a feature to each AI step: a Skill where a procedure repeats, code execution where data is involved, and a named review gate at every human step. A configured Skill gives the same result on a busy day; a clever prompt someone has to remember does not.",
          "Watch for three mapping errors. Halo delegation: handing a step to AI because the previous one went well; judge each step on its own. Collapsing collaborative into automatic: 'AI drafts, a person reviews' becomes 'AI drafts' when nobody actually staffs the review; if nobody is actually assigned to review, the step is automated in all but name. Mapping the tool instead of the work: designing around a Skill you like rather than the actual steps. Over-delegation is giving AI an irreversible or high-accountability step because it drafted well; drafting quality is not a licence to delegate the decision.",
          "Augment or redesign? If the process works and the existing tools already hold the data, connect Claude at the step that pays and leave the rest standing. Redesign is for a process that is already broken, where steps exist only because old tools forced them. And start simple: a direct prompt and built-in features first; a chain (one step feeds the next), a router (easy items to a fast model, hard ones up) or parallel sections when needed; a free-running agent last, because flexibility costs control."
        ],
        tables: [{
          cap: "Delegation map: supplier invoice handling (our own example)",
          h: ["Step", "Classification", "Why"],
          r: [
            ["Extract supplier, amounts and PO number from each invoice", "AI-appropriate (code execution for totals)", "Mechanical, reversible, must be exact"],
            ["Check each line against the purchase order and price list", "AI-appropriate (a Skill carries the matching rules)", "Rule-based, reversible, flagged not acted on"],
            ["Draft a query to the supplier about mismatches", "Collaborative", "Claude drafts; the accounts clerk edits tone and facts"],
            ["Approve the invoice for payment", "Human-retained", "Money leaves; accountability stays with the approver"],
            ["Release the payment", "Human-retained", "Irreversible and external"]
          ]
        }],
        know: [
          "Delegate deliberately: value comes from choosing the steps, not automating everything.",
          "Three criteria per step: reversibility, stakes, accountability.",
          "Three classes: AI-appropriate, collaborative, human-retained. Approvals and irreversible actions stay human.",
          "Embed features: Skill for procedure steps, code execution for data steps, named review gates for human steps.",
          "Mapping errors: halo delegation, unstaffed review gates, mapping the tool instead of the work.",
          "Augment a healthy process; redesign only a broken one.",
          "Start simple: prompt, then chain, router or parallel; an agent last."
        ],
        build: ["Worked question Q5: the impressive rebuild", WQ + "q5--domain-4-the-impressive-rebuild"],
        traps: [
          { move: "Claude drafted the redlines well, so let it approve the low-risk clauses too", why: "Halo delegation. Approval is high-accountability and hard to undo; it stays with a person." },
          { move: "Rebuild the whole working process around Claude", why: "It sounds like vision; it is how healthy processes die. Augment the step that pays." },
          { move: "Build an autonomous agent because it is the most advanced option", why: "Complexity before evidence. Most work is served by a prompt, a chain or a router." },
          { move: "Keep a human in the loop, without naming who reviews what and when", why: "An unstaffed gate is automation in disguise. Name the reviewer, what they check and when." },
          { move: "Design the workflow around the Skill the team already built", why: "Map the work first, then choose features for each step." },
          { move: "Let Claude send the signed contract once the human has approved it", why: "Sending is irreversible, external and binding. Keep it human-retained." }
        ]
      },
      {
        title: "Communicate Claude's value and limitations to stakeholders", w: null,
        scope: "Describe what a Claude-assisted workflow does and does not do, calibrated to the audience, with the human oversight named and the value measured.",
        lesson: [
          "Once Claude is part of a team process, you will explain it to people who were not involved: your manager, a client, the risk team. They will trust you if your claims hold up, so give the limits the same airtime as the benefits. 'Claude drafts the first-pass redline, which a lawyer reviews' is accurate and credible. 'Claude handles contract review' promises more than it delivers, and the first mistake will make that obvious.",
          "Calibrate the message to the audience's AI literacy. Take the invoice-query workflow. The finance manager wants the mechanics and the weak spots: Claude reads the query, matches it to the ledger and drafts a reply; it does not approve credits; it can misread a query that refers to two invoices at once. The finance director wants the result, the safeguards and the risk: replies out in a day instead of three, every reply still checked by a clerk. The auditors want assurance: no reply leaves without a named person approving it, and approvals are logged. Same workflow, same gate, different detail.",
          "Name the review gates. Naming the human checkpoints raises confidence in an AI-assisted process; it does not undermine it. Watch for phrases that quietly overstate: 'fully automated' is almost never true; 'Claude handles X' removes the human gate from the sentence; 'basically as good as a person' sets a standard the tool will eventually miss in public. The fix is always the same: say what the tool does, then name the human checkpoint.",
          "Quantify with your own pilot numbers, never a vendor's headline. Say what it costs and where it still fails, and frame the change as capacity moved to better work, not people replaced. If you cannot quantify the value yet, that is a signal to pilot longer, not a presentation problem."
        ],
        tables: [{
          cap: "Overstated or accurate",
          h: ["Overstated", "Accurate"],
          r: [
            ["Our AI answers supplier invoice queries automatically.", "Claude drafts each reply from the ledger; a clerk checks and approves every reply before it is sent."],
            ["Claude handles first-line customer queries.", "Claude drafts replies to routine queries; an agent checks each against the account before it is sent."],
            ["It is as good as an analyst.", "In our six-week pilot it cut first-draft time from 3 hours to 1, with the analyst checking every figure."]
          ]
        }],
        know: [
          "State value and limits together, with the human checkpoint named.",
          "Specialists want detail and failure modes; executives want outcome, oversight and risk posture; risk functions want assurance.",
          "Avoid fully automated, handles X, as good as a person.",
          "Use your own pilot numbers, including costs and failures.",
          "Frame as capacity moved to better work, not replacement.",
          "Cannot quantify yet? Pilot longer."
        ],
        build: ["Worked question Q5: the impressive rebuild", WQ + "q5--domain-4-the-impressive-rebuild"],
        traps: [
          { move: "Quote the vendor's headline productivity figure to the board", why: "Borrowed numbers do not survive the first bad week. Use your own pilot results." },
          { move: "Describe the workflow as fully automated to build excitement", why: "It hides the human gate and sets an expectation the first error breaks. Say what it does and who checks." },
          { move: "Leave out the known failure modes so the pitch stays positive", why: "Stakeholders learn them at the worst moment. Limits stated up front build trust." },
          { move: "Give every audience the same technical briefing", why: "Executives and risk functions need different detail. Calibrate to the audience's literacy and concerns." },
          { move: "Present it as letting the team cut headcount", why: "Replacement framing loses trust and overstates. Frame it as capacity moved to better work." }
        ]
      }
    ],
    remember: [
      "Map the steps: reversibility, stakes, accountability.",
      "AI drafts; a person approves and sends.",
      "Augment the healthy; escalate what others depend on.",
      "Value and limits in one breath, with your own numbers."
    ]
  },

  /* ================================================================ D5 */
  {
    id: "d5", code: "D5", title: "Configuration and knowledge management", w: 12, eps: "EP 06", t: 4,
    summary: "Moving from using Claude to operating it: putting each recurring need in the right slot (instructions, knowledge, Skills, scoped Memory), keeping connectors narrow, writing instructions precise enough to hold, and maintaining the set-up before it decays.",
    links: [
      ["▶", "Watch EP 06 (6 min)", YT + "2yhNNgyyDO8"],
      ["📘", "Full study guide", AO + "domains/05-configuration-and-knowledge.md"],
      ["❓", "Worked question Q6", WQ + "q6--domain-5-the-weekly-report-setup"]
    ],
    highlights: [
      "Behaviour goes in instructions, facts in knowledge, procedures in Skills, settled continuity in scoped Memory.",
      "Fence the knowledge: answer only from these sources, and say unknown otherwise.",
      "Give every connector the narrowest access the job needs, and learn where its capability ends.",
      "Configuration decays silently. Review it on a schedule; stale set-up is a maintenance problem, not a prompting one."
    ],
    subs: [
      {
        title: "Configure Claude Projects with instructions and knowledge", w: null,
        scope: "Set up Projects so standing instructions, knowledge sources, Skills and scoped Memory each hold the right part of a recurring need.",
        lesson: [
          "Using Claude means typing a good prompt today. Operating Claude means preparing the ground so that context, rules and procedures are waiting before anyone types, and each conversation begins from a prepared starting point. Configuration is leverage: set it up once and benefit on every conversation after. It also turns individual skill into team capability: with a well-kept set-up, colleagues asking the same thing get answers of the same standard.",
          "A Project offers four places to put things, and most of the craft is choosing the right one. Standing instructions set how Claude behaves in every chat in the Project: its tone, default formats and checking habits. The knowledge base holds facts and reference material Claude draws on without re-uploading: policies, templates, past deliverables, the brand guide. Skills hold repeatable procedures; they live at account level (under Customize, in the course's description) and are available to every Project. Scoped Memory keeps what this Project has already agreed (stakeholder names, standing preferences, earlier decisions), kept apart from your other Projects. Ask of each item: rule, reference or procedure? A stable fact goes in knowledge; an evolving record of Project decisions goes in Memory.",
          "The commonest mistake is a procedure written into the instructions or a behaviour rule dropped into the knowledge base; both make the Project harder to maintain. Many needs span two slots and work only when wired together: 'cite the source document for every factual claim' sits in the instructions, while the documents being cited sit in the knowledge base. A status-report Skill carries the procedure; the brand guide it formats against sits in knowledge.",
          "Split Projects by purpose. A consultant runs one Project per client: formal-register and cite-your-sources instructions; the client's brand guide, statement of work and recent reports in knowledge; the firm's status-report Skill reused from account level; that client's stakeholders in scoped Memory, never visible in another client's Project. On Team and Enterprise plans a Project can be shared with the engagement team so everyone works from the same baseline. Mixing contradictory material in one big Project weakens every answer it gives. And fence the knowledge: uploading files is not enough, because without an instruction Claude fills gaps from general knowledge and you cannot tell which is which. Say it: answer only from these materials, and say unknown for anything they do not cover."
        ],
        tables: [{
          cap: "Four slots",
          h: ["Slot", "Holds", "Example", "Wrong home for"],
          r: [
            ["Standing instructions", "Behaviour", "Cite the source document for every claim; formal register; lead with a one-line headline", "Reference documents, long procedures"],
            ["Knowledge base", "Facts and reference", "Brand guide, current template, last three reports", "Behaviour rules"],
            ["Skill (account level)", "Repeatable procedure", "Format findings into the standard report in this order", "One-off instructions"],
            ["Scoped Memory", "Settled continuity for this Project", "Stakeholder names, agreed preferences, earlier decisions", "Stable reference material"]
          ]
        }],
        code: { cap: "Standing instructions for a client Project (our own example)", text: "You support the account team for one client. Write in a formal register and British spelling.\nAnswer only from the documents in this Project's knowledge base. If they do not cover something, say so and name what is missing.\nCite the document name and section after every factual claim.\nIf a figure is not in the documents, mark it 'unverified' rather than estimating.\nWhen brevity and completeness conflict, prefer brevity and list what you left out at the end." },
        know: [
          "Operating Claude: a configured baseline so every conversation starts with the right context.",
          "Instructions = behaviour; knowledge = facts; Skills = procedures (account level, reusable); scoped Memory = continuity.",
          "Rule, reference or procedure: the test for where a need belongs.",
          "Many needs pair two slots: an instruction plus the knowledge it acts on.",
          "One Project per purpose or client; scoped Memory keeps their contexts apart.",
          "Fence the knowledge: answer only from these materials; unknown is an answer.",
          "Team and Enterprise plans can share a Project so a team works from one baseline (confirm on your plan)."
        ],
        build: ["Worked question Q6: the weekly report setup", WQ + "q6--domain-5-the-weekly-report-setup"],
        traps: [
          { move: "Keep everything in one big Project so it all sits in one place", why: "Contradictory material in one workspace weakens every answer. Split by purpose." },
          { move: "Describe the multi-step report format in a paragraph of standing instructions", why: "A repeatable procedure belongs in a Skill. Instructions are for behaviour rules." },
          { move: "Upload the policy files and assume Claude will stick to them", why: "Without a fence it fills gaps from general knowledge. Instruct it to answer only from the materials and say unknown." },
          { move: "Store the brand colours and template as Memory entries", why: "Stable reference material goes in the knowledge base. Memory is for settled Project decisions and preferences." },
          { move: "Use one Project for two competing clients and separate them by careful prompting", why: "Prompting is not a boundary. Separate Projects with scoped Memory keep the contexts apart." },
          { move: "Switch Memory off for everyone to stop client details mixing", why: "That loses useful continuity. Scoped Memory per Project gives continuity without crossover." }
        ]
      },
      {
        title: "Manage uploaded knowledge and connectors", w: null,
        scope: "Curate uploaded knowledge and connected sources such as Google Drive and Gmail: what to connect, how narrowly, and where each connector's capability ends.",
        lesson: [
          "Connectors let Claude reach into tools you already use, for example to look up a file in Google Drive or locate a message in Gmail. Claude sees only what you authorise, and the set should be deliberate rather than everything by default. Narrow each connector to the minimum the job needs. Connecting a whole shared drive and telling Claude to ignore the irrelevant files does not work: the irrelevant files still join the search, and accuracy pays for it.",
          "Each connector can do some things and not others. A mail connector might find and read messages yet be unable to send one. Ask it for something outside its range and you may get a puzzling non-result rather than a clear refusal, and the course reports a field pattern where such failures look like bugs, get reported to the wrong team and stall. Learn each connector's boundary before you build a workflow on it, and check the current list of connectors and capabilities at support.claude.com.",
          "How you add a connector matters too. The course warns that the obvious add-connector path can lead to a public directory rather than your organisation's vetted connectors. On Team or Enterprise plans, confirm the approved path with your admin so you connect the sanctioned source and not a look-alike.",
          "Files you upload need the same discipline: up to date, on topic, one copy each. Leave three versions of a policy in place and sooner or later Claude quotes the old one. Look after it as you would a team folder: when you add a new version, remove the superseded one; label what each file is; prune what the Project no longer needs."
        ],
        tables: [{
          cap: "Connector hygiene",
          h: ["Decision", "Do", "Avoid"],
          r: [
            ["Scope", "Connect the specific folders or labels the job needs", "The whole drive or mailbox, with an instruction to ignore the rest"],
            ["Capability", "Learn what it can do (search, read) and cannot (send, edit)", "Building a workflow on an action it does not support"],
            ["Source", "Add through the organisation's vetted path", "A look-alike from a public directory"],
            ["Uploaded files", "One current version, labelled, pruned", "Three versions of the same policy"]
          ]
        }],
        know: [
          "Least access: narrow every connector to what the job needs.",
          "Irrelevant connected files still join the search; an instruction to ignore them does not fix it.",
          "Each connector has a capability boundary; a read-and-search mail connector does not send.",
          "Hitting a boundary can look like a bug. Know the boundary before reporting or building.",
          "Add connectors through your organisation's vetted path; confirm with your admin.",
          "Keep uploaded knowledge current: one version, labelled, superseded files removed."
        ],
        build: ["Worked question Q6: the weekly report setup", WQ + "q6--domain-5-the-weekly-report-setup"],
        traps: [
          { move: "Connect the whole shared drive and tell Claude to ignore the irrelevant files", why: "They still join the search and accuracy suffers. Connect only the folders the job needs." },
          { move: "Log a defect because the mail connector does not send messages", why: "Sending may be outside its capability. Check the connector's boundary first." },
          { move: "A higher model tier will unlock sending through the connector", why: "The model does not change what a connector can do. The boundary belongs to the connector." },
          { move: "Install whichever connector the public listing shows first", why: "It may not be your organisation's vetted connector. Use the approved path from your admin." },
          { move: "Upload the new policy and keep the old versions for reference", why: "Claude may cite a superseded version. Remove or clearly retire old versions." }
        ]
      },
      {
        title: "Create effective system-level instructions", w: null,
        scope: "Write persistent instructions precise enough to change output in every conversation, embedding format, tone and verification guardrails ahead of need.",
        lesson: [
          "Teams keep asking whether the guardrails can be set once instead of re-typed every conversation. Standing instructions are exactly that. Start with whatever you find yourself typing again and again: verification behaviours (cite the source for every claim, say you do not know rather than guess), format defaults and tone. Written once, every conversation in the Project inherits them without anyone remembering to ask.",
          "Anticipate the use cases. If the Project exists to produce client work, set its format and register in advance, so first drafts arrive nearly finished instead of needing the same corrections every time.",
          "Precision is the whole game, because vague instructions fail silently. 'Be professional' or 'make the reports good and accurate' give Claude almost nothing to act on, and quality keeps varying. 'Use a formal register, define every acronym on first use, keep paragraphs under four sentences' changes the output. 'Give the source of each figure; label any figure absent from the supplied data as unverified; begin with a one-sentence headline' makes the verification behaviour consistent and the headline appear every time. The test: would two different people read the instruction the same way?",
          "Structure helps instructions hold. Keep the role, the constraints and the output shape in separate, labelled blocks; rules packed into one long paragraph lose their middle. When two rules can collide, say which wins (brevity over completeness, or the reverse). Keep instructions about behaviour; put facts in the knowledge base and procedures in a Skill. The colleague test applies here too."
        ],
        tables: [{
          cap: "Vague or precise",
          h: ["Vague (fails silently)", "Precise (changes output)"],
          r: [
            ["Be professional.", "Formal register; define acronyms on first use; paragraphs under four sentences."],
            ["Make the reports accurate.", "State the source of every figure; mark any figure not in the data as unverified."],
            ["Keep status updates short.", "Three bullets at most (done, next, blocked), each under 20 words."],
            ["Keep it short but thorough.", "Under 300 words; if something is cut, list it in a final 'Not covered' line."]
          ]
        }],
        know: [
          "Put the guardrails you would otherwise re-type into standing instructions.",
          "Anticipate the deliverables: set format and register ahead of need.",
          "Vague instructions fail silently. Precise, testable ones change every output.",
          "Test: two different readers would interpret it the same way.",
          "Separate role, constraints and output shape; say which rule wins when two collide.",
          "Behaviour in instructions; facts in knowledge; procedures in Skills."
        ],
        build: ["Worked question Q6: the weekly report setup", WQ + "q6--domain-5-the-weekly-report-setup"],
        traps: [
          { move: "Add a standing instruction asking for high-quality summaries", why: "Too vague to change anything. Specify the structure: decisions as bullets, actions with owner and date." },
          { move: "Write every rule into one detailed paragraph so nothing is missed", why: "The middle gets lost. Separate role, constraints and format, and state priorities." },
          { move: "Leave conflicting rules in place and let Claude balance them", why: "It will balance them differently each time. Say which rule wins." },
          { move: "Remind Claude of the citation rule at the start of each conversation", why: "That is what standing instructions are for. Write it once in the Project." },
          { move: "Paste the full style guide into the instructions", why: "Reference material bloats every conversation. Put it in knowledge and point the instruction at it." }
        ]
      },
      {
        title: "Maintain and update configurations", w: null,
        scope: "Keep instructions, knowledge sources, Skills and Memory current through scheduled review, and recognise stale configuration as the cause of quietly degrading output.",
        lesson: [
          "Configurations are living assets, and every part drifts towards stale: rules written for how the team worked last quarter, reference files that have since been replaced, a Skill out of date, a Memory entry about someone who has left. Stale configuration degrades output quietly, with no error message. If quality is slipping and nothing obvious has changed, the review is overdue.",
          "Set a recurring review for each active Project; the course suggests monthly. Do the instructions describe how the team works today? Has every replaced document gone from knowledge? Are the right Skills switched on, and up to date? Is Memory still true? Skills change in two ways, per the course: Anthropic-built and organisation-provisioned Skills update automatically, whereas a custom Skill you uploaded stays as it is until you upload a new version. If a Skill turns out a slightly wrong format each time, fix the Skill; better prompting will not.",
          "Look after Memory as you would a live document: read it through, edit or delete stale entries, and keep an exported copy before big changes. If a Project's Memory has collected so much out-of-date material that it misleads, clear it and start again. A few correct entries beat many doubtful ones. Configuration is also additive: when a fact that matters keeps having to be re-supplied (a constraint, a preference, some background), add it explicitly to the instructions or Memory.",
          "Example of a quiet failure: a client-updates Project starts addressing a contact who left in the spring and quoting last year's service levels. The audit finds a Memory entry still naming the old contact, two versions of the service agreement in the knowledge base, and an instruction pointing at the old one by name. The fix is maintenance (correct the Memory entry, retire the old agreement, update the instruction), not a new prompt and not a bigger model."
        ],
        tables: [{
          cap: "Monthly maintenance checklist",
          h: ["Check", "Question", "Typical fix"],
          r: [
            ["Instructions", "Do they match the current process, names and periods?", "Update renamed metrics, periods, templates"],
            ["Knowledge", "Any superseded or duplicate files?", "Remove old versions; label the current one"],
            ["Skills", "Right ones enabled? Custom ones current?", "Re-upload updated custom Skills; disable unused ones"],
            ["Memory", "Any entries stale or wrong?", "Edit or delete; export first; reset if badly polluted"],
            ["Connectors", "Still scoped to what the job needs?", "Narrow or remove access"]
          ]
        }],
        know: [
          "Stale configuration degrades output silently; there is no error to warn you.",
          "Review active Projects on a schedule (monthly is the course's suggestion).",
          "Built-in and organisation Skills update automatically; custom Skills change only when re-uploaded.",
          "Memory: review, edit, delete, export before big changes, reset when polluted.",
          "Something you keep re-supplying belongs in instructions or Memory.",
          "It used to work and now it does not: suspect stale configuration first."
        ],
        build: ["Worked question Q6: the weekly report setup", WQ + "q6--domain-5-the-weekly-report-setup"],
        traps: [
          { move: "Quality slipped with no error message, so move up a model tier", why: "Silent drift after it used to work points to stale configuration. Audit instructions, knowledge and Memory." },
          { move: "Add a note asking Claude to watch out for outdated material", why: "That hands your maintenance job to the model. Update or remove the stale items yourself." },
          { move: "Remove the up-to-date files because Claude keeps mixing versions", why: "Remove the superseded one, and fix the instruction and Memory that still point at it." },
          { move: "Set up the Project once and leave it; good configuration does not need touching", why: "Every part drifts. Review on a schedule." },
          { move: "Write a new prompt each time the output goes stale", why: "The cause sits in configuration, so prompts only patch it for one conversation. Fix the set-up." }
        ]
      }
    ],
    remember: [
      "Rule, reference, procedure, continuity.",
      "Answer only from these sources; unknown is an answer.",
      "Narrow connectors; know their edges.",
      "Precise instructions; scheduled maintenance."
    ]
  },

  /* ================================================================ D6 */
  {
    id: "d6", code: "D6", title: "Governance, risk and responsible use", w: 15, eps: "EP 07", t: 5,
    summary: "Governance as a practitioner skill: screening use cases, handling data by its sensitivity, applying policy and vetting Skills as a habit, and catching bias and disclosure questions in ordinary work.",
    links: [
      ["▶", "Watch EP 07 (6 min)", YT + "p5fpyypMERM"],
      ["📘", "Full study guide", AO + "domains/06-governance-risk-responsible-use.md"],
      ["❓", "Worked question Q7", WQ + "q7--domain-6-the-launch-question"]
    ],
    highlights: [
      "Screen use cases on reversibility, consequence, the human element and accountability. Name the load-bearing one.",
      "Appropriate with human review only counts when the gate is defined: who reviews, what they check, when.",
      "Policy decides what data may enter the tool. Classify first; redact, use an approved path, or keep it out. Incognito does not make regulated data safe.",
      "A Skill is software: check its source and reach before enabling it."
    ],
    subs: [
      {
        title: "Identify appropriate and inappropriate use cases", w: null,
        scope: "Classify proposed uses of Claude as fully appropriate, appropriate with human review, or inappropriate, with reasons and a defined review gate.",
        lesson: [
          "One inappropriate use case can freeze an organisation's whole AI programme, so screen each proposal with a method, not instinct. The course reuses the Delegation criteria from Domain 4. Reversibility: if the output is wrong, can someone catch and reverse it before damage is done? Consequence of error: what does it cost if the output is wrong? Need for human creativity or empathy: does the task need judgement, relationship or care that AI cannot supply? Accountability: who answers for the outcome, and can they exercise that over an AI-produced result?",
          "The criteria interact; they are not a checklist where one failure ends the discussion. A note of sympathy to a client carries little risk and can be revised, yet because it is about a relationship, a person should write and own it. A financial summary that feeds a decision is consequential, yet appropriate when a named reviewer signs off before use, which restores reversibility and accountability. Run all four, then name the load-bearing criterion: the one that, if it changed, would move the use case into a different class. Naming it makes your call defensible to a risk reviewer; 'it feels risky' does not travel.",
          "Three classes, each with written reasons. Fully appropriate: can be undone, little harm if wrong, nothing that needs a human touch; hand it over with the usual checks (an internal FAQ drafted from approved policy). Appropriate with human review: useful, but stakes or accountability need a human gate (summarising CVs into a shortlist, with bias safeguards and the hiring manager owning the selection). Inappropriate: the consequence, irreversibility or human element means AI should not do it, and you name the human role that must (a final medical, legal or benefits determination).",
          "The middle class is the one people get wrong: they stop at the label. A real gate names three things: the reviewer (whoever is accountable, not whoever has a spare minute), the check (the particular risk, such as accuracy, fairness or policy) and the timing (before anyone uses the output). 'A support agent checks each drafted billing reply against the account record and adjusts tone before it is sent' is a gate; 'we will keep a human in the loop' is not. Anthropic's usage policy also names high-risk areas (legal, healthcare, insurance, finance, employment and housing, academic testing, media) where consumer-facing uses need a qualified person's review and disclosure that AI is involved; confirm the current wording at anthropic.com."
        ],
        tables: [
          {
            cap: "Screening criteria",
            h: ["Criterion", "Question"],
            r: [
              ["Reversibility", "If it is wrong, can it be caught and reversed in time?"],
              ["Consequence of error", "What does a wrong output cost, and to whom?"],
              ["Human creativity or empathy", "Does it need judgement, relationship or care AI cannot supply?"],
              ["Accountability", "Who answers for the outcome, and can they exercise it over AI output?"]
            ]
          },
          {
            cap: "Three classes (our own examples)",
            h: ["Use case", "Class", "Load-bearing criterion and gate"],
            r: [
              ["Draft a staff FAQ from approved policy", "Fully appropriate", "Reversible, grounded; normal review"],
              ["Summarise grant applications into a ranked longlist", "Appropriate with human review", "Accountability: the panel chair reviews every exclusion for fairness before applicants are told"],
              ["Draft replies to customer complaints about charges", "Appropriate with human review", "Accountability: an agent checks each reply against the account before sending"],
              ["Decide insurance claims with no one reviewing the outcome", "Inappropriate", "Irreversible consequence, non-transferable accountability: a qualified officer decides"]
            ]
          }
        ],
        know: [
          "Four criteria: reversibility, consequence of error, human creativity or empathy, accountability.",
          "Criteria interact; name the load-bearing one.",
          "Three classes: fully appropriate, appropriate with human review, inappropriate. Write the reasons.",
          "A defined gate: who reviews, what they verify, when (before use).",
          "Inappropriate cases name the human role that must own the work.",
          "High-risk areas in Anthropic's usage policy: legal, healthcare, insurance, finance, employment and housing, academic testing, media.",
          "AI drafts; a person decides wherever rights, health, money or livelihood are involved."
        ],
        build: ["Worked question Q7: the launch question", WQ + "q7--domain-6-the-launch-question"],
        traps: [
          { move: "Let Claude make the final claim decisions to clear the backlog", why: "Irreversible consequence and non-transferable accountability. A qualified person makes and owns the decision." },
          { move: "Classify it as appropriate with a human in the loop and move on", why: "A label is not a gate. Name who reviews, what they check and when." },
          { move: "It is low-stakes and reversible, so the condolence note can go out as drafted", why: "The relationship element is load-bearing. A person owns that message." },
          { move: "It is consequential, so ban the use case outright", why: "Many consequential uses are fine with a defined gate. Classify; do not reflexively ban." },
          { move: "A smarter model makes it safe to let AI decide the claims", why: "Capability does not transfer accountability. The classification depends on the criteria, not the tier." },
          { move: "It feels risky, so decline it", why: "A feeling is not a reason a reviewer can test. Name the criterion that makes it inappropriate." }
        ]
      },
      {
        title: "Apply data sensitivity, regulatory and privacy considerations", w: null,
        scope: "Classify data before it enters any feature, and use redaction, approved paths and feature controls (Incognito, Memory settings, the code execution sandbox) to match handling to sensitivity.",
        lesson: [
          "Before any data enters any feature, know its sensitivity. A three-level scheme is quick enough to use every time. Green, fine to use: anything already public, data that is anonymised or aggregated, internal material approved for broad circulation. Yellow, check first: internal-only documents, anything carrying people's names or contact details, drafts about a deal or launch not yet announced. Red, out unless there is an approved route: regulated records such as health, financial or government data, passwords and keys, and anything you hold under a confidentiality agreement with another party. Unsure between two tiers? Treat it as the more sensitive until you can confirm. Your organisation's policy is the authority, and when unsure you ask before uploading.",
          "Redaction gets the analytical value without exposing the data, when the task does not depend on the identifiers. Trends across a customer list do not need the customers' names; 'Customer 1, Customer 2' loses nothing. Two failure modes. Partial redaction: take out the name but leave an account number, an unusual job title or an exact date, and in a small group the person may still be identifiable; remove every field that could point to someone. Redaction that defeats the purpose: when the analysis really depends on the sensitive details, removing them is not a fix; confirm an approved path or keep the data out.",
          "Feature controls act on the classification. Code execution runs in a sandbox and processes uploaded files there, so review what you upload before running analysis. Memory carries information across sessions, and for sensitive work that carry-over can be the problem. Incognito keeps a chat out of chat history and Memory, but per the course it still follows the organisation's data-retention policy and can appear in organisational exports: memory exclusion and data retention are separate controls. Organisation-level Memory controls differ by plan (the course describes Enterprise owners holding them and Team plans lacking them); check the current Help Center article.",
          "A frequent mistake is to switch on Incognito and treat the data as safe from then on. Incognito decides whether something is remembered, not whether the data was allowed there in the first place. For regulated data the order is fixed: first settle whether this entry point is approved for that data at all; only then decide how to handle it. Regulated work may also need outputs logged and retained the way the rules demand. If no approved, compliant path exists, stop and escalate to your admin or compliance team. No prompt instruction overrides a data rule."
        ],
        tables: [
          {
            cap: "Three tiers",
            h: ["Tier", "Examples", "Action"],
            r: [
              ["Green", "Published material; anonymised or aggregated data; internal documents cleared for wide sharing", "Use; normal review"],
              ["Yellow", "Internal-only documents; names or contact details; unannounced deals or products", "Check policy first; redact; Incognito if it should not persist"],
              ["Red", "Health, financial or government regulated data; credentials; third-party confidential material", "Only through a confirmed approved path; otherwise keep out and escalate"]
            ]
          },
          {
            cap: "Which control does what",
            h: ["Control", "Does", "Does not"],
            r: [
              ["Redaction or anonymisation", "Removes identifiers the task does not need", "Make data safe if identifiers remain or the task needs them"],
              ["Incognito", "Keeps the chat out of history and Memory", "Override organisational retention, or approve regulated data"],
              ["Project-scoped Memory", "Keeps one workstream's context out of another", "Stop data entering the tool"],
              ["Approved entry point", "Settles whether the data may be used here at all", "Remove the need for review of the output"]
            ]
          }
        ],
        know: [
          "Classify first: green, yellow, red. Unsure? Treat as the more sensitive tier.",
          "Organisation policy decides what may enter the tool; ask before uploading when unsure.",
          "Redact when the task does not need the identifiers; strip every identifying field.",
          "If the task needs the sensitive data, find an approved path or keep it out.",
          "Incognito: out of history and Memory; still subject to organisational retention.",
          "Regulated data: is this entry point approved? comes before how do I handle it here?",
          "No prompt instruction overrides a data rule. Escalate to compliance when unsure."
        ],
        build: ["Worked question Q7: the launch question", WQ + "q7--domain-6-the-launch-question"],
        traps: [
          { move: "Nobody outside the team will see the result, so upload the raw customer file", why: "Internal use does not lift the policy. Remove or anonymise the identifiers first." },
          { move: "Paste the records in and tell Claude in the prompt to keep them confidential", why: "No prompt overrides a data rule. Check policy, then anonymise, authorise or keep it out." },
          { move: "Use Incognito so the patient records are safe to upload", why: "Incognito controls memory, not permission. Confirm an approved path for regulated data, or stop and escalate." },
          { move: "Remove the customer names but leave account numbers so the totals still match", why: "Partial redaction can still identify people. Replace every identifier the analysis does not need." },
          { move: "Drop the project because personal data is involved", why: "Over-correction. Anonymise, or use an approved path, so the work can go ahead safely." },
          { move: "Rely on deleting the chat afterwards to meet the data policy", why: "Deleting afterwards does not change what already entered the tool. Redact, or use an approved path, before upload." }
        ]
      },
      {
        title: "Follow organisational AI policies and governance standards", w: null,
        scope: "Apply organisational policy consistently in routine decisions, audit real usage against it, stay current, and vet Skills and other features for source and reach before enabling them.",
        lesson: [
          "Rules kept only under supervision are not governance. Risk sits between the written policy and everyday practice, and that gap grows in routine, low-visibility decisions rather than in the obvious high-stakes ones. Diligence is applying the framework every time, including on a busy Friday.",
          "Audit usage against policy periodically. Compare what the team does, or plans to do, with what the policy requires, and close the gaps you find. Example: a department head looks back over a quarter of use and finds a salary spreadsheet analysed in a personal account, a connector given the whole shared drive, and a press release published without the communications sign-off. Nobody meant harm; each was a habit slipping. The fixes are habits too: a reminder of which accounts are approved, connector scope added to the Project set-up checklist, and a sign-off step that cannot be skipped for anything public. When people route around an approved path because it is slower, fix the friction so the compliant route is the easy one; blame and blanket bans do not close the gap. Policies and features both move, so something that was within the rules in the spring may not be in the autumn: stay current with both.",
          "A Skill is software. It runs with whatever access the session it runs in already has (Skills do not ask for their own permissions) and can take actions through code execution, so one from an unknown source could mishandle data. The answer is neither blind trust nor a blanket ban but a repeatable check. Source: who published it? Anthropic-provided and organisation-approved Skills are the lower-risk start. Reach: what could it get at in the chats where you will use it, and is that in proportion to the job? Read the bundle (instructions, dependencies, files); a formatting Skill whose instructions roam beyond formatting is a red flag. Appropriateness: is it the right tool, or more capability than the job needs?",
          "Three outcomes. Enable: source, reach and fit all clear. Escalate: useful, but the source is unknown or the reach looks broad, so route it to your admin or security team. Decline: reach is clearly disproportionate or the source cannot be established. Internal does not mean vetted: a Skill from another team in your organisation may have been built with broad access for their convenience or against an older policy; confirm what it touches and why before enabling it on your data. The same least-privilege habit applies to any connector, tool or integration: grant the narrowest access that gets the job done, and revisit it when the job changes."
        ],
        tables: [{
          cap: "Skill trust check",
          h: ["Check", "Ask", "Outcome if it fails"],
          r: [
            ["Source", "Who published it? Anthropic, my organisation, an unknown third party?", "Escalate for review; decline if the source cannot be established"],
            ["Reach", "What could it touch in the sessions where it runs? Do its instructions stay on task?", "Escalate if broad; decline if clearly disproportionate"],
            ["Appropriateness", "Is it the right tool, or more capability than needed?", "Choose a narrower option"]
          ]
        }],
        know: [
          "Governance is a habit applied to routine decisions, not a one-time acknowledgement.",
          "Audit real usage against policy; close each gap with a habit-level fix.",
          "If people bypass the approved path because it is harder, reduce the friction of the approved path.",
          "Stay current: policies and features both change.",
          "A Skill inherits the session's access. Check source, reach and appropriateness before enabling.",
          "Enable, escalate or decline. Internal does not mean vetted.",
          "Least privilege for every connector, tool and integration."
        ],
        build: ["Worked question Q7: the launch question", WQ + "q7--domain-6-the-launch-question"],
        traps: [
          { move: "A popular Skill with good reviews online is safe to enable on work data", why: "Popularity is not a source check. The publisher is unknown to you and the Skill inherits your access: route it for review." },
          { move: "Try the Skill on live work and switch it off if anything looks odd", why: "By the time something looks odd, it has already had your session's access. Vet source and reach before enabling." },
          { move: "It was built by another team here, so it is safe to enable", why: "Internal does not mean vetted. Confirm what it reaches and that it matches current policy." },
          { move: "The Skill only formats notes, so it can only touch notes", why: "Skills run with whatever access the session has. Judge the reach, not the stated purpose." },
          { move: "Ban all third-party Skills to remove the risk", why: "A blanket ban loses useful tools. Run the trust check: enable, escalate or decline." },
          { move: "People prefer their own AI accounts, so let them carry on as long as the work gets done", why: "That is a policy gap, not a workaround. Make the approved path easier and close the gap." },
          { move: "The policy was approved last year, so current practice must comply", why: "Policies and features change. Recheck practice against the current policy." }
        ]
      },
      {
        title: "Understand the ethical implications of AI use", w: null,
        scope: "Evaluate everyday outputs for bias, fairness and transparency, decide when to disclose AI assistance, and reason through or escalate ambiguous cases.",
        lesson: [
          "Ethical problems rarely look like ethical problems; they turn up inside ordinary work. A summary that leans towards one group, a recommendation built on a slanted framing, an AI-assisted document presented as wholly human-written: routine outputs with ethical weight. Checking for bias, fairness and transparency belongs in normal review, not a separate ethics exercise.",
          "Bias can enter through your wording, through how the question is framed, or through patterns in the text the model generates. Wherever output affects people (recruitment, appraisals, messages aimed at particular groups), check that everyone is treated fairly and that the framing has not pushed the answer one way. The more an individual stands to lose, the more this matters. An automated screen that filters people out with no human looking at the exclusions is the sharpest case: a systematic disadvantage to some group can go undetected because nobody ever sees who was dropped. Apply the slant tells from Domain 2: one side only, the other side dismissed, a group stereotyped.",
          "Transparency: know when to disclose AI assistance. Some settings and policies require it; elsewhere Claude counts as an everyday tool like a spellchecker. What you owe depends on where you are and who is reading, and when unsure the responsible default is to disclose rather than conceal. Where people interact directly with AI output in a high-stakes area, Anthropic's usage policy expects them to be told at the start, not only if they ask; check the current policy and your own organisation's rules.",
          "Many ethical questions have no rule that settles them. Reason them through and write it down: who it affects, how it could go wrong, what treating people fairly would require, and what the situation asks you to disclose. Example: a team leader using Claude to draft references for departing staff from their own notes. The former employees and their future employers are affected; the risk is warmer wording for some people than others with the same record; fairness needs the leader to check each reference against the notes and hold everyone to one standard; the setting may call for disclosing that AI helped draft it. Conclusion: appropriate with human review and a fairness check. When the affected group is large, the potential harm significant or the question beyond your team's standing, escalate to your AI governance or ethics function with your reasoning, rather than deciding alone."
        ],
        tables: [{
          cap: "Reasoning through an ambiguous case",
          h: ["Question", "What you are looking for"],
          r: [
            ["Who is affected?", "Individuals or groups whose outcomes the output touches"],
            ["What could go wrong?", "Unfair or inconsistent treatment, hidden exclusion, misplaced trust"],
            ["What does fair look like?", "A consistent standard, applied and checked by an accountable person"],
            ["What disclosure fits?", "What the setting, the audience and the policy require; disclose when unsure"],
            ["Is this mine to decide?", "Large population, significant harm or beyond your standing: escalate with your reasoning"]
          ]
        }],
        know: [
          "Ethical risk hides in ordinary outputs; check for it in routine review.",
          "Bias comes from the prompt, the framing or generation patterns; highest risk where stakes for individuals are highest.",
          "Filters whose exclusions no person reviews let systematic disadvantage go unseen.",
          "Disclosure depends on setting, audience and policy; when unsure, disclose.",
          "Customer-facing, high-stakes uses: tell people at the start, not only if they ask.",
          "Reason it through: affected, risks, fair outcome, disclosure. Document it.",
          "Escalate large-scale, high-harm or out-of-standing questions to the governance or ethics function."
        ],
        build: ["Worked question Q7: the launch question", WQ + "q7--domain-6-the-launch-question"],
        traps: [
          { move: "Disclose AI use only if a customer asks", why: "It sounds balanced and fails the rule. Disclose at the start, and when unsure, disclose." },
          { move: "Mention AI involvement in the terms and conditions only", why: "Burying it is not disclosure. Tell people plainly when they are dealing with AI output." },
          { move: "Pass on only the applicants the filter kept, with nobody looking at those it rejected", why: "Unreviewed exclusions hide bias. A person reviews the exclusions as well as the shortlist." },
          { move: "The output is polished and accurate, so there is no fairness issue", why: "Accuracy and fairness are separate. Check how each group is treated." },
          { move: "No policy covers this case, so go ahead as you see fit", why: "Reason it through and document it; escalate if the harm or scale is large." },
          { move: "Present the AI-assisted analysis as entirely your own work", why: "Concealment undermines trust and may breach policy. Disclose AI assistance where the setting calls for it." }
        ]
      }
    ],
    remember: [
      "Four criteria; name the load-bearing one; define the gate.",
      "Classify the data first; Incognito is not permission.",
      "A Skill is software: source, reach, fit.",
      "Check fairness; disclose when unsure; escalate what is not yours to decide."
    ]
  },

  /* ================================================================ D7 */
  {
    id: "d7", code: "D7", title: "Troubleshooting and optimisation", w: 10, eps: "EP 08", t: 6,
    summary: "When output disappoints, diagnose before you change anything: read the symptom, run the checks cheapest first, capture the fix in configuration, and optimise the workflow against a measure you chose in advance.",
    links: [
      ["▶", "Watch EP 08 (6 min)", YT + "vfaFaZmeXBg"],
      ["📘", "Full study guide", AO + "domains/07-troubleshooting-and-optimization.md"],
      ["❓", "Worked question Q8", WQ + "q8--domain-7-the-inconsistent-answers"]
    ],
    highlights: [
      "Read the timing: wrong from the start, degraded over time, a specific error type, or it used to work.",
      "Check in order, cheapest first: the prompt, the context, the feature or model, the configuration, and only then whether the task fits.",
      "A fix found and not captured will be found again next week. Promote it into an instruction or a Skill.",
      "Optimise against a measure: time, revision rounds, consistency or errors. Prove the gain on a few runs before relying on it."
    ],
    subs: [
      {
        title: "Identify, diagnose and resolve underperforming prompts and outputs", w: null,
        scope: "Trace a poor output to its root cause (under-specification, context overload, wrong feature or model, stale configuration, or a task that does not fit) and apply the matching fix.",
        lesson: [
          "When an output disappoints, most people either give up ('Claude cannot do this') or thrash, changing random things until something works. Diagnosis replaces both with a sequence. Four common causes give much the same disappointing result, so look at when the problem appeared. Wrong from the first response: under-specification; the prompt never carried the context, constraints or format it needed. Degraded over a long session: context overload; earlier content has been compressed and early instructions have lost force. A specific, repeatable error type: the wrong feature or model, such as subtly wrong numbers (needed code execution) or shallow analysis on a speed tier. Used to work, now does not: stale configuration; an instruction, knowledge file or Skill has drifted.",
          "Run the checks in order, cheapest first. One: hold the prompt up against the five components; is something missing? Two: did Claude have the information it needed, and is the conversation long enough to need a restart or summary? Three: does a calculation need code execution, or is a demanding task running on a fast tier when it needs more thinking time or a stronger model? Four: are the instructions, knowledge and Skills current? Five, only then: is this a task Claude can do at all? The order is deliberate. Re-reading the prompt costs seconds and fixes the most common failure; deciding the task does not fit is the most expensive conclusion because it ends the attempt. Most people invert the order and reach for the biggest model or 'impossible' first.",
          "Some failures are genuine expectation mismatches. Asking for the exact number of job applications the next advert will attract, and getting a wrong number, is not fixed by any prompt, restart, feature or configuration, because the task asks for something no tool can do. The answer is a different question: a range with its assumptions spelt out, or a model of the drivers you can vary yourself. Spotting a task that cannot be done is as useful as fixing one that can.",
          "Escalation has a place too. When the first checks pass and the problem remains, or the need is an integration, custom tooling or a system others depend on, it is beyond the associate's layer: bring in a Claude Developer or Architect. Working through the checks rarely takes more than a couple of minutes, and you finish with either a specific, cheap fix or a reasoned 'this needs reshaping or escalating'. Both beat guessing."
        ],
        tables: [
          {
            cap: "Read the symptom",
            h: ["Symptom timing", "Likely cause", "Fix"],
            r: [
              ["Wrong from the first response", "Under-specification", "Add the missing context, constraints or format"],
              ["Started well, degraded as the session grew", "Context overload", "Restart from a summary; persist the rule as a standing instruction"],
              ["A specific, repeatable error type", "Wrong feature or model", "Code execution for numbers; more thinking or a stronger tier for depth"],
              ["Used to work, now off", "Stale configuration", "Run the maintenance checklist (Domain 5)"],
              ["Asks for something no tool can do", "Expectation mismatch", "Reshape the task: a range with assumptions, a driver model"]
            ]
          },
          {
            cap: "Levers by cost",
            h: ["Lever", "Cost"],
            r: [
              ["Rewrite the prompt", "Free, and fixes the most"],
              ["Add the right source material", "Minutes"],
              ["More room to think", "A little time"],
              ["A stronger model", "More on every run"],
              ["Change the whole set-up, or escalate", "Days"]
            ]
          }
        ],
        know: [
          "Four causes, four timings: first response wrong, degraded over time, specific error type, used to work.",
          "Sequence: prompt, information and context, feature or model, configuration, then task fit.",
          "Cheapest check first; questioning the task is last because it ends the attempt.",
          "Expectation mismatch: reshape the task rather than tune the prompt.",
          "Escalate integrations, custom tooling and problems that survive the checks.",
          "If you have not fixed the prompt and the inputs, you have not earned the model switch."
        ],
        build: ["Worked question Q8: the inconsistent answers", WQ + "q8--domain-7-the-inconsistent-answers"],
        traps: [
          { move: "The answers are wrong, so switch to the most capable model", why: "The prompt and inputs are cheaper to fix and cause most failures. Check them first." },
          { move: "A brand-new chat gave a poor first answer, so the context window must be full", why: "Overload builds over a long session. Wrong from the start points to under-specification." },
          { move: "Rebuild the whole set-up to fix inconsistent answers", why: "That is the most expensive lever pulled first. Work up from the prompt." },
          { move: "Change the prompt, the model and the files at once to fix it faster", why: "If it improves, you will not know why. One change at a time, cheapest first." },
          { move: "The forecast number was wrong, so keep refining the prompt", why: "Exact prediction is beyond any tool. Reshape it into a range with stated assumptions." },
          { move: "Conclude Claude cannot do the task and do it by hand", why: "That is the last and most expensive conclusion. Run the cheaper checks first." }
        ]
      },
      {
        title: "Adjust approach based on feedback and results", w: null,
        scope: "Turn output critique into a specific adjustment to the prompt, context or configuration, and capture fixes so they persist.",
        lesson: [
          "Every disappointing output is diagnostic data, and letting it evaporate (fixing the same thing by hand each time) is the missed opportunity. For recurring work, treat each round's output as a signal about the set-up. A report that needs the same correction every week is telling you the prompt, the context or the configuration is missing something.",
          "Convert the complaint into a change. A complaint describes the output: bland, a bit off, beside the point. A change says what to do differently next time. Ask what the output would need to contain to be right, and which part of the set-up governs that. 'Too bland' becomes 'say who will read it and the single thing they should do next'. 'Missed the point' becomes 'state the single question the output must answer, up front'. 'Wrong tone' becomes a tone constraint in the standing instructions. Until you can point to the lever, you are still complaining, and the next try is guesswork.",
          "Then capture what worked. A fix discovered on Monday and left in the chat has to be discovered again the following Monday, and again by anyone who covers for you. Writing it down once turns a recurring cost into a single one. Ask: will this correction be needed again, by me or anyone else? If yes, it belongs in configuration: wording that consistently works goes into the standing instructions; a fix with several steps goes into a Skill. Memory might notice a pattern you keep repeating, but it belongs to one person and is not guaranteed; configuration is the place that is deliberate, shared and dependable.",
          "Two examples. A sales coordinator notices every proposal draft leaves out the payment terms and buries the price at the end; two standing instructions in the proposals Project (payment terms in the summary; price in its own section after the scope) and the weekly correction disappears. A finance assistant who reminds Claude each month to leave out transfers between group companies, but never writes it down, goes on holiday; the colleague covering does not know, and the report goes out with the transfers counted as revenue. The fix had been known for months; leaving it uncaptured was the failure. Judge each adjustment against the criteria you set, changing one thing at a time."
        ],
        tables: [{
          cap: "Reaction to instruction",
          h: ["Reaction", "Instruction", "Where it lives"],
          r: [
            ["Too generic", "Name the audience and the one action you want them to take", "Prompt, or standing instruction if it recurs"],
            ["Missed the point", "State the single question the output must answer, first", "Prompt"],
            ["Wrong tone again", "Accountable, not apologetic; under 120 words", "Standing instruction"],
            ["Keeps counting group transfers as revenue", "Exclude transfers between group companies", "Standing instruction or Skill step"],
            ["Format differs each time", "Follow the report template in this order", "Skill"]
          ]
        }],
        know: [
          "Each disappointing output is data about the set-up.",
          "Translate reactions into instructions by naming the lever: prompt, context or configuration.",
          "Will this correction be needed again? Then capture it.",
          "Wording that works goes in standing instructions; a fix with several steps goes in a Skill.",
          "Memory is per user and best effort; configuration is shared and reliable.",
          "Judge adjustments against criteria; one change at a time."
        ],
        build: ["Worked question Q8: the inconsistent answers", WQ + "q8--domain-7-the-inconsistent-answers"],
        traps: [
          { move: "Fix it by hand each Friday; it only takes ten minutes", why: "That repeats the cost forever and fails when someone else covers. Capture the fix in configuration." },
          { move: "Open a new chat each week and explain the correction again", why: "Still a repeated cost. Write it into the standing instructions or a Skill once." },
          { move: "Rely on Memory to pick up the correction eventually", why: "Memory is per user and best effort. Put shared fixes in configuration." },
          { move: "Tell Claude it is not quite right and ask for another go", why: "A reaction carries no instruction. Name what must change and which lever controls it." },
          { move: "Try a different model each week until one stops making the mistake", why: "The cause is in the set-up. Diagnose the missing instruction and capture it." }
        ]
      },
      {
        title: "Optimise workflows for efficiency and effectiveness", w: null,
        scope: "Find redundancy and friction in recurring Claude workflows, promote fixes into Projects, Skills and instructions, and measure the improvement against the metric that matters.",
        lesson: [
          "Optimisation is deliberate. Friction hides because you pay for it in small amounts, one session after another. To find it, run one full cycle of the workflow with the job of writing down every manual step you also did last time. Three signals point to removable friction. Repetition: the same text pasted or typed on every run (move it into knowledge or the standing instructions). Correction: the same flaw edited out of every output (change the configuration so it stops appearing). Variance: colleagues doing the same task get different results (give them one shared Skill or knowledge base).",
          "Most gains come from two moves: merge steps that could run as one instead of separate prompts, and promote repeated patterns into configuration. The fix must land in the right home. A rule that should always apply goes in the standing instructions. Reference material every run needs goes in the knowledge base. A repeatable procedure with steps goes in a Skill. A procedure squeezed into a one-line instruction loses its steps; reference material crammed into instructions bloats every conversation.",
          "Promote with care. When you move a fix into configuration, keep the old way to hand for a few runs until the new set-up has proved itself. A bad change baked into a workflow everyone uses compounds just as a good one does. Match the model to the workload while you are at it: a fast, light tier for high-volume simple work, a more capable tier for deep judgement. The heavyweight for everything is wasteful; the lightweight for judgement calls is risky.",
          "Measure the gain with the metric that matches why the workflow matters: time per cycle, revision rounds, consistency across people, or errors reaching the final product. A customer-facing report optimises for consistency and accuracy more than speed; an internal draft optimises for time. Example (illustrative figures): four account managers each spend about an hour on their part of a monthly client newsletter, and the parts read as if four companies wrote them. The client background moves into a shared knowledge base (a reference), the house layout into a Skill (a procedure), the fact-check step into a standing instruction (a rule). Result: around 35 minutes each, one house style and one fewer review round. Choosing the metric up front also tells you when to stop: past good enough, more tuning is friction of its own."
        ],
        tables: [
          {
            cap: "Friction signals",
            h: ["Signal", "Looks like", "Fix"],
            r: [
              ["Repetition", "Pasting the same background every run", "Knowledge base or standing instruction"],
              ["Correction", "Fixing the same flaw in every output", "A configuration change so it stops appearing"],
              ["Variance", "Different people get different results", "A shared Skill or knowledge base"]
            ]
          },
          {
            cap: "Rule, reference or procedure",
            h: ["The fix is a…", "Home", "Example"],
            r: [
              ["Rule", "Standing instruction", "Always state the target segment in the first line"],
              ["Reference", "Knowledge base", "The brand voice guide; the current product list"],
              ["Procedure", "Skill", "Build the weekly report in this order and format"]
            ]
          }
        ],
        know: [
          "Instrument one full cycle; list every manual step you repeated. That list is the backlog.",
          "Repetition, correction, variance: three signals of removable friction.",
          "Consolidate steps; promote patterns into configuration.",
          "Rule to instructions, reference to knowledge, procedure to a Skill.",
          "Prove a change on a few runs before relying on it.",
          "Heavy model for depth, light model for volume.",
          "Measure the metric that matters (time, revisions, consistency, errors) and stop at good enough."
        ],
        build: ["Worked question Q8: the inconsistent answers", WQ + "q8--domain-7-the-inconsistent-answers"],
        traps: [
          { move: "Sections arrive in different styles, so give the analysts a faster model", why: "The friction is variance, not speed. A shared Skill for the format removes it." },
          { move: "Buy more review time to absorb the inconsistent formatting", why: "That spreads the cost instead of removing the cause. Standardise the format with a shared Skill." },
          { move: "Run the heavyweight model for every task in the workflow", why: "Wasteful by definition. Light tier for volume, capable tier for depth." },
          { move: "Paste the full product catalogue into the standing instructions", why: "Reference material belongs in the knowledge base; in instructions it bloats every conversation." },
          { move: "Switch the whole team to the new set-up at once without testing it", why: "A bad change compounds across everyone. Prove it on a few cycles first." },
          { move: "Measure success by how much faster it feels", why: "Feelings are not evidence. Pick a metric in advance and measure it." }
        ]
      }
    ],
    remember: [
      "Read the timing; check cheapest first.",
      "Reshape what no tool can do; escalate what is beyond the layer.",
      "Turn reactions into instructions, then capture them.",
      "Rule, reference, procedure; measure the gain."
    ]
  },

  /* ================================================================ technique */
  {
    id: "technique", code: "★", title: "Exam technique", w: null, eps: "EP 00 and the bonus", t: 7,
    summary: "How to choose between two plausible answers, the five habits that resolve most scenario questions, and the distractor patterns that recur across every domain.",
    links: [
      ["🎯", "Five exam tips", AO + "exam-tips.md"],
      ["▶", "Bonus · Why people fail the CCAO-F exam (66 min)", YT + "27VlyAMSqO8"],
      ["⚠", "Printable traps sheet", "flashcards.html?track=ccao-f&mode=traps"]
    ],
    highlights: [
      "60 items in 120 minutes: two minutes each. Multiple-response items say how many to pick.",
      "AI drafts; a person decides. Options that hand the decision itself to Claude are traps.",
      "Policy and data sensitivity outrank every clever technique.",
      "Strike the panicker and the do-nothing, compare the last two, pick the boring one."
    ],
    subs: [
      {
        title: "Strike, compare, pick", w: null, scope: "",
        lesson: [
          "Almost every item is a workplace scenario with four options. Usually one option does nothing or hands the problem to someone else, one panics (ban it, abandon it, rebuild everything), and two are plausible. Strike the first two, then read the qualifier in the stem (most appropriate, first, best, most efficient) and compare the last two against it.",
          "Of the last two, the trap usually feels diligent, thorough or impressive: a self-check, a bigger model, a full rebuild, a second reviewer. The right answer is usually narrower, cheaper and more boring: open the source, add the missing context, anonymise first, name the gate, capture the fix. The score report shows your percentage per domain; the pass is decided on the total scaled score, so do not sink five minutes into one item. Pick, flag, move on."
        ],
        know: [
          "Strike: do nothing, push it to someone else, defer it, ban it, rebuild everything.",
          "Read the qualifier: first step, most appropriate and most efficient point to different answers.",
          "Prefer the option that diagnoses or verifies before changing anything.",
          "Prefer the proportionate fix over the impressive one.",
          "Two minutes per item: pick, flag, return if time allows."
        ],
        traps: [
          { move: "Pick the option that sounds most thorough and diligent", why: "Thorough at the wrong step is wrong. The right answer is usually narrower, cheaper and more boring." },
          { move: "Pick the option with the most advanced technology", why: "Complexity before evidence is a recurring distractor. Start simple." }
        ]
      },
      {
        title: "Five habits", w: null, scope: "",
        lesson: [
          "Five habits resolve most items. A person stays in the loop for anything that acts: a decision, a customer message, a shortlist. AI drafts, you decide: options that delegate the decision itself are traps. Know when to escalate: repeated rewrites, integrations, custom tooling or a system others depend on are beyond the associate's layer, and recognising that is the tested skill. Eliminate first. And organisation policy and data sensitivity come before any clever technique: the data has to be allowed into the tool before anything else happens.",
          "The night before: run through the recap deck, redo the worked questions cold, and read your own organisation's AI usage policy so the governance items come from memory rather than instinct. Product names and plan details change; the exam is marked against its guide, and the durable judgement is what is tested."
        ],
        know: [
          "A person approves anything that acts on people, money or customers.",
          "AI drafts; a person decides.",
          "Escalate integrations, custom tooling and systems others depend on to Developers or Architects.",
          "Eliminate two, compare two.",
          "Policy and data sensitivity first; no prompt overrides a data rule."
        ],
        traps: []
      },
      {
        title: "Distractors that recur", w: null, scope: "",
        lesson: [
          "The same wrong answers turn up in different clothes across all seven domains. Learn their shapes and you can strike them in seconds.",
          "The self-check (ask Claude to verify or rate itself). The blind retry (ask again, run it five times, average the answers). The expensive lever first (bigger model, full rebuild, new platform). The blanket rule (ban it, turn Memory off, skip the analysis). The prompt as a control (tell Claude to keep the data confidential, to ignore irrelevant files, to watch for stale material). The label instead of the gate (a human in the loop with nobody named, a disclaimer instead of review). Disclosure only on request. The whole-drive connector. Incognito as permission for regulated data. Borrowed vendor numbers. Halo delegation (it drafted well, so let it approve)."
        ],
        know: [
          "Self-check or self-rated confidence: never verification.",
          "Retry with nothing new: a lottery ticket.",
          "Bigger model, rebuild or new platform first: the expensive lever before the cheap one.",
          "A prompt instruction as the control for data, scope or staleness: always wrong.",
          "Disclosure on request, whole-drive connectors, Incognito as permission: named traps.",
          "Halo delegation: drafting well never earns the approval step."
        ],
        traps: [
          { move: "Ask Claude to confirm its own answer", why: "The same model marking its own homework. Verification means opening an authoritative source." },
          { move: "Solve a data-policy problem with an instruction in the prompt", why: "No prompt overrides policy. Anonymise, use an approved path, or keep the data out." }
        ]
      }
    ],
    remember: [
      "Strike two, compare two.",
      "AI drafts, you decide.",
      "Policy first.",
      "When torn, pick the boring one."
    ]
  }
  ]
};
})();
