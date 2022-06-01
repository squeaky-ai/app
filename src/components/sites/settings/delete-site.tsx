import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { deleteSite } from 'lib/api/graphql';
import { Spinner } from 'components/spinner';
import { useToasts } from 'hooks/use-toasts';
import type { Site } from 'types/graphql';

interface Props {
  site: Site;
}

export const DeleteSite: FC<Props> = ({ site }) => {
  const toast = useToasts();
  const router = useRouter();
  const ref = React.useRef<Modal>();

  const [deleting, setDeleting] = React.useState<boolean>(false);

  const openModal = () => {
    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  const siteDelete = async () => {
    try {
      setDeleting(true);

      await deleteSite({ siteId: site.id });
      toast.add({ type: 'success', body: 'Site deleted' });
      await router.push('/sites');
    } catch(error) {
      toast.add({ type: 'error', body: 'There was an unexpected error deleting your site' });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <Button className='tertiary' onClick={openModal}>
        Delete Site
      </Button>

      <Modal className='delete-site-modal' ref={ref}>
        <ModalBody aria-labelledby='delete-site-title' aria-describedby='delete-site-description'>
          <ModalHeader>
            <p id='delete-site-title'><b>Delete site</b></p>
            <Button type='button' onClick={closeModal} disabled={deleting}>
              <Icon name='close-line' />
            </Button>
          </ModalHeader>
          <ModalContents>
            <p id='delete-site-description'><b>Are you sure you wish to delete your site?</b></p>
            <p>If so, all site data will be permanently deleted.</p>
          </ModalContents>
          <ModalFooter>
            <Button type='button' className={classnames('tertiary delete-site-button', { loading: deleting })} onClick={siteDelete} disabled={deleting}>
              <span>Yes, Delete Site</span>
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
