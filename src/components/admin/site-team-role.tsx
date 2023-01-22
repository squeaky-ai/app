import React from 'react';
import type { FC } from 'react';
import { Select, Option } from 'components/select';
import { Button } from 'components/button';
import { Icon } from 'components/icon';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { ADMIN, MEMBER, OWNER, READ_ONLY } from 'data/teams/constants';
import { useToasts } from 'hooks/use-toasts';
import type { Team } from 'types/graphql';
import { adminSiteTeamUpdateRole } from 'lib/api/graphql';

interface Props {
  team: Team;
}

const roleNames: { [key: number]: string } = {
  [READ_ONLY]: 'a Read-only user',
  [MEMBER]: 'a User',
  [ADMIN]: 'an Admin',
  [OWNER]: 'the Owner',
};

export const SiteTeamRole: FC<Props> = ({ team }) => {
  const toast = useToasts();
  const ref = React.useRef<Modal>();
  const [role, setRole] = React.useState(team.role);

  const openModal = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (ref.current) {
      ref.current.show();
      setRole(Number(event.target.value));
    }
  };

  const closeModal = () => {
    if (ref.current) {
      ref.current.hide();
      setRole(team.role);
    }
  };

  const changeRole = async () => {
    try {
      await adminSiteTeamUpdateRole({ id: team.id, role });
      if (ref.current) ref.current.hide();
      toast.add({ type: 'success', body: 'Role change complete' });
    } catch(error) {
      console.error(error);
      toast.add({ type: 'error', body: 'There was an error when changing the user role. Please try again.' });   
    }
  };

  return (
    <>
      <Select name='role' onChange={openModal} value={team.role}>
        <Option value={READ_ONLY}>Read-only</Option>
        <Option value={MEMBER}>User</Option>
        <Option value={ADMIN}>Admin</Option>
        <Option value={OWNER}>Owner</Option>
      </Select>

      <Modal ref={ref} className='change-role-modal'>
        <ModalBody aria-labelledby='change-role-title' aria-describedby='change-role-description'>
          <ModalHeader>
            <p id='change-role-title'><b>Change role</b></p>
            <Button type='button' onClick={closeModal}>
              <Icon name='close-line' />
            </Button>
          </ModalHeader>
          <ModalContents>
            <p id='change-role-description'>Are you sure you wish to make {team.user.fullName} {roleNames[role]}?</p>
            <p className='warning-text'>Warning: Do not leave a site without an owner for long, and do not have more than one owner!</p>
          </ModalContents>
          <ModalFooter>
            <Button type='button' className='tertiary' onClick={changeRole}>
              Yes, Change Role
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
