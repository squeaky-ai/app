import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Icon } from 'components/icon';
import { Label } from 'components/label';
import { Dropdown } from 'components/dropdown';
import { Button } from 'components/button';
import { EventHistoryAddGroups } from 'components/sites/events/event-history-add-groups';
import { EventHistoryAddCaptures } from 'components/sites/events/event-history-add-captures';
import { EventsHistoryType } from 'types/graphql';
import type { EventsHistoryStat } from 'types/graphql';

interface Props {
  eventHistoryStats: EventsHistoryStat[];
  setGroupIds: (ids: string[]) => void;
  setCaptureIds: (ids: string[]) => void;
}

export const EventHistoryAdd: FC<Props> = ({ eventHistoryStats, setGroupIds, setCaptureIds }) => {
  const [openFilter, setOpenFilter] = React.useState<EventsHistoryType | null>(null);

  const handleChange = (filter: EventsHistoryType): void => {
    setOpenFilter(openFilter === filter ? null : filter);
  };

  const handleClose = () => {
    setOpenFilter(null);
  };

  const handleUpdate = (type: EventsHistoryType) => (ids: string[]) => {
    type === EventsHistoryType.Capture
      ? setCaptureIds(ids)
      : setGroupIds(ids);
  };

  return (
    <div className='add-events'>
      <div className='menu-item filters'>
        <Dropdown button='+ Add events' buttonClassName='link add-event' dropdown-menu='down'>
          <Button onClick={() => handleChange(EventsHistoryType.Capture)} className={classnames({ open: openFilter === EventsHistoryType.Capture })}>
            <Icon name='arrow-drop-left-line' />
            Event
          </Button>
          <Button onClick={() => handleChange(EventsHistoryType.Group)} className={classnames({ open: openFilter === EventsHistoryType.Group })}>
            <Icon name='arrow-drop-left-line' />
            Event Group
          </Button>

          <div className={classnames('popout filters', { open: openFilter !== null })}>
            {openFilter === EventsHistoryType.Capture && (
              <>
                <Label>Event</Label>
                <EventHistoryAddCaptures
                  eventHistoryStats={eventHistoryStats}
                  onClose={handleClose}
                  onUpdate={handleUpdate(EventsHistoryType.Capture)}
                />
              </>
            )}
            {openFilter === EventsHistoryType.Group && (
              <>
                <Label>Event Group</Label>
                <EventHistoryAddGroups
                  eventHistoryStats={eventHistoryStats}
                  onClose={handleClose}
                  onUpdate={handleUpdate(EventsHistoryType.Group)}
                />
              </>
            )}
          </div>
        </Dropdown>
      </div>
    </div>
  );
};
