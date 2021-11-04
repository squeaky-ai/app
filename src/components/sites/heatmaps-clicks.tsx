import React from 'react';
import type { FC } from 'react';
import { groupBy } from 'lodash';
import { percentage } from 'lib/maths';
import { Tooltip } from 'components/tooltip';
import type { HeatmapsItem } from 'types/heatmaps';

interface Props {
  items: HeatmapsItem[];
}

export const HeatmapsClicks: FC<Props> = ({ items }) => {
  const results = groupBy(items, 'selector');

  const total = items.length;

  const clicks = Object.entries(results).sort((a, b) => b[1].length - a[1].length);

  return (
    <div className='clicks-table'>
      <div className='head row'>
        <p>Element</p>
        <p>Clicks</p>
      </div>
      <ul>
        {clicks.map(([selector, coords]) => (
          <li key={selector} className='row'>
            <Tooltip button={selector} portalClassName='element-tooltip'>
              {selector}
            </Tooltip>
            <p>{percentage(total, coords.length)}% <i>({coords.length})</i></p>
          </li>
        ))}
      </ul>
    </div>
  );
};
