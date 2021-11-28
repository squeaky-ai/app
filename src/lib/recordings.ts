import { FiltersSize, FiltersStart } from 'types/graphql';
import type { Column } from 'types/recordings';
import type { RecordingsFilters } from 'types/graphql';

export const defaultFilters: RecordingsFilters = {
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
  }
};

export const allColumns: Column[] = [
  {
    name: 'select',
    label: 'Select',
    width: '58px',
    disabled: false,
    hide: true,
  },
  {
    name: 'status',
    label: 'Status',
    width: '105px',
    disabled: false,
    hide: false,
  },
  {
    name: 'recording-id',
    label: 'Recording ID',
    width: '1fr',
    disabled: true,
    hide: true,
  },
  {
    name: 'visitor-id',
    label: 'User ID',
    width: '1fr',
    disabled: false,
    hide: false,
  },
  {
    name: 'date-time',
    label: 'Date & Time',
    width: '1fr',
    disabled: false,
    hide: false,
  },
  {
    name: 'duration',
    label: 'Duration',
    width: '1fr',
    disabled: false,
    hide: false,
  },
  {
    name: 'pages',
    label: 'Pages',
    width: '1fr',
    disabled: false,
    hide: false,
  },
  {
    name: 'start-exit',
    label: 'Start & Exit URL',
    width: '2fr',
    disabled: false,
    hide: false,
  },
  {
    name: 'device',
    label: 'Device',
    width: '1fr',
    disabled: false,
    hide: false,
  },
  {
    name: 'browser',
    label: 'Browser',
    width: '90px',
    disabled: false,
    hide: false,
  },
  {
    name: 'options',
    label: 'Options',
    width: '70px',
    disabled: true,
    hide: false,
  },
];

// React doesn't like inputs having nulls, so this will
// convert all of those into empty strings
export const valueOrDefaults = <T>(value: T, replacement = '' ) => Object
  .entries(value)
  .reduce((acc, [key, value]) => ({ ...acc, [key]: value || replacement }), {}) as T;

// Formik will leave empty input[type=number] as an empty
// string, so they need to be changed to nulls
export const numbersOrNull = <T>(value: T) => Object
  .entries(value)
  .reduce((acc, [key, value]) => ({ ...acc, [key]: typeof value === 'number' ? value : null }), {}) as T;
