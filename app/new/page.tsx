import ProjectForm from './ProjectForm'

import { Separator } from '@/components/ui/separator'

export default function AddProject() {
	return (
		<section className="w-2/3 mx-auto p-2">
			<h1 className="font-semibold text-xl">Create a new Project</h1>
			<p className="text-sm text-muted-foreground">
				Add a project to you profile
			</p>
			<Separator />
			<ProjectForm />
		</section>
	)
}
