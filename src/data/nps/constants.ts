import type { TimePeriod } from 'lib/dates';

export const TIME_PERIODS: { name: string, key: TimePeriod }[] = [
  {
    name: 'Today',
    key: 'today',
  },
  {
    name: 'Yesterday',
    key: 'yesterday',
  },
  {
    name: 'Past 7 Days',
    key: 'past_seven_days',
  },
  {
    name: 'Past 30 Days',
    key: 'past_thirty_days',
  },
];