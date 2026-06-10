import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginAction } from '@/actions/services/auth';
import { useAppToast } from '@/hooks/useToast';

export const useLogin = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();

  const { showError, showSuccess, showLoading, removeLoading } = useAppToast();

  const clearFields = () => {
    setEmail('');
    setSenha('');
  };

  const handleLogin = async (e?: React.SubmitEvent<HTMLFormElement>) => {
    e?.preventDefault();

    if (!email || !senha) {
      showError(
        'Preencha todos os campos e tente novamente ;)',
        'Erro de Validação',
      );
      return;
    }

    showLoading(
      'Aguarde mais alguns instantes que estamos terminando de validar os dados para você ;)',
    );

    try {
      const response = await loginAction({ email, senha });

      if (response.success) {
        showSuccess(
          `Login realizado com sucesso! Bem-vindo(a) de volta :)`,
          `Tudo certo, ${response.nome}!`,
        );
        router.replace('/home');
      }
    } catch {
      showError('Parece que algo saiu errado :( Tente novamente mais tarde');
    } finally {
      removeLoading();
      clearFields();
    }
  };

  return { email, setEmail, senha, setSenha, handleLogin };
};
