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
    background: '#FFF7D9',
    border: '#BFBFBF',
    foreground: '#000000',
    percentage: 15
  },
  {
    background: '#FFE99B',
    border: '#BFBFBF',
    foreground: '#000000',
    percentage: 30
  },
  {
    background: '#FBC73B',
    border: '#BFBFBF',
    foreground: '#000000',
    percentage: 45
  },
  {
    background: '#FA9116',
    border: '#BFBFBF',
    foreground: '#000000',
    percentage: 60
  },
  {
    background: '#F96155',
    border: '#BFBFBF',
    foreground: '#FFFFFF',
    percentage: 75
  },
  {
    background: '#FF2E86',
    border: '#BFBFBF',
    foreground: '#FFFFFF',
    percentage: 90
  },
];
