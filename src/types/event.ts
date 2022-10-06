import type { eventWithTime } from 'rrweb/typings/types';

export type Event = eventWithTime & {
  id: string;
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
  'custom' |
  'context' |
  'unknown' |
  'inactivity';

export type EventOptions = 'compact';

export interface EventItem {
  name: string;
  value: EventName;
}

export enum CustomEvents {
  ERROR = 100,
  CUSTOM_TRACK = 101,
  PAGE_VIEW = 102,
}

export type ErrorEvent = {
  id: string;
  type: CustomEvents.ERROR;
  timestamp: number;
  data: {
    line_number: number;
    col_number: number;
    message: string;
    stack: string;
    filename: string;
    href: string;
  };
}

export type PageViewEvent = {
  id: string;
  type: CustomEvents.PAGE_VIEW;
  timestamp: number;
  data: {
    href: string;
  };
}

export type SessionEvent = Event | ErrorEvent | PageViewEvent;

export type Events = SessionEvent[];

export interface InteractionEventItem {
  id: string;
  show: boolean;
  eventName: EventName;
  timestampStart: number;
  timestampEnd: number;
  label: string;
  info?: string;
}
