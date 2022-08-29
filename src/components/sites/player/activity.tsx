import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';

interface Props {
  max: number;
  duration: number;
  inactivity: number[][];
  enabled: boolean;
}

export const Activity: FC<Props> = ({ max, duration, inactivity, enabled }) => {
  const leftPositionFromDuration = (inactivityItem: number[]) => {
    const [left, right] = inactivityItem;

    return [
      Math.round(((left) / duration) * 100),
      right ? Math.round(((right) / duration) * 100) : 100,
    ];
  };

  return (
    <div className={classnames('activity', { hidden: !enabled})} style={{ width: `${max}%` }}>
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
