import React from 'react';
import type { FC } from 'react';
import { ScaleType } from 'recharts/types/util/types';
import type { ChartType, ChartItemProps } from 'types/charts';

import { 
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip, 
  TooltipProps 
} from 'recharts';

interface Props {
  data: Record<string, string | number>[];
  tooltip: FC<TooltipProps<any, any>>;
  items: ChartItemProps[];
  scale: ScaleType;
  chartType: ChartType;
}

export const Chart: FC<Props> = ({ chartType, ...props }) => {
  switch(chartType) {
    case 'bar':
      return <ChartBar {...props} />;
    case 'line':
      return <ChartLine {...props} />
  }
};

const ChartLine: FC<Omit<Props, 'chartType'>> = ({
  data,
  tooltip,
  items,
  scale,
}) => (
  <ResponsiveContainer>
    <LineChart data={data} margin={{ top: 0, left: 0, right: 0, bottom: 0 }}>
      <CartesianGrid strokeDasharray='3 3' vertical={false} />

      <XAxis
        dataKey='dateKey'
        stroke='var(--gray-blue-800)'
        tickLine={false}
        tickMargin={10} 
      />

      <YAxis
        stroke='var(--gray-blue-800)'
        tickLine={false}
        tickMargin={10}
        domain={['auto', 'auto']}
        scale={scale} 
      />

      <Tooltip content={tooltip} />

      {items.map(item => (
        <Line 
          key={item.dataKey as string}
          dataKey={item.dataKey}
          fillOpacity={1}
          stroke={item.stroke}
          strokeWidth={item.strokeWidth}
        />
      ))}
    </LineChart>
  </ResponsiveContainer>
);

const ChartBar: FC<Omit<Props, 'chartType'>> = ({
  data,
  tooltip,
  items,
  scale,
}) => (
  <ResponsiveContainer>
    <BarChart data={data} margin={{ top: 0, left: 0, right: 0, bottom: 0 }}>
      <CartesianGrid strokeDasharray='3 3' vertical={false} />

      <XAxis
        dataKey='dateKey'
        stroke='var(--gray-blue-800)'
        tickLine={false}
        tickMargin={10} 
      />

      <YAxis
        stroke='var(--gray-blue-800)'
        tickLine={false}
        tickMargin={10}
        domain={['auto', 'auto']}
        scale={scale} 
      />

      <Tooltip content={tooltip} />

      {items.map(item => (
        <Bar 
          key={item.dataKey as string}
          dataKey={item.dataKey}
          fillOpacity={1}
          stroke={item.stroke}
          strokeWidth={item.strokeWidth}
          fill={item.fill}
          stackId={item.dataKey as string}
        />
      ))}
    </BarChart>
  </ResponsiveContainer>
);
