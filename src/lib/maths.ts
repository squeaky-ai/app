import { sum } from 'lodash';

export const average = (numbers: number[]): number => {
  const total = sum(numbers);
  return total / numbers.length;
};
