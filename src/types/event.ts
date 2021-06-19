export type Event = PageViewEvent | CursorEvent | ScrollEvent | InteractionEvent;

export type InteractionEventType = 'click' | 'hover' | 'focus' | 'blur';

export interface PageViewEvent {
  type: 'page_view';
  path: string;
  locale: string;
  useragent: string;
  viewportX: number;
  viewportY: number;
  time: number;
  timestamp: number;
}

export interface CursorEvent {
  type: 'cursor';
  x: number;
  y: number;
  time: number;
  timestamp: number;
}

export interface ScrollEvent {
  type: 'scroll'; 
  x: number;
  y: number;
  time: number;
  timestamp: number;
}

export interface InteractionEvent {
  type: InteractionEventType;
  selector: string;
  time: number;
  timestamp: number;
}

export interface PaginatedEventsResponse {
  items: Event[];
  pagination: EventPagination;
}

export interface EventPagination {
  cursor?: string;
  isLast: boolean;
  pageSize: number;
}
