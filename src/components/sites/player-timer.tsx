import React from 'react';
import type { FC } from 'react';
import { usePlayerState } from 'components/sites/player-provider';

export const PlayerTimer: FC = ({ children }) => {
  const [state, setState] = usePlayerState();

  console.log(state, setState);

  return (<>{children}</>);
};
