// src/api/projects.ts
import api from './axios';
import { Project } from '@/types';

export const projectsApi = {
  getAll: () => api.get<Project[]>('/projects'),
  getOne: (id: string) => api.get<Project>(`/projects/${id}`),
  create: (data: FormData) => 
    api.post<Project>('/projects', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  update: (id: string, data: FormData) =>
    api.put<Project>(`/projects/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  delete: (id: string) => api.delete(`/projects/${id}`)
};