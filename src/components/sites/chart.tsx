import React from 'react';
import type { FC } from 'react';
import { colorsPrimary, colorsPrimaryAdmin } from 'lib/colors';
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
  YAxisProps,
  AreaChart,
  Area,
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
    case 'area':
      return <ChartArea {...props} />;
  }
};

const getPrimaryColor = (admin: boolean, index: number) => {
  const palette = admin ? colorsPrimaryAdmin : colorsPrimary;
  return palette[index];
};

const getLabelTextColor = (admin: boolean) => {
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
        stroke={getLabelTextColor(admin)}
        tickLine={false}
        tickMargin={10} 
        allowDecimals={false}
        fontSize={14}
        {...xAxisProps}
      />

      <YAxis
        stroke={getLabelTextColor(admin)}
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
          stroke={getPrimaryColor(admin, index)}
          strokeWidth={2}
          type='monotone'
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
        stroke={getLabelTextColor(admin)}
        tickLine={false}
        tickMargin={10} 
        {...xAxisProps}
      />

      <YAxis
        stroke={getLabelTextColor(admin)}
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
          stroke={getPrimaryColor(admin, index)}
          strokeWidth={item.strokeWidth}
          fill={getPrimaryColor(admin, index)}
          stackId={item.dataKey as string}
          radius={[2, 2, 0, 0]}
        />
      ))}
    </BarChart>
  </ResponsiveContainer>
);

const ChartArea: FC<Omit<Props, 'chartType'>> = ({
  admin,
  data,
  tooltip,
  items,
  scale,
  xAxisProps,
  yAxisProps,
}) => (
  <ResponsiveContainer>
    <AreaChart data={data} margin={{ top: 1, left: -16, right: 16, bottom: 1 }}>
      <defs>
        {items.map((_, index) => (
          <linearGradient key={`gradient-${index}`} id={`gradient-${index}`} x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor={getPrimaryColor(admin, index)} stopOpacity={0.85} />
            <stop offset='95%' stopColor={getPrimaryColor(admin, index)} stopOpacity={.15} />
          </linearGradient>
        ))}
      </defs>

      <XAxis
        dataKey='dateKey'
        stroke={getLabelTextColor(admin)}
        tickLine={false}
        tickMargin={10} 
        {...xAxisProps}
      />

      <YAxis
        stroke={getLabelTextColor(admin)}
        tickLine={false}
        tickMargin={10}
        domain={['auto', 'auto']}
        scale={scale} 
        {...yAxisProps}
      />

      <Tooltip content={tooltip} />

      {items.map((item, index) => (
        <Area
          key={item.dataKey as string}
          dataKey={item.dataKey}
          fillOpacity={1}
          stroke={getPrimaryColor(admin, index)}
          fill={`url(#gradient-${index})`}
          strokeWidth={2}
          type='monotone'
        />
      ))}
    </AreaChart>
  </ResponsiveContainer>
);
