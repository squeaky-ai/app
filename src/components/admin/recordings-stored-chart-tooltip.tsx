import React from 'react';
import type { FC } from 'react';
import { ChartTooltip, ChartTooltipProps, Label, Value } from 'components/sites/chart-tooltip';
import { colorsPrimaryAdmin } from 'lib/colors';

export const RecordingsStoredChartTooltip: FC<ChartTooltipProps> = (props) => (
  <ChartTooltip {...props}>
    {({ label, data }) => (
      <>
        <Label>{label}</Label>
        <Value color={colorsPrimaryAdmin[0]}>{data.count || 0}</Value>
      </>
    )}
  </ChartTooltip>
);
