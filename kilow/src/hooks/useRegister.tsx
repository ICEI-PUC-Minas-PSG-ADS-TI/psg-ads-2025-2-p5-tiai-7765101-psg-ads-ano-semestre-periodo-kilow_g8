import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { userRegisterAction } from '@/actions/services/auth';
import { useAppToast } from './useToast';

export const useRegister = () => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();

  const { showError, showSuccess, showLoading, removeLoading } = useAppToast();

  const clearFields = () => {
    setEmail('');
    setSenha('');
    setCpf('');
    setNome('');
  };

  const handleRegister = async (e?: React.SubmitEvent<HTMLFormElement>) => {
    e?.preventDefault();

    if (!nome || !cpf || !email || !senha) {
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
      const response = await userRegisterAction({ cpf, email, nome, senha });

      if (response.success) {
        showSuccess(
          `Cadastro realizado com sucesso!`,
          `Tudo certo! Usuário ${response.nome} cadastrado :)`,
        );
        router.replace('/login');
      }
    } catch {
      showError('Parece que algo saiu errado :( Tente novamente mais tarde');
    } finally {
      removeLoading();
      clearFields();
    }
  };

  return {
    nome,
    setNome,
    cpf,
    setCpf,
    email,
    setEmail,
    senha,
    setSenha,
    handleRegister,
  };
};
