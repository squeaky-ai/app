import React from 'react';
import type { FC } from 'react';
import { sum, orderBy } from 'lodash';
import { Browser } from 'components/browser';
import { AnalyticsBrowser } from 'types/analytics';

interface Props {
  browsers: AnalyticsBrowser[];
}

export const AnalyticsBrowsers: FC<Props> = ({ browsers }) => {
  const total = sum(browsers.map(b => b.count));

  const percentage = (count: number) => Math.round((count / total) * 100);

  return (
    <ul className='analytics-browsers'>
      {orderBy(browsers, 'count', 'desc').map(browser => (
        <li key={browser.name}>
          <Browser name={browser.name} height={32} width={32} />
          <div className='contents'>
            <div className='percentage' style={{ width: `${percentage(browser.count)}%` }} />
            <p><b>{percentage(browser.count)}%</b> {browser.name}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};
