import { sum, groupBy, orderBy } from 'lodash';

export const average = (numbers: number[]): number => {
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
