
export default function FeatureCard({ icon, eyebrow, title, description, points, highlight = false }) {
	return (
		<div
			className={
				"flex flex-col h-full min-h-0 rounded-2xl p-5 lg:p-6 border overflow-hidden " +
				(highlight
					? "bg-indigo-600 border-indigo-600 text-white"
					: "bg-white border-slate-200 text-slate-800")
			}
		>
			<div
				className={
					"inline-flex items-center justify-center w-10 h-10 rounded-xl mb-3 lg:mb-4 shrink-0 " +
					(highlight ? "bg-white/15 text-white" : "bg-indigo-50 text-indigo-600")
				}
			>
				{icon}
			</div>

			<p className={"text-[11px] font-semibold uppercase tracking-wide mb-1.5 shrink-0 " + (highlight ? "text-indigo-200" : "text-indigo-500")}>
				{eyebrow}
			</p>
			<h3 className="text-base lg:text-lg font-semibold tracking-tight mb-2 leading-snug shrink-0">{title}</h3>
			<p className={"text-sm leading-relaxed mb-4 shrink-0 " + (highlight ? "text-indigo-100" : "text-slate-500")}>
				{description}
			</p>

			{points && (
				<ul className={"mt-2 flex flex-col gap-1.5 lg:gap-2 text-[13px] lg:text-sm shrink-0 " + (highlight ? "text-indigo-50" : "text-slate-600")}>
					{points.map((point, i) => (
						<li key={i} className="flex items-start gap-2">
							<span
								className={
									"mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 " +
									(highlight ? "bg-white" : "bg-indigo-400")
								}
							/>
							<span className="leading-snug">{point}</span>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}