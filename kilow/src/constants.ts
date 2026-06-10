export const APP_PATHS = {
  LOGIN: '/login',
  REGISTER: '/register',
  HOME: '/home',
  BILLINGS: '/billings',
  DEVICES: '/devices',
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
};

export type RouteKey = keyof typeof APP_ROUTES;
