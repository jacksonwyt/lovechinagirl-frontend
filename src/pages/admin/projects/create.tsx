// src/pages/admin/projects/create.tsx
import { useRouter } from 'next/router';
import ProjectForm from '@/components/admin/ProjectForm';
import { toast } from 'react-hot-toast';
import { projectsApi } from '@/api/projects';

export default function CreateProject() {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    try {
      // Make sure FormData includes files
      const filesArray = Array.from(formData.getAll('images'));
      if (!filesArray.length) {
        throw new Error('Please select at least one image');
      }
  
      await projectsApi.create(formData);
      toast.success('Project created successfully');
      router.push('/admin/dashboard');
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-red-500 mb-8">Create New Project</h1>
        <ProjectForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}