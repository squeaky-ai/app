import React from 'react';
import type { FC } from 'react';
import { Emoji } from 'components/emoji';
import { formatLabel } from 'lib/charts';
import { ChartTooltip, ChartTooltipProps, Label, Value } from 'components/sites/chart-tooltip';
import type { TimePeriod } from 'types/common';

interface Props {
  period: TimePeriod;
}

export const SentimentRatingsChartTooltip: FC<ChartTooltipProps & Props> = (props) => (
  <ChartTooltip {...props}>
    {({ label, data }) => (
      <>
        <Label>{formatLabel(props.period, label)}</Label>
        <Value><Emoji height={16} width={16} emoji='emoji-5' /> <span>{data[4] || 0}</span></Value>
        <Value><Emoji height={16} width={16} emoji='emoji-4' /> <span>{data[3] || 0}</span></Value>
        <Value><Emoji height={16} width={16} emoji='emoji-3' /> <span>{data[2] || 0}</span></Value>
        <Value><Emoji height={16} width={16} emoji='emoji-2' /> <span>{data[1] || 0}</span></Value>
        <Value><Emoji height={16} width={16} emoji='emoji-1' /> <span>{data[0] || 0}</span></Value>
      </>
    )}
  </ChartTooltip>
);
