import React from 'react';
import type { FC } from 'react';
import { EventType, IncrementalSource } from 'rrweb';
import { ActivityTimestamp } from 'components/sites/activity-timestamp';
import type { Event } from 'types/event';
import type { Recording } from 'types/recording';

interface Props {
  recording: Recording;
}

export const SidebarActivity: FC<Props> = ({ recording }) => {
  // Exlcude things that don't appear in the sidebar
  const events: Event[] = JSON.parse(recording.events || '[]');

  const activity = events.filter(item => {
    if (item.type === EventType.Meta) return true;

    return item.type === EventType.IncrementalSnapshot && [
      IncrementalSource.Scroll, 
      IncrementalSource.MouseInteraction
    ].includes(item.data.source);
  });

  const startedAt = activity[0]?.timestamp || 0;

  const getPathName = (url: string) => new URL(url).pathname;

  return (
    <ul className='datarow'>
      {activity.map((item, index) => (
        <li className='icon' key={`${item.timestamp}_${index}`}>
          {item.type === EventType.Meta && (
            <>
              <i className='ri-compass-discover-line' />
              <p className='title'>
                Page view <ActivityTimestamp timestamp={item.timestamp} offset={startedAt} />
              </p>
              <p className='info'>{getPathName(item.data.href)}</p>
            </>
          )}

          {item.type === EventType.IncrementalSnapshot && item.data.source === IncrementalSource.Scroll && (
            <>
              <i className='ri-mouse-line' />
              <p className='title'>
                Scrolled <ActivityTimestamp timestamp={item.timestamp} offset={startedAt} />
              </p>
            </>
          )}

          {item.type === EventType.IncrementalSnapshot && item.data.source === IncrementalSource.MouseInteraction && (
            <>
              <i className='ri-cursor-line' />
              <p className='title'>
                Clicked <ActivityTimestamp timestamp={item.timestamp} offset={startedAt} />
              </p>
              <p className='info'>TODO</p>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};
