import React from 'react';
import type { FC } from 'react';
import { sum, orderBy, first } from 'lodash';
import { Browser } from 'components/browser';
import { AnalyticsBrowser } from 'types/analytics';

interface Props {
  browsers: AnalyticsBrowser[];
}

export const AnalyticsBrowsers: FC<Props> = ({ browsers }) => {
  const total = sum(browsers.map(b => b.count));
  const ordered = orderBy(browsers, 'count', 'desc');

  const percentage = (count: number) => total ? Math.round((count / total) * 100) : 0;

  const offset = 100 - percentage(first(ordered)?.count || 0);

  const offsettedPercentage = (count: number) => offset + percentage(count);

  return (
    <ul>
      {ordered.map(browser => (
        <li key={browser.name}>
          <Browser name={browser.name} height={32} width={32} />
          <div className='contents'>
            <div className='percentage' style={{ width: `${offsettedPercentage(browser.count)}%` }} />
            <p><b>{percentage(browser.count)}%</b> {browser.name}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};
