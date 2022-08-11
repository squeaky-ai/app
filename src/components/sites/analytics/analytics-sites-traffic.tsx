import React from 'react';
import type { FC } from 'react';
import { Card } from 'components/card';
import { AnalyticsVisitors } from 'components/sites/analytics/analytics-visitors';
import { AnalyticsSessionDuration } from 'components/sites/analytics/analytics-session-duration';
import { AnalyticsSessionsPerVisitor } from 'components/sites/analytics/analytics-sessions-per-visitor';
import { AnalyticsPagesPerSession } from 'components/sites/analytics/analytics-pages-per-session';
import { AnalyticsVisitsAt } from 'components/sites/analytics/analytics-visits-at';
import { AnalyticsTimeAverages } from 'components/sites/analytics/analytics-time-averages';
import { AnalyticsPageViews } from 'components/sites/analytics/analytics-page-views';
import { AnalyticsPages } from 'components/sites/analytics/analytics-pages';
import { Error } from 'components/error';
import { Icon } from 'components/icon';
import { NoResults } from 'components/sites/no-results';
import { PageLoading } from 'components/sites/page-loading';
import { useAnalyticsTraffic } from 'hooks/use-analytics-traffic';
import { getDateRange } from 'lib/dates';
import { useSort } from 'hooks/use-sort';
import type { AnalyticsPagesSort, Site } from 'types/graphql';
import type { TimePeriod } from 'types/common';

interface Props {
  site: Site;
  period: TimePeriod;
}

export const AnalyticsSitesTraffic: FC<Props> = ({ site, period }) => {
  const [pagesPage, setPagesPage] = React.useState<number>(1);
  
  const { sort: pagesSort, setSort: setPagesSort } = useSort<AnalyticsPagesSort>('analytics-pages');

  const { analytics, error, loading } = useAnalyticsTraffic({
    site,
    pagesPage,
    pagesSort,
    range: getDateRange(period),
  });

  if (error) {
    return <Error />;
  }

  if (loading) {
    return <PageLoading />
  }

  if (!analytics.visitors.items.length) {
    return <NoResults title='There is no analytics data available for your chosen period' illustration='illustration-2' />
  }

  return (
    <div className='analytics-site-traffic'>
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

        <div className='grid-item time-of-day'>
          <Card>
            <h5><Icon name='group-line' /> Visitors by time of day</h5>
            <AnalyticsVisitsAt visitsAt={analytics.visitsAt} />
          </Card>
        </div>

        <div className='grid-item time-averages'>
          <Card>
            <AnalyticsTimeAverages visitsAt={analytics.visitsAt} />
          </Card>
        </div>

        <div className='grid-item page-views'>
          <Card>
            <AnalyticsPageViews pageViews={analytics.pageViews} period={period} />
          </Card>
        </div>

        <div className='grid-item pages'>
          <h4>Pages</h4>
          <AnalyticsPages 
            site={site}
            pages={analytics.pages}
            page={pagesPage} 
            sort={pagesSort}
            setPage={setPagesPage}
            setSort={setPagesSort}
          />
        </div>
    </div>
  );
};
