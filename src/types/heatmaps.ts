export interface Heatmaps {
  desktopCount: number;
  mobileCount: number;
  items: HeatmapsItem[];
}

export interface HeatmapsItem {
  x: number;
  y: number;
  selector: string;
}

export type HeatmapsDevice = 'Desktop' | 'Mobile';

export type HeatmapsType = 'Click' | 'Scroll';
