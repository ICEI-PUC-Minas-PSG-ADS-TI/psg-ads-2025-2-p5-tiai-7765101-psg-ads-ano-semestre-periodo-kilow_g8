'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthLayout from '@/components/Layout/authPages';
import StyledInput from '@/components/input';
import Button from '@/components/button';
import { StyledText } from '@/components/text';
import { useRegister } from '@/hooks/useRegister';
import {
  FormWrapper,
  DecorativeImage,
  ContentContainer,
  FormContainer,
  Divider,
  FooterText,
} from '@/components/Layout/authPages/style';
import FieldWrapper from '@/components/fieldWrapper';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CPF_DIGITS_REGEX = /^\d{11}$/;
const MIN_PASSWORD_LENGTH = 6;

const UserRegisterPage = () => {
  const {
    nome,
    setNome,
    cpf,
    setCpf,
    email,
    setEmail,
    senha,
    setSenha,
    handleRegister,
  } = useRegister();
  const router = useRouter();
  const [errors, setErrors] = useState({
    nome: '',
    cpf: '',
    email: '',
    senha: '',
  });

  const clearError = (field) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const newErrors = { nome: '', cpf: '', email: '', senha: '' };

    if (!nome?.trim()) {
      newErrors.nome = 'Informe seu nome completo.';
    }

    const cpfDigits = cpf?.replace(/\D/g, '') ?? '';
    if (!cpf?.trim()) {
      newErrors.cpf = 'Informe seu CPF.';
    } else if (!CPF_DIGITS_REGEX.test(cpfDigits)) {
      newErrors.cpf = 'O CPF deve ter 11 números.';
    }

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
    return Object.values(newErrors).every((msg) => !msg);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      handleRegister(e);
    }
  };

  return (
    <AuthLayout
      bannerPosition="right"
      bannerText="Se junte a nós e entenda suas contas de outra forma ;)"
      bannerImageSrc="/assets/registerPage.png"
    >
      <FormWrapper>
        <DecorativeImage
          src="/assets/registerPage2.png"
          alt="Decoração"
          style={{ width: '30%', right: '8%', top: '5%' }}
        />
        <ContentContainer>
          <header>
            <StyledText size={36} weight={650} color="darkBlue">
              Cadastre-se
            </StyledText>
            <StyledText size={20} weight={400} color="darkBlue">
              Preencha todos os campos
            </StyledText>
          </header>
          <FormContainer onSubmit={onSubmit}>
            <FieldWrapper label="Nome completo" isRequired variant="big">
              <StyledInput
                value={nome}
                onChange={(value) => {
                  setNome(value);
                  clearError('nome');
                }}
                placeholder="ex.: Maria José Silva"
                type="text"
              />
              {errors.nome && (
                <StyledText size={13} weight={400} color="red" style={{ marginTop: 4 }}>
                  {errors.nome}
                </StyledText>
              )}
            </FieldWrapper>

            <FieldWrapper label="CPF" isRequired variant="big">
              <StyledInput
                value={cpf}
                onChange={(value) => {
                  setCpf(value);
                  clearError('cpf');
                }}
                placeholder="ex.: 1234567890"
                type="text"
              />
              {errors.cpf && (
                <StyledText size={13} weight={400} color="red" style={{ marginTop: 4 }}>
                  {errors.cpf}
                </StyledText>
              )}
            </FieldWrapper>

            <FieldWrapper label="Email" isRequired variant="big">
              <StyledInput
                value={email}
                onChange={(value) => {
                  setEmail(value);
                  clearError('email');
                }}
                placeholder="ex.: maria@gmail.com"
                type="email"
              />
              {errors.email && (
                <StyledText size={13} weight={400} color="red" style={{ marginTop: 4 }}>
                  {errors.email}
                </StyledText>
              )}
            </FieldWrapper>

            <FieldWrapper label="Senha" isRequired variant="big">
              <StyledInput
                value={senha}
                onChange={(value) => {
                  setSenha(value);
                  clearError('senha');
                }}
                placeholder="ex.: maria123*"
                type="password"
              />
              {errors.senha && (
                <StyledText size={13} weight={400} color="red" style={{ marginTop: 4 }}>
                  {errors.senha}
                </StyledText>
              )}
            </FieldWrapper>

            <Button type="submit" variant="darkBlue" size="large">
              Cadastrar
            </Button>
            <Divider />
            <FooterText>
              Já tem uma conta?{' '}
              <span onClick={() => router.push('/login')}>
                {' '}
                Faça login agora
              </span>{' '}
              e continue de onde parou!
            </FooterText>
          </FormContainer>
        </ContentContainer>
      </FormWrapper>
    </AuthLayout>
  );
};

export default UserRegisterPage;
