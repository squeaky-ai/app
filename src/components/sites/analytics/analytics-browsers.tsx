import React from 'react';
import type { FC } from 'react';
import { sum, orderBy, first } from 'lodash';
import { Browser } from 'components/browser';
import { Button } from 'components/button';
import { percentage } from 'lib/maths';
import { AnalyticsBrowser } from 'types/graphql';

interface Props {
  browsers: AnalyticsBrowser[];
}

export const AnalyticsBrowsers: FC<Props> = ({ browsers }) => {
  const [showAll, setShowAll] = React.useState<boolean>(false);

  const limit = 9;
  const total = sum(browsers.map(b => b.count));
  const ordered = orderBy(browsers, 'count', 'desc');

  const offset = 100 - percentage(total, first(ordered)?.count || 0);
  const results = showAll ? ordered : ordered.slice(0, limit);

  const offsettedPercentage = (count: number) => offset + percentage(total, count);

  return (
    <>
      <ul>
        {results.map(browser => (
          <li key={browser.name}>
            <Browser name={browser.name} height={32} width={32} />
            <div className='contents'>
              <div className='percentage' style={{ width: `${offsettedPercentage(browser.count)}%` }} />
              <p><b>{percentage(total, browser.count)}%</b> {browser.name}</p>
            </div>
          </li>
        ))}
      </ul>

      {browsers.length > limit && (
        <Button onClick={() => setShowAll(!showAll)} className='link show-all'>
          Show {showAll ? 'Less' : 'All'}
        </Button>
      )}
    </>
  );
};
