import React from 'react';
import type { FC } from 'react';
import { ChartTooltip, ChartTooltipProps, Label, Value } from 'components/sites/chart-tooltip';
import { colorsPrimary } from 'lib/colors';

export const NpsScoreChartTooltip: FC<ChartTooltipProps> = (props) => (
  <ChartTooltip {...props}>
    {({ data }) => (
      <>
        <Label>Score</Label>
        <Value color={colorsPrimary[0]}>{data.score || 0} Promoters</Value>
      </>
    )}
  </ChartTooltip>
);
