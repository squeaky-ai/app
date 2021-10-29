import type { PlayerTab } from 'data/sites/enums';
import type { ValueOf } from 'types/common';

export enum PlayerStatus {
  PLAYING,
  PAUSED,
  FAILED,
  FINISHED,
  LOADING,
}

export interface PlayerState {
  status: PlayerStatus;
  playbackSpeed: number;
  activeTab: PlayerTab;
  skipInactivity: boolean;
  zoom: number;
}

export type Action = {
  type: keyof PlayerState;
  value: ValueOf<PlayerState>;
}
