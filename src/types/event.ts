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
  'unknown';

export interface EventItem {
  name: string;
  value: EventName;
}
