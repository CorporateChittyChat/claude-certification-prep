/* Learning-path data for path.html. Lesson fields: id, title, mins (estimated), links ([icon, label, url]),
   t = flashcard topic index in flashcards-data.js (for the weak-area readout), opt = optional (not needed for
   the certificate). examMap turns the mock exam's domain keys into flashcard topic indexes. Video lengths were
   read from the playlists on 2026-10-23; reading and build times are estimates. */
window.PATH_DATA = {
"ccao-f": {
  "title": "CCAO-F", "name": "Claude Certified Associate – Foundations",
  "who": "For project managers, business analysts, delivery leads and other professionals who use Claude at work without writing code.",
  "exam": "ccao-f/practice/mock-exam-player.html", "flash": "flashcards.html?track=ccao-f",
  "playlist": "https://www.youtube.com/playlist?list=PLFbwN1bk0S4c",
  "outcomes": [
    "Write prompts that name the role, context, audience and format, and split big jobs into chains",
    "Spot the four tells of a fabricated fact, and know when a qualified human must sign",
    "Pick the right Claude feature and model rung, and tune before you switch",
    "Find the one workflow step where Claude pays off, and pitch it honestly",
    "Set up projects with fenced knowledge and keep the setup healthy",
    "Apply the seven high-stakes areas, up-front disclosure and the data-policy gate",
    "Diagnose a bad output in order: prompt, information, effort, escalate"
  ],
  "prereqs": ["You use Claude at work; no code needed", "About 4–5 hours in total, in 20-minute lessons", "Nothing to install: videos on YouTube, guides on GitHub"],
  "examMap": {"Domain 1": 0, "Domain 2": 1, "Domain 3": 2, "Domain 4": 3, "Domain 5": 4, "Domain 6": 5, "Domain 7": 6},
  "sections": [
    {"title": "Before you start", "lessons": [
      {"id": "ao-00", "title": "EP 00 · Before you book: five things to know", "mins": 14, "t": 7,
       "links": [["▶", "Watch (4 min)", "https://youtu.be/NmGsB9LPrB0"], ["📄", "Exam logistics", "https://github.com/CorporateChittyChat/claude-certification-prep/blob/main/ccao-f/exam-logistics.md"], ["🎯", "Five exam tips", "https://github.com/CorporateChittyChat/claude-certification-prep/blob/main/ccao-f/exam-tips.md"]]},
      {"id": "ao-bonus", "title": "Bonus · Why people fail the CCAO-F exam, and how to fix it", "mins": 66, "opt": true,
       "links": [["▶", "Watch (66 min)", "https://youtu.be/27VlyAMSqO8"]]}
    ]},
    {"title": "The seven domains", "lessons": [
      {"id": "ao-d1", "title": "Domain 1 · Prompting and task execution", "mins": 20, "t": 0,
       "links": [["▶", "Watch EP 01 (7 min)", "https://youtu.be/iF-ohGig97A"], ["📘", "Study guide", "https://github.com/CorporateChittyChat/claude-certification-prep/blob/main/ccao-f/domains/01-prompting.md"], ["❓", "Worked question Q1", "https://github.com/CorporateChittyChat/claude-certification-prep/blob/main/ccao-f/practice/episode-questions.md#q1--domain-1-the-format-lottery"], ["🃏", "Flashcards", "flashcards.html?track=ccao-f"]]},
      {"id": "ao-d2", "title": "Domain 2 · Output evaluation and validation (the biggest slice)", "mins": 26, "t": 1,
       "links": [["▶", "Watch EP 02, part A (7 min)", "https://youtu.be/pIaL_jCyt4g"], ["▶", "Watch EP 03, part B (6 min)", "https://youtu.be/BNgWy2hHvz8"], ["📘", "Study guide", "https://github.com/CorporateChittyChat/claude-certification-prep/blob/main/ccao-f/domains/02-output-evaluation.md"], ["❓", "Worked questions Q2 and Q3", "https://github.com/CorporateChittyChat/claude-certification-prep/blob/main/ccao-f/practice/episode-questions.md#q2--domain-2a-the-statistic-and-the-hour"]]},
      {"id": "ao-d3", "title": "Domain 3 · Product and model selection", "mins": 19, "t": 2,
       "links": [["▶", "Watch EP 04 (6 min)", "https://youtu.be/6xZXW6I6gl0"], ["📘", "Study guide", "https://github.com/CorporateChittyChat/claude-certification-prep/blob/main/ccao-f/domains/03-product-and-model-selection.md"], ["❓", "Worked question Q4", "https://github.com/CorporateChittyChat/claude-certification-prep/blob/main/ccao-f/practice/episode-questions.md#q4--domain-3-the-shallow-analysis"]]},
      {"id": "ao-d4", "title": "Domain 4 · Workflow integration and solution design", "mins": 20, "t": 3,
       "links": [["▶", "Watch EP 05 (7 min)", "https://youtu.be/tzEhyG-QbTE"], ["📘", "Study guide", "https://github.com/CorporateChittyChat/claude-certification-prep/blob/main/ccao-f/domains/04-workflow-integration.md"], ["❓", "Worked question Q5", "https://github.com/CorporateChittyChat/claude-certification-prep/blob/main/ccao-f/practice/episode-questions.md#q5--domain-4-the-impressive-rebuild"]]},
      {"id": "ao-d5", "title": "Domain 5 · Configuration and knowledge management", "mins": 19, "t": 4,
       "links": [["▶", "Watch EP 06 (6 min)", "https://youtu.be/2yhNNgyyDO8"], ["📘", "Study guide", "https://github.com/CorporateChittyChat/claude-certification-prep/blob/main/ccao-f/domains/05-configuration-and-knowledge.md"], ["❓", "Worked question Q6", "https://github.com/CorporateChittyChat/claude-certification-prep/blob/main/ccao-f/practice/episode-questions.md#q6--domain-5-the-weekly-report-setup"]]},
      {"id": "ao-d6", "title": "Domain 6 · Governance, risk and responsible use", "mins": 19, "t": 5,
       "links": [["▶", "Watch EP 07 (6 min)", "https://youtu.be/p5fpyypMERM"], ["📘", "Study guide", "https://github.com/CorporateChittyChat/claude-certification-prep/blob/main/ccao-f/domains/06-governance-risk-responsible-use.md"], ["❓", "Worked question Q7", "https://github.com/CorporateChittyChat/claude-certification-prep/blob/main/ccao-f/practice/episode-questions.md#q7--domain-6-the-launch-question"]]},
      {"id": "ao-d7", "title": "Domain 7 · Troubleshooting and optimisation", "mins": 19, "t": 6,
       "links": [["▶", "Watch EP 08 (6 min)", "https://youtu.be/vfaFaZmeXBg"], ["📘", "Study guide", "https://github.com/CorporateChittyChat/claude-certification-prep/blob/main/ccao-f/domains/07-troubleshooting-and-optimization.md"], ["❓", "Worked question Q8", "https://github.com/CorporateChittyChat/claude-certification-prep/blob/main/ccao-f/practice/episode-questions.md#q8--domain-7-the-inconsistent-answers"]]}
    ]},
    {"title": "Exam rehearsal", "lessons": [
      {"id": "ao-cards", "title": "All 49 flashcards, then the traps sheet", "mins": 25, "t": 7,
       "links": [["🃏", "Flashcards", "flashcards.html?track=ccao-f"], ["⚠", "Traps and tricks sheet", "flashcards.html?track=ccao-f&mode=traps"]]},
      {"id": "ao-deck", "title": "Recap deck: all seven domains on slides", "mins": 15,
       "links": [["🗂", "Recap deck (PDF)", "ccao-f/assets/ccaof-recap-deck.pdf"]]},
      {"id": "ao-exam", "title": "Timed mock exam: 30 questions in 60 minutes", "mins": 60, "exam": true,
       "links": [["▶", "Sit the mock exam", "ccao-f/practice/mock-exam-player.html"], ["📝", "Answers explained", "https://github.com/CorporateChittyChat/claude-certification-prep/blob/main/ccao-f/practice/mock-exam-answers.md"]]}
    ]}
  ]
},
"ccdv-f": {
  "title": "CCDV-F", "name": "Claude Certified Developer – Foundations",
  "who": "For people who build with Claude: the API, agents, tools and MCP, and Claude Code.",
  "exam": "ccdv-f/practice/mock-exam-player.html", "flash": "flashcards.html?track=ccdv-f",
  "playlist": "https://www.youtube.com/playlist?list=PLHvgccck0QgI",
  "outcomes": [
    "Choose and cost a model on your own labelled data, and use caching, batches and extended thinking where they pay",
    "Decide between a workflow and an agent, and enforce budgets and gates in code",
    "Use the Messages API well: streaming, batches, backoff on 429s, provider details in configuration",
    "Engineer prompts and context: varied examples, untrusted text as data, validated schemas, compaction",
    "Write tool descriptions and MCP servers the model picks correctly",
    "Configure Claude Code: settings precedence, CLAUDE.md and rules, hooks, skills and headless CI",
    "Turn a business brief into requirements, and ship prompt changes only behind an eval set"
  ],
  "prereqs": ["Python or TypeScript basics", "An API key for the EP 01–04 builds; EP 05–09 run without one", "About 9 hours including the hands-on builds"],
  "examMap": {"Model selection": 0, "Agents & workflows": 1, "The Messages API": 2, "Prompt & context engineering": 3, "Tools & MCP": 4, "Settings & CLAUDE.md": 5, "Claude Code: hooks, skills, headless": 6, "Requirements & build life cycle": 7, "Eval, testing & debugging": 8},
  "sections": [
    {"title": "Before you start", "lessons": [
      {"id": "dv-00", "title": "EP 00 · The exam: format, eligibility, the eight domains", "mins": 11, "t": 9,
       "links": [["▶", "Watch (6 min)", "https://youtu.be/alqhsExgcR8"], ["📘", "Track overview and episode map", "https://github.com/CorporateChittyChat/claude-certification-prep/tree/main/ccdv-f"]]}
    ]},
    {"title": "The episodes: watch, then build", "lessons": [
      {"id": "dv-01", "title": "EP 01 · Model selection and cost optimisation", "mins": 38, "t": 0,
       "links": [["▶", "Watch (8 min)", "https://youtu.be/Vm1Gmjkb3fM"], ["⌨", "Build: ep01-models (Python)", "https://github.com/chittychat-studio/ccdvf-course/tree/main/ep01-models"]]},
      {"id": "dv-02", "title": "EP 02 · Agents and workflows", "mins": 39, "t": 1,
       "links": [["▶", "Watch (9 min)", "https://youtu.be/2WyMrBTmmUs"], ["⌨", "Build: ep02-agents (TypeScript)", "https://github.com/chittychat-studio/ccdvf-course/tree/main/ep02-agents"]]},
      {"id": "dv-03", "title": "EP 03 · The Messages API: streaming, images and batches", "mins": 39, "t": 2,
       "links": [["▶", "Watch (9 min)", "https://youtu.be/iMBVThGLJi0"], ["⌨", "Build: ep03-messages (Python)", "https://github.com/chittychat-studio/ccdvf-course/tree/main/ep03-messages"]]},
      {"id": "dv-04", "title": "EP 04 · Prompt and context engineering", "mins": 48, "t": 3,
       "links": [["▶", "Watch (8 min)", "https://youtu.be/HS6K4A7Gl5o"], ["⌨", "Build: ep04-prompting (Python)", "https://github.com/chittychat-studio/ccdvf-course/tree/main/ep04-prompting"], ["❓", "PRACTICE.md", "https://github.com/chittychat-studio/ccdvf-course/blob/main/ep04-prompting/PRACTICE.md"]]},
      {"id": "dv-05", "title": "EP 05 · Tools and MCP", "mins": 48, "t": 4,
       "links": [["▶", "Watch (8 min)", "https://youtu.be/T0pDaobW79c"], ["⌨", "Build: ep05-tools-mcp (TypeScript, no key)", "https://github.com/chittychat-studio/ccdvf-course/tree/main/ep05-tools-mcp"], ["❓", "PRACTICE.md", "https://github.com/chittychat-studio/ccdvf-course/blob/main/ep05-tools-mcp/PRACTICE.md"]]},
      {"id": "dv-06", "title": "EP 06 · Settings and CLAUDE.md", "mins": 38, "t": 5,
       "links": [["▶", "Watch (8 min)", "https://youtu.be/3dEtqvjJEoc"], ["⌨", "Build: ep06-config-checker (TypeScript, no key)", "https://github.com/chittychat-studio/ccdvf-course/tree/main/ep06-config-checker"], ["❓", "PRACTICE.md", "https://github.com/chittychat-studio/ccdvf-course/blob/main/ep06-config-checker/PRACTICE.md"]]},
      {"id": "dv-07", "title": "EP 07 · Claude Code: permission modes, hooks, subagents, skills", "mins": 50, "t": 6,
       "links": [["▶", "Watch (10 min)", "https://youtu.be/meUspuAi6HY"], ["⌨", "Build: ep07-guard-hook (TypeScript, no key)", "https://github.com/chittychat-studio/ccdvf-course/tree/main/ep07-guard-hook"], ["❓", "PRACTICE.md", "https://github.com/chittychat-studio/ccdvf-course/blob/main/ep07-guard-hook/PRACTICE.md"]]},
      {"id": "dv-08", "title": "EP 08 · Requirements, the build life cycle and the seams", "mins": 39, "t": 7,
       "links": [["▶", "Watch (9 min)", "https://youtu.be/S_wwjrwVpQg"], ["⌨", "Build: ep08-gate-checker (Python, no key)", "https://github.com/chittychat-studio/ccdvf-course/tree/main/ep08-gate-checker"], ["❓", "PRACTICE.md", "https://github.com/chittychat-studio/ccdvf-course/blob/main/ep08-gate-checker/PRACTICE.md"]]},
      {"id": "dv-09", "title": "EP 09 · Eval, testing and debugging", "mins": 49, "t": 8,
       "links": [["▶", "Watch (9 min)", "https://youtu.be/4vvEK4fWEXw"], ["⌨", "Build: ep09-failure-checker (TypeScript, no key)", "https://github.com/chittychat-studio/ccdvf-course/tree/main/ep09-failure-checker"], ["❓", "PRACTICE.md", "https://github.com/chittychat-studio/ccdvf-course/blob/main/ep09-failure-checker/PRACTICE.md"]]},
      {"id": "dv-10", "title": "EP 10 · Prompt injection and AI security", "mins": 8, "t": 3,
       "links": [["▶", "Watch (8 min)", "https://youtu.be/Z5FIb8Y5G5A"], ["🃏", "Flashcards: EP 04 and EP 05 topics", "flashcards.html?track=ccdv-f"]]},
      {"id": "dv-wrap", "title": "Wrap-up · Certificate and score proof, tips and traps per domain, speed round", "mins": 54, "t": 9,
       "links": [["▶", "Watch (54 min)", "https://youtu.be/KzK9R89sMtM"]]}
    ]},
    {"title": "Exam rehearsal", "lessons": [
      {"id": "dv-cards", "title": "All 51 flashcards, then the traps sheet", "mins": 25, "t": 9,
       "links": [["🃏", "Flashcards", "flashcards.html?track=ccdv-f"], ["⚠", "Traps and tricks sheet", "flashcards.html?track=ccdv-f&mode=traps"]]},
      {"id": "dv-exam", "title": "Timed mock exam: 30 questions in 60 minutes", "mins": 60, "exam": true,
       "links": [["▶", "Sit the mock exam", "ccdv-f/practice/mock-exam-player.html"], ["📝", "Answers explained", "https://github.com/CorporateChittyChat/claude-certification-prep/blob/main/ccdv-f/practice/mock-exam-answers.md"]]}
    ]}
  ]
}};
