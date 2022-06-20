import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { Icon } from 'components/icon';
import { Dropdown } from 'components/dropdown';
import { Row, Cell } from 'components/table';
import { Checkbox } from 'components/checkbox';
import { Spinner } from 'components/spinner';
import { EventTag } from 'components/sites/events/event-tag';
import { EventCapturesEdit } from 'components/sites/events/event-captures-edit';
import { EventCaptureDelete } from 'components/sites/events/event-capture-delete';
import { EventsType } from 'types/graphql';
import type { EventSelected } from 'types/events';
import type { Site, EventsCaptureItem } from 'types/graphql';

interface Props {
  site: Site;
  event: EventsCaptureItem;
  selected: EventSelected[];
  setSelected: (selected: EventSelected[]) => void;
}

export const EventCapturesItem: FC<Props> = ({ 
  site,
  event, 
  selected,
  setSelected,
}) => {
  const rowActionsRef = React.useRef<Dropdown>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.checked
      ? setSelected([...selected, { id: event.id, type: EventsType.Capture }])
      : setSelected(selected.filter(s => s.id !== event.id ));
  };

  const onRowActionClose = () => {
    if (rowActionsRef.current) rowActionsRef.current.close();
  };

  return (
    <Row className='event-captures-row'>
      <Cell>
        <Checkbox 
          checked={selected.map(s => s.id).includes(event.id)}
          onChange={handleChange}
        />
      </Cell>
      <Cell>
        <Link href={`/sites/${site.id}/events/history?captureId=${event.id}`}>
          <a>{event.name}</a>
        </Link>
      </Cell>
      <Cell>
        <EventTag type={event.type} />
      </Cell>
      <Cell>
        {event.groupNames.length 
          ? event.groupNames.join(', ')
          : '-'
        }
      </Cell>
      <Cell>
        {event.lastCountedAt
          ? event.count
          : <Spinner />
        }
      </Cell>
      <Cell>
        <Dropdown portal button={<Icon name='more-2-fill' />} buttonClassName='options' ref={rowActionsRef}>
          <EventCapturesEdit
            site={site} 
            event={event}
            onClose={onRowActionClose}
          />
          <EventCaptureDelete 
            site={site} 
            eventId={event.id}
            onClose={onRowActionClose}
          />
        </Dropdown>
      </Cell>
    </Row>
  );
};
