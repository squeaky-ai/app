import React from 'react';
import type { FC } from 'react';
import { Card } from 'components/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, TooltipProps } from 'recharts';
import { formatChartData, formatLabel } from 'lib/charts';
import type { User } from 'types/graphql';

interface Props {
  users: User[];
}

const addTimestampsToUsers = (users: User[]) => users.map(user => ({
  ...user,
  timestamp: user.createdAt,
}));

export const UsersGrowth: FC<Props> = ({ users }) => {
  const period = 'past_fourteen_days';

  const { data } = formatChartData(period, addTimestampsToUsers(users));

  const results = data.map(d => ({
    date: d.key,
    count: d.data.length,
  }));

  const CustomTooltip: FC<TooltipProps<any, any>> = ({ active, payload, label }) => {
    if (!active || payload?.length < 1) return null;
  
    return (
      <div className='custom-tooltip'>
        <p className='date'>{formatLabel(period, label)}</p>
        <p className='count'>{payload[0].payload.count} New Users</p>
      </div>
    );
  };

  return (
    <Card>
      <h5>User Growth</h5>
      <div className='chart-wrapper'>
      <ResponsiveContainer>
          <LineChart data={results} margin={{ top: 15, left: -15, right: 15, bottom: 0 }}>
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
  
            <Line dataKey='count' fillOpacity={1} stroke='#0768C1' strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
