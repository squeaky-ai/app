import React from 'react';
import type { FC } from 'react';
import { useAnalytics } from 'hooks/use-analytics';
import { Spinner } from 'components/spinner';
import { Card } from 'components/card';
import { getDateRange } from 'lib/dates';
import { AnalyticsPages } from 'components/sites/analytics/analytics-pages';
import { AnalyticsBrowsers } from 'components/sites/analytics/analytics-browsers';
import { AnalyticsLanguages } from 'components/sites/analytics/analytics-languages';
import { AnalyticsDevices } from 'components/sites/analytics/analytics-devices';
import { AnalyticsReferrers } from 'components/sites/analytics/analytics-referrers';
import { AnalyticsVisitors } from 'components/sites/analytics/analytics-visitors';
import { AnalyticsPageViews } from 'components/sites/analytics/analytics-page-views';
import { AnalyticsSessionDuration } from 'components/sites/analytics/analytics-session-duration';
import { AnalyticsSessionsPerVisitor } from 'components/sites/analytics/analytics-sessions-per-visitor';
import { AnalyticsPagesPerSession } from 'components/sites/analytics/analytics-pages-per-session';
import { AnalyticsScreenWidths } from 'components/sites/analytics/analytics-screen-widths';
import { Error } from 'components/error';
import type { TimePeriod } from 'lib/dates';

interface Props {
  period: TimePeriod;
}

export const Analytics: FC<Props> = ({ period }) => {
  const { analytics, error, loading } = useAnalytics(getDateRange(period));

  if (error) {
    return <Error />;
  }

  if (!analytics || loading) {
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
            <h5>Average Session Duration</h5>
            <div className='numbered-grid blue'>
              <AnalyticsSessionDuration sessionDurations={analytics.sessionDurations} />
            </div>
          </Card>
        </div>

        <div className='grid-item average-session-per-visitors'>
          <Card>
            <h5>Average Sessions Per Visitor</h5>
            <div className='numbered-grid blue'>
              <AnalyticsSessionsPerVisitor sessionsPerVisitor={analytics.sessionsPerVisitor} />
            </div>
          </Card>
        </div>

        <div className='grid-item pages-per-session'>
          <Card>
            <h5>Pages Per Session</h5>
            <div className='numbered-grid purple'>
              <AnalyticsPagesPerSession pagesPerSession={analytics.pagesPerSession} />
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
          <AnalyticsScreenWidths dimensions={analytics.dimensions} /> 
        </div>
      </div>
    </>
  );
};