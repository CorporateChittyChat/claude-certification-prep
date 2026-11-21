# Subagent Invocation and Context Passing

## Run the exercise

Use Node.js 20 or later. Open a terminal in this folder and run:

```sh
node demo.mjs
node demo.mjs --strip-sources
node anti-patterns.mjs
node --test
```

The library pilot, claims and citations are fictional fixtures, and the code makes zero network calls. The first command prints two findings alongside their sources. The second strips the source fields and shows both missing-citation flags. Predict the output before each run, then compare the coordinator handoff with the report.

The [practice questions and answer key](practice-questions.md) cover the same handoff, tool configuration, context, and session decisions as the video.

1. In `demo.mjs`, remove the document page in a local experiment. Decide which layer should reject or flag the incomplete finding.
2. Read the three broken and repaired handoffs printed by `anti-patterns.mjs`. Change the two example durations and predict when synthesis starts with each schedule.
3. Restore the file and run the tests. The checks verify that the claims stay identical when sources are stripped and that the good run produces traceable citations.

Two review prompts for discussion:

- A researcher follows a fixed list of six searches even after the report has moved. Write a brief with an objective, an evidence standard, and the required output fields. Give it room to choose the search path.
- A resumed investigation references an older PDF. Write the next prompt naming the changed file and asking the agent to re-read the pages that support its conclusion.

`Promise.all` demonstrates two independent jobs in the mock. In the CCAR-F scenario the coordinator emits multiple Task calls in one response. Current Claude Agent SDK code uses Agent.

The synthesis function is deterministic. A real SDK integration would configure named agents in `options.agents`, pass the source-bearing findings in the synthesis agent’s delegation prompt, and validate report citations against the supplied source records.

- [Subagents in the Claude Agent SDK](https://code.claude.com/docs/en/agent-sdk/subagents)
- [Claude Agent SDK permissions](https://code.claude.com/docs/en/agent-sdk/permissions)
