import React from 'react';
import type { FC } from 'react';
import type { Site } from 'types/site';
import { Button } from 'components/button';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { Label } from 'components/label';
import { Tooltip } from 'components/tooltip';
import { useToasts } from 'hooks/use-toasts';

interface Props {
  button: React.ReactChild;
  site: Site;
  recordingId: string;
}

export const RecordingsShare: FC<Props> = ({ button, site, recordingId }) => {
  const ref = React.useRef<Modal>();
  const input = React.useRef<HTMLInputElement>();

  const toasts = useToasts();
  const [loading, setLoading] = React.useState<boolean>(false);

  const openModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  const copy = async () => {
    if (ref.current) {
      setLoading(true);

      const text = input.current.value;
      await navigator.clipboard.writeText(text);

      toasts.add({ type: 'success', body: 'Copied' });

      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  return (
    <>
      <Button onClick={openModal}>
        {button}
      </Button>

      <Modal ref={ref}>
        <ModalBody aria-labelledby='recordings-share-title' aria-describedby='recordings-share-description'>
          <ModalHeader>
            <p id='recordings-share-title'><b>Share Recording</b></p>
            <Button type='button' onClick={closeModal}>
              <i className='ri-close-line' />
            </Button>
          </ModalHeader>
          <ModalContents className='recording-share-modal'>
            <Label id='recordings-share-description'>Share with team members</Label>
            <Tooltip button={<p className='team-members'>{site.team.length} members</p>}>
              <ul>
                {site.team.map(t => (
                  <li key={t.id}>
                    {t.user.fullName}
                  </li>
                ))}
              </ul>
            </Tooltip>
            <div className='recordings-share'>
              <input
                className='input' 
                readOnly
                value={`${location.origin}/recordings/app/sites/${site.id}/recordings/${recordingId}`}
                ref={input}
              />
              <Button onClick={copy}>
                <i className={loading ? 'ri-check-line' : 'ri-file-copy-line'} />
              </Button>
            </div>
          </ModalContents>
          <ModalFooter>
            <Button className='quaternary' onClick={closeModal}>Close</Button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </>
  );
};
