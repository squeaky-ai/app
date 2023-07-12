import { EventType, IncrementalSource, MouseInteractions } from 'rrweb';
import { ErrorEvent, CustomEvents } from 'types/event';
import { EventStatsSort, EventsCaptureType } from 'types/events';
import { EventsStat, RecordingsEvent } from 'types/graphql';
import type { Event, EventName, SessionEvent } from 'types/event';

export const isPageViewEvent = (
  event: SessionEvent
): event is ErrorEvent => (event.type as any) === CustomEvents.PAGE_VIEW;

export const isMouseEvent = (
  event: SessionEvent
) => event.type === EventType.IncrementalSnapshot && event.data.source === IncrementalSource.MouseInteraction;

export const isScrollEvent = (
  event: SessionEvent
) => event.type === EventType.IncrementalSnapshot && event.data.source === IncrementalSource.Scroll;

export const isErrorEvent = (
  event: SessionEvent
): event is ErrorEvent => (event.type as any) === CustomEvents.ERROR;

export const isResizeEvent = (
  event: SessionEvent
) => event.type === EventType.IncrementalSnapshot && event.data.source === IncrementalSource.ViewportResize;

export const isCustomEvent = (
  event: SessionEvent
): event is ErrorEvent => (event.type as any) === CustomEvents.CUSTOM_TRACK;

export const parseRecordingEvents = (event: RecordingsEvent[]): Event[] => event.map(i => ({
  id: i.id,
  type: i.type, 
  data: JSON.parse(i.data),
  timestamp: Number(i.timestamp),
}));

export function getEventName(event: SessionEvent): EventName {
  if (isPageViewEvent(event)) {
    return 'page_view';
  }

  if (isScrollEvent(event)) {
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
      case MouseInteractions.ContextMenu:
        return 'context';
    }
  }

  if (isResizeEvent(event)) {
    return 'resize';
  }

  if (isErrorEvent(event)) {
    return 'error';
  }

  if (isCustomEvent(event)) {
    return 'custom'
  }

  return 'unknown';
}

export function getEventLabel(name: EventName): string {
  switch(name) {
    case 'blur':
      return 'Blur';
    case 'click':
      return 'Click';
    case 'context':
      return 'Right Click';
    case 'custom':
      return 'Custom Event';
    case 'error':
      return 'JavaScript Error';
    case 'focus':
      return 'Focus';
    case 'hover':
      return 'Hover';
    case 'inactivity':
      return 'Inactivity';
    case 'page_view':
      return 'Page View';
    case 'scroll':
      return 'Scroll';
    case 'touch':
      return 'Touch';
    case 'resize':
      return 'Viewport Resize';
    case 'rage_click':
      return 'Rage Click';
    case 'unknown':
    default:
      return 'Uknown';
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
    case EventStatsSort.UniqueTriggersAsc:
      return a.uniqueTriggers - b.uniqueTriggers;
    case EventStatsSort.UniqueTriggersDesc:
      return b.uniqueTriggers - a.uniqueTriggers;
    case EventStatsSort.AverageEventsPerVisitorAsc:
      return a.averageEventsPerVisitor - b.averageEventsPerVisitor;
    case EventStatsSort.AverageEventsPerVisitorDesc:
      return b.averageEventsPerVisitor - a.averageEventsPerVisitor;
  }
});

export const getEventCaptureText = (type: EventsCaptureType) => {
  switch(type) {
    case EventsCaptureType.PageVisit:
      return 'Page View';
    case EventsCaptureType.TextClick:
      return 'Text Click';
    case EventsCaptureType.SelectorClick:
      return 'CSS Selector Click';
    case EventsCaptureType.UtmParameters:
      return 'UTM Parameters';
    case EventsCaptureType.Error:
      return 'JavaScript Error';
    case EventsCaptureType.Custom:
      return 'Custom Event';
  }
};
