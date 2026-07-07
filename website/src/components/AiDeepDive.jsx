import { useEffect, useRef, useState } from 'react'
import { SparkIcon, ArrowRightIcon } from './Icons.jsx'
import MiniMarkdown from './MiniMarkdown.jsx'

function TypingBubble() {
	return (
		<div className="flex items-end gap-2.5">
			<div className="shrink-0 w-7 h-7 rounded-full bg-indigo-500 text-white flex items-center justify-center">
				<SparkIcon className="w-3.5 h-3.5" />
			</div>
			<div className="bg-slate-100 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
				<span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.3s]" />
				<span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.15s]" />
				<span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
			</div>
		</div>
	)
}

function ChatMessage({ message }) {
	const isUser = message.role === 'user'

	if (isUser) {
		return (
			<div className="flex justify-end">
				<div className="max-w-[75%] bg-indigo-500 text-white rounded-2xl rounded-br-sm px-4 py-3 text-sm leading-relaxed">
					{message.content}
				</div>
			</div>
		)
	}

	return (
		<div className="flex items-end gap-2.5">
			<div className="shrink-0 w-7 h-7 rounded-full bg-indigo-500 text-white flex items-center justify-center">
				<SparkIcon className="w-3.5 h-3.5" />
			</div>
			<div
				className={
					"max-w-[75%] rounded-2xl rounded-bl-sm px-4 py-3 text-sm " +
					(message.isError ? "bg-rose-50 text-rose-700" : "bg-slate-100 text-slate-700")
				}
			>
				<MiniMarkdown content={message.content} />
			</div>
		</div>
	)
}

export default function AiDeepDive({ data, messages, onSendMessage }) {
	const [draft, setDraft] = useState('')
	const [isSending, setIsSending] = useState(false)
	const scrollRef = useRef(null)

	useEffect(() => {
		scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
	}, [messages, isSending])

	const handleSubmit = async (e) => {
		e.preventDefault()
		const text = draft.trim()
		if (!text || isSending) return
		setDraft('')
		setIsSending(true)
		try {
			await onSendMessage(text)
		} finally {
			setIsSending(false)
		}
	}

	return (
		<div className="w-full h-full flex flex-col p-5">
			<div className="flex items-center gap-2 mb-4 shrink-0">
				<SparkIcon className="w-4 h-4 text-indigo-500" />
				<h1 className="text-lg font-semibold text-slate-800">AI Deep Dive</h1>
				<span className="text-xs text-slate-400 ml-1">
					{data?.filename ? `· ${data.filename}` : ''}
				</span>
			</div>

			<div
				ref={scrollRef}
				className="flex-1 min-h-0 bg-white rounded-2xl border border-slate-200 overflow-y-auto scroll-quiet p-5 flex flex-col gap-4"
			>
				{messages.length === 0 ? (
					<p className="m-auto text-sm text-slate-400">
						Import a calendar to start chatting with the AI about it.
					</p>
				) : (
					messages.map((message) => <ChatMessage key={message.id} message={message} />)
				)}
				{isSending && <TypingBubble />}
			</div>

			<form onSubmit={handleSubmit} className="mt-4 shrink-0">
				<div className="flex items-center gap-2 bg-white border border-slate-200 rounded-full pl-5 pr-2 py-2 focus-within:border-indigo-400 transition-colors">
					<input
						type="text"
						value={draft}
						onChange={(e) => setDraft(e.target.value)}
						placeholder="Ask about your meetings, patterns, or recommendations…"
						disabled={isSending}
						className="flex-1 bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400 disabled:opacity-60"
					/>
					<button
						type="submit"
						disabled={isSending || !draft.trim()}
						aria-label="Send message"
						className="shrink-0 w-9 h-9 rounded-full bg-indigo-500 hover:bg-indigo-600 disabled:bg-slate-200 disabled:cursor-not-allowed cursor-pointer text-white flex items-center justify-center transition-colors"
					>
						<ArrowRightIcon className="w-4 h-4" />
					</button>
				</div>
			</form>
		</div>
	)
}