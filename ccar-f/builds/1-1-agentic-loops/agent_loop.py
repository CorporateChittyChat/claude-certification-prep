"""Lesson 1.1 core: the manual agentic loop.

Read it top to bottom against the four steps:
  1. send   : full history + system prompt + tool definitions, every time
  2. inspect: stop_reason is the ONLY loop-control signal
  3. tool_use -> run the tools, append the assistant turn, then the tool results
  4. end_turn -> done, return the final text
"""
import logging

from common.tools import TOOLS, run_tool

log = logging.getLogger("agent")

SYSTEM = "You are a careful assistant. Use the tools when you need facts or arithmetic."

# A SAFETY NET for a runaway agent. It is NOT how the loop decides it is finished.
MAX_ITERATIONS = 20


class LoopLimitReached(RuntimeError):
    """The safety cap fired. Treat it as a bug to investigate, not a normal ending."""


class IncompleteResponse(RuntimeError):
    """max_tokens or model_context_window_exceeded: the response was cut off."""


class Refused(RuntimeError):
    """stop_reason == 'refusal'. This arrives as HTTP 200, not as an error."""


def final_text(response) -> str:
    return "".join(b.text for b in response.content if b.type == "text")


def run_tools(response, tools_impl=run_tool):
    """Run EVERY tool_use block in the turn (there can be several) and build the
    tool_result blocks. A failure becomes is_error=true so Claude can recover."""
    results = []
    for block in response.content:
        if block.type != "tool_use":
            continue
        try:
            out = tools_impl(block.name, block.input)
            results.append({"type": "tool_result", "tool_use_id": block.id, "content": str(out)})
        except Exception as exc:  # noqa: BLE001 - a tool failure must not crash the loop
            results.append({
                "type": "tool_result",
                "tool_use_id": block.id,
                "content": f"{type(exc).__name__}: {exc}. Check the input and try again.",
                "is_error": True,
            })
    return results


def run_agent(client, model, prompt, tools=TOOLS, max_iterations=MAX_ITERATIONS, max_tokens=1024):
    messages = [{"role": "user", "content": prompt}]
    for iteration in range(1, max_iterations + 1):
        # 1. SEND: the API is stateless, so the whole history goes every time
        response = client.messages.create(
            model=model, max_tokens=max_tokens, system=SYSTEM, tools=tools, messages=messages
        )
        # the assistant turn goes into history FIRST (tool_use blocks and their ids included)
        messages.append({"role": "assistant", "content": response.content})

        # 2. INSPECT: stop_reason decides everything
        reason = response.stop_reason
        log.info("iteration %d stop_reason=%s", iteration, reason)

        if reason == "end_turn":  # 4. DONE
            return final_text(response), messages

        if reason == "tool_use":  # 3. RUN TOOLS, append results, loop
            messages.append({"role": "user", "content": run_tools(response)})
            continue

        if reason == "pause_turn":  # server-side tool loop paused: send it back unchanged
            continue
        if reason in ("max_tokens", "model_context_window_exceeded"):
            raise IncompleteResponse(f"cut off: stop_reason={reason}")
        if reason == "refusal":
            raise Refused("Claude declined to respond (HTTP 200, not an error)")
        # stop_sequence or anything new: not finished, find out why
        raise RuntimeError(f"unhandled stop_reason: {reason}")

    log.warning("safety cap of %d iterations reached, the agent may be looping", max_iterations)
    raise LoopLimitReached(f"no end_turn after {max_iterations} iterations")
