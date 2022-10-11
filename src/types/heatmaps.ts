export type HeatmapClickTarget = 'all' | 'anchors';

export enum HeatmapsType {
  ClickCount = 'ClickCount',
  ClickPosition = 'ClickPosition',
  Cursor = 'Cursor',
  Scroll = 'Scroll'
}

export type HeatmapsClickCount = {
  count: number;
  selector: string;
};

export type HeatmapsClickPosition = {
  relative_to_element_x: number;
  relative_to_element_y: number;
  selector: string;
};

export type HeatmapsCursor = {
  count: number;
  x: number;
  y: number;
};

export type HeatmapsScroll = {
  y: number;
};
