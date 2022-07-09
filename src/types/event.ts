import type { eventWithTime } from 'rrweb/typings/types';

export type Event = eventWithTime & {
  id: number;
};

export type EventName =
  'page_view' |
  'click' |
  'focus' |
  'blur' |
  'touch' |
  'hover' |
  'scroll' |
  'error' |
  'unknown';

export interface EventItem {
  name: string;
  value: EventName;
}

export enum CustomEvents {
  ERROR = 100,
  CUSTOM_TRACK = 101,
}

export type ErrorEvent = {
  id: number;
  type: CustomEvents.ERROR;
  timestamp: number;
  data: {
    line_number: number;
    col_number: number;
    message: string;
    stack: string;
    filename: string;
    href: string;
  }
}

export type Events = (Event | ErrorEvent)[];
