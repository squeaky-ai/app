import React from 'react';
import type { FC } from 'react';
import { useRouter } from 'next/router';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { deleteSite } from 'lib/api/graphql';
import { useToasts } from 'hooks/use-toasts';
import type { Site } from 'types/graphql';

interface Props {
  site: Site;
}

export const DeleteSite: FC<Props> = ({ site }) => {
  const toast = useToasts();
  const router = useRouter();
  const ref = React.useRef<Modal>();

  const openModal = () => {
    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  const siteDelete = async () => {
    try {
      await deleteSite({ siteId: site.id });
      toast.add({ type: 'success', body: 'Site deleted' });
      await router.push('/sites');
    } catch(error) {
      toast.add({ type: 'error', body: 'There was an unexpected error deleting your site' });
    }
  };

  return (
    <>
      <Button className='tertiary' onClick={openModal}>
        Delete Site
      </Button>

      <Modal ref={ref}>
        <ModalBody aria-labelledby='delete-site-title' aria-describedby='delete-site-description'>
          <ModalHeader>
            <p id='delete-site-title'><b>Delete site</b></p>
            <Button type='button' onClick={closeModal}>
              <Icon name='close-line' />
            </Button>
          </ModalHeader>
          <ModalContents>
            <p id='delete-site-description'><b>Are you sure you wish to delete your site?</b></p>
            <p>If so, all site data will be permanently deleted.</p>
          </ModalContents>
          <ModalFooter>
            <Button type='button' className='tertiary' onClick={siteDelete}>
              Yes, Delete Site
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
