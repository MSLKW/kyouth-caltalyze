// A small, purpose-built renderer for the subset of markdown the AI insight
// text uses (###/#### headers, **bold**, numbered lists, bullet lists, ---).
// Avoids pulling in a full markdown dependency for a handful of patterns.

function renderInline(text, keyPrefix) {
	const parts = text.split(/(\*\*[^*]+\*\*)/g)
	return parts.map((part, i) => {
		if (part.startsWith('**') && part.endsWith('**')) {
			return (
				<strong key={`${keyPrefix}-${i}`} className="font-semibold text-slate-800">
					{part.slice(2, -2)}
				</strong>
			)
		}
		return <span key={`${keyPrefix}-${i}`}>{part}</span>
	})
}

export default function MiniMarkdown({ content, className = '' }) {
	if (!content) return null
	const lines = content.split('\n')
	const blocks = []
	let listBuffer = []
	let listType = null

	const flushList = (key) => {
		if (listBuffer.length === 0) return
		const items = listBuffer.map((item, i) => (
			<li key={i} className="pl-1">
				{renderInline(item, `${key}-li-${i}`)}
			</li>
		))
		if (listType === 'ol') {
			blocks.push(
				<ol key={key} className="list-decimal list-outside ml-5 space-y-1.5 text-slate-600">
					{items}
				</ol>,
			)
		} else {
			blocks.push(
				<ul key={key} className="list-disc list-outside ml-5 space-y-1.5 text-slate-600">
					{items}
				</ul>,
			)
		}
		listBuffer = []
		listType = null
	}

	lines.forEach((raw, idx) => {
		const line = raw.trim()

		if (line === '' ) {
			flushList(`list-${idx}`)
			return
		}
		if (line === '---') {
			flushList(`list-${idx}`)
			blocks.push(<hr key={idx} className="border-slate-200 my-4" />)
			return
		}
		const headerMatch = line.match(/^(#{1,4})\s+(.*)$/)
		if (headerMatch) {
			flushList(`list-${idx}`)
			const level = headerMatch[1].length
			const text = headerMatch[2]
			const sizes = {
				1: 'text-xl font-semibold text-slate-800 mt-5 mb-2',
				2: 'text-lg font-semibold text-slate-800 mt-5 mb-2',
				3: 'text-base font-semibold text-slate-800 mt-5 mb-1.5',
				4: 'text-sm font-semibold uppercase tracking-wide text-indigo-600 mt-4 mb-1.5',
			}
			blocks.push(
				<p key={idx} className={sizes[level] || sizes[3]}>
					{renderInline(text, `h-${idx}`)}
				</p>,
			)
			return
		}
		const olMatch = line.match(/^\d+[.)]\s+(.*)$/)
		if (olMatch) {
			if (listType && listType !== 'ol') flushList(`list-${idx}`)
			listType = 'ol'
			listBuffer.push(olMatch[1])
			return
		}
		const ulMatch = line.match(/^[-*]\s+(.*)$/)
		if (ulMatch) {
			if (listType && listType !== 'ul') flushList(`list-${idx}`)
			listType = 'ul'
			listBuffer.push(ulMatch[1])
			return
		}

		flushList(`list-${idx}`)
		blocks.push(
			<p key={idx} className="text-slate-600 leading-relaxed">
				{renderInline(line, `p-${idx}`)}
			</p>,
		)
	})
	flushList('list-end')

	return <div className={className}>{blocks}</div>
}
