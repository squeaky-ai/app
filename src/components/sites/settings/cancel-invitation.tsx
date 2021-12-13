import React from 'react';
import type { FC } from 'react';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { teamInviteCancel } from 'lib/api/graphql';
import { useToasts } from 'hooks/use-toasts';
import type { Site } from 'types/graphql';
import type { Team } from 'types/graphql';

interface Props {
  site: Site;
  team: Team;
}

export const CancelInvitation: FC<Props> = ({ site, team }) => {
  const toast = useToasts();
  const ref = React.useRef<Modal>();

  const openModal = () => {
    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  const cancelInvitation = async () => {
    try {
      await teamInviteCancel({ siteId: site.id, teamId: team.id });
      toast.add({ type: 'success', body: 'Invitation cancelled' });
      closeModal();
    } catch(error) {
      toast.add({ type: 'error', body: 'There was an unexpected error when cancelling your invitation. Please try again.' });
    }
  };

  return (
    <>
      <Button className='negative' onClick={openModal}>Cancel Invitation</Button>

      <Modal ref={ref}>
        <ModalBody aria-labelledby='cancel-invitation-title' aria-describedby='cancel-invitation-description'>
          <ModalHeader>
            <p id='cancel-invitation-title'><b>Cancel Invitation</b></p>
            <Button type='button' onClick={closeModal}>
              <Icon name='close-line' />
            </Button>
          </ModalHeader>
          <ModalContents>
            <p id='cancel-invitation-description'>Are you sure you wish to cancel the invitation for {team.user.email}?</p>
          </ModalContents>
          <ModalFooter>
            <Button type='button' className='tertiary' onClick={cancelInvitation}>
              Yes, Cancel Invite
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
