import { FiltersSize, FiltersStart } from 'types/graphql';
import type { Column } from 'types/common';
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
  },
  viewport: {
    minHeight: null,
    maxHeight: null,
    maxWidth: null,
    minWidth: null,
  }
};

export const allColumns: Column[] = [
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
    width: '1fr',
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
