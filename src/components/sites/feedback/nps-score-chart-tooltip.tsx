import React from 'react';
import type { FC } from 'react';
import { formatLabel } from 'lib/charts';
import { ChartTooltip, ChartTooltipProps, Label, Value } from 'components/sites/chart-tooltip';
import { colorsPrimary } from 'lib/colors';
import type { TimePeriod } from 'types/common';

interface Props {
  period: TimePeriod;
}

export const NpsScoreChartTooltip: FC<ChartTooltipProps & Props> = (props) => (
  <ChartTooltip {...props}>
    {({ label, data }) => (
      <>
        <Label>{formatLabel(props.period, label)}</Label>
        <Value color={colorsPrimary[0]}>{data.score || 0}</Value>
      </>
    )}
  </ChartTooltip>
);
