'use client'

import { FancyBox } from '@/components/ui/multi-box'
import { FancyMultiSelect } from '@/components/ui/multi-select'

export default function Home() {
	return (
		<main className="bg-white">
			<div className='flex flex-col items-center gap-6 mb-32'>
				<h1>This Better?</h1>
				<div className="w-[90%] md:w-1/3">
					<FancyMultiSelect />
				</div>
				<h1>Or this?</h1>
				<FancyBox />
			</div>
			<h1 className="text-8xl text-center uppercase">Project Of The Day</h1>
		</main>
	)
}
