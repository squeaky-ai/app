import { EventType, IncrementalSource, MouseInteractions } from 'rrweb';
import { ErrorEvent, CustomEvents } from 'types/event';
import { EventStatsSort } from 'types/events';
import type { metaEvent } from 'rrweb/typings/types';
import type { Event, EventName } from 'types/event';
import type { EventsStat, RecordingsEvent } from 'types/graphql';

type EventWithTimestamp<T> = T & { id: number; timestamp: number; delay?: number; };

export const isPageViewEvent = (
  event: Event | ErrorEvent
): event is EventWithTimestamp<metaEvent> => event.type === EventType.Meta;

export const isMouseEvent = (
  event: Event | ErrorEvent
) => event.type === EventType.IncrementalSnapshot && event.data.source === IncrementalSource.MouseInteraction;

export const isScrollEvent = (
  event: Event | ErrorEvent
) => event.type === EventType.IncrementalSnapshot && event.data.source === IncrementalSource.Scroll;

export const isErrorEvent = (
  event: Event | ErrorEvent
): event is ErrorEvent => (event.type as any) === CustomEvents.ERROR;

export const parseRecordingEvents = (event: RecordingsEvent[]): Event[] => event.map(i => ({
  id: Number(i.id),
  type: i.type, 
  data: JSON.parse(i.data),
  timestamp: Number(i.timestamp),
}));

export function getEventName(event: Event | ErrorEvent): EventName {
  if (event.type === EventType.Meta) {
    return 'page_view';
  }

  if (event.type === EventType.IncrementalSnapshot && event.data.source === IncrementalSource.Scroll) {
    return 'scroll';
  }

  if (event.type === EventType.IncrementalSnapshot && event.data.source === IncrementalSource.MouseInteraction) {
    switch(event.data.type) {
      case MouseInteractions.MouseUp:
      case MouseInteractions.MouseDown:
      case MouseInteractions.DblClick:
      case MouseInteractions.Click:
        return 'click';
      case MouseInteractions.Focus:
        return 'focus';
      case MouseInteractions.Blur:
        return 'blur';
      case MouseInteractions.TouchEnd:
      case MouseInteractions.TouchStart:
      case MouseInteractions.TouchMove_Departed:
        return 'touch';
    }
  }

  if ((event.type as EventType | CustomEvents) === CustomEvents.ERROR) {
    return 'error';
  }

  return 'unknown';
}

export function getMouseInteractionLabel(type: MouseInteractions): string {
  switch(type) {
    case MouseInteractions.MouseUp:
    case MouseInteractions.MouseDown:
    case MouseInteractions.DblClick:
    case MouseInteractions.Click:
      return 'Clicked';
    case MouseInteractions.Focus:
      return 'Focus';
    case MouseInteractions.Blur:
      return 'Blur';
    case MouseInteractions.TouchEnd:
    case MouseInteractions.TouchStart:
    case MouseInteractions.TouchMove_Departed:
      return 'Touch';
    case MouseInteractions.ContextMenu:
      return 'Context';
    default:
      return 'Unknown';
  }
};

export function getMouseInteractionIcon (type: MouseInteractions): string {
  switch(type) {
    case MouseInteractions.MouseUp:
    case MouseInteractions.MouseDown:
    case MouseInteractions.DblClick:
    case MouseInteractions.Click:
      return 'cursor-line';
    case MouseInteractions.Focus:
    case MouseInteractions.Blur:
      return 'input-method-line';
    case MouseInteractions.TouchEnd:
    case MouseInteractions.TouchStart:
    case MouseInteractions.TouchMove_Departed:
      return 'drag-drop-line';
    case MouseInteractions.ContextMenu:
      return 'menu-line';
    default:
      return 'question-line';
  }
};

export const sortEventsStats = (
  eventStats: EventsStat[], 
  sort: EventStatsSort
) => [...eventStats].sort((a, b) => {
  switch(sort) {
    case EventStatsSort.NameAsc:
      return a.name.localeCompare(b.name);
    case EventStatsSort.NameDesc:
      return b.name.localeCompare(a.name);
    case EventStatsSort.CountAsc:
      return a.count - b.count;
    case EventStatsSort.CountDesc:
      return b.count - a.count;
    case EventStatsSort.TypeAsc:
      return a.type.localeCompare(b.type);
    case EventStatsSort.TypeDesc:
      return b.type.localeCompare(a.type);
    case EventStatsSort.AverageEventsPerVisitorAsc:
      return a.averageEventsPerVisitor - b.averageEventsPerVisitor;
    case EventStatsSort.AverageEventsPerVisitorDesc:
      return b.averageEventsPerVisitor - a.averageEventsPerVisitor;
  }
});
