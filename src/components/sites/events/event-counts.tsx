import React from 'react';
import type { FC } from 'react';
import { ScaleType } from 'recharts/types/util/types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, TooltipProps } from 'recharts';
import { sum } from 'lodash';
import { Card } from 'components/card';
import { EventSwatch } from 'components/sites/events/event-swatch';
import { ChartScale } from 'components/sites/analytics/chart-scale';
import { sortEventsStats } from 'lib/events';
import { formatLabel } from 'lib/charts';
import { colors } from 'lib/colors';
import { formatResultsForGroupType } from 'lib/charts-v2';
import type { EventStats } from 'hooks/use-event-stats';
import type { EventStatsSort} from 'types/events';
import type { TimePeriod } from 'types/common';
import type { EventsCount, EventsCountMetric } from 'types/graphql';

interface Props {
  sort: EventStatsSort;
  eventStats: EventStats;
  period: TimePeriod;
}

export const EventCounts: FC<Props> = ({ sort, eventStats, period }) => {
  const [scale, setScale] = React.useState<ScaleType>('auto');

  const totalCount = sum(eventStats.eventStats.map(s => s.count));

  const doNotAllowZero = (num: number) => num === 0 && scale === 'log' ? null : num;

  // To avoid hitting issues with GraphQL caching the datekey
  // is returned with the id when it is a metric count so it
  // must be stripped off
  const buildKeyFromMetric = (metric: EventsCountMetric) => `${metric.type}::${metric.id.split('::')[1]}`;

  const sortedEventsStats = sortEventsStats(eventStats.eventStats, sort);

  const metricKeys = eventStats.eventCounts
    .items
    .map(item => item.metrics.map(metric => buildKeyFromMetric(metric)))
    .flat();
  
  const results = formatResultsForGroupType<EventsCount>(eventStats.eventCounts, period, { metrics: [] }).map(d => {
    const result: Record<string, string | number> = { dateKey: d.dateKey };

    // Set the defaults
    metricKeys.forEach(key => { result[key] = doNotAllowZero(0) });

    // Override this with metric keys we have values for
    d.metrics.forEach(metric => {
      result[buildKeyFromMetric(metric)] = doNotAllowZero(metric.count);
    });

    return result;
  });

  const CustomTooltip: FC<TooltipProps<any, any>> = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;

    const metrics = results.find(r => r.dateKey === label);
  
    return (
      <div className='custom-tooltip'>
        <p className='date'>{formatLabel(period, label)}</p>
        {sortedEventsStats.map((stat, index) => (
          <p key={stat.eventOrGroupId} style={{ color: colors[index] }}>
            {stat.name} {metrics[`${stat.type}::${stat.eventOrGroupId}`]}
          </p>
        ))}
      </div>
    );
  };

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
        {eventStats.eventStats.map((stat, index) => (
          <div className='item' key={stat.eventOrGroupId}>
            <EventSwatch index={index} />
            <p>{stat.name}</p>
          </div>
        ))}
      </div>
      <div className='graph-wrapper'>
        <ResponsiveContainer>
          <LineChart data={results} margin={{ top: 16, left: -30, right: 0, bottom: 16 }}>
            <CartesianGrid strokeDasharray='3 3' vertical={false} />

            <XAxis dataKey='dateKey' stroke='var(--gray-blue-800)' tickLine={false} tickMargin={10} />
            <YAxis stroke='var(--gray-blue-800)' tickLine={false} tickMargin={10} domain={['auto', 'auto']} scale={scale} />

            <Tooltip content={<CustomTooltip />} />

            {eventStats.eventStats.map((stat, index) => (
              <Line 
                key={stat.eventOrGroupId}
                dataKey={`${stat.type}::${stat.eventOrGroupId}`}
                fillOpacity={1}
                stroke={colors[index]}
                strokeWidth={2}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
