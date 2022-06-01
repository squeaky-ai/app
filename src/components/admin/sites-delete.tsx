import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Button } from 'components/button';
import { Icon } from 'components/icon';
import { Spinner } from 'components/spinner';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { useToasts } from 'hooks/use-toasts';
import { adminSiteDelete } from 'lib/api/graphql';
import type { Site } from 'types/graphql';

interface Props {
  site: Site;
  onClose: VoidFunction;
}

export const SitesDelete: FC<Props> = ({ site, onClose }) => {
  const ref = React.useRef<Modal>();
  const toasts = useToasts();

  const [deleting, setDeleting] = React.useState<boolean>(false);

  const openModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  const deleteSite = async () => {
    try {
      setDeleting(true);
      await adminSiteDelete({ id: site.id });
      closeModal();
      toasts.add({ type: 'success', body: 'Site deleted successfully' });
    } catch {
      toasts.add({ type: 'error', body: 'There was an issue deleting the site' });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <Button className='link tertiary' onClick={openModal}>Delete site</Button>

      <Modal ref={ref} onClose={onClose}>
        <ModalBody aria-labelledby='delete-site-title' aria-describedby='delete-site-description'>
          <ModalHeader>
            <p id='delete-site-title'><b>Delete Site</b></p>
            <Button type='button' onClick={closeModal} disabled={deleting}>
              <Icon name='close-line' />
            </Button>
          </ModalHeader>
          <ModalContents>
            <p id='delete-site-description'>Are you sure you wish to permanently delete <b>{site.name}</b>?</p>
          </ModalContents>
          <ModalFooter>
            <Button type='button' className={classnames('tertiary', { loading: deleting })} onClick={deleteSite} disabled={deleting}>
              <span>Delete Site</span>
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
