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
  {
    label: 'Options',
    width: '64px',
    disabled: false,
    position: 8,
  },
];

export const SITE_COLUMNS: Column[] = [
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
    label: 'Url',
    width: '1fr',
    disabled: false,
    position: 3,
  },
  {
    label: 'Owner Name',
    width: '1fr',
    disabled: false,
    position: 4,
  },
  {
    label: 'Plan Name',
    width: '1fr',
    disabled: false,
    position: 5,
  },
  {
    label: 'Plan Exceeded',
    width: '1fr',
    disabled: false,
    position: 6,
  },
  {
    label: 'Tracking Code',
    width: '1fr',
    disabled: false,
    position: 7,
  },
  {
    label: 'Team Count',
    width: '1fr',
    disabled: false,
    position: 8,
  },
  {
    label: 'Created At',
    width: '1fr',
    disabled: false,
    position: 9,
  },
  {
    label: 'Active Visitors',
    width: '1fr',
    disabled: false,
    position: 10,
  },
  {
    label: 'Superuser Access',
    width: '1fr',
    disabled: false,
    position: 11,
  },
  {
    label: 'Options',
    width: '64px',
    disabled: false,
    position: 12,
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
  'Options',
].includes(c.label));

export const DEFAULT_SITE_COLUMNS = SITE_COLUMNS.filter(c => [
  'ID',
  'Name',
  'Url',
  'Owner Name',
  'Plan Name',
  'Plan Exceeded',
  'Tracking Code',
  'Team Count',
  'Created At',
  'Active Visitors',
  'Superuser Access',
  'Options',
].includes(c.label));
