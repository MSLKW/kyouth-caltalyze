import { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Analytics from './components/Analytics.jsx'
import AiDeepDive from './components/AiDeepDive.jsx'
import sampleData from './data/sampleData.js'
import { analyzeCalendarFile, CalendarApiError } from './api/calendarApi.js'

export default function App() {
	const [page, setPage] = useState('analytics')
	const [data, setData] = useState(sampleData)
	const [isImporting, setIsImporting] = useState(false)
	const [importError, setImportError] = useState(null)

	const handleImport = async (icsFile) => {
		setIsImporting(true)
		setImportError(null)
		try {
			const parsed = await analyzeCalendarFile(icsFile)
			setData(parsed)
			setPage('analytics')
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
				<AiDeepDive data={data} />
			)}
		</div>
	)
}
