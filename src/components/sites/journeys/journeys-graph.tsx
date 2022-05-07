import React from 'react';
import type { FC } from 'react';
import { range, countBy, sum } from 'lodash';
import { Icon } from 'components/icon';
import { percentage } from 'lib/maths';
import type { AnalyticsUserPath } from 'types/graphql';

interface Props {
  journeys: AnalyticsUserPath[];
}

interface PageStats {
  path: string;
  count: number;
  percentage: number;
}

export const JourneysGraph: FC<Props> = ({ journeys }) => {
  const depth = Math.max(...journeys.map(j => j.path.length));

  const getPagesForCol = (col: number): PageStats[] => {
    const pages = journeys.map(j => j.path[col]);
    const groups = countBy(pages);

    const total = sum(Object.values(groups));

    return Object
      .entries(groups)
      .filter(([key]) => key !== 'undefined')
      .map(([key, value]) => ({
        path: key,
        count: value,
        percentage: percentage(total, value),
      }));
  };

  return (
    <div className='journey-graph'>
      {range(0, depth).map(col => {
        const pages = getPagesForCol(col);

        return (
          <div className='col' key={col}>
            <p className='heading'>Page {col + 1}</p>
            {pages.map(page => (
              <div className='page' key={col + page.path} style={{ height: `${page.percentage}%` }}>
                <p className='path'>
                  <Icon name='file-line' />
                  {page.path}
                </p>
                <p className='stats'>
                  {page.percentage}%
                </p>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};
