import React from 'react';
import type { FC } from 'react';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  handleDelete: VoidFunction;
}

export const NoteDelete: FC<Props> = ({ handleDelete, children, ...rest }) => {
  const ref = React.useRef<Modal>();

  const openModal = () => {
    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  const onDelete = () => {
    closeModal();
    handleDelete();
  };

  return (
    <>
      <Button onClick={openModal} {...rest}>
        {children}
      </Button>

      <Modal ref={ref}>
        <ModalBody aria-labelledby='delete-note-title'>
          <ModalHeader>
            <p id='delete-note-title'><b>Delete Note</b></p>
            <Button type='button' onClick={closeModal}>
              <Icon name='close-line' />
            </Button>
          </ModalHeader>
          <ModalContents>
            <p>Are you sure you wish to delete this note?</p>
          </ModalContents>
          <ModalFooter>
            <Button type='button' className='tertiary' onClick={onDelete}>
              Delete Note
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
