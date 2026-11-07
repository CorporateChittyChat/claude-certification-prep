"""Two things the loop must get right: parallel tool calls and tool errors."""
import logging

from agent_loop import run_agent, run_tools
from common import scenarios
from common.fake_client import FakeBadRequest, FakeClient

logging.basicConfig(level=logging.INFO, format="  %(message)s")


def parallel_demo():
    print("== PARALLEL: two tool_use blocks in one turn ==")
    answer, messages = run_agent(FakeClient(scenarios.parallel_calls()), "m", "Prices of a notebook and a pen?")
    results = messages[2]["content"]
    print(f"both results returned in ONE user message ({len(results)} tool_result blocks) -> {answer}")

    # the bug: answering each tool_use in its own message
    client = FakeClient(scenarios.parallel_calls())
    first = client.messages.create(model="m", messages=[{"role": "user", "content": "Prices?"}])
    both = run_tools(first)
    bad = [
        {"role": "user", "content": "Prices?"},
        {"role": "assistant", "content": first.content},
        {"role": "user", "content": [both[0]]},
        {"role": "user", "content": [both[1]]},
    ]
    try:
        client.messages.create(model="m", messages=bad)
    except FakeBadRequest as exc:
        print("results split across messages ->", exc)


def error_demo():
    print("\n== ERROR: the tool raises, Claude gets is_error=true and recovers ==")
    answer, messages = run_agent(FakeClient(scenarios.failing_tool()), "m", "What is three times four?")
    block = messages[2]["content"][0]
    print("tool_result sent back:", {k: block[k] for k in ("is_error", "content")})
    print("final answer:", answer)


if __name__ == "__main__":
    parallel_demo()
    error_demo()
