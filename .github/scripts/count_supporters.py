"""Count paid "Buy me a coffee" checkouts and write supporters.json (the number only).

Runs in GitHub Actions with a restricted, read-only Stripe key in STRIPE_KEY
(permissions: Checkout Sessions = Read, Payment Links = Read). Standard library only.
Nothing about supporters is written except the total count; the key is never printed.
"""
import json, os, sys, urllib.error, urllib.parse, urllib.request
from datetime import datetime, timezone

LINK_URL = "https://buy.stripe.com/5kQ8wSeembHnakwaXGgrS01"
OUT = os.path.join(os.path.dirname(__file__), "..", "..", "supporters.json")
API = "https://api.stripe.com/v1/"


def get(path, key, params):
    url = API + path + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"Authorization": "Bearer " + key})
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return json.load(r)
    except urllib.error.HTTPError as e:
        try:
            msg = json.load(e).get("error", {}).get("message", "")
        except Exception:
            msg = ""
        sys.exit(f"Stripe API error {e.code} on {path}: {msg}")


def paged(path, key, params):
    params = dict(params, limit=100)
    while True:
        page = get(path, key, params)
        yield from page.get("data", [])
        if not page.get("has_more"):
            return
        params["starting_after"] = page["data"][-1]["id"]


def find_link_id(key):
    override = os.environ.get("STRIPE_PAYMENT_LINK_ID", "").strip()
    if override:
        return override
    for link in paged("payment_links", key, {}):
        if link.get("url") == LINK_URL:
            return link["id"]
    sys.exit("Could not find the coffee payment link in this Stripe account.")


def count_paid(key, link_id):
    return sum(1 for s in paged("checkout/sessions", key, {"payment_link": link_id, "status": "complete"})
               if s.get("payment_status") == "paid")


def main():
    key = os.environ.get("STRIPE_KEY", "").strip()
    if not key:
        print("STRIPE_KEY is not set; leaving supporters.json unchanged.")
        return
    if key.startswith("sk_"):
        sys.exit("Refusing a full secret key: use a restricted, read-only key (rk_...).")
    count = count_paid(key, find_link_id(key))
    try:
        with open(OUT, encoding="utf-8") as f:
            if json.load(f).get("count") == count:
                print(f"Count unchanged ({count}).")
                return
    except (OSError, ValueError):
        pass
    with open(OUT, "w", encoding="utf-8", newline="\n") as f:
        json.dump({"count": count, "updated": datetime.now(timezone.utc).strftime("%Y-%m-%d")}, f)
        f.write("\n")
    print(f"Updated count: {count}.")


if __name__ == "__main__":
    main()
