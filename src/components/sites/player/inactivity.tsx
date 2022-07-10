import React from 'react';
import type { FC } from 'react';

interface Props {
  duration: number;
  inactivity: number[][];
}

export const Inactivity: FC<Props> = ({ duration, inactivity }) => {
  const leftPositionFromDuration = (inactivityItem: number[]) => {
    const [left, right] = inactivityItem;

    return [
      Math.round(((left) / duration) * 100),
      right ? Math.round(((right) / duration) * 100) : 100,
    ];
  };

  return (
    <div className='inactivity'>
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
