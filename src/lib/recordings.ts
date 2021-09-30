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
