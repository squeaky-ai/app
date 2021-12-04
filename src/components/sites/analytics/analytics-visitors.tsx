import React from 'react';
import type { FC } from 'react';
import { sum } from 'lodash';
import { parse } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, TooltipProps } from 'recharts';
import { Label } from 'components/label';
import { Pill } from 'components/pill';
import { Checkbox } from 'components/checkbox';
import { toDayOfMonth, expandDay } from 'lib/dates';
import { formatResultsForPeriod } from 'lib/analytics/visitors';
import type { AnalyticsVisitor } from 'types/graphql';
import type { TimePeriod } from 'lib/dates';

interface Props {
  period: TimePeriod;
  visitors: AnalyticsVisitor[];
}

const formatLabel = (period: TimePeriod, label: string) => {
  switch(period) {
    case 'today':
    case 'yesterday':
      return label.replace(/(am|pm)$/, '.00$1');
    case 'past_seven_days':
      return expandDay(label);
    case 'past_thirty_days':
      return expandDay(label);
    default:
      return toDayOfMonth(parse(label, 'd/M', new Date()));
  }
};

export const AnalyticsVisitors: FC<Props> = ({ visitors, period }) => {
  const [show, setShow] = React.useState<string[]>(['all', 'existing', 'new']);

  const handleClick = (value: string) => {
    show.includes(value)
      ? setShow(show.filter(s => s !== value))
      : setShow([...show, value]);
  };

  // Turn away now, you don't want to look
  const { data, interval } = formatResultsForPeriod(period, visitors);

  const results = data.map(d => ({
    date: d.date,
    all: show.includes('all') ? d.all : 0,
    existing: show.includes('existing') ? d.existing : 0,
    new: show.includes('new') ? d.new : 0
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

  const totalCount = sum(data.map(d => d.all));
  const newCount = sum(data.map(d => d.new));

  return (
    <div className='analytics-graph'>
      <div className='heading'>
        <div className='title'>
          <h4>Visitors</h4>
          <h3>{totalCount}</h3>
          <Pill type='tertiary' large>{newCount} New</Pill>
        </div>

        <div className='actions'>
          <Label>Show:</Label>
          <Checkbox checked={show.includes('all')} onChange={() => handleClick('all')} className='purple'>All</Checkbox>
          <Checkbox checked={show.includes('existing')} onChange={() => handleClick('existing')}>Existing</Checkbox>
          <Checkbox checked={show.includes('new')} onChange={() => handleClick('new')} className='magenta'>New</Checkbox>
        </div>
      </div>
      <div className='graph-wrapper'>
        <ResponsiveContainer>
          <LineChart data={results} margin={{ top: 0, left: -15, right: 0, bottom: 0 }}>
            <XAxis dataKey='date' interval={interval} stroke='var(--gray-blue-800)' tickLine={false} tickMargin={10} />
            <YAxis stroke='var(--gray-blue-800)' tickLine={false} tickMargin={10} />

            <CartesianGrid strokeDasharray='3 3' vertical={false} />

            <Tooltip content={<CustomTooltip />} />
  
            <Line dataKey='all' fillOpacity={1} stroke='#8249FB' strokeWidth={2} />
            <Line dataKey='existing' fillOpacity={1} stroke='#0074E0' strokeWidth={2} />
            <Line dataKey='new' fillOpacity={1} stroke='#F96155' strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
