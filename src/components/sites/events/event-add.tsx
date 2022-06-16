import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Icon } from 'components/icon';
import { Label } from 'components/label';
import { Dropdown } from 'components/dropdown';
import { Button } from 'components/button';
import { EventAddGroups } from 'components/sites/events/event-add-groups';
import { EventAddCaptures } from 'components/sites/events/event-add-captures';
import { EventsType } from 'types/graphql';
import type { EventsStat } from 'types/graphql';

interface Props {
  eventStats: EventsStat[];
  setGroupIds: (ids: string[]) => void;
  setCaptureIds: (ids: string[]) => void;
}

export const EventAdd: FC<Props> = ({ eventStats, setGroupIds, setCaptureIds }) => {
  const [openFilter, setOpenFilter] = React.useState<EventsType | null>(null);

  const handleChange = (filter: EventsType): void => {
    setOpenFilter(openFilter === filter ? null : filter);
  };

  const handleClose = () => {
    setOpenFilter(null);
  };

  const handleUpdate = (type: EventsType) => (ids: string[]) => {
    type === EventsType.Capture
      ? setCaptureIds(ids)
      : setGroupIds(ids);
  };

  return (
    <div className='add-events'>
      <div className='menu-item filters'>
        <Dropdown button='+ Add events' buttonClassName='link add-event' dropdown-menu='down'>
          <Button onClick={() => handleChange(EventsType.Capture)} className={classnames({ open: openFilter === EventsType.Capture })}>
            <Icon name='arrow-drop-left-line' />
            Event
          </Button>
          <Button onClick={() => handleChange(EventsType.Group)} className={classnames({ open: openFilter === EventsType.Group })}>
            <Icon name='arrow-drop-left-line' />
            Event Group
          </Button>

          <div className={classnames('popout filters', { open: openFilter !== null })}>
            {openFilter === EventsType.Capture && (
              <>
                <Label>Event</Label>
                <EventAddCaptures
                  eventStats={eventStats}
                  onClose={handleClose}
                  onUpdate={handleUpdate(EventsType.Capture)}
                />
              </>
            )}
            {openFilter === EventsType.Group && (
              <>
                <Label>Event Group</Label>
                <EventAddGroups
                  eventStats={eventStats}
                  onClose={handleClose}
                  onUpdate={handleUpdate(EventsType.Group)}
                />
              </>
            )}
          </div>
        </Dropdown>
      </div>
    </div>
  );
};
