import React from 'react';
import type { FC } from 'react';
import { Dropdown } from 'components/dropdown';
import { Tooltip } from 'components/tooltip';
import { RecordingsDelete } from 'components/sites/recordings-delete';
import { RecordingsStatus } from 'components/sites/recrdordings-status';
import type { Site } from 'types/site';

interface Props {
  site: Site;
  selected: string[];
  setSelected: (selected: string[]) => void;
}

export const RecordingsBulkActions: FC<Props> = ({ site, selected, setSelected }) => {
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
        <Tooltip className='dropdown' portalClassName='bulk-action-hint' button={<><i className='ri-checkbox-multiple-line' /> Bulk Actions <i className='arrow ri-arrow-drop-down-line' /></>}>
          Please select multiple rows to use bulk actions
        </Tooltip>
      )}

      {selected.length > 0 && (
        <Dropdown ref={bulkActionsRef} direction='down' button={<><i className='ri-checkbox-multiple-line' /> Bulk Actions</>}>
          <RecordingsStatus onClose={onBulkActionClose} siteId={site.id} recordingIds={selected} onCompleted={onCompleted} />
          <RecordingsDelete onClose={onBulkActionClose} siteId={site.id} recordingIds={selected} onCompleted={onCompleted} />
        </Dropdown>
      )}
    </div>
  );
};
