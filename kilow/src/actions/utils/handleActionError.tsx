import { AxiosError } from 'axios';
import { ActionResponse } from '../types/auth';

export const handleActionError = (error: unknown): ActionResponse => {
  if (error instanceof AxiosError) {
    console.log('Status:', error.response?.status);
    console.log('Mensagem geral:', error.message);
    console.log('Dados backend:', error.response?.data);
    return {
      success: false,
      error:
        error.response?.data?.message ||
        'Valide os dados inseridos e tente novamente.',
    };
  }
  return {
    success: false,
    error: 'Ocorreu um erro inesperado. Tente novamente mais tarde.',
  };
};
