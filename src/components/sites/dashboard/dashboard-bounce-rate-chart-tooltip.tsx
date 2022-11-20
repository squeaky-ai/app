import React from 'react';
import type { FC } from 'react';
import { ChartTooltip, ChartTooltipProps, Label, Value } from 'components/sites/chart-tooltip';

export const DashboardBounceRateTooltip: FC<ChartTooltipProps> = (props) => (
  <ChartTooltip {...props}>
    {({ data }) => (
      <>
        <Label>Bounce Rate</Label>
        <Value color='var(--rose-500)'>{data.count}%</Value>
      </>
    )}
  </ChartTooltip>
);
