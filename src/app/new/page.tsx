'use client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import FileUpload from './FileUpload'

export default function AddProject() {
	const router = useRouter()
	const handleProjectSubmission = () => {
		console.log('Project Submitted')
		router.push('/')
	}
	return (
		<div>
			<h1>Add Project</h1>
			<FileUpload />
			<Button onClick={handleProjectSubmission}>Submit Project</Button>
		</div>
	)
}
