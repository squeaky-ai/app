import React from 'react';
import type { FC } from 'react';
import { ChartTooltip, ChartTooltipProps, Label, Value } from 'components/sites/chart-tooltip';

export const DashboardErrorsChartTooltip: FC<ChartTooltipProps> = (props) => (
  <ChartTooltip {...props}>
    {({ data }) => (
      <>
        <Label>Errors</Label>
        <Value color='var(--rose-500)'>{(data.count || 0).toLocaleString()}</Value>
      </>
    )}
  </ChartTooltip>
);
