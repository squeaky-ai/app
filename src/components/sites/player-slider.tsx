import React, { ChangeEvent } from 'react';
import type { FC } from 'react';
import { first, last, throttle } from 'lodash';
import { Button } from 'components/button';
import { Slider } from 'components/slider';
import { usePlayerState } from 'hooks/player-state';

export const PlayerSlider: FC = () => {
  const [state, setState] = usePlayerState();

  const firstEventTime = first(state.recording.events)?.timestamp || 0;
  const lastEventTime = last(state.recording.events)?.timestamp || 0;

  const progressSeconds = state.progress / 1000;
  const durationSeconds = (lastEventTime - firstEventTime) / 1000000;

  const timeString = (ms: number) => {
    const date = new Date(0);
    date.setSeconds(ms);
    return date.toISOString().substr(14, 5);
  };

  const handlePlayPause = () => {
    setState({ playing: !state.playing });
  };

  const handleScrub = throttle((event: ChangeEvent) => {
    const element = event.target as HTMLInputElement;
    setState({ progress: Number(element.value) * 1000 });
  }, 25);

  return (
    <>
      <Button className='control play-pause' onClick={handlePlayPause}>
        {state.playing
          ? <i className='ri-pause-fill' />
          : <i className='ri-play-fill' />
        }
      </Button>
      <Slider type='range' min={0} max={durationSeconds} step={.1} value={progressSeconds} onChange={handleScrub} />
      <span className='timestamps'>
        {timeString(progressSeconds)} / {timeString(durationSeconds)}
      </span>
      <Button className='speed'>1x</Button>
    </>
  );
};
