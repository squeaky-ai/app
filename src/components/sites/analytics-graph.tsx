import React from 'react';
import type { FC } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { Label } from 'components/label';
import { Checkbox } from 'components/checkbox';
import { formatResultsForPeriod } from 'lib/analytics';
import type { PageViewRange } from 'types/analytics';
import type { TimePeriod } from 'lib/dates';

interface Props {
  period: TimePeriod;
  viewsAndVisitors: PageViewRange[];
}

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

  return (
    <div className='analytics-graph'>
      <div className='show'>
        <Label>Show:</Label>
        <Checkbox checked={show.includes('visitors')} onChange={() => handleClick('visitors')}>Visitors</Checkbox>
        <Checkbox checked={show.includes('pageViews')} onChange={() => handleClick('pageViews')}>Page Views</Checkbox>
      </div>
      <ResponsiveContainer width='100%' height={340}>
        <AreaChart data={results} margin={{ top: 0, left: -15, right: 0, bottom: 0 }}>
          <XAxis dataKey='date' interval={interval} />
          <YAxis />
          <CartesianGrid strokeDasharray='3 3' vertical={false} />
          <Tooltip 
            contentStyle={{
              background: 'var(--gray-800)',
              border: '2px solid var(--gray-700)',
              borderRadius: 'var(--border-radius-md)'
            }}
            labelStyle={{
              color: 'var(--gray-50)'
            }}
            formatter={(value: string, name: string) => ([name === 'visitors' ? 'Visitors' : 'Page Views', value])}
          />
          <Area dataKey='pageViews' fill='#FFD6E7' stroke='#F0438C' />
          <Area dataKey='visitors' fill='#E9F5FF' stroke='#0074E0' />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
