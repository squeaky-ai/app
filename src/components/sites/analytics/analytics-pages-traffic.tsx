import React from 'react';
import type { FC } from 'react';
import { Icon } from 'components/icon';
import { Card } from 'components/card';
import type { Site } from 'types/graphql';
import type { TimePeriod } from 'types/common';

interface Props {
  site: Site;
  page: string;
  period: TimePeriod;
}

export const AnalyticsPagesTraffic: FC<Props> = () => {
  return  (
    <div className='analytics-traffic pages'>
      <div className='grid-item average-time-on-page'>
        <Card>
          <h5>Average Time On Page</h5>
        </Card>
      </div>

      <div className='grid-item average-visits-per-session'>
        <Card>
          <h5>Average Visits Per Session</h5>
        </Card>
      </div>

      <div className='grid-item bounce-rate'>
        <Card>
          <h5>Bounce Rate</h5>
        </Card>
      </div>

      <div className='grid-item exit-rate'>
        <Card>
          <h5>Exit Rate</h5>
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
