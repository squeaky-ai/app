import React from 'react';
import type { FC } from 'react';
import { groupBy, range } from 'lodash';
import { ResponsiveContainer, CartesianGrid, BarChart, Bar, YAxis, XAxis } from 'recharts';
import type { FeedbackNpsRatings } from 'types/graphql';

interface Props {
  ratings: FeedbackNpsRatings[]; 
}

export const NpsRatings: FC<Props> = ({ ratings }) => {
  const groups = groupBy(ratings.map(r => r.score));

  const data = range(0, 11).map(i => {
    const match = groups[i];

    return {
      count: match?.length || 0,
      score: i,
    }
  });

  // The graph looks crap if there's only a handful 
  // of results. So grab the max count, and dynamically
  // change the interval of the graph
  const max = Math.max(...data.map(d => d.count));

  return (
    <div className='chart-wrapper'>
      <ResponsiveContainer>
        <BarChart data={data} height={150} margin={{ left: -35 }}>
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
            dataKey='score'
            interval={0}
            tickLine={false}
            axisLine={false}
            fontSize={13}
            tickMargin={10}
          />

          <Bar 
            dataKey='count' 
            fill='#4097E8'
            barSize={4}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
