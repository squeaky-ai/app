import getConfig from 'next/config';
import { Currency } from 'types/graphql';
import type { RelativeTime } from 'types/common';

const { publicRuntimeConfig } = getConfig();

export const BASE_PATH = publicRuntimeConfig.basePath;

export const MM_SS_REGEX = /\d\d:\d\d/;

export const DD_MM_YYYY_REGEX = /\d\d\/\d\d\/\d\d\d\d/;

export const YYYY_MM_DD_REGEX = /\d\d\d\d-\d\d-\d\d/;

export const HH_MM_REGEX = /\d\d:\d\d/;

export const HEX_REGEX = /#.{6}/;

export enum Breakpoints {
  DESKTOP = 1260,
  TABLET = 960,
  MOBILE = 540
}

export const TIME_PERIODS: { name: string, key: RelativeTime }[] = [
  {
    name: 'Today',
    key: 'today',
  },
  {
    name: 'Yesterday',
    key: 'yesterday',
  },
  {
    name: 'Past 7 days',
    key: 'past_seven_days',
  },
  {
    name: 'Past 14 days',
    key: 'past_fourteen_days',
  },
  {
    name: 'Past 30 days',
    key: 'past_thirty_days',
  },
  {
    name: 'Past 6 months',
    key: 'past_six_months',
  },
  {
    name: 'Past year',
    key: 'past_year',
  },
];

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  EUR: '€',
  GBP: '£',
  USD: '$'
};

export enum DeviceWidths {
  DESKTOP = 1280,
  TABLET = 800,
  MOBILE = 380,
}
