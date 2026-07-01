from datetime import datetime
from collections import Counter
from typing import Any


def calculate_metrics(events: list[dict[str, Any]]) -> dict[str, Any]:
    total_events = len(events)
    total_meeting_minutes = 0
    meeting_durations = []
    meetings_by_day = Counter()

    for event in events:
        start_time = event.get("start_time")
        end_time = event.get("end_time")

        if not start_time or not end_time:
            continue

        try:
            start = datetime.fromisoformat(start_time)
            end = datetime.fromisoformat(end_time)

            duration_minutes = int((end - start).total_seconds() / 60)

            if duration_minutes > 0:
                total_meeting_minutes += duration_minutes
                meeting_durations.append(duration_minutes)
                meetings_by_day[start.strftime("%A")] += 1

        except ValueError:
            continue

    if meeting_durations:
        shortest_meeting = min(meeting_durations)
        longest_meeting = max(meeting_durations)
        average_meeting = round(sum(meeting_durations) / len(meeting_durations), 2)
    else:
        shortest_meeting = 0
        longest_meeting = 0
        average_meeting = 0

    busiest_day = meetings_by_day.most_common(1)[0][0] if meetings_by_day else None

    return {
        "total_events": total_events,
        "total_meeting_minutes": total_meeting_minutes,
        "total_meeting_hours": round(total_meeting_minutes / 60, 2),
        "shortest_meeting_minutes": shortest_meeting,
        "average_meeting_minutes": average_meeting,
        "longest_meeting_minutes": longest_meeting,
        "meetings_by_day": dict(meetings_by_day),
        "busiest_day": busiest_day
    }