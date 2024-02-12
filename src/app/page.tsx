'use client'

import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
export default function Home() {
	const { toast } = useToast()
	return (
		<main className="bg-white">
			<Button
				variant="outline"
				onClick={() => {
					toast({
						variant: 'destructive',
						title: 'Uh oh! Something went wrong.',
						description: 'There was a problem with your request.',
					})
				}}
			>
				Show Toast
			</Button>
			<h1 className="text-8xl text-center uppercase">Project Of The Day</h1>
		</main>
	)
}
