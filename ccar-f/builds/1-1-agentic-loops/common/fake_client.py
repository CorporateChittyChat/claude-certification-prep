"""A scripted stand-in for client.messages.create, so you can run every lesson
file with NO API key and NO cost.

It does two jobs:
  1. It replays a script of responses (so the lesson is repeatable).
  2. It CHECKS every request against the documented message rules and raises
     FakeBadRequest where the real API would answer with an HTTP 400.

The real API is always the authority. This fake mirrors the rules the docs state:
  - the first message is a user message
  - an assistant turn containing tool_use blocks must be followed IMMEDIATELY by a
    user message holding a tool_result for EVERY tool_use id
  - tool_result blocks come first in that user message, text only after them
"""
from types import SimpleNamespace as NS


class FakeBadRequest(Exception):
    """Where the real API would return HTTP 400 invalid_request_error."""


class ScriptExhausted(Exception):
    """The loop asked for more responses than the script holds."""


# ---- tiny builders for scripted responses ---------------------------------
def text(t):
    return NS(type="text", text=t)


def tool_use(id_, name, **tool_input):
    return NS(type="tool_use", id=id_, name=name, input=tool_input)


def response(stop_reason, *blocks, input_tokens=100, output_tokens=40):
    return NS(
        stop_reason=stop_reason,
        content=list(blocks),
        role="assistant",
        usage=NS(input_tokens=input_tokens, output_tokens=output_tokens),
    )


# ---- helpers that work for dict blocks and object blocks -------------------
def _get(block, key, default=None):
    if isinstance(block, dict):
        return block.get(key, default)
    return getattr(block, key, default)


def _blocks(content):
    return [] if isinstance(content, str) else list(content)


def validate_messages(messages):
    if not messages or messages[0]["role"] != "user":
        raise FakeBadRequest("the first message must have the user role")
    for i, msg in enumerate(messages):
        if msg["role"] != "assistant":
            continue
        ids = [_get(b, "id") for b in _blocks(msg["content"]) if _get(b, "type") == "tool_use"]
        if not ids:
            continue
        nxt = messages[i + 1] if i + 1 < len(messages) else None
        if nxt is None or nxt["role"] != "user":
            raise FakeBadRequest(
                "tool_use ids were found without tool_result blocks immediately after: "
                + ", ".join(ids)
            )
        blocks = _blocks(nxt["content"])
        seen_text = False
        answered = set()
        for b in blocks:
            if _get(b, "type") == "tool_result":
                if seen_text:
                    raise FakeBadRequest("tool_result blocks must come first, text goes after them")
                answered.add(_get(b, "tool_use_id"))
            else:
                seen_text = True
        missing = [x for x in ids if x not in answered]
        if missing:
            raise FakeBadRequest(
                "tool_use ids were found without tool_result blocks immediately after: "
                + ", ".join(missing)
            )
        extra = answered - set(ids)
        if extra:
            raise FakeBadRequest("tool_result refers to unknown tool_use id: " + ", ".join(extra))
    # a tool_result with no matching tool_use in the PREVIOUS assistant message is orphaned
    for i, msg in enumerate(messages):
        if msg["role"] != "user":
            continue
        result_ids = [_get(b, "tool_use_id") for b in _blocks(msg["content"]) if _get(b, "type") == "tool_result"]
        if not result_ids:
            continue
        prev = messages[i - 1] if i > 0 else None
        prev_ids = set()
        if prev is not None and prev["role"] == "assistant":
            prev_ids = {_get(b, "id") for b in _blocks(prev["content"]) if _get(b, "type") == "tool_use"}
        orphans = [x for x in result_ids if x not in prev_ids]
        if orphans:
            raise FakeBadRequest(
                "tool_result blocks have no matching tool_use in the previous assistant message: " + ", ".join(orphans)
            )


class _Messages:
    def __init__(self, script):
        self._script = list(script)
        self.requests = []  # every request the loop made, for tests and for you

    def create(self, **kwargs):
        validate_messages(kwargs["messages"])
        self.requests.append({**kwargs, "messages": list(kwargs["messages"])})  # snapshot, the loop keeps appending
        if not self._script:
            raise ScriptExhausted(
                f"the loop made request number {len(self.requests)} but the script has no more responses"
            )
        return self._script.pop(0)


class FakeClient:
    """Use exactly like anthropic.Anthropic() for client.messages.create(...)."""

    def __init__(self, script):
        self.messages = _Messages(script)

    @property
    def calls(self):
        return len(self.messages.requests)
