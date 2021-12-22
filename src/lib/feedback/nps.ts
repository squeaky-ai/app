import { range } from 'lodash';
import { percentage } from 'lib/maths';
import type { TimePeriod } from 'types/common';
import type { FeedbackNpsResponseItem, FeedbackNpsScore } from 'types/graphql';

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

const getNps = (scores: FeedbackNpsScore[]) => {
  const promoters = scores.filter(s => s.score >= 9).length;
  const detractors = scores.filter(s => s.score <= 6).length;
  
  return percentage(scores.length, promoters) - percentage(scores.length, detractors);
};

const getDateFromTimestamp = (str: string) => new Date(str);

const getDailyResults = (scores: FeedbackNpsScore[]): DataForPeriod => {
  const data = range(0, 24).map(i => {
    const s = scores.filter(s => getHours(getDateFromTimestamp(s.timestamp)) === i);

    return {
      date: getAmPmForHour(i),
      score: getNps(s),
    };
  });

  return { data, interval: 1 };
};

const getPastSevenDaysResults = (scores: FeedbackNpsScore[]): DataForPeriod => {
  const now = new Date();

  const data = range(0, 7).map(i => {
    const date = subDays(now, i);

    const s = scores.filter(s => getDate(getDateFromTimestamp(s.timestamp)) === getDate(date));

    return {
      date: format(date, 'd/M'),
      score: getNps(s),
    };
  });

  return { data: data.reverse(), interval: 0 };
};

const getPastThirtyDaysResults = (scores: FeedbackNpsScore[]): DataForPeriod => {
  const now = new Date();

  const data = range(0, 30).map(i => {
    const date = subDays(now, i);

    const s = scores.filter(s => getDate(getDateFromTimestamp(s.timestamp)) === getDate(date));

    return {
      date: format(date, 'd/M'),
      score: getNps(s),
    };
  });

  return { data: data.reverse(), interval: 2 };
};

export const formatResultsForPeriod = (period: TimePeriod, scores: FeedbackNpsScore[]): DataForPeriod => {
  switch(period) {
    case 'today':
    case 'yesterday':
      return getDailyResults(scores);
    case 'past_seven_days':
      return getPastSevenDaysResults(scores);
    case 'past_thirty_days':
      return getPastThirtyDaysResults(scores);
    default:
      return {
        data: [],
        interval: 1
      };
  }
};

export const npsColor = (nps: FeedbackNpsResponseItem) => {
  switch(nps.score) {
    case 7:
    case 8:
      return 'purple';
    case 9:
    case 10:
      return 'blue';
    default:
      return 'rose';
  }
};
