from typing import Any
from ics import Calendar


def parse_calendar_file(content: str) -> list[dict[str, Any]]:
    calendar = Calendar(content)

    events = []

    for event in calendar.events:
        events.append({
            "summary": event.name,
            "start_time": event.begin.isoformat() if event.begin else None,
            "end_time": event.end.isoformat() if event.end else None,
            "location": event.location,
            "description": event.description,
            "duration_minutes": int(event.duration.total_seconds() / 60) if event.duration else None
        })

    return events