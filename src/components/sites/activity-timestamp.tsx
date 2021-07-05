import React from 'react';
import type { FC } from 'react';
import { Button } from 'components/button';
import type { EventWithTimestamp } from 'types/event';

interface Props {
  event: EventWithTimestamp;
  offset: number;
  setProgress: (seconds: number) => void;
}

export const ActivityTimestamp: FC<Props> = ({ event, offset, setProgress }) => {
  const timestamp = event.timestamp - offset;

  const timeString = (ms: number) => {
    const date = new Date(0);
    date.setSeconds(ms / 1000);
    return date.toISOString().substr(14, 5);
  };

  const handleClick = () => {
    const milliseconds = Math.round(timestamp);
    setProgress(milliseconds);
  };

  return (
    <Button className='timestamp' onClick={handleClick}>
      {timeString(timestamp)}
    </Button>
  );
};
