import json
from typing import Any
import os

import requests

OLLAMA_URL = os.getenv("OLLAMA_URL", "http://localhost:11434/api/generate")
MODEL_NAME = os.getenv("MODEL_NAME", "deepseek-r1:1.5b")


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
You are an AI assistant for a Team Manager analyzing employee calendar data.

Your job is to analyze only events that are relevant to team management, such as:
- team meetings
- project discussions
- client meetings
- planning sessions
- review meetings
- 1-on-1 meetings
- workload or coordination meetings

Ignore or deprioritize events that are not useful for team management, such as:
- personal reminders
- holidays
- birthdays
- cancelled events
- vague events with no business/team relevance

Calendar Events:
{json.dumps(events, indent=2)}

Calendar Metrics:
{json.dumps(metrics, indent=2)}

Generate the answer using this structure:

1. Team Calendar Summary
Briefly summarize the team's meeting load, total meeting hours, busiest day, and most involved staff.

2. Important Schedule Patterns
Highlight specific patterns, such as overloaded days, repeated meetings, long meetings, uneven meeting distribution, or staff with high meeting load.

3. Schedule Problems Detected
List specific problems found in the calendar. Do not give generic problems. Only mention problems supported by the data.

4. Recommended Improvements
Give practical actions a Team Manager can take to improve the schedule, such as moving meetings, reducing meeting duration, protecting focus time, or balancing workload across staff.

5. Management Priority
End with the top 1 or 2 issues the manager should focus on first.

Keep the answer clear, specific, concise, and business-focused.
Do not invent data that is not available.
"""

    return ask_ai(prompt)

def ask_calendar_deep_dive(
    message: str,
    events: list[dict[str, Any]],
    metrics: dict[str, Any]
) -> str:
    prompt = f"""
You are an AI assistant for a Team Manager.

Use only the provided calendar events and metrics to answer the manager's question.

Before answering:
- Focus only on team-management-related events.
- Ignore personal, cancelled, holiday, birthday, or irrelevant events.
- If the question asks for free time, workload, overload, meeting balance, staff involvement, or scheduling improvement, answer using the provided event times and metrics.
- If the available data is not enough, clearly explain what is missing.

Calendar Events:
{json.dumps(events, indent=2)}

Calendar Metrics:
{json.dumps(metrics, indent=2)}

Manager Question:
{message}

Respond in markdown using this structure:

### Direct Answer
Answer the manager's message clearly.

### Evidence From Calendar Data
Use specific details from the events or metrics.

### Recommended Action
Suggest what the manager should do next.

Keep the answer specific, practical, and concise.
Do not use tables, code blocks, or nested lists.
If the data is not enough, clearly explain what is missing.
"""

    return ask_ai(prompt)
