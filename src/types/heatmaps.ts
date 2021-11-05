export interface Heatmaps {
  desktopCount: number;
  tabletCount: number;
  mobileCount: number;
  recordingId: string | null;
  items: HeatmapsItem[];
}

export interface HeatmapsItem {
  x?: number;
  y?: number;
  selector: string;
}

export enum HeatmapsDevice {
  DESKTOP = 'Desktop',
  TABLET = 'Tablet',
  MOBILE = 'Mobile'
}

export enum HeatmapsType {
  CLICK = 'Click',
  SCROLL = 'Scroll'
}
