import { useEffect, useRef } from 'react'
import {
	Chart,
	BarController,
	BarElement,
	CategoryScale,
	LinearScale,
	Tooltip,
	Legend,
} from 'chart.js'
import KpiRow from './KpiRow.jsx'

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const DAY_ORDER = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

function useBarChart(canvasRef, buildConfig, deps) {
	const chartRef = useRef(null)

	useEffect(() => {
		if (!canvasRef.current) return
		if (chartRef.current) {
			chartRef.current.destroy()
		}
		chartRef.current = new Chart(canvasRef.current, buildConfig())
		return () => {
			chartRef.current?.destroy()
			chartRef.current = null
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps)
}

function MeetingsByDayChart({ metrics }) {
	const canvasRef = useRef(null)
	const byDay = metrics?.meetings_by_day || {}
	const labels = DAY_ORDER.filter((d) => byDay[d] !== undefined)
	const data = labels.map((d) => byDay[d])

	useBarChart(
		canvasRef,
		() => ({
			type: 'bar',
			data: {
				labels,
				datasets: [
					{
						label: 'Meetings',
						data,
						backgroundColor: labels.map((d) =>
							d === metrics?.busiest_day ? '#6366f1' : '#c7d2fe',
						),
						borderRadius: 6,
						maxBarThickness: 42,
					},
				],
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: { legend: { display: false } },
				scales: {
					y: { beginAtZero: true, ticks: { precision: 0 }, grid: { color: '#f1f5f9' } },
					x: { grid: { display: false } },
				},
			},
		}),
		[JSON.stringify(byDay), metrics?.busiest_day],
	)

	return <canvas ref={canvasRef} role="img" aria-label="Meetings by day of week" />
}

function DurationByEventChart({ events }) {
	const canvasRef = useRef(null)
	const labels = (events || []).map((e) => e.summary)
	const data = (events || []).map((e) => e.duration_minutes)

	useBarChart(
		canvasRef,
		() => ({
			type: 'bar',
			data: {
				labels,
				datasets: [
					{
						label: 'Minutes',
						data,
						backgroundColor: '#34d399',
						borderRadius: 6,
						maxBarThickness: 36,
					},
				],
			},
			options: {
				indexAxis: 'y',
				responsive: true,
				maintainAspectRatio: false,
				plugins: { legend: { display: false } },
				scales: {
					x: { beginAtZero: true, grid: { color: '#f1f5f9' } },
					y: { grid: { display: false } },
				},
			},
		}),
		[JSON.stringify(labels), JSON.stringify(data)],
	)

	return <canvas ref={canvasRef} role="img" aria-label="Meeting duration by event" />
}

export default function ChartsContainer({ data }) {
	const metrics = data?.metrics
	const events = data?.events

	return (
		<div className="mr-5 bg-slate-50 w-full h-full p-5 rounded-2xl overflow-y-auto scroll-quiet">
			<div className="flex flex-col gap-5 min-w-[420px]">
				<KpiRow metrics={metrics} />

				<div className="bg-white rounded-2xl border border-slate-200 p-5">
					<h2 className="text-sm font-semibold text-slate-700 mb-3">Meetings by day of week</h2>
					<div className="h-64">
						<MeetingsByDayChart metrics={metrics} />
					</div>
				</div>

				<div className="bg-white rounded-2xl border border-slate-200 p-5">
					<h2 className="text-sm font-semibold text-slate-700 mb-3">Duration by event</h2>
					<div style={{ height: Math.max(160, (events?.length || 0) * 56) }}>
						<DurationByEventChart events={events} />
					</div>
				</div>
			</div>
		</div>
	)
}
