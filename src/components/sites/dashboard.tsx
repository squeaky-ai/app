import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { Card } from 'components/card';
import { Icon } from 'components/icon';
import { useDashboard } from 'hooks/use-dashboard';
import { Error } from 'components/error';
import { PageLoading } from 'components/sites/page-loading';
import { DashboardPageViews } from 'components/sites/dashboard/dashboard-page-views';
import { DashboardBounceRate } from 'components/sites/dashboard/dashboard-bounce-rate';
import { DashboardExitRate } from 'components/sites/dashboard/dashboard-exit-rate';
import { getDateRange } from 'lib/dates';
import type { Site, Team } from 'types/graphql';
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
        <div className='heading'>
          <h5>
            <Icon name='group-line' />
            <Link href={`/sites/${site.id}/visitors`}>
              <a>Visitors</a>
            </Link>
          </h5>
        </div>
        <div className='dashboard-empty-state'>
          <Icon name='time-line' />
          <p>No data available</p>
        </div>
      </Card>
      <Card className='recordings'>
        <div className='heading'>
          <h5>
            <Icon name='vidicon-line' />
            <Link href={`/sites/${site.id}/recordings`}>
              <a>Recordings</a>
            </Link>
          </h5>
        </div>
        <div className='dashboard-empty-state'>
          <Icon name='time-line' />
          <p>No data available</p>
        </div>
      </Card>
      <Card className='bounce-rate'>
        <DashboardBounceRate site={site} dashboard={dashboard} />
      </Card>
      <Card className='exit-rate'>
        <DashboardExitRate site={site} dashboard={dashboard} />
      </Card>
      <Card className='page-views'>
        <DashboardPageViews site={site} dashboard={dashboard} />
      </Card>
      <Card className='errors'>
        <div className='heading'>
          <h5>
            <Icon name='error-warning-line' />
            <Link href={`/sites/${site.id}/errors`}>
              <a>Errors</a>
            </Link>
          </h5>
        </div>
      </Card>
    </div>
  );
};
