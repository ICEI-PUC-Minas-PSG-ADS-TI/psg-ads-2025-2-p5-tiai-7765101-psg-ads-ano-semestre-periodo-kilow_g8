'use client';
import { loginAction } from '@/actions/auth';
import { Toast } from '@base-ui/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MiniIdeaLoader from '@/components/loading';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const router = useRouter();
  const toastManager = Toast.useToastManager();

  const handleSubmit = async () => {
    if (!email || !senha) {
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
      const response = await loginAction({ email, senha });

      toastManager.add({
        title: response.message.title,
        description: response.message.description,
      });

      if (response.success) router.replace('/home');
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
      <h3>Login</h3>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        placeholder="Senha"
      />
      <p>
        Ainda não possui uma conta?{' '}
        <span
          onClick={() => router.push('/register')}
          style={{ cursor: 'pointer', color: '#0070f3', fontWeight: 'bold' }}
        >
          Crie sua conta aqui!
        </span>
      </p>
      <button onClick={handleSubmit}>Entrar</button>
    </div>
  );
};

export default LoginPage;
