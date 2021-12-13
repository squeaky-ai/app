import React from 'react';
import type { FC } from 'react';
import type { Replayer } from 'rrweb';
import type { metaEvent } from 'rrweb/typings/types';
import classnames from 'classnames';
import { EventType } from 'rrweb';
import { groupBy } from 'lodash';
import { Icon } from 'components/icon';
import { ActivityTimestamp } from 'components/sites/player/activity-timestamp';
import type { Event } from 'types/event';
import type { Recording } from 'types/graphql';

interface Props {
  replayer: Replayer;
  recording: Recording;
}

export const SidebarPages: FC<Props> = ({ recording, replayer }) => {
  const [open, setOpen] = React.useState<string[]>([]);

  const events: Event[] = recording.events.items.map(i => JSON.parse(i));
  
  const pageviews = events.filter(event => event.type === EventType.Meta);

  const offset = pageviews[0]?.timestamp || 0;

  const getPathName = (url: string) => new URL(url).pathname;

  const groups = groupBy(pageviews, (event: metaEvent) => getPathName(event.data.href));

  const handleOpen = (path: string) => {
    open.includes(path)
      ? setOpen(open.filter(o => o !== path))
      : setOpen([...open, path]);
  };

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
      {Object.entries(groups).map(([path, events]) => (
        <li key={path} className={classnames({ open: open.includes(path) })}>
          <div className='title' onClick={() => handleOpen(path)}>
            <span className='path'>{path}</span>
            <span className='count'>{events.length}</span>
          </div>
          <div className='timestamps'>
            {(events as Event[]).map(event => (
              <div key={event.id} className='event'>
                <ActivityTimestamp offset={offset} timestamp={event.timestamp} replayer={replayer} />
                <Icon name='arrow-right-line' />
                <ActivityTimestamp offset={offset} timestamp={timeToNextPageView(event)} replayer={replayer} />
              </div>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
};
