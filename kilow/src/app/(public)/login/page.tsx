'use client';
import { loginAction } from '@/actions/auth';
import { Toast } from '@base-ui/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MiniIdeaLoader from '@/components/loading';
import Image from 'next/image';
import Input from '@/components/input';
import StyledInput from '@/components/input';
import { colors } from '@/components/theme';
import { StyledText } from '../text';

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
    <div style={{ display: 'flex', gap: 20, minHeight: '100vh' }}>
      <div
        style={{
          width: '30%',
          backgroundColor: '#2D5D7B',
          padding: 48,
          gap: 48,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div>
          <div
            style={{
              width: '60%',
              backgroundColor: '#FFD23F',
              borderRadius: 100,
              height: 12,
              marginLeft: 220,
            }}
          >
            {' '}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 24,
            }}
          >
            <StyledText color="yellow" size={96} weight={600}>
              KiloW
            </StyledText>
            <Image
              src="/assets/Greentech.png"
              alt="icone"
              width={85}
              height={85}
            />
          </div>
          <div
            style={{
              width: '60%',
              backgroundColor: '#FFD23F',
              borderRadius: 100,
              height: 12,
              marginLeft: -28,
            }}
          >
            {' '}
          </div>
        </div>
        <StyledText
          color="white"
          size={28}
          weight={350}
          maxWidth={360}
          textAlign="right"
        >
          Pronto para economizar na sua conta de luz?
        </StyledText>
        <img
          src={'/assets/loginPageImage.png'}
          alt="loginImagePage"
          width="100%"
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          width: '70%',
          justifyContent: 'center',
          marginLeft: 180,
        }}
      >
        <img
          src={'/assets/loginImage2.png'}
          width="25%"
          style={{ position: 'absolute', right: 140, zIndex: -1, top: -4 }}
        />
        <div>
          <StyledText size={36} weight={650} color="darkBlue">
            Faça login
          </StyledText>
          <StyledText size={20} weight={400} color="darkBlue">
            Insira seus dados
          </StyledText>
        </div>
        <div
          style={{
            maxWidth: '50%',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          <StyledInput
            value={email}
            onChange={setEmail}
            placeholder="Email"
            type="email"
          />
          <StyledInput
            value={senha}
            onChange={setSenha}
            placeholder="Senha"
            type="password"
          />

          <button
            onClick={handleSubmit}
            style={{
              backgroundColor: colors.darkBlue,
              color: colors.yellow,
              fontSize: 28,
              padding: 8,
              borderRadius: 12,
              border: 0,
              marginBlock: 12,
            }}
          >
            Entrar
          </button>
          <div
            style={{
              backgroundColor: '#1E392A',
              height: 1,
            }}
          />
          <p style={{ textAlign: 'center' }}>
            Ainda não tem uma conta?{' '}
            <span
              onClick={() => router.push('/register')}
              style={{
                cursor: 'pointer',
                color: '#2D5D7B',
                fontWeight: 'bold',
              }}
            >
              Cadastre-se aqui
            </span>{' '}
            e junte-se a nós!
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
