import React from 'react';
import type { FC } from 'react';
import { ScaleType } from 'recharts/types/util/types';
import { sum } from 'lodash';
import { Card } from 'components/card';
import { EventSwatch } from 'components/sites/events/event-swatch';
import { ChartScale } from 'components/sites/analytics/chart-scale';
import { sortEventsHistory } from 'lib/events';
import type { EventHistoryStatsSort} from 'types/events';
import type { EventsHistoryStat } from 'types/graphql';

interface Props {
  sort: EventHistoryStatsSort;
  eventHistoryStats: EventsHistoryStat[];
}

export const EventCounts: FC<Props> = ({ sort, eventHistoryStats }) => {
  const [scale, setScale] = React.useState<ScaleType>('auto');

  const totalCount = sum(eventHistoryStats.map(s => s.count));

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
        {sortEventsHistory(eventHistoryStats, sort).map((stat, index) => (
          <div className='item' key={stat.id}>
            <EventSwatch index={index} />
            <p>{stat.name}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};
