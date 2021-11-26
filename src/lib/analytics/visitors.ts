import { range } from 'lodash';
import type { AnalyticsVisitor } from 'types/graphql';
import type { TimePeriod } from 'lib/dates';

// [@_______] has claimed 1x free lunch from @lemonjs for fixing this mess

import {
  getHours,
  getDate, 
  format, 
  subDays,
} from 'date-fns';

export interface AnalyticsData {
  date: string;
  all: number;
  existing: number;
  new: number;
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

const getDailyResults = (pageViews: AnalyticsVisitor[]): DataForPeriod => {
  const data = range(0, 24).map(i => {
    const views = pageViews.filter(p => getHours(getDateFromTimestamp(p.timestamp)) === i);

    return {
      date: getAmPmForHour(i),
      all: views.length,
      existing: views.filter(v => !v.new).length,
      new: views.filter(v => v.new).length,
    };
  });

  return { data, interval: 1 };
};

const getPastSevenDaysResults = (pageViews: AnalyticsVisitor[]): DataForPeriod => {
  const now = new Date();

  const data = range(0, 7).map(i => {
    const date = subDays(now, i);

    const views = pageViews.filter(p => getDate(getDateFromTimestamp(p.timestamp)) === getDate(date));

    return {
      date: format(date, 'd/M'),
      all: views.length,
      existing: views.filter(v => !v.new).length,
      new: views.filter(v => v.new).length,
    };
  });

  return { data: data.reverse(), interval: 0 };
};

const getPastThirtyDaysResults = (pageViews: AnalyticsVisitor[]): DataForPeriod => {
  const now = new Date();

  const data = range(0, 30).map(i => {
    const date = subDays(now, i);

    const views = pageViews.filter(p => getDate(getDateFromTimestamp(p.timestamp)) === getDate(date));

    return {
      date: format(date, 'd/M'),
      all: views.length,
      existing: views.filter(v => !v.new).length,
      new: views.filter(v => v.new).length,
    };
  });

  return { data: data.reverse(), interval: 2 };
};

export const formatResultsForPeriod = (period: TimePeriod, pageViews: AnalyticsVisitor[]): DataForPeriod => {
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
