import React from 'react';
import type { FC } from 'react';
import { ChartTooltip, ChartTooltipProps, Label, Value } from 'components/sites/chart-tooltip';
import { formatLabel } from 'lib/charts';
import { colorsPrimary } from 'lib/colors';
import type { TimePeriod } from 'types/common';

interface Props {
  period: TimePeriod;
}

export const NpsRepliesChartTooltip: FC<ChartTooltipProps & Props> = (props) => (
  <ChartTooltip {...props}>
    {({ label, data }) => (
      <>
        <Label>{formatLabel(props.period, label)}</Label>
        <Value color={colorsPrimary[0]?.stroke}>{data.promoters || 0} Promoters</Value>
        <Value color={colorsPrimary[1]?.stroke}>{data.passives || 0} Passives</Value>
        <Value color={colorsPrimary[2]?.stroke}>{data.detractors || 0} Detractors</Value>
      </>
    )}
  </ChartTooltip>
);
