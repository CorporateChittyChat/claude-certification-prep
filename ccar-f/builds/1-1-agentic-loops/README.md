# CCAR-F Lesson 1.1: Agentic Loops (companion code)

Build the loop that every Claude agent runs on, break it three ways on purpose, then fix it.
Companion to the Corporatechittychat episode on Task 1.1 of the Claude Certified Architect, Foundations exam.

**You can do everything below for free.** The default mode replays a scripted conversation
through a mock that enforces the documented message rules. You only need a developer account and a
small amount of API credits if you choose to call the real API (step 5).

## What's in here

| File | What it teaches |
|---|---|
| `agent_loop.py` | The manual loop: send, inspect `stop_reason`, run tools, append, repeat |
| `01_manual_loop.py` | The lesson's build exercise (calculator + mock search, multi-step prompt, safety cap) |
| `02_stop_reasons.py` | Every `stop_reason` value and what a production loop does with it |
| `03_tool_runner.py` | The same loop written for you by the SDK Tool Runner (real mode only) |
| `anti_patterns/` | The exam traps as runnable bugs, each next to its fix |
| `05_errors_and_parallel.py` | Parallel tool calls and `is_error` |
| `common/fake_client.py` | The free mock. It raises where the real API would answer 400 |
| `tests/` | 19 offline tests. `pytest` should pass with no key |

## Step 1. What you need

- A computer with a current Python 3 and a terminal
- A code editor (any)
- Nothing else for mock mode

## Step 2. Get the code and install

```bash
git clone https://github.com/CorporateChittyChat/claude-certification-prep
cd claude-certification-prep/ccar-f/builds/1-1-agentic-loops
python -m venv .venv
# Windows:  .venv\Scripts\activate      Mac/Linux:  source .venv/bin/activate
pip install -r requirements.txt
```

## Step 3. Run it free (mock mode, the default)

```bash
python 01_manual_loop.py      # watch four iterations: tool_use, tool_use, tool_use, end_turn
python 02_stop_reasons.py     # the full stop_reason table
python anti_patterns/a_parse_text.py
python anti_patterns/b_iteration_cap.py
python anti_patterns/c_first_block_text.py
python anti_patterns/d_drop_history.py
python 05_errors_and_parallel.py
pytest -q                     # 19 tests, no key, no network
```

Each anti-pattern script prints `BUGGY` next to `FIXED` so you can see the wrong answer, then the right one.

## Step 4. Read the loop against the four steps

Open `agent_loop.py`. The numbered comments are the lesson:

1. **Send** the whole history, the system prompt and the tool definitions. The API is stateless.
2. **Inspect** `stop_reason`. It is the only loop-control signal.
3. `tool_use`: run **every** tool block, append the assistant turn first, then one user message holding every `tool_result`.
4. `end_turn`: finished. Return the text.

## Step 5. (Optional) Run it for real

**Read this first. It is the part most people get wrong:**

- The API lives in the **Claude Console** (platform.claude.com). That is a *separate* account and billing from claude.ai.
- A **Claude Pro subscription does not include API usage** and you do **not** need Pro for this course. Anthropic's support page says so: *"I subscribe to Claude Pro. Why do I have to pay separately for API usage on Console?"*
- **Skip the subscription. Buy a small amount of API credits instead**, an amount you are comfortable losing. Check the Console billing page for how it works today.

Then:

1. Create a Console account and buy a small amount of credits.
2. In the Console, **set a monthly spend limit** before you do anything else.
3. Create an API key. Copy `.env.example` to `.env` and paste the key in. `.env` is git-ignored. Never commit it, never paste it in a screenshot.
4. **Use Haiku only.** It is the smallest, cheapest model family and plenty for this course. Confirm the exact Haiku model id on the Console's Models page and set `CCARF_MODEL` to it. This is learning, not production.
5. Run:
   ```bash
   CCARF_MODE=real python 01_manual_loop.py        # Windows PowerShell: $env:CCARF_MODE="real"; python 01_manual_loop.py
   CCARF_MODE=real python 03_tool_runner.py
   ```
6. Look at the Console **Usage** page afterwards so you know what the run cost.

Prompts are tiny and `max_tokens` is capped at 1024, so a run should be very small. The safety cap (20 iterations) stops a runaway loop from burning credit.

## The exam traps (each has a file)

| Trap | Why it fails | The fix |
|---|---|---|
| Parse "I'm done" or "task complete" | Wording varies, and Claude can say it about one step while needing another | `stop_reason` |
| Iteration cap as the main stop | Too low cuts valid work, fixed counts waste calls | Cap only as a runaway safety net |
| `content[0].type == "text"` means finished | Claude returns text *and* `tool_use` in one turn | `stop_reason == "end_turn"` |
| Drop or summarise tool results to save tokens | Stateless API, and a missing `tool_result` is an invalid request | Keep every block, shrink big outputs |

Production extras the lesson also asks you to handle: `pause_turn`, `max_tokens`, `stop_sequence`,
`refusal` (it arrives as HTTP 200), `model_context_window_exceeded`. Rule: anything other than
`end_turn` means *not finished, find out why*.

## Safety notes

- `common/tools.py` evaluates arithmetic with `ast`, never `eval()`. Never run `eval()` on text a model produced.
- Tool results can carry attacker-controlled text (web pages, emails). Keep them inside `tool_result` blocks.

## Going further (not required for the exam)

**SDK Tool Runner** (`03_tool_runner.py`): `@beta_tool` builds the JSON Schema from type hints and
the docstring, `runner.until_done()` returns the final message, `max_iterations` is the safety cap,
a raised exception comes back to Claude as `is_error: true`. Use the manual loop when you need
human approval, custom logging or conditional execution.

**Claude Managed Agents** is Anthropic running the loop for you in managed infrastructure
(agent, environment, session, events). It is a beta, aimed at long-running tasks. Read the overview
and quickstart in the official docs. Nothing in this repo needs it.

## Honest status of this code

The mock mode and all 19 tests have been run. The real-API paths (`CCARF_MODE=real`, `03_tool_runner.py`)
follow the official docs but depend on your key and the current SDK. If one breaks, open an issue with the error text.

Next lesson: 1.2 Multi-Agent Orchestration.

> Independent study material. Not affiliated with, endorsed by, or approved by Anthropic.
