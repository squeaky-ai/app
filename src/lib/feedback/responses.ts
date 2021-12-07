import { range } from 'lodash';
import type { TimePeriod } from 'lib/dates';
import type { Column } from 'types/feedback';

import {
  getHours,
  getDate,
  format,
  subDays,
} from 'date-fns';

export interface FeedbackData {
  date: string;
  count: number;
}

export interface DataForPeriod {
  data: FeedbackData[];
  interval: number;
}

export const allColumns: Column[] = [
  {
    name: 'score',
    label: 'Score',
    width: '100px',
    disabled: true,
  },
  {
    name: 'visitor-id',
    label: 'Visitor ID',
    width: '1fr',
    disabled: false,
  },
  {
    name: 'recording-id',
    label: 'Recording ID',
    width: '1fr',
    disabled: false,
  },
  {
    name: 'date-time',
    label: 'Date & Time',
    width: '1fr',
    disabled: false,
  },
  {
    name: 'follow-up',
    label: 'Follow-up Response',
    width: '1fr',
    disabled: false,
  },
  {
    name: 'email',
    label: 'Email',
    width: '1fr',
    disabled: false,
  },
  {
    name: 'device-viewport',
    label: 'Device & Viewport',
    width: '1fr',
    disabled: false,
  },
  {
    name: 'browser',
    label: 'Browser',
    width: '90px',
    disabled: false,
  },
  {
    name: 'options',
    label: 'Options',
    width: '70px',
    disabled: true,
  },
];

const getAmPmForHour = (hour: number): string => {
  if (hour == 24) return '12pm';
  if (hour <= 12) return `${hour}am`;
  return `${hour - 12}pm`;
};

const getDateFromTimestamp = (str: string) => new Date(str);

const getDailyResults = (timestamps: string[]): DataForPeriod => {
  const data = range(0, 24).map(i => {
    const count = timestamps.filter(t => getHours(getDateFromTimestamp(t)) === i).length;

    return {
      date: getAmPmForHour(i),
      count,
    };
  });

  return { data, interval: 1 };
};

const getPastSevenDaysResults = (timestamps: string[]): DataForPeriod => {
  const now = new Date();

  const data = range(0, 7).map(i => {
    const date = subDays(now, i);

    const count = timestamps.filter(t => getDate(getDateFromTimestamp(t)) === getDate(date)).length;

    return {
      date: format(date, 'd/M'),
      count,
    };
  });

  return { data: data.reverse(), interval: 0 };
};

const getPastThirtyDaysResults = (timestamps: string[]): DataForPeriod => {
  const now = new Date();

  const data = range(0, 30).map(i => {
    const date = subDays(now, i);

    const count = timestamps.filter(t => getDate(getDateFromTimestamp(t)) === getDate(date)).length;

    return {
      date: format(date, 'd/M'),
      count,
    };
  });

  return { data: data.reverse(), interval: 2 };
};

export const formatResultsForPeriod = (period: TimePeriod, timestamps: string[]): DataForPeriod => {
  switch(period) {
    case 'today':
    case 'yesterday':
      return getDailyResults(timestamps);
    case 'past_seven_days':
      return getPastSevenDaysResults(timestamps);
    case 'past_thirty_days':
      return getPastThirtyDaysResults(timestamps);
    default:
      return {
        data: [],
        interval: 1
      };
  }
};
