const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

function Kpi({ label, value, sub }) {
	return (
		<div className="flex-1 min-w-[140px] bg-white rounded-2xl border border-slate-200 px-5 py-4">
			<p className="text-xs font-medium text-slate-400 uppercase tracking-wide">{label}</p>
			<p className="text-2xl font-semibold text-slate-800 mt-1">{value}</p>
			{sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
		</div>
	)
}

export default function KpiRow({ metrics }) {
	const byDay = metrics?.meetings_by_day || {}
	const max = Math.max(1, ...DAYS.map((d) => byDay[d] || 0))

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-wrap gap-4">
				<Kpi label="Total events" value={metrics?.total_events ?? '—'} />
				<Kpi
					label="Meeting time"
					value={`${metrics?.total_meeting_hours ?? '—'}h`}
					sub={`${metrics?.total_meeting_minutes ?? 0} min total`}
				/>
				<Kpi label="Average length" value={`${metrics?.average_meeting_minutes ?? '—'} min`} />
				<Kpi
					label="Shortest / longest"
					value={`${metrics?.shortest_meeting_minutes ?? '—'} / ${metrics?.longest_meeting_minutes ?? '—'}`}
					sub="minutes"
				/>
				<Kpi label="Busiest day" value={metrics?.busiest_day ?? '—'} />
			</div>

			<div className="bg-white rounded-2xl border border-slate-200 px-5 py-4">
				<p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Weekly rhythm</p>
				<div className="flex items-end gap-2 h-16">
					{DAYS.map((day) => {
						const count = byDay[day] || 0
						const heightPct = Math.max(6, (count / max) * 100)
						const isBusiest = day === metrics?.busiest_day
						return (
							<div key={day} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
								<div
									className={"w-full rounded-md " + (isBusiest ? "bg-indigo-500" : "bg-indigo-100")}
									style={{ height: `${heightPct}%` }}
									title={`${day}: ${count}`}
								/>
								<span className="text-[10px] text-slate-400">{day.slice(0, 3)}</span>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}
