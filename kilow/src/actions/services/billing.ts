'use server';

import {
  BillingDataFromFileResponse,
  BillingListActionResponse,
  CreateBillingActionRequest,
  CreateBillingActionResponse,
} from '../types/billing';
import api from '../utils/api';
import { handleActionError } from '../utils/handleActionError';

const billingURL = '/billings';

export const getBillingsListAction =
  async (): Promise<BillingListActionResponse> => {
    try {
      const { data } = await api.get(billingURL + '/getAll');
      return { success: true, list: data };
    } catch (error) {
      return handleActionError(error);
    }
  };

export const createBillingAction = async (
  request: CreateBillingActionRequest,
): Promise<CreateBillingActionResponse> => {
  try {
    const { data } = await api.post(billingURL + '/register', { ...request });
    return { success: true, newBilling: data };
  } catch (error) {
    return handleActionError(error);
  }
};

export const getBillingDataFromFile = async (
  fileToExtract: FormData,
): Promise<BillingDataFromFileResponse> => {
  try {
    const { data } = await api.post('ia/extract', fileToExtract, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return { success: true, billingData: data };
  } catch (error) {
    return handleActionError(error);
  }
};
