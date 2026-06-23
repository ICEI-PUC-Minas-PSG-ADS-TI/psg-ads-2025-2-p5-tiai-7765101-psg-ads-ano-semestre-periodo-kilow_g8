'use server';

import { ActionResponse } from '../types/auth';
import { 
  // Importe os tipos correspondentes aos seus DTOs de Device
} from '../types/devices';
import api from '../utils/api';
import { handleActionError } from '../utils/handleActionError';

const deviceURL = '/devices';

// Listar todos os dispositivos
export const getAllDevicesAction = async (): Promise<any> => {
  try {
    const { data } = await api.get(`${deviceURL}/getAll`);
    return { success: true, devices: data };
  } catch (error) {
    return handleActionError(error);
  }
};

// Cadastrar novo dispositivo
export const createDeviceAction = async (
  request: any
): Promise<any> => {
  try {
    const { data } = await api.post(`${deviceURL}/register`, request);
    return { success: true, newDevice: data };
  } catch (error) {
    return handleActionError(error);
  }
};

// Atualizar dispositivo existente
export const updateDeviceAction = async (
  id: number, 
  request: any
): Promise<any> => {
  try {
    const { data } = await api.put(`${deviceURL}/update/${id}`, request);
    return { success: true, updatedDevice: data };
  } catch (error) {
    return handleActionError(error);
  }
};

// Deletar dispositivo
export const deleteDeviceAction = async (
  id: number
): Promise<ActionResponse> => {
  try {
    await api.delete(`${deviceURL}/delete/${id}`);
    return { success: true };
  } catch (error) {
    return handleActionError(error);
  }
};