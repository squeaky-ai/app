import React from 'react';
import type { FC } from 'react';
import { Button } from 'components/button';
import { ipBlacklistDelete } from 'lib/api/graphql';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { useToasts } from 'hooks/use-toasts';
import type { SiteIpBlacklist } from 'types/site';

interface Props {
  ip: SiteIpBlacklist;
  siteId: string;
}

export const SettingsIpDelete: FC<Props> = ({ ip, siteId }) => {
  const ref = React.useRef<Modal>();
  const toasts = useToasts();

  const openModal = () => {
    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  const deleteIp = async () => {
    try {
      await ipBlacklistDelete({
        siteId,
        value: ip.value
      });

      toasts.add({ type: 'success', body: 'IP deleted successfully' });

      closeModal();

    } catch {
      toasts.add({ type: 'error', body: 'There was an issue deleting the IP' });
    }
  };

  return (
    <>
      <Button className='link tertiary' onClick={openModal}>Delete</Button>

      <Modal ref={ref}>
        <ModalBody aria-labelledby='ip-delete-title' aria-describedby='ip-delete-description'>
          <ModalHeader>
            <p id='ip-delete-title'><b>Delete IP</b></p>
            <Button type='button' onClick={closeModal}>
              <i className='ri-close-line' />
            </Button>
          </ModalHeader>
          <ModalContents>
            <p>Are you sure you wish to delete <b>{ip.name}</b>?</p>
          </ModalContents>
          <ModalFooter>
            <Button type='button' className='tertiary' onClick={deleteIp}>
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
