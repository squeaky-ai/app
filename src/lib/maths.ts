import { sum } from 'lodash';

export const average = (numbers: number[]): number => {
  const total = sum(numbers);
  return total / numbers.length;
};


export const percentage = (total: number, count: number) => total
  ? Number(((count / total) * 100).toFixed(2))
  : 0;
