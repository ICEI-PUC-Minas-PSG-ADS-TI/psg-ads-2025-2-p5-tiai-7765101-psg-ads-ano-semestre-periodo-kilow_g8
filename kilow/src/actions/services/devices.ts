'use server';

import { ActionResponse } from '../types/auth';
import api from '../utils/api';
import { handleActionError } from '../utils/handleActionError';

const deviceURL = '/devices';

// Interface para o request de cadastro, garantindo tipagem segura
interface CreateDevicePayload {
  nome: string;
  consumoWatts: number;
  usoMinutosHorasDia: number;
  usoDiasSemana: number;
}

// Listar todos os dispositivos
export const getAllDevicesAction = async (): Promise<any> => {
  try {
    const { data } = await api.get(`${deviceURL}/getAll`);
    return { success: true, devices: data };
  } catch (error) {
    return handleActionError(error);
  }
};

// Cadastrar novo dispositivo (com formatação decimal forçada para o Double do Java)
export const createDeviceAction = async (
  rawRequest: any
): Promise<any> => {
  try {
    // Força o parse para garantir que o consumoWatts seja tratado como ponto flutuante (Double)
    const payload: CreateDevicePayload = {
      nome: rawRequest.nome ? rawRequest.nome.trim() : '',
      consumoWatts: rawRequest.consumoWatts ? parseFloat(rawRequest.consumoWatts) : 0.0,
      usoMinutosHorasDia: rawRequest.usoMinutosHorasDia ? parseInt(rawRequest.usoMinutosHorasDia, 10) : 0,
      usoDiasSemana: rawRequest.usoDiasSemana ? parseInt(rawRequest.usoDiasSemana, 10) : 0,
    };

    console.log("Tentando cadastrar dispositivo com o payload formatado:", JSON.stringify(payload));
    
    const { data } = await api.post(`${deviceURL}/register`, payload);
    
    console.log("Sucesso ao cadastrar. Resposta do Java:", data);
    return { success: true, newDevice: data };
  } catch (error: any) {
    console.error("ERRO COMPLETO CAPTURADO NA ACTION:");
    console.error("Mensagem:", error.message);
    
    if (error.response) {
      console.error("Status do Java:", error.response.status);
      console.error("Dados de erro do Java:", error.response.data);
    }
    
    return handleActionError(error);
  }
};

// Extrair potência e nome através do Link (IA)
export const extractWattsFromUrlAction = async (url: string): Promise<any> => {
  try {
    const { data } = await api.post('/ia/getWatts', { url });
    return { success: true, deviceData: data };
  } catch (error) {
    return handleActionError(error);
  }
};

// // Atualizar dispositivo existente
// export const updateDeviceAction = async (
//   id: number, 
//   request: any
// ): Promise<any> => {
//   try {
//     const { data } = await api.put(`${deviceURL}/update/${id}`, request);
//     return { success: true, updatedDevice: data };
//   } catch (error) {
//     return handleActionError(error);
//   }
// };

// // Deletar dispositivo
// export const deleteDeviceAction = async (
//   id: number
// ): Promise<ActionResponse> => {
//   try {
//     await api.delete(`${deviceURL}/delete/${id}`);
//     return { success: true };
//   } catch (error) {
//     return handleActionError(error);
//   }
// };