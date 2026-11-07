"""Exercise 1 (about 45 minutes in the lesson): build the loop by hand.

Free by default (mock mode). To call the real API see README step 5.
    python 01_manual_loop.py
"""
import logging

from agent_loop import run_agent
from common import client as cl, scenarios

logging.basicConfig(level=logging.INFO, format="  %(message)s")


def main():
    cl.load_env()
    client, is_real = cl.get_client(scenarios.basket())
    print("PROMPT:", scenarios.BASKET_PROMPT)
    answer, messages = run_agent(client, cl.model_name(), scenarios.BASKET_PROMPT)
    print("\nANSWER:", answer)
    print(f"\nrequests sent: {client.calls if not is_real else 'see your Console usage page'}")
    print("history length:", len(messages), "messages (user, assistant, user, assistant, ...)")


if __name__ == "__main__":
    main()
