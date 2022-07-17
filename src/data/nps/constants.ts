
import type { Column } from 'types/common';

export const COLUMNS: Column[] = [
  {
    label: 'Score',
    width: '100px',
    disabled: false,
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
    label: 'Follow-up response',
    width: '1fr',
    disabled: false,
    position: 5,
  },
  {
    label: 'Email',
    width: '1fr',
    disabled: false,
    position: 6,
  },
  {
    label: 'Device & Viewport',
    width: '1fr',
    disabled: false,
    position: 7,
  },
  {
    label: 'Browser',
    width: '90px',
    disabled: false,
    position: 8,
  },
  {
    label: 'Options',
    width: '64px',
    disabled: false,
    position: 9,
  },
];

export const DEFAULT_COLUMNS = COLUMNS.filter(c => [
  'Score', 
  'Visitor ID', 
  'Recording ID',
  'Date & Time', 
  'Follow-up response', 
  'Email',
  'Options',
].includes(c.label));
