import type { Column } from 'types/common';

export const USER_COLUMNS: Column[] = [
  {
    label: 'ID',
    width: '100px',
    disabled: true,
    position: 1,
  },
  {
    label: 'Name',
    width: '1fr',
    disabled: false,
    position: 2,
  },
  {
    label: 'Email',
    width: '1fr',
    disabled: false,
    position: 3,
  },
  {
    label: 'Superuser',
    width: '140px',
    disabled: false,
    position: 4,
  },
  {
    label: 'Sites',
    width: '1fr',
    disabled: false,
    position: 5,
  },
  {
    label: 'Created At',
    width: '1fr',
    disabled: false,
    position: 6,
  },
  {
    label: 'Last Activity At',
    width: '1fr',
    disabled: false,
    position: 7,
  },
];

export const DEFAULT_USER_COLUMNS = USER_COLUMNS.filter(c => [
  'ID', 
  'Name',
  'Email',
  'Superuser',
  'Sites',
  'Created At',
  'Last Activity At',
].includes(c.label));
