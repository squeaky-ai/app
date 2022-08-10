import type { Column } from 'types/common';
import type { FeedbackSentimentResponseFilters } from 'types/graphql';

export const COLUMNS: Column[] = [
  {
    label: 'Rating',
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
    width: '64px',
    disabled: false,
    position: 8,
  },
];

export const DEFAULT_COLUMNS = COLUMNS.filter(c => [
  'Rating', 
  'Visitor ID', 
  'Recording ID',
  'Date & Time', 
  'Follow-up response', 
  'Options',
].includes(c.label));

export const FILTERS: FeedbackSentimentResponseFilters = {
  followUpComment: null,
  rating: null,
};
