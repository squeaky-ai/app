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
import { useSort } from 'hooks/use-sort';
import { AnalyticsBrowsersSort } from 'types/graphql';
import type { TimePeriod } from 'types/common';

interface Props {
  period: TimePeriod;
}

export const AnalyticsSitesAudience: FC<Props> = ({ period }) => {
  const [browsersPage, setBrowsersPage] = React.useState<number>(1);
  const [referrersPage, setReferrersPage] = React.useState<number>(1);

  const { sort: browsersSort, setSort: setBrowsersSort } = useSort<AnalyticsBrowsersSort>('analytics-browsers');

  const { analytics, error, loading } = useAnalyticsAudience({
    referrersPage,
    browsersPage,
    browsersSort,
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
          <AnalyticsCountries countries={analytics.countries} />
        </Card>
      </div>

      <div className='grid-item referrers'>
        <h4>Traffic Sources</h4>
        <AnalyticsReferrers 
          referrers={analytics.referrers} 
          page={referrersPage} 
          setPage={setReferrersPage}
        />
      </div>

      <div className='grid-item languages'>
        <h4>Language</h4>
        <AnalyticsLanguages languages={analytics.languages} />
      </div>

      <div className='grid-item browsers'>
        <h4>Browser</h4>
        <AnalyticsBrowsers 
          browsers={analytics.browsers} 
          page={browsersPage}
          setPage={setBrowsersPage}
          sort={browsersSort}
          setSort={setBrowsersSort}
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
