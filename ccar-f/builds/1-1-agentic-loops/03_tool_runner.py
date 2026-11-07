"""The SDK Tool Runner: the same loop, written for you.

REAL MODE ONLY (it needs the SDK's beta runner and a real API response).
Use the manual loop when you need human approval, custom logging or conditional execution.

    CCARF_MODE=real python 03_tool_runner.py
"""
import sys

from common import client as cl


def main():
    cl.load_env()
    if cl.mode() != "real":
        sys.exit("03_tool_runner.py needs CCARF_MODE=real (it calls the paid API). Mock mode covers 01, 02, 05 and the anti_patterns folder.")
    import anthropic
    from anthropic import beta_tool

    @beta_tool
    def calculator(expression: str) -> str:
        """Evaluate a basic arithmetic expression such as '3 * 4.5 + 2'.

        Args:
            expression: Arithmetic expression using numbers and + - * / only
        """
        from common.tools import calculator as calc
        return calc(expression)

    @beta_tool
    def web_search(query: str) -> str:
        """Look up a fact in a tiny MOCK table (notebook price, pen price).

        Args:
            query: What to look up, e.g. 'notebook price'
        """
        from common.tools import web_search as ws
        return ws(query)

    client = anthropic.Anthropic()
    runner = client.beta.messages.tool_runner(
        model=cl.model_name(),
        max_tokens=1024,
        tools=[calculator, web_search],
        max_iterations=20,  # a runaway safeguard, not the stopping logic
        messages=[{"role": "user", "content": "What do 3 notebooks and 1 pen cost in total? Look up the prices first."}],
    )
    final = runner.until_done()  # cycles until end_turn, returns the last message
    print("stop_reason:", final.stop_reason)
    print("".join(b.text for b in final.content if b.type == "text"))


if __name__ == "__main__":
    main()
