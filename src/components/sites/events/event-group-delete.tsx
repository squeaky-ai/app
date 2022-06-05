import React from 'react';
import type { FC } from 'react';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { Button } from 'components/button';
import { Icon } from 'components/icon';
import { Checkbox } from 'components/checkbox';
import { Preferences, Preference } from 'lib/preferences';
import { useToasts } from 'hooks/use-toasts';
import { eventsGroupDelete } from 'lib/api/graphql';
import type { EventsGroup, Site } from 'types/graphql';

interface Props {
  site: Site;
  group: EventsGroup;
}

export const EventGroupDelete: FC<Props> = ({ site, group }) => {
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

  const deleteEventGroup = async () => {
    try {
      await eventsGroupDelete({ 
        siteId: site.id,
        groupId: group.id,
      });

      if (skipDeleteModal) {
        Preferences.setBoolean(Preference.EVENTS_GROUP_DELETED_SKIP_PROMPT, true);
      }

      closeModal();
      toasts.add({ type: 'success', body: 'Group deleted' });
    } catch {
      toasts.add({ type: 'error', body: 'There was an error deleteing your group. Please try again.' });
    }
  };

  const handleDeleteClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const skipModal = Preferences.getBoolean(Preference.EVENTS_GROUP_DELETED_SKIP_PROMPT);

    if (skipModal) {
      await deleteEventGroup();
    } else {
      openModal(event);
    }
  };

  return (
    <>
      <Button className='group-delete' onClick={handleDeleteClick}>
        <Icon name='delete-bin-line' />
        Delete group
      </Button>

      <Modal ref={ref}>
        <ModalBody aria-labelledby='delete-event-group-title' aria-describedby='delete-event-group-description'>
          <ModalHeader>
            <p id='delete-event-group-title'><b>Delete Group</b></p>
            <Button type='button' onClick={closeModal}>
              <Icon name='close-line' />
            </Button>
          </ModalHeader>
          <ModalContents>
            <p id='delete-event-group-description'>Are you sure you wish to delete &apos;<b>{group.name}</b>&apos; event group?</p>
            <p>All your events will still be available in the events table and under any other group they are currently assigned to, they will just no longer be grouped under the name &apos;<b>{group.name}</b>&apos;.</p>
            <Checkbox checked={skipDeleteModal} onChange={() => setSkipDeleteModal(!skipDeleteModal)}>
              Don&apos;t show message again
            </Checkbox>
          </ModalContents>
          <ModalFooter>
            <Button type='button' className='tertiary' onClick={deleteEventGroup}>
              Yes, Delete Group
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
