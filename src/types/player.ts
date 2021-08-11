import type { PlayerTab } from 'data/sites/enums';

export interface PlayerState {
  playing: boolean;
  playbackSpeed: number;
  activeTab: PlayerTab;
  skipInactivity: boolean;
  zoom: number;
}

type ValueOf<T> = T[keyof T];

export type Action = {
  type: keyof PlayerState;
  value: ValueOf<PlayerState>;
}
