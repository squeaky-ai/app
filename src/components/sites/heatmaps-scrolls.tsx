import React from 'react';
import type { FC } from 'react';
import { range } from 'lodash';
import { percentage } from 'lib/maths';
import type { HeatmapsItem } from 'types/heatmaps';

interface Props {
  items: HeatmapsItem[];
}

export const HeatmapsScrolls: FC<Props> = ({ items }) => {
  const total = items.length;

  const max = items.length === 0 
    ? 0 
    : Math.max(...items.map(i => i.y));

  return (
    <div className='scrolls-table'>
      <div className='head row'>
        <p>% scrolled</p>
        <p>Pixels scrolled</p>
        <p>Users</p>
      </div>
      <ul>
        {range(1, 21).map(i => {
          const size = Math.floor(((i * 5) / 100) * max);
          const amountWhoMadeIt = items.filter(i => i.y >= size).length;
          const percent = percentage(total, amountWhoMadeIt);

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
