import React from 'react';
import type { FC } from 'react';
import { min, max, groupBy } from 'lodash';
import { ResponsiveContainer, Tooltip, TooltipProps, BarChart, Bar, XAxis } from 'recharts';
import { Card } from 'components/card';
import { average, frequent } from 'lib/maths';

interface Props {
  dimensions: number[];
}

export const AnalyticsScreenWidths: FC<Props> = ({ dimensions }) => {
  const CustomTooltip: FC<TooltipProps<any, any>> = ({ active, payload, label }) => {
    if (!active || !payload || payload?.length < 1) return null;
  
    return (
      <div className='custom-tooltip'>
        <p className='width'>Width: {label}px</p>
        <p className='total-visitors'>{payload[0].value} Total Visitors</p>
      </div>
    );
  };
  
  const round = (n: number) => Math.ceil(n / 10) * 10;

  const groups = groupBy(dimensions.map(round));

  const data = Object.values(groups).map(counts => ({ 
    count: counts.length,
    width: counts[0],
  }));

  return (
    <Card>
      <h4>
        Screen Width
        <i className='ri-arrow-left-line' />
        <i className='ri-arrow-right-line' />
      </h4>
      <div className='chart-wrapper'>
        <ResponsiveContainer>
          <BarChart data={data} height={150}>
            <XAxis dataKey='width' hide />
            <Bar 
              dataKey='count' 
              fill='#4097E8'
              barSize={4}
            />
            <Tooltip cursor={false} content={<CustomTooltip />} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className='axis'>
        <p>{min(dimensions) || 0}px</p>
        <p>{max(dimensions) || 0}px</p>
      </div>
      <div className='items'>
        <div className='item'>
          <p>Smallest</p>
          <h4>{min(dimensions) || 0}px</h4>
        </div>
        <div className='item'>
          <p>Average</p>
          <h4>{Math.floor(average(dimensions)) || 0}px</h4>
        </div>
        <div className='item'>
          <p>Most Frequent</p>
          <h4>{frequent(dimensions)}px</h4>
        </div>
        <div className='item'>
          <p>Largest</p>
          <h4>{max(dimensions) || 0}px</h4>
        </div>
      </div>
    </Card>    
  );
};
