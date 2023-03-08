import { last } from 'lodash';
import { EventType, IncrementalSource, MouseInteractions } from 'rrweb';
import { ErrorEvent, CustomEvents } from 'types/event';
import { EventStatsSort } from 'types/events';
import { EventsStat, PlanFeature, RecordingsEvent } from 'types/graphql';
import type { PlayerState } from 'types/player';
import type { Event, Events, EventName, SessionEvent, InteractionEventItem } from 'types/event';

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

export const getInteractionEvents = (
  events: Events,
  state: PlayerState,
  featuresEnabled: PlanFeature[],
  inactivity?: number[][],
): { interactionEvents: InteractionEventItem[], startedAt: number } => {
  const startedAt = events[0]?.timestamp || 0;

  let results = events.reduce((acc, item) => {
    const eventName = getEventName(item);

    if (eventName === 'unknown') return acc;
    if (eventName === 'error' && !featuresEnabled.includes(PlanFeature.ErrorTracking)) return acc;
    if (eventName === 'custom' && !featuresEnabled.includes(PlanFeature.EventTracking)) return acc;

    const event: InteractionEventItem = {
      eventName,
      id: item.id,
      show: state.eventVisibility.includes(eventName),
      timestampStart: item.timestamp,
      timestampEnd: null,
      label: getEventLabel(eventName),
      info: null,
    };

    const data = item.data as any; // TODO

    if (eventName === 'page_view') {
      event.info = data.href;
    }

    if (['click', 'blur', 'focus', 'touch', 'context'].includes(eventName)) {
      event.info = data.selector || 'Unknown';
    }

    if (eventName === 'error') {
      event.info = data.message;
    }

    if (eventName === 'scroll') {
      const prevEvent = last(acc);
      if (prevEvent?.eventName === 'scroll') {
        prevEvent.timestampEnd = item.timestamp;
        return acc;
      }
    }

    return [...acc, event]
  }, [] as InteractionEventItem[]);

  inactivity?.forEach((inactivity, index) => {
    results.push({
      id: `inactivity-${index}`,
      eventName: 'inactivity',
      label: 'Inactivity',
      show: state.eventVisibility.includes('inactivity'),
      timestampStart: startedAt + Number(inactivity[0]),
      timestampEnd: startedAt + Number(inactivity[1]),
      info: null,
    });
  });

  results.sort((a, b) => a.timestampStart - b.timestampStart);

  // HACK: The inactivity is not precise enough and multiple
  // can stack up against each other, better to just combine
  // them so it doesn't look jank
  results = results.reduce((acc, result) => {
    if (result.eventName === 'inactivity' && last(acc)?.eventName === 'inactivity') {
      return [...acc.slice(0, -1), { ...last(acc), timestampEnd: result.timestampEnd }];
    } 

    return [...acc, result];
  }, []);

  return {
    interactionEvents: results,
    startedAt,
  };
};
