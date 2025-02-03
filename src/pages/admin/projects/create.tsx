// src/pages/admin/projects/create.tsx
import { useRouter } from 'next/router';
import ProjectForm from '@/components/admin/ProjectForm';
import { toast } from 'react-hot-toast';

export default function CreateProject() {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });

      if (!res.ok) throw new Error('Failed to create project');
      
      toast.success('Project created successfully');
      router.push('/admin/dashboard');
    } catch (error) {
      toast.error('Failed to create project');
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