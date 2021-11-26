import { range } from 'lodash';
import { average } from 'lib/maths';
import type { TimePeriod } from 'lib/dates';
import type { SentimentRating } from 'types/graphql';

import {
  getHours,
  getDate,
  format,
  subDays,
} from 'date-fns';

export interface FeedbackData {
  date: string;
  score: number;
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

const avg = (nums: number[]) => Math.ceil(average(nums));

const getDailyResults = (ratings: SentimentRating[]): DataForPeriod => {
  const data = range(0, 24).map(i => {
    const scores = ratings.filter(r => getHours(getDateFromTimestamp(r.timestamp)) === i);

    return {
      date: getAmPmForHour(i),
      score: avg(scores.map(s => s.score)),
    };
  });

  return { data, interval: 1 };
};

const getPastSevenDaysResults = (ratings: SentimentRating[]): DataForPeriod => {
  const now = new Date();

  const data = range(0, 7).map(i => {
    const date = subDays(now, i);

    const scores = ratings.filter(r => getDate(getDateFromTimestamp(r.timestamp)) === getDate(date));

    return {
      date: format(date, 'd/M'),
      score: avg(scores.map(s => s.score)),
    };
  });

  return { data: data.reverse(), interval: 0 };
};

const getPastThirtyDaysResults = (ratings: SentimentRating[]): DataForPeriod => {
  const now = new Date();

  const data = range(0, 30).map(i => {
    const date = subDays(now, i);

    const scores = ratings.filter(r => getDate(getDateFromTimestamp(r.timestamp)) === getDate(date));

    return {
      date: format(date, 'd/M'),
      score: avg(scores.map(s => s.score)),
    };
  });

  return { data: data.reverse(), interval: 2 };
};

export const formatResultsForPeriod = (period: TimePeriod, ratings: SentimentRating[]): DataForPeriod => {
  switch(period) {
    case 'today':
    case 'yesterday':
      return getDailyResults(ratings);
    case 'past_seven_days':
      return getPastSevenDaysResults(ratings);
    case 'past_thirty_days':
      return getPastThirtyDaysResults(ratings);
    default:
      return {
        data: [],
        interval: 1
      };
  }
};
