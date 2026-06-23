'use client';

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

          <FormContainer onSubmit={handleRegister}>
            <FieldWrapper label="Nome completo" isRequired variant="big">
              <StyledInput
                value={nome}
                onChange={setNome}
                placeholder="ex.: Maria José Silva"
                type="text"
              />
            </FieldWrapper>
            <FieldWrapper label="CPF" isRequired variant="big">
              <StyledInput
                value={cpf}
                onChange={setCpf}
                placeholder="ex.: 1234567890"
                type="text"
              />
            </FieldWrapper>
            <FieldWrapper label="Email" isRequired variant="big">
              <StyledInput
                value={email}
                onChange={setEmail}
                placeholder="ex.: maria@gmail.com"
                type="email"
              />
            </FieldWrapper>

            <FieldWrapper label="Senha" isRequired variant="big">
              <StyledInput
                value={senha}
                onChange={setSenha}
                placeholder="ex.: maria123*"
                type="password"
              />
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
