//src/pages/index.tsx

import { useState, useEffect, useRef, useCallback } from 'react';
import Head from 'next/head';
import PortfolioItem from '@/components/portfolio/PortfolioItem';
import { Project } from '@/types';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '@/api/axios';

const ITEMS_PER_PAGE = 9;

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loadingRef = useRef<HTMLDivElement>(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get(`/projects?page=${page}&limit=${ITEMS_PER_PAGE}`);
      const data = res.data;
      setProjects(prev => [...prev, ...data]);
      setHasMore(data.length === ITEMS_PER_PAGE);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchProjects();
  }, [page, fetchProjects]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage(prev => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading]);

  if (error && projects.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Love China Girl Design - Portfolio</title>
        <meta name="description" content="Modern interior design with Chinese elements" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <PortfolioItem key={project.id} project={project} />
          ))}
        </div>

        {(loading || hasMore) && (
          <div ref={loadingRef} className="flex justify-center mt-8">
            <Loader2 className="w-8 h-8 animate-spin text-red-500" />
          </div>
        )}
      </div>
    </>
  );
}