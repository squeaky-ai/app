import React from 'react';
import type { FC } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, TooltipProps } from 'recharts';
import { Card } from 'components/card';
import { formatLabel } from 'lib/charts';
import { formatResultsForGroupType } from 'lib/charts-v2';
import type { TimePeriod } from 'types/common';
import type { ErrorsCounts, ErrorsCount } from 'types/graphql';

interface Props {
  counts: ErrorsCounts;
  period: TimePeriod;
}

export const ErrorCounts: FC<Props> = ({ counts, period }) => {
  const results = formatResultsForGroupType<ErrorsCount>(counts, period, { count: 0 }).map(d => ({
    dateKey: d.dateKey,
    count: d.count,
  }));

  const CustomTooltip: FC<TooltipProps<any, any>> = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
  
    return (
      <div className='custom-tooltip'>
        <p className='date'>{formatLabel(period, label)}</p>
        <p>{payload[0].payload.count} Errors</p>
      </div>
    );
  };

  return (
    <Card className='event-counts'>
      <div className='heading'>
        <div className='title'>
          <h5>All Errors</h5>
        </div>
      </div>
      <div className='graph-wrapper'>
        <ResponsiveContainer>
          <LineChart data={results} margin={{ top: 16, left: -16, right: 8, bottom: 8 }}>
            <CartesianGrid strokeDasharray='3 3' vertical={false} />

            <XAxis dataKey='dateKey' stroke='var(--gray-blue-800)' tickLine={false} tickMargin={10} />
            <YAxis stroke='var(--gray-blue-800)' tickLine={false} tickMargin={10} domain={['auto', 'auto']} scale='auto' />

            <Tooltip content={<CustomTooltip />} />

            {counts.items.map(count => (
              <Line 
                key={count.dateKey}
                dataKey='count'
                fillOpacity={1}
                stroke='var(--rose-500)'
                strokeWidth={2}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
