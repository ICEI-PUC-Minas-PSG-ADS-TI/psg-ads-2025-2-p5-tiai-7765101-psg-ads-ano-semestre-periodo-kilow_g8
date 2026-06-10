'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import api from '../utils/api';
import { handleActionError } from '../utils/handleActionError';
import {
  LoginActionResponse,
  LoginRequest,
  RegisterActionResponse,
  UserRegisterRequest,
} from '../types/auth';

export const loginAction = async (
  request: LoginRequest,
): Promise<LoginActionResponse> => {
  try {
    const { data } = await api.post('/login', request);

    const cookieStore = await cookies();

    cookieStore.set('auth-token', data.token, {
      httpOnly: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24,
    });

    return { success: true, nome: data.nome };
  } catch (error) {
    return handleActionError(error);
  }
};

export const logoutAction = async () => {
  const cookieStore = await cookies();
  cookieStore.delete('auth-token');
  redirect('/login');
};

export const userRegisterAction = async (
  request: UserRegisterRequest,
): Promise<RegisterActionResponse> => {
  try {
    const { data } = await api.post('/register', request);
    return { success: true, email: data.email, nome: data.nome };
  } catch (error) {
    return handleActionError(error);
  }
};
