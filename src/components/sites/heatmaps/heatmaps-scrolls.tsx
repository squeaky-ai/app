import React from 'react';
import type { FC } from 'react';
import { Icon } from 'components/icon';
import { Card } from 'components/card';
import { getScrollMapData } from 'lib/heatmaps';
import type { Heatmaps, HeatmapsScroll, ScrollMapData } from 'types/heatmaps';

interface Props {
  heatmaps: Heatmaps;
}

export const HeatmapsScrolls: FC<Props> = ({ heatmaps }) => {
  const scrollMap = getScrollMapData(heatmaps.items as HeatmapsScroll[]).slice(1);

  // Only show every 5% step
  const scrolls = scrollMap.reduce((acc, scroll, index) => {
    if ((index + 1) % 5 === 0) acc.push(scroll);
    return acc;
  }, [] as ScrollMapData[]);

  return (
    <Card className='data'>
      <div className='scrolls-table'>
        {heatmaps.items.length === 0 && (
          <div className='empty'>
            <Icon name='time-line' />
            <p>No data available</p>
          </div>
        )}

        {heatmaps.items.length > 0 && (
          <>
            <div className='head row'>
              <p>% scrolled</p>
              <p>Pixels scrolled</p>
              <p>Users</p>
            </div>
              <ul>
                {scrolls.map(map => (
                  <li key={map.increment} className='row'>
                    <p>{map.increment}%</p>
                    <p>{map.pixelsScrolled}px</p>
                    <p>{map.percentThatMadeIt}% <i>({map.amountThatMadeIt})</i></p>
                  </li>
                ))}
              </ul>
            </>
          )}
      </div>
    </Card>
  );
};
