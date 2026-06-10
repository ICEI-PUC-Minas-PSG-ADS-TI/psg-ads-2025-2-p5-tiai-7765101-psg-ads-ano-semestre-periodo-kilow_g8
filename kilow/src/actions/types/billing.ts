import { ActionResponse } from './auth';
export interface IBilling {
  id: number;
  apelido?: string;
  mesReferencia: number;
  anoReferencia: number;
  valorTotal: number;
  consumoTotalKwh: number;
  tarifaEfetiva: number;
}

export interface BillingListActionResponse {
  success: boolean;
  list?: IBilling[];
  error?: string;
}

export type CreateBillingActionRequest = Omit<IBilling, 'id' | 'tarifaEfetiva'>;

export interface BillingDataFromFileResponse extends ActionResponse {
  billingData?: CreateBillingActionRequest;
}

export interface CreateBillingActionResponse extends ActionResponse {
  newBilling?: Omit<IBilling, 'valorTotal' | 'consumoTotalKwh'>;
}
