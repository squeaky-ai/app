import React from 'react';
import type { FC } from 'react';
import type { Replayer } from 'rrweb';
import { last } from 'lodash';
import { EventType, IncrementalSource, MouseInteractions } from 'rrweb';
import { ActivityTimestamp } from 'components/sites/activity-timestamp';
import { cssPath } from 'lib/css-path';
import type { Event } from 'types/event';
import type { Recording } from 'types/recording';

interface Props {
  replayer: Replayer;
  recording: Recording;
}

const isPageViewEvent = (event: Event) => event.type === EventType.Meta;

const isMouseEvent = (event: Event) => event.type === EventType.IncrementalSnapshot && event.data.source === IncrementalSource.MouseInteraction;

const isScrollEvent = (event: Event) => event.type === EventType.IncrementalSnapshot && event.data.source === IncrementalSource.Scroll;

const getMouseInteractionLabel = (type: MouseInteractions): string => {
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

const getMouseInteractionIcon = (type: MouseInteractions): string => {
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

export const SidebarActivity: FC<Props> = ({ recording, replayer }) => {
  const events: Event[] = JSON.parse(recording.events.items);

  const activity = events.reduce((acc, item) => {
    // Add all of the page views
    if (isPageViewEvent(item)) {
      return [...acc, item];
    }

    // Add all of the mouse events
    if (isMouseEvent(item)) {
      return [...acc, item];
    }

    // Only add scroll events if the previous event was not a scroll event
    if (isScrollEvent(item)) {
      const prevEvent = last(acc);
      return isScrollEvent(prevEvent) ? [...acc] : [...acc, item];
    }

    return [...acc];
  }, [] as Event[]);

  const startedAt = activity[0]?.timestamp || 0;

  const getCssSelector = (id: number) => {
    const node = replayer?.getMirror().getNode(id);
    if (!node) return 'Loading...';

    const element = node.nodeType === Node.TEXT_NODE
      ? node.parentNode
      : node;

    return cssPath(element) || 'html > body';
  }

  const getPathName = (url: string) => new URL(url).pathname;

  return (
    <ul className='datarow'>
      {activity.map((item, index) => (
        <li className='icon' key={`${item.timestamp}_${index}`}>
          {item.type === EventType.Meta && (
            <>
              <i className='ri-compass-discover-line' />
              <p className='title'>
                Page view <ActivityTimestamp timestamp={item.timestamp} offset={startedAt} replayer={replayer} />
              </p>
              <p className='info'>{getPathName(item.data.href)}</p>
            </>
          )}

          {item.type === EventType.IncrementalSnapshot && item.data.source === IncrementalSource.Scroll && (
            <>
              <i className='ri-mouse-line' />
              <p className='title'>
                Scrolled <ActivityTimestamp timestamp={item.timestamp} offset={startedAt} replayer={replayer} />
              </p>
            </>
          )}

          {item.type === EventType.IncrementalSnapshot && item.data.source === IncrementalSource.MouseInteraction && (
            <>
              <i className={getMouseInteractionIcon(item.data.type)} />
              <p className='title'>
                {getMouseInteractionLabel(item.data.type)} <ActivityTimestamp timestamp={item.timestamp} offset={startedAt} replayer={replayer} />
              </p>
              <p className='info'>{getCssSelector(item.data.id)}</p>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};
