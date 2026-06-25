'use client';
import { useState } from 'react';
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

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;

const LoginPage = () => {
  const { email, setEmail, senha, setSenha, handleLogin } = useLogin();
  const router = useRouter();
  const [errors, setErrors] = useState({ email: '', senha: '' });

  const validate = () => {
    const newErrors = { email: '', senha: '' };

    if (!email?.trim()) {
      newErrors.email = 'Informe seu email.';
    } else if (!EMAIL_REGEX.test(email)) {
      newErrors.email = 'Digite um email válido.';
    }

    if (!senha?.trim()) {
      newErrors.senha = 'Informe sua senha.';
    } else if (senha.length < MIN_PASSWORD_LENGTH) {
      newErrors.senha = `A senha deve ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`;
    }

    setErrors(newErrors);
    return !newErrors.email && !newErrors.senha;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      handleLogin(e);
    }
  };

  return (
    <AuthLayout
      bannerImageSrc="/assets/loginPageImage.png"
      bannerPosition="left"
      bannerText="Pronto para economizar na sua conta de luz?"
    >
      <FormWrapper>
        <DecorativeImage src="/assets/login.png" alt="Decoração" />
        <ContentContainer>
          <header>
            <StyledText size={36} weight={650} color="darkBlue">
              Faça login
            </StyledText>
            <StyledText size={20} weight={400} color="darkBlue">
              Insira seus dados
            </StyledText>
          </header>
          <FormContainer onSubmit={onSubmit}>
            <div>
              <StyledInput
                value={email}
                onChange={(value) => {
                  setEmail(value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                }}
                placeholder="Email"
                type="email"
              />
              {errors.email && (
                <StyledText size={13} weight={400} color="red" style={{ marginTop: 4 }}>
                  {errors.email}
                </StyledText>
              )}
            </div>

            <div>
              <StyledInput
                value={senha}
                onChange={(value) => {
                  setSenha(value);
                  if (errors.senha) setErrors((prev) => ({ ...prev, senha: '' }));
                }}
                placeholder="Senha"
                type="password"
              />
              {errors.senha && (
                <StyledText size={13} weight={400} color="red" style={{ marginTop: 4 }}>
                  {errors.senha}
                </StyledText>
              )}
            </div>

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
