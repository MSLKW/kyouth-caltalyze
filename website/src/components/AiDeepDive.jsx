import { SparkIcon, CalendarIcon } from './Icons.jsx'
import MiniMarkdown from './MiniMarkdown.jsx'

function formatTime(iso) {
	if (!iso) return '—'
	const d = new Date(iso)
	return d.toLocaleString(undefined, {
		weekday: 'short',
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: '2-digit',
	})
}

function MetricPill({ label, value }) {
	return (
		<div className="bg-slate-50 rounded-xl px-4 py-3 min-w-[120px]">
			<p className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">{label}</p>
			<p className="text-base font-semibold text-slate-800 mt-0.5">{value}</p>
		</div>
	)
}

export default function AiDeepDive({ data }) {
	const metrics = data?.metrics
	const events = data?.events || []

	return (
		<div className="w-full h-full overflow-y-auto scroll-quiet p-5">
			<div className="max-w-4xl mx-auto flex flex-col gap-5">
				<div className="bg-white rounded-2xl border border-slate-200 p-6">
					<div className="flex items-center gap-2 mb-1">
						<SparkIcon className="w-4 h-4 text-indigo-500" />
						<h1 className="text-lg font-semibold text-slate-800">AI Deep Dive</h1>
					</div>
					<p className="text-xs text-slate-400 mb-5">
						Based on {metrics?.total_events ?? events.length} events from {data?.filename || 'your calendar'}
					</p>

					<div className="flex flex-wrap gap-3 mb-6">
						<MetricPill label="Total time" value={`${metrics?.total_meeting_hours ?? '—'}h`} />
						<MetricPill label="Average length" value={`${metrics?.average_meeting_minutes ?? '—'} min`} />
						<MetricPill label="Longest" value={`${metrics?.longest_meeting_minutes ?? '—'} min`} />
						<MetricPill label="Shortest" value={`${metrics?.shortest_meeting_minutes ?? '—'} min`} />
						<MetricPill label="Busiest day" value={metrics?.busiest_day ?? '—'} />
					</div>

					{data?.ai_insight ? (
						<MiniMarkdown content={data.ai_insight} />
					) : (
						<p className="text-sm text-slate-400">Import a calendar analysis file to generate an AI deep dive.</p>
					)}
				</div>

				<div className="bg-white rounded-2xl border border-slate-200 p-6">
					<div className="flex items-center gap-2 mb-4">
						<CalendarIcon className="w-4 h-4 text-slate-400" />
						<h2 className="text-sm font-semibold text-slate-700">Event ledger</h2>
					</div>
					<div className="flex flex-col divide-y divide-slate-100">
						{events.map((e, i) => (
							<div key={i} className="py-3 flex items-start justify-between gap-4">
								<div>
									<p className="text-sm font-medium text-slate-800">{e.summary}</p>
									<p className="text-xs text-slate-400 mt-0.5">
										{formatTime(e.start_time)} · {e.location}
									</p>
									{e.description && (
										<p className="text-xs text-slate-500 mt-1 max-w-lg">{e.description}</p>
									)}
								</div>
								<span className="text-xs font-medium text-slate-500 whitespace-nowrap bg-slate-50 rounded-full px-2.5 py-1">
									{e.duration_minutes} min
								</span>
							</div>
						))}
						{events.length === 0 && (
							<p className="text-sm text-slate-400 py-3">No events to show yet.</p>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
