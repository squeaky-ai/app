import React from 'react';
import type { FC } from 'react';
import { Card } from 'components/card';
import { PageLoading } from 'components/sites/page-loading';
import { Error } from 'components/error';
import { AnalyticsPagesAverageDuration } from 'components/sites/analytics/analytics-pages-average-duration';
import { AnalyticsPagesAverageVisitsPerSession } from 'components/sites/analytics/analytics-pages-average-visits-per-session';
import { AnalyticsPagesBounceRate } from 'components/sites/analytics/analytics-pages-bounce-rate';
import { AnalyticsPagesExitRate } from 'components/sites/analytics/analytics-pages-exit-rate';
import { AnalyticsVisitsAt } from 'components/sites/analytics/analytics-visits-at';
import { AnalyticsPageViews } from 'components/sites/analytics/analytics-page-views';
import { AnalyticsTimeAverages } from 'components/sites/analytics/analytics-time-averages';
import { useAnalyticsPageTraffic } from 'hooks/use-analytics-page-traffic';
import { NoResults } from 'components/sites/no-results';
import { getDateRange } from 'lib/dates';
import type { TimePeriod } from 'types/common';

interface Props {
  page: string;
  period: TimePeriod;
}

export const AnalyticsPagesTraffic: FC<Props> = ({ page, period }) => {
  const { loading, error, analytics } = useAnalyticsPageTraffic({
    range: getDateRange(period),
    page,
  });

  if (loading) {
    return <PageLoading />
  }

  if (error) {
    return <Error />
  }

  if (analytics.pageViews.items.length === 0) {
    return <NoResults title='There is no analytics data available for your chosen period' illustration='illustration-2' />
  }

  return (
    <div className='analytics-page-traffic pages'>
      <div className='grid-item average-time-on-page'>
        <Card>
          <AnalyticsPagesAverageDuration averageTimeOnPage={analytics.averageTimeOnPage} />
        </Card>
      </div>

      <div className='grid-item average-visits-per-session'>
        <Card>
          <AnalyticsPagesAverageVisitsPerSession averageVisitsPerSession={analytics.averageVisitsPerSession} />
        </Card>
      </div>

      <div className='grid-item bounce-rate'>
        <Card>
          <AnalyticsPagesBounceRate bounceRate={analytics.bounceRate} />
        </Card>
      </div>

      <div className='grid-item exit-rate'>
        <Card>
          <AnalyticsPagesExitRate exitRate={analytics.exitRate} />
        </Card>
      </div>

      <div className='grid-item visitors-graph'>
        <Card>
          <AnalyticsPageViews pageViews={analytics.pageViews} period={period} />
        </Card>
      </div>

      <div className='grid-item time-of-day'>
        <Card>
          <AnalyticsVisitsAt visitsAt={analytics.visitsAt} />
        </Card>
      </div>

      <div className='grid-item time-averages'>
        <Card>
          <AnalyticsTimeAverages visitsAt={analytics.visitsAt} />
        </Card>
      </div>
    </div>
  );
};
