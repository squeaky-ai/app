import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Button } from 'components/button';
import { Icon } from 'components/icon';
import { EventCompare } from 'components/sites/events/event-compare';
import { EventGroupDelete } from 'components/sites/events/event-group-delete';
import { EventCaptures } from 'components/sites/events/event-captures';
import type { EventSelected } from 'types/events';
import { EventsCaptureSort, EventsGroup, EventsType, Site } from 'types/graphql';

interface Props {
  site: Site;
  group: EventsGroup;
  sort: EventsCaptureSort;
  selected: EventSelected[];
  setSort: (sort: EventsCaptureSort) => void;
  setSelected: (selected: EventSelected[]) => void;
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

  const hasItems = group.items.length > 0;

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
        <EventCompare
          site={site}
          selected={group.items.map(i => ({ id: i.id, type: EventsType.Capture }))}
          buttonText={
            <>
              <Icon name='pie-chart-line' />
              Compare all
            </>
          }
          buttonDisabled={!hasItems}
        />
      </div>

      <div className='items'>
        {!hasItems && (
          <div className='no-items'>
            <Icon name='plant-line' />
            <p>No events in group</p>
          </div>
        )}

        {hasItems && (
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
          )}
      </div>
    </div>
  );
};
