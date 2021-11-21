import React from 'react';
import type { FC } from 'react';
import { groupBy, range } from 'lodash';
import { ResponsiveContainer, CartesianGrid, BarChart, Bar, YAxis, XAxis } from 'recharts';
import type { NpsRating } from 'types/nps';

interface Props {
  ratings: NpsRating[]; 
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

  return (
    <div className='chart-wrapper'>
      <ResponsiveContainer>
        <BarChart data={data} height={150} margin={{ left: -35 }}>
          <YAxis 
            dataKey='count'
            allowDecimals={false}
            tickLine={false}
            axisLine={false}
          />

          <XAxis 
            dataKey='score'
            interval={0}
            tickLine={false}
            axisLine={false}
          />

          <Bar 
            dataKey='count' 
            fill='#4097E8'
            barSize={4}
          />

          <CartesianGrid strokeDasharray='3 3' vertical={false} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
