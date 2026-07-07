
export default function TutorialStep({ number, icon, title, description, isLast = false }) {
	return (
		<div className="flex-1 flex md:flex-col items-start md:items-center gap-4 md:gap-0 relative">
			{!isLast && (
				<span
					className="hidden md:block absolute top-5 left-1/2 w-full h-px bg-indigo-200"
					aria-hidden="true"
				/>
			)}

			<div className="relative shrink-0 md:mb-3 flex items-center justify-center w-10 h-10 rounded-full bg-white border-2 border-indigo-500 text-indigo-600 font-semibold z-10">
				{number}
			</div>

			<div className="md:text-center">
				<div className="hidden md:flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 mx-auto mb-2">
					{icon}
				</div>
				<h3 className="text-base font-semibold text-slate-800 mb-1">{title}</h3>
				<p className="text-sm text-slate-500 leading-relaxed md:max-w-[220px]">{description}</p>
			</div>
		</div>
	)
}