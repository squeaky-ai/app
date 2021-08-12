import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { Button } from 'components/button';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { recordingDelete, recordingBookmarked } from 'lib/api/graphql';
import { useToasts } from 'hooks/use-toasts';
import type { Site } from 'types/site';
import type { Recording } from 'types/recording';

interface Props {
  site: Site;
  recording: Recording;
}

export const PlayerActions: FC<Props> = ({ site, recording }) => {
  const toast = useToasts();
  const router = useRouter();
  const ref = React.useRef<Modal>();

  const openModal = () => {
    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  const handleDelete = async () => {
    try {
      await recordingDelete({ 
        siteId: site.id, 
        recordingId: recording.id 
      });

      closeModal();

      await router.push(`/sites/${site.id}/recordings`);

      toast.add({ type: 'success', body: 'Recording deleted' });
    } catch {
      toast.add({ type: 'error', body: 'There was an error deleteing your recording. Please try again.' });
    }
  };

  const handleBookmark = async () => {
    try {
      await recordingBookmarked({ 
        siteId: site.id, 
        recordingId: recording.id,
        bookmarked: !recording.bookmarked,
      });
    } catch {
      toast.add({ type: 'error', body: 'There was an error bookmarking your recording. Please try again.' });
    }
  };

  return (
    <>
      <div className='recording-actions'>
        <Button onClick={handleBookmark} className={classnames('boookmark', { active: recording?.bookmarked })}>
          <i className='ri-bookmark-3-line' />
        </Button>
        <Button onClick={openModal}>
          <i className='ri-delete-bin-line' />
        </Button>
        <Link href={`/sites/${site.id}/recordings`}>
          <a className='button close'>
            <i className='ri-close-line' />
          </a>
        </Link>
      </div>

      <Modal ref={ref}>
        <ModalBody aria-labelledby='delete-recording-title' aria-describedby='delete-recording-description'>
          <ModalHeader>
            <p id='delete-recording-title'><b>Delete Recording</b></p>
            <Button type='button' onClick={closeModal}>
              <i className='ri-close-line' />
            </Button>
          </ModalHeader>
          <ModalContents>
            <p id='delete-recording-description'>Are you sure you wish to delete this recording?</p>
          </ModalContents>
          <ModalFooter>
            <Button type='button' className='tertiary' onClick={handleDelete}>
              Delete Recording
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
