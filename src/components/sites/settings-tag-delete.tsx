import React from 'react';
import type { FC } from 'react';
import { Button } from 'components/button';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import type { Tag as ITag } from 'types/recording';

interface Props {
  tag: ITag;
}

export const SettingsTagDelete: FC<Props> = ({ tag }) => {
  const ref = React.useRef<Modal>();

  const openModal = () => {
    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  const deleteTag = async () => {
    
  };

  return (
    <>
      <Button className='link tertiary' onClick={openModal}>Delete</Button>

      <Modal ref={ref}>
        <ModalBody aria-labelledby='delete-tag-title' aria-describedby='delete-tag-description'>
          <ModalHeader>
            <p id='delete-tag-title'><b>Delete Tag</b></p>
            <Button type='button' onClick={closeModal}>
              <i className='ri-close-line' />
            </Button>
          </ModalHeader>
          <ModalContents>
            <p id='delete-tag-description'>Are you sure you wish to permanently delete the {tag.name} tag?</p>
          </ModalContents>
          <ModalFooter>
            <Button type='button' className='tertiary' onClick={deleteTag}>
              Delete Tag
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
