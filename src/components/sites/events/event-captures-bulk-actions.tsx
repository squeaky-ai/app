import React from 'react';
import type { FC } from 'react';
import { Icon } from 'components/icon';
import { Dropdown } from 'components/dropdown';
import { Tooltip } from 'components/tooltip';
import { EventCompare } from 'components/sites/events/event-compare';
import { EventCapturesDelete } from 'components/sites/events/event-captures-delete';
import { EventAddToGroup } from 'components/sites/events/event-add-to-group';
import type { EventSelected } from 'types/events';
import type { Site, Team } from 'types/graphql';

interface Props {
  site: Site;
  member?: Team;
  selected: EventSelected[];
  setSelected: (selected: EventSelected[]) => void;
}

export const EventCapturesBulkActions: FC<Props> = ({ site, member, selected, setSelected }) => {
  const bulkActionsRef = React.useRef<Dropdown>();

  const onCompleted = () => {
    setSelected([]);
    onBulkActionClose();
  };

  const onBulkActionClose = () => {
    if (bulkActionsRef.current) bulkActionsRef.current.close();
  };

  return (
    <div className='bulk-actions'>
      {selected.length === 0 && (
        <Tooltip className='dropdown' portalClassName='bulk-action-hint' button={<><Icon name='checkbox-multiple-line' /> Bulk Actions <Icon className='arrow' name='arrow-drop-down-line' /></>}>
          Please select multiple rows to use bulk actions
        </Tooltip>
      )}

      {selected.length > 0 && (
        <Dropdown ref={bulkActionsRef} direction='down' button={<><Icon name='checkbox-multiple-line' /> Bulk Actions</>}>
          <EventCompare
            site={site}
            selected={selected}
            onCompleted={onCompleted} 
          />
          <EventAddToGroup 
            onClose={onBulkActionClose} 
            site={site}
            member={member}
            selected={selected} 
            onCompleted={onCompleted}
          />
          <EventCapturesDelete 
            onClose={onBulkActionClose} 
            siteId={site.id} 
            member={member}
            selected={selected} 
            onCompleted={onCompleted} 
          />
        </Dropdown>
      )}
    </div>
  );
};
