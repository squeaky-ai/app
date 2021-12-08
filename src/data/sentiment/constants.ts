import { BASE_PATH } from 'data/common/constants';
import type { Column } from 'types/common';

export const EMOJIS: Record<number, string> = {
  0: `${BASE_PATH}/emojis/experience-0.svg`,
  1: `${BASE_PATH}/emojis/experience-1.svg`,
  2: `${BASE_PATH}/emojis/experience-2.svg`,
  3: `${BASE_PATH}/emojis/experience-3.svg`,
  4: `${BASE_PATH}/emojis/experience-4.svg`,
};

export const COLUMNS: Column[] = [
  {
    label: 'Rating',
    width: '100px',
    disabled: true,
    position: 1,
  },
  {
    label: 'Visitor ID',
    width: '1fr',
    disabled: false,
    position: 2,
  },
  {
    label: 'Recording ID',
    width: '1fr',
    disabled: false,
    position: 3,
  },
  {
    label: 'Date & Time',
    width: '1fr',
    disabled: false,
    position: 4,
  },
  {
    label: 'Follow-up Response',
    width: '1fr',
    disabled: false,
    position: 5,
  },
  {
    label: 'Device & Viewport',
    width: '1fr',
    disabled: false,
    position: 6,
  },
  {
    label: 'Browser',
    width: '90px',
    disabled: false,
    position: 7,
  },
  {
    label: 'Options',
    width: '70px',
    disabled: true,
    position: 8,
  },
];
