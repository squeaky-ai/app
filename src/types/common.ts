export type ValueOf<T> = T[keyof T];

export type DateFilter = {
  rangeType: 'From' | 'Between' | null;
  fromType: 'Before' | 'After' | null;
  fromDate: string | null;
  betweenFromDate: string | null;
  betweenToDate: string | null;
};
