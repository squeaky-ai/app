import type { eventWithTime } from 'rrweb/typings/types';

export type Event = eventWithTime & {
  id: number;
};

export type ActivityName =
  'page_view' |
  'click' |
  'focus' |
  'blur' |
  'touch' |
  'hover' |
  'scroll' |
  'unknown';

export interface Activity {
  name: string;
  value: ActivityName;
}
