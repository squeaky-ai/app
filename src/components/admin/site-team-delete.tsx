import React from 'react';
import type { FC } from 'react';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { useToasts } from 'hooks/use-toasts';
import { OWNER } from 'data/teams/constants';
import type { Team } from 'types/graphql';
import { adminSiteTeamDelete } from 'lib/api/graphql';

interface Props {
  team: Team;
  onClose?: VoidFunction;
}

export const SiteTeamDelete: FC<Props> = ({ team, onClose }) => {
  const toast = useToasts();
  const ref = React.useRef<Modal>();

  const openModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  const handleDelete = async () => {
    try {
      await adminSiteTeamDelete({ id: team.id });
      closeModal();
      toast.add({ type: 'success', body: 'Team member removed' });
    } catch(error) {
      console.error(error);
      toast.add({ type: 'error', body: 'There was an error removing the team member. Please try again.' });   
    }
  };

  return (
    <>
      <Button type='button' className='tertiary link delete-team' onClick={openModal} disabled={team.role === OWNER}>
        Remove
      </Button>

      <Modal ref={ref} className='sm' onClose={onClose}>
        <ModalBody aria-labelledby='delete-team-title' aria-describedby='delete-team-description'>
          <ModalHeader>
            <p id='delete-team-title'><b>Delete Team</b></p>
            <Button type='button' onClick={closeModal}>
              <Icon name='close-line' />
            </Button>
          </ModalHeader>
          <ModalContents>
            <p id='delete-team-description'>Are you sure you want to remove this team member?</p>
            <p>Their user account will not be deleted.</p>
          </ModalContents>
          <ModalFooter>
            <Button type='button' onClick={handleDelete} className='tertiary'>
              Remove 
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
