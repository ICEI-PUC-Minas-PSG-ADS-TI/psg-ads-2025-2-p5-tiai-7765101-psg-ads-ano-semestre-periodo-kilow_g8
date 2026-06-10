// O que enviamos para a API Java
export interface LoginRequest {
  email: string;
  senha: string;
}

export interface UserRegisterRequest {
  cpf: string;
  email: string;
  nome: string;
  senha: string;
}

export interface ActionResponse {
  success: boolean;
  error?: string;
}

export interface LoginActionResponse extends ActionResponse {
  nome?: string;
}

export interface RegisterActionResponse extends ActionResponse {
  nome?: string;
  email?: string;
}
