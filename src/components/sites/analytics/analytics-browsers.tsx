import React from 'react';
import type { FC } from 'react';
import { Browser } from 'components/browser';
import { Pagination } from 'components/pagination';
import { Card } from 'components/card';
import { AnalyticsBrowsers as AnalyticsBrowsersType } from 'types/graphql';

interface Props {
  browsers: AnalyticsBrowsersType;
  page: number;
  setPage: (page: number) => void;
}

export const AnalyticsBrowsers: FC<Props> = ({ browsers, page, setPage }) => {
  const { total, pageSize } = browsers.pagination;

  const offset = 100 - browsers.items[0]?.percentage || 0;

  const offsettedPercentage = (percent: number) => offset + percent;

  return (
    <>
      <Card>
        <ul>
          {browsers.items.map(browser => (
            <li key={browser.browser}>
              <Browser name={browser.browser} height={32} width={32} />
              <div className='contents'>
                <div className='percentage' style={{ width: `${offsettedPercentage(browser.percentage)}%` }} />
                <p><b>{browser.percentage}%</b> {browser.browser}</p>
              </div>
            </li>
          ))}
        </ul>
      </Card>
      
      <Pagination
        currentPage={page}
        pageSize={pageSize}
        total={total}
        setPage={setPage}
        scrollToTop={false}
      />
    </>
  );
};
