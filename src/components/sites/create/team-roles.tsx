import React from 'react';
import type { FC } from 'react';
import { Button } from 'components/button';
import { Icon } from 'components/icon';
import { Roles } from 'components/sites/team/roles';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';

export const TeamRoles: FC = () => {
  const ref = React.useRef<Modal>();

  const openModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  return (
    <>
      <Button className='link team-roles' onClick={openModal}>
        <Icon name='information-line' />
      </Button>

      <Modal ref={ref} className='md team-role-modal' scrollable>
        <ModalBody aria-labelledby='team-roles-title' aria-describedby='team-roles-description'>
          <ModalHeader>
            <p id='team-roles-title'><b>Roles</b></p>
            <Button type='button' onClick={closeModal}>
              <Icon name='close-line' />
            </Button>
          </ModalHeader>
          <ModalContents>
            <p id='team-roles-description'>Roles are site-specific and determine what level of access individual team members have to site settings and features.</p>
            <Roles />
          </ModalContents>
          <ModalFooter>
            <Button type='button' className='quaternary' onClick={closeModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </>
  );
};
