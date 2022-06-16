import React from 'react';
import type { FC } from 'react';
import { ScaleType } from 'recharts/types/util/types';
import { sum } from 'lodash';
import { Card } from 'components/card';
import { EventSwatch } from 'components/sites/events/event-swatch';
import { ChartScale } from 'components/sites/analytics/chart-scale';
import { sortEventsStats } from 'lib/events';
import type { EventStatsSort} from 'types/events';
import type { EventsStat } from 'types/graphql';

interface Props {
  sort: EventStatsSort;
  eventStats: EventsStat[];
}

export const EventCounts: FC<Props> = ({ sort, eventStats }) => {
  const [scale, setScale] = React.useState<ScaleType>('auto');

  const totalCount = sum(eventStats.map(s => s.count));

  return (
    <Card className='event-counts'>
      <div className='heading'>
        <div className='title'>
          <h5>Events Triggered</h5>
          <h3>{totalCount}</h3>
        </div>
        <div className='actions'>
          <ChartScale scale={scale} setScale={setScale} />
        </div>
      </div>
      <div className='key'>
        {sortEventsStats(eventStats, sort).map((stat, index) => (
          <div className='item' key={stat.id}>
            <EventSwatch index={index} />
            <p>{stat.name}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};
