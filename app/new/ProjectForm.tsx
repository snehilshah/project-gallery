import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ProjectSchema } from '@/lib/ZodSchema/ProjectSchema'
import { FancyMultiSelect } from '@/components/ui/multi-select'
export default function ProjectForm() {
  
	const form = useForm<z.infer<typeof ProjectSchema>>({
		resolver: zodResolver(ProjectSchema),
		defaultValues: {
			project_title: '',
			description: '',
		},
		mode: 'onTouched',
	})
	return (
		<form action="">
			<Input placeholder="Enter project name" />
		</form>
	)
}
