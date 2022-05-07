import React from 'react';
import type { FC } from 'react';
import { range, countBy, sum } from 'lodash';
import { Icon } from 'components/icon';
import { percentage } from 'lib/maths';
import type { AnalyticsUserPath } from 'types/graphql';
import { Tooltip } from 'components/tooltip';

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
        const padder = 100 - sum(pages.map(p => p.percentage));

        return (
          <div className='col' key={col}>
            <p className='heading'>Page {col + 1}</p>
            {pages.map(page => (
              <div className='page' key={col + page.path} style={{ flexGrow: page.percentage }}>
                <div className='row'>
                  <Tooltip fluid buttonClassName='path' button={
                    <>
                      <Icon name='file-line' />
                      {page.path}
                    </>
                  }>
                    {page.path}
                  </Tooltip>
                  <p className='stats'>
                    {page.percentage}%
                  </p>
                </div>
              </div>
            ))}
            <div className='padder' style={{ flexGrow: padder }} />
          </div>
        );
      })}
    </div>
  );
};
