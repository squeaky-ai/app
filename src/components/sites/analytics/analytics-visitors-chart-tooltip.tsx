import React from 'react';
import type { FC } from 'react';
import { ChartTooltip, ChartTooltipProps, Label, Value } from 'components/sites/chart-tooltip';
import { formatLabel } from 'lib/charts';
import type { TimePeriod } from 'types/common';

interface Props {
  period: TimePeriod;
  show: string[];
}

export const AnalyticsVisitorsChartTooltip: FC<ChartTooltipProps & Props> = (props) => (
  <ChartTooltip {...props}>
    {({ label, data }) => (
      <>
        <Label>{formatLabel(props.period, label)}</Label>
        {props.show.includes('all') && (
          <Value color='var(--purple-500)'>{(data.allCount || 0).toLocaleString()} All Visitors</Value>
        )}
        {props.show.includes('existing') && (
          <Value color='var(--blue-400)'>{(data.existingCount || 0).toLocaleString()} Existing Visitors</Value>
        )}
        {props.show.includes('new') && (
          <Value color='var(--rose-500)'>{(data.newCount || 0).toLocaleString()} New Visitors</Value>
        )}
      </>
    )}
  </ChartTooltip>
);
