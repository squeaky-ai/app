
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const BLANK_ROUTES = [
  '/developers',
  '/auth/login',
  '/auth/signup',
  '/auth/reset',
  '/auth/accept',
];

export const BASE_PATH = publicRuntimeConfig.basePath;
