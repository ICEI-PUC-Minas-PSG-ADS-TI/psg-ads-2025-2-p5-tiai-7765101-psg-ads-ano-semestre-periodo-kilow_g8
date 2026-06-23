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

export interface BillingListResponse {
  total: number;
  contas: IBilling[];
  contaMaisCara: BillingDetailActionResponse;
  tarifaMediaEfetiva: number;
}

export interface BillingListActionResponse {
  success: boolean;
  content?: BillingListResponse;
  error?: string;
}

export type CreateBillingActionRequest = Omit<IBilling, 'id' | 'tarifaEfetiva'>;

export type BillingDetailActionResponse = Omit<IBilling, 'id'>;

export interface BillingDataFromFileResponse extends ActionResponse {
  billingData?: CreateBillingActionRequest;
}

export interface CreateBillingActionResponse extends ActionResponse {
  newBilling?: Omit<IBilling, 'valorTotal' | 'consumoTotalKwh'>;
}

export interface GetBillingDetailActionResponse extends ActionResponse {
  billing?: BillingDetailActionResponse;
}
