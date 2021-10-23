import React from 'react';
import type { FC } from 'react';
import { sum } from 'lodash';
import { parse } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, TooltipProps } from 'recharts';
import { Label } from 'components/label';
import { Pill } from 'components/pill';
import { Checkbox } from 'components/checkbox';
import { toDayOfMonth, expandDay, expandMonth } from 'lib/dates';
import { formatResultsForPeriod } from 'lib/analytics/page-views';
import type { PageView } from 'types/analytics';
import type { TimePeriod } from 'lib/dates';

interface Props {
  period: TimePeriod;
  pageViews: PageView[];
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

export const AnalyticsPageViews: FC<Props> = ({ pageViews, period }) => {
  const [show, setShow] = React.useState<string[]>(['all', 'unique']);

  const handleClick = (value: string) => {
    show.includes(value)
      ? setShow(show.filter(s => s !== value))
      : setShow([...show, value]);
  };

  // Turn away now, you don't want to look
  const { data, interval } = formatResultsForPeriod(period, pageViews);

  const results = data.map(d => ({
    date: d.date,
    all: show.includes('all') ? d.all : 0,
    unique: show.includes('unique') ? d.unique : 0,
  }));

  const CustomTooltip: FC<TooltipProps<any, any>> = ({ active, payload, label }) => {
    if (!active || payload?.length < 1) return null;
  
    return (
      <div className='custom-tooltip'>
        <p className='date'>{formatLabel(period, label)}</p>
        <p className='all'>{payload[0].payload.all} All Page Views</p>
        <p className='unique'>{payload[0].payload.unique} Unique Page Views</p>
      </div>
    );
  };

  const totalCount = sum(data.map(d => d.all));
  const uniqueCount = sum(data.map(d => d.unique));

  return (
    <div className='analytics-graph'>
      <div className='heading'>
        <div className='title'>
          <h4>Page Views</h4>
          <h3>{totalCount}</h3>
          <Pill type='tertiary' large>{uniqueCount} Unique</Pill>
        </div>

        <div className='actions'>
          <Label>Show:</Label>
          <Checkbox checked={show.includes('all')} onChange={() => handleClick('all')} className='purple'>All</Checkbox>
          <Checkbox checked={show.includes('unique')} onChange={() => handleClick('unique')} className='gray'>Unique</Checkbox>
        </div>
      </div>
      <div className='graph-wrapper'>
        <ResponsiveContainer>
          <LineChart data={results} margin={{ top: 0, left: -15, right: 0, bottom: 0 }}>
            <XAxis dataKey='date' interval={interval} stroke='var(--gray-800)' tickLine={false} tickMargin={10} />
            <YAxis stroke='var(--gray-800)' tickLine={false} tickMargin={10} />

            <CartesianGrid strokeDasharray='3 3' vertical={false} />

            <Tooltip content={<CustomTooltip />} />
  
            <Line dataKey='all' fillOpacity={1} stroke='#8249FB' strokeWidth={2} />
            <Line dataKey='unique' fillOpacity={1} stroke='#707070' strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
