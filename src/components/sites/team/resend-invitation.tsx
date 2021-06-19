import React from 'react';
import type { FC } from 'react';
import { Button } from '../../button';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from '../../modal';
import { teamInviteResend } from '../../../lib/api/graphql';
import { useToasts } from '../../../hooks/toasts';
import type { Site } from '../../../types/site';
import type { Team } from '../../../types/team';

interface Props {
  site: Site;
  team: Team;
}

export const ResendInvitation: FC<Props> = ({ site, team }) => {
  const toast = useToasts();
  const ref = React.useRef<Modal>();

  const openModal = () => {
    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  const resendInvitation = async () => {
    const { error } = await teamInviteResend({ siteId: site.id, teamId: team.id });

    if (error) {
      toast.add({ type: 'error', body: 'There was an unexpected error when sending your invitation. Please try again.' });
    } else {
      toast.add({ type: 'success', body: 'Invitation resent' });
      closeModal();
    }
  };

  return (
    <>
      <Button className='positive' onClick={openModal}>Resend Invitation</Button>

      <Modal ref={ref}>
        <ModalBody>
          <ModalHeader>
            <p><b>Resend Invitation</b></p>
            <Button type='button' onClick={openModal}>
              <i className='ri-close-line' />
            </Button>
          </ModalHeader>
          <ModalContents>
            <p>Are you sure you wish to resend the invitation to {team.user.email}?</p>
          </ModalContents>
          <ModalFooter>
            <Button type='button' className='secondary' onClick={resendInvitation}>
              Yes, Resend Invite
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
