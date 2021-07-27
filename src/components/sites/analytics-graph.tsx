import React from 'react';
import type { FC } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Label } from 'components/label';
import { Checkbox } from 'components/checkbox';
import type { ViewAndVisitor } from 'types/analytics';

interface Props {
  viewsAndVisitors: ViewAndVisitor[];
}

export const AnalyticsGraph: FC<Props> = ({ viewsAndVisitors }) => {
  const [show, setShow] = React.useState<string[]>(['visitors', 'pageViews']);

  const handleClick = (value: string) => {
    show.includes(value)
      ? setShow(show.filter(s => s !== value))
      : setShow([...show, value]);
  };

  const getAmPmForHour = (hour: number): string => {
    if (hour == 24) return '12pm';
    if (hour <= 12) return `${hour}am`;
    return `${hour - 12}pm`;
  };

  const data = viewsAndVisitors.map(v => ({
    name: getAmPmForHour(v.hour),
    visitors: v.visitors,
    pageViews: v.pageViews,
  }));

  const results = data.map(d => ({
    name: d.name,
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
        <BarChart data={results} margin={{ top: 0, left: -15, right: 0, bottom: 0 }}>
          <XAxis dataKey='name' interval={1} />
          <YAxis />
          <CartesianGrid strokeDasharray='3 3' vertical={false} />
          <Bar dataKey='visitors' fill='#0074E0' barSize={8} radius={[10, 10, 0, 0]} />
          <Bar dataKey='pageViews' fill='#F0438C' barSize={8} radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
