'use client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import FileUpload from './FileUpload'
import { Separator } from "@/components/ui/separator"
import ProjectForm from './ProjectForm'

export default function AddProject() {
	const router = useRouter()
	const handleProjectSubmission = () => {
		console.log('Project Submitted')
		router.push('/')
	}
	return (
		<section className='w-2/3 mx-auto p-2'>
			<h1 className='font-semibold text-xl'>Create a new Project</h1>
			<p className='text-sm text-muted-foreground'>Add a project to you profile</p>
			<Separator />
			
			<ProjectForm />
			<FileUpload />
			<Button onClick={handleProjectSubmission}>Submit Project</Button>
		</section>
	)
}
