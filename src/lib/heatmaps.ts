import { range } from 'lodash';
import { percentage } from 'lib/maths';
import type { HeatmapsItem } from 'types/heatmaps';

interface ScrollMapData {
  increment: number;
  pixelsScrolled: number;
  percentThatMadeIt: number;
  amountThatMadeIt: number;
}

export const getScrollMapData = (items: HeatmapsItem[]): ScrollMapData[] => {
  const total = items.length;

  const max = items.length === 0 
    ? 0 
    : Math.max(...items.map(i => i.y));

  return range(1, 21).map(i => {
    const pixelsScrolled = Math.floor(((i * 5) / 100) * max);
    const amountThatMadeIt = items.filter(i => i.y >= pixelsScrolled).length;
    const percentThatMadeIt = percentage(total, amountThatMadeIt);

    return {
      increment: i * 5,
      pixelsScrolled,
      percentThatMadeIt,
      amountThatMadeIt,
    };
  });
};
