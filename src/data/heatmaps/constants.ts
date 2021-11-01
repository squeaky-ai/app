import type { TimePeriod } from 'lib/dates';

export const TIME_PERIODS: { name: string, key: TimePeriod }[] = [
  {
    name: 'Today',
    key: 'today'
  },
  {
    name: 'Yesterday',
    key: 'yesterday'
  },
  {
    name: 'Past Week',
    key: 'past_week'
  },
  {
    name: 'Past Month',
    key: 'past_month'
  },
  {
    name: 'This Quarter',
    key: 'this_quarter'
  },
  {
    name: 'Year to Date',
    key: 'year_to_date'
  }
];
