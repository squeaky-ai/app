import React from 'react';
import type { FC } from 'react';
import { Card } from 'components/card';
import { useDashboard } from 'hooks/use-dashboard';
import { Error } from 'components/error';
import { PageLoading } from 'components/sites/page-loading';
import { DashboardPageViews } from 'components/sites/dashboard/dashboard-page-views';
import { DashboardBounceRate } from 'components/sites/dashboard/dashboard-bounce-rate';
import { DashboardExitRate } from 'components/sites/dashboard/dashboard-exit-rate';
import { DashboardVisitors } from 'components/sites/dashboard/dashboard-visitors';
import { DashboardRecordings } from 'components/sites/dashboard/dashboard-recordings';
import { DashboardErrors } from 'components/sites/dashboard/dashboard-errors';
import { getDateRange } from 'lib/dates';
import { PlanFeature, Site, Team } from 'types/graphql';
import type { TimePeriod } from 'types/common';

interface Props {
  site: Site;
  member?: Team;
  period: TimePeriod;
}

export const Dashboard: FC<Props> = ({ site, period }) => {
  const { dashboard, error, loading } = useDashboard({ range: getDateRange(period) });

  if (error) {
    return <Error />;
  }

  if (loading) {
    return <PageLoading />;
  }

  return (
    <div className='dashboard-grid'>
      <Card className='visitors'>
        <DashboardVisitors site={site} dashboard={dashboard} period={period} />
      </Card>
      <Card className='recordings'>
        <DashboardRecordings site={site} dashboard={dashboard} period={period} />
      </Card>
      <Card className='bounce-rate'>
        <DashboardBounceRate site={site} dashboard={dashboard} period={period} />
      </Card>
      <Card className='exit-rate'>
        <DashboardExitRate site={site} dashboard={dashboard} />
      </Card>
      <Card className='page-views'>
        <DashboardPageViews site={site} dashboard={dashboard} period={period} />
      </Card>
      {site.plan.featuresEnabled.includes(PlanFeature.ErrorTracking) && (
        <Card className='errors'>
          <DashboardErrors site={site} dashboard={dashboard} period={period} />
        </Card>
      )}
    </div>
  );
};
