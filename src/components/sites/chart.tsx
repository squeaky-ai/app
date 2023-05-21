import React from 'react';
import type { FC } from 'react';
import { omit } from 'lodash';
import { Color, colorsPrimary, colorsPrimaryAdmin, primaryColorOrder } from 'lib/colors';
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
  LineProps,
  BarProps,
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
  barLineProps?: Pick<LineProps | BarProps, 'stroke' | 'fill'>;
  palette?: Color[];
  stacked?: boolean;
}

export const Chart: FC<Props> = ({ chartType, ...props }) => {
  switch(chartType) {
    case 'bar':
      return <ChartBar {...props} />;
    case 'line':
      return <ChartLine {...props} />;
    case 'stacked-bar':
      return <ChartStackedBar {...props} />;
  }
};

const getPrimaryColor = (admin: boolean, index: number, customPallet?: Color[]) => {
  const palette = customPallet || (admin ? colorsPrimaryAdmin : colorsPrimary);
  return palette[index];
};

const getLabelTextColor = (admin: boolean) => {
  return admin ? 'var(--gray-500)' : 'var(--gray-blue-800)';
};

const getAxisProps = (props: any) => omit(props, [
  'tickFormatter',
  'verticalAnchor',
  'visibleTicksCount',
]);

const getFormattedTickLabel = (value: any) => {
  if (typeof value !== 'number') {
    return value;
  }

  if (value > 999 && value < 1000000){
    return (value / 1000).toFixed(1).replace(/.0$/, '') + 'K';
  }
  
  if (value > 1000000){
    return (value / 1000000).toFixed(1).replace(/.0$/, '') + 'M';
  }
  
  return value;
};

const patterns = () => (
  <defs>
    {primaryColorOrder.map(color => (
      <pattern key={color} id={`${color}-pattern`} x='0' y='0' width='4' height='4' patternUnits='userSpaceOnUse'>
        <path d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2" stroke={`var(--${color})`} strokeWidth={1} />
      </pattern>
    ))}
  </defs>
);


const ChartLine: FC<Omit<Props, 'chartType'>> = ({
  admin,
  data,
  tooltip,
  items,
  scale,
  xAxisProps,
  yAxisProps,
  barLineProps,
  palette,
}) => (
  <ResponsiveContainer>
    <LineChart data={data} margin={{ top: 0, left: -16, right: 16, bottom: 0 }}>
      <CartesianGrid strokeDasharray='3 3' vertical={false} />

      {patterns()}

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
        tick={props => (
          <text {...getAxisProps(props)}>
            {getFormattedTickLabel(props.payload.value)}
          </text>
        )}
        {...yAxisProps}
      />

      <Tooltip content={tooltip} />

      {items.map((item, index) => (
        <Line 
          key={item.dataKey as string}
          dataKey={item.dataKey}
          fillOpacity={1}
          stroke={getPrimaryColor(admin, index, palette)?.stroke}
          strokeWidth={2}
          {...barLineProps}
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
  barLineProps,
  palette,
  stacked,
}) => (
  <ResponsiveContainer>
    <BarChart data={data} margin={{ top: 0, left: -16, right: 16, bottom: 0 }} barGap={2}>
      <CartesianGrid strokeDasharray='3 3' vertical={false} />

      {patterns()}

      <XAxis
        dataKey='dateKey'
        stroke={getLabelTextColor(admin)}
        tickLine={false}
        allowDecimals={false}
        tickMargin={10}
        {...xAxisProps}
      />

      <YAxis
        stroke={getLabelTextColor(admin)}
        tickLine={false}
        tickMargin={10}
        domain={[1, 'auto']}
        allowDecimals={false}
        tick={props => (
          <text {...getAxisProps(props)}>
            {getFormattedTickLabel(props.payload.value)}
          </text>
        )}
        scale={scale} 
        {...yAxisProps}
      />

      <Tooltip content={tooltip} />

      {items.map((item, index) => (
        <Bar 
          key={item.dataKey as string}
          dataKey={item.dataKey}
          fillOpacity={1}
          stroke={getPrimaryColor(admin, index, palette)?.stroke}
          strokeWidth={item.strokeWidth}
          fill={getPrimaryColor(admin, index, palette)?.fill}
          radius={[2, 2, 0, 0]}
          stackId={stacked ? 'stacked' : undefined}
          {...barLineProps}
        />
      ))}
    </BarChart>
  </ResponsiveContainer>
);

const ChartStackedBar: FC<Omit<Props, 'chartType'>> = (props) => (
  <ChartBar {...props} stacked />
);
