'use client';
import { StyledText } from '@/components/text';
import BillingForm from '@/components/billingForm';
import Button from '@/components/button';
import { colors } from '@/components/theme';
import { useState } from 'react';
import { BillingFormContainer, InfoContainer, OptionsContainer } from './style';
import { CreateBillingTabs, registerType } from './utils';
import PrivateLayout from '@/components/Layout/privateSection';
import ImageUpload from '@/components/imageUpload';
import { ButtonsContainer } from '@/components/billingForm/style';
import { useBillingForm } from '@/hooks/useBillingForm';
import { BillingFormProvider } from '@/contexts/BillingFormContext';
import { useRouter } from 'next/navigation';

const CreateBillingContent = () => {
  const { handleRegisterBilling } = useBillingForm();
  const [selectedRegisterType, setSelectedRegisterType] =
    useState<registerType>('manual');
  const router = useRouter();

  const renderContent = () => {
    switch (selectedRegisterType) {
      case 'manual':
        return <BillingForm />;
      case 'ia':
        return <ImageUpload />;
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: 24,
      }}
    >
      <BillingFormContainer width="70%">
        <OptionsContainer>
          {CreateBillingTabs.map((tab) => {
            const isSelected = selectedRegisterType === tab.registerType;
            return (
              <Button
                onClick={() => {
                  setSelectedRegisterType(tab.registerType);
                }}
                variant={isSelected ? 'white' : 'transparent'}
                size="small"
                style={{
                  color: !isSelected ? colors.darkBlue + 80 : colors.darkBlue,
                  flex: 0.5,
                }}
              >
                {tab.tabLabel}
              </Button>
            );
          })}
        </OptionsContainer>
        {renderContent()}
        <ButtonsContainer>
          <Button
            variant="darkBlue"
            size="small"
            onClick={() => handleRegisterBilling()}
          >
            Salvar conta
          </Button>
          <Button variant="gray" size="small" onClick={() => router.back()}>
            Cancelar
          </Button>
        </ButtonsContainer>
      </BillingFormContainer>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          maxWidth: '35%',
        }}
      >
        <InfoContainer>
          <StyledText color="darkBlue" size={13} weight={700}>
            O que é a tarifa efetiva?
          </StyledText>
          <StyledText color="darkGray" size={12} weight={400}>
            É o custo real de 1 kWh para você, já incluindo todos os impostos,
            taxas e bandeiras tarifárias — sem precisar entender cada item da
            fatura.
          </StyledText>
          <StyledText
            color="darkBlue"
            size={12}
            weight={600}
            style={{
              backgroundColor: colors.lightGray,
              padding: 12,
              textAlign: 'center',
              borderRadius: 8,
            }}
          >
            R$ total ÷ kWh total = R$/kWh
          </StyledText>
        </InfoContainer>
        <InfoContainer>
          <StyledText color="darkBlue" size={13} weight={700}>
            Onde encontrar na fatura?
          </StyledText>
          <StyledText color="darkBlue" size={12} weight={400}>
            <b>Valor total:</b> "Total a pagar" ou "Valor da fatura"
          </StyledText>
          <StyledText color="darkBlue" size={12} weight={400}>
            <b>Consumo:</b> "Consumo do período" em kWh
          </StyledText>
          <StyledText color="darkBlue" size={12} weight={400}>
            <b>Mês/Ano ref.:</b> "Referência" ou datas de leitura
          </StyledText>
        </InfoContainer>
      </div>
    </div>
  );
};

const CreateBillingPage = () => {
  return (
    <PrivateLayout
      backOption
      pageTitle="Nova fatura de energia"
      pageSubtitle="Cadastre sua conta para calcular a tarifa efetiva e fazer análises"
    >
      <BillingFormProvider>
        <CreateBillingContent />
      </BillingFormProvider>
    </PrivateLayout>
  );
};

export default CreateBillingPage;
