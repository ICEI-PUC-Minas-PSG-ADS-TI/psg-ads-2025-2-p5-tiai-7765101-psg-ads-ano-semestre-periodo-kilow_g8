import { getBillingDataFromFile } from '@/actions/services/billing';
import { useState } from 'react';
import { useBillingForm } from './useBillingForm';
import { useAppToast } from './useToast';

export const useUploadBillingImage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { billingContext: billingForm } = useBillingForm();
  const { showError, showSuccess, showLoading, removeLoading } = useAppToast();

  const fileUpload = async (file: File) => {
    showLoading(
      'Aguarde mais alguns instantes que estamos terminando de validar os dados para você ;)',
    );
    setIsLoading(true);

    const formFile = new FormData();
    formFile.append('file', file);
    try {
      const response = await getBillingDataFromFile(formFile);
      console.log(response);
      if (response.success) {
        setSuccess(true);
        showSuccess(
          `Dados lidos com sucesso!`,
          `Tudo certo! A IA pode errar, então confirme os dados antes de salvar ;)`,
        );
        billingForm.setBillingAmount(response.billingData?.valorTotal);
        billingForm.setBillingKwh(response.billingData?.consumoTotalKwh);
        billingForm.setBillingNickname(response.billingData?.apelido ?? '');
        billingForm.setReferenceMonth(
          response.billingData?.mesReferencia.toString() ?? '',
        );
        billingForm.setReferenceYear(
          response.billingData?.anoReferencia.toString() ?? '',
        );
      }
    } catch {
      showError('Parece que algo saiu errado :( Tente novamente mais tarde');
    } finally {
      setIsLoading(false);
      removeLoading();
    }
  };

  return {
    fileUpload,
    isLoading,
    success,
  };
};
