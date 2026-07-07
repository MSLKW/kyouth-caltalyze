import { Link } from 'react-router-dom'
import CalendarHeatmapMotif from '../components/landing/CalendarHeatmapMotif.jsx'
import FeatureCard from '../components/landing/FeatureCard.jsx'
import TutorialStep from '../components/landing/TutorialStep.jsx'
import {
	ChartIcon,
	SparkIcon,
	CalendarIcon,
	UploadIcon,
	ChevronDownIcon,
	ArrowRightIcon,
} from '../components/Icons.jsx'

function scrollToId(id) {
	document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function Hero() {
	return (
		<section className="relative h-screen w-full snap-start shrink-0 bg-slate-900 flex items-center overflow-hidden">
			<div className="absolute right-[-40px] top-1/2 -translate-y-1/2 opacity-40 hidden lg:block">
				<CalendarHeatmapMotif className="w-[420px] h-auto" />
			</div>
			<div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-transparent" />

			<div className="relative w-full max-w-6xl mx-auto px-8">
				<div className="max-w-xl">
					<div className="flex items-center gap-2 mb-6">
						<span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-indigo-500 text-white text-sm font-bold">
							C
						</span>
						<span className="text-slate-400 text-sm font-medium tracking-wide uppercase">Calendar Analytics</span>
					</div>

					<h1 className="text-6xl sm:text-7xl font-semibold tracking-tight text-white mb-5">
						Caltalyze
					</h1>
					<p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-8 max-w-md">
						Analyzing your Calendar to Catalyze your Success
					</p>

					<Link
						to="/dashboard"
						className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white font-medium rounded-xl px-6 py-3.5 transition-colors"
					>
						To Dashboard
						<ArrowRightIcon className="w-4 h-4" />
					</Link>
				</div>
			</div>

			<button
				onClick={() => scrollToId('features')}
				className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-400 hover:text-slate-200 transition-colors"
			>
				<span className="text-xs font-medium uppercase tracking-wide">Scroll to explore</span>
				<ChevronDownIcon className="w-5 h-5 animate-bounce" />
			</button>
		</section>
	)
}

function Features() {
	return (
		<section
			id="features"
			className="h-screen w-full snap-start shrink-0 bg-white overflow-hidden flex flex-col"
		>
			<div className="flex-1 min-h-0 flex flex-col justify-center max-w-6xl mx-auto px-8 w-full py-6">
				<div className="max-w-2xl mb-4 lg:mb-6 shrink-0">
					<p className="text-xs font-semibold uppercase tracking-wide text-indigo-500 mb-2">
						What you get
					</p>
					<h2 className="text-2xl lg:text-3xl font-semibold tracking-tight text-slate-800 mb-2 leading-tight">
						Everything your calendar has been trying to tell you
					</h2>
					<p className="text-sm text-slate-500 leading-relaxed hidden lg:block">
						Three parts of Caltalyze work on the same events: visualizing them, explaining them,
						and reading the file they came from.
					</p>
				</div>

				<div className="flex flex-col md:flex-row gap-4 lg:gap-6 flex-1 min-h-0">
					<div className="md:flex-1 min-h-0">
						<FeatureCard
							icon={<ChartIcon className="w-5 h-5 lg:w-6 lg:h-6" />}
							eyebrow="Analytics"
							title="See your week, not just your meetings"
							description="Every event you import becomes a KPI, a chart, or a pattern worth noticing."
							points={[
								'Meetings-by-day and duration charts, built with Chart.js',
								'KPI cards for total time, average length, and outliers',
								'A weekly rhythm strip that shows load at a glance',
							]}
						/>
					</div>
					<div className="md:flex-1 min-h-0">
						<FeatureCard
							icon={<SparkIcon className="w-5 h-5 lg:w-6 lg:h-6" />}
							eyebrow="AI Deep Dive"
							title="Ask what your calendar means, not just what's on it"
							description="Caltalyze reads the same events you do, then explains the pattern behind them and what to do about it."
							points={[
								'A running AI summary alongside every analytics view',
								'A dedicated Deep Dive page for longer-form insight',
								'Practical recommendations, not just observations',
							]}
							highlight
						/>
					</div>
					<div className="md:flex-1 min-h-0">
						<FeatureCard
							icon={<CalendarIcon className="w-5 h-5 lg:w-6 lg:h-6" />}
							eyebrow="File support"
							title="Speaks the format your calendar already exports"
							description="Google Calendar, Outlook, and Apple Calendar all export .ics. Caltalyze reads it directly."
							points={[
								'.ics import, including recurring events',
								'All-day and multi-day events handled correctly',
								'Nothing to install in your calendar app',
							]}
						/>
					</div>
				</div>
			</div>
		</section>
	)
}

function Tutorial() {
	return (
		<section
			id="tutorial"
			className="h-screen w-full snap-start shrink-0 bg-slate-50 overflow-hidden flex flex-col"
		>
			<div className="flex-1 min-h-0 flex flex-col justify-center max-w-5xl mx-auto px-8 w-full py-6">
				<div className="max-w-xl mb-6 lg:mb-8 shrink-0">
					<p className="text-xs font-semibold uppercase tracking-wide text-indigo-500 mb-2">
						How it works
					</p>
					<h2 className="text-2xl lg:text-3xl font-semibold tracking-tight text-slate-800 mb-2 leading-tight">
						From .ics to insight in three steps
					</h2>
					<p className="text-sm text-slate-500 leading-relaxed hidden lg:block">
						No setup beyond the file you already have.
					</p>
				</div>

				<div className="flex flex-col md:flex-row gap-6 md:gap-6 mb-6 lg:mb-8 shrink-0">
					<TutorialStep
						number={1}
						icon={<UploadIcon className="w-4 h-4" />}
						title="Import your file"
						description="Drop in a .ics export from Google, Outlook, or Apple Calendar. Caltalyze parses every event automatically."
					/>
					<TutorialStep
						number={2}
						icon={<ChartIcon className="w-4 h-4" />}
						title="Read the analytics"
						description="See your busiest days, meeting-length trends, and time totals laid out as charts and KPIs."
					/>
					<TutorialStep
						number={3}
						icon={<SparkIcon className="w-4 h-4" />}
						title="Go deeper with AI"
						description="Open the Deep Dive page for a narrative summary of your patterns and what to adjust."
						isLast
					/>
				</div>

				<div className="shrink-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 bg-white border border-slate-200 rounded-2xl px-6 lg:px-8 py-5 lg:py-6">
					<div>
						<h3 className="text-base lg:text-lg font-semibold text-slate-800 mb-1">
							Ready to see your own calendar this way?
						</h3>
						<p className="text-sm text-slate-500">Import a file and the dashboard fills itself in.</p>
					</div>
					<Link
						to="/dashboard"
						className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-xl px-6 py-3 transition-colors whitespace-nowrap"
					>
						To Dashboard
						<ArrowRightIcon className="w-4 h-4" />
					</Link>
				</div>
			</div>
		</section>
	)
}

export default function Landing() {
	return (
		<div className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory scroll-quiet" style={{ scrollBehavior: 'smooth' }}>
			<Hero />
			<Features />
			<Tutorial />
		</div>
	)
}