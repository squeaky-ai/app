import React from 'react';
import type { FC } from 'react';
import { groupBy } from 'lodash';
import type { HeatmapsItem } from 'types/heatmaps';

interface Props {
  items: HeatmapsItem[];
}

export const HeatmapsClicks: FC<Props> = ({ items }) => {
  const results = groupBy(items, 'id');

  const total = items.length;
  const percentage = (count: number) => total ? Math.round((count / total) * 100) : 0;

  return (
    <div className='clicks-table'>
      <div className='head row'>
        <p>Element</p>
        <p>Clicks</p>
      </div>
      <ul>
        {Object.entries(results).map(([id, coords]) => (
          <li key={id} className='row'>
            <p>ID: {id}</p>
            <p>{percentage(coords.length)}% <i>({coords.length})</i></p>
          </li>
        ))}
      </ul>
    </div>
  );
};
