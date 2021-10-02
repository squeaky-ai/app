
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const BLANK_ROUTES = [
  '/ping',
  '/developers',
  '/auth/login',
  '/auth/signup',
  '/auth/reset',
  '/auth/accept',
];

export const BASE_PATH = publicRuntimeConfig.basePath;

export const MM_SS_REGEX = /\d\d:\d\d/;

export const DD_MM_YYYY_REGEX = /\d\d\/\d\d\/\d\d\d\d/;
