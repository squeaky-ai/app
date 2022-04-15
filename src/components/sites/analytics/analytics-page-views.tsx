import React from 'react';
import type { FC } from 'react';
import { sum } from 'lodash';
import { ScaleType } from 'recharts/types/util/types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, TooltipProps } from 'recharts';
import { Label } from 'components/label';
import { Pill } from 'components/pill';
import { Checkbox } from 'components/checkbox';
import { ChartScale } from 'components/sites/analytics/chart-scale';
import { formatLabel } from 'lib/charts';
import { formatResultsForGroupType } from 'lib/charts-v2';
import type { AnalyticsPageView, AnalyticsPageViews as AnalyticsPageViewsType } from 'types/graphql';
import type { TimePeriod } from 'types/common';

interface Props {
  period: TimePeriod;
  pageViews: AnalyticsPageViewsType;
}

const fallback = { totalCount: 0, uniqueCount: 0 };

export const AnalyticsPageViews: FC<Props> = ({ pageViews, period }) => {
  const [show, setShow] = React.useState<string[]>(['all', 'unique']);
  const [scale, setScale] = React.useState<ScaleType>('auto');

  const handleClick = (value: string) => {
    show.includes(value)
      ? setShow(show.filter(s => s !== value))
      : setShow([...show, value]);
  };

  const doNotAllowZero = (num: number) => num === 0 && scale === 'log' ? null : num;

  const results = formatResultsForGroupType<AnalyticsPageView>(pageViews, period, fallback).map(d => ({
    dateKey: d.dateKey,
    totalCount: doNotAllowZero(show.includes('all') ? d.totalCount : 0),
    uniqueCount: doNotAllowZero(show.includes('unique') ? d.uniqueCount : 0),
  }));

  const CustomTooltip: FC<TooltipProps<any, any>> = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
  
    return (
      <div className='custom-tooltip'>
        <p className='date'>{formatLabel(period, label)}</p>
        {show.includes('all') && <p className='all'>{payload[0].payload.totalCount} All Page Views</p>}
        {show.includes('unique') && <p className='unique'>{payload[0].payload.uniqueCount} Unique Page Views</p>}
      </div>
    );
  };

  const totalCount = sum(pageViews.items.map(d => d.totalCount));
  const uniqueCount = sum(pageViews.items.map(d => d.uniqueCount));

  return (
    <div className='analytics-graph'>
      <div className='heading'>
        <div className='title'>
          <h5>Page Views</h5>
          <h3>{totalCount.toLocaleString()}</h3>
          <Pill type='tertiary' large>{uniqueCount.toLocaleString()} Unique</Pill>
        </div>

        <div className='actions'>
          <Label>Show:</Label>
          <Checkbox checked={show.includes('all')} onChange={() => handleClick('all')} className='purple'>All</Checkbox>
          <Checkbox checked={show.includes('unique')} onChange={() => handleClick('unique')} className='gray'>Unique</Checkbox>
          <ChartScale scale={scale} setScale={setScale} />
        </div>
      </div>
      <div className='graph-wrapper'>
        <ResponsiveContainer>
          <LineChart data={results} margin={{ top: 0, left: -15, right: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray='3 3' vertical={false} />

            <XAxis dataKey='dateKey' interval={0} stroke='var(--gray-blue-800)' tickLine={false} tickMargin={10} />
            <YAxis stroke='var(--gray-blue-800)' tickLine={false} tickMargin={10} domain={['auto', 'auto']} scale={scale} />

            <Tooltip content={<CustomTooltip />} />
  
            <Line dataKey='totalCount' fillOpacity={1} stroke='#8249FB' strokeWidth={2} />
            <Line dataKey='uniqueCount' fillOpacity={1} stroke='#707070' strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
