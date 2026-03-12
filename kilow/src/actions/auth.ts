'use server';

import axios, { AxiosError } from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

interface loginRequest {
  email: string;
  senha: string;
}

interface userRegisterRequest {
  cpf: string;
  email: string;
  nome: string;
  senha: string;
}

interface userRegisterResponse {
  email?: string;
  nome?: string;
  success?: boolean;
  message: { title: string; description: string };
}

interface loginResponse {
  nome?: string;
  token?: string;
  message: { title: string; description: string };
  success?: boolean;
}

export const loginAction = async (
  request: loginRequest,
): Promise<loginResponse> => {
  try {
    const { data } = await api.post('/login', request);
    const cookieStore = await cookies();
    cookieStore.set('auth-token', data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24,
    });
    return {
      message: {
        title: `Tudo certo, ${data.nome}!`,
        description:
          'Login realizado com sucesso! Você já será redirecionado :)',
      },
      nome: data.nome,
      success: true,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        message: {
          title: 'Algo saiu errado :(',
          description:
            error.response?.data?.message || 'Valide os dados inseridos',
        },
      };
    }
    return {
      message: {
        title: 'Algo saiu errado :(',
        description: 'Tente novamente mais tarde',
      },
    };
  }
};

export const logoutAction = async () => {
  const cookieStore = await cookies();
  cookieStore.delete('auth-token');
  redirect('/login');
};

export const userRegisterAction = async (
  request: userRegisterRequest,
): Promise<userRegisterResponse> => {
  try {
    const { data } = await api.post('/register', request);
    return {
      success: true,
      message: {
        title: 'Sucesso!',
        description: 'Usuário criado com sucesso :)',
      },
      email: data.email,
      nome: data.nome,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        message: {
          title: 'Algo saiu errado :(',
          description:
            error.response?.data?.message || 'Valide os dados inseridos',
        },
      };
    }
  }
  return {
    message: {
      title: 'Algo saiu errado :(',
      description: 'Tente novamente mais tarde',
    },
  };
};
