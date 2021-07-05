export interface PageViewEvent {
  eventId: string;
  type: 'pageview';
  path: string;
  locale: string;
  useragent: string;
  viewportX: number;
  viewportY: number;
}

export interface CursorEvent {
  eventId: string;
  type: 'cursor';
  x: number;
  y: number;
}

export interface ScrollEvent {
  eventId: string;
  type: 'scroll'; 
  x: number;
  y: number;
}

export interface InteractionEvent {
  eventId: string;
  type: InteractionEventType;
  selector: string;
  node: string;
}

export interface SnapshotEvent {
  eventId: string;
  type: 'snapshot';
  event: 'initialize' | 'applyChanged';
  snapshot: string;
}

interface VisibilityEvent {
  eventId: string;
  type: 'visibility';
  visible: boolean;
}

export interface EventPagination {
  cursor?: string;
  hasNext: boolean;
}

export type Event = 
  PageViewEvent | 
  CursorEvent | 
  ScrollEvent | 
  InteractionEvent | 
  SnapshotEvent |
  VisibilityEvent;

export type InteractionEventType = 'click' | 'hover' | 'focus' | 'blur';

export type EventWithTimestamp = Event & { timestamp: number; }

export type EventWithTime = EventWithTimestamp & { time: number };
