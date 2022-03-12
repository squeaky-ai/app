import React from 'react';
import type { FC } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';

const MUTATION = gql`
  mutation AdminBlogDeleteImage($input: AdminBlogDeleteImageInput!) {
    adminBlogDeleteImage(input: $input) {
      message
    }
  }
`;

interface Props {
  path: string;
  refetchImages: VoidFunction;
}

export const Image: FC<Props> = ({ path, refetchImages }) => {
  const ref = React.useRef<Modal>();
  const [deleteImage] = useMutation(MUTATION);

  const openModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  const handleDelete = async () => {
    await deleteImage({
      variables: {
        input: { key: path },
      }
    });

    refetchImages();
  };

  return (
    <>
      <div className='image'>
        <div className='clip'>
          <img src={`https://cdn.squeaky.ai/${path}`} />
        </div>
        <Button className='delete-image' onClick={openModal}>
          <Icon name='close-line' />
        </Button>
      </div>

      <Modal ref={ref} className='sm'>
        <ModalBody aria-labelledby='delete-image-title' aria-describedby='delete-image-description'>
          <ModalHeader>
            <p id='delete-image-title'><b>Delete Image</b></p>
            <Button type='button' onClick={closeModal}>
              <Icon name='close-line' />
            </Button>
          </ModalHeader>
          <ModalContents>
            <p id='delete-image-description'>Are you sure you want to delete this image?</p>
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
