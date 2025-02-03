// src/hooks/useProjects.ts
import { useState, useEffect } from 'react';
import { projectsApi } from '@/api/projects';
import { Project } from '@/types';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data } = await projectsApi.getAll();
      setProjects(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return { projects, loading, refetch: fetchProjects };
}