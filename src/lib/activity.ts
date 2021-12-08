import type { Event } from 'types/event';
import { EventType, IncrementalSource, MouseInteractions } from 'rrweb';
import type { metaEvent } from 'rrweb/typings/types';
import type { ActivityName } from 'types/event';

type EventWithTimestamp<T> = T & { id: number; timestamp: number; delay?: number; };

export const isPageViewEvent = (
  event: Event
): event is EventWithTimestamp<metaEvent> => event.type === EventType.Meta;

export const isMouseEvent = (
  event: Event
) => event.type === EventType.IncrementalSnapshot && event.data.source === IncrementalSource.MouseInteraction;

export const isScrollEvent = (
  event: Event
) => event.type === EventType.IncrementalSnapshot && event.data.source === IncrementalSource.Scroll;


export function getActivityName(event: Event): ActivityName {
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
      return 'ri-cursor-line';
    case MouseInteractions.Focus:
    case MouseInteractions.Blur:
      return 'ri-input-method-line';
    case MouseInteractions.TouchEnd:
    case MouseInteractions.TouchStart:
    case MouseInteractions.TouchMove_Departed:
      return 'ri-drag-drop-line';
    case MouseInteractions.ContextMenu:
      return 'ri-menu-line';
    default:
      return 'ri-question-line';
  }
};
