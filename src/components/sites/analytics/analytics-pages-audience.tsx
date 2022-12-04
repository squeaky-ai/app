import React from 'react';
import type { FC } from 'react';
import { Card } from 'components/card';
import { Error } from 'components/error';
import { PageLoading } from 'components/sites/page-loading';
import { getDateRange } from 'lib/dates';
import { AnalyticsCountries } from 'components/sites/analytics/analytics-countries';
import { AnalyticsLanguages } from 'components/sites/analytics/analytics-languages';
import { AnalyticsBrowsers } from 'components/sites/analytics/analytics-browsers';
import { AnalyticsDevices } from 'components/sites/analytics/analytics-devices';
import { AnalyticsScreenWidths } from 'components/sites/analytics/analytics-screen-widths';
import { AnalyticsReferrers } from 'components/sites/analytics/analytics-referrers';
import { useAnalyticsPageAudience } from 'hooks/use-analytics-page-audience';
import { useSort } from 'hooks/use-sort';
import type { AnalyticsBrowsersSort, Site } from 'types/graphql';
import type { TimePeriod } from 'types/common';

interface Props {
  site: Site;
  page: string;
  period: TimePeriod;
}

export const AnalyticsPagesAudience: FC<Props> = ({ site, page, period }) => {
  const [browsersPage, setBrowsersPage] = React.useState<number>(1);
  const [referrersPage, setReferrersPage] = React.useState<number>(1);

  const { sort: browsersSort, setSort: setBrowsersSort } = useSort<AnalyticsBrowsersSort>('analytics-browsers');

  const { analytics, error, loading } = useAnalyticsPageAudience({
    page,
    site,
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

  return (
    <div className='analytics-audience pages'>
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
