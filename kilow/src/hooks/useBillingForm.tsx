import { useContext, useState } from 'react';
import { useAppToast } from './useToast';
import { createBillingAction } from '@/actions/services/billing';
import { BillingFormContext } from '@/contexts/BillingFormContext';

export const useBillingForm = () => {
  const billingContext = useContext(BillingFormContext);
  const {
    setReferenceMonth,
    setBillingNickname,
    setReferenceYear,
    setBillingAmount,
    setBillingKwh,
    billingAmount,
    billingKwh,
    billingNickname,
    referenceMonth,
    referenceYear,
  } = billingContext;

  if (!billingContext) {
    throw new Error(
      'useBillingForm deve ser usado dentro de um BillingFormProvider',
    );
  }
  const { showError, showSuccess, showLoading, removeLoading } = useAppToast();

  const clearFields = () => {
    setReferenceMonth('');
    setBillingNickname('');
    setReferenceYear('');
    setBillingAmount(undefined);
    setBillingKwh(undefined);
  };

  const handleRegisterBilling = async (
    e?: React.SubmitEvent<HTMLFormElement>,
  ) => {
    e?.preventDefault();

    if (!referenceMonth || !referenceYear || !billingAmount || !billingKwh) {
      showError(
        'Preencha todos os campos e tente novamente ;)',
        'Erro de Validação',
      );
      clearFields();
      return;
    }

    showLoading(
      'Aguarde mais alguns instantes que estamos terminando de validar os dados para você ;)',
    );

    try {
      const response = await createBillingAction({
        mesReferencia: Number(referenceMonth.slice(0, 2)),
        anoReferencia: Number(referenceYear),
        valorTotal: billingAmount || 0,
        apelido: billingNickname,
        consumoTotalKwh: billingKwh || 0,
      });

      if (response.success) {
        showSuccess(
          `Nova conta cadastrada com sucesso!`,
          `Tudo certo! Conta ${response.newBilling?.apelido} cadastrada :)`,
        );
      }
    } catch {
      showError('Parece que algo saiu errado :( Tente novamente mais tarde');
    } finally {
      removeLoading();
      clearFields();
    }
  };

  return {
    billingContext,
    handleRegisterBilling,
  };
};
