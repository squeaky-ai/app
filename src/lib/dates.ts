import { get, range } from 'lodash';

import {
  subDays,
  startOfToday, 
  startOfYesterday, 
  endOfYesterday, 
  startOfWeek,
  startOfMonth,
  startOfQuarter,
  startOfYear,
  format 
} from 'date-fns';

export type TimePeriod =
  'today' |
  'yesterday' |
  'past_week' |
  'past_seven_days' |
  'past_thirty_days' |
  'past_month' |
  'this_quarter' |
  'year_to_date';

export type TimeRange = {
  fromDate: string;
  toDate: string;
}

export const toTimeString = (ms?: number | string) => {
  if (!ms) return '00:00:00';

  const date = new Date(0);
  date.setMilliseconds(Number(ms));
  return date.toISOString().substr(11, 8);
};

export const fromTimeString = (timeString: string) => {
  const date = new Date(0);
  const [rawHours, rawMinutes, rawSeconds] = (timeString || '').split(':');

  const hours = Number(rawHours);
  const minutes = Number(rawMinutes);
  const seconds = Number(rawSeconds);

  if (hours) date.setHours(hours);
  if (minutes) date.setMinutes(minutes);
  if (seconds) date.setSeconds(seconds);

  return date.valueOf();
};

export const toHoursMinutesAndSeconds = (ms?: number) => {
  if (!ms) return '0h 0m 0s';

  const timeString = toTimeString(ms);

  const [hours, minutes, seconds] = timeString.split(':');
  return `${hours.replace('00', '0')}h ${minutes.replace('00', '0')}m ${seconds.replace('00', '0')}s`;
};

export const toDayOfMonth = (date: Date) => {
  return format(date, 'do MMMM');
};

export const daysBefore = (count = 7, from?: Date) => {
  from ||= new Date();

  return range(count).map((index) => {
    const date = new Date();
    date.setDate(from.getDate() - (index + 1));
    return date;
  });
};

export const toIsoDate = (date?: Date) => {
  date ||= new Date();
  return date.toISOString().split('T')[0];
};

export const toNiceDate = (timestamp?: number) => {
  if (!timestamp) return 'Unknown';

  const date = new Date(Number(timestamp));
  return date.toUTCString().split(':').slice(0, 2).join(':');
};

export const getDateRange = (period: TimePeriod): TimeRange => {
  const now = new Date();

  const formatDate = (date: Date) => format(date, 'yyyy-M-dd');

  const todaysDate = formatDate(now);

  switch(period) {
    case 'today':
      return {
        fromDate: formatDate(startOfToday()),
        toDate: todaysDate
      };
    case 'yesterday':
      return {
        fromDate: formatDate(startOfYesterday()),
        toDate: formatDate(endOfYesterday())
      };
    case 'past_seven_days':
      return {
        fromDate: formatDate(subDays(now, 7)),
        toDate: todaysDate
      };
    case 'past_thirty_days':
      return {
        fromDate: formatDate(subDays(now, 30)),
        toDate: todaysDate
      };
    case 'past_week':
      return {
        fromDate: formatDate(startOfWeek(now, { weekStartsOn: 1 })),
        toDate: todaysDate
      };
    case 'past_month':
      return {
        fromDate: formatDate(startOfMonth(now)),
        toDate: todaysDate
      };
    case 'this_quarter':
      return {
        fromDate: formatDate(startOfQuarter(now)),
        toDate: todaysDate
      };
    case 'year_to_date':
      return {
        fromDate: formatDate(startOfYear(now)),
        toDate: todaysDate
      };
  }
};

export const expandDay = (day: string) => {
  const days = {
    Mon: 'Monday',
    Tue: 'Tuesday',
    Wed: 'Wednesday',
    Thu: 'Thursday',
    Fri: 'Firday',
    Sat: 'Saturday',
    Sun: 'Sunday'
  };

  return get(days, day, '');
};

export const expandMonth = (month: string) => {
  const months = {
    Jan: 'January',
    Fed: 'February',
    Mar: 'March',
    Apr: 'April',
    May: 'May',
    Jun: 'June',
    Jul: 'July',
    Aug: 'August',
    Sep: 'September',
    Oct: 'October',
    Nov: 'November',
    Dec: 'December'
  };

  return get(months, month, '');
};
