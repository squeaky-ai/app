import type { Filters } from 'types/recording';

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
    fromDate: '',
    betweenFromDate: '',
    betweenToDate: '',
  },
  duration: {
    durationRangeType: null,
    durationFromType: 'GreaterThan',
    fromDuration: '',
    betweenFromDuration: '',
    betweenToDuration: '',
  },
  viewport: {
    minHeight: '',
    maxHeight: '',
    maxWidth: '',
    minWidth: '',
  }
};
