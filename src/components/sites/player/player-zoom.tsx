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

  const zoom = Number((Math.ceil(state.zoom / .1) * .1).toFixed(2));
  const displayZoom = Math.round(zoom * 100);

  const getValueWithoutStupidRounding = (value: number) => {
    return Number(value.toFixed(2));
  };

  const handleZoomIn = () => {
    const next = zoom + step;
    if (next <= max) dispatch({ type: 'zoom', value: getValueWithoutStupidRounding(next) });
  };

  const handleZoomOut = () => {
    const next = zoom - step;
    if (next >= min) dispatch({ type: 'zoom', value: getValueWithoutStupidRounding(next) });
  };

  return (
    <>
      <Button className='control' onClick={handleZoomOut} disabled={!recording || zoom === min}>
        <Icon name='zoom-out-line' />
      </Button>
      <p className='zoom-level'>
        {displayZoom === Infinity ? 100 : displayZoom}%
      </p>
      <Button className='control' onClick={handleZoomIn} disabled={!recording || zoom === max}>
        <Icon name='zoom-in-line' />
      </Button>
    </>
  );
};
