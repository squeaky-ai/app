import React from 'react';
import type { FC } from 'react';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import type { ErrorEvent } from 'types/event';

interface Props {
  event?: ErrorEvent;
}

export const SidebarErrorModal: FC<Props> = ({ event }) => {
  const ref = React.useRef<Modal>();

  const openModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  if (!event) return null;

  return (
    <>
      <Button className='link view-more' onClick={openModal}>
        View details
      </Button>

      <Modal ref={ref} className='md-lg sidebar-errors-modal' scrollable>
        <ModalBody aria-labelledby='sidebar-error-title'>
          <ModalHeader>
            <p id='sidebar-errort-title'><b>JavaScript Error Details</b></p>
            <Button type='button' onClick={closeModal}>
              <Icon name='close-line' />
            </Button>
          </ModalHeader>
          <ModalContents>
            <p className='key'>Page:</p>
            <p className='value'>{event.data.href}</p>
            <p className='key'>Filename:</p>
            <p className='value'>{event.data.filename}</p>
            <p className='key'>Line number:</p>
            <p className='value'>{event.data.line_number}</p>
            <p className='key'>Column:</p>
            <p className='value'>{event.data.col_number}</p>
            <p className='key'>Message:</p>
            <p className='value'>{event.data.message}</p>
            <p className='key'>Stacktrace:</p>
            <pre className='code block'>
              <code>
                {event.data.stack}
              </code>
            </pre>
          </ModalContents>
          <ModalFooter>
            <Button type='button' className='quaternary' onClick={closeModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </>
  );
};
