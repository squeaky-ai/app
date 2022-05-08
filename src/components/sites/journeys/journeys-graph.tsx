import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { range, countBy, sum } from 'lodash';
import { Icon } from 'components/icon';
import { Tooltip } from 'components/tooltip';
import { Pill } from 'components/pill';
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

  const getTotalForCol = (col: number) => {
    const pages = journeys.map(j => j.path[col]);
    const groups = countBy(pages);

    return sum(
      Object
        .entries(groups)
        .filter(([key]) => key !== 'undefined')
        .map(([, value]) => value)
    );
  };

  const getPagesForCol = (col: number): PageStats[] => {
    const pages = journeys.map(j => j.path[col]);
    const groups = countBy(pages);
    const total = getTotalForCol(col);

    return Object
      .entries(groups)
      .filter(([key]) => key !== 'undefined')
      .map(([key, value]) => ({
        path: key,
        count: value,
        percentage: percentage(total, value),
      }))
      .sort((a, b) => b.count - a.count);
  };

  const getExitForColAndPage = (col: number, page: string) => {
    const total = getTotalForCol(col);

    // Take a look at the next position in the depth to see if
    // people did not view anymore pages, as this means that they
    // dropped off here
    const exits = journeys
      .filter(j => j.path[col] === page)
      .map(j => j.path[col + 1])
      .filter(j => j === undefined).length;

    return percentage(total, exits);
  };

  return (
    <div className='journey-graph'>
      {range(0, depth).map(col => {
        const pages = getPagesForCol(col);
        const padder = 100 - sum(pages.map(p => p.percentage));

        return (
          <div className='col' key={col}>
            <p className='heading'>Page {col + 1}</p>
            {pages.map(page => {
              const exits = getExitForColAndPage(col, page.path);

              return (
                <div className={classnames('page', { 'has-exit': exits > 0 })} key={col + page.path} style={{ height: `${page.percentage}%` }}>
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
                  {exits > 0 && (
                    <div className='row'>
                      <Pill className='drop-off'>
                        <Icon name='arrow-right-down-line' />
                        {exits}%
                      </Pill>
                    </div>
                  )}
                </div>
              )
            })}
            <div className='padder' style={{ height: `${padder}%` }} />
          </div>
        );
      })}
    </div>
  );
};
