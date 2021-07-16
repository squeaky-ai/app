import React from 'react';
import type { FC } from 'react';
import { Button } from 'components/button';

interface Props {
  timestamp: number;
  offset: number;
}

export const ActivityTimestamp: FC<Props> = ({ timestamp, offset }) => {
  const value = timestamp - offset;

  const timeString = (ms: number) => {
    const date = new Date(0);
    date.setSeconds(ms / 1000);
    return date.toISOString().substr(14, 5);
  };

  const handleClick = () => {
    const milliseconds = Math.round(value);
    window.replayer.play(milliseconds);
  };

  return (
    <Button className='timestamp' onClick={handleClick}>
      {timeString(value)}
    </Button>
  );
};
