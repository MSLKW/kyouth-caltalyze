import { SparkIcon } from './Icons.jsx'
import MiniMarkdown from './MiniMarkdown.jsx'

export default function AiSummary({ insight, onSeeMore }) {
	return (
		<div className="ml-auto bg-slate-50 min-w-80 max-w-80 h-full p-5 rounded-2xl overflow-y-auto scroll-quiet flex flex-col">
			<div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-200">
				<SparkIcon className="w-4 h-4 text-indigo-500" />
				<h1 className="text-base font-semibold text-slate-800">AI Summary</h1>
			</div>

			{insight ? (
				<MiniMarkdown content={insight} className="text-sm" />
			) : (
				<p className="text-sm text-slate-400">Import a calendar analysis file to see the AI summary.</p>
			)}

			<button
				onClick={onSeeMore}
				className="mt-5 text-sm font-medium text-indigo-600 hover:text-indigo-700 text-left"
			>
				Open full AI Deep Dive →
			</button>
		</div>
	)
}
