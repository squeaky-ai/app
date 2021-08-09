import React from 'react';
import type { FC } from 'react';
import { Button } from 'components/button';
import { useReplayer } from 'hooks/replayer';
import { toTimeString } from 'lib/dates';

interface Props {
  timestamp: number;
  offset: number;
}

export const ActivityTimestamp: FC<Props> = ({ timestamp, offset }) => {
  const value = timestamp - offset;
  const [replayer] = useReplayer();

  const handleClick = () => {
    const milliseconds = Math.round(value);
    replayer?.play(milliseconds);
  };

  return (
    <Button className='timestamp' onClick={handleClick}>
      {toTimeString(value)}
    </Button>
  );
};
