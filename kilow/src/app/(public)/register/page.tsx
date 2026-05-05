'use client';

import { useState } from 'react';
import { Toast } from '@base-ui/react';
import MiniIdeaLoader from '@/components/loading';
import { userRegisterAction } from '@/actions/auth';
import { useRouter } from 'next/navigation';
import { StyledText } from '../text';
import Image from 'next/image';
import StyledInput from '@/components/input';
import { colors } from '@/components/theme';

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
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw' }}>
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingLeft: 120,
          position: 'relative',
        }}
      >
        <img
          src={'/assets/registerPage2.png'}
          style={{
            position: 'absolute',
            right: '8%',
            top: '5%',
            width: '30%',
            zIndex: -1,
          }}
          alt="decoracao"
        />
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <div>
            <StyledText size={36} weight={650} color="darkBlue">
              Cadastre-se
            </StyledText>
            <StyledText size={20} weight={400} color="darkBlue">
              Preencha todos os campos
            </StyledText>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 24,
              maxWidth: '50%',
            }}
          >
            <StyledInput
              label="Nome completo"
              required
              value={nome}
              onChange={setNome}
              placeholder="ex.: Maria José Silva"
              type="text"
            />
            <StyledInput
              label="CPF"
              required
              value={cpf}
              onChange={setCpf}
              placeholder="ex.: 1234567890"
              type="text"
            />
            <StyledInput
              label="Email"
              required
              value={email}
              onChange={setEmail}
              placeholder="ex.: maria@gmail.com"
              type="email"
            />
            <StyledInput
              label="Senha"
              required
              value={senha}
              onChange={setSenha}
              placeholder="ex.: maria123*"
              type="text"
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
              Cadastrar
            </button>
            <div
              style={{
                backgroundColor: '#1E392A',
                height: 1,
              }}
            />
            <p style={{ textAlign: 'center' }}>
              Já tem uma conta?{' '}
              <span
                onClick={() => router.push('/')}
                style={{
                  cursor: 'pointer',
                  color: '#2D5D7B',
                  fontWeight: 'bold',
                }}
              >
                Faça login agora
              </span>{' '}
              e continue de onde parou!
            </p>
          </div>
        </div>
      </div>
      <div
        style={{
          width: '35%',
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
              height: 8,
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
            <StyledText color="yellow" size={76} weight={600}>
              KiloW
            </StyledText>
            <Image
              src="/assets/Greentech.png"
              alt="icone"
              width={75}
              height={77}
            />
          </div>
          <div
            style={{
              width: '60%',
              backgroundColor: '#FFD23F',
              borderRadius: 100,
              height: 8,
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
          maxWidth={300}
          textAlign="left"
        >
          Se junte a nós e entenda suas contas de outra forma ;)
        </StyledText>
        <img
          src={'/assets/registerPage.png'}
          alt="loginImagePage"
          width="100%"
        />
      </div>
    </div>
  );
};

export default UserRegisterPage;
