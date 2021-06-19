import React from 'react';
import type { FC } from 'react';
import { Button } from '../../button';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from '../../modal';
import { teamDelete } from '../../../lib/api/graphql';
import { useToasts } from '../../../hooks/toasts';
import type { Site } from '../../../types/site';
import type { Team } from '../../../types/team';

interface Props {
  site: Site;
  team: Team;
}

export const DeleteTeam: FC<Props> = ({ site, team }) => {
  const toast = useToasts();
  const ref = React.useRef<Modal>();

  const openModal = () => {
    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  const deleteTeam = async () => {
    const { error } = await teamDelete({ siteId: site.id, teamId: team.id });

    if (error) {
      toast.add({ type: 'error', body: 'There was an unexpected error when removing your user. Please try again.' });
    } else {
      toast.add({ type: 'success', body: 'User removed successfully' });
      closeModal();
    }
  };

  return (
    <>
      <Button className='negative' onClick={openModal}>Remove</Button>

      <Modal ref={ref}>
        <ModalBody>
          <ModalHeader>
            <p><b>Remove User</b></p>
            <Button type='button' onClick={openModal}>
              <i className='ri-close-line' />
            </Button>
          </ModalHeader>
          <ModalContents>
            <p>Are you sure you wish to remove {team.user.fullName} from your site?</p>
            <p>If {team.user.firstName} has created any video notes or other similar content it will be relabeled as ‘Removed User’.</p>
          </ModalContents>
          <ModalFooter>
            <Button type='button' className='tertiary' onClick={deleteTeam}>
              Yes, Remove User
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
