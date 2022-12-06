import React from 'react';
import type { FC } from 'react';
import { ChartTooltip, ChartTooltipProps, Label, Value } from 'components/sites/chart-tooltip';
import { colorsPrimary } from 'lib/colors';
import { formatLabel } from 'lib/charts';
import type { TimePeriod } from 'types/common';
import type { EventsStat } from 'types/graphql';

interface Props {
  period: TimePeriod;
  results: Record<string, string | number>[],
  eventStats: EventsStat[],
}

export const EventCountsChartTooltip: FC<ChartTooltipProps & Props> = (props) => (
  <ChartTooltip {...props}>
    {({ label }) => {
      const metrics = props.results.find(r => r.dateKey === label);

      return (
        <>
          <Label>{formatLabel(props.period, label)}</Label>
          {props.eventStats.map((stat, index) => (
            <Value key={stat.eventOrGroupId} color={colorsPrimary[index]}>
              {stat.name} {metrics[`${stat.type}::${stat.eventOrGroupId}`]?.toLocaleString()}
            </Value>
          ))}
        </>
      );
    }}
  </ChartTooltip>
);
