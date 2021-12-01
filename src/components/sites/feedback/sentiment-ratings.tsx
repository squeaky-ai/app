import React from 'react';
import type { FC } from 'react';
import { ResponsiveContainer, CartesianGrid, LineChart, Line, YAxis, XAxis } from 'recharts';
import { formatResultsForPeriod } from 'lib/feedback/ratings';
import { EMOJIS } from 'data/sentiment/constants';
import type { FeedbackSentimentRating } from 'types/graphql';
import type { TimePeriod } from 'lib/dates';

interface Props {
  period: TimePeriod;
  ratings: FeedbackSentimentRating[];
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
            tick={(props) => ( 
              <image 
                {...props} 
                href={EMOJIS[props.payload.value]} 
                height={24} 
                width={24} 
                transform={
                  props.payload.value === 4
                    ? 'translate(-24, -24)'
                    : 'translate(-24, -12)'
                }
              />
            )}
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
