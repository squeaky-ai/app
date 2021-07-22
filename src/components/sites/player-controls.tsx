import React from 'react';
import type { FC } from 'react';
import { Button } from 'components/button';
import { PlayerSpeed } from 'components/sites/player-speed';
import { PlayerSlider } from 'components/sites/player-slider';
import { useReplayer } from 'hooks/replayer';
import { usePlayerState } from 'hooks/player-state';

export const PlayerControls: FC = () => {
  const [replayer] = useReplayer();
  const [state, dispatch] = usePlayerState();

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

  const handleSetProgress = (ms: number) => {
    replayer?.pause(ms);
  };

  return (
    <>
      <Button className='control play-pause' onClick={handlePlayPause}>
        {state.playing
          ? <i className='ri-pause-fill' />
          : <i className='ri-play-fill' />
        }
      </Button>

      {replayer && (
        <PlayerSlider 
          replayer={replayer}
          playing={state.playing}
          playbackSpeed={state.playbackSpeed}
          recording={state.recording} 
          handleSlide={handleSetProgress} 
        />
      )}

      <PlayerSpeed 
        playbackSpeed={state.playbackSpeed} 
        skipInactivity={state.skipInactivity}
        handlePlaybackSpeed={handlePlaybackSpeed} 
        handleSkipInactivity={handleSkipInactivity}
      />
    </>
  );
};
