import React from 'react';
import type { FC } from 'react';
import { Icon } from 'components/icon';
import { Card } from 'components/card';
import { getScrollMapData } from 'lib/heatmaps';
import type { Heatmaps, HeatmapsScroll } from 'types/heatmaps';

interface Props {
  heatmaps: Heatmaps;
}

export const HeatmapsScrolls: FC<Props> = ({ heatmaps }) => {
  const scrollMap = getScrollMapData(heatmaps.items as HeatmapsScroll[]).slice(1);

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
                {scrollMap.map(map => (
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
