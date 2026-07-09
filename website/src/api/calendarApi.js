// Talks to the backend that parses .ics files and returns the
// calendar-analysis JSON (events, metrics, ai_insight) described in the
// project brief.
//
// In production (docker-compose), this is left as a relative path and
// nginx reverse-proxies /api/* to the backend service — no build-time
// config needed. For local `npm run dev` without Docker, set
// VITE_API_BASE_URL (e.g. in .env.local) to point directly at a backend
// you're running separately, e.g. http://localhost:8000.
const ANALYZE_ENDPOINT = `${import.meta.env.VITE_API_BASE_URL}/api/upload-calendar`
const CHAT_ENDPOINT = `${import.meta.env.VITE_API_BASE_URL}/api/chat`

export class CalendarApiError extends Error {
	constructor(message, status) {
		super(message)
		this.name = 'CalendarApiError'
		this.status = status
	}
}

async function parseErrorDetail(response) {
	try {
		const errBody = await response.json()
		return errBody?.message || errBody?.detail || ''
	} catch {
		return ''
	}
}

/**
 * Uploads a raw .ics file to the backend for parsing/analysis and
 * returns the resulting calendar-analysis JSON.
 * @param {File} file - the .ics file selected by the user
 * @returns {Promise<object>} the parsed calendar analysis payload
 */
export async function analyzeCalendarFile(file) {
	const formData = new FormData()
	formData.append('file', file)

	let response
	try {
		response = await fetch(ANALYZE_ENDPOINT, {
			method: 'POST',
			body: formData,
		})
	} catch (networkErr) {
		throw new CalendarApiError(
			'Could not reach the analysis server. Check that the backend is running.',
			0,
		)
	}

	if (!response.ok) {
		const detail = await parseErrorDetail(response)
		throw new CalendarApiError(
			detail || `The server rejected the file (status ${response.status}).`,
			response.status,
		)
	}

	return response.json()
}

/**
 * Sends a question to the AI Deep Dive chat, grounded in the currently
 * loaded calendar's events and metrics, and returns the assistant's reply text.
 * @param {{ message: string, events: object[], metrics: object }} params
 * @returns {Promise<string>}
 */
export async function sendChatMessage({ message, events, metrics }) {
	let response
	try {
		response = await fetch(CHAT_ENDPOINT, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ message, events, metrics }),
		})
	} catch (networkErr) {
		throw new CalendarApiError(
			'Could not reach the AI. Check that the backend is running.',
			0,
		)
	}

	if (!response.ok) {
		const detail = await parseErrorDetail(response)
		throw new CalendarApiError(
			detail || `The server rejected the request (status ${response.status}).`,
			response.status,
		)
	}

	const body = await response.json()
	return body.reply
}