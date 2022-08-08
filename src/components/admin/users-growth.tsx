import React from 'react';
import type { FC } from 'react';
import { range } from 'lodash';
import { format, subMonths } from 'date-fns';
import { useResize } from 'hooks/use-resize';
import { DeviceWidths } from 'data/common/constants';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, TooltipProps } from 'recharts';
import type { AdminUser } from 'types/graphql';

interface Props {
  users: AdminUser[];
}

interface Total {
  count: number;
  date: string;
}

const getAccumulatingTotal = (users: AdminUser[]): Total[] => {
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

  const { width } = useResize();

  const CustomTooltip: FC<TooltipProps<any, any>> = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;

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
        <LineChart data={data} margin={{ top: 15, left: -30, right: 15, bottom: 0 }}>
          <CartesianGrid strokeDasharray='3 3' vertical={false} />

          <XAxis 
            dataKey='date' 
            stroke='var(--gray-500)' 
            tickLine={false}
            tickMargin={10} 
            interval={width > DeviceWidths.DESKTOP ? 0 : 'preserveStartEnd'}
          />

          <YAxis 
            stroke='var(--gray-500)' 
            tickLine={false} 
            tickMargin={10}
            allowDecimals={false} 
          />

          <Tooltip content={<CustomTooltip />} />

          <Line dataKey='count' fillOpacity={1} stroke='#F96155' strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
