import React from 'react';
import type { FC } from 'react';
import { ResponsiveContainer, CartesianGrid, LineChart, Line, YAxis, XAxis } from 'recharts';
import { formatResultsForPeriod } from 'lib/feedback/responses';
import type { FeedbackNpsReplies } from 'types/graphql';
import type { TimePeriod } from 'lib/dates';

interface Props {
  replies: FeedbackNpsReplies; 
  period: TimePeriod;
}

export const NpsReplies: FC<Props> = ({ period, replies }) => {
  const { data } = formatResultsForPeriod(period, replies.responses.map(r => r.timestamp));

  return (
    <div className='chart-wrapper'>
      <ResponsiveContainer>
        <LineChart data={data} height={150} margin={{ left: -35 }}>
          <YAxis 
            dataKey='count'
            allowDecimals={false}
            tickLine={false}
            axisLine={false}
            fontSize={13}
          />

          <XAxis 
            dataKey='date'
            tickLine={false}
            axisLine={false}
            fontSize={13}
            tickMargin={10}
          />

          <Line dataKey='count' fillOpacity={1} stroke='#4097E8' strokeWidth={2} />

          <CartesianGrid strokeDasharray='3 3' vertical={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
