import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { Card } from 'components/card';
import { Icon } from 'components/icon';
import type { Site, Team } from 'types/graphql';
import type { TimePeriod } from 'types/common';

interface Props {
  site: Site;
  member?: Team;
  period: TimePeriod;
}

export const Dashboard: FC<Props> = ({ site }) => {
  return (
    <div className='dashboard-v2'>
      <div className='dashboard-grid'>
        <Card className='visitors'>
          <h5>
            <Icon name='group-line' />
            <Link href={`/sites/${site.id}/visitors`}>
              <a>Visitors</a>
            </Link>
          </h5>
          <div className='dashboard-empty-state'>
            <Icon name='time-line' />
            <p>No data available</p>
          </div>
        </Card>
        <Card className='recordings'>
          <h5>
            <Icon name='vidicon-line' />
            <Link href={`/sites/${site.id}/recordings`}>
              <a>Recordings</a>
            </Link>
          </h5>
          <div className='dashboard-empty-state'>
            <Icon name='time-line' />
            <p>No data available</p>
          </div>
        </Card>
        <Card className='bounce-rate'>
          <h5>
            <Icon name='arrow-left-right-line' />
            Bounce Rate
          </h5>
          <div className='dashboard-empty-state'>
            <Icon name='time-line' />
            <p>No data available</p>
          </div>
        </Card>
        <Card className='exit-rate'>
          <h5>
            <Icon name='logout-box-line' />
            Exit Rate
          </h5>
          <div className='dashboard-empty-state'>
            <Icon name='time-line' />
            <p>No data available</p>
          </div>
        </Card>
        <Card className='page-views'>
          <h5>
            <Icon name='pages-line' />
            <Link href={`/sites/${site.id}/analytics/site/traffic`}>
              <a>Page Views</a>
            </Link>
          </h5>
          <div className='dashboard-empty-state'>
            <Icon name='time-line' />
            <p>No data available</p>
          </div>
        </Card>
        <Card className='errors'>
          <h5>
            <Icon name='error-warning-line' />
            <Link href={`/sites/${site.id}/errors`}>
              <a>Errors</a>
            </Link>
          </h5>
        </Card>
      </div>
    </div>
  );
};
