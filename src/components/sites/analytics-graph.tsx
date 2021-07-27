import React from 'react';
import type { FC } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Label } from 'components/label';
import { Checkbox } from 'components/checkbox';

interface Props {
  
}

const data = [
  {
    name: '12am',
    visitors: 30,
    pageViews: 40
  },
  {
    name: '1am',
    visitors: 35,
    pageViews: 40
  },
  {
    name: '2am',
    visitors: 20,
    pageViews: 30
  },
  {
    name: '3am',
    visitors: 25,
    pageViews: 35
  },
  {
    name: '4am',
    visitors: 35,
    pageViews: 45
  },
  {
    name: '5am',
    visitors: 35,
    pageViews: 45
  },
  {
    name: '6am',
    visitors: 30,
    pageViews: 30
  },
  {
    name: '7am',
    visitors: 25,
    pageViews: 40
  },
  {
    name: '8am',
    visitors: 35,
    pageViews: 60
  },
  {
    name: '9am',
    visitors: 15,
    pageViews: 20
  },
  {
    name: '10am',
    visitors: 70,
    pageViews: 80
  },
  {
    name: '11am',
    visitors: 150,
    pageViews: 130
  },
  {
    name: '12pm',
    visitors: 30,
    pageViews: 40
  },
  {
    name: '1pm',
    visitors: 100,
    pageViews: 120
  },
  {
    name: '2pm',
    visitors: 30,
    pageViews: 40
  },
  {
    name: '3pm',
    visitors: 30,
    pageViews: 40
  },
  {
    name: '4pm',
    visitors: 40,
    pageViews: 45
  },
  {
    name: '5pm',
    visitors: 70,
    pageViews: 105
  },
  {
    name: '6pm',
    visitors: 20,
    pageViews: 25
  },
  {
    name: '6pm',
    visitors: 40,
    pageViews: 65
  },
  {
    name: '8pm',
    visitors: 60,
    pageViews: 120
  },
  {
    name: '9pm',
    visitors: 40,
    pageViews: 25
  },
  {
    name: '10pm',
    visitors: 50,
    pageViews: 65
  },
  {
    name: '11pm',
    visitors: 100,
    pageViews: 120
  },
  {
    name: '12pm',
    visitors: 40,
    pageViews: 40
  }
];

export const AnalyticsGraph: FC<Props> = () => {
  const [show, setShow] = React.useState<string[]>(['visitors', 'pageViews']);

  const handleClick = (value: string) => {
    show.includes(value)
      ? setShow(show.filter(s => s !== value))
      : setShow([...show, value]);
  };

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
          <XAxis dataKey='name' />
          <YAxis />
          <CartesianGrid strokeDasharray='3 3' vertical={false} />
          <Bar dataKey='visitors' fill='#0074E0' barSize={8} radius={[10, 10, 0, 0]} />
          <Bar dataKey='pageViews' fill='#F0438C' barSize={8} radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
