import React from 'react';
import type { FC } from 'react';
import { Button } from 'components/button';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { tagDelete } from 'lib/api/graphql';
import { useToasts } from 'hooks/use-toasts';
import type { Tag as ITag } from 'types/graphql';

interface Props {
  tag: ITag;
  siteId: string;
}

export const SettingsTagDelete: FC<Props> = ({ tag, siteId }) => {
  const ref = React.useRef<Modal>();
  const toasts = useToasts();

  const openModal = () => {
    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  const deleteTag = async () => {
    try {
      await tagDelete({ 
        siteId,
        tagId: tag.id 
      });

      toasts.add({ type: 'success', body: 'Tag deleted successfully' });
    } catch {
      toasts.add({ type: 'error', body: 'There was an issue deleting the tag' });
    }
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
