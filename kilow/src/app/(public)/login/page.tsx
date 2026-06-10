'use client';

import { useRouter } from 'next/navigation';
import AuthLayout from '@/components/Layout/authPages';
import StyledInput from '@/components/input';
import Button from '@/components/button';
import { StyledText } from '@/components/text';

import { useLogin } from '@/hooks/useLogin';
import {
  FormWrapper,
  DecorativeImage,
  ContentContainer,
  FormContainer,
  Divider,
  FooterText,
} from '@/components/Layout/authPages/style';

const LoginPage = () => {
  const { email, setEmail, senha, setSenha, handleLogin } = useLogin();
  const router = useRouter();

  return (
    <AuthLayout
      bannerImageSrc="/assets/loginPageImage.png"
      bannerPosition="left"
      bannerText="Pronto para economizar na sua conta de luz?"
    >
      <FormWrapper>
        <DecorativeImage src="/assets/loginImage2.png" alt="Decoração" />

        <ContentContainer>
          <header>
            <StyledText size={36} weight={650} color="darkBlue">
              Faça login
            </StyledText>
            <StyledText size={20} weight={400} color="darkBlue">
              Insira seus dados
            </StyledText>
          </header>

          <FormContainer onSubmit={handleLogin}>
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

            <Button type="submit" variant="darkBlue" size="large">
              Entrar
            </Button>

            <Divider />

            <FooterText>
              Ainda não tem uma conta?{' '}
              <span onClick={() => router.push('/register')}>
                Cadastre-se aqui
              </span>{' '}
              e junte-se a nós!
            </FooterText>
          </FormContainer>
        </ContentContainer>
      </FormWrapper>
    </AuthLayout>
  );
};

export default LoginPage;
