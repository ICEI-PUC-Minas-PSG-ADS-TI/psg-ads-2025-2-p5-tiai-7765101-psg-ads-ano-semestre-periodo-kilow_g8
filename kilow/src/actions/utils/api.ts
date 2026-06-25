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
    console.log("Interceptou a URL")
    if (
      (error.response?.status === 401 && typeof window !== 'undefined') ||
      error.response?.status === 403
    ) {
      console.log("entrou no erro");
      window.location.href = APP_PATHS.LOGIN;
    }
    return Promise.reject(error);
  },
);

api.interceptors.request.use(async (config) => {
  console.log("Interceptou a URL");
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

// import axios from 'axios';
// import { APP_PATHS } from '@/constants';

// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true,
// });

// // Interceptador de Resposta (Tratamento de erros globais)
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.log("Interceptou a URL com erro:", error.response?.status);
    
//     if (
//       (error.response?.status === 401 && typeof window !== 'undefined') ||
//       error.response?.status === 403
//     ) {
//       console.log("entrou no erro de autenticação (401/403). Redirecionando...");
//       window.location.href = APP_PATHS.LOGIN;
//     }
    
//     return Promise.reject(error);
//   },
// );

// // Interceptador de Requisição (Injeção do token JWT considerando Cliente e Servidor)
// api.interceptors.request.use(async (config) => {
//   console.log("Interceptando chamada para a URL:", config.url);

//   let token = null;

//   // 1. Se estiver rodando no navegador (Client-Side), lê o cookie direto do document.cookie
//   if (typeof window !== 'undefined') {
//     const match = document.cookie.match(new RegExp('(^| )auth-token=([^;]+)'));
//     if (match) {
//       token = match[2];
//       console.log("Token lido via Client-Side (document.cookie)");
//     }
//   } 
//   // 2. Se estiver rodando no Servidor (Server-Side), importa os cookies do Next.js
//   else {
//     const { cookies } = await import('next/headers');
//     const cookieStore = await cookies();
//     token = cookieStore.get('auth-token')?.value;
//     if (token) {
//       console.log("Token lido via Server-Side (next/headers)");
//     }
//   }

//   // Se o token foi encontrado, injeta no cabeçalho Authorization
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//     console.log("🔑 [Interceptor] Token injetado no header da requisição com sucesso.");
//   } else {
//     console.warn("⚠️ [Interceptor] Nenhum 'auth-token' encontrado para esta chamada.");
//   }

//   return config;
// });

// export default api;
