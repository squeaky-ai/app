import React from 'react';
import type { FC } from 'react';
import { Button } from 'components/button';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { tagsDelete } from 'lib/api/graphql';
import { useToasts } from 'hooks/use-toasts';
import type { Tag as ITag } from 'types/recording';

interface Props {
  tags: ITag[];
  siteId: string;
  onCompleted: VoidFunction;
}

export const SettingsTagsDelete: FC<Props> = ({ tags, siteId, onCompleted }) => {
  const ref = React.useRef<Modal>();
  const toasts = useToasts();

  const openModal = () => {
    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  const deleteTags = async () => {
    try {
      onCompleted();

      await tagsDelete({ 
        siteId,
        tagIds: tags.map(t => t.id),
      });

      toasts.add({ type: 'success', body: 'Tags deleted successfully' });
    } catch {
      toasts.add({ type: 'error', body: 'There was an issue deleting the tags' });
    }
  };

  return (
    <>
      <Button onClick={openModal}>Delete</Button>

      <Modal ref={ref}>
        <ModalBody aria-labelledby='delete-tags-title' aria-describedby='delete-tags-description'>
          <ModalHeader>
            <p id='delete-tags-title'><b>Delete Tags</b></p>
            <Button type='button' onClick={closeModal}>
              <i className='ri-close-line' />
            </Button>
          </ModalHeader>
          <ModalContents>
            <p id='delete-tags-description'>Are you sure you wish to permanently delete the following tags?</p>
            <ul>
              {tags.map(tag => (
                <li key={tag.id}>{tag.name}</li>
              ))}
            </ul>
          </ModalContents>
          <ModalFooter>
            <Button type='button' className='tertiary' onClick={deleteTags}>
              Delete Tags
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
