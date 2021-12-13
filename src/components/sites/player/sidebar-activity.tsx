import React from 'react';
import type { FC } from 'react';
import type { Replayer } from 'rrweb';
import classnames from 'classnames';
import { last } from 'lodash';
import { Icon } from 'components/icon';
import { EventType, IncrementalSource } from 'rrweb';
import { ActivityTimestamp } from 'components/sites/player/activity-timestamp';
import { SidebarActivityVisibility } from 'components/sites/player/sidebar-activity-visibility';
import { Preference, Preferences } from 'lib/preferences';
import { ACTIVITIES } from 'data/recordings/constants';
import type { Event, ActivityName } from 'types/event';
import type { Recording } from 'types/graphql';

import {
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
  const savedActive = Preferences.getArray<ActivityName>(Preference.ACTIVITY_SHOW_TYPES);

  const [active, setActive] = React.useState<ActivityName[]>(
    // If they have anything stored in the preferences then
    // show that, otherwise default to showing all of the types
    savedActive.length === 0 ? ACTIVITIES.map(a => a.value) : savedActive
  );

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

  const getPathName = (url: string) => new URL(url).pathname;

  return (
    <>
      <SidebarActivityVisibility active={active} setActive={setActive} />

      <ul className='datarow'>
        {activity.map((item, index) => (
          <li className={classnames('icon', { hidden: !active.includes(getActivityName(item)) })} key={`${item.timestamp}_${index}`}>
            {isPageViewEvent(item) && (
              <>
                <Icon name='compass-discover-line' />
                <p className='title'>
                  Page view <ActivityTimestamp timestamp={item.timestamp} offset={startedAt} replayer={replayer} />
                </p>
                <p className='info'>{getPathName(item.data.href)}</p>
              </>
            )}

            {isScrollEvent(item) && (
              <>
                <Icon name='mouse-line' />
                <p className='title'>
                  Scrolled <ActivityTimestamp timestamp={item.timestamp} offset={startedAt} replayer={replayer} />
                </p>
              </>
            )}

            {item.type === EventType.IncrementalSnapshot && item.data.source === IncrementalSource.MouseInteraction && (
              <>
                <Icon name={getMouseInteractionIcon(item.data.type)} />
                <p className='title'>
                  {getMouseInteractionLabel(item.data.type)} <ActivityTimestamp timestamp={item.timestamp} offset={startedAt} replayer={replayer} />
                </p>
                <p className='info'>{(item.data as any).selector || 'Unknown'}</p>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};
