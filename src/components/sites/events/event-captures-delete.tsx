import React from 'react';
import type { FC } from 'react';
import { Button } from 'components/button';
import { Icon } from 'components/icon';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { useToasts } from 'hooks/use-toasts';
import { eventsCaptureDeleteBulk } from 'lib/api/graphql';
import { EventsType } from 'types/graphql';
import type { EventSelected } from 'types/events';

interface Props {
  siteId: string;
  selected: EventSelected[];
  onCompleted: VoidFunction;
  onClose: VoidFunction;
}

export const EventCapturesDelete: FC<Props> = ({ selected, siteId, onCompleted, onClose }) => {
  const ref = React.useRef<Modal>();
  const toasts = useToasts();

  const openModal = () => {
    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  const deleteEvents = async () => {
    try {
      onCompleted();

      await eventsCaptureDeleteBulk({
        siteId,
        eventIds: selected.filter(s => s.type === EventsType.Capture).map(s => s.id),
      });

      closeModal();

      toasts.add({ type: 'success', body: 'Events deleted successfully' });
    } catch {
      toasts.add({ type: 'error', body: 'There was an issue deleting the events' });
    }
  };

  return (
    <>
      <Button className='link' onClick={openModal}>Delete events</Button>

      <Modal ref={ref} onClose={onClose}>
        <ModalBody aria-labelledby='delete-event-captures-title' aria-describedby='delete-event-captures-description'>
          <ModalHeader>
            <p id='delete-event-captures-title'><b>Delete Events</b></p>
            <Button type='button' onClick={closeModal}>
              <Icon name='close-line' />
            </Button>
          </ModalHeader>
          <ModalContents>
            <p id='delete-event-captures-description'>Are you sure you wish to permanently delete all {selected.length} events?</p>
          </ModalContents>
          <ModalFooter>
            <Button type='button' className='tertiary' onClick={deleteEvents}>
              Delete Events
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
