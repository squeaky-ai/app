import React from 'react';
import type { FC } from 'react';
import { Card } from 'components/card';
import { toMinutesAndSeconds } from 'lib/dates';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import type { Visitor } from 'types/visitor';

interface Props {
  visitor: Visitor;
}

const data = [
  {
    name: '12am',
    duration: 5
  },
  {
    name: '1am',
    duration: 7
  },
  {
    name: '2am',
    duration: 1
  },
  {
    name: '3am',
    duration: 2
  },
  {
    name: '4am',
    duration: 4
  },
  {
    name: '5am',
    duration: 6
  },
  {
    name: '6am',
    duration: 7
  },
  {
    name: '7am',
    duration: 10
  },
  {
    name: '8am',
    duration: 2
  },
  {
    name: '9am',
    duration: 4
  },
  {
    name: '10am',
    duration: 1
  },
  {
    name: '11am',
    duration: 8
  },
  {
    name: '12pm',
    duration: 5
  },
  {
    name: '1pm',
    duration: 2
  },
  {
    name: '2pm',
    duration: 4
  },
  {
    name: '3pm',
    duration: 1
  },
  {
    name: '4pm',
    duration: 6
  },
  {
    name: '5pm',
    duration: 10
  },
  {
    name: '6pm',
    duration: 8
  },
  {
    name: '6pm',
    duration: 6
  },
  {
    name: '8pm',
    duration: 5
  },
  {
    name: '9pm',
    duration: 4
  },
  {
    name: '10pm',
    duration: 3
  },
  {
    name: '11pm',
    duration: 2
  },
  {
    name: '12pm',
    duration: 7
  }
];

export const VisitorStats: FC<Props> = ({ visitor }) => {
  const toTwoDecimalPlaces = (value: number) => {
    return Number(value.toFixed(2));
  };

  return (
    <div className='stats'>
      <Card className='session-duration'>
        <h3>Average Session Duration</h3>
        <h2>{toMinutesAndSeconds(visitor.averageSessionDuration || 0)}</h2>
        <ResponsiveContainer width='100%' height={56}>
          <AreaChart data={data} margin={{ top: 0, left: -15, right: 0, bottom: 0 }}>
            <Area dataKey='duration' stroke='#0074E0' fill='#E9F5FF' type='basis' strokeWidth={2} fillOpacity={1} />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
      <Card className='per-session'>
        <h3>Pages Per Session</h3>
        <h2>{toTwoDecimalPlaces(visitor.pagesPerSession || 0)}</h2>
        <ResponsiveContainer width='100%' height={56}>
          <AreaChart data={data} margin={{ top: 0, left: -15, right: 0, bottom: 0 }}>
            <Area dataKey='duration' stroke='#0074E0' fill='#E9F5FF' type='basis' strokeWidth={2} fillOpacity={1} />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};
