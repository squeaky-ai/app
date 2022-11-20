import React from 'react';
import type { FC } from 'react';
import { ChartTooltip, ChartTooltipProps, Label, Value } from 'components/sites/chart-tooltip';
import { colorsPrimary } from 'lib/colors';

export const DashboardPageViewsChartTooltip: FC<ChartTooltipProps> = (props) => (
  <ChartTooltip {...props}>
    {({ data }) => (
      <>
        <Label>Page Views</Label>
        <Value color={colorsPrimary[0]}>{data.count}</Value>
      </>
    )}
  </ChartTooltip>
);
