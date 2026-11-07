"""Scripted conversations used by the lessons and the tests.

Scenario 'basket' is the lesson's multi-step prompt: search, then calculate.
Note the FIRST response: Claude says something AND asks for a tool in the same
turn. That one detail is behind two of the exam traps.
"""
from common.fake_client import response, text, tool_use

BASKET_PROMPT = "What do 3 notebooks and 1 pen cost in total? Look up the prices first."


def basket():
    return [
        response("tool_use", text("Let me look up the prices."), tool_use("toolu_01", "web_search", query="notebook price")),
        response("tool_use", tool_use("toolu_02", "web_search", query="pen price")),
        response("tool_use", text("Now I'll add it up."), tool_use("toolu_03", "calculator", expression="3 * 4.5 + 2")),
        response("end_turn", text("3 notebooks and 1 pen cost 15.50 in total.")),
    ]


def finished_a_file_but_not_the_task():
    """Claude says 'I'm done' in words, yet still wants a tool (anti-pattern: parsing text)."""
    return [
        response("tool_use", text("I've finished checking the notebook price. Task complete for that item."),
                 tool_use("toolu_01", "web_search", query="notebook price")),
        response("tool_use", tool_use("toolu_02", "web_search", query="pen price")),
        response("end_turn", text("Notebook 4.50, pen 2.00.")),
    ]


def one_step():
    return [response("end_turn", text("Hello! How can I help?"))]


def parallel_calls():
    """Two tool_use blocks in ONE assistant turn (parallel tool calls)."""
    return [
        response("tool_use", tool_use("toolu_A", "web_search", query="notebook price"),
                 tool_use("toolu_B", "web_search", query="pen price")),
        response("end_turn", text("Notebook 4.50 and pen 2.00.")),
    ]


def failing_tool():
    """The tool raises, the loop reports is_error, Claude recovers with a corrected call."""
    return [
        response("tool_use", tool_use("toolu_01", "calculator", expression="three times four")),
        response("tool_use", tool_use("toolu_02", "calculator", expression="3 * 4")),
        response("end_turn", text("3 times 4 is 12.")),
    ]
