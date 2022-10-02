import { sum, groupBy, orderBy } from 'lodash';

export const average = (numbers: number[]): number => {
  if (numbers.length === 0) return 0;

  const total = sum(numbers);
  return total / numbers.length;
};

export const frequent = (numbers: number[]): number => {
  const group = groupBy(numbers);
  const order = orderBy(group, x => x.length, 'desc');
  return order[0]?.[0] || 0
};

export const percentage = (total: number, count: number) => total
  ? Number(((count / total) * 100).toFixed(2))
  : 0;

export const toTwoDecimalPlaces = (value: number) => value ? value.toFixed(2) : '0.00';

export const formatShortNumbers = (count: number) => {
  if (!count) return null;

  const format = Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 })
  
  return format.format(count);
};

export const roundTo = (value: number, to: number) => {
  return Math.ceil(value / to) * to;
};
