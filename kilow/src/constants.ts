export const APP_PATHS = {
  LOGIN: '/login',
  REGISTER: '/register',
  HOME: '/home',
  BILLINGS: '/billings',
  DEVICES: '/devices',
  DEVICE_REGISTER: '/deviceRegister',
  DEVICE_REGISTER_LINK: '/deviceRegisterLink',
  DEVICE_DETAIL: '/deviceDetail',
};

export const APP_ROUTES = {
  home: {
    label: 'Início',
    path: APP_PATHS.HOME,
  },
  billings: {
    label: 'Contas',
    path: APP_PATHS.BILLINGS,
  },
  devices: {
    label: 'Dispositivos',
    path: APP_PATHS.DEVICES,
  },
  deviceRegister: {
    label: 'Cadastrar Dispositivo',
    path: APP_PATHS.DEVICE_REGISTER,
  },
  deviceRegisterLink: {
    label: 'Cadastro por Link (IA)',
    path: APP_PATHS.DEVICE_REGISTER_LINK,
  },
};

export type RouteKey = keyof typeof APP_ROUTES;
