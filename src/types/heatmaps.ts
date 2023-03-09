import { HeatmapColor } from 'data/heatmaps/constants';
import type { Heatmaps as HeatmapsWithStringItems } from 'types/graphql';

export type HeatmapClickTarget = 'all' | 'anchors';

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

export type HeatmapsItem = HeatmapsClickCount | HeatmapsClickPosition | HeatmapsCursor | HeatmapsScroll;

export interface Heatmaps extends Omit<HeatmapsWithStringItems, 'items'> {
  items: HeatmapsItem[];
}

export interface ScrollMapData {
  increment: number;
  pixelsScrolled: number;
  percentThatMadeIt: number;
  amountThatMadeIt: number;
  color: HeatmapColor;
}

export interface ClickMapData {
  selector: string;
  color: HeatmapColor;
  count: number;
  percentage: number;
}
