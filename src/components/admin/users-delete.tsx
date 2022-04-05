import React from 'react';
import type { FC } from 'react';
import { Button } from 'components/button';
import { Icon } from 'components/icon';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { useToasts } from 'hooks/use-toasts';
import { adminUserDelete } from 'lib/api/graphql';
import type { User } from 'types/graphql';

interface Props {
  user: User;
  onClose: VoidFunction;
}

export const UsersDelete: FC<Props> = ({ user, onClose }) => {
  const ref = React.useRef<Modal>();
  const toasts = useToasts();

  const openModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  const deleteUser = async () => {
    try {
      await adminUserDelete({ id: user.id });

      closeModal();

      toasts.add({ type: 'success', body: 'User deleted successfully' });
    } catch {
      toasts.add({ type: 'error', body: 'There was an issue deleting the user' });
    }
  };

  return (
    <>
      <Button className='link tertiary' onClick={openModal}>Delete user</Button>

      <Modal ref={ref} onClose={onClose}>
        <ModalBody aria-labelledby='delete-user-title' aria-describedby='delete-user-description'>
          <ModalHeader>
            <p id='delete-user-title'><b>Delete User</b></p>
            <Button type='button' onClick={closeModal}>
              <Icon name='close-line' />
            </Button>
          </ModalHeader>
          <ModalContents>
            <p id='delete-user-description'>Are you sure you wish to permanently delete <b>{user.email}</b>?</p>
            <p>If they are a site owner, this will also be deleted.</p>
          </ModalContents>
          <ModalFooter>
            <Button type='button' className='tertiary' onClick={deleteUser}>
              Delete User
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
