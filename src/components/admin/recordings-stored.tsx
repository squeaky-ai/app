import React from 'react';
import type { FC } from 'react';
import { range } from 'lodash';
import { format, subMonths } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, TooltipProps } from 'recharts';
import type { AdminRecordingsStored } from 'types/graphql';

interface Props {
  recordingsStored: AdminRecordingsStored[];
}

export const RecordingsStored: FC<Props> = ({ recordingsStored }) => {
  const CustomTooltip: FC<TooltipProps<any, any>> = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;

    const { count } = payload[0].payload;
  
    return (
      <div className='custom-tooltip'>
        <p className='date'>{label}</p>
        <p className='count all'>{count}</p>
      </div>
    );
  };

  const data = ((): AdminRecordingsStored[] => {
    const now = new Date();
  
    const results = range(0, 11).map(month => {
      const thisMonth = subMonths(now, month);

      const count = recordingsStored
        .filter(r => new Date(r.date) <= thisMonth)
        .reduce((acc, r) => acc + r.count, 0);

      return {
        count,
        date: format(thisMonth, 'MMM yy'),
      }
    });

    return results.reverse();
  })();

  return (
    <div className='chart-wrapper'>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 15, left: -30, right: 15, bottom: 0 }}>
          <CartesianGrid strokeDasharray='3 3' vertical={false} />

          <XAxis 
            dataKey='date' 
            stroke='var(--gray-500)' 
            tickLine={false}
            tickMargin={10}
          />

          <YAxis 
            stroke='var(--gray-500)' 
            tickLine={false} 
            tickMargin={10}
            allowDecimals={false} 
          />

          <Tooltip content={<CustomTooltip />} />

          <Line dataKey='count' fillOpacity={1} stroke='#A14259' strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
