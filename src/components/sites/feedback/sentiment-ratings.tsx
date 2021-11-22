import React from 'react';
import type { FC } from 'react';
import { ResponsiveContainer, CartesianGrid, LineChart, Line, YAxis, XAxis } from 'recharts';
import { formatResultsForPeriod } from 'lib/feedback/ratings';
import { EMOJIS } from 'data/sentiment/constants';
import type { SentimentRating } from 'types/sentiment';
import type { TimePeriod } from 'lib/dates';

interface Props {
  period: TimePeriod;
  ratings: SentimentRating[];
}

export const SentimentRatings: FC<Props> = ({ period, ratings }) => {
  const { data } = formatResultsForPeriod(period, ratings);


  return (
    <div className='chart-wrapper'>
      <ResponsiveContainer>
        <LineChart data={data} height={250} margin={{ left: -15 }}>
          <YAxis 
            dataKey='score'
            allowDecimals={false}
            tickLine={false}
            axisLine={false}
            fontSize={20}
            tickMargin={10}
            tickFormatter={(x) => EMOJIS[x]}
          />

          <XAxis 
            dataKey='date'
            tickLine={false}
            axisLine={false}
            fontSize={13}
            tickMargin={10}
          />

          <Line dataKey='score' fillOpacity={1} stroke='#4097E8' strokeWidth={2} />

          <CartesianGrid strokeDasharray='3 3' vertical={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
