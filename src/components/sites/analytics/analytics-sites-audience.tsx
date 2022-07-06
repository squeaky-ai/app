import React from 'react';
import type { FC } from 'react';
import { Card } from 'components/card';
import { Error } from 'components/error';
import { NoResults } from 'components/sites/no-results';
import { AnalyticsBrowsers } from 'components/sites/analytics/analytics-browsers';
import { AnalyticsLanguages } from 'components/sites/analytics/analytics-languages';
import { AnalyticsCountries } from 'components/sites/analytics/analytics-countries';
import { AnalyticsReferrers } from 'components/sites/analytics/analytics-referrers';
import { AnalyticsDevices } from 'components/sites/analytics/analytics-devices';
import { AnalyticsScreenWidths } from 'components/sites/analytics/analytics-screen-widths';
import { PageLoading } from 'components/sites/page-loading';
import { useAnalyticsAudience } from 'hooks/use-analytics-audience';
import { getDateRange } from 'lib/dates';
import type { Site } from 'types/graphql';
import type { TimePeriod } from 'types/common';

interface Props {
  site: Site;
  period: TimePeriod;
}

export const AnalyticsSitesAudience: FC<Props> = ({ site, period }) => {
  const [referrersPage, setReferrersPage] = React.useState<number>(1);

  const { analytics, error, loading } = useAnalyticsAudience({
    site,
    referrersPage,
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
    <div className='analytics-audience sites'>
      <div className='grid-item countries'>
        <Card>
          <h4>Countries</h4>
          <AnalyticsCountries countries={analytics.countries} />
        </Card>
      </div>

      <div className='grid-item languages'>
        <Card>
          <h4>Language</h4>
          <AnalyticsLanguages languages={analytics.languages} />
        </Card>   
      </div>

      <div className='grid-item browsers'>
        <AnalyticsBrowsers browsers={analytics.browsers} />
      </div>

      <div className='grid-item referrers'>
        <h4>Traffic Sources</h4>
        <AnalyticsReferrers 
          referrers={analytics.referrers} 
          page={referrersPage} 
          setPage={setReferrersPage}
        />
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
  );
};
