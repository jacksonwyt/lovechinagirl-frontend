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
    api.post<LoginResponse>('/auth/login', credentials),
};