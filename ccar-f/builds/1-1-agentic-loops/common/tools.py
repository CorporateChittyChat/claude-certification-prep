"""The two exercise tools: a calculator and a MOCK web search.

Both are plain Python functions. Claude never runs them. It only asks for them,
and your loop runs them. The JSON Schemas below are what Claude actually sees.
"""
import ast
import operator

# ---- tool definitions (name, description, input_schema) -------------------
TOOLS = [
    {
        "name": "calculator",
        "description": (
            "Evaluate a basic arithmetic expression such as '3 * 4.5 + 2'. "
            "Supports + - * / and parentheses. Use it for any arithmetic."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "expression": {
                    "type": "string",
                    "description": "Arithmetic expression, e.g. '3 * 4.5 + 2'",
                }
            },
            "required": ["expression"],
        },
    },
    {
        "name": "web_search",
        "description": (
            "Look up a fact. This is a MOCK search backed by a tiny local table, "
            "so only a few topics exist. Use it to find a price or a count."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "query": {
                    "type": "string",
                    "description": "What to look up, e.g. 'notebook price'",
                }
            },
            "required": ["query"],
        },
    },
]

# ---- tool implementations --------------------------------------------------
_OPS = {
    ast.Add: operator.add,
    ast.Sub: operator.sub,
    ast.Mult: operator.mul,
    ast.Div: operator.truediv,
    ast.USub: operator.neg,
}


def _eval(node):
    if isinstance(node, ast.Expression):
        return _eval(node.body)
    if isinstance(node, ast.Constant) and isinstance(node.value, (int, float)):
        return node.value
    if isinstance(node, ast.BinOp) and type(node.op) in _OPS:
        return _OPS[type(node.op)](_eval(node.left), _eval(node.right))
    if isinstance(node, ast.UnaryOp) and type(node.op) in _OPS:
        return _OPS[type(node.op)](_eval(node.operand))
    raise ValueError("unsupported expression (only numbers and + - * / are allowed)")


def calculator(expression: str) -> str:
    """Safe arithmetic. Never use eval() on text that came from a model."""
    value = _eval(ast.parse(expression, mode="eval"))
    return str(value)


_MOCK_WEB = {
    "notebook price": "A notebook costs 4.50 in the Mockville store (mock data).",
    "pen price": "A pen costs 2.00 in the Mockville store (mock data).",
}


def web_search(query: str) -> str:
    q = query.lower()
    for key, answer in _MOCK_WEB.items():
        if key in q:
            return answer
    return f"No mock result for '{query}'. Known topics: {', '.join(_MOCK_WEB)}."


REGISTRY = {"calculator": calculator, "web_search": web_search}


def run_tool(name: str, tool_input: dict) -> str:
    """Dispatch by name. Raises on an unknown tool or bad input, and the loop
    turns that exception into a tool_result with is_error=true."""
    if name not in REGISTRY:
        raise KeyError(f"unknown tool '{name}'")
    return REGISTRY[name](**tool_input)
