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
    key: 'today'
  },
  {
    name: 'Yesterday',
    key: 'yesterday'
  },
  {
    name: 'Past Week',
    key: 'past_week'
  },
  {
    name: 'Past Month',
    key: 'past_month'
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
    background: '#FDE50B',
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
    background: '#FF8A00',
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
    background: '#F0438C',
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
