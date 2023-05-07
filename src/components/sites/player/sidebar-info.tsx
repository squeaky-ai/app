import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { PlayerTab } from 'data/sites/enums';
import { toTimeString } from 'lib/dates';
import { Tooltip } from 'components/tooltip';
import { Browser } from 'components/browser';
import { Device } from 'components/device';
import { VisitorsStarred } from 'components/sites/visitors/visitors-starred';
import { RecordingStarred } from 'components/sites/recordings/recordings-starred';
import { SidebarInfoCopy } from 'components/sites/player/sidebar-info-copy';
import { getLinkedData, normalizeKey } from 'lib/visitors';
import type { Recording, Team } from 'types/graphql';
import type { Site } from 'types/graphql';

interface Props {
  site: Site;
  member?: Team;
  recording: Recording;
  setActiveTab: (value: PlayerTab) => void;
}

export const SidebarInfo: FC<Props> = ({ site, member, recording, setActiveTab }) => {
  const [showRecordings, setShowRecordings] = React.useState<boolean>(false);

  const linkedData = getLinkedData(member, recording.visitor);

  const toggleShowRecordings = () => setShowRecordings(!showRecordings);

  const recordingsCount = recording.visitor.recordings.pagination.total;

  const moreRecordingsCount = (
    recordingsCount -
    recording.visitor.recordings.pagination.pageSize
  );

  return (
    <>
      <h5>Visitor</h5>
      <dl className='datalist'>
        <div className='row'>
          <dt>Visitor ID</dt>
          <dd className='visitor-id'>
            <VisitorsStarred site={site} member={member} visitor={recording.visitor} link />
          </dd>
        </div>
        <div className='row'>
          <dt>First visited</dt>
          <dd>{recording.visitor.firstViewedAt.niceDateTime}</dd>
        </div>
        <div className='row'>
          <dt>Last activity</dt>
          <dd>{recording.visitor.lastActivityAt.niceDateTime}</dd>
        </div>
        <div className='row'>
          <dt>Recordings</dt>
          <dd>
            {recordingsCount >= 1 && (
              <Button className={classnames('link toggle-recordings', { open: showRecordings })} onClick={toggleShowRecordings}>
                <span>{recordingsCount}</span>
                <Icon name='arrow-drop-down-line' />
              </Button>
            )}
            {recordingsCount < 1 && (
              <>1</>
            )}
          </dd>
        </div>
        {showRecordings && (
          <div className='row recordings'>
            {recording.visitor.recordings.items.map(rec => (
              <div className='recording-row' key={rec.id}>
                <div>
                  <Icon name='play-mini-fill' />
                  <span>
                    <Link href={`/sites/${site.id}/recordings/${rec.id}`}>
                      {rec.sessionId}
                    </Link>
                  </span>
                </div>
                <div>
                  {rec.disconnectedAt.shortDate}
                </div>
                <div>
                  {toTimeString(rec.duration)}
                </div>
              </div>
            ))}
            {moreRecordingsCount > 0 && (
              <Link className='see-more' href={`/sites/${site.id}/visitors/${recording.visitor.id}`}>
                See {moreRecordingsCount} more
              </Link>
            )}
          </div>
        )}
      </dl>
      <div className='attributes'>
        {!linkedData && (
          <p className='no-attributes'>
            <Icon name='link-m' />
            <span>No Linked Data</span>
          </p>
        )}

        {linkedData && (
          <>
            <p className='heading'>
              <Icon name='link-m' />
              <span>Linked Data</span>
            </p>
            <dl className='datalist'>
              {Object.entries(linkedData).map(([key, value]) => (
                <div className='row' key={key}>
                  <dt>{normalizeKey(key)}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </>
        )}
      </div>
      <h5>Recording</h5>
      <dl className='datalist'>
        <div className='row'>
          <dt>Recording ID</dt>
          <dd className='recording-id'><RecordingStarred site={site} member={member} recording={recording} /></dd>
        </div>
        <div className='row'>
          <dt>Date</dt>
          <dd>{recording.connectedAt.niceDateTime}</dd>
        </div>
        <div className='row'>
          <dt>Duration</dt>
          <dd>{toTimeString(recording.duration)}</dd>
        </div>
        <div className='row'>
          <dt>Activity</dt>
          <dd>{recording.activityDuration ? toTimeString(recording.activityDuration || 0) : '-'}</dd>
        </div>
        <div className='row'>
          <dt>Pages</dt>
          <dd><Button onClick={() => setActiveTab(PlayerTab.PAGES)} className='pages'>{recording.pageCount}</Button></dd>
        </div>
        <div className='row'>
          <dt>Traffic Source</dt>
          <dd>
            {!recording.referrer && '-'}
            {!!recording.referrer && (
              <SidebarInfoCopy text={recording.referrer}>
                <Tooltip button={recording.referrer} positionX='left' fluid>
                  {recording.referrer}
                </Tooltip>
              </SidebarInfoCopy>
            )}
          </dd>
        </div>
        <div className='row'>
          <dt>Start URL</dt>
          <dd>
            <SidebarInfoCopy text={recording.startPage}>
              <Tooltip button={recording.startPage} positionX='left' fluid>
                {recording.startPage}
              </Tooltip>
            </SidebarInfoCopy>
          </dd>
        </div>
        <div className='row'>
          <dt>Exit URL</dt>
          <dd>
            <SidebarInfoCopy text={recording.exitPage}>
              <Tooltip button={recording.exitPage} positionX='left' fluid>
                {recording.exitPage}
              </Tooltip>
            </SidebarInfoCopy>
          </dd>
        </div>
        <div className='row'>
          <dt>Device</dt>
          <dd>
            <Device deviceType={recording.device.deviceType} />
            {recording.device.deviceType}
          </dd>
        </div>
        <div className='row'>
          <dt>Viewport</dt>
          <dd>{recording.device.deviceX} x {recording.device.deviceY} px</dd>
        </div>
        <div className='row'>
          <dt>Browser</dt>
          <dd>
            <span className='browser'>
              <Browser height={16} width={16} name={recording.device.browserName} />
            </span>
            {recording.device.browserName}
          </dd>
        </div>
        <div className='row'>
          <dt>Language</dt>
          <dd>{recording.language}</dd>
        </div>
      </dl>
    </>
  );
};
