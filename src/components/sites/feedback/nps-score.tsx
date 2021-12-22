import React from 'react';
import type { FC } from 'react';
import { ResponsiveContainer, CartesianGrid, LineChart, Line, YAxis, XAxis, Tooltip, TooltipProps } from 'recharts';
import { percentage } from 'lib/maths';
import { formatChartData } from 'lib/charts';
import type { FeedbackNpsScores, FeedbackNpsScore } from 'types/graphql';
import type { TimePeriod } from 'types/common';

interface Props {
  scores: FeedbackNpsScores;
  period: TimePeriod;
}

const getNps = (scores: FeedbackNpsScore[]) => {
  const promoters = scores.filter(s => s.score >= 9).length;
  const detractors = scores.filter(s => s.score <= 6).length;
  
  return percentage(scores.length, promoters) - percentage(scores.length, detractors);
};

export const NpsScore: FC<Props> = ({ period, scores }) => {
  const { data } = formatChartData<FeedbackNpsScore>(period, scores.responses);

  const results = data.map(d => ({
    date: d.key,
    score: getNps(d.data),
  }));

  const CustomTooltip: FC<TooltipProps<any, any>> = ({ active, payload }) => {
    if (!active || payload?.length < 1) return null;
  
    return (
      <div className='custom-tooltip'>
        <p>Score</p>
        <p className='score'>{payload[0].payload.score}</p>
      </div>
    );
  };

  return (
    <div className='chart-wrapper'>
      <ResponsiveContainer>
        <LineChart data={results} height={150} margin={{ left: -35 }}>
          <CartesianGrid strokeDasharray='3 3' vertical={false} />
        
          <YAxis 
            dataKey='score'
            allowDecimals={false}
            tickLine={false}
            axisLine={false}
            fontSize={13}
            domain={[-100, 100]}
            interval={1}
          />

          <XAxis 
            dataKey='date'
            tickLine={false}
            axisLine={false}
            fontSize={13}
            tickMargin={10}
          />

          <Line dataKey='score' fillOpacity={1} stroke='#4097E8' strokeWidth={2} />

          <Tooltip content={<CustomTooltip />} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
