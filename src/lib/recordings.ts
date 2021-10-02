import type { Filters, Column } from 'types/recording';

export const defaultFilters: Filters = {
  browsers: [],
  devices: [],
  languages: [],
  startUrl: null,
  exitUrl: null,
  visitedPages: [],
  unvisitedPages: [],
  status: null,
  date: {
    dateRangeType: null,
    dateFromType: 'Before',
    fromDate: null,
    betweenFromDate: null,
    betweenToDate: null,
  },
  duration: {
    durationRangeType: null,
    durationFromType: 'GreaterThan',
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

export const defaultColumns: Column[] = [
  {
    name: 'date-time',
    label: 'Date & Time',
    width: '1fr'
  },
  {
    name: 'duration',
    label: 'Duration',
    width: '1fr'
  },
  {
    name: 'pages',
    label: 'Pages',
    width: '1fr'
  },
  {
    name: 'start-exit',
    label: 'Start & Exit URL',
    width: '2fr'
  },
  {
    name: 'device',
    label: 'Device',
    width: '1fr',
  },
  {
    name: 'browser',
    label: 'Browser',
    width: '90px'
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
