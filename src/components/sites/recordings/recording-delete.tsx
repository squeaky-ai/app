import React from 'react';
import type { FC } from 'react';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { Checkbox } from 'components/checkbox';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { recordingDelete } from 'lib/api/graphql';
import { Preferences, Preference } from 'lib/preferences';
import { useToasts } from 'hooks/use-toasts';
import { MEMBER, READ_ONLY, SUPER_USER } from 'data/teams/constants';
import type { Site, Team } from 'types/graphql';

interface Props {
  site: Site;
  member?: Team;
  recordingId: string;
  onClose?: VoidFunction;
}

export const RecordingDelete: FC<Props> = ({ site, member, recordingId, onClose }) => {
  const toasts = useToasts();
  const ref = React.useRef<Modal>();
  const [skipDeleteModal, setSkipDeleteModal] = React.useState<boolean>(false);

  const openModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  const deleteRecording = async () => {
    try {
      await recordingDelete({ 
        siteId: site.id,
        recordingId, 
      });

      if (skipDeleteModal) {
        Preferences.setBoolean(Preference.RECORDINGS_DELETED_SKIP_PROMPT, true);
      }

      closeModal();
      toasts.add({ type: 'success', body: 'Recording deleted' });
    } catch {
      toasts.add({ type: 'error', body: 'There was an error deleteing your recording. Please try again.' });
    }
  };

  const handleDeleteClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const skipModal = Preferences.getBoolean(Preference.RECORDINGS_DELETED_SKIP_PROMPT);

    if (skipModal) {
      await deleteRecording();
    } else {
      openModal(event);
    }
  };

  return (
    <>
      <Button onClick={handleDeleteClick} unauthorized={[MEMBER, READ_ONLY, SUPER_USER].includes(member?.role)}>
        <Icon name='delete-bin-line' /> Delete
      </Button>
            
      <Modal ref={ref} onClose={onClose}>
        <ModalBody aria-labelledby='delete-recording-title' aria-describedby='delete-recording-description'>
          <ModalHeader>
            <p id='delete-recording-title'><b>Delete Recording</b></p>
            <Button type='button' onClick={closeModal}>
              <Icon name='close-line' />
            </Button>
          </ModalHeader>
          <ModalContents>
            <p id='delete-recording-description'>Are you sure you wish to delete this recording?</p>
            <Checkbox checked={skipDeleteModal} onChange={() => setSkipDeleteModal(!skipDeleteModal)}>
              Don&apos;t show message again
            </Checkbox>
          </ModalContents>
          <ModalFooter>
            <Button type='button' className='tertiary' onClick={deleteRecording}>
              Delete Recording
            </Button>
            <Button type='button' className='quaternary' onClick={closeModal}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </>
  );
};
