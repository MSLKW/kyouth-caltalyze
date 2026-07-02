import ChartsContainer from './ChartsContainer.jsx'
import AiSummary from './AiSummary.jsx'

export default function Analytics({ data, onSeeMore }) {
	return (
		<div className="flex justify-between w-full h-full overflow-hidden p-5">
			<ChartsContainer data={data} />
			<AiSummary insight={data?.ai_insight} onSeeMore={onSeeMore} />
		</div>
	)
}
