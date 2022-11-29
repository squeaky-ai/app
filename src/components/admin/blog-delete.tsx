import React from 'react';
import type { FC } from 'react';
import { useRouter } from 'next/router';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { deleteBlogPost } from 'lib/api/graphql';

interface Props {
  id: string;
  onClose?: VoidFunction;
}

export const BlogDelete: FC<Props> = ({ id, onClose }) => {
  const ref = React.useRef<Modal>();

  const router = useRouter();

  const openModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  const handleDelete = async () => {
    await deleteBlogPost({ id });

    closeModal();

    await router.push('/__admin/blog');
  };

  return (
    <>
      <Button type='button' className='tertiary delete-post' onClick={openModal}>
        Delete Post
      </Button>

      <Modal ref={ref} className='sm' onClose={onClose}>
        <ModalBody aria-labelledby='delete-post-title' aria-describedby='delete-post-description'>
          <ModalHeader>
            <p id='delete-post-title'><b>Delete Post</b></p>
            <Button type='button' onClick={closeModal}>
              <Icon name='close-line' />
            </Button>
          </ModalHeader>
          <ModalContents>
            <p id='delete-post-description'>Are you sure you want to delete this post?</p>
          </ModalContents>
          <ModalFooter>
            <Button type='button' onClick={handleDelete} className='tertiary'>
              Delete 
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
