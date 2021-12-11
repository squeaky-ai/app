import { range } from 'lodash';
import type { TimePeriod } from 'lib/dates';
import type { FeedbackNpsReply } from 'types/graphql';

import {
  getHours,
  getDate,
  format,
  subDays,
} from 'date-fns';

export interface FeedbackData {
  date: string;
  count: number;
  promoters: number;
  passives: number;
  detractors: number;
}

export interface DataForPeriod {
  data: FeedbackData[];
  interval: number;
}

const getAmPmForHour = (hour: number): string => {
  if (hour == 24) return '12pm';
  if (hour <= 12) return `${hour}am`;
  return `${hour - 12}pm`;
};

const getDateFromTimestamp = (str: string) => new Date(str);

const getNpsCounts = (replies: FeedbackNpsReply[]): Pick<FeedbackData, 'promoters' | 'passives' | 'detractors'> => {
  return {
    promoters: replies.filter(r => r.score >= 9).length,
    passives: replies.filter(r => [7, 8].includes(r.score)).length,
    detractors: replies.filter(r => r.score <= 6).length,
  };
};

const getDailyResults = (replies: FeedbackNpsReply[]): DataForPeriod => {
  const data = range(0, 24).map(i => {
    const matches = replies.filter(r => getHours(getDateFromTimestamp(r.timestamp)) === i);

    return {
      date: getAmPmForHour(i),
      count: matches.length,
      ...getNpsCounts(matches),
    };
  });

  return { data, interval: 1 };
};

const getPastSevenDaysResults = (replies: FeedbackNpsReply[]): DataForPeriod => {
  const now = new Date();

  const data = range(0, 7).map(i => {
    const date = subDays(now, i);

    const matches = replies.filter(r => getDate(getDateFromTimestamp(r.timestamp)) === getDate(date));

    return {
      date: format(date, 'd/M'),
      count: matches.length,
      ...getNpsCounts(matches),
    };
  });

  return { data: data.reverse(), interval: 0 };
};

const getPastThirtyDaysResults = (replies: FeedbackNpsReply[]): DataForPeriod => {
  const now = new Date();

  const data = range(0, 30).map(i => {
    const date = subDays(now, i);

    const matches = replies.filter(r => getDate(getDateFromTimestamp(r.timestamp)) === getDate(date));

    return {
      date: format(date, 'd/M'),
      count: matches.length,
      ...getNpsCounts(matches),
    };
  });

  return { data: data.reverse(), interval: 2 };
};

export const formatResultsForPeriod = (period: TimePeriod, replies: FeedbackNpsReply[]): DataForPeriod => {
  switch(period) {
    case 'today':
    case 'yesterday':
      return getDailyResults(replies);
    case 'past_seven_days':
      return getPastSevenDaysResults(replies);
    case 'past_thirty_days':
      return getPastThirtyDaysResults(replies);
    default:
      return {
        data: [],
        interval: 1
      };
  }
};
