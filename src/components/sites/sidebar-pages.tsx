import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { EventType } from 'rrweb';
import { groupBy } from 'lodash';
import { Button } from 'components/button';
import { usePlayerState } from 'hooks/player-state';
import { toTimeString } from 'lib/dates';
import type { Event } from 'types/event';
import type { Recording } from 'types/recording';

interface Props {
  recording: Recording;
}

export const SidebarPages: FC<Props> = ({ recording }) => {
  const [open, setOpen] = React.useState<string>(null);
  const [_, dispatch] = usePlayerState();
  
  const events: Event[] = JSON.parse(recording.events || '[]');
  const pageviews = events.filter(event => event.type === EventType.Meta);

  const offset = pageviews[0]?.timestamp || 0;

  const groups = groupBy(pageviews, 'data.href');

  const handleOpen = (path: string) => {
    open === path
      ? setOpen(null)
      : setOpen(path);
  };

  const getPathName = (url: string) => new URL(url).pathname;

  const timeString = (timestamp: number) => toTimeString(timestamp - offset);

  const nextPageView = (event: Event) => {
    const index = pageviews.findIndex(e => e.id === event.id);
    return pageviews[index + 1] || null;
  };

  const timeToNextPageView = (event: Event) => {
    const nextEvent = nextPageView(event);
    return timeString(nextEvent?.timestamp || event.timestamp);
  };

  const setProgress = (event: Event) => {
    const timestamp = event.timestamp - offset;
    dispatch({ type: 'progress', value: timestamp / 1000 });
  };

  const setNextProgress = (event: Event) => {
    const nextEvent = nextPageView(event) || event;
    const timestamp = nextEvent.timestamp - offset;

    dispatch({ type: 'progress', value: timestamp / 1000 });
  };

  return (
    <ul className='datarow pages'>
      {Object.entries(groups).map(([url, events]) => {
        const path = getPathName(url);

        return (
          <li key={path} className={classnames({ open: path === open })}>
            <div className='title' onClick={() => handleOpen(path)}>
              <span className='path'>{path}</span>
              <span className='count'>{events.length}</span>
            </div>
            <div className='timestamps'>
              {events.map(event => (
                <div key={event.id} className='event'>
                  <Button onClick={() => setProgress(event)}>
                    {timeString(event.timestamp)}
                  </Button>
                  <i className='ri-arrow-right-line' />
                  <Button onClick={() => setNextProgress(event)}>
                    {timeToNextPageView(event)}
                  </Button>
                </div>
              ))}
            </div>
          </li>
        )
      })}
    </ul>
  );
};
