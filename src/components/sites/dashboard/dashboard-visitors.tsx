import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { Icon } from 'components/icon';
import { Pill } from 'components/pill';
import { Label } from 'components/label';
import { DashboardChart } from 'components/sites/dashboard/dashboard-chart';
import type { Site } from 'types/graphql';
import type { Dashboard } from 'types/dashboard';

interface Props {
  site: Site;
  dashboard: Dashboard;
}

export const DashboardVisitors: FC<Props> = ({ site, dashboard }) => {
  const hasVisitors = dashboard.visitorsCount.total > 0;

  return (
    <>
      <div className='heading'>
        <h5>
          <Icon name='group-line' />
          <Link href={`/sites/${site.id}/visitors`}>
            <a>Visitors</a>
          </Link>
        </h5>
      </div>
      {!hasVisitors && (
        <div className='dashboard-empty-state'>
          <Icon name='time-line' />
          <p>No data available</p>
        </div>
      )}
      {hasVisitors && (
        <>
          <DashboardChart />
          <div className='heading'>
            <h3>{dashboard.visitorsCount.total}</h3>
            <Pill className='medium tertiary'>{dashboard.visitorsCount.new} New</Pill>
            <Pill className='medium secondary'>{dashboard.visitorsCount.total - dashboard.visitorsCount.new} Existing</Pill>
          </div>
          <Label>Most active</Label>
          <Label>Newest</Label>
        </>
      )}
    </>
  );
};
