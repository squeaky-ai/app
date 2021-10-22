import React from 'react';
import type { FC } from 'react';
import { useAnalytics } from 'hooks/use-analytics';
import { Spinner } from 'components/spinner';
import { Card } from 'components/card';
import { getDateRange, toMinutesAndSeconds } from 'lib/dates';
import { AnalyticsPages } from 'components/sites/analytics-pages';
import { AnalyticsBrowsers } from 'components/sites/analytics-browsers';
import { AnalyticsLanguages } from 'components/sites/analytics-languages';
import { AnalyticsDevices } from 'components/sites/analytics-devices';
import { AnalyticsReferrers } from 'components/sites/analytics-referrers';
import { AnalyticsVisitors } from 'components/sites/analytics-visitors';
import { AnalyticsPageViews } from 'components/sites/analytics-page-views';
import type { TimePeriod } from 'lib/dates';

interface Props {
  period: TimePeriod;
}

export const Analytics: FC<Props> = ({ period }) => {
  const { analytics } = useAnalytics(getDateRange(period));

  const toTwoDecimalPlaces = (value: number) => value.toFixed(2);

  if (!analytics) {
    return <Spinner />;
  }

  return (
    <>
      <div className='analytics-grid'>
        <div className='grid-item visitors-graph'>
          <Card>
            <AnalyticsVisitors visitors={analytics.visitors} period={period} />
          </Card>
        </div>

        <div className='grid-item average-session-duration'>
          <Card>
            <h4>Average Session Duration</h4>
            <div className='numbered-grid blue'>
              <h3>{toMinutesAndSeconds(analytics.averageSessionDuration)}</h3>
            </div>
          </Card>
        </div>

        <div className='grid-item average-session-per-visitors'>
          <Card>
            <h4>Average Sessions Per Visitor</h4>
            <div className='numbered-grid blue'>
              <h3>{toTwoDecimalPlaces(analytics.averageSessionsPerVisitor)}</h3>
            </div>
          </Card>
        </div>

        <div className='grid-item pages-per-session'>
          <Card>
            <h4>Pages Per Session</h4>
            <div className='numbered-grid purple'>
              <h3>{toTwoDecimalPlaces(analytics.pagesPerSession)}</h3>
            </div>
          </Card>
        </div>

        <div className='grid-item page-views'>
          <Card>
            <AnalyticsPageViews pageViews={analytics.pageViews} period={period} />
          </Card>
        </div>

        <div className='grid-item pages'>
          <h4>Pages</h4>
          <AnalyticsPages pages={analytics.pages} />
        </div>

        <div className='grid-item browsers'>
          <h4>Browser</h4>
          <Card>
            <AnalyticsBrowsers browsers={analytics.browsers} />
          </Card> 
        </div>

        <div className='grid-item referrers'>
          <h4>Traffic Sources</h4>
          <AnalyticsReferrers referrers={analytics.referrers} />
        </div>

        <div className='grid-item languages'>
          <h4>Language</h4>
          <Card>
            <AnalyticsLanguages languages={analytics.languages} />
          </Card>   
        </div>

        <div className='grid-item devices'>
          <h4>Devices</h4>
          <AnalyticsDevices devices={analytics.devices} />
        </div>

        <div className='grid-item screen-widths'>
          <h4>Screen Widths</h4>
          <Card>
            <h4>
              Screen Width
              <i className='ri-arrow-left-line' />
              <i className='ri-arrow-right-line' />
            </h4>
            <div className='items'>
              <div className='item'>
                <p>Largest</p>
                <h3>{analytics.dimensions.max}px</h3>
              </div>
              <div className='item'>
                <p>Average</p>
                <h3>{analytics.dimensions.avg}px</h3>
              </div>
              <div className='item'>
                <p>Smallest</p>
                <h3>{analytics.dimensions.min}px</h3>
              </div>
            </div>
          </Card>    
        </div>
      </div>
    </>
  );
};