"""ANTI-PATTERN 1: decide 'finished' by reading Claude's words.

Why it fails: wording varies, and Claude can say 'done' about one step while it still
needs another tool. The fix: stop_reason, never the sentence.
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
        said = final_text(response).lower()
        if "done" in said or "complete" in said or "finished" in said:  # BUG: parsing natural language
            return final_text(response)
        if response.stop_reason == "tool_use":
            messages.append({"role": "user", "content": run_tools(response)})
        else:
            return final_text(response)


if __name__ == "__main__":
    prompt = scenarios.BASKET_PROMPT
    bad = buggy_agent(FakeClient(scenarios.finished_a_file_but_not_the_task()), "m", prompt)
    good, _ = run_agent(FakeClient(scenarios.finished_a_file_but_not_the_task()), "m", prompt)
    print("BUGGY  :", bad)
    print("FIXED  :", good)
