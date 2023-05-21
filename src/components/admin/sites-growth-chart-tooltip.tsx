import React from 'react';
import type { FC } from 'react';
import { ChartTooltip, ChartTooltipProps, Label, Value } from 'components/sites/chart-tooltip';
import { colorsPrimaryAdmin } from 'lib/colors';

interface Props {
  show: string[];
}

export const SitesGrowthChartTooltip: FC<ChartTooltipProps & Props> = (props) => (
  <ChartTooltip {...props}>
    {({ label, data }) => (
      <>
        <Label>{label}</Label>
        {props.show.includes('all') && (
          <Value color={colorsPrimaryAdmin[0]?.stroke}>{data.allCount || 0} All sites</Value>
        )}
        {props.show.includes('verified') && (
          <Value color={colorsPrimaryAdmin[1]?.stroke}>{data.verifiedCount || 0} Verified sites</Value>
        )}
        {props.show.includes('unverified') && (
          <Value color={colorsPrimaryAdmin[2]?.stroke}>{data.unverifiedCount || 0} Unverified sites</Value>
        )}
      </>
    )}
  </ChartTooltip>
);