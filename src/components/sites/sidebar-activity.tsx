import React from 'react';
import type { FC } from 'react';
import type { Replayer } from 'rrweb';
import classnames from 'classnames';
import { last } from 'lodash';
import { EventType, IncrementalSource } from 'rrweb';
import { ActivityTimestamp } from 'components/sites/activity-timestamp';
import { SidebarActivityVisibility } from 'components/sites/sidebar-activity-visibility';
import { cssPath } from 'lib/css-path';
import type { Event } from 'types/event';
import type { Recording } from 'types/recording';

import { 
  ActivityName,
  activities, 
  getActivityName, 
  getMouseInteractionLabel, 
  getMouseInteractionIcon, 
  isMouseEvent,
  isPageViewEvent,
  isScrollEvent,
} from 'lib/activity';

interface Props {
  replayer: Replayer;
  recording: Recording;
}

export const SidebarActivity: FC<Props> = ({ recording, replayer }) => {
  const [active, setActive] = React.useState<ActivityName[]>(activities.map(a => a.value));

  const events: Event[] = recording.events.items.map(i => JSON.parse(i));

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
    <>
      <SidebarActivityVisibility active={active} setActive={setActive} />

      <ul className='datarow'>
        {activity.map((item, index) => (
          <li className={classnames('icon', { hidden: !active.includes(getActivityName(item)) })} key={`${item.timestamp}_${index}`}>
            {isPageViewEvent(item) && (
              <>
                <i className='ri-compass-discover-line' />
                <p className='title'>
                  Page view <ActivityTimestamp timestamp={item.timestamp} offset={startedAt} replayer={replayer} />
                </p>
                <p className='info'>{getPathName(item.data.href)}</p>
              </>
            )}

            {isScrollEvent(item) && (
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
    </>
  );
};
