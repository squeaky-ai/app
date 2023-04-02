import React from 'react';
import type { FC } from 'react';
import type { Replayer } from 'rrweb';
import classnames from 'classnames';
import { groupBy, sortBy } from 'lodash';
import { Icon } from 'components/icon';
import { EventTimestamp } from 'components/sites/player/event-timestamp';
import type { Page, Recording } from 'types/graphql';

interface Props {
  replayer: Replayer;
  recording: Recording;
}

export const SidebarPages: FC<Props> = ({ recording, replayer }) => {
  const [open, setOpen] = React.useState<string[]>([]);

  const pages = sortBy(recording.pages, page => new Date(page.enteredAt.iso8601).valueOf());
  const offset = new Date(pages[0]?.enteredAt.iso8601).valueOf() || 0;
  const groups = groupBy(pages, (page: Page) => page.url);

  const handleOpen = (path: string) => {
    open.includes(path)
      ? setOpen(open.filter(o => o !== path))
      : setOpen([...open, path]);
  };

  return (
    <>
      <h5>Pages</h5>
      <ul className='datarow pages'>
        {Object.entries(groups).map(([path, pages]) => (
          <li key={path} className={classnames({ open: open.includes(path) })}>
            <div className='title' onClick={() => handleOpen(path)}>
              <span className='path'>{path}</span>
              <span className='count'>{pages.length}</span>
              <Icon name='arrow-drop-down-line' />
            </div>
            <div className='timestamps'>
              {pages.map(page => (
                <div key={page.id} className='event'>
                  <EventTimestamp offset={offset} timestamp={new Date(page.enteredAt.iso8601).valueOf()} replayer={replayer} />
                  <Icon name='arrow-right-line' />
                  <EventTimestamp offset={offset} timestamp={new Date(page.exitedAt.iso8601).valueOf()} replayer={replayer} />
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
