import React from 'react';
import type { FC } from 'react';
import { Icon } from 'components/icon';
import { Dropdown } from 'components/dropdown';
import { Tooltip } from 'components/tooltip';
import { EventCapturesDelete } from 'components/sites/events/event-captures-delete';
import type { Site } from 'types/graphql';

interface Props {
  site: Site;
  selected: string[];
  setSelected: (selected: string[]) => void;
}

export const EventCapturesBulkActions: FC<Props> = ({ site, selected, setSelected }) => {
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
          <EventCapturesDelete onClose={onBulkActionClose} siteId={site.id} eventIds={selected} onCompleted={onCompleted} />
        </Dropdown>
      )}
    </div>
  );
};
