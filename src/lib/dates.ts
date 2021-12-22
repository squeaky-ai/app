import { get, range } from 'lodash';

import {
  subDays,
  subMonths,
  startOfToday, 
  startOfYesterday, 
  endOfYesterday, 
  format 
} from 'date-fns';

import { TimePeriod, TimeRange } from 'types/common';

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

export const toNiceDate = (timestamp?: number | string) => {
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
    case 'past_fourteen_days':
      return {
        fromDate: formatDate(subDays(now, 14)),
        toDate: todaysDate
      };
    case 'past_thirty_days':
      return {
        fromDate: formatDate(subDays(now, 30)),
        toDate: todaysDate
      };
    case 'past_six_months':
      return {
        fromDate: formatDate(subMonths(now, 6)),
        toDate: todaysDate
      };
    case 'past_year':
      return {
        fromDate: formatDate(subMonths(now, 12)),
        toDate: todaysDate
      };
    default:
      return period;
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
