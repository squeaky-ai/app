import React from 'react';
import type { FC } from 'react';
import type { Replayer } from 'rrweb';
import { Button } from 'components/button';
import { toTimeString } from 'lib/dates';

interface Props {
  timestamp: number;
  offset: number;
  replayer: Replayer;
}

export const ActivityTimestamp: FC<Props> = ({ timestamp, offset, replayer }) => {
  const value = timestamp - offset;

  const handleClick = () => {
    const milliseconds = Math.round(value);
    replayer.play(milliseconds);
  };

  return (
    <Button className='timestamp' onClick={handleClick}>
      {toTimeString(value)}
    </Button>
  );
};
