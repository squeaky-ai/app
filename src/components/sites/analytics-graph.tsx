import React from 'react';
import type { FC } from 'react';
import { parse } from 'date-fns';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, TooltipProps } from 'recharts';
import { Label } from 'components/label';
import { Checkbox } from 'components/checkbox';
import { toDayOfMonth, expandDay, expandMonth } from 'lib/dates';
import { formatResultsForPeriod } from 'lib/analytics';
import type { PageViewRange } from 'types/analytics';
import type { TimePeriod } from 'lib/dates';

interface Props {
  period: TimePeriod;
  viewsAndVisitors: PageViewRange[];
}

const formatLabel = (period: TimePeriod, label: string) => {
  switch(period) {
    case 'today':
    case 'yesterday':
      return label.replace(/(am|pm)$/, '.00$1');
    case 'past_week':
      return expandDay(label);
    case 'year_to_date':
      return expandMonth(label);
    default:
      return toDayOfMonth(parse(label, 'd/M', new Date()));
  }
};

export const AnalyticsGraph: FC<Props> = ({ viewsAndVisitors, period }) => {
  const [show, setShow] = React.useState<string[]>(['visitors', 'pageViews']);

  const handleClick = (value: string) => {
    show.includes(value)
      ? setShow(show.filter(s => s !== value))
      : setShow([...show, value]);
  };

  // Best you don't look in that function
  const { data, interval } = formatResultsForPeriod(period, viewsAndVisitors);

  const results = data.map(d => ({
    date: d.date,
    visitors: show.includes('visitors') ? d.visitors : 0,
    pageViews: show.includes('pageViews') ? d.pageViews : 0
  }));

  const CustomTooltip: FC<TooltipProps<any, any>> = ({ active, payload, label }) => {
    if (!active || payload?.length < 1) return null;
  
    return (
      <div className='custom-tooltip'>
        <p className='date'>{formatLabel(period, label)}</p>
        <p className='page-views'>{payload[0].payload.pageViews} Page Views</p>
        <p className='visitors'>{payload[0].payload.visitors} Visitors</p>
      </div>
    );
  };

  return (
    <div className='analytics-graph'>
      <div className='show'>
        <Label>Show:</Label>
        <Checkbox checked={show.includes('visitors')} onChange={() => handleClick('visitors')}>Visitors</Checkbox>
        <Checkbox className='tertiary' checked={show.includes('pageViews')} onChange={() => handleClick('pageViews')}>Page Views</Checkbox>
      </div>
      <div className='graph-wrapper'>
        <ResponsiveContainer>
          <AreaChart data={results} margin={{ top: 0, left: -15, right: 0, bottom: 0 }}>
            <XAxis dataKey='date' interval={interval} stroke='var(--gray-800)' tickLine={false} tickMargin={10} />
            <YAxis stroke='var(--gray-800)' tickLine={false} tickMargin={10} />
            <CartesianGrid strokeDasharray='3 3' vertical={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area dataKey='pageViews' fill='#FFD6E7' fillOpacity={1} stroke='#F0438C' strokeWidth={2} />
            <Area dataKey='visitors' fill='#E9F5FF' fillOpacity={1} stroke='#0074E0' strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
