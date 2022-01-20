import React from 'react';
import type { FC } from 'react';
import { min, max, sum, groupBy } from 'lodash';
import { ResponsiveContainer, Tooltip, TooltipProps, BarChart, Bar, XAxis } from 'recharts';
import { Icon } from 'components/icon';
import { Card } from 'components/card';
import { average, frequent } from 'lib/maths';
import type { AnalyticsDimension } from 'types/graphql';

interface Props {
  dimensions: AnalyticsDimension[];
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
  
  const round = (d: AnalyticsDimension) => ({
    ...d,
    deviceX: Math.ceil(d.deviceX / 10) * 10
  });

  const groups = groupBy(dimensions.map(round));

  const data = Object.values(groups).map(counts => ({ 
    count: sum(counts.map(c => c.count)),
    width: counts[0].deviceX,
  }));

  const allWidths = dimensions.map(d => d.deviceX);

  return (
    <Card>
      <h5>
        Screen Width
        <Icon name='arrow-left-line' />
        <Icon name='arrow-right-line' />
      </h5>
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
        <p>{min(allWidths) || 0}px</p>
        <p>{max(allWidths) || 0}px</p>
      </div>
      <div className='items'>
        <div className='item'>
          <p>Smallest</p>
          <h4>{min(allWidths) || 0}px</h4>
        </div>
        <div className='item'>
          <p>Average</p>
          <h4>{Math.floor(average(allWidths)) || 0}px</h4>
        </div>
        <div className='item'>
          <p>Most Frequent</p>
          <h4>{frequent(allWidths)}px</h4>
        </div>
        <div className='item'>
          <p>Largest</p>
          <h4>{max(allWidths) || 0}px</h4>
        </div>
      </div>
    </Card>    
  );
};
