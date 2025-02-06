// portfolio-frontend/src/pages/admin/login.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

export default function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      
      if (!res.ok) throw new Error('Invalid credentials');
      
      const { access_token } = await res.json();
      localStorage.setItem('token', access_token);
      toast.success('Login successful');
      router.push('/admin/dashboard');
    } catch (error) {
      toast.error('Invalid username or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form onSubmit={handleSubmit} className="p-8 bg-gray-900 rounded-lg w-96">
        <h1 className="text-2xl font-bold text-red-500 mb-6">Admin Login</h1>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 bg-gray-800 text-white border border-red-800 rounded placeholder-white/70"
            onChange={e => setCredentials({ ...credentials, username: e.target.value })}
            disabled={isLoading}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 bg-gray-800 text-white border border-red-800 rounded placeholder-white/70"
            onChange={e => setCredentials({ ...credentials, password: e.target.value })}
            disabled={isLoading}
          />
          <button 
            type="submit"
            className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <Loader2 className="animate-spin mr-2" size={18} />
                Logging in...
              </span>
            ) : 'Login'}
          </button>
        </div>
      </form>
    </div>
  );
}