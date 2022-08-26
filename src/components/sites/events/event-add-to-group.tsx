import React from 'react';
import type { FC } from 'react';
import { Button } from 'components/button';
import { Icon } from 'components/icon';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { Label } from 'components/label';
import { EventGroupsSelector } from 'components/sites/events/event-groups-selector';
import { useToasts } from 'hooks/use-toasts';
import { eventsAddToGroup } from 'lib/api/graphql';
import { MEMBER, READ_ONLY } from 'data/teams/constants';
import { EventsType, Team } from 'types/graphql';
import type { EventSelected } from 'types/events';
import type { Site } from 'types/graphql';

interface Props {
  site: Site;
  member: Team;
  selected: EventSelected[];
  onCompleted: VoidFunction;
  onClose: VoidFunction;
}

export const EventAddToGroup: FC<Props> = ({ site, member, selected, onClose, onCompleted }) => {
  const ref = React.useRef<Modal>();
  const toasts = useToasts();

  const [groupIds, setGroupsIds] = React.useState<string[]>([]);

  const openModal = () => {
    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  const addEventsToGroup = async () => {
    try {
      onCompleted();

      await eventsAddToGroup({
        siteId: site.id,
        eventIds: selected.filter(s => s.type === EventsType.Capture).map(s => s.id),
        groupIds,
      });

      closeModal();

      toasts.add({ type: 'success', body: 'Events added to group successfully' });
    } catch {
      toasts.add({ type: 'error', body: 'There was an issue adding the events' });
    }
  };

  return (
    <>
      <Button className='link' onClick={openModal} unauthorized={[MEMBER, READ_ONLY].includes(member.role)}>
        Add to group
      </Button>

      <Modal ref={ref} onClose={onClose}>
        <ModalBody aria-labelledby='add-to-group-captures-title' aria-describedby='add-to-group-captures-description'>
          <ModalHeader>
            <p id='add-to-group-captures-title'><b>Add to group</b></p>
            <Button type='button' onClick={closeModal}>
              <Icon name='close-line' />
            </Button>
          </ModalHeader>
          <ModalContents>
            <p id='add-to-group-captures-description'>To add your selected event(s) to a group, please create or select a group using the input below:</p>
            <Label>Group(s)</Label>
            <EventGroupsSelector
              site={site}
              ids={groupIds}
              onChange={setGroupsIds} 
            />
          </ModalContents>
          <ModalFooter>
            <Button type='button' className='primary' onClick={addEventsToGroup}>
              Add To Groups
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
