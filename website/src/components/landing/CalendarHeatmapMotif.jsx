// A quiet, non-interactive echo of the dashboard's own "weekly rhythm" strip —
// intensities are hand-picked (not random) so the pattern reads as deliberate
// rather than decorative noise, and stays stable across re-renders.
const INTENSITIES = [
	0, 1, 0, 2, 0, 0, 1,
	1, 3, 2, 4, 1, 0, 2,
	0, 2, 4, 5, 3, 1, 0,
	2, 5, 3, 4, 2, 1, 0,
	0, 1, 2, 1, 0, 0, 1,
]

const FILLS = ['#1e293b', '#312e81', '#4338ca', '#4f46e5', '#6366f1', '#818cf8']

export default function CalendarHeatmapMotif({ className = '' }) {
	const cols = 7
	const size = 22
	const gap = 6
	const width = cols * size + (cols - 1) * gap
	const rows = Math.ceil(INTENSITIES.length / cols)
	const height = rows * size + (rows - 1) * gap

	return (
		<svg
			viewBox={`0 0 ${width} ${height}`}
			className={className}
			aria-hidden="true"
			focusable="false"
		>
			{INTENSITIES.map((intensity, i) => {
				const col = i % cols
				const row = Math.floor(i / cols)
				return (
					<rect
						key={i}
						x={col * (size + gap)}
						y={row * (size + gap)}
						width={size}
						height={size}
						rx={6}
						fill={FILLS[intensity]}
					/>
				)
			})}
		</svg>
	)
}