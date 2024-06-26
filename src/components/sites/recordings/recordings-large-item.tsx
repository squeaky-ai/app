import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Icon } from 'components/icon';
import { Pill } from 'components/pill';
import { Checkbox } from 'components/checkbox';
import { Tooltip } from 'components/tooltip';
import { Browser } from 'components/browser';
import { Dropdown } from 'components/dropdown';
import { Device } from 'components/device';
import { Cell, Row } from 'components/table';
import { Flag } from 'components/flag';
import { RecordingStarred } from 'components/sites/recordings/recordings-starred';
import { RecordingsShare } from 'components/sites/recordings/recordings-share';
import { RecordingDelete } from 'components/sites/recordings/recording-delete';
import { VisitorsStarred } from 'components/sites/visitors/visitors-starred';
import { RageClick } from 'components/custom-icons/rage-click';
import { UTurn } from 'components/custom-icons/u-turn';
import { Emoji, EmojiType } from 'components/emoji';
import { toTimeString } from 'lib/dates';
import { getLinkedData } from 'lib/visitors';
import { npsColor } from 'lib/feedback';
import { percentage } from 'lib/maths';
import type { ExternalAttributes } from 'types/visitors';
import type { Site, Recording, Team } from 'types/graphql';

interface Props {
  site: Site;
  recording: Recording;
  style?: React.CSSProperties;
  selected: string[];
  member?: Team;
  setSelected: (selected: string[]) => void;
}

export const RecordingsLargeItem: FC<Props> = ({ site, recording, style, member, selected, setSelected }) => {
  const rowActionsRef = React.useRef<Dropdown>();

  const linkedData = getLinkedData<ExternalAttributes>(member, recording.visitor);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.checked
      ? setSelected([...selected, recording.id])
      : setSelected(selected.filter(s => s !== recording.id ));
  };

  const onRowActionClose = () => {
    if (rowActionsRef.current) rowActionsRef.current.close();
  };

  return (
    <Row className='recording-row' style={style}>
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
      <Cell>
        <RecordingStarred site={site} member={member} recording={recording} link />
      </Cell>
      <Cell>
        <VisitorsStarred site={site} member={member} visitor={recording.visitor} link />
      </Cell>
      <Cell>
        {linkedData?.id || '-'}
      </Cell>
      <Cell>
        {linkedData?.name || '-'}
      </Cell>
      <Cell>
        {linkedData?.email || '-'}
      </Cell>
      <Cell>
        {recording.connectedAt.niceDateTime}
      </Cell>
      <Cell>
        {toTimeString(recording.duration)}
      </Cell>
      <Cell>
        {recording.activityDuration && (
          <>{toTimeString(recording.activityDuration || 0)} <i className='percent'>({percentage(recording.duration, recording.activityDuration)}%)</i></>
        )}
        {!recording.activityDuration && '-'}
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
        {!!recording.countryCode && (
          <Tooltip button={<Flag code={recording.countryCode} />}>
            {recording.countryName}
          </Tooltip>
        )}
        {!recording.countryCode && '-'}
      </Cell>
      <Cell>
        <Tooltip positionX='right' className='browser-tooltip' button={<Browser name={recording.device.browserName} height={16} width={16} />}>
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
            <Emoji height={16} width={16} emoji={`emoji-${recording.sentiment.score + 1}` as EmojiType} />
          </div>
        )}

        {!recording.sentiment && '-'}
      </Cell>
      <Cell>
        {!!recording.rageClicked && (
          <RageClick height={24} width={24} />
        )}

        {!recording.rageClicked && '-'}
      </Cell>
      <Cell>
        {!!recording.uTurned && (
          <UTurn height={24} width={24} />
        )}

        {!recording.uTurned && '-'}
      </Cell>
      <Cell>
        <Dropdown portal button={<Icon name='more-2-fill' />} buttonClassName='options' ref={rowActionsRef}>
          <RecordingDelete 
            site={site} 
            member={member}
            recordingId={recording.id}
            onClose={onRowActionClose}
          />
          <RecordingsShare
            button={<><Icon name='share-line' /> Share</>}
            site={site}
            member={member}
            recordingId={recording.id}
            onClose={onRowActionClose}
          />
        </Dropdown>
      </Cell>
    </Row>
  );
};
