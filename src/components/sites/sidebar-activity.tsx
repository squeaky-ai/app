import React from 'react';
import type { FC } from 'react';
import type { Recording } from 'types/recording';

interface Props {
  recording: Recording;
}

export const SidebarActivity: FC<Props> = ({ recording }) => {
  const activity = recording
    .events
    .filter(item => !['snapshot', 'cursor'].includes(item.type))
    .sort((a, b) => a.time - b.time);

  const timeString = (ms: number) => {
    const date = new Date(0);
    date.setSeconds(ms / 1000);
    return date.toISOString().substr(14, 5);
  };

  return (
    <ul className='datarow'>
      {activity.map(item => (
        <li className='icon' key={item.eventId}>
          {item.type === 'pageview' && (
            <>
              <i className='ri-compass-discover-line' />
              <p className='title'>
                Page view <span>{timeString(item.time)}</span>
              </p>
              <p className='info'>{item.path}</p>
            </>
          )}

          {item.type === 'hover' && (
            <>
              <i className='ri-mouse-line' />
              <p className='title'>
                Hover <span>{timeString(item.time)}</span>
              </p>
              <p className='info'>{item.selector}</p>
            </>
          )}

          {item.type === 'scroll' && (
            <>
              <i className='ri-mouse-line' />
              <p className='title'>
                Scrolled <span>{timeString(item.time)}</span>
              </p>
            </>
          )}

          {item.type === 'click' && (
            <>
              <i className='ri-cursor-line' />
              <p className='title'>
                Clicked <span>{timeString(item.time)}</span>
              </p>
              <p className='info'>{item.selector}</p>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};
