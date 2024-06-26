import React from 'react';
import type { FC } from 'react';
import { useRouter } from 'next/router';
import { Icon } from 'components/icon';
import { Select, Option } from 'components/select';
import { OWNER, ADMIN, INVITED, MEMBER, READ_ONLY } from 'data/teams/constants';
import { CancelInvitation } from 'components/sites/settings/cancel-invitation';
import { ResendInvitation } from 'components/sites/settings/resend-invitation';
import { DeleteTeam } from 'components/sites/settings/delete-team';
import { LeaveTeam } from 'components/sites/settings/leave-team';
import { Button } from 'components/button';
import { Checkbox } from 'components/checkbox';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { Row, Cell } from 'components/table';
import { teamUpdateRole, teamUpdate } from 'lib/api/graphql';
import { useToasts } from 'hooks/use-toasts';
import type { User, Team } from 'types/graphql';
import type { Site } from 'types/graphql';

interface Props {
  user: User;
  site: Site;
  team: Team;
}

export const TeamRow: FC<Props> = ({ user, site, team }) => {
  const toast = useToasts();
  const router = useRouter();
  const ref = React.useRef<Modal>();
  const [role, setRole] = React.useState(team.role);

  const self = team.user.id.toString() === user.id;
  const owner = team.role === OWNER;
  const invited = team.status === INVITED;
  const userRole = site.team.find(t => t.user.id.toString() === user.id.toString());

  const roleNames: { [key: number]: string } = {
    [READ_ONLY]: 'a Read-only user',
    [MEMBER]: 'a User',
    [ADMIN]: 'an Admin'
  };

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

  const changeLinkedDataVisibilty = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      await teamUpdate({ siteId: site.id, teamId: team.id, linkedDataVisible: event.target.checked });
    } catch(error) {
      toast.add({ type: 'error', body: 'There was an unexpected error when changing the visibility. Please try again.' });
    }
  };

  const changeRole = async () => {
    try {
      await teamUpdateRole({ siteId: site.id, teamId: team.id, role });
      toast.add({ type: 'success', body: 'Role change complete' });

      // They can no longer view this page as they won't be authenticated
      if (self && [MEMBER, READ_ONLY].includes(role)) {
        await router.push(`/sites/${site.id}/dashboard`);
        return;
      }

      // Calling closeModal() would revert the role change in the UI
      if (ref.current) ref.current.hide();
    } catch(error) {
      toast.add({ type: 'error', body: 'There was an unexpected error when changing the user role. Please try again.' });      
    }
  };

  return (
    <>
      <Row>
        <Cell>
          {invited && <i>Invited</i>}
          {!invited && (
            self
              ? <><b>{team.user.fullName}</b> <i>(you)</i></>
              : <span>{team.user.fullName}</span>
          )}
        </Cell>
        <Cell>
          {team.user.email}
        </Cell>
        <Cell className='role'>
          {owner || userRole.role <= team.role
            ? team.roleName
            : (
                <Select name='role' onChange={openModal} value={role}>
                  <Option value={READ_ONLY}>Read-only</Option>
                  <Option value={MEMBER}>User</Option>
                  <Option value={ADMIN}>Admin</Option>
                </Select>
              )
          }
        </Cell>
        <Cell>
          <Checkbox checked={team.linkedDataVisible} onChange={changeLinkedDataVisibilty} disabled={userRole.role < team.role}>
            Yes
          </Checkbox>
        </Cell>
        <Cell className='options'>
          {invited && (
            <>
              <ResendInvitation site={site} team={team} />
              <CancelInvitation site={site} team={team} />
            </>
          )}
          {!invited && (
            <>
              {!owner && self && (
                <LeaveTeam site={site} />
              )}
              {!owner && !self && userRole.role > team.role && (
                <DeleteTeam site={site} team={team} />
              )}
            </>
          )}
        </Cell>
      </Row>

      <Modal ref={ref}>
        <ModalBody aria-labelledby='change-role-title' aria-describedby='change-role-description'>
          <ModalHeader>
            <p id='change-role-title'><b>Change role</b></p>
            <Button type='button' onClick={closeModal}>
              <Icon name='close-line' />
            </Button>
          </ModalHeader>
          <ModalContents>
            <p id='change-role-description'>Are you sure you wish to make {self ? 'yourself' : team.user.fullName} {roleNames[role]}?</p>
          </ModalContents>
          <ModalFooter>
            <Button type='button' className='primary' onClick={changeRole}>
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
