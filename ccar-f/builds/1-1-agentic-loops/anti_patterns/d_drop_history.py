"""ANTI-PATTERN 4: drop or summarise tool results to save tokens.

The API is stateless. If the tool_result is missing, the request is invalid. If you
replace the evidence with your own summary, Claude reasons from your guess, not the data.
The fix: keep every block, and SHRINK a large result instead of omitting it.
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from agent_loop import run_agent
from common import scenarios
from common.fake_client import FakeBadRequest, FakeClient
from common.tools import TOOLS


def shrink(text: str, limit: int = 2000) -> str:
    """Keep the head, say what was cut. Smaller, never missing."""
    if len(text) <= limit:
        return text
    return text[:limit] + f"\n[truncated {len(text) - limit} characters]"


def buggy_agent(client, model, prompt):
    messages = [{"role": "user", "content": prompt}]
    while True:
        response = client.messages.create(model=model, max_tokens=1024, tools=TOOLS, messages=messages)
        messages.append({"role": "assistant", "content": response.content})
        if response.stop_reason != "tool_use":
            return response
        # BUG: 'save tokens' by not sending the tool results back
        messages.append({"role": "user", "content": "keep going"})


if __name__ == "__main__":
    try:
        buggy_agent(FakeClient(scenarios.basket()), "m", scenarios.BASKET_PROMPT)
    except FakeBadRequest as exc:
        print("BUGGY ->", exc)
    good, _ = run_agent(FakeClient(scenarios.basket()), "m", scenarios.BASKET_PROMPT)
    print("FIXED ->", good)
    print("shrink demo ->", shrink("x" * 50, limit=10))
