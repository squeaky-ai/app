import { range, sum } from 'lodash';
import type { PageViewRange } from 'types/analytics';
import type { TimePeriod } from 'lib/dates';

import { 
  addDays, 
  addMonths,
  getHours, 
  getDay, 
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
  visitors: number;
  pageViews: number;
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

const getDailyResults = (pageViews: PageViewRange[]): DataForPeriod => {
  const data = range(0, 24).map(i => {
    // Only interested in page views that happened this hour
    const views = pageViews.filter(p => getHours(new Date(p.date)) === i);

    return {
      date: getAmPmForHour(i),
      visitors: views.length,
      pageViews: sum(views.map(v => v.pageViewCount))
    };
  });

  return { data, interval: 1 };
};

const getWeeklyResults = (pageViews: PageViewRange[]): DataForPeriod => {
  const now = new Date();
  const start = startOfWeek(now, { weekStartsOn: 1 });

  const data = range(0, 7).map(i => {
    const date = addDays(start, i);

    // Only interested in page views that happened on this day
    // of the week
    const views = pageViews.filter(p => getDay(new Date(p.date)) === getDay(date));

    return {
      date: format(date, 'EEE'),
      visitors: views.length,
      pageViews: sum(views.map(v => v.pageViewCount))
    };
  });

  return { data, interval: 0 };
};

const getMonthlyResults = (pageViews: PageViewRange[]): DataForPeriod => {
  const now = new Date();
  const start = startOfMonth(now);
  const daysThisMonth = getDaysInMonth(now);

  const data = range(0, daysThisMonth).map(i => {
    const date = addDays(start, i);

    // Only interested in page views that happened on this day
    // of the month
    const views = pageViews.filter(p => getDate(new Date(p.date)) === getDate(date));

    return {
      date: format(date, 'd/M'),
      visitors: views.length,
      pageViews: sum(views.map(v => v.pageViewCount))
    };
  });

  return { data, interval: 2 };
};

const getQuarterlyResults = (pageViews: PageViewRange[]): DataForPeriod => {
  const now = new Date();
  const start = startOfQuarter(now);
  const diff = differenceInDays(now, start);

  const data = range(0, diff).map(i => {
    const date = addDays(start, i);

    // Only interested in page views that happened on this day
    // of the quarter
    const views = pageViews.filter(p => isSameDay(new Date(p.date), date));

    return {
      date: format(date, 'd/M'),
      visitors: views.length,
      pageViews: sum(views.map(v => v.pageViewCount))
    };
  });

  return { data, interval: 3 };
};

const getYearlyResults = (pageViews: PageViewRange[]): DataForPeriod => {
  const now = new Date();
  const start = startOfYear(now);

  const data = range(0, 12).map(i => {
    const date = addMonths(start, i);

    // Only interested in page views that happened on this day
    // of the year
    const views = pageViews.filter(p => isSameMonth(new Date(p.date), date));

    return {
      date: format(date, 'MMM'),
      visitors: views.length,
      pageViews: sum(views.map(v => v.pageViewCount))
    };
  });

  return { data, interval: 0 };
};

export const formatResultsForPeriod = (period: TimePeriod, pageViews: PageViewRange[]): DataForPeriod => {
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
