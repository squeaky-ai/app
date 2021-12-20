import React from 'react';
import type { FC } from 'react';
import type { Replayer } from 'rrweb';
import classnames from 'classnames';
import { groupBy, sortBy } from 'lodash';
import { Icon } from 'components/icon';
import { ActivityTimestamp } from 'components/sites/player/activity-timestamp';
import type { Page, Recording } from 'types/graphql';

interface Props {
  replayer: Replayer;
  recording: Recording;
}

export const SidebarPages: FC<Props> = ({ recording, replayer }) => {
  const [open, setOpen] = React.useState<string[]>([]);

  const pages = sortBy(recording.pages, page => page.enteredAt);
  const offset = pages[0]?.enteredAt || 0;
  const groups = groupBy(pages, (page: Page) => page.url);

  const handleOpen = (path: string) => {
    open.includes(path)
      ? setOpen(open.filter(o => o !== path))
      : setOpen([...open, path]);
  };

  return (
    <ul className='datarow pages'>
      {Object.entries(groups).map(([path, pages]) => (
        <li key={path} className={classnames({ open: open.includes(path) })}>
          <div className='title' onClick={() => handleOpen(path)}>
            <span className='path'>{path}</span>
            <span className='count'>{pages.length}</span>
          </div>
          <div className='timestamps'>
            {pages.map(page => (
              <div key={page.id} className='event'>
                <ActivityTimestamp offset={offset} timestamp={page.enteredAt} replayer={replayer} />
                <Icon name='arrow-right-line' />
                <ActivityTimestamp offset={offset} timestamp={page.exitedAt} replayer={replayer} />
              </div>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
};
