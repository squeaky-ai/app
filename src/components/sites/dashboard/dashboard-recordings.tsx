import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { Icon } from 'components/icon';
import { Label } from 'components/label';
import { Pill } from 'components/pill';
import { DashboardChart } from 'components/sites/dashboard/dashboard-chart';
import type { Site } from 'types/graphql';
import type { Dashboard } from 'types/dashboard';

interface Props {
  site: Site;
  dashboard: Dashboard;
}

export const DashboardRecordings: FC<Props> = ({ site, dashboard }) => {
  const hasRecordings = dashboard.recordingsCount.total > 0;

  return (
    <>
      <div className='heading'>
        <h5>
          <Icon name='group-line' />
          <Link href={`/sites/${site.id}/recordings`}>
            <a>Recordings</a>
          </Link>
        </h5>
      </div>
      {!hasRecordings && (
        <div className='dashboard-empty-state'>
          <Icon name='time-line' />
          <p>No data available</p>
        </div>
      )}
      {hasRecordings && (
        <>
          <DashboardChart />
          <div className='heading'>
            <h3>{dashboard.recordingsCount.total}</h3>
            <Pill className='medium tertiary'>{dashboard.recordingsCount.new} New</Pill>
            <Pill className='medium secondary'>{dashboard.recordingsCount.total - dashboard.recordingsCount.new} Viewed</Pill>
          </div>
          <Label>Most eventful</Label>
          <Label>Longest</Label>
        </>
      )}
    </>
  );
};
