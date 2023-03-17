import React from 'react';
import type { FC } from 'react';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { deleteDataExport } from 'lib/api/graphql';
import { useToasts } from 'hooks/use-toasts';
import type { DataExport, Site } from 'types/graphql';

interface Props {
  site: Site;
  dataExport: DataExport;
  onClose?: VoidFunction;
}

export const SettingsDataExportDelete: FC<Props> = ({ site, dataExport, onClose }) => {
  const toasts = useToasts();
  const ref = React.useRef<Modal>();

  const openModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  const handleDeleteClick = async () => {
    try {
      await deleteDataExport({ 
        siteId: site.id,
        dataExportId: dataExport.id, 
      });
      
      if (onClose) closeModal();
      toasts.add({ type: 'success', body: 'Data export deleted' });
    } catch {
      toasts.add({ type: 'error', body: 'There was an error deleteing the data export. Please try again.' });
    }
  };

  return (
    <>
      <Button onClick={openModal} className='delete-data-export link tertiary'>
        Delete
      </Button>
            
      <Modal ref={ref} onClose={onClose}>
        <ModalBody aria-labelledby='delete-data-export-title' aria-describedby='delete-data-export-description'>
          <ModalHeader>
            <p id='delete-data-export-title'><b>Delete data export</b></p>
            <Button type='button' onClick={closeModal}>
              <Icon name='close-line' />
            </Button>
          </ModalHeader>
          <ModalContents>
            <p id='delete-data-export-description'>Are you sure you wish to delete this data export?</p>
          </ModalContents>
          <ModalFooter>
            <Button type='button' className='tertiary' onClick={handleDeleteClick}>
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
