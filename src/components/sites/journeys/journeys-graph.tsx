import React from 'react';
import type { FC } from 'react';
import { range, countBy, sum } from 'lodash';
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

        console.log(pages);

        return (
          <div className='col' key={col}>
            {pages.map(page => (
              <div className='page' style={{ height: `${page.percentage}%` }}>
                <div className='path'>
                  <p>{page.path}</p>
                </div>
                <div className='stats'>
                  <p>{page.count}</p>
                  <p>{page.percentage}%</p>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};
