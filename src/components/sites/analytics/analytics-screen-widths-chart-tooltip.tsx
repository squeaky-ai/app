import React from 'react';
import type { FC } from 'react';
import { ChartTooltip, ChartTooltipProps, Label, Value } from 'components/sites/chart-tooltip';
import { colorsPrimary } from 'lib/colors';

export const AnalyticsScreenWidthsChartTooltip: FC<ChartTooltipProps> = (props) => (
  <ChartTooltip {...props}>
    {({ label, data }) => (
      <>
        <Label>Width: {label}px</Label>
        <Value color={colorsPrimary[0]?.stroke}>{(data.count || 0).toLocaleString()} Total Visitors</Value>
      </>
    )}
  </ChartTooltip>
);
