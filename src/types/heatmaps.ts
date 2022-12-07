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
