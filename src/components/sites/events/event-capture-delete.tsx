import React from 'react';
import type { FC } from 'react';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { Checkbox } from 'components/checkbox';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { Preferences, Preference } from 'lib/preferences';
import { useToasts } from 'hooks/use-toasts';
import { eventsCaptureDelete } from 'lib/api/graphql';
import { MEMBER, READ_ONLY } from 'data/teams/constants';
import type { Site, Team } from 'types/graphql';

interface Props {
  site: Site;
  member: Team;
  eventId: string;
  onClose?: VoidFunction;
}

export const EventCaptureDelete: FC<Props> = ({ site, member, eventId, onClose }) => {
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

  const deleteEventCapture = async () => {
    try {
      await eventsCaptureDelete({ 
        siteId: site.id,
        eventId,
      });

      if (skipDeleteModal) {
        Preferences.setBoolean(Preference.EVENTS_CAPTURE_DELETED_SKIP_PROMPT, true);
      }

      closeModal();
      toasts.add({ type: 'success', body: 'Event deleted' });
    } catch {
      toasts.add({ type: 'error', body: 'There was an error deleteing your event. Please try again.' });
    }
  };

  const handleDeleteClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const skipModal = Preferences.getBoolean(Preference.EVENTS_CAPTURE_DELETED_SKIP_PROMPT);

    if (skipModal) {
      await deleteEventCapture();
    } else {
      openModal(event);
    }
  };

  return (
    <>
      <Button onClick={handleDeleteClick} unauthorized={[MEMBER, READ_ONLY].includes(member.role)}>
        <Icon name='delete-bin-line' /> Delete
      </Button>
            
      <Modal ref={ref} onClose={onClose}>
        <ModalBody aria-labelledby='delete-event-capture-title' aria-describedby='delete-event-capture-description'>
          <ModalHeader>
            <p id='delete-event-capture-title'><b>Delete Event</b></p>
            <Button type='button' onClick={closeModal}>
              <Icon name='close-line' />
            </Button>
          </ModalHeader>
          <ModalContents>
            <p id='delete-event-capture-description'>Are you sure you wish to delete this event?</p>
            <Checkbox checked={skipDeleteModal} onChange={() => setSkipDeleteModal(!skipDeleteModal)}>
              Don&apos;t show message again
            </Checkbox>
          </ModalContents>
          <ModalFooter>
            <Button type='button' className='tertiary' onClick={deleteEventCapture}>
              Delete Event
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
