export type ValueOf<T> = T[keyof T];

declare global {
  interface Window {
    _dAPI?: DudaApi;
  }
}

export interface Column {
  label: string;
  width: string;
  disabled: boolean;
  position: number;
}

export type RelativeTime =
  'today' |
  'yesterday' |
  'past_seven_days' |
  'past_fourteen_days' |
  'past_thirty_days' |
  'past_six_months' |
  'past_year';

export type AbsoluteTime = {
  fromType?: 'Before' | 'After' | 'Between';
  fromDate?: string;
  betweenFromDate?: string;
  betweenToDate?: string;
}

export type TimeRange = { 
  fromDate?: string;
  toDate?: string;
}

export type TimePeriod = RelativeTime | AbsoluteTime;

export interface DudaApi {
  upgrade(params: { planData: { appId: string, type: string } }): void;
}
