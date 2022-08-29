import type { PlayerTab } from 'data/sites/enums';
import type { ValueOf } from 'types/common';
import type { EventName, EventOptions } from 'types/event';

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
  incomplete: boolean;
  zoom: number;
  eventOptions: EventOptions[];
  eventVisibility: EventName[];
}

export type Action = {
  type: keyof PlayerState;
  value: ValueOf<PlayerState>;
}
