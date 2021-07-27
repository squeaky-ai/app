import React from 'react';
import type { FC } from 'react';
import { sum, slice } from 'lodash';
import type { AnalyticsPage } from 'types/analytics';

interface Props {
  pages: AnalyticsPage[];
}

export const AnalyticsPages: FC<Props> = ({ pages }) => {
  const total = sum(pages.map(p => p.count));

  const percentage = (count: number) => Number(((count / total) * 100).toFixed(2));

  const results = slice(pages, 0, 10);

  return (
    <div className='table analytics-pages'>
      <table cellSpacing='0'>
        <thead>
          <tr>
            <th>Page</th>
            <th>Views</th>
            <th>Average time on page</th>
          </tr>
        </thead>
        <tbody>
          {results.map(page => (
            <tr key={page.path}>
              <td>{page.path}</td>
              <td><b>{page.count}</b> <span className='percentage'>({percentage(page.count)}%)</span></td>
              <td>00:00:00</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
