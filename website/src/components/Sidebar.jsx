import { UploadIcon, DownloadIcon, ChartIcon, SparkIcon } from './Icons.jsx'

function NavItem({ label, icon, active, onClick }) {
	return (
		<button
			onClick={onClick}
			className={
				"flex items-center gap-3 text-left px-4 py-3 text-sm font-medium transition-colors " +
				(active
					? "bg-white/10 text-white border-l-2 border-indigo-400"
					: "text-slate-300 border-l-2 border-transparent hover:bg-white/5 hover:text-white")
			}
		>
			{icon}
			{label}
		</button>
	)
}

export default function Sidebar({ page, setPage, onImport, onExport, fileName, isImporting, importError }) {
	const handleFile = (e) => {
		const file = e.target.files?.[0]
		e.target.value = '' // allow re-selecting the same file later
		if (!file) return
		if (!file.name.toLowerCase().endsWith('.ics')) {
			alert('Please choose a .ics calendar file.')
			return
		}
		onImport(file)
	}

	return (
		<div className="flex flex-col bg-slate-900 w-56 h-full shrink-0">
			<div className="px-5 pt-6 pb-5">
				<div className="flex items-center gap-2 text-white">
					<CalendarBadge />
					<span className="font-semibold tracking-tight text-lg">Caltalyze</span>
				</div>
				<p className="text-xs text-slate-400 mt-1 truncate">{fileName}</p>
			</div>

			<div className="flex flex-row gap-2 px-5 pb-2">
				<label
					htmlFor="import-input"
					className={
						"flex-1 flex flex-col items-center justify-center gap-1 rounded-xl py-2.5 transition-colors " +
						(isImporting
							? "bg-white/5 text-slate-500 cursor-not-allowed"
							: "bg-white/5 hover:bg-white/10 text-slate-200 cursor-pointer")
					}
					title="Import a .ics calendar file"
				>
					{isImporting ? (
						<span className="w-4 h-4 rounded-full border-2 border-slate-500 border-t-transparent animate-spin" />
					) : (
						<UploadIcon className="w-4 h-4" />
					)}
					<span className="text-[11px] font-medium">{isImporting ? 'Analyzing…' : 'Import'}</span>
					<input
						id="import-input"
						type="file"
						accept=".ics"
						className="hidden"
						onChange={handleFile}
						disabled={isImporting}
					/>
				</label>
				<button
					onClick={onExport}
					className="flex-1 flex flex-col items-center justify-center gap-1 bg-white/5 hover:bg-white/10 text-slate-200 rounded-xl py-2.5 cursor-pointer transition-colors"
					title="Export current data"
				>
					<DownloadIcon className="w-4 h-4" />
					<span className="text-[11px] font-medium">Export</span>
				</button>
			</div>

			{importError && (
				<p className="px-5 pb-3 text-[11px] text-rose-400 leading-snug">{importError}</p>
			)}

			<nav className="flex flex-col mt-2">
				<NavItem
					label="Analytics"
					icon={<ChartIcon className="w-4 h-4" />}
					active={page === 'analytics'}
					onClick={() => setPage('analytics')}
				/>
				<NavItem
					label="AI Deep Dive"
					icon={<SparkIcon className="w-4 h-4" />}
					active={page === 'deepdive'}
					onClick={() => setPage('deepdive')}
				/>
			</nav>

			<div className="mt-auto px-5 py-5 text-[11px] text-slate-500">
				Calendar insight, distilled.
			</div>
		</div>
	)
}

function CalendarBadge() {
	return (
		<span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-500 text-white text-xs font-bold">
			C
		</span>
	)
}
