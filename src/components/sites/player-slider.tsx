import React, { ChangeEvent } from 'react';
import type { FC } from 'react';
import { first, last, throttle } from 'lodash';
import { Button } from 'components/button';
import { Slider } from 'components/slider';
import { usePlayerState } from 'hooks/player-state';

export const PlayerSlider: FC = () => {
  const [state, dispatch] = usePlayerState();

  const events = state.recording?.events || [];

  const firstEventTime = first(events)?.timestamp || 0;
  const lastEventTime = last(events)?.timestamp || 0;

  const progress = Math.floor(state.progress);
  const durationSeconds = Math.floor((lastEventTime - firstEventTime) / 1000);

  const timeString = (ms: number) => {
    const date = new Date(0);
    date.setSeconds(ms);
    return date.toISOString().substr(14, 5);
  };

  const handlePlayPause = () => {
    dispatch({ type: 'playing', value: !state.playing });
  };

  const handleScrub = throttle((event: ChangeEvent) => {
    const element = event.target as HTMLInputElement;
    dispatch({ type: 'progress', value: Number(element.value) });
  }, 25);

  return (
    <>
      <Button className='control play-pause' onClick={handlePlayPause}>
        {state.playing
          ? <i className='ri-pause-fill' />
          : <i className='ri-play-fill' />
        }
      </Button>
      <Slider type='range' min={0} max={durationSeconds} step={1} value={progress} onChange={handleScrub} />
      <span className='timestamps'>
        {timeString(state.progress)} / {timeString(durationSeconds)}
      </span>
      <Button className='speed'>1x</Button>
    </>
  );
};
