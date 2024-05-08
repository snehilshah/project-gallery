import ProjectForm from './ProjectForm';

import { Separator } from '@/components/ui/separator';

export default function AddProject() {
  return (
    <section className="mx-auto w-2/3 p-2">
      <h1 className="text-xl font-semibold">Create a new Project</h1>
      <p className="text-sm text-muted-foreground">
        Add a project to you profile
      </p>
      <Separator />
      <ProjectForm />
    </section>
  );
}
