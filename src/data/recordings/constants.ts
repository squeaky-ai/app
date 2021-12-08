import { FiltersSize, FiltersStart } from 'types/graphql';
import type { Activity } from 'types/event';
import type { Column } from 'types/common';
import type { RecordingsFilters } from 'types/graphql';

export const ACTIVITIES: Activity[] = [
  {
    name: 'Page views',
    value: 'page_view',
  },
  {
    name: 'Clicks',
    value: 'click',
  },
  {
    name: 'Focus',
    value: 'focus',
  },
  {
    name: 'Blur',
    value: 'blur',
  },
  {
    name: 'Touch',
    value: 'touch',
  },
  {
    name: 'Hover',
    value: 'hover',
  },
  {
    name: 'Scrolling',
    value: 'scroll',
  },
];

export const COLUMNS: Column[] = [
  {
    label: 'Select',
    width: '58px',
    disabled: false,
    position: 1,
  },
  {
    label: 'Status',
    width: '105px',
    disabled: false,
    position: 2,
  },
  {
    label: 'Recording ID',
    width: '165px',
    disabled: true,
    position: 3,
  },
  {
    label: 'User ID',
    width: '1fr',
    disabled: false,
    position: 4,
  },
  {
  
    label: 'Date & Time',
    width: '1fr',
    disabled: false,
    position: 5,
  },
  {
    label: 'Duration',
    width: '1fr',
    disabled: false,
    position: 6,
  },
  {
    label: 'Pages',
    width: '1fr',
    disabled: false,
    position: 7,
  },
  {
    label: 'Start & Exit URL',
    width: '2fr',
    disabled: false,
    position: 8,
  },
  {
    label: 'Device',
    width: '1fr',
    disabled: false,
    position: 9,
  },
  {
    label: 'Browser',
    width: '90px',
    disabled: false,
    position: 10,
  },
  {
    label: 'Options',
    width: '70px',
    disabled: true,
    position: 11,
  },
];

export const FILTERS: RecordingsFilters = {
  browsers: [],
  devices: [],
  languages: [],
  startUrl: null,
  exitUrl: null,
  visitedPages: [],
  unvisitedPages: [],
  status: null,
  date: {
    rangeType: null,
    fromType: FiltersStart.Before,
    fromDate: null,
    betweenFromDate: null,
    betweenToDate: null,
  },
  duration: {
    rangeType: null,
    fromType: FiltersSize.GreaterThan,
    fromDuration: null,
    betweenFromDuration: null,
    betweenToDuration: null,
  },
  viewport: {
    minHeight: null,
    maxHeight: null,
    maxWidth: null,
    minWidth: null,
  }
};
