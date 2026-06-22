import { deleteBillingAction } from '@/actions/services/billing';
import { useState } from 'react';
import { useAppToast } from './useToast';

export const useDeleteBillings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { showError, showSuccess } = useAppToast();

  const handleDelete = async (id: number) => {
    setIsLoading(true);
    const response = await deleteBillingAction(id);
    if (response.success) {
      setSuccess(true);
      showSuccess('Conta deletada com sucesso :)');
    } else {
      showError('Parece que algo saiu errado :( Tente novamente mais tarde');
    }
    setIsLoading(false);
  };

  return { isLoading, success, handleDelete };
};
