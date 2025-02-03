// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { authApi } from '@/api/auth';
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  exp: number;
  username: string;
  sub: string;
}

export function useAuth() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        logout();
        return;
      }

      setIsAuthenticated(true);

      // Set up auto-logout
      const timeUntilExpiry = (decoded.exp - currentTime) * 1000;
      setTimeout(logout, timeUntilExpiry);
    } catch {
      logout();
    }
  };

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

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    router.push('/admin/login');
  };

  return { login, logout, loading, isAuthenticated };
}