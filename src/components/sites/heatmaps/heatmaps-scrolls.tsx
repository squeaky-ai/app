import React from 'react';
import type { FC } from 'react';
import { Icon } from 'components/icon';
import { getScrollMapData } from 'lib/heatmaps';
import type { HeatmapsItem } from 'types/graphql';

interface Props {
  items: HeatmapsItem[];
}

export const HeatmapsScrolls: FC<Props> = ({ items }) => {
  const scrollMap = getScrollMapData(items).slice(1);

  return (
    <div className='scrolls-table'>
      {items.length === 0 && (
        <div className='empty'>
          <Icon name='time-line' />
          <p>No data available</p>
        </div>
      )}

      
      {items.length > 0 && (
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
  );
};
