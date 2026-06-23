import { ActionResponse } from './auth';

export interface IDevice {
  id: number;
  nome: string;
  consumoWatts: number;
  usoMinutosHorasDia: number;
  usoDiasSemana: number;
  consumoMensalKwh: number;
  categorie?: string;
}

export interface DeviceListResponse {
  total: number;
  dispositivos: IDevice[];
}

export interface DeviceListActionResponse {
  success: boolean;
  content?: DeviceListResponse;
  error?: string;
}

// Para cadastrar, o ID e o cálculo de consumo mensal geralmente não são enviados pelo front-end
export type CreateDeviceActionRequest = Omit<IDevice, 'id' | 'consumoMensalKwh'>;

// Para detalhe/edição, podemos omitir apenas o ID
export type DeviceDetailActionResponse = Omit<IDevice, 'id'>;

export interface DeviceDataFromFileResponse extends ActionResponse {
  deviceData?: CreateDeviceActionRequest;
}

export interface CreateDeviceActionResponse extends ActionResponse {
  newDevice?: IDevice;
}

export interface GetDeviceDetailActionResponse extends ActionResponse {
  device?: DeviceDetailActionResponse;
}