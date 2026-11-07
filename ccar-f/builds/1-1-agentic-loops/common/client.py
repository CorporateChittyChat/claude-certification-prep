"""Pick the client: mock (free, default) or real (calls the paid API)."""
import os
import sys

from common import scenarios
from common.fake_client import FakeClient

# Haiku only for this course (smallest, cheapest family). Check the exact id on the Models page in the
# Console before you run real mode, ids change over time. Override with CCARF_MODEL.
DEFAULT_MODEL = "claude-haiku-5-5"


def mode() -> str:
    return os.environ.get("CCARF_MODE", "mock").lower()


def model_name() -> str:
    return os.environ.get("CCARF_MODEL", DEFAULT_MODEL)


def get_client(mock_script=None):
    """Return (client, is_real). In mock mode pass the scripted responses to replay."""
    if mode() == "real":
        key = os.environ.get("ANTHROPIC_API_KEY", "")
        if not key:
            sys.exit("CCARF_MODE=real needs ANTHROPIC_API_KEY in your .env. See README step 3.")
        import anthropic

        print(f"[REAL MODE] calls the paid API with model '{model_name()}'. Prompts are tiny, but it is not free.")
        return anthropic.Anthropic(), True
    return FakeClient(mock_script if mock_script is not None else scenarios.basket()), False


def load_env():
    """Read .env without extra dependencies (KEY=value lines)."""
    path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), ".env")
    if not os.path.exists(path):
        return
    with open(path, encoding="utf-8") as fh:
        for line in fh:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, v = line.split("=", 1)
                os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))
