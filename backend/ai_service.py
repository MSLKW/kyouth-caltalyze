import json
from typing import Any

import requests

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "deepseek-r1:1.5b"


def ask_ai(prompt: str) -> str:
    payload = {
        "model": MODEL_NAME,
        "prompt": prompt,
        "stream": False
    }

    response = requests.post(OLLAMA_URL, json=payload)
    response.raise_for_status()

    data = response.json()
    return data.get("response", "")


def generate_calendar_insight(events: list[dict[str, Any]], metrics: dict[str, Any]) -> str:
    prompt = f"""
You are an AI assistant for a calendar analyzer system.

Analyze the following calendar events and metrics.

Events:
{json.dumps(events, indent=2)}

Metrics:
{json.dumps(metrics, indent=2)}

Generate:
1. A short overall summary
2. Key meeting pattern insights
3. Practical recommendations

Keep the answer clear, concise, and business-focused.
"""

    return ask_ai(prompt)