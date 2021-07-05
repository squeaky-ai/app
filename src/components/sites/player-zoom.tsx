import React from 'react';
import type { FC } from 'react';
import { Button } from 'components/button';
import { usePlayerState } from 'hooks/player-state';

export const PlayerZoom: FC = () => {
  const [state, setState] = usePlayerState();

  const min = .5;
  const max = 2;
  const step = .1;

  const handleZoomIn = () => {
    const next = state.zoom + step;
    if (next <= max) setState({ zoom: next });
  };

  const handleZoomOut = () => {
    const next = state.zoom - step;
    if (next >= min) setState({ zoom: next });
  };

  return (
    <>
      <Button className='control' onClick={handleZoomOut} disabled={state.zoom === min}>
        <i className='ri-zoom-out-line' />
      </Button>
      <p className='zoom-level'>{Math.round(state.zoom * 100)}%</p>
      <Button className='control' onClick={handleZoomIn} disabled={state.zoom === max}>
        <i className='ri-zoom-in-line' />
      </Button>
    </>
  );
};