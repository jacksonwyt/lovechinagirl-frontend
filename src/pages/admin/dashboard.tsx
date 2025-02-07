// src/pages/admin/dashboard.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Project, ShopItem } from '@/types';
import { toast } from 'react-hot-toast';
import { projectsApi } from '@/api/projects';
import { shopApi } from '@/api/shop';

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [shopItems, setShopItems] = useState<ShopItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    fetchProjects();
    fetchShopItems();
  }, [router]);

  const fetchProjects = async () => {
    try {
      const { data } = await projectsApi.getAll();
      setProjects(data);
    } catch (error) {
      // Error toast is handled by axios interceptor
    }
  };

  const fetchShopItems = async () => {
    try {
      const { data } = await shopApi.getAll();
      setShopItems(data);
    } catch (error) {
      // Error toast is handled by axios interceptor
    }
  };

  const deleteProject = async (id: string) => {
    try {
      await projectsApi.delete(id);
      toast.success('Project deleted successfully');
      fetchProjects();
    } catch (error) {
      // Error toast is handled by axios interceptor
    }
  };

  const deleteShopItem = async (id: string) => {
    try {
      await shopApi.delete(id);
      toast.success('Item deleted successfully');
      fetchShopItems();
    } catch (error) {
      // Error toast is handled by axios interceptor
    }
  };

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-6xl mx-auto">
        {/* Projects Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-red-500">Projects</h2>
            <Link 
              href="/admin/projects/create"
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Add Project
            </Link>
          </div>

          <div className="grid gap-6">
            {projects.map(project => (
              <div key={project.id} className="bg-gray-900 p-6 rounded-lg flex justify-between items-center">
                <div>
                  <h3 className="text-xl text-red-400">{project.title}</h3>
                  <p className="text-gray-400">{project.description}</p>
                </div>
                <div className="flex gap-4">
                  <Link 
                    href={`/admin/projects/edit/${project.id}`}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Edit
                  </Link>
                  <button 
                    onClick={() => deleteProject(project.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shop Items Section */}
        <div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-red-500">Shop Items</h2>
            <Link 
              href="/admin/shop/create"
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Add Item
            </Link>
          </div>

          <div className="grid gap-6">
            {shopItems.map(item => (
              <div key={item.id} className="bg-gray-900 p-6 rounded-lg flex justify-between items-center">
                <div>
                  <h3 className="text-xl text-red-400">{item.name}</h3>
                  <p className="text-gray-400">{item.description}</p>
                  <span className={`inline-block px-2 py-1 rounded text-sm ${
                    item.status === 'available' ? 'bg-green-900 text-green-300' :
                    item.status === 'reserved' ? 'bg-yellow-900 text-yellow-300' :
                    'bg-red-900 text-red-300'
                  }`}>
                    {item.status}
                  </span>
                </div>
                <div className="flex gap-4">
                  <Link 
                    href={`/admin/shop/edit/${item.id}`}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Edit
                  </Link>
                  <button 
                    onClick={() => deleteShopItem(item.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}