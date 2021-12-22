import React from 'react';
import type { FC } from 'react';
import Image from 'next/image';
import { omit } from 'lodash';
import { ResponsiveContainer, CartesianGrid, LineChart, Line, YAxis, XAxis, Tooltip, TooltipProps } from 'recharts';
import { formatResultsForPeriod } from 'lib/feedback/ratings';
import { EMOJIS } from 'data/sentiment/constants';
import type { FeedbackSentimentRating } from 'types/graphql';
import type { TimePeriod } from 'types/common';

interface Props {
  period: TimePeriod;
  ratings: FeedbackSentimentRating[];
}

const getAxisProps = (props: any) => omit(props, [
  'tickFormatter',
  'verticalAnchor',
  'visibleTicksCount',
]);

export const SentimentRatings: FC<Props> = ({ period, ratings }) => {
  const { data } = formatResultsForPeriod(period, ratings);

  const CustomTooltip: FC<TooltipProps<any, any>> = ({ active, payload }) => {
    if (!active || payload?.length < 1) return null;
  
    return (
      <div className='custom-tooltip'>
        <p>Ratings</p>
        <p><Image height={16} width={16} src={EMOJIS[4]} /> <span>{payload[0].payload[4]}</span></p>
        <p><Image height={16} width={16} src={EMOJIS[3]} /> <span>{payload[0].payload[3]}</span></p>
        <p><Image height={16} width={16} src={EMOJIS[2]} /> <span>{payload[0].payload[2]}</span></p>
        <p><Image height={16} width={16} src={EMOJIS[1]} /> <span>{payload[0].payload[1]}</span></p>
        <p><Image height={16} width={16} src={EMOJIS[0]} /> <span>{payload[0].payload[0]}</span></p>
      </div>
    );
  };

  return (
    <div className='chart-wrapper'>
      <ResponsiveContainer>
        <LineChart data={data} height={250} margin={{ left: -15 }}>
          <CartesianGrid strokeDasharray='3 3' vertical={false} />

          <YAxis 
            dataKey='score'
            allowDecimals={false}
            tickLine={false}
            axisLine={false}
            fontSize={20}
            tickMargin={10}
            tick={(props) => ( 
              <image 
                {...getAxisProps(props)} 
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

          <Tooltip content={<CustomTooltip />} />

          <Line dataKey='score' fillOpacity={1} stroke='#4097E8' strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
