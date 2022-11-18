import React from 'react';
import type { FC } from 'react';
import { ScaleType } from 'recharts/types/util/types';
import { Trend } from 'components/trend';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, TooltipProps } from 'recharts';
import { ChartOptions } from 'components/sites/chart-options';
import { formatLabel } from 'lib/charts';
import { formatResultsForGroupType } from 'lib/charts-v2';
import type { AnalyticsPageView, AnalyticsPageViews as AnalyticsPageViewsType } from 'types/graphql';
import type { TimePeriod } from 'types/common';

interface Props {
  period: TimePeriod;
  pageViews: AnalyticsPageViewsType;
}

export const AnalyticsPageViews: FC<Props> = ({ pageViews, period }) => {
  const [scale, setScale] = React.useState<ScaleType>('auto');

  const doNotAllowZero = (num: number) => num === 0 && scale === 'log' ? null : num;

  const results = formatResultsForGroupType<AnalyticsPageView>(pageViews, period, { count: 0 }).map(d => ({
    dateKey: d.dateKey,
    totalCount: doNotAllowZero(d.count),
  }));

  const CustomTooltip: FC<TooltipProps<any, any>> = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
  
    return (
      <div className='custom-tooltip'>
        <p className='date'>{formatLabel(period, label)}</p>
        <p className='all'>{payload[0].payload.totalCount} All Page Views</p>
      </div>
    );
  };

  return (
    <div className='analytics-graph'>
      <div className='heading'>
        <div className='title'>
          <h5>Page Views</h5>
          <h3>{pageViews.total.toLocaleString()}</h3>
          <Trend direction={pageViews.trend >= 0 ? 'up' : 'down'} value={pageViews.trend.toFixed(2)} />
        </div>

        <div className='actions'>
          <ChartOptions scale={scale} setScale={setScale} />
        </div>
      </div>
      <div className='graph-wrapper'>
        <ResponsiveContainer>
          <LineChart data={results} margin={{ top: 0, left: -8, right: 8, bottom: 8 }}>
            <CartesianGrid strokeDasharray='3 3' vertical={false} />

            <XAxis dataKey='dateKey' stroke='var(--gray-blue-800)' tickLine={false} tickMargin={10} fontSize={14} />
            <YAxis stroke='var(--gray-blue-800)' tickLine={false} tickMargin={10} domain={['auto', 'auto']} fontSize={14} scale={scale} />

            <Tooltip content={<CustomTooltip />} />
  
            <Line dataKey='totalCount' fillOpacity={1} stroke='#8249FB' strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
