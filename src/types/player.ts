import type { PlayerTab } from 'data/sites/enums';
import type { ValueOf } from 'types/common';

export interface PlayerState {
  failed: boolean;
  playing: boolean;
  playbackSpeed: number;
  activeTab: PlayerTab;
  skipInactivity: boolean;
  zoom: number;
}

export type Action = {
  type: keyof PlayerState;
  value: ValueOf<PlayerState>;
}
