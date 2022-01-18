import React from 'react';
import type { FC } from 'react';
import { range } from 'lodash';
import { format, subMonths } from 'date-fns';
import { Card } from 'components/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, TooltipProps } from 'recharts';
import type { Site } from 'types/graphql';

interface Props {
  sites: Site[];
}

interface Total {
  count: number;
  date: string;
}

const getAccumulatingTotal = (sites: Site[]): Total[] => {
  const now = new Date();

  const results = range(0, 11).map(month => {
    const thisMonth = subMonths(now, month);
    const values = sites.filter(site => new Date(site.createdAt) <= thisMonth);
    
    return {
      date: format(thisMonth, 'MMM yy'),
      count: values.length,
    }
  });

  return results.reverse();
};

export const SitesGrowth: FC<Props> = ({ sites }) => {
  const data = getAccumulatingTotal(sites);

  const CustomTooltip: FC<TooltipProps<any, any>> = ({ active, payload, label }) => {
    if (!active || payload?.length < 1) return null;

    const sitesCount = payload[0].payload.count;
  
    return (
      <div className='custom-tooltip'>
        <p className='date'>{label}</p>
        <p className='count'>{sitesCount} sites</p>
      </div>
    );
  };

  return (
    <Card>
      <h5>Site Growth</h5>
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
  
            <Line dataKey='count' fillOpacity={1} stroke='#0768C1' strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
