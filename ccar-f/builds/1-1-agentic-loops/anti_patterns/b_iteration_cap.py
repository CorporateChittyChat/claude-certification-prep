"""ANTI-PATTERN 2: an iteration cap as the PRIMARY stop.

Too low: it cuts valid multi-step work off. Fixed count: it makes calls after the
work is already finished. A cap belongs in the loop only as a runaway safety net.
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from agent_loop import final_text, run_agent, run_tools
from common import scenarios
from common.fake_client import FakeClient, ScriptExhausted
from common.tools import TOOLS


def buggy_agent(client, model, prompt, turns):
    messages = [{"role": "user", "content": prompt}]
    last = None
    for _ in range(turns):  # BUG: the cap is the stopping logic
        last = client.messages.create(model=model, max_tokens=1024, tools=TOOLS, messages=messages)
        messages.append({"role": "assistant", "content": last.content})
        if last.stop_reason == "tool_use":
            messages.append({"role": "user", "content": run_tools(last)})
    return final_text(last)


if __name__ == "__main__":
    # 1) cap too low: the task needs 4 calls, the cap allows 2
    out = buggy_agent(FakeClient(scenarios.basket()), "m", scenarios.BASKET_PROMPT, turns=2)
    print("cap=2 on a 4-step task  ->", repr(out), "(cut off, no answer)")

    # 2) cap too high on a one-step task: it keeps calling after end_turn
    client = FakeClient(scenarios.one_step())
    try:
        buggy_agent(client, "m", "Say hello", turns=5)
    except ScriptExhausted:
        print(f"cap=5 on a 1-step task  -> 1 useful call, then {client.calls - 1} wasted call(s) after end_turn")

    # the fix: stop_reason decides, the cap (20) only guards against a runaway
    good, _ = run_agent(FakeClient(scenarios.basket()), "m", scenarios.BASKET_PROMPT)
    print("FIXED                   ->", good)
