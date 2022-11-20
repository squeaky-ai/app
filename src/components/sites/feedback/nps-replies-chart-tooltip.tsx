import React from 'react';
import type { FC } from 'react';
import { ChartTooltip, ChartTooltipProps, Label, Value } from 'components/sites/chart-tooltip';
import { colorsPrimary } from 'lib/colors';

export const NpsRepliesChartTooltip: FC<ChartTooltipProps> = (props) => (
  <ChartTooltip {...props}>
    {({ data }) => (
      <>
        <Label>Outcome type</Label>
        <Value color={colorsPrimary[0]}>{data.promoters || 0} Promoters</Value>
        <Value color={colorsPrimary[1]}>{data.passives || 0} Passives</Value>
        <Value color={colorsPrimary[2]}>{data.detractors || 0} Detractors</Value>
      </>
    )}
  </ChartTooltip>
);
