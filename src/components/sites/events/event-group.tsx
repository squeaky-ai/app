import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Button } from 'components/button';
import { Icon } from 'components/icon';
import { EventGroupDelete } from 'components/sites/events/event-group-delete';
import { EventCaptures } from 'components/sites/events/event-captures';
import { EventsCaptureSort, EventsGroup, Site } from 'types/graphql';

interface Props {
  site: Site;
  group: EventsGroup;
  sort: EventsCaptureSort;
  selected: string[];
  setSort: (sort: EventsCaptureSort) => void;
  setSelected: (selected: string[]) => void;
}

export const EventGroup: FC<Props> = ({
  site,
  group,
  sort,
  selected,
  setSort,
  setSelected
}) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const handleToggle = () => setOpen(!open);

  return (
    <div className={classnames('event-group', { open })}>
      <Button className='heading' onClick={handleToggle}>
        <Icon name={open ? 'subtract-line' : 'add-line'} />
        <b>{group.name}</b>
        <span>({group.items.length})</span>
      </Button>

      <div className='actions'>
        <EventGroupDelete
          site={site}
          group={group}
        />
      </div>

      <div className='items'>
        {group.items.length === 0 && (
          <p>No items</p>
        )}

        <EventCaptures
          site={site}
          events={{
            items: group.items,
            pagination: {
              sort,
              total: group.items.length,
              pageSize: group.items.length,
            }
          }}
          page={1}
          sort={sort}
          selected={selected}
          setPage={() => ''}
          setSize={() => ''}
          setSort={setSort}
          setSelected={setSelected}
        />
      </div>
    </div>
  );
};
