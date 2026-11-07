import os
import sys

import pytest

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from agent_loop import IncompleteResponse, LoopLimitReached, Refused, run_agent  # noqa: E402
from anti_patterns import a_parse_text, b_iteration_cap, c_first_block_text, d_drop_history  # noqa: E402
from common import scenarios  # noqa: E402
from common.fake_client import FakeBadRequest, FakeClient, response, text, tool_use  # noqa: E402
from common.tools import calculator, run_tool, web_search  # noqa: E402

P = scenarios.BASKET_PROMPT


def test_tools():
    assert calculator("3 * 4.5 + 2") == "15.5"
    assert "4.50" in web_search("notebook price")
    with pytest.raises(ValueError):
        calculator("__import__('os').system('echo hi')")
    with pytest.raises(KeyError):
        run_tool("nope", {})


def test_multi_step_loop_finishes_on_end_turn():
    client = FakeClient(scenarios.basket())
    answer, messages = run_agent(client, "m", P)
    assert "15.50" in answer and client.calls == 4
    assert [m["role"] for m in messages] == ["user", "assistant", "user", "assistant", "user", "assistant", "user", "assistant"]


def test_every_request_carries_full_history():
    client = FakeClient(scenarios.basket())
    run_agent(client, "m", P)
    assert [len(r["messages"]) for r in client.messages.requests] == [1, 3, 5, 7]


def test_one_step_task_makes_one_call():
    client = FakeClient(scenarios.one_step())
    run_agent(client, "m", "hi")
    assert client.calls == 1


def test_parallel_results_in_one_message():
    answer, messages = run_agent(FakeClient(scenarios.parallel_calls()), "m", "x")
    assert len(messages[2]["content"]) == 2 and "4.50" in answer


def test_tool_error_becomes_is_error_and_loop_recovers():
    answer, messages = run_agent(FakeClient(scenarios.failing_tool()), "m", "x")
    first_result = messages[2]["content"][0]
    assert first_result["is_error"] is True and "SyntaxError" in first_result["content"]
    assert "12" in answer


def test_safety_cap_raises_instead_of_looping_forever():
    endless = [response("tool_use", tool_use(f"toolu_{i}", "web_search", query="pen price")) for i in range(30)]
    with pytest.raises(LoopLimitReached):
        run_agent(FakeClient(endless), "m", "x", max_iterations=5)


@pytest.mark.parametrize("reason,exc", [("max_tokens", IncompleteResponse), ("model_context_window_exceeded", IncompleteResponse), ("refusal", Refused)])
def test_non_end_turn_reasons_are_not_treated_as_done(reason, exc):
    with pytest.raises(exc):
        run_agent(FakeClient([response(reason, text("partial"))]), "m", "x")


def test_pause_turn_resends_assistant_content_and_continues():
    script = [response("pause_turn", text("working...")), response("end_turn", text("finished"))]
    client = FakeClient(script)
    answer, _ = run_agent(client, "m", "x")
    assert answer == "finished" and client.messages.requests[1]["messages"][-1]["role"] == "assistant"


def test_unknown_stop_reason_is_not_finished():
    with pytest.raises(RuntimeError):
        run_agent(FakeClient([response("brand_new_value", text("?"))]), "m", "x")


# ---- the fake enforces the documented rules ----
def test_fake_rejects_missing_tool_result():
    c = FakeClient(scenarios.basket())
    r = c.messages.create(model="m", messages=[{"role": "user", "content": "x"}])
    with pytest.raises(FakeBadRequest):
        c.messages.create(model="m", messages=[{"role": "user", "content": "x"}, {"role": "assistant", "content": r.content}, {"role": "user", "content": "go on"}])


def test_fake_rejects_text_before_tool_result():
    c = FakeClient(scenarios.basket())
    r = c.messages.create(model="m", messages=[{"role": "user", "content": "x"}])
    bad = [{"type": "text", "text": "hi"}, {"type": "tool_result", "tool_use_id": "toolu_01", "content": "ok"}]
    with pytest.raises(FakeBadRequest):
        c.messages.create(model="m", messages=[{"role": "user", "content": "x"}, {"role": "assistant", "content": r.content}, {"role": "user", "content": bad}])


def test_fake_rejects_orphan_tool_result():
    c = FakeClient(scenarios.basket())
    orphan = [{"type": "tool_result", "tool_use_id": "toolu_01", "content": "ok"}]
    with pytest.raises(FakeBadRequest):
        c.messages.create(model="m", messages=[{"role": "user", "content": "x"}, {"role": "user", "content": orphan}])


# ---- each anti-pattern really is a bug, and the fix is stop_reason ----
def test_anti_pattern_parse_text_exits_early():
    bad = a_parse_text.buggy_agent(FakeClient(scenarios.finished_a_file_but_not_the_task()), "m", P)
    good, _ = run_agent(FakeClient(scenarios.finished_a_file_but_not_the_task()), "m", P)
    assert "Task complete" in bad and "Notebook 4.50, pen 2.00." == good


def test_anti_pattern_iteration_cap_truncates_and_wastes():
    assert b_iteration_cap.buggy_agent(FakeClient(scenarios.basket()), "m", P, turns=2) == ""
    with pytest.raises(Exception):
        b_iteration_cap.buggy_agent(FakeClient(scenarios.one_step()), "m", "hi", turns=5)


def test_anti_pattern_first_block_text_exits_before_the_tool_runs():
    assert c_first_block_text.buggy_agent(FakeClient(scenarios.basket()), "m", P) == "Let me look up the prices."


def test_anti_pattern_dropping_results_is_rejected():
    with pytest.raises(FakeBadRequest):
        d_drop_history.buggy_agent(FakeClient(scenarios.basket()), "m", P)
    assert d_drop_history.shrink("x" * 50, limit=10).endswith("[truncated 40 characters]")
