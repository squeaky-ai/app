import { FiltersStart, FiltersRange } from 'types/graphql';
import type { Column } from 'types/common';
import type { VisitorsFilters } from 'types/graphql';

export const FILTERS: VisitorsFilters = {
  status: null,
  recordings: {
    rangeType: FiltersRange.GreaterThan,
    count: null
  },
  languages: [],
  firstVisited: {
    rangeType: null,
    fromType: FiltersStart.Before,
    fromDate: null,
    betweenFromDate: null,
    betweenToDate: null,
  },
  lastActivity: {
    rangeType: null,
    fromType: FiltersStart.Before,
    fromDate: null,
    betweenFromDate: null,
    betweenToDate: null,
  },
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
    disabled: true,
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
    label: 'Language',
    width: '1fr',
    disabled: false,
    position: 9,
  },
  {
    label: 'Device & Viewport',
    width: '1fr',
    disabled: false,
    position: 10,
  },
  {
    label: 'Browser',
    width: '90px',
    disabled: false,
    position: 11,
  },
];
