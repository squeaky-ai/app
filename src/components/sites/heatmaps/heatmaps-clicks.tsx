import React from 'react';
import type { FC } from 'react';
import { Tooltip } from 'components/tooltip';
import { Pill } from 'components/pill';
import { Sort } from 'components/sort';
import { getClickMapData } from 'lib/heatmaps';
import type { HeatmapsItem } from 'types/graphql';

interface Props {
  items: HeatmapsItem[];
}

export const HeatmapsClicks: FC<Props> = ({ items }) => {
  const [order, setOrder] = React.useState('clicks__desc');

  const clicks = getClickMapData(items).sort((a, b) => order === 'clicks__asc'
    ? a.count - b.count
    : b.count - a.count
  );

  return (
    <div className='clicks-table'>
      {clicks.length === 0 && (
        <div className='empty'>
          <i className='ri-time-line' />
          <p>No data available</p>
        </div>
      )}

      {clicks.length > 0 && (
        <>
          <div className='head row'>
            <p>Element</p>
            <p>
              Clicks
              <Sort
                name='clicks'
                order={order}
                onAsc={() => setOrder('clicks__asc')}
                onDesc={() => setOrder('clicks__desc')}
              />
            </p>
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
          </>
        )}
    </div>
  );
};
