import { FiltersRange } from 'types/graphql';
import type { Column } from 'types/common';
import type { VisitorsFilters } from 'types/visitors';

export const FILTERS: VisitorsFilters = {
  status: null,
  recordings: {
    rangeType: FiltersRange.GreaterThan,
    count: null
  },
  languages: [],
  browsers: [],
  visitedPages: [],
  unvisitedPages: [],
  referrers: [],
  firstVisited: null,
  lastActivity: null,
  starred: null,
};

export const COLUMNS: Column[] = [
  {
    label: 'Status',
    width: '105px',
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
    label: 'User ID',
    width: '1fr',
    disabled: false,
    position: 3,
  },
  {
    label: 'Name',
    width: '1fr',
    disabled: false,
    position: 4,
  },
  {
    label: 'Email',
    width: '1fr',
    disabled: false,
    position: 5,
  },
  {
    label: 'Recordings',
    width: '1fr',
    disabled: false,
    position: 6,
  },
  {
    label: 'First visited',
    width: '1fr',
    disabled: false,
    position: 7,
  },
  {
    label: 'Last activity',
    width: '1fr',
    disabled: false,
    position: 8,
  },
  {
    label: 'Avg. session duration',
    width: '1fr',
    disabled: false,
    position: 9,
  },
  {
    label: 'Language',
    width: '1fr',
    disabled: false,
    position: 10,
  },
  {
    label: 'Device & Viewport',
    width: '1fr',
    disabled: false,
    position: 11,
  },
  {
    label: 'Browser',
    width: '90px',
    disabled: false,
    position: 12,
  },
  {
    label: 'Country',
    width: '110px',
    disabled: false,
    position: 13,
  },
  {
    label: 'Source',
    width: '110px',
    disabled: false,
    position: 14,
  },
  {
    label: 'Options',
    width: '64px',
    disabled: false,
    position: 15,
  },
];

export const DEFAULT_COLUMNS = COLUMNS.filter(c => [
  'Status', 
  'Visitor ID', 
  'Email',
  'Recordings', 
  'Last activity',
  'Avg. session duration',
  'Device & Viewport',
  'Options',
].includes(c.label));
