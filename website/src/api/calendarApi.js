// Talks to the backend that parses .ics files and returns the
// calendar-analysis JSON (events, metrics, ai_insight) described in the
// project brief.
//
// Configure the backend origin via VITE_API_BASE_URL (e.g. in a .env file):
//   VITE_API_BASE_URL=http://localhost:8000
// Falls back to a relative path, which works if the backend is proxied
// under the same origin (e.g. via Vite's server.proxy, or same-domain deploy).

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''
const ANALYZE_ENDPOINT = `${API_BASE_URL}/api/analyze-calendar`

export class CalendarApiError extends Error {
	constructor(message, status) {
		super(message)
		this.name = 'CalendarApiError'
		this.status = status
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
		let detail = ''
		try {
			const errBody = await response.json()
			detail = errBody?.message || errBody?.detail || ''
		} catch {
			// response wasn't JSON, ignore
		}
		throw new CalendarApiError(
			detail || `The server rejected the file (status ${response.status}).`,
			response.status,
		)
	}

	return response.json()
}
