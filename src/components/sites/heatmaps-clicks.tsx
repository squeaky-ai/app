import React from 'react';
import type { FC } from 'react';
import { Tooltip } from 'components/tooltip';
import { Pill } from 'components/pill';
import { getClickMapData } from 'lib/heatmaps';
import type { HeatmapsItem } from 'types/heatmaps';

interface Props {
  items: HeatmapsItem[];
}

export const HeatmapsClicks: FC<Props> = ({ items }) => {
  const clicks = getClickMapData(items);

  return (
    <div className='clicks-table'>
      <div className='head row'>
        <p>Element</p>
        <p>Clicks</p>
      </div>
      <ul>
        {clicks.map(click => (
          <li key={click.selector} className='row'>
            <Tooltip button={click.selector} portalClassName='element-tooltip'>
              {click.selector}
            </Tooltip>
            <p>
              <Pill small style={{ backgroundColor: click.color.background, color: click.color.foreground, borderColor: click.color.border }} squared>
                {click.count}
              </Pill>
              {click.percentage}%
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
