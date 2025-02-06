// src/hooks/useAuth.ts
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { authApi } from '@/api/auth';

export function useAuth() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    try {
      await authApi.verify();
      setIsAuthenticated(true);
    } catch {
      logout();
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (username: string, password: string) => {
    try {
      setLoading(true);
      const { data } = await authApi.login({ username, password });
      localStorage.setItem('token', data.access_token);
      setIsAuthenticated(true);
      router.push('/admin/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    router.push('/admin/login');
  }, [router]);

  return { login, logout, loading, isAuthenticated, checkAuth };
}