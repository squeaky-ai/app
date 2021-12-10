import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { Highlighter } from 'components/highlighter';
import { Pill } from 'components/pill';
import { Checkbox } from 'components/checkbox';
import { Tooltip } from 'components/tooltip';
import { Browser } from 'components/browser';
import { Dropdown } from 'components/dropdown';
import { Device } from 'components/device';
import { Cell } from 'components/table';
import { RecordingsShare } from 'components/sites/recordings/recordings-share';
import { RecordingDelete } from 'components/sites/recordings/recording-delete';
import { VisitorsStarred } from 'components/sites/visitors/visitors-starred';
import { toNiceDate, toTimeString } from 'lib/dates';
import { useToasts } from 'hooks/use-toasts';
import { recordingBookmarked } from 'lib/api/graphql';
import type { Recording } from 'types/graphql';
import type { Site } from 'types/graphql';

interface Props {
  site: Site;
  query?: string;
  recording: Recording;
  style?: React.CSSProperties;
  selected: string[];
  setSelected: (selected: string[]) => void;
}

export const RecordingsItem: FC<Props> = ({ site, query, recording, style, selected, setSelected }) => {
  const toast = useToasts();
  const router = useRouter();
  const rowActionsRef = React.useRef<Dropdown>();

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.checked
      ? setSelected([...selected, recording.id])
      : setSelected(selected.filter(s => s !== recording.id ));
  };

  const onRowActionClose = () => {
    if (rowActionsRef.current) rowActionsRef.current.close();
  };

  return (
    <div className='row recording-row' style={style}>
      <Cell>
        <Checkbox 
          checked={selected.includes(recording.id)}
          onChange={handleChange}
        />
      </Cell>
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
        <Highlighter value={query}>
          <Link href={`/sites/${router.query.site_id}/recordings/${recording.id}`}>
            <a>
              {recording.sessionId}
            </a>
          </Link>
        </Highlighter>
      </Cell>
      <Cell>
        <VisitorsStarred site={site} visitor={recording.visitor} link />
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
        <Tooltip positionX='right' className='browser-tooltip' button={<Browser name={recording.device.browserName} height={24} width={24} />}>
          {recording.device.browserDetails}
        </Tooltip>
      </Cell>
      <Cell>
        <Dropdown portal button={<i className='ri-more-2-fill' />} buttonClassName='options' ref={rowActionsRef}>
          <RecordingDelete 
            site={site} 
            recordingId={recording.id}
            onClose={onRowActionClose}
          />
          <RecordingsShare
            button={<><i className='ri-share-line' /> Share</>}
            site={site}
            recordingId={recording.id}
            onClose={onRowActionClose}
          />
        </Dropdown>
      </Cell>
    </div>
  );
};
