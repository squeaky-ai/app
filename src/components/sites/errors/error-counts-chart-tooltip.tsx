import React from 'react';
import type { FC } from 'react';
import { ChartTooltip, ChartTooltipProps, Label, Value } from 'components/sites/chart-tooltip';
import { formatLabel } from 'lib/charts';
import type { TimePeriod } from 'types/common';

interface Props {
  period: TimePeriod;
}

export const ErrorCountsChartTooltip: FC<ChartTooltipProps & Props> = (props) => (
  <ChartTooltip {...props}>
    {({ label, data }) => (
      <>
        <Label>{formatLabel(props.period, label)}</Label>
        <Value color='var(--rose-500)'>{(data.count || 0).toLocaleString()} Errors</Value>
      </>
    )}
  </ChartTooltip>
);
