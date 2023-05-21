import React from 'react';
import type { FC } from 'react';
import { ChartTooltip, ChartTooltipProps, Label, Value } from 'components/sites/chart-tooltip';
import { colorsPrimary } from 'lib/colors';

export const DashboardRecordingsChartTooltip: FC<ChartTooltipProps> = (props) => (
  <ChartTooltip {...props}>
    {({ data }) => (
      <>
        <Label>New Recordings</Label>
        <Value color={colorsPrimary[0]?.stroke}>{(data.count || 0).toLocaleString()}</Value>
      </>
    )}
  </ChartTooltip>
);
