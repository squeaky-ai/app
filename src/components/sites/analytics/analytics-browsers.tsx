import React from 'react';
import type { FC } from 'react';
import { Browser } from 'components/browser';
import { Card } from 'components/card';
import { Button } from 'components/button';
import { AnalyticsBrowsers as AnalyticsBrowsersType } from 'types/graphql';

interface Props {
  browsers: AnalyticsBrowsersType;
  loading: boolean;
}

export const AnalyticsBrowsers: FC<Props> = ({ browsers, loading }) => {
  const [showAll, setShowAll] = React.useState<boolean>(false);

  const limit = 5;
  const offset = 100 - browsers.items[0]?.percentage || 0;

  const offsettedPercentage = (percent: number) => offset + percent;

  const results = showAll ? browsers.items : browsers.items.slice(0, limit);

  return (
    <>
      <Card loading={loading}>
        <h4>Browser</h4>
        <ul>
          {results.map(browser => (
            <li key={browser.browser}>
              <Browser name={browser.browser} height={32} width={32} />
              <div className='contents'>
                <div className='percentage' style={{ width: `${offsettedPercentage(browser.percentage)}%` }} />
                <p><b>{browser.percentage}%</b> {browser.browser}</p>
              </div>
            </li>
          ))}
        </ul>

        {browsers.items.length > limit && (
          <Button onClick={() => setShowAll(!showAll)} className='link show-all'>
            Show {showAll ? 'Less' : 'All'}
          </Button>
        )}
      </Card>
    </>
  );
};
