import React from 'react';
import type { FC } from 'react';
import { colors, adminColors } from 'lib/colors';
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
  TooltipProps, 
  XAxisProps,
  YAxisProps
} from 'recharts';

interface Props {
  admin?: boolean;
  data: Record<string, any>[];
  tooltip: FC<TooltipProps<any, any>>;
  items: ChartItemProps[];
  scale: ScaleType;
  chartType: ChartType;
  xAxisProps?: XAxisProps;
  yAxisProps?: YAxisProps,
}

export const Chart: FC<Props> = ({ chartType, ...props }) => {
  switch(chartType) {
    case 'bar':
      return <ChartBar {...props} />;
    case 'line':
      return <ChartLine {...props} />
  }
};

const getColor = (admin: boolean, index: number) => {
  const palette = admin ? adminColors : colors;
  return palette[index];
};

const getStroke = (admin: boolean) => {
  return admin ? 'var(--gray-500)' : 'var(--gray-blue-800)';
};

const ChartLine: FC<Omit<Props, 'chartType'>> = ({
  admin,
  data,
  tooltip,
  items,
  scale,
  xAxisProps,
  yAxisProps,
}) => (
  <ResponsiveContainer>
    <LineChart data={data} margin={{ top: 0, left: -16, right: 16, bottom: 0 }}>
      <CartesianGrid strokeDasharray='3 3' vertical={false} />

      <XAxis
        dataKey='dateKey'
        stroke={getStroke(admin)}
        tickLine={false}
        tickMargin={10} 
        allowDecimals={false}
        fontSize={14}
        {...xAxisProps}
      />

      <YAxis
        stroke={getStroke(admin)}
        tickLine={false}
        tickMargin={10}
        domain={['auto', 'auto']}
        allowDecimals={false}
        scale={scale} 
        fontSize={14}
        {...yAxisProps}
      />

      <Tooltip content={tooltip} />

      {items.map((item, index) => (
        <Line 
          key={item.dataKey as string}
          dataKey={item.dataKey}
          fillOpacity={1}
          stroke={getColor(admin, index)}
          strokeWidth={2}
        />
      ))}
    </LineChart>
  </ResponsiveContainer>
);

const ChartBar: FC<Omit<Props, 'chartType'>> = ({
  admin,
  data,
  tooltip,
  items,
  scale,
  xAxisProps,
  yAxisProps,
}) => (
  <ResponsiveContainer>
    <BarChart data={data} margin={{ top: 0, left: -16, right: 16, bottom: 0 }} barGap={2}>
      <CartesianGrid strokeDasharray='3 3' vertical={false} />

      <XAxis
        dataKey='dateKey'
        stroke={getStroke(admin)}
        tickLine={false}
        tickMargin={10} 
        {...xAxisProps}
      />

      <YAxis
        stroke={getStroke(admin)}
        tickLine={false}
        tickMargin={10}
        domain={['auto', 'auto']}
        scale={scale} 
        {...yAxisProps}
      />

      <Tooltip content={tooltip} />

      {items.map((item, index) => (
        <Bar 
          key={item.dataKey as string}
          dataKey={item.dataKey}
          fillOpacity={1}
          stroke={getColor(admin, index)}
          strokeWidth={item.strokeWidth}
          fill={getColor(admin, index)}
          stackId={item.dataKey as string}
          radius={[2, 2, 0, 0]}
        />
      ))}
    </BarChart>
  </ResponsiveContainer>
);
