import { getBillingsListAction } from '@/actions/services/billing';
import { useEffect, useState } from 'react';
import { useAppToast } from './useToast';
import { BillingListResponse } from '@/actions/types/billing';

export const useGetBillings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [billingListData, setBillingListData] = useState<BillingListResponse>();
  const [success, setSuccess] = useState(false);
  const { showError } = useAppToast();

  const getAllBillings = async () => {
    setIsLoading(true);
    const response = await getBillingsListAction();
    if (response.success) {
      setBillingListData(response.content ?? undefined);
      setSuccess(true);
    } else {
      showError('Parece que algo saiu errado :( Tente novamente mais tarde');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getAllBillings();
  }, []);

  return { billingListData, isLoading, success, refetch: getAllBillings };
};
