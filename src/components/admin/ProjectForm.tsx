//src/components/admin/ProjectForm.tsx

import { useState } from 'react';
import { Project } from '@/types';

interface ProjectFormProps {
  project?: Project;
  onSubmit: (formData: FormData) => void;
}

export default function ProjectForm({ project, onSubmit }: ProjectFormProps) {
  const [images, setImages] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData();
  
    const titleInput = form.querySelector('input[name="title"]') as HTMLInputElement;
    const descriptionInput = form.querySelector('textarea[name="description"]') as HTMLTextAreaElement;
    const yearInput = form.querySelector('input[name="year"]') as HTMLInputElement;
    const tagsInput = form.querySelector('input[name="tags"]') as HTMLInputElement;
  
    formData.append('title', titleInput.value);
    formData.append('description', descriptionInput.value);
    formData.append('year', yearInput.value);
    formData.append('tags', tagsInput.value);
  
    images.forEach(image => {
      formData.append('images', image);
    });
  
    console.log('Submitting files:', images.length);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-gray-300 mb-2">Title</label>
        <input
          name="title"
          defaultValue={project?.title}
          className="w-full p-2 bg-gray-900 border border-red-800 rounded text-white"
          required
        />
      </div>

      <div>
        <label className="block text-gray-300 mb-2">Description</label>
        <textarea
          name="description"
          defaultValue={project?.description}
          className="w-full p-2 bg-gray-900 border border-red-800 rounded h-32 text-white"
        />
      </div>

      <div>
        <label className="block text-gray-300 mb-2">Images</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setImages(Array.from(e.target.files || []))}
          className="w-full p-2 bg-gray-900 border border-red-800 rounded"
        />
      </div>

      <div>
        <label className="block text-gray-300 mb-2">Tags</label>
        <input
          name="tags"
          defaultValue={project?.tags.join(', ')}
          placeholder="Separate tags with commas"
          className="w-full p-2 bg-gray-900 border border-red-800 rounded"
        />
      </div>

      <div>
        <label className="block text-gray-300 mb-2">Year</label>
        <input
          type="number"
          name="year"
          defaultValue={project?.year}
          className="w-full p-2 bg-gray-900 border border-red-800 rounded"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-red-600 text-white p-3 rounded hover:bg-red-700"
      >
        {project ? 'Update Project' : 'Create Project'}
      </button>
    </form>
  );
}