import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { groupBy } from 'lodash';
import { Button } from 'components/button';
import { usePlayerState } from 'hooks/player-state';
import type { Recording } from 'types/recording';
import type { Event } from 'types/event';

interface Props {
  recording: Recording;
}

export const SidebarPages: FC<Props> = ({ recording }) => {
  const [open, setOpen] = React.useState<string>(null);
  const [_, dispatch] = usePlayerState();

  const offset = recording.events[0].timestamp;
  const pageviews = recording.events.filter(event => event.type === 'pageview');
  const groups = groupBy(pageviews, 'path');

  const handleOpen = (path: string) => {
    open === path
      ? setOpen(null)
      : setOpen(path);
  };

  const timeString = (timestamp: number) => {
    const date = new Date(0);
    date.setSeconds((timestamp - offset) / 1000);
    return date.toISOString().substr(14, 5);
  };

  const nextPageView = (event: Event) => {
    const index = pageviews.findIndex(e => e.eventId === event.eventId);
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
      {Object.entries(groups).map(([path, events]) => (
        <li key={path} className={classnames({ open: path === open })}>
          <div className='title' onClick={() => handleOpen(path)}>
            <span className='path'>{path}</span>
            <span className='count'>{events.length}</span>
          </div>
          <div className='timestamps'>
            {events.map(event => (
              <div key={event.eventId} className='event'>
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
      ))}
    </ul>
  );
};
