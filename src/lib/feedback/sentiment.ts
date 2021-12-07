import type { Column } from 'types/common';

export const allColumns: Column[] = [
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
