import React from 'react';
import type { FC } from 'react';
import { min, max, orderBy } from 'lodash';
import { AnalyticsScreenWidthsChartTooltip } from 'components/sites/analytics/analytics-screen-widths-chart-tooltip';
import { ResponsiveContainer, Tooltip, BarChart, Bar, XAxis } from 'recharts';
import { Icon } from 'components/icon';
import { Card } from 'components/card';
import type { AnalyticsDimension } from 'types/graphql';

interface Props {
  dimensions: AnalyticsDimension[];
}

export const AnalyticsScreenWidths: FC<Props> = ({ dimensions }) => {
  const allWidths = dimensions.map(d => d.deviceX);
  const mostCommon = orderBy(dimensions, dimensions => dimensions.count, 'desc')[0]?.deviceX || 0;

  return (
    <Card>
      <h5>
        Screen Width
        <Icon name='arrow-left-line' />
        <Icon name='arrow-right-line' />
      </h5>
      <div className='chart-wrapper'>
        <ResponsiveContainer>
          <BarChart data={dimensions} height={150}>
            <XAxis dataKey='deviceX' hide />
            <Bar 
              dataKey='count' 
              fill='#4097E8'
              barSize={4}
            />
            <Tooltip cursor={false} content={AnalyticsScreenWidthsChartTooltip} />
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
          <p>Most Common</p>
          <h4>{mostCommon}px</h4>
        </div>
        <div className='item'>
          <p>Largest</p>
          <h4>{max(allWidths) || 0}px</h4>
        </div>
      </div>
    </Card>    
  );
};
