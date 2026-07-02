from datetime import datetime
from collections import Counter, defaultdict
from typing import Any


def calculate_metrics(events: list[dict[str, Any]]) -> dict[str, Any]:
    total_events = len(events)
    total_meeting_minutes = 0
    meeting_durations = []
    meetings_by_day = Counter()
    meeting_minutes_by_day = defaultdict(int)
    meeting_count_by_staff = Counter()
    meeting_minutes_by_staff = defaultdict(int)

    for event in events:
        start_time = event.get("start_time")
        end_time = event.get("end_time")
        attendees = event.get("attendees", [])

        if not start_time or not end_time:
            continue

        try:
            start = datetime.fromisoformat(start_time)
            end = datetime.fromisoformat(end_time)
        except ValueError:
            continue

        duration_minutes = int((end - start).total_seconds() / 60)

        if duration_minutes <= 0:
            continue

        total_meeting_minutes += duration_minutes
        meeting_durations.append(duration_minutes)

        day_name = start.strftime("%A")
        meetings_by_day[day_name] += 1
        meeting_minutes_by_day[day_name] += duration_minutes

        for attendee in attendees:
            if not attendee:
                continue

            meeting_count_by_staff[attendee] += 1
            meeting_minutes_by_staff[attendee] += duration_minutes


    shortest_meeting = min(meeting_durations) if meeting_durations else 0
    longest_meeting = max(meeting_durations) if meeting_durations else 0
    average_meeting = (
        round(sum(meeting_durations) / len(meeting_durations), 2)
        if meeting_durations
        else 0
    )
    meeting_hours_by_day = {
        day: round(minutes / 60, 2)
        for day, minutes in meeting_minutes_by_day.items()
    }

    meeting_hours_by_staff = {
        staff: round(minutes / 60, 2)
        for staff, minutes in meeting_minutes_by_staff.items()
    }

    busiest_day = meetings_by_day.most_common(1)[0][0] if meetings_by_day else None

    highest_meeting_load_staff = None
    if meeting_minutes_by_staff:
        highest_meeting_load_staff = max(
            meeting_minutes_by_staff,
            key=meeting_minutes_by_staff.get
        )

    return {
        "total_events": total_events,
        "total_meeting_minutes": total_meeting_minutes,
        "total_meeting_hours": round(total_meeting_minutes / 60, 2),

        "shortest_meeting_minutes": shortest_meeting,
        "average_meeting_minutes": average_meeting,
        "longest_meeting_minutes": longest_meeting,

        "meetings_by_day": dict(meetings_by_day),
        "meeting_minutes_by_day": dict(meeting_minutes_by_day),
        "meeting_hours_by_day": meeting_hours_by_day,
        "busiest_day": busiest_day,

        "meeting_count_by_staff": dict(meeting_count_by_staff),
        "meeting_minutes_by_staff": dict(meeting_minutes_by_staff),
        "meeting_hours_by_staff": meeting_hours_by_staff,
        "highest_meeting_load_staff": highest_meeting_load_staff
    }