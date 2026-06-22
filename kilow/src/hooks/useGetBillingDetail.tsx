import { getBillingDetailAction } from '@/actions/services/billing';
import { useEffect, useState } from 'react';
import { useAppToast } from './useToast';
import { BillingDetailActionResponse } from '@/actions/types/billing';

export const useGetBillingDetail = (id: number) => {
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [billingDetail, setBillingDetail] =
    useState<BillingDetailActionResponse | null>(null);
  const { showError } = useAppToast();

  const getBillingDetail = async () => {
    setIsDetailLoading(true);
    const response = await getBillingDetailAction(id);

    if (response.success) {
      setBillingDetail(response.billing || null);
    } else {
      showError('Parece que algo saiu errado :( Tente novamente mais tarde');
    }
    setIsDetailLoading(false);
  };

  useEffect(() => {
    getBillingDetail();
  }, []);

  return { billingDetail, isDetailLoading };
};
