import type { Column } from 'types/common';
import type { EventsCaptureFilters } from 'types/graphql';

export const STATS_COLUMNS: Column[] = [
  {
    label: 'Name',
    width: '1fr',
    disabled: true,
    position: 1,
  },
  {
    label: 'Type',
    width: '1fr',
    disabled: true,
    position: 2,
  },
  {
    label: 'Events triggered',
    width: '1fr',
    disabled: false,
    position: 3,
  },
  {
    label: 'Unique triggers',
    width: '1fr',
    disabled: false,
    position: 4,
  },
  {
    label: 'Avg. events per visitor',
    width: '1fr',
    disabled: false,
    position: 5,
  },
  {
    label: 'Avg. session duration of triggered visitors',
    width: '1fr',
    disabled: false,
    position: 6,
  },
  {
    label: 'Top 5 browsers',
    width: '1fr',
    disabled: false,
    position: 7,
  },
  {
    label: 'Top 10 traffic sources',
    width: '1fr',
    disabled: false,
    position: 8,
  },
];

export const FILTERS: EventsCaptureFilters = {
  eventType: [],
  source: null,
};
