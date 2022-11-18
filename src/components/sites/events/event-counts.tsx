import React from 'react';
import type { FC } from 'react';
import { ScaleType } from 'recharts/types/util/types';
import { TooltipProps } from 'recharts';
import { sum } from 'lodash';
import { Card } from 'components/card';
import { EventSwatch } from 'components/sites/events/event-swatch';
import { ChartOptions } from 'components/sites/chart-options';
import { sortEventsStats } from 'lib/events';
import { formatLabel } from 'lib/charts';
import { colors } from 'lib/colors';
import { formatResultsForGroupType } from 'lib/charts-v2';
import { Chart } from 'components/sites/chart';
import type { ChartType } from 'types/charts';
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
  const [chartType, setChartType] = React.useState<ChartType>('line');

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
          <ChartOptions
            scale={scale} 
            setScale={setScale} 
            chartType={chartType}
            setChartType={setChartType}
          />
        </div>
      </div>
      <div className='key'>
        {sortedEventsStats.map((stat, index) => (
          <div className='item' key={stat.eventOrGroupId}>
            <EventSwatch index={index} />
            <p>{stat.name}</p>
          </div>
        ))}
      </div>
      <div className='graph-wrapper'>
        <Chart
          data={results}
          tooltip={CustomTooltip}
          scale={scale}
          chartType={chartType}
          items={sortedEventsStats.map(stat => ({ dataKey: `${stat.type}::${stat.eventOrGroupId}` }))}
        />
      </div>
    </Card>
  );
};
