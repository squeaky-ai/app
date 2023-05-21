import React from 'react';
import type { FC } from 'react';
import { ChartTooltip, ChartTooltipProps, Label, Value } from 'components/sites/chart-tooltip';
import { colorsPrimaryAdmin } from 'lib/colors';

export const UsersGrowthChartTooltip: FC<ChartTooltipProps> = (props) => (
  <ChartTooltip {...props}>
    {({ label, data }) => (
      <>
        <Label>{label}</Label>
        <Value color={colorsPrimaryAdmin[0]?.stroke}>{(data.count || 0).toLocaleString()} users</Value>
      </>
    )}
  </ChartTooltip>
);
