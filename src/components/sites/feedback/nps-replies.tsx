import React from 'react';
import type { FC } from 'react';
import { ResponsiveContainer, CartesianGrid, LineChart, Line, YAxis, XAxis, Tooltip, TooltipProps } from 'recharts';
import { formatChartData } from 'lib/charts';
import type { FeedbackNpsReplies, FeedbackNpsReply } from 'types/graphql';
import type { TimePeriod } from 'types/common';

interface Props {
  replies: FeedbackNpsReplies; 
  period: TimePeriod;
}

interface NpsCounts {
  promoters: number;
  passives: number;
  detractors: number;
}

const getNpsCounts = (replies: FeedbackNpsReply[]): NpsCounts => ({
  promoters: replies.filter(r => r.score >= 9).length,
  passives: replies.filter(r => [7, 8].includes(r.score)).length,
  detractors: replies.filter(r => r.score <= 6).length,
});

export const NpsReplies: FC<Props> = ({ period, replies }) => {
  const { data } = formatChartData<FeedbackNpsReply>(period, replies.responses);

  const results = data.map(d => ({
    date: d.key,
    count: d.data.length,
    ...getNpsCounts(d.data),
  }));

  // The graph looks crap if there's only a handful 
  // of results. So grab the max count, and dynamically
  // change the interval of the graph
  const max = Math.max(...results.map(d => d.count));

  const CustomTooltip: FC<TooltipProps<any, any>> = ({ active, payload }) => {
    if (!active || !payload[0]) return null;
  
    return (
      <div className='custom-tooltip'>
        <p>Outcome type</p>
        <p className='promoters'>{payload[0].payload.promoters} Promoters</p>
        <p className='passives'>{payload[0].payload.passives} Passives</p>
        <p className='detractors'>{payload[0].payload.detractors} Detractors</p>
      </div>
    );
  };

  return (
    <div className='chart-wrapper'>
      <ResponsiveContainer>
        <LineChart data={results} height={150} margin={{ left: -35 }}>
          <CartesianGrid strokeDasharray='3 3' vertical={false} />

          <YAxis 
            dataKey='count'
            allowDecimals={false}
            tickLine={false}
            axisLine={false}
            interval={max < 5 ? 0 : 'preserveEnd'}
            fontSize={13}
          />

          <XAxis 
            dataKey='date'
            tickLine={false}
            axisLine={false}
            fontSize={13}
            tickMargin={10}
          />

          <Tooltip content={<CustomTooltip />} />

          <Line dataKey='count' fillOpacity={1} stroke='#4097E8' strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
