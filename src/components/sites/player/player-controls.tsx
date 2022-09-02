import React from 'react';
import type { FC } from 'react';
import type { Replayer } from 'rrweb';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { PlayerSpeed } from 'components/sites/player/player-speed';
import { PlayerSlider } from 'components/sites/player/player-slider';
import { PlayerSliderV2 } from 'components/sites/player/player-slider-v2';
import { PlayerSliderLoading } from 'components/sites/player/player-slider-loading';
import { PlayerIncomplete } from 'components/sites/player/player-incomplete';
import { Spinner } from 'components/spinner';
import { PlayerState, Action, PlayerStatus } from 'types/player';
import type { Recording } from 'types/graphql';
import type { Event } from 'types/event';
import { useFeatureFlags } from 'hooks/use-feature-flags';
import { FeatureFlag } from 'lib/feature-flags';

interface Props {
  state: PlayerState;
  replayer: Replayer;
  events: Event[];
  recording: Recording;
  dispatch: React.Dispatch<Action>;
}

export const PlayerControls: FC<Props> = ({ state, replayer, events, recording, dispatch }) => {
  const { featureFlagEnabled } = useFeatureFlags();

  const handlePlayPause = () => {
    switch(state.status) {
      case PlayerStatus.FINISHED:
        replayer.play(0);
        break;
      case PlayerStatus.PLAYING:
        replayer.pause();
        break;
      default:
        replayer.play(replayer.getCurrentTime());
    }   
  };

  const handlePlaybackSpeed = (speed: number) => {
    replayer.pause();
    replayer.setConfig({ speed });
    replayer.play(replayer.getCurrentTime());
  };

  const handleSkipInactivity = (skip: boolean) => {
    replayer.setConfig({ skipInactive: skip });
    // TODO: It would be nice if the replayer reacted and 
    // dispatched but it doesn't seem to trigger anything
    dispatch({ type: 'skipInactivity', value: skip });
  };

  const handleSetProgress = (ms: number, resume: boolean) => {
    replayer.pause(ms);
    replayer.setConfig({ speed: 1 });
    if (state.skipInactivity) {
      // Without this it seems like the inactivity will never
      // be skipped after you scrub
      replayer.setConfig({ skipInactive: false });
      replayer.setConfig({ skipInactive: true });
    }
    if (resume) replayer.play(ms);
  };

  const PlayPauseIcon = () => {
    switch(state.status) {
      case PlayerStatus.PLAYING:
        return <Icon name='pause-fill' />;
      case PlayerStatus.PAUSED:
        return <Icon name='play-fill' />;
      case PlayerStatus.LOADING:
        return <Spinner hideShowExtra />;
      case PlayerStatus.FINISHED:
        return <Icon name='play-line' />;
      default:
        return null;
    }
  };

  return (
    <>
      <PlayerIncomplete 
        show={state.incomplete} 
        replayer={replayer}
      />

      <Button className='control play-pause' onClick={handlePlayPause} disabled={!recording}>
        <PlayPauseIcon />
      </Button>

      {replayer && recording && (
        featureFlagEnabled(FeatureFlag.SLIDER_V2)
          ? (
            <PlayerSliderV2
              key={recording.id}
              replayer={replayer}
              status={state.status}
              playbackSpeed={state.playbackSpeed}
              events={events}
              recording={recording} 
              state={state}
              handleSlide={handleSetProgress} 
              dispatch={dispatch}
            />
          )
          : (
            <PlayerSlider 
              key={recording.id}
              replayer={replayer}
              status={state.status}
              playbackSpeed={state.playbackSpeed}
              events={events}
              recording={recording} 
              state={state}
              handleSlide={handleSetProgress} 
              dispatch={dispatch}
            />
          )
      )}

      {(!replayer || !recording) && (
        <PlayerSliderLoading />
      )}

      <PlayerSpeed
        recording={recording}
        playbackSpeed={state.playbackSpeed} 
        skipInactivity={state.skipInactivity}
        handlePlaybackSpeed={handlePlaybackSpeed} 
        handleSkipInactivity={handleSkipInactivity}
      />
    </>
  );
};
