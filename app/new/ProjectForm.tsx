'use client';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProjectSchema } from '@/lib/ZodSchema/ProjectSchema';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import FileUpload from './FileUpload';
import { FancyBox } from '@/components/ui/fancy-box';
import { Button } from '@/components/ui/button';
import Autocomplete from '@/components/Autocomplete';
import { useCallback } from 'react';
export default function ProjectForm() {
  function handleProjectSubmission() {
    console.log('Submitting Project');
  }
  const form = useForm<z.infer<typeof ProjectSchema>>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      project_title: '',
      description: '',
    },
    mode: 'onTouched',
  });
  return (
    <form action="" className="flex flex-col gap-4 p-4">
      <Input placeholder="Project Title" />
      <div className="grid w-full gap-1.5">
        <Label htmlFor="message">
          Description <span className="text-gray-400">(optional)</span>
        </Label>
        <Textarea
          placeholder="Type your message here."
          id="message"
          maxLength={255}
        />
      </div>
      <FileUpload />

      <Input placeholder="Source Code Link" />
      <FancyBox />
      <Autocomplete />
      <Button onClick={handleProjectSubmission}>Submit Project</Button>
    </form>
  );
}
