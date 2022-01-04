import React from 'react';
import type { FC } from 'react';
import { sum } from 'lodash';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, TooltipProps } from 'recharts';
import { Label } from 'components/label';
import { Pill } from 'components/pill';
import { Checkbox } from 'components/checkbox';
import { formatChartData, formatLabel } from 'lib/charts';
import { convertEpochToIsoStrings } from 'lib/dates';
import type { AnalyticsPageViews as PageView } from 'types/graphql';
import type { TimePeriod } from 'types/common';

interface Props {
  period: TimePeriod;
  pageViews: PageView[];
}

const sumOfPageViewType = (
  pageviews: PageView[], 
  key: keyof PageView
) => sum(pageviews.map(v => v[key]));

export const AnalyticsPageViews: FC<Props> = ({ pageViews, period }) => {
  const [show, setShow] = React.useState<string[]>(['all', 'unique']);

  const handleClick = (value: string) => {
    show.includes(value)
      ? setShow(show.filter(s => s !== value))
      : setShow([...show, value]);
  };

  const { data } = formatChartData<PageView>(period, convertEpochToIsoStrings(pageViews));

  const results = data.map(d => ({
    date: d.key,
    all: show.includes('all') ? sumOfPageViewType(d.data, 'total') : 0,
    unique: show.includes('unique') ? sumOfPageViewType(d.data, 'unique') : 0,
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

  const totalCount = sum(results.map(d => d.all));
  const uniqueCount = sum(results.map(d => d.unique));

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
        </div>
      </div>
      <div className='graph-wrapper'>
        <ResponsiveContainer>
          <LineChart data={results} margin={{ top: 0, left: -15, right: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray='3 3' vertical={false} />

            <XAxis dataKey='date' interval={0} stroke='var(--gray-blue-800)' tickLine={false} tickMargin={10} />
            <YAxis stroke='var(--gray-blue-800)' tickLine={false} tickMargin={10} />

            <Tooltip content={<CustomTooltip />} />
  
            <Line dataKey='all' fillOpacity={1} stroke='#8249FB' strokeWidth={2} />
            <Line dataKey='unique' fillOpacity={1} stroke='#707070' strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
