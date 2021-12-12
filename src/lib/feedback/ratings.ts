import { range } from 'lodash';
import { average } from 'lib/maths';
import { groupBy } from 'lodash';
import type { TimePeriod } from 'lib/dates';
import type { FeedbackSentimentRating } from 'types/graphql';

import {
  getHours,
  getDate,
  format,
  subDays,
} from 'date-fns';

export interface FeedbackData {
  date: string;
  score: number;
  0: number;
  1: number;
  2: number;
  3: number;
  4: number;
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

const groupScoreCounts = (ratings: FeedbackSentimentRating[]): Omit<FeedbackData, 'date' | 'score'> => {
  const groups = groupBy(ratings.map(r => r.score));

  const count = (num: number) => (groups[num] || []).length;

  return {
    0: count(0),
    1: count(1),
    2: count(2),
    3: count(3),
    4: count(4),
  }
};

const getDailyResults = (ratings: FeedbackSentimentRating[]): DataForPeriod => {
  const data = range(0, 24).map(i => {
    const scores = ratings.filter(r => getHours(getDateFromTimestamp(r.timestamp)) === i);

    return {
      date: getAmPmForHour(i),
      score: avg(scores.map(s => s.score)),
      ...groupScoreCounts(scores),
    };
  });

  return { data, interval: 1 };
};

const getPastSevenDaysResults = (ratings: FeedbackSentimentRating[]): DataForPeriod => {
  const now = new Date();

  const data = range(0, 7).map(i => {
    const date = subDays(now, i);

    const scores = ratings.filter(r => getDate(getDateFromTimestamp(r.timestamp)) === getDate(date));

    return {
      date: format(date, 'd/M'),
      score: avg(scores.map(s => s.score)),
      ...groupScoreCounts(scores),
    };
  });

  return { data: data.reverse(), interval: 0 };
};

const getPastThirtyDaysResults = (ratings: FeedbackSentimentRating[]): DataForPeriod => {
  const now = new Date();

  const data = range(0, 30).map(i => {
    const date = subDays(now, i);

    const scores = ratings.filter(r => getDate(getDateFromTimestamp(r.timestamp)) === getDate(date));

    return {
      date: format(date, 'd/M'),
      score: avg(scores.map(s => s.score)),
      ...groupScoreCounts(scores),
    };
  });

  return { data: data.reverse(), interval: 2 };
};

export const formatResultsForPeriod = (period: TimePeriod, ratings: FeedbackSentimentRating[]): DataForPeriod => {
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
