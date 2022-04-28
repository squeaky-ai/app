import React from 'react';
import type { FC } from 'react';
import { clamp } from 'lodash';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { percentage } from 'lib/maths';
import { useResize } from 'hooks/use-resize';
import type { AdminVerified } from 'types/graphql';

interface Props {
  verified: AdminVerified;
}

const MAX_PIE_SIZE = 256;

export const VerifiedSites: FC<Props> = ({ verified }) => {
  useResize();

  const ref = React.useRef<HTMLDivElement>(null);

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

  const pieContainerWidth = (() => {
    if (ref.current) {
      const { width } = ref.current.getBoundingClientRect();
      return width;
    }

    return MAX_PIE_SIZE;
  })();

  const outerRadius = clamp(pieContainerWidth / 2, 0, MAX_PIE_SIZE / 2);
  const innerRadius = outerRadius - 16;

  return (
    <div ref={ref} className='pie-wrapper'>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey='value'
            innerRadius={innerRadius}
            outerRadius={outerRadius}
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
