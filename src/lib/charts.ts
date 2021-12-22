import { range, minBy } from 'lodash';
import { toDayOfMonth, expandDay } from 'lib/dates';
import type { AbsoluteTime, TimePeriod } from 'types/common';

import {
  parse,
  getHours,
  getDate,
  getMonth,
  format,
  subDays,
  subMonths,
  differenceInDays,
} from 'date-fns';

type DateGroup = 'hourly' | 'daily' | 'monthly';

export interface ChartInput {
  timestamp: number | string;
}

export interface ChartData<T extends ChartInput> {
  key: string;
  data: T[];
}

export interface DataForPeriod<T extends ChartInput> {
  data: ChartData<T>[];
  interval: number;
}

const getAmPmForHour = (hour: number): string => {
  if (hour == 24) return '12pm';
  if (hour <= 12) return `${hour}am`;
  return `${hour - 12}pm`;
};

const getDateFromTimestamp = (timestamp: string | number) => new Date(timestamp);

const getDateGroupForRange = (from: Date, to: Date): [DateGroup, number] => {
  const days = differenceInDays(from, to);

  if (days === 1) {
    return ['hourly', null];
  }

  if (days <= 30) {
    return ['daily', days];
  }
  
  return ['monthly', days / 30];
};

const getDurationForAbsoluteDate = (period: AbsoluteTime, input: ChartInput[]): [DateGroup, number] => {
  // The after duration need to be from the time
  // specified until todays date
  if (period.type === 'After') {
    const from = new Date(period.fromDate);
    const to = new Date();

    return getDateGroupForRange(from, to);
  }

  // The before duration needs to be from the time
  // specified until the earliest date we have data
  // for
  if (period.type === 'Before') {
    const from = new Date(minBy(input, i => Number(i.timestamp)).timestamp);
    const to = new Date(period.fromDate);

    return getDateGroupForRange(from, to);
  }

  // For between the duration needs to be between the 
  // two specified dates
  const from = new Date(period.betweenFromDate);
  const to = new Date(period.betweenToDate);

  return getDateGroupForRange(from, to);
};

const getDurationForPeriod = (period: TimePeriod, input: ChartInput[]): [DateGroup, number] => {
  switch(period) {
    case 'today':
    case 'yesterday':
      return ['hourly', null];
    case 'past_seven_days':
      return ['daily', 7];
    case 'past_fourteen_days':
      return ['daily', 14];
    case 'past_thirty_days':
      return ['daily', 30];
    case 'past_six_months':
      return ['monthly', 6];
    case 'past_year':
      return ['monthly', 12];
    default:
      return getDurationForAbsoluteDate(period, input);
  }
};

// Group the results for a graph where the axis 
// should be the hours in a day, .i.e. Today, 
// Yesterday, or single absolute today
const getHourlyResults = <T extends ChartInput>(input: T[]): DataForPeriod<T> => {
  const data = range(0, 24).map(i => {
    // Get all the values that fall within the particular hour
    const values = input.filter(s => getHours(getDateFromTimestamp(s.timestamp)) === i);

    return {
      key: getAmPmForHour(i),
      data: values,
    };
  });

  return { data, interval: 1 };
};

// Group the results for a graph where the axis 
// should be the days of the week, .i.e. Week,
// fornight or an absolute date with a range no
// larger than a few weeks
const getDailyResults = <T extends ChartInput>(input: T[], days: number): DataForPeriod<T> => {
  const now = new Date();

  const data = range(0, days).map(i => {
    const date = subDays(now, i);

    // Get all the values that fall within the given day of the week
    const values = input.filter(s => getDate(getDateFromTimestamp(s.timestamp)) === getDate(date));

    return {
      key: format(date, 'd/M'),
      data: values,
    };
  });

  return { data: data.reverse(), interval: 0 };
};

// Group the results for a graph where the axis 
// should be the months of the year, .i.e. 6 months
// or more, or a range where the showing months 
// instead of weeks makes sense
const getMonthlyResults = <T extends ChartInput>(input: T[], months: number): DataForPeriod<T> => {
  const now = new Date();

  const data = range(0, months).map(i => {
    const date = subMonths(now, i);

    // Get all the values that fall on the certain day
    const values = input.filter(s => getMonth(getDateFromTimestamp(s.timestamp)) === getMonth(date));

    return {
      key: format(date, 'MMM/yyyy'),
      data: values,
    };
  });

  return { data: data.reverse(), interval: 2 };
};

export const formatLabel = (period: TimePeriod, label: string) => {
  switch(period) {
    case 'today':
    case 'yesterday':
      return label.replace(/(am|pm)$/, '.00$1');
    case 'past_seven_days':
      return expandDay(label);
    case 'past_thirty_days':
      return expandDay(label);
    default:
      return toDayOfMonth(parse(label, 'd/M', new Date()));
  }
};

export const formatChartData = <T extends ChartInput>(period: TimePeriod, input: T[]): DataForPeriod<T> => {
  const [group, duration] = getDurationForPeriod(period, input);

  if (group === 'hourly') {
    return getHourlyResults(input);
  }

  if (group === 'daily') {
    getDailyResults(input, duration);
  }

  // Everything else
  return getMonthlyResults(input, duration);
};
