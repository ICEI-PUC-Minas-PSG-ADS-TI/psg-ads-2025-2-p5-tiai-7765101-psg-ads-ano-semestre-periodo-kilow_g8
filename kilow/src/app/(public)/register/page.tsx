'use client';

import { useState } from 'react';
import { Toast } from '@base-ui/react';
import MiniIdeaLoader from '@/components/loading';
import { userRegisterAction } from '@/actions/auth';
import { useRouter } from 'next/navigation';

const UserRegisterPage = () => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const toastManager = Toast.useToastManager();
  const router = useRouter();

  const handleSubmit = async () => {
    if (!nome || !cpf || !email || !senha) {
      toastManager.add({
        title: 'Erro',
        description: 'Preencha todos os campos e tente novamente ;)',
      });
      return;
    }
    toastManager.add({
      title: 'Carregando',
      description: (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <p>
            Aguarde mais alguns instantes que estamos terminando de validar os
            dados para você ;)
          </p>
          <MiniIdeaLoader />
        </div>
      ),
    });

    try {
      const response = await userRegisterAction({ cpf, email, nome, senha });
      toastManager.add({
        title: response.message.title,
        description: response.message.description,
      });
      if (response.success) router.replace('/login');
    } catch {
      toastManager.add({
        title: 'Ops... algo saiu errado!',
        description:
          'Parece que algo saiu errado :( Tente novamente mais tarde',
      });
    } finally {
      clearFields();
    }
  };

  const clearFields = () => {
    setEmail('');
    setSenha('');
    setCpf('');
    setNome('');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        maxWidth: '60%',
        margin: 'auto',
      }}
    >
      <h3>Faça parte da nossa comunidade!</h3>
      <input
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        type="text"
        placeholder="Nome completo"
      />
      <input
        value={cpf}
        onChange={(e) => setCpf(e.target.value)}
        type="number"
        maxLength={11}
        placeholder="CPF"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
      />
      <input
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        type="text"
        placeholder="Senha"
      />
      <button onClick={handleSubmit}>Enviar</button>
    </div>
  );
};

export default UserRegisterPage;
