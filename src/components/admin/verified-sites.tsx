import React from 'react';
import type { FC } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { percentage } from 'lib/maths';
import type { AdminVerified } from 'types/graphql';

interface Props {
  verified: AdminVerified;
}

export const VerifiedSites: FC<Props> = ({ verified }) => {
  const data = [
    {
      name: 'Verified',
      value: verified.verified,
    },
    {
      name: 'Unvrified',
      value: verified.unverified,
    },
  ];

  const getPercentage = (count: number) => percentage(verified.verified + verified.unverified, count);

  return (
    <div className='pie-wrapper'>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey='value'
            innerRadius={104}
            outerRadius={120}
          >
            <Cell fill='#A14259' />
            <Cell fill='#FFA574' />
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className='stats'>
        <p>Verified</p>
        <p className='stat'><b>{verified.verified.toLocaleString()}</b> <i>({getPercentage(verified.verified)}%)</i></p>
        <p>Unverified</p>
        <p className='stat'><b>{verified.unverified.toLocaleString()}</b> <i>({getPercentage(verified.unverified)}%)</i></p>
      </div>
    </div>
  );
};
