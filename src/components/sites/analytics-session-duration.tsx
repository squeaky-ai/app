import React from 'react';
import type { FC } from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

interface Props {
  
}

const data = [
  {
    name: '12am',
    duration: 3
  },
  {
    name: '1am',
    duration: 2
  },
  {
    name: '2am',
    duration: 5
  },
  {
    name: '3am',
    duration: 2
  },
  {
    name: '4am',
    duration: 5
  },
  {
    name: '5am',
    duration: 3
  },
  {
    name: '6am',
    duration: 10
  },
  {
    name: '7am',
    duration: 3
  },
  {
    name: '8am',
    duration: 2
  },
  {
    name: '9am',
    duration: 1
  },
  {
    name: '10am',
    duration: 5
  },
  {
    name: '11am',
    duration: 3
  },
  {
    name: '12pm',
    duration: 7
  },
  {
    name: '1pm',
    duration: 6
  },
  {
    name: '2pm',
    duration: 0
  },
  {
    name: '3pm',
    duration: 2
  },
  {
    name: '4pm',
    duration: 8
  },
  {
    name: '5pm',
    duration: 5
  },
  {
    name: '6pm',
    duration: 1
  },
  {
    name: '6pm',
    duration: 5
  },
  {
    name: '8pm',
    duration: 9
  },
  {
    name: '9pm',
    duration: 7
  },
  {
    name: '10pm',
    duration: 3
  },
  {
    name: '11pm',
    duration: 7
  },
  {
    name: '12pm',
    duration: 5
  }
];

export const AnalyticsSessionDuration: FC<Props> = () => {
  return (
    <div className='analytics-session-duration'>
      <ResponsiveContainer width='100%' height={56}>
        <AreaChart data={data} margin={{ top: 0, left: -15, right: 0, bottom: 0 }}>
          <Area dataKey='duration' stroke='#0074E0' fill='#E9F5FF' type='basis' strokeWidth={2} fillOpacity={1} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
