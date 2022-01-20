import { range } from 'lodash';
import { subDays, getDayOfYear, getWeek, subWeeks, subMonths, format } from 'date-fns';
import { getAmPmForHour } from 'lib/charts';

interface Result<T> {
  groupType: string;
  groupRange: number;
  items: T[];
}

interface Item {
  dateKey: string;
}

const padDateKey = (i: number, pad = 2) => i.toString().padStart(pad, '0');

const findMatchOrDefault = <T extends Item>(dateKey: string, label: string, items: T[], fallback: Omit<T, 'dateKey'>): T => {
  const match = items.find(i => i.dateKey === dateKey) || { ...fallback, dateKey };

  return { ...match, dateKey: label } as T;
};

export const formatResultsForGroupType = <T extends Item>(visitors: Result<T>, fallback: Omit<T, 'dateKey'>): T[] => {
  const now = new Date();
  const { groupRange, groupType, items } = visitors;

  switch(groupType) {
    case 'hourly':
      return range(0, groupRange).map(i => {
        const dateKey = padDateKey(i);
        const label = getAmPmForHour(i);

        return findMatchOrDefault<T>(dateKey, label, items, fallback);
      });
    case 'daily':
      return range(0, groupRange + 1).map(i => {
        const date = subDays(now, i);
        const dateKey = padDateKey(getDayOfYear(date), 3);
        const label = format(date, 'd/M');

        return findMatchOrDefault<T>(dateKey, label, items, fallback);
      }).reverse();
    case 'weekly':
      return range(0, groupRange + 1).map(i => {
        const date = subWeeks(now, i);
        const dateKey = padDateKey(getWeek(date), 2);
        const label = format(date, 'd/M');

        return findMatchOrDefault<T>(dateKey, label, items, fallback);
      }).reverse();
    case 'monthly':
      return range(0, groupRange + 1).map(i => {
        const date = subMonths(now, i);
        const dateKey = format(date, 'yyyy/MM');
        const label = dateKey;

        return findMatchOrDefault<T>(dateKey, label, items, fallback);
      }).reverse();
    default:
      return items;
  }
};