
function SideBarElement({text, link}) {
	return (
		<a href={link} className="bg-gray-700 hover:bg-gray-500 text-white p-3 cursor-pointer">{text}</a>
	)
}

function SideBarButton({inputId, svgLink}) {
	return (
		<label htmlFor={inputId} className="bg-gray-700 hover:bg-gray-500 p-3 cursor-pointer rounded-full w-15 h-15">
			<img src={svgLink}></img>
			<input type="file" id={inputId} className="hidden"></input>
		</label>
	)
}

function SideBar() {
	return (
		<div className="flex flex-col bg-gray-100 w-48 h-full">
			<div className="flex flex-row p-5 justify-between">
				<SideBarButton text="Import" svgLink="/upload.svg"/>
				<SideBarButton text="Export" svgLink="/download.svg"/>
			</div>
			<SideBarElement text="Analytics" />
			<SideBarElement text="AI Deep Dive" />
			<SideBarElement text="Calendar" />
		</div>
	)
}

function AiSummary() {
	return (
		<div className="ml-auto bg-gray-100 min-w-80 max-w-80 p-5 rounded-2xl overflow-y-auto">
			<h1 className="text-2xl text-center mb-3 pb-3 border-b-1">AI Summary</h1>
			<div>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut accumsan tincidunt lorem, ac vestibulum lectus mollis posuere. Duis rutrum erat quis felis sollicitudin feugiat. Vestibulum eu orci vel lectus vestibulum ultrices ac eget diam. Phasellus ut convallis mauris. Duis egestas luctus tellus at sodales. Cras vel sagittis purus, sollicitudin aliquet ligula. Etiam nulla sapien, condimentum eu urna quis, consectetur pellentesque arcu. Integer convallis, tellus volutpat egestas dignissim, massa nunc posuere est, eu porta tortor nisi vel lorem.

	Pellentesque vulputate auctor vestibulum. Suspendisse hendrerit molestie quam. Sed nec neque et nunc interdum ornare eu sit amet nunc. Sed cursus urna in leo iaculis, id pharetra nunc ultrices. Proin in felis egestas, maximus ante ac, congue odio. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi fermentum feugiat ipsum ac faucibus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent a odio eu sem tristique pulvinar gravida in diam. Nunc id eros vulputate, ultricies metus vel, ultrices quam. Nam elementum, velit eget dignissim pretium, orci nisl feugiat sapien, et porta eros leo a dui. Donec facilisis nec ex vitae eleifend. Sed ut mauris porta urna laoreet tristique eget in mi. Nunc molestie, magna sit amet aliquam pulvinar, nisi tortor maximus ipsum, id vestibulum sem est ac lacus. Nam vestibulum a odio id viverra. Vestibulum mattis, eros non sagittis varius, urna elit dignissim urna, eget fermentum nibh lorem a ante.

	Proin hendrerit, magna in ultrices viverra, leo nibh vestibulum arcu, id pharetra tortor ex et libero. Donec et risus at nunc dictum sollicitudin ut ut felis. Praesent pharetra tortor id lectus tincidunt aliquam. Suspendisse eu dui pharetra, aliquet nibh ac, tincidunt justo. Donec dolor magna, pellentesque sed facilisis non, sodales in nibh. Morbi nulla mauris, malesuada ut elementum a, lobortis et magna. Vivamus congue metus id libero cursus, vel cursus purus pulvinar. Morbi ut nulla vitae nisl commodo tristique. Nam nec mauris in enim iaculis tempor. Suspendisse in dictum libero. Phasellus nec sem nisl.

	Praesent scelerisque feugiat odio, non gravida leo volutpat suscipit. Quisque quis euismod lorem, a efficitur massa. Nullam a dictum ex. Aliquam gravida, ex sed vulputate condimentum, purus mi lobortis nulla, vel scelerisque augue felis non diam. Curabitur rhoncus vestibulum tellus, at pellentesque mi volutpat dignissim. Quisque mattis ultricies mi eu volutpat. Fusce rhoncus efficitur diam et ultricies. Sed malesuada orci eget gravida dapibus. Ut eros elit, venenatis vitae tellus vel, congue aliquet libero. Cras mi quam, lobortis non nulla non, luctus porttitor sem. Praesent ut tempus orci. Suspendisse elementum dolor arcu, et mattis ex finibus id.

	Quisque ullamcorper egestas consectetur. Ut sit amet libero non mauris malesuada finibus. Maecenas at urna et dolor vestibulum vehicula a eget sem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque a metus eget risus consequat luctus eu fermentum lorem. Donec posuere, risus sagittis commodo dapibus, nulla enim dapibus sapien, a fermentum ante elit eu erat. Suspendisse porttitor id mi ultricies sagittis. Suspendisse mattis diam eu augue facilisis, semper. 
				</p>
			</div>
		</div>
	)
}

function ChartsContainer() {
	return (
		<div className="mr-5 bg-gray-100 w-full h-full p-5 rounded-2xl overflow-y-auto">
			
		</div>
	)
}

function Analytics() {
	return (
		<div className="flex justify-between w-full h-full overflow-y-auto p-5">
			<ChartsContainer />
			<AiSummary />
		</div>
	)
}

export default function Caltalyze() {
	return (
		<div className="flex h-screen w-screen">
			<SideBar />
			<Analytics />
		</div>
	)
}