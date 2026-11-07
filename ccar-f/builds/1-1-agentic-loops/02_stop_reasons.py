"""Every stop_reason value and what a production loop does with it."""

# value -> (finished?, what to do). Mirrors the official 'handling stop reasons' guidance.
HANDLING = {
    "end_turn": (True, "Done. Use the response."),
    "tool_use": (False, "Run every tool_use block, append assistant turn then tool_result turn, call again."),
    "pause_turn": (False, "A server-tool loop paused. Append the assistant content unchanged and call again."),
    "max_tokens": (False, "Cut off. Raise max_tokens or continue the response. A cut-off tool_use needs a retry."),
    "stop_sequence": (False, "One of YOUR stop sequences fired. Read response.stop_sequence to see which."),
    "refusal": (False, "Claude declined. This is HTTP 200, not an error. Read stop_details, then retry on a fallback."),
    "model_context_window_exceeded": (False, "The response filled the context window. Treat it as truncated."),
}


def decide(stop_reason: str) -> str:
    finished, action = HANDLING.get(stop_reason, (False, "Unknown value. Not finished: log it and find out why."))
    return ("FINISHED  " if finished else "NOT DONE  ") + action


if __name__ == "__main__":
    print("The rule: anything other than end_turn means 'not finished, check why'.\n")
    for reason in [*HANDLING, "some_future_value"]:
        print(f"{reason:32s} {decide(reason)}")
