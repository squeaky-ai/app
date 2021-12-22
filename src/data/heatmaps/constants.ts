export interface HeatmapColor {
  background: string;
  border: string;
  foreground: string;
  percentage: number;
}

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
