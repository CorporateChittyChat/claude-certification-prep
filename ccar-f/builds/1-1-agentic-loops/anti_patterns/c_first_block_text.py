"""ANTI-PATTERN 3: 'the first block is text, so it must be the final answer'.

Claude often returns a sentence AND a tool_use block in the same turn. Checking
content[0].type exits before the tool ever runs. The fix: stop_reason.
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from agent_loop import final_text, run_agent, run_tools
from common import scenarios
from common.fake_client import FakeClient
from common.tools import TOOLS


def buggy_agent(client, model, prompt):
    messages = [{"role": "user", "content": prompt}]
    while True:
        response = client.messages.create(model=model, max_tokens=1024, tools=TOOLS, messages=messages)
        messages.append({"role": "assistant", "content": response.content})
        if response.content[0].type == "text":  # BUG: text present is not the same as finished
            return final_text(response)
        messages.append({"role": "user", "content": run_tools(response)})


if __name__ == "__main__":
    bad = buggy_agent(FakeClient(scenarios.basket()), "m", scenarios.BASKET_PROMPT)
    good, _ = run_agent(FakeClient(scenarios.basket()), "m", scenarios.BASKET_PROMPT)
    print("BUGGY (exits on text) :", bad)
    print("FIXED (stop_reason)   :", good)
