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
import type { AnalyticsVisitor, AnalyticsVisitors as AnalyticsVisitorsType } from 'types/graphql';
import type { TimePeriod } from 'types/common';

interface Props {
  period: TimePeriod;
  visitors: AnalyticsVisitorsType;
}

const fallback = { allCount: 0, existingCount: 0, newCount: 0 };

export const AnalyticsVisitors: FC<Props> = ({ visitors, period }) => {
  const [show, setShow] = React.useState<string[]>(['all', 'existing', 'new']);
  const [scale, setScale] = React.useState<ScaleType>('linear');

  const handleClick = (value: string) => {
    show.includes(value)
      ? setShow(show.filter(s => s !== value))
      : setShow([...show, value]);
  };

  const doNotAllowZero = (num: number) => num === 0 && scale === 'log' ? null : num;

  const results = formatResultsForGroupType<AnalyticsVisitor>(visitors, fallback).map(d => ({
    dateKey: d.dateKey,
    allCount: doNotAllowZero(show.includes('all') ? d.allCount : 0),
    existingCount: doNotAllowZero(show.includes('existing') ? d.existingCount : 0),
    newCount: doNotAllowZero(show.includes('new') ? d.newCount : 0),
  }));

  const CustomTooltip: FC<TooltipProps<any, any>> = ({ active, payload, label }) => {
    if (!active || payload?.length < 1) return null;
  
    return (
      <div className='custom-tooltip'>
        <p className='date'>{formatLabel(period, label)}</p>
        {show.includes('all') && <p className='all'>{payload[0].payload.allCount} All Visitors</p>}
        {show.includes('existing') && <p className='existing'>{payload[0].payload.existingCount} Existing Visitors</p>}
        {show.includes('new') && <p className='new'>{payload[0].payload.newCount} New Visitors</p>}
      </div>
    );
  };

  const totalCount = sum(visitors.items.map(d => d.allCount));
  const newCount = sum(visitors.items.map(d => d.newCount));

  return (
    <div className='analytics-graph'>
      <div className='heading'>
        <div className='title'>
          <h5>Visitors</h5>
          <h3>{totalCount.toLocaleString()}</h3>
          <Pill type='tertiary' large>{newCount.toLocaleString()} New</Pill>
        </div>

        <div className='actions'>
          <Label>Show:</Label>
          <Checkbox checked={show.includes('all')} onChange={() => handleClick('all')} className='purple'>All</Checkbox>
          <Checkbox checked={show.includes('existing')} onChange={() => handleClick('existing')}>Existing</Checkbox>
          <Checkbox checked={show.includes('new')} onChange={() => handleClick('new')} className='rose'>New</Checkbox>
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
  
            <Line dataKey='allCount' fillOpacity={1} stroke='#8249FB' strokeWidth={2} />
            <Line dataKey='existingCount' fillOpacity={1} stroke='#0768C1' strokeWidth={2} />
            <Line dataKey='newCount' fillOpacity={1} stroke='#F96155' strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
