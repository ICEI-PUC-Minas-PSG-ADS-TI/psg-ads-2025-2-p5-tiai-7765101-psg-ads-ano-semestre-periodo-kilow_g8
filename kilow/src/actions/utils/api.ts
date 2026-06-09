import axios from 'axios';
import { APP_PATHS } from '@/constants';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      (error.response?.status === 401 && typeof window !== 'undefined') ||
      error.response?.status === 403
    ) {
      window.location.href = APP_PATHS.LOGIN;
    }
    return Promise.reject(error);
  },
);

api.interceptors.request.use(async (config) => {
  if (typeof window === 'undefined') {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default api;
