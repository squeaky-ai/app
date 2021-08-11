import React from 'react';
import type { FC } from 'react';
import type { Replayer } from 'rrweb';
import { Button } from 'components/button';
import { PlayerSpeed } from 'components/sites/player-speed';
import { PlayerSlider } from 'components/sites/player-slider';
import type { PlayerState, Action } from 'types/player';
import type { Recording } from 'types/recording';

interface Props {
  state: PlayerState;
  replayer: Replayer;
  recording: Recording;
  dispatch: React.Dispatch<Action>;
}

export const PlayerControls: FC<Props> = ({ state, replayer, recording, dispatch }) => {
  const handlePlayPause = () => {
    state.playing
      ? replayer.pause()
      : replayer.play(replayer.getCurrentTime());
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
    replayer.play(ms);
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
          recording={recording} 
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
