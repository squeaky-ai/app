import React from 'react';
import type { FC } from 'react';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';

interface Props {
  handleGenerate: VoidFunction;
  onClose?: VoidFunction;
}

export const GenerateApiKey: FC<Props> = ({ handleGenerate, onClose }) => {
  const ref = React.useRef<Modal>();

  const openModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  const onGenerate = () => {
    handleGenerate();
    closeModal();
  }

  return (
    <>
      <Button className='secondary' onClick={openModal}>
        Generate New API Key
      </Button>

      <Modal ref={ref} className='sm' onClose={onClose}>
        <ModalBody aria-labelledby='generate-api-key-title' aria-describedby='generate-api-key-description'>
          <ModalHeader>
            <p id='generate-api-key-title'><b>Generate New API Key</b></p>
            <Button type='button' onClick={closeModal}>
              <Icon name='close-line' />
            </Button>
          </ModalHeader>
          <ModalContents>
            <p id='generate-api-key-description'>Are you sure you want to generate a new API key?</p>
            <p><b>The previous key will be instantly invalidated.</b></p>
          </ModalContents>
          <ModalFooter>
            <Button type='button' onClick={onGenerate} className='tertiary'>
              Generate 
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
