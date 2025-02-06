// src/api/auth.ts
// src/api/auth.ts
import api from './axios';

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
}

export const authApi = {
  login: (credentials: LoginCredentials) => 
    api.post<LoginResponse>('/admin/login', credentials),
  verify: () => api.get('/admin/verify')
};