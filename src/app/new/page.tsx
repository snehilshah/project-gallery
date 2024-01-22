"use client";
import { useRouter } from "next/navigation"

export default function AddProject() {
  const router = useRouter()
	const handleProjectSubmission = () => {
		console.log('Project Submitted')
    router.push('/')
	}
	return (
		<div>
			<h1>Add Project</h1>
			<button onClick={handleProjectSubmission}>Submit Project</button>
		</div>
	)
}
