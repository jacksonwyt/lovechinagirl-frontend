import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProjectForm from '@/components/admin/ProjectForm';
import { Project } from '@/types';
import { toast } from 'react-hot-toast';
import { projectsApi } from '@/api/projects';

export default function EditProject() {
  const [project, setProject] = useState<Project | null>(null);
  const router = useRouter();
  const { id } = router.query;

  /**
   * Fetch the existing project using projectsApi (Axios)
   */
  const fetchProject = useCallback(async () => {
    try {
      // projectsApi.getOne() returns an AxiosResponse<Project>, so destructure data
      const { data } = await projectsApi.getOne(id as string);
      setProject(data);
    } catch (error) {
      toast.error('Failed to fetch project');
      router.push('/admin/dashboard');
    }
  }, [id, router]);

  useEffect(() => {
    if (id) {
      fetchProject();
    }
  }, [id, fetchProject]);

  /**
   * Submit updated form data using projectsApi (Axios)
   */
  const handleSubmit = useCallback(
    async (formData: FormData) => {
      try {
        await projectsApi.update(id as string, formData);
        toast.success('Project updated successfully');
        router.push('/admin/dashboard');
      } catch (_error) {
        toast.error('Failed to update project');
      }
    },
    [id, router]
  );

  if (!project) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-red-500 mb-8">Edit Project</h1>
        <ProjectForm project={project} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}

