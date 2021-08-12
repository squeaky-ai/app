import type { Event } from 'types/event';
import type { PlayerTab } from 'data/sites/enums';

export interface PlayerState {
  failed: boolean;
  playing: boolean;
  playbackSpeed: number;
  activeTab: PlayerTab;
  skipInactivity: boolean;
  events: Event[];
  zoom: number;
}

type ValueOf<T> = T[keyof T];

export type Action = {
  type: keyof PlayerState;
  value: ValueOf<PlayerState>;
}
