'use server';

import { AxiosError } from 'axios';
import { cookies } from 'next/headers';
import { api } from './auth';


interface CreateDeviceRequest {
  nome: string;
  usoMinutosHorasDia: number;
  usoDiasSemana: number;
  consumoWatts: number;
}

interface CreateDeviceResponse {
  nome?: string;
  id?: number;
  success?: boolean;
  message: { title: string; description: string };
}

interface GetDeviceResponse {
  id: number;
  nome: string;
  consumoWatts: number;
  usoMinutosHorasDia: number;
  usoDiasSemana: number;
  consumoMensalKwh: number;
}

interface GetAllDevicesResponse {
  devices?: GetDeviceResponse[];
  success?: boolean;
  message: { title: string; description: string };
}

// ─── Helper: pega o token do cookie e injeta no header ────────────────────────

async function getAuthHeader() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// ─── Actions ──────────────────────────────────────────────────────────────────

export const createDeviceAction = async (
  request: CreateDeviceRequest,
): Promise<CreateDeviceResponse> => {
  try {
    const headers = await getAuthHeader();
    const { data } = await api.post('/devices/register', request, { headers });

    return {
      success: true,
      nome: data.nome,
      id: data.id,
      message: {
        title: 'Dispositivo cadastrado!',
        description: `${data.nome} foi cadastrado com sucesso :)`,
      },
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        message: {
          title: 'Algo saiu errado :(',
          description:
            error.response?.data?.message || 'Valide os dados inseridos',
        },
      };
    }
    return {
      message: {
        title: 'Algo saiu errado :(',
        description: 'Tente novamente mais tarde',
      },
    };
  }
};

export const getAllDevicesAction = async (): Promise<GetAllDevicesResponse> => {
  try {
    const headers = await getAuthHeader();
    const { data } = await api.get('/devices/getAll', { headers });

    return {
      success: true,
      devices: data,
      message: {
        title: 'Sucesso!',
        description: 'Dispositivos carregados com sucesso',
      },
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        message: {
          title: 'Algo saiu errado :(',
          description:
            error.response?.data?.message || 'Erro ao buscar dispositivos',
        },
      };
    }
    return {
      message: {
        title: 'Algo saiu errado :(',
        description: 'Tente novamente mais tarde',
      },
    };
  }
};