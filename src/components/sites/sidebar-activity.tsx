import React from 'react';
import type { FC } from 'react';
import { ActivityTimestamp } from 'components/sites/activity-timestamp';
import type { Recording } from 'types/recording';

interface Props {
  recording: Recording;
  setProgress: (seconds: number) => void;
}

export const SidebarActivity: FC<Props> = ({ recording, setProgress }) => {
  const activity = recording
    .events
    .filter(item => !['snapshot', 'cursor'].includes(item.type))
    .sort((a, b) => Number(a.timestamp) - Number(b.timestamp));

  const startedAt = activity[0]?.timestamp || 0;

  return (
    <ul className='datarow'>
      {activity.map(item => (
        <li className='icon' key={item.eventId}>
          {item.type === 'pageview' && (
            <>
              <i className='ri-compass-discover-line' />
              <p className='title'>
                Page view <ActivityTimestamp event={item} offset={startedAt} setProgress={setProgress} />
              </p>
              <p className='info'>{item.path}</p>
            </>
          )}

          {item.type === 'hover' && (
            <>
              <i className='ri-mouse-line' />
              <p className='title'>
                Hover <ActivityTimestamp event={item} offset={startedAt} setProgress={setProgress} />
              </p>
              <p className='info'>{item.selector}</p>
            </>
          )}

          {item.type === 'scroll' && (
            <>
              <i className='ri-mouse-line' />
              <p className='title'>
                Scrolled <ActivityTimestamp event={item} offset={startedAt} setProgress={setProgress} />
              </p>
            </>
          )}

          {item.type === 'click' && (
            <>
              <i className='ri-cursor-line' />
              <p className='title'>
                Clicked <ActivityTimestamp event={item} offset={startedAt} setProgress={setProgress} />
              </p>
              <p className='info'>{item.selector}</p>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};
