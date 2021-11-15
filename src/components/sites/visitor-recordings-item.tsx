import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { Pill } from 'components/pill';
import { Button } from 'components/button';
import { Device } from 'components/device';
import { Browser } from 'components/browser';
import { Tooltip } from 'components/tooltip';
import { Dropdown } from 'components/dropdown';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { Cell } from 'components/table';
import { toNiceDate, toTimeString } from 'lib/dates';
import { useToasts } from 'hooks/use-toasts';
import { recordingDelete, recordingBookmarked } from 'lib/api/graphql';
import type { Recording } from 'types/recording';

interface Props {
  recording: Recording;
}

export const VisitorRecordingsItem: FC<Props> = ({ recording }) => {
  const toast = useToasts();
  const router = useRouter();
  const ref = React.useRef<Modal>();

  const deleteRecording = async () => {
    try {
      await recordingDelete({ 
        siteId: router.query.site_id as string, 
        recordingId: recording.id 
      });

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

  return (
    <>
      <div className='row recording-row'>
        <Cell>
          {recording.viewed
            ? <Pill type='secondary'>Viewed</Pill>
            : <Pill type='tertiary'>New</Pill>
          }
        </Cell>
        <Cell>
          <Tooltip
            button={
              <span onClick={bookmarkRecording} className={classnames('bookmark', { active: recording.bookmarked })}>
              <i className='ri-bookmark-3-line' />
            </span>
            }
          >
            {recording.bookmarked ? 'Bookmarked' : 'Not bookmarked'}
          </Tooltip>
          <Link href={`/sites/${router.query.site_id}/recordings/${recording.id}`}>
            <a>
              {recording.sessionId}
            </a>
          </Link>
        </Cell>
        <Cell>
          {toNiceDate(recording.connectedAt)}
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
                <Tooltip fluid button={recording.startPage}>
                  {recording.startPage}
                </Tooltip>
              </div>
            </div>
            <div className='item'>
              <div>EXIT URL</div>
              <div>
                <Tooltip fluid button={recording.exitPage}>
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
          {recording.device.viewportX} x {recording.device.viewportY}
        </Cell>
        <Cell>
          <Tooltip positionX='right' className='browser-tooltip' button={<Browser name={recording.device.browserName} height={24} width={24} />}>
            {recording.device.browserDetails}
          </Tooltip>
        </Cell>
        <Cell>
          <Dropdown portal button={<i className='ri-more-2-fill' />} buttonClassName='options'>
            <Button onClick={openModal}>
              <i className='ri-delete-bin-line' /> Delete
            </Button>
          </Dropdown>
        </Cell>
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
