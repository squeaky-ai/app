import React from 'react';
import type { FC } from 'react';
import { first, last } from 'lodash';
import { Button } from 'components/button';
import { Slider } from 'components/slider';
import { PlayerSpeed } from 'components/sites/player-speed';
import { useReplayer } from 'hooks/replayer';
import { usePlayerState } from 'hooks/player-state';
import type { Event } from 'types/event';

export const PlayerSlider: FC = () => {
  const [replayer] = useReplayer();
  const [state, dispatch] = usePlayerState();
  const [slide, setSlide] = React.useState<number>(0);

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
      ? replayer?.pause()
      : replayer?.play();
  };

  const handlePlaybackSpeed = (speed: number) => {
    replayer.setConfig({ speed });
  };

  const handleSkipInactivity = (skip: boolean) => {
    replayer.setConfig({ skipInactive: skip });
    // TODO: It would be nice if the replayer reacted and 
    // dispatched but it doesn't seem to trigger anything
    dispatch({ type: 'skipInactivity', value: skip });
  };

  const handleSlide = (event: React.ChangeEvent) => {
    const element = event.target as HTMLInputElement;
    const value = Number(element.value);
    setSlide(value);
    replayer?.pause(value * 1000);
  };

  React.useEffect(() => {
    setSlide(progress);
  }, [progress]);

  return (
    <>
      <Button className='control play-pause' onClick={handlePlayPause}>
        {state.playing
          ? <i className='ri-pause-fill' />
          : <i className='ri-play-fill' />
        }
      </Button>

      <Slider 
        type='range' 
        min={0} 
        max={durationSeconds} 
        step={1} 
        value={slide} 
        onChange={handleSlide} 
      />

      <span className='timestamps'>
        {timeString(state.progress)} / {timeString(durationSeconds)}
      </span>

      <PlayerSpeed 
        playbackSpeed={state.playbackSpeed} 
        skipInactivity={state.skipInactivity}
        handlePlaybackSpeed={handlePlaybackSpeed} 
        handleSkipInactivity={handleSkipInactivity}
      />
    </>
  );
};
