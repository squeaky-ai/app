import React from 'react';
import type { FC } from 'react';
import { average } from 'lib/maths';
import { omit, groupBy } from 'lodash';
import { ResponsiveContainer, CartesianGrid, LineChart, Line, YAxis, XAxis, Tooltip, TooltipProps } from 'recharts';
import { formatChartData } from 'lib/charts';
import { Emoji } from 'components/emoji';
import type { FeedbackSentimentRating } from 'types/graphql';
import type { TimePeriod } from 'types/common';

interface Props {
  period: TimePeriod;
  ratings: FeedbackSentimentRating[];
}

interface FeedbackData {
  0: number;
  1: number;
  2: number;
  3: number;
  4: number;
}

const getAxisProps = (props: any) => omit(props, [
  'tickFormatter',
  'verticalAnchor',
  'visibleTicksCount',
]);

const avg = (nums: number[]) => Math.ceil(average(nums));

const groupScoreCounts = (ratings: FeedbackSentimentRating[]): FeedbackData => {
  const groups = groupBy(ratings.map(r => r.score));

  const count = (num: number) => (groups[num] || []).length;

  return {
    0: count(0),
    1: count(1),
    2: count(2),
    3: count(3),
    4: count(4),
  }
};

export const SentimentRatings: FC<Props> = ({ period, ratings }) => {
  const { data } = formatChartData<FeedbackSentimentRating>(period, ratings);

  const results = data.map(d => ({
    date: d.key,
    score: avg(d.data.map(s => s.score)),
    ...groupScoreCounts(d.data),
  }));

  const CustomTooltip: FC<TooltipProps<any, any>> = ({ active, payload }) => {
    if (!active || payload?.length < 1) return null;
  
    return (
      <div className='custom-tooltip'>
        <p>Ratings</p>
        <p><Emoji height={16} width={16} emoji='emoji-5' /> <span>{payload[0].payload[4]}</span></p>
        <p><Emoji height={16} width={16} emoji='emoji-4' /> <span>{payload[0].payload[3]}</span></p>
        <p><Emoji height={16} width={16} emoji='emoji-3' /> <span>{payload[0].payload[2]}</span></p>
        <p><Emoji height={16} width={16} emoji='emoji-2' /> <span>{payload[0].payload[1]}</span></p>
        <p><Emoji height={16} width={16} emoji='emoji-1' /> <span>{payload[0].payload[0]}</span></p>
      </div>
    );
  };

  return (
    <div className='chart-wrapper'>
      <ResponsiveContainer>
        <LineChart data={results} height={250} margin={{ left: -15 }}>
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
                href={`/emojis/emoji-${props.payload.value + 1}.svg`}
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
