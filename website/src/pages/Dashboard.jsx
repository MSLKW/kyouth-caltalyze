import { useState } from 'react'
import Sidebar from '../components/Sidebar.jsx'
import Analytics from '../components/Analytics.jsx'
import AiDeepDive from '../components/AiDeepDive.jsx'
import sampleData from '../data/sampleData.js'
import { analyzeCalendarFile, sendChatMessage, CalendarApiError } from '../api/calendarApi.js'

let messageId = 0
const nextMessageId = () => `msg-${++messageId}`

function buildInitialMessages(calendarData) {
	if (!calendarData?.ai_insight) return []
	return [{ id: nextMessageId(), role: 'assistant', content: calendarData.ai_insight }]
}

export default function Dashboard() {
	const [page, setPage] = useState('analytics')
	const [data, setData] = useState(sampleData)
	const [isImporting, setIsImporting] = useState(false)
	const [importError, setImportError] = useState(null)
	const [chatMessages, setChatMessages] = useState(() => buildInitialMessages(sampleData))

	const handleImport = async (icsFile) => {
		setIsImporting(true)
		setImportError(null)
		try {
			const parsed = await analyzeCalendarFile(icsFile)
			setData(parsed)
			setPage('analytics')
			// Refresh the chat: drop any previous conversation and seed it with
			// the newly generated AI summary as the first assistant message.
			setChatMessages(buildInitialMessages(parsed))
		} catch (err) {
			const message =
				err instanceof CalendarApiError
					? err.message
					: 'Something went wrong analyzing that file.'
			setImportError(message)
		} finally {
			setIsImporting(false)
		}
	}

	const handleExport = () => {
		const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
		const url = URL.createObjectURL(blob)
		const a = document.createElement('a')
		a.href = url
		a.download = (data?.filename || 'calendar-analysis').replace(/\.ics$/, '') + '.json'
		a.click()
		URL.revokeObjectURL(url)
	}

	const handleSendMessage = async (text) => {
		setChatMessages((prev) => [...prev, { id: nextMessageId(), role: 'user', content: text }])
		try {
			const reply = await sendChatMessage({
				message: text,
				events: data?.events || [],
				metrics: data?.metrics || null,
			})
			setChatMessages((prev) => [...prev, { id: nextMessageId(), role: 'assistant', content: reply }])
		} catch (err) {
			const message =
				err instanceof CalendarApiError
					? err.message
					: 'Something went wrong reaching the AI.'
			setChatMessages((prev) => [
				...prev,
				{ id: nextMessageId(), role: 'assistant', content: message, isError: true },
			])
		}
	}

	return (
		<div className="flex h-screen w-screen bg-white">
			<Sidebar
				page={page}
				setPage={setPage}
				onImport={handleImport}
				onExport={handleExport}
				fileName={data?.filename}
				isImporting={isImporting}
				importError={importError}
			/>
			{page === 'analytics' ? (
				<Analytics data={data} onSeeMore={() => setPage('deepdive')} />
			) : (
				<AiDeepDive data={data} messages={chatMessages} onSendMessage={handleSendMessage} />
			)}
		</div>
	)
}