import { range } from 'lodash';
import type { Visitor } from 'types/analytics';
import type { TimePeriod } from 'lib/dates';

// [@_______] has claimed 1x free lunch from @lemonjs for fixing this mess

import { 
  addDays, 
  addMonths,
  getHours,
  getDate, 
  getDaysInMonth, 
  startOfWeek, 
  format, 
  startOfMonth, 
  startOfQuarter,
  differenceInDays,
  isSameDay,
  isSameMonth,
  startOfYear
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

const getDailyResults = (pageViews: Visitor[]): DataForPeriod => {
  const data = range(0, 24).map(i => {
    // Only interested in page views that happened this hour
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

const getWeeklyResults = (pageViews: Visitor[]): DataForPeriod => {
  const now = new Date();
  const start = startOfWeek(now, { weekStartsOn: 1 });

  const data = range(0, 7).map(i => {
    const date = addDays(start, i);

    // Only interested in page views that happened on this day
    // of the week
    const views = pageViews.filter(p => isSameDay(getDateFromTimestamp(p.timestamp), date));

    return {
      date: format(date, 'EEE'),
      all: views.length,
      existing: views.filter(v => !v.new).length,
      new: views.filter(v => v.new).length,
    };
  });

  return { data, interval: 0 };
};

const getMonthlyResults = (pageViews: Visitor[]): DataForPeriod => {
  const now = new Date();
  const start = startOfMonth(now);
  const daysThisMonth = getDaysInMonth(now);

  const data = range(0, daysThisMonth).map(i => {
    const date = addDays(start, i);

    // Only interested in page views that happened on this day
    // of the month
    const views = pageViews.filter(p => getDate(getDateFromTimestamp(p.timestamp)) === getDate(date));

    return {
      date: format(date, 'd/M'),
      all: views.length,
      existing: views.filter(v => !v.new).length,
      new: views.filter(v => v.new).length,
    };
  });

  return { data, interval: 2 };
};

const getQuarterlyResults = (pageViews: Visitor[]): DataForPeriod => {
  const now = new Date();
  const start = startOfQuarter(now);
  const diff = differenceInDays(now, start);

  const data = range(0, diff).map(i => {
    const date = addDays(start, i);

    // Only interested in page views that happened on this day
    // of the quarter
    const views = pageViews.filter(p => isSameDay(getDateFromTimestamp(p.timestamp), date));

    return {
      date: format(date, 'd/M'),
      all: views.length,
      existing: views.filter(v => !v.new).length,
      new: views.filter(v => v.new).length,
    };
  });

  return { data, interval: 3 };
};

const getYearlyResults = (pageViews: Visitor[]): DataForPeriod => {
  const now = new Date();
  const start = startOfYear(now);

  const data = range(0, 12).map(i => {
    const date = addMonths(start, i);

    // Only interested in page views that happened on this day
    // of the year
    const views = pageViews.filter(p => isSameMonth(getDateFromTimestamp(p.timestamp), date));

    return {
      date: format(date, 'MMM'),
      all: views.length,
      existing: views.filter(v => !v.new).length,
      new: views.filter(v => v.new).length,
    };
  });

  return { data, interval: 0 };
};

export const formatResultsForPeriod = (period: TimePeriod, pageViews: Visitor[]): DataForPeriod => {
  switch(period) {
    case 'today':
    case 'yesterday':
      return getDailyResults(pageViews);
    case 'past_week':
      return getWeeklyResults(pageViews);
    case 'past_month':
      return getMonthlyResults(pageViews);
    case 'this_quarter':
      return getQuarterlyResults(pageViews);
    case 'year_to_date':
      return getYearlyResults(pageViews);
    default:
      return {
        data: [],
        interval: 1
      };
  }
};
