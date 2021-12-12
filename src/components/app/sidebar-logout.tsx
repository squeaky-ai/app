import React from 'react';
import type { FC } from 'react';
import { Button } from 'components/button';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { signout } from 'lib/api/auth';

export const SidebarLogout: FC = () => {
  const ref = React.useRef<Modal>();

  const openModal = () => {
    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  const handleSignout = async () => {
    await signout();
    location.href = '/';
  };

  return (
    <>
      <Button className='link' onClick={openModal} data-label='Log out'>
        <i className='ri-logout-circle-line' />
      </Button>

      <Modal ref={ref} className='sm'>
        <ModalBody aria-labelledby='logout-title' aria-describedby='logout-description'>
          <ModalHeader>
            <p id='logout-title'><b>Logout</b></p>
            <Button type='button' onClick={closeModal}>
              <i className='ri-close-line' />
            </Button>
          </ModalHeader>
          <ModalContents>
            <p id='logout-description'>Are you sure you want to log out?</p>
          </ModalContents>
          <ModalFooter>
            <Button type='button' onClick={handleSignout} className='tertiary'>
              Log out 
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
