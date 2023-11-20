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
    label: 'Visitor',
    width: '1fr',
    disabled: false,
    position: 4,
  },
  {
    label: 'Superuser',
    width: '140px',
    disabled: false,
    position: 5,
  },
  {
    label: 'Sites',
    width: '1fr',
    disabled: false,
    position: 6,
  },
  {
    label: 'Created At',
    width: '1fr',
    disabled: false,
    position: 7,
  },
  {
    label: 'Last Activity At',
    width: '1fr',
    disabled: false,
    position: 8,
  },
  {
    label: 'Provider',
    width: '1fr',
    disabled: false,
    position: 9,
  },
  {
    label: 'Options',
    width: '64px',
    disabled: false,
    position: 10,
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
    label: 'Provider',
    width: '1fr',
    disabled: false,
    position: 9,
  },
  {
    label: 'Trial Status',
    width: '1fr',
    disabled: false,
    position: 10,
  },
  {
    label: 'Maximum visits per month',
    width: '1fr',
    disabled: false,
    position: 11,
  },
  {
    label: 'Current month visits',
    width: '1fr',
    disabled: false,
    position: 12,
  },
  {
    label: 'Created At',
    width: '1fr',
    disabled: false,
    position: 13,
  },
  {
    label: 'Active Visitors',
    width: '1fr',
    disabled: false,
    position: 14,
  },
  {
    label: 'Superuser Access',
    width: '1fr',
    disabled: false,
    position: 15,
  },
  {
    label: 'Options',
    width: '64px',
    disabled: false,
    position: 16,
  },
];

export const DEFAULT_USER_COLUMNS = USER_COLUMNS.filter(c => [
  'ID', 
  'Name',
  'Email',
  'Visitor',
  'Superuser',
  'Sites',
  'Created At',
  'Last Activity At',
  'Provider',
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
  'Provider',
  'Trial Status',
  'Maximum visits per month',
  'Current month visits',
  'Created At',
  'Active Visitors',
  'Superuser Access',
  'Options',
].includes(c.label));
