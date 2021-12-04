import type { TimePeriod } from 'lib/dates';

export interface HeatmapColor {
  background: string;
  border: string;
  foreground: string;
  percentage: number;
}

export const TIME_PERIODS: { name: string, key: TimePeriod }[] = [
  {
    name: 'Today',
    key: 'today',
  },
  {
    name: 'Yesterday',
    key: 'yesterday',
  },
  {
    name: 'Past 7 Days',
    key: 'past_seven_days',
  },
  {
    name: 'Past 30 Days',
    key: 'past_thirty_days',
  },
];

export const HEATMAP_COLOURS: HeatmapColor[] = [
  {
    background: '#FFFFFF',
    border: '#BFBFBF',
    foreground: '#000000',
    percentage: 0
  },
  {
    background: '#FFF178',
    border: '#BFBFBF',
    foreground: '#000000',
    percentage: 10
  },
  {
    background: '#FBC73B',
    border: '#BFBFBF',
    foreground: '#000000',
    percentage: 20
  },
  {
    background: '#FFB506',
    border: '#BFBFBF',
    foreground: '#000000',
    percentage: 30
  },
  {
    background: '#FA9116',
    border: '#BFBFBF',
    foreground: '#000000',
    percentage: 40
  },
  {
    background: '#F55962',
    border: '#BFBFBF',
    foreground: '#FFFFFF',
    percentage: 50
  },
  {
    background: '#F96155',
    border: '#BFBFBF',
    foreground: '#FFFFFF',
    percentage: 60
  },
  {
    background: '#B547C9',
    border: '#BFBFBF',
    foreground: '#FFFFFF',
    percentage: 70
  },
  {
    background: '#8249FB',
    border: '#BFBFBF',
    foreground: '#FFFFFF',
    percentage: 80
  },
];
