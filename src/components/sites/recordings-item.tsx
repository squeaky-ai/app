import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { Highlighter } from 'components/highlighter';
import { Pill } from 'components/pill';
import { Checkbox } from 'components/checkbox';
import { Button } from 'components/button';
import { Tooltip } from 'components/tooltip';
import { Browser } from 'components/browser';
import { Dropdown } from 'components/dropdown';
import { Device } from 'components/device';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { Cell } from 'components/table';
import { toNiceDate, toTimeString } from 'lib/dates';
import { useToasts } from 'hooks/use-toasts';
import { recordingDelete, recordingBookmarked } from 'lib/api/graphql';
import { Preferences, Preference } from 'lib/preferences';
import type { Recording } from 'types/recording';

interface Props {
  query?: string;
  recording: Recording;
}

export const RecordingsItem: FC<Props> = ({ query, recording }) => {
  const toast = useToasts();
  const router = useRouter();
  const ref = React.useRef<Modal>();
  const [skipDeleteModal, setSkipDeleteModal] = React.useState<boolean>(false);

  const onRowClick = (event: React.MouseEvent) => {
    const element = event.target as HTMLElement;
    const ignored = element.closest('button');

    if (ignored) {
      event.preventDefault();
    }
  };

  const deleteRecording = async () => {
    try {
      await recordingDelete({ 
        siteId: router.query.site_id as string, 
        recordingId: recording.id 
      });

      if (skipDeleteModal) {
        Preferences.setBoolean(Preference.RECORDINGS_DELETED_SKIP_PROMPT, true);
      }

      closeModal();
      toast.add({ type: 'success', body: 'Recording deleted' });
    } catch {
      toast.add({ type: 'error', body: 'There was an error deleteing your recording. Please try again.' });
    }
  };

  const bookmarkRecording = async () => {
    try {
      await recordingBookmarked({ 
        siteId: router.query.site_id as string, 
        recordingId: recording.id,
        bookmarked: !recording.bookmarked,
      });
    } catch {
      toast.add({ type: 'error', body: 'There was an error bookmarking your recording. Please try again.' });
    }
  };

  const openModal = () => {
    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  const handleDeleteClick = async () => {
    const skipModal = Preferences.getBoolean(Preference.RECORDINGS_DELETED_SKIP_PROMPT);

    if (skipModal) {
      await deleteRecording();
    } else {
      openModal();
    }
  };

  return (
    <>
      <Link href={`/sites/${router.query.site_id}/recordings/${recording.id}`}>
        <a className='row recording-row' onClick={onRowClick}>
          <Cell>
            {recording.viewed
              ? <Pill type='secondary'>Viewed</Pill>
              : <Pill type='tertiary'>New</Pill>
            }
          </Cell>
          <Cell className='primary'>
            <Tooltip
              button={
                <span onClick={bookmarkRecording} className={classnames('bookmark', { active: recording.bookmarked })}>
                <i className='ri-bookmark-3-line' />
              </span>
              }
            >
              {recording.bookmarked ? 'Bookmarked' : 'Not bookmarked'}
            </Tooltip>
            <Highlighter value={query}>{recording.sessionId}</Highlighter>
          </Cell>
          <Cell>
            <Highlighter value={query}>
              {recording.visitor.visitorId}
            </Highlighter>
          </Cell>
          <Cell>
            <Highlighter value={query}>
              {toNiceDate(recording.connectedAt)}
            </Highlighter>
          </Cell>
          <Cell>
            {toTimeString(recording.duration)}
          </Cell>
          <Cell>
            <Tooltip button={recording.pageCount} buttonClassName='link'>
              <ul className='tooltip-list'>
                {recording.pageViews.map((page, i) => (
                  <li key={page + i}>{page}</li>
                ))}
              </ul>
            </Tooltip>
          </Cell>
          <Cell>
            <div className='start-exit-page'>
              <div className='item'>
                <div>START URL</div>
                <div>
                  <Tooltip fluid button={<Highlighter value={query}>{recording.startPage}</Highlighter>}>
                    {recording.startPage}
                  </Tooltip>
                </div>
              </div>
              <div className='item'>
                <div>EXIT URL</div>
                <div>
                  <Tooltip fluid button={<Highlighter value={query}>{recording.exitPage}</Highlighter>}>
                    {recording.exitPage}
                  </Tooltip>
                </div>
              </div>
            </div>
          </Cell>
          <Cell>
            <Tooltip positionX='right' button={<Device deviceType={recording.device.deviceType} />}>
              {recording.device.deviceType === 'Computer' ? 'Desktop or Laptop Device' : 'Mobile Device'}
            </Tooltip>
            <Highlighter value={query}>{recording.device.viewportX}</Highlighter> x <Highlighter value={query}>{recording.device.viewportY}</Highlighter>
          </Cell>
          <Cell>
            <Tooltip positionX='right' button={<Browser name={recording.device.browserName} height={24} width={24} />}>
              {recording.device.browserDetails}
            </Tooltip>
          </Cell>
          <Cell>
            <Dropdown portal button={<i className='ri-more-2-fill' />} buttonClassName='options'>
              <Button onClick={handleDeleteClick}>
                <i className='ri-delete-bin-line' /> Delete
              </Button>
            </Dropdown>
          </Cell>
        </a>
      </Link>

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
