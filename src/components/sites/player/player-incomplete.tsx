import React from 'react';
import type { FC } from 'react';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import type { Replayer } from 'rrweb';

interface Props {
  show: boolean;
  replayer: Replayer
}

export const PlayerIncomplete: FC<Props> = ({ show, replayer }) => {
  const ref = React.useRef<Modal>();

  const [dismissed, setDismissed] = React.useState<boolean>(false);
  const [incomplete, setIncomplete] = React.useState<boolean>(false);

  const openModal = () => {
    if (ref.current) {
      ref.current.show();
      replayer?.pause();
    }
  };

  const closeModal = () => {
    if (ref.current) {
      ref.current.hide();

      // We don't want to show it multiple times
      setDismissed(true);
      replayer.play(replayer.getCurrentTime());
    }
  };

  React.useEffect(() => {
    if (show) {
      setIncomplete(true);

      // We should only automatically show it once
      if (!dismissed) openModal();
    }
  }, [show])

  return (
    <>
      {incomplete && (
        <Button className='control incomplete' onClick={openModal}>
          <Icon name='error-warning-line' />
        </Button>
      )}

      <Modal ref={ref}>
        <ModalBody aria-labelledby='player-incomplete-title' aria-describedby='player-incomplete-description'>
          <ModalHeader>
            <p className='has-icon error' id='player-incomplete-title'>
              <Icon name='error-warning-line' />
              <b>Visitor Connection Issues</b>
            </p>
            <Button type='button' onClick={closeModal}>
              <Icon name='close-line' />
            </Button>
          </ModalHeader>
          <ModalContents>
            <p id='player-incomplete-description'>This visitor experienced issues with their internet connection during their visit to your site.</p>
            <p>Due to this, you may see some unusual graphic artefacts in the recording - your visitor did not see these, and they are only present in the recording due to the connection issues.</p>
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
