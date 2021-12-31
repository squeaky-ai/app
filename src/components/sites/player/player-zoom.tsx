import React from 'react';
import type { FC } from 'react';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import type { Recording } from 'types/graphql';
import type { PlayerState, Action } from 'types/player';

interface Props {
  state: PlayerState;
  recording: Recording;
  dispatch: React.Dispatch<Action>;
}

export const PlayerZoom: FC<Props> = ({ state, recording, dispatch }) => {
  const min = .1;
  const max = 5;
  const step = .1;

  const getValueWithoutStupidRounding = (value: number) => {
    return Number(value.toFixed(2));
  };

  const handleZoomIn = () => {
    const next = state.zoom + step;
    if (next <= max) dispatch({ type: 'zoom', value: getValueWithoutStupidRounding(next) });
  };

  const handleZoomOut = () => {
    const next = state.zoom - step;
    if (next >= min) dispatch({ type: 'zoom', value: getValueWithoutStupidRounding(next) });
  };

  return (
    <>
      <Button className='control' onClick={handleZoomOut} disabled={!recording || state.zoom === min}>
        <Icon name='zoom-out-line' />
      </Button>
      <p className='zoom-level'>{Math.round(state.zoom * 100)}%</p>
      <Button className='control' onClick={handleZoomIn} disabled={!recording || state.zoom === max}>
        <Icon name='zoom-in-line' />
      </Button>
    </>
  );
};
