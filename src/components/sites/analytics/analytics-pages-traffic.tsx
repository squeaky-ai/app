import React from 'react';
import type { FC } from 'react';
import { Icon } from 'components/icon';
import { Card } from 'components/card';
import { PageLoading } from 'components/sites/page-loading';
import { Error } from 'components/error';
import { AnalyticsPagesAverageDuration } from 'components/sites/analytics/analytics-pages-average-duration';
import { AnalyticsPagesAverageVisitsPerSession } from 'components/sites/analytics/analytics-pages-average-visits-per-session';
import { AnalyticsPagesBounceRate } from 'components/sites/analytics/analytics-pages-bounce-rate';
import { AnalyticsPagesExitRate } from 'components/sites/analytics/analytics-pages-exit-rate';
import { getDateRange } from 'lib/dates';
import { useAnalyticsPageTraffic } from 'hooks/use-analytics-page-traffic';
import type { Site } from 'types/graphql';
import type { TimePeriod } from 'types/common';

interface Props {
  site: Site;
  page: string;
  period: TimePeriod;
}

export const AnalyticsPagesTraffic: FC<Props> = ({ site, page, period }) => {
  const { loading, error, analytics } = useAnalyticsPageTraffic({
    site,
    range: getDateRange(period),
    page,
  });

  if (loading) {
    return <PageLoading />
  }

  if (error) {
    return <Error />
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
          <h5>Visitors</h5>
        </Card>
      </div>

      <div className='grid-item time-of-day'>
        <Card>
          <h5><Icon name='group-line' /> Visitors by time of day</h5>
        </Card>
      </div>

      <div className='grid-item time-averages'>
        <Card>

        </Card>
      </div>
    </div>
  );
};
