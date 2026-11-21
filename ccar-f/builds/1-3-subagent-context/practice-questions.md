# CCAR-F lesson 1.3 — Practice questions and answers

Original practice for the lesson. Answer each question before checking the answer key.

## 1. Inspect the Coordinator Handoff

Two research subagents each return a finding with a source. Synthesis receives both claims, but the report has no citations. Which step should you inspect first?

- **A.** The web lookup step
- **B.** The document-reading step
- **C.** The coordinator’s handoff to synthesis
- **D.** The session history

## 2. What does CCAR-F expect for spawning?

A CCAR-F scenario defines several specialists, but the coordinator has no Task entry in its allowed-tools configuration. Which change does the exam guide expect?

- **A.** List Task in allowedTools.
- **B.** List the report title.
- **C.** Carry over every conversation.
- **D.** Set fork_session only.

## 3. How do you hide Agent in the current SDK?

Your application uses the current Claude Agent SDK and needs to remove the built-in Agent tool. Which setting removes it from the tool set?

- **A.** Remove it from allowedTools.
- **B.** Use disallowedTools.
- **C.** Rename the prompt field.
- **D.** Drop the result payload.

## 4. What does a standard specialist inherit?

A standard specialist starts without a subagent fork. What inputs can it use immediately for its assignment?

- **A.** The parent chat transcript.
- **B.** The previous worker tool results.
- **C.** Its own instructions and the task prompt.
- **D.** Every sibling’s final response.

## 5. What should the coordinator pass downstream?

A synthesis worker needs results from both a web researcher and a document reader. What should the coordinator put in its delegation prompt?

- **A.** Only team names.
- **B.** The last claim only.
- **C.** A worker tool count.
- **D.** Complete findings with sources.

## 6. Where did provenance first disappear?

The researchers returned source metadata. The synthesis input contains only claims. Where did the source information first disappear?

- **A.** The handoff, if the worker returned it.
- **B.** The runtime by default.
- **C.** The SDK session title.
- **D.** The output font.

## 7. Which brief is most adaptable?

A research worker may encounter a mirrored report or a moved link. Which brief lets it adapt while preserving the required output?

- **A.** Use exactly six searches.
- **B.** Copy any number you find.
- **C.** Return verified claims and sources.
- **D.** Guess if a page is missing.

## 8. How do you handle conflicting evidence?

Two cited findings genuinely disagree about the same metric. Under the lesson’s workflow policy, what should the synthesis worker do?

- **A.** Preserve both sources and escalate.
- **B.** Average the reported values.
- **C.** Hide the later source.
- **D.** Pick the first response.

## 9. When should synthesis begin?

Web research and document analysis can start independently, but synthesis uses both findings. When should the coordinator start synthesis?

- **A.** Before the researchers.
- **B.** After both needed results arrive.
- **C.** After waiting a fixed second.
- **D.** At the first tool invocation.

## 10. What creates a branch from a baseline?

Two alternative investigations should share an existing analysis baseline, then proceed as separate SDK sessions. Which option creates the branch?

- **A.** Resume alone.
- **B.** A new tool description.
- **C.** A plain parallel Agent call.
- **D.** Resume with session forking.

## 11. Three reviewed files changed overnight. What next?

Version control shows three files changed during a paused investigation. The rest of the baseline still applies. How should the agent continue?

- **A.** Repeat the same prompt blind.
- **B.** Resume and request targeted re-reads.
- **C.** Fork without mentioning the change.
- **D.** Reuse the old tool results as evidence.

## Answer key

### 1. C — The coordinator’s handoff to synthesis

- **A.** The web worker already returned its source.
- **B.** The document worker already returned its source.
- **C.** Compare worker output with the exact synthesis prompt.
- **D.** The missing fields are evidence about the handoff.

### 2. A — List Task in allowedTools.

- **A.** The guide teaches adding Task to allowedTools.
- **B.** A report title has no effect on invocation.
- **C.** Copying a conversation leaves tool configuration unchanged.
- **D.** Forking branches a session.

### 3. B — Use disallowedTools.

- **A.** Omission alone only removes that pre-approval entry.
- **B.** This field removes built-in tools from the tool set.
- **C.** The system prompt field describes instructions.
- **D.** Changing the result leaves the tool available.

### 4. C — Its own instructions and the task prompt.

- **A.** The parent transcript stays with the parent.
- **B.** Prior tool results need to be passed when relevant.
- **C.** The specialist starts with its instructions and task prompt.
- **D.** Sibling results need to be sent when required.

### 5. D — Complete findings with sources.

- **A.** Names cannot supply findings or citations.
- **B.** The other evidence would be lost.
- **C.** A tool count supplies no evidence.
- **D.** Include both result sets and the source for every claim.

### 6. A — The handoff, if the worker returned it.

- **A.** The coordinator dropped fields while building the prompt.
- **B.** The available evidence shows a handoff failure.
- **C.** Renaming a session leaves the payload unchanged.
- **D.** Typography cannot restore a removed field.

### 7. C — Return verified claims and sources.

- **A.** A fixed search count cannot adapt to moved evidence.
- **B.** An unverified number gives the reviewer no trace.
- **C.** Specify the objective and require traceable evidence.
- **D.** Flag a missing page instead of guessing.

### 8. A — Preserve both sources and escalate.

- **A.** Keep both citations and return the unresolved conflict.
- **B.** Averaging invents a conclusion from competing evidence.
- **C.** Hiding a source prevents review of the conflict.
- **D.** Arrival order says nothing about evidence quality.

### 9. B — After both needed results arrive.

- **A.** The required findings are still missing.
- **B.** This satisfies both dependencies.
- **C.** Time elapsed cannot prove both results arrived.
- **D.** An invocation event shows only that work started.

### 10. D — Resume with session forking.

- **A.** Resume alone appends to the original.
- **B.** A description helps Claude choose a specialist.
- **C.** Parallel tool calls can delegate independent work.
- **D.** Resume identifies the base and the fork option branches it.

### 11. B — Resume and request targeted re-reads.

- **A.** Repeating the prompt leaves stale evidence unaddressed.
- **B.** Name the changed files and request targeted re-reads.
- **C.** Forking preserves the same stale information.
- **D.** Old tool results may no longer reflect the files.
