import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { EventType } from 'rrweb';
import { groupBy } from 'lodash';
import { ActivityTimestamp } from 'components/sites/activity-timestamp';
import type { Event } from 'types/event';
import type { Recording } from 'types/recording';

interface Props {
  recording: Recording;
}

export const SidebarPages: FC<Props> = ({ recording }) => {
  const [open, setOpen] = React.useState<string[]>([]);
  
  const events: Event[] = JSON.parse(recording.events);
  const pageviews = events.filter(event => event.type === EventType.Meta);

  const offset = pageviews[0]?.timestamp || 0;

  const groups = groupBy(pageviews, 'data.href');

  const handleOpen = (path: string) => {
    open.includes(path)
      ? setOpen(open.filter(o => o !== path))
      : setOpen([...open, path]);
  };

  const getPathName = (url: string) => new URL(url).pathname;

  const nextPageView = (event: Event) => {
    const index = pageviews.findIndex(e => e.id === event.id);
    return pageviews[index + 1] || null;
  };

  const timeToNextPageView = (event: Event) => {
    const nextEvent = nextPageView(event);
    return nextEvent?.timestamp || event.timestamp;
  };

  return (
    <ul className='datarow pages'>
      {Object.entries(groups).map(([url, events]) => {
        const path = getPathName(url);

        return (
          <li key={path} className={classnames({ open: open.includes(path) })}>
            <div className='title' onClick={() => handleOpen(path)}>
              <span className='path'>{path}</span>
              <span className='count'>{events.length}</span>
            </div>
            <div className='timestamps'>
              {events.map(event => (
                <div key={event.id} className='event'>
                  <ActivityTimestamp offset={offset} timestamp={event.timestamp} />
                  <i className='ri-arrow-right-line' />
                  <ActivityTimestamp offset={offset} timestamp={timeToNextPageView(event)} />
                </div>
              ))}
            </div>
          </li>
        )
      })}
    </ul>
  );
};
