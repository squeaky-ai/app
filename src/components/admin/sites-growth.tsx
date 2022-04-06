import React from 'react';
import type { FC } from 'react';
import { range } from 'lodash';
import { format, subMonths } from 'date-fns';
import { Label } from 'components/label';
import { Checkbox } from 'components/checkbox';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, TooltipProps } from 'recharts';
import type { Site } from 'types/graphql';

interface Props {
  sites: Site[];
}

interface Total {
  allCount: number;
  verifiedCount: number;
  unverifiedCount: number;
  date: string;
}

export const SitesGrowth: FC<Props> = ({ sites }) => {
  const [show, setShow] = React.useState<string[]>(['all', 'verified', 'unverified']);

  const handleClick = (value: string) => {
    show.includes(value)
      ? setShow(show.filter(s => s !== value))
      : setShow([...show, value]);
  };

  const data = ((): Total[] => {
    const now = new Date();
  
    const results = range(0, 11).map(month => {
      const thisMonth = subMonths(now, month);
      const values = sites.filter(site => new Date(site.createdAt) <= thisMonth);
      
      return {
        date: format(thisMonth, 'MMM yy'),
        allCount: show.includes('all') ? values.length : 0,
        verifiedCount: show.includes('verified') ? values.filter(v => !!v.verifiedAt).length : 0,
        unverifiedCount: show.includes('unverified') ? values.filter(v => !v.verifiedAt).length : 0,
      };
    });
  
    return results.reverse();
  })();

  const CustomTooltip: FC<TooltipProps<any, any>> = ({ active, payload, label }) => {
    if (!active || !payload[0]) return null;

    const { allCount, verifiedCount, unverifiedCount } = payload[0].payload;
  
    return (
      <div className='custom-tooltip'>
        <p className='date'>{label}</p>
        {show.includes('all') && <p className='count all'>{allCount} All sites</p>}
        {show.includes('verified') && <p className='count verified'>{verifiedCount} Verified sites</p>}
        {show.includes('unverified') && <p className='count unverified'>{unverifiedCount} Unverified sites</p>}
      </div>
    );
  };

  return (
    <>
      <div className='chart-heading'>
        <div className='numbered-title'>
          <h5>Total Sites</h5>
          <h3>{sites.length}</h3>
        </div>
        <div className='options'>
          <Label>Show:</Label>
          <Checkbox checked={show.includes('all')} onChange={() => handleClick('all')} className='rose'>All</Checkbox>
          <Checkbox checked={show.includes('verified')} onChange={() => handleClick('verified')} className='mauve'>Verified</Checkbox>
          <Checkbox checked={show.includes('unverified')} onChange={() => handleClick('unverified')} className='peach'>Unverified</Checkbox>
        </div>
      </div>
      <div className='chart-wrapper'>
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 15, left: -15, right: 15, bottom: 0 }}>
            <CartesianGrid strokeDasharray='3 3' vertical={false} />

            <XAxis 
              dataKey='date' 
              interval={0} 
              stroke='var(--gray-500)' 
              tickLine={false}
              tickMargin={10} 
            />

            <YAxis 
              stroke='var(--gray-500)' 
              tickLine={false} 
              tickMargin={10} 
              interval={0} 
              allowDecimals={false} 
            />

            <Tooltip content={<CustomTooltip />} />
  
            <Line dataKey='allCount' fillOpacity={1} stroke='#F96155' strokeWidth={2} />
            <Line dataKey='verifiedCount' fillOpacity={1} stroke='#A14259' strokeWidth={2} />
            <Line dataKey='unverifiedCount' fillOpacity={1} stroke='#FFA574' strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};
