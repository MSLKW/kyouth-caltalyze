const sampleData = {
	filename: "test_calendar.ics",
	event_count: 3,
	events: [
		{
			summary: "Project Planning Session",
			start_time: "2026-07-07T14:00:00+00:00",
			end_time: "2026-07-07T15:30:00+00:00",
			location: "Online",
			description: "Discuss project timeline and backend/frontend tasks",
			duration_minutes: 90,
		},
		{
			summary: "Team Weekly Meeting",
			start_time: "2026-07-06T09:00:00+00:00",
			end_time: "2026-07-06T10:00:00+00:00",
			location: "Meeting Room A",
			description: "Weekly team progress discussion",
			duration_minutes: 60,
		},
		{
			summary: "Client Review Meeting",
			start_time: "2026-07-08T11:00:00+00:00",
			end_time: "2026-07-08T12:00:00+00:00",
			location: "Google Meet",
			description: "Review client requirements and feedback",
			duration_minutes: 60,
		},
	],
	metrics: {
		total_events: 3,
		total_meeting_minutes: 210,
		total_meeting_hours: 3.5,
		shortest_meeting_minutes: 60,
		average_meeting_minutes: 70,
		longest_meeting_minutes: 90,
		meetings_by_day: {
			Tuesday: 1,
			Monday: 1,
			Wednesday: 1,
		},
		busiest_day: "Tuesday",
	},
	ai_insight:
		"### 1. Short Overall Summary\nThe system analyzed three calendar events: a Project Planning Session (90 minutes) on July 7th, online, and two Team meetings (60 minutes each) split between Meeting Room A and Google Meet.\n\n### 2. Key Meeting Pattern Insights\n- **Short duration meetings**: two of three meetings ran exactly 60 minutes.\n- **Consistent workload**: meetings are spread across three consecutive weekdays with no single day overloaded.\n- **Focus areas**: planning and progress-tracking dominate the week's agenda.\n\n### 3. Practical Recommendations\n1. Protect focus time around the 90-minute planning session, it's the week's heaviest block.\n2. Keep recurring team check-ins to 60 minutes, they're already efficient.\n3. Watch for clustering if more meetings are added to Tuesday, currently the busiest day.",
	message: "Calendar file analyzed successfully",
}

export default sampleData
