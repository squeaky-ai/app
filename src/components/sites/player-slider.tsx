import React, { ChangeEvent } from 'react';
import type { FC } from 'react';
import { first, last, throttle } from 'lodash';
import { Button } from 'components/button';
import { Slider } from 'components/slider';
import { PlayerSpeed } from 'components/sites/player-speed';
import { usePlayerState } from 'hooks/player-state';
import type { Event } from 'types/event';

export const PlayerSlider: FC = () => {
  const [state, dispatch] = usePlayerState();

  const events: Event[] = JSON.parse(state.recording?.events || '[]');

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
    state.playing
      ? window.replayer.pause()
      : window.replayer.play();
  };

  const handlePlaybackSpeed = (speed: number) => {
    dispatch({ type: 'playbackSpeed', value: speed });
  };

  const handleScrub = throttle((event: ChangeEvent) => {
    const element = event.target as HTMLInputElement;
    const value = Number(element.value);
    window.replayer.pause(value * 1000);
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
      <PlayerSpeed playbackSpeed={state.playbackSpeed} handlePlaybackSpeed={handlePlaybackSpeed} />
    </>
  );
};
