export type ValueOf<T> = T[keyof T];

export type DateFilter = {
  dateRangeType: 'From' | 'Between' | null;
  dateFromType: 'Before' | 'After' | null;
  fromDate: string | null;
  betweenFromDate: string | null;
  betweenToDate: string | null;
};
