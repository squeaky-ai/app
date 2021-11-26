import { range, sum } from 'lodash';
import type { AnalyticsPageViews } from 'types/graphql';
import type { TimePeriod } from 'lib/dates';

import {
  getHours,
  subDays,
  format,
  isSameDay,
} from 'date-fns';

export interface AnalyticsData {
  date: string;
  all: number;
  unique: number;
}

export interface DataForPeriod {
  data: AnalyticsData[];
  interval: number;
}

const getAmPmForHour = (hour: number): string => {
  if (hour == 24) return '12pm';
  if (hour <= 12) return `${hour}am`;
  return `${hour - 12}pm`;
};

const getDateFromTimestamp = (str: string) => new Date(Number(str));

const getDailyResults = (pageViews: AnalyticsPageViews[]): DataForPeriod => {
  const data = range(0, 24).map(i => {
    const views = pageViews.filter(p => getHours(getDateFromTimestamp(p.timestamp)) === i);

    return {
      date: getAmPmForHour(i),
      all: sum(views.map(v => v.total)),
      unique: sum(views.map(v => v.unique)),
    };
  });

  return { data, interval: 1 };
};

const getPastSevenDaysResults = (pageViews: AnalyticsPageViews[]): DataForPeriod => {
  const now = new Date();

  const data = range(0, 7).map(i => {
    const date = subDays(now, i);

    const views = pageViews.filter(p => isSameDay(getDateFromTimestamp(p.timestamp), date));

    return {
      date: format(date, 'd/M'),
      all: sum(views.map(v => v.total)),
      unique: sum(views.map(v => v.unique)),
    };
  });

  return { data: data.reverse(), interval: 0 };
};

const getPastThirtyDaysResults = (pageViews: AnalyticsPageViews[]): DataForPeriod => {
  const now = new Date();

  const data = range(0, 30).map(i => {
    const date = subDays(now, i);

    const views = pageViews.filter(p => isSameDay(getDateFromTimestamp(p.timestamp), date));

    return {
      date: format(date, 'd/M'),
      all: sum(views.map(v => v.total)),
      unique: sum(views.map(v => v.unique)),
    };
  });

  return { data: data.reverse(), interval: 2 };
};

export const formatResultsForPeriod = (period: TimePeriod, pageViews: AnalyticsPageViews[]): DataForPeriod => {
  switch(period) {
    case 'today':
    case 'yesterday':
      return getDailyResults(pageViews);
    case 'past_seven_days':
      return getPastSevenDaysResults(pageViews);
    case 'past_thirty_days':
      return getPastThirtyDaysResults(pageViews);
    default:
      return {
        data: [],
        interval: 1
      };
  }
};
