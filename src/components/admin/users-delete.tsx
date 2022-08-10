import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Button } from 'components/button';
import { Icon } from 'components/icon';
import { Spinner } from 'components/spinner';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { useToasts } from 'hooks/use-toasts';
import { adminUserDelete } from 'lib/api/graphql';
import type { AdminUser } from 'types/graphql';

interface Props {
  user: AdminUser;
  onClose: VoidFunction;
}

export const UsersDelete: FC<Props> = ({ user, onClose }) => {
  const ref = React.useRef<Modal>();
  const toasts = useToasts();

  const [deleting, setDeleting] = React.useState<boolean>(false);

  const openModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  const deleteUser = async () => {
    try {
      setDeleting(true);
      await adminUserDelete({ id: user.id });
      closeModal();
      toasts.add({ type: 'success', body: 'User deleted successfully' });
    } catch {
      toasts.add({ type: 'error', body: 'There was an issue deleting the user' });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <Button className='link tertiary' onClick={openModal}>Delete user</Button>

      <Modal ref={ref} onClose={onClose}>
        <ModalBody aria-labelledby='delete-user-title' aria-describedby='delete-user-description'>
          <ModalHeader>
            <p id='delete-user-title'><b>Delete User</b></p>
            <Button type='button' onClick={closeModal} disabled={deleting}>
              <Icon name='close-line' />
            </Button>
          </ModalHeader>
          <ModalContents>
            <p id='delete-user-description'>Are you sure you wish to permanently delete <b>{user.email}</b>?</p>
            <p>If they are a site owner, this will also be deleted.</p>
          </ModalContents>
          <ModalFooter>
            <Button type='button' className={classnames('tertiary', { loading: deleting })} onClick={deleteUser} disabled={deleting}>
              <span>Delete User</span>
              {deleting && <Spinner />}
            </Button>
            <Button type='button' className='quaternary' onClick={closeModal} disabled={deleting}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </>
  );
};
