import React from 'react';
import type { FC } from 'react';

interface Props {
  max: number;
  duration: number;
  inactivity: number[][];
}

export const Activity: FC<Props> = ({ max, duration, inactivity }) => {
  const leftPositionFromDuration = (inactivityItem: number[]) => {
    const [left, right] = inactivityItem;

    return [
      Math.round(((left) / duration) * 100),
      right ? Math.round(((right) / duration) * 100) : 100,
    ];
  };

  return (
    <div className='activity' style={{ width: `${max}%` }}>
      {inactivity.map((inactivity, index) => {
        const [left, right] = leftPositionFromDuration(inactivity);

        return (
          <div
            key={index}
            className='block'
            style={{ left: `${left}%`, width: `${right - left}%` }}
          />
        );
      })}
    </div>
  );
};
