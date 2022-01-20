import React from 'react';
import type { FC } from 'react';
import { range, sum } from 'lodash';
import { subDays, getDayOfYear, getWeek, subWeeks, subMonths, format } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, TooltipProps } from 'recharts';
import { Label } from 'components/label';
import { Pill } from 'components/pill';
import { Checkbox } from 'components/checkbox';
import { formatLabel, getAmPmForHour } from 'lib/charts';
import type { AnalyticsVisitor, AnalyticsVisitors as AnalyticsVisitorsType } from 'types/graphql';
import type { TimePeriod } from 'types/common';

interface Props {
  period: TimePeriod;
  visitors: AnalyticsVisitorsType;
}

const emptyAnalyticsVisitor = (dateKey: string) => ({ dateKey, allCount: 0, existingCount: 0, newCount: 0 });

const padDateKey = (i: number, pad = 2) => i.toString().padStart(pad, '0');

const findMatchOrDefault = (dateKey: string, label: string, items: AnalyticsVisitor[]) => {
  const match = items.find(i => i.dateKey === dateKey) || emptyAnalyticsVisitor(dateKey);

  return { ...match, dateKey: label };
};

const formatResultsForGroupType = (visitors: AnalyticsVisitorsType): AnalyticsVisitor[] => {
  const now = new Date();
  const { groupRange, groupType, items } = visitors;

  switch(groupType) {
    case 'hourly':
      return range(0, groupRange).map(i => {
        const dateKey = padDateKey(i);
        const label = getAmPmForHour(i);

        return findMatchOrDefault(dateKey, label, items);
      });
    case 'daily':
      return range(0, groupRange + 1).map(i => {
        const date = subDays(now, i);
        const dateKey = padDateKey(getDayOfYear(date), 3);
        const label = format(date, 'd/M');

        return findMatchOrDefault(dateKey, label, items);
      }).reverse();
    case 'weekly':
      return range(0, groupRange + 1).map(i => {
        const date = subWeeks(now, i);
        const dateKey = padDateKey(getWeek(date), 2);
        const label = format(date, 'd/M');

        return findMatchOrDefault(dateKey, label, items);
      }).reverse();
    case 'monthly':
      return range(0, groupRange + 1).map(i => {
        const date = subMonths(now, i);
        const dateKey = format(date, 'yyyy/MM');
        const label = dateKey;

        return findMatchOrDefault(dateKey, label, items);
      }).reverse();
    default:
      return items;
  }
};

export const AnalyticsVisitors: FC<Props> = ({ visitors, period }) => {
  const [show, setShow] = React.useState<string[]>(['all', 'existing', 'new']);

  const handleClick = (value: string) => {
    show.includes(value)
      ? setShow(show.filter(s => s !== value))
      : setShow([...show, value]);
  };

  const results = formatResultsForGroupType(visitors).map(d => ({
    dateKey: d.dateKey,
    allCount: show.includes('all') ? d.allCount : 0,
    existingCount: show.includes('existing') ? d.existingCount : 0,
    newCount: show.includes('new') ? d.newCount : 0
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
        </div>
      </div>
      <div className='graph-wrapper'>
        <ResponsiveContainer>
          <LineChart data={results} margin={{ top: 0, left: -15, right: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray='3 3' vertical={false} />

            <XAxis dataKey='dateKey' interval={0} stroke='var(--gray-blue-800)' tickLine={false} tickMargin={10} />
            <YAxis stroke='var(--gray-blue-800)' tickLine={false} tickMargin={10} />

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
