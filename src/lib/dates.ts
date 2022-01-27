import { get, range } from 'lodash';

import {
  subDays,
  subMonths,
  startOfToday, 
  startOfYesterday, 
  endOfYesterday, 
  format 
} from 'date-fns';

import { AbsoluteTime, TimePeriod, TimeRange } from 'types/common';

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

export const toNiceDate = (timestamp: string) => {
  if (!timestamp) return 'Unknown';

  const date = new Date(timestamp);
  return date.toUTCString().split(':').slice(0, 2).join(':');
};

const formatDateForGraphQL = (date: Date) => format(date, 'yyyy-MM-dd');

const expandAbsoluteDateToRange = (date: AbsoluteTime): TimeRange => {
  const now = new Date();
  const todaysDate = formatDateForGraphQL(now);

  const toSlashyDate = (s: string) => s.split('/').reverse().join('-');

  if (date.fromType === 'After') {
    return {
      fromDate: toSlashyDate(date.fromDate),
      toDate: todaysDate,
    };
  }

  if (date.fromType === 'Before') {
    return {
      fromDate: '2021-01-01',
      toDate: toSlashyDate(date.fromDate),
    };
  }

  return {
    fromDate: toSlashyDate(date.betweenFromDate),
    toDate: toSlashyDate(date.betweenToDate),
  }
};

export const getDateRange = (period: TimePeriod): TimeRange => {
  const now = new Date();
  const todaysDate = formatDateForGraphQL(now);

  switch(period) {
    case 'today':
      return {
        fromDate: formatDateForGraphQL(startOfToday()),
        toDate: todaysDate
      };
    case 'yesterday':
      return {
        fromDate: formatDateForGraphQL(startOfYesterday()),
        toDate: formatDateForGraphQL(endOfYesterday())
      };
    case 'past_seven_days':
      return {
        fromDate: formatDateForGraphQL(subDays(now, 6)),
        toDate: todaysDate
      };
    case 'past_fourteen_days':
      return {
        fromDate: formatDateForGraphQL(subDays(now, 13)),
        toDate: todaysDate
      };
    case 'past_thirty_days':
      return {
        fromDate: formatDateForGraphQL(subDays(now, 30)),
        toDate: todaysDate
      };
    case 'past_six_months':
      return {
        fromDate: formatDateForGraphQL(subMonths(now, 5)),
        toDate: todaysDate
      };
    case 'past_year':
      return {
        fromDate: formatDateForGraphQL(subMonths(now, 11)),
        toDate: todaysDate
      };
    default:
      return expandAbsoluteDateToRange(period);
  }
};

export const getDayByIndex = (index: number) => {
  const days = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Firday',
    6: 'Saturday',
  };

  return get(days, index, '');
};

export const expandDay = (day: string) => {
  const days = {
    Mon: 'Monday',
    Tue: 'Tuesday',
    Wed: 'Wednesday',
    Thu: 'Thursday',
    Fri: 'Friday',
    Sat: 'Saturday',
    Sun: 'Sunday',
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

