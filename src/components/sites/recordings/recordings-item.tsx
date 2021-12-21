import React from 'react';
import type { FC } from 'react';
import Image from 'next/image';
import classnames from 'classnames';
import { Icon } from 'components/icon';
import { Pill } from 'components/pill';
import { Checkbox } from 'components/checkbox';
import { Tooltip } from 'components/tooltip';
import { Browser } from 'components/browser';
import { Dropdown } from 'components/dropdown';
import { Device } from 'components/device';
import { Cell } from 'components/table';
import { RecordingStarred } from 'components/sites/recordings/recordings-starred';
import { RecordingsShare } from 'components/sites/recordings/recordings-share';
import { RecordingDelete } from 'components/sites/recordings/recording-delete';
import { VisitorsStarred } from 'components/sites/visitors/visitors-starred';
import { toNiceDate, toTimeString } from 'lib/dates';
import { npsColor } from 'lib/feedback/nps';
import { EMOJIS } from 'data/sentiment/constants';
import type { Recording } from 'types/graphql';
import type { Site } from 'types/graphql';

interface Props {
  site: Site;
  recording: Recording;
  style?: React.CSSProperties;
  selected: string[];
  setSelected: (selected: string[]) => void;
}

export const RecordingsItem: FC<Props> = ({ site, recording, style, selected, setSelected }) => {
  const rowActionsRef = React.useRef<Dropdown>();

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
        <RecordingStarred site={site} recording={recording} link />
      </Cell>
      <Cell>
        <VisitorsStarred site={site} visitor={recording.visitor} link />
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
        {!recording.referrer && <span className='direct'>Direct (none)</span>}
        {!!recording.referrer && (
          <Tooltip className='referrer' fluid button={recording.referrer}>
            {recording.referrer}
          </Tooltip>
        )}
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
        {!!recording.nps && (
          <p className={classnames('nps-score', npsColor(recording.nps))}>{recording.nps.score}</p>
        )}
        {!recording.nps && '-'}
      </Cell>
      <Cell>
        {!!recording.sentiment && (
          <div className='emoji'>
            <Image height={24} width={24} src={EMOJIS[recording.sentiment.score]} />
          </div>
        )}

        {!recording.sentiment && '-'}
      </Cell>
      <Cell>
        <Dropdown portal button={<Icon name='more-2-fill' />} buttonClassName='options' ref={rowActionsRef}>
          <RecordingDelete 
            site={site} 
            recordingId={recording.id}
            onClose={onRowActionClose}
          />
          <RecordingsShare
            button={<><Icon name='share-line' /> Share</>}
            site={site}
            recordingId={recording.id}
            onClose={onRowActionClose}
          />
        </Dropdown>
      </Cell>
    </div>
  );
};
