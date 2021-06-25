import React from 'react';
import type { FC } from 'react';
import { useRouter } from 'next/router';
import { Select, Option } from 'components/select';
import { OWNER, INVITED, MEMBER } from 'data/teams/constants';
import { CancelInvitation } from 'components/sites/cancel-invitation';
import { ResendInvitation } from 'components/sites/resend-invitation';
import { DeleteTeam } from 'components/sites/delete-team';
import { LeaveTeam } from 'components/sites/leave-team';
import { Button } from 'components/button';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { teamUpdate } from 'lib/api/graphql';
import { useToasts } from 'hooks/toasts';
import type { Team } from 'types/team';
import type { User } from 'types/user';
import type { Site } from 'types/site';

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

  const self = Number(team.user.id) === user.id;
  const owner = team.role === OWNER;
  const invited = team.status === INVITED;
  const userRole = site.team.find(t => Number(t.user.id) === user.id);

  const roleNames: { [key: number]: string } = {
    0: 'a User',
    1: 'an Admin'
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

  const changeRole = async () => {
    const { error } = await teamUpdate({ siteId: site.id, teamId: team.id, role });

    if (error) {
      toast.add({ type: 'error', body: 'There was an unexpected error when changing the user role. Please try again.' });
    } else {
      toast.add({ type: 'success', body: 'Role change complete' });

      // They can no longer view this page as they won't be authenticated
      if (self && role === MEMBER) {
        await router.push(`/sites/${site.id}/recordings`);
        return;
      }

      // Calling closeModal() would revert the role change in the UI
      if (ref.current) ref.current.hide();
    }
  };

  return (
    <>
      <tr>
        <td>
          {invited && <i>Invited</i>}
          {!invited && (
            self
              ? <><b>{team.user.fullName}</b> <i>(you)</i></>
              : <span>{team.user.fullName}</span>
          )}
        </td>
        <td>{team.user.email}</td>
        <td className='role'>
          {owner || userRole.role <= team.role
            ? team.roleName
            : (
                <Select name='role' onChange={openModal} value={role}>
                  <Option value='0'>User</Option>
                  <Option value='1'>Admin</Option>
                </Select>
              )
          }
        </td>
        <td className='options'>
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
        </td>
      </tr>

      <Modal ref={ref}>
        <ModalBody aria-labelledby='change-role-title' aria-describedby='change-role-description'>
          <ModalHeader>
            <p id='change-role-title'><b>Change role</b></p>
            <Button type='button' onClick={closeModal}>
              <i className='ri-close-line' />
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
