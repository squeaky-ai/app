import React from 'react';
import type { FC } from 'react';
import { range } from 'lodash';
import type { HeatmapsItem } from 'types/heatmaps';

interface Props {
  items: HeatmapsItem[];
}

export const HeatmapsScrolls: FC<Props> = ({ items }) => {
  const total = items.length;
  const percentage = (count: number) => total ? Math.round((count / total) * 100) : 0;

  const max = items.length === 0 
    ? 0 
    : Math.max(...items.map(i => i.y));

  console.log(max);

  return (
    <div className='scrolls-table'>
      <div className='head row'>
        <p>% scrolled</p>
        <p>Pixels scrolled</p>
        <p>Users</p>
      </div>
      <ul>
        {range(1, 21).map(i => {
          const size = Math.floor(max / (i * 5));
          const amountWhoMadeIt = items.filter(i => i.y >= size).length;
          const percent = percentage(amountWhoMadeIt);

          return (
            <li key={i} className='row'>
              <p>{i * 5}%</p>
              <p>{size}px</p>
              <p>{percent}% <i>({amountWhoMadeIt})</i></p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
