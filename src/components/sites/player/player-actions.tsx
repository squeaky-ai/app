import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { Checkbox } from 'components/checkbox';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { RecordingsShare } from 'components/sites/recordings/recordings-share';
import { recordingDelete, recordingBookmarked } from 'lib/api/graphql';
import { useToasts } from 'hooks/use-toasts';
import { useHistory } from 'hooks/use-history';
import { Preferences, Preference } from 'lib/preferences';
import type { Site } from 'types/graphql';
import type { Recording } from 'types/graphql';

interface Props {
  site: Site;
  recording: Recording;
}

export const PlayerActions: FC<Props> = ({ site, recording }) => {
  const toast = useToasts();
  const router = useRouter();
  const { history } = useHistory();
  const ref = React.useRef<Modal>();
  const [skipDeleteModal, setSkipDeleteModal] = React.useState<boolean>(false);

  const openModal = () => {
    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  const onBackButton = () => {
    // The last url will be the current one,
    // so go back one further
    const prevRoute = history[history.length - 2];

    router.push(prevRoute?.path || `/sites/${site.id}/recordings`);
  };

  const deleteRecording = async () => {
    try {
      await recordingDelete({ 
        siteId: site.id, 
        recordingId: recording.id 
      });

      if (skipDeleteModal) {
        Preferences.setBoolean(Preference.RECORDINGS_PLAYER_DELETED_SKIP_PROMPT, true);
      }

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

  const handleDeleteClick = async () => {
    const skipModal = Preferences.getBoolean(Preference.RECORDINGS_PLAYER_DELETED_SKIP_PROMPT);

    if (skipModal) {
      await deleteRecording();
    } else {
      openModal();
    }
  };

  return (
    <>
      <div className='recording-actions'>
        <Button onClick={handleBookmark} className={classnames('boookmark', { active: recording?.bookmarked })} disabled={!recording}>
          <Icon name='bookmark-3-line' />
        </Button>
        <RecordingsShare
          button={<Icon name='share-line' />}
          site={site}
          recordingId={recording?.id}
        />
        <Button onClick={handleDeleteClick} disabled={!recording}>
          <Icon name='delete-bin-line' />
        </Button>
        <Button className='close' onClick={onBackButton}>
          <Icon name='close-line' />
        </Button>
      </div>

      <Modal ref={ref}>
        <ModalBody aria-labelledby='delete-recording-title' aria-describedby='delete-recording-description'>
          <ModalHeader>
            <p id='delete-recording-title'><b>Delete Recording</b></p>
            <Button type='button' onClick={closeModal}>
              <Icon name='close-line' />
            </Button>
          </ModalHeader>
          <ModalContents>
            <p id='delete-recording-description'>Are you sure you wish to delete this recording?</p>
            <Checkbox checked={skipDeleteModal} onChange={() => setSkipDeleteModal(!skipDeleteModal)}>
              Don&apos;t show message again
            </Checkbox>
          </ModalContents>
          <ModalFooter>
            <Button type='button' className='tertiary' onClick={deleteRecording}>
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
