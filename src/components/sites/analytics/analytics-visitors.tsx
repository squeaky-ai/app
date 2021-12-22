import React from 'react';
import type { FC } from 'react';
import { sum } from 'lodash';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, TooltipProps } from 'recharts';
import { Label } from 'components/label';
import { Pill } from 'components/pill';
import { Checkbox } from 'components/checkbox';
import { formatChartData, formatLabel } from 'lib/charts';
import type { AnalyticsVisitor } from 'types/graphql';
import type { TimePeriod } from 'types/common';

interface Props {
  period: TimePeriod;
  visitors: AnalyticsVisitor[];
}

const sumOfVisitorsType = (
  visitors: AnalyticsVisitor[], 
  isNew: boolean,
) => visitors.filter(v => isNew ? v.new : !v.new).length

export const AnalyticsVisitors: FC<Props> = ({ visitors, period }) => {
  const [show, setShow] = React.useState<string[]>(['all', 'existing', 'new']);

  const handleClick = (value: string) => {
    show.includes(value)
      ? setShow(show.filter(s => s !== value))
      : setShow([...show, value]);
  };

  const { data, interval } = formatChartData<AnalyticsVisitor>(period, visitors); 

  const results = data.map(d => ({
    date: d.key,
    all: show.includes('all') ? d.data.length : 0,
    existing: show.includes('existing') ? sumOfVisitorsType(d.data, false) : 0,
    new: show.includes('new') ? sumOfVisitorsType(d.data, true) : 0
  }));

  const CustomTooltip: FC<TooltipProps<any, any>> = ({ active, payload, label }) => {
    if (!active || payload?.length < 1) return null;
  
    return (
      <div className='custom-tooltip'>
        <p className='date'>{formatLabel(period, label)}</p>
        <p className='all'>{payload[0].payload.all} All Visitors</p>
        <p className='existing'>{payload[0].payload.existing} Existing Visitors</p>
        <p className='new'>{payload[0].payload.new} New Visitors</p>
      </div>
    );
  };

  const totalCount = sum(results.map(d => d.all));
  const newCount = sum(results.map(d => d.new));

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
        </div>
      </div>
      <div className='graph-wrapper'>
        <ResponsiveContainer>
          <LineChart data={results} margin={{ top: 0, left: -15, right: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray='3 3' vertical={false} />

            <XAxis dataKey='date' interval={interval} stroke='var(--gray-blue-800)' tickLine={false} tickMargin={10} />
            <YAxis stroke='var(--gray-blue-800)' tickLine={false} tickMargin={10} />

            <Tooltip content={<CustomTooltip />} />
  
            <Line dataKey='all' fillOpacity={1} stroke='#8249FB' strokeWidth={2} />
            <Line dataKey='existing' fillOpacity={1} stroke='#0768C1' strokeWidth={2} />
            <Line dataKey='new' fillOpacity={1} stroke='#F96155' strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
