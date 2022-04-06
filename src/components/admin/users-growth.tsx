import React from 'react';
import type { FC } from 'react';
import { range } from 'lodash';
import { format, subMonths } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, TooltipProps } from 'recharts';
import type { User } from 'types/graphql';

interface Props {
  users: User[];
}

interface Total {
  count: number;
  date: string;
}

const getAccumulatingTotal = (users: User[]): Total[] => {
  const now = new Date();

  const results = range(0, 11).map(month => {
    const thisMonth = subMonths(now, month);
    const values = users.filter(user => new Date(user.createdAt) <= thisMonth);
    
    return {
      date: format(thisMonth, 'MMM yy'),
      count: values.length,
    }
  });

  return results.reverse();
};

export const UsersGrowth: FC<Props> = ({ users }) => {
  const data = getAccumulatingTotal(users);

  const CustomTooltip: FC<TooltipProps<any, any>> = ({ active, payload, label }) => {
    if (!active || !payload[0]) return null;

    const newUserCount = payload[0].payload.count;
  
    return (
      <div className='custom-tooltip'>
        <p className='date'>{label}</p>
        <p className='count'>{newUserCount} users</p>
      </div>
    );
  };

  return (
    <div className='chart-wrapper'>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 15, left: -15, right: 15, bottom: 0 }}>
          <CartesianGrid strokeDasharray='3 3' vertical={false} />

          <XAxis 
            dataKey='date' 
            interval={0} 
            stroke='var(--gray-500)' 
            tickLine={false}
            tickMargin={10} 
          />

          <YAxis 
            stroke='var(--gray-500)' 
            tickLine={false} 
            tickMargin={10} 
            interval={0} 
            allowDecimals={false} 
          />

          <Tooltip content={<CustomTooltip />} />

          <Line dataKey='count' fillOpacity={1} stroke='#F96155' strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
