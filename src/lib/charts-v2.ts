import { range } from 'lodash';
import { subDays, getDayOfYear, getWeek, subWeeks, subMonths, format } from 'date-fns';
import { ScaleType } from 'recharts/types/util/types';
import { getAmPmForHour } from 'lib/charts';
import { fromSlashyDate } from 'lib/dates';
import type { TimePeriod } from 'types/common';

interface Result<T> {
  groupType: string;
  groupRange: number;
  items: T[];
}

interface Item {
  dateKey: string;
}

const padDateKey = (i: number, pad = 2) => i.toString().padStart(pad, '0');

export const doNotAllowZero = (scale: ScaleType, num: number) => (
  num === 0 && scale === 'log' ? null : num
);

const findMatchOrDefault = <T extends Item>(dateKey: string, label: string, items: T[], fallback: Omit<T, 'dateKey'>): T => {
  const match = items.find(i => i.dateKey === dateKey) || { ...fallback, dateKey };

  return { ...match, dateKey: label } as T;
};

const getEndDateForPeriod = (period: TimePeriod): Date => {
  const now = new Date();

  if (typeof period === 'string') {
    return now;
  }

  if (period.fromType === 'After') {
    return now;
  }

  return fromSlashyDate(period.fromDate || period.betweenToDate);
};

export const formatResultsForGroupType = <T extends Item>(results: Result<T>, period: TimePeriod, fallback: Omit<T, 'dateKey'>): T[] => {
  const endDate = getEndDateForPeriod(period);
  const { groupRange, groupType, items } = results;

  switch(groupType) {
    case 'hourly':
      return range(0, groupRange).map(i => {
        const dateKey = padDateKey(i);
        const label = getAmPmForHour(i);

        return findMatchOrDefault<T>(dateKey, label, items, fallback);
      });
    case 'daily':
      return range(0, groupRange + 1).map(i => {
        const date = subDays(endDate, i);
        const dateKey = padDateKey(getDayOfYear(date), 3);
        const label = format(date, 'd/M');

        return findMatchOrDefault<T>(dateKey, label, items, fallback);
      }).reverse();
    case 'weekly':
      return range(0, groupRange + 1).map(i => {
        const date = subWeeks(endDate, i);
        const dateKey = padDateKey(getWeek(date), 2);
        const label = format(date, 'd/M');

        return findMatchOrDefault<T>(dateKey, label, items, fallback);
      }).reverse();
    case 'monthly':
      return range(0, groupRange + 1).map(i => {
        const date = subMonths(endDate, i);
        const dateKey = format(date, 'yyyy/MM');
        const label = dateKey;

        return findMatchOrDefault<T>(dateKey, label, items, fallback);
      }).reverse();
    default:
      return items;
  }
};
