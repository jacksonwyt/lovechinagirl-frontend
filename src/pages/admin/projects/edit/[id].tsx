import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProjectForm from '@/components/admin/ProjectForm';
import { Project } from '@/types';
import { toast } from 'react-hot-toast';

export default function EditProject() {
  const [project, setProject] = useState<Project | null>(null);
  const router = useRouter();
  const { id } = router.query;

  const fetchProject = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error('Failed to fetch project');
      const data = await res.json();
      setProject(data);
    } catch (_error) {
      toast.error('Failed to fetch project');
      router.push('/admin/dashboard');
    }
  }, [id, router]);

  useEffect(() => {
    if (id) {
      fetchProject();
    }
  }, [id, fetchProject]);

  const handleSubmit = useCallback(
    async (formData: FormData) => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/projects/${id}`,
          {
            method: 'PUT',
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
          }
        );
        if (!res.ok) throw new Error('Failed to update project');
        toast.success('Project updated successfully');
        router.push('/admin/dashboard');
      } catch (_error) {
        toast.error('Failed to update project');
      }
    },
    [id, router]
  );

  if (!project) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-red-500 mb-8">Edit Project</h1>
        <ProjectForm project={project} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
