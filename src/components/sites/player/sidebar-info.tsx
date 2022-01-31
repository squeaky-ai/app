import React from 'react';
import type { FC } from 'react';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { PlayerTab } from 'data/sites/enums';
import { toNiceDate, toTimeString } from 'lib/dates';
import { Tooltip } from 'components/tooltip';
import { Browser } from 'components/browser';
import { Flag } from 'components/flag';
import { Device } from 'components/device';
import { VisitorsStarred } from 'components/sites/visitors/visitors-starred';
import { RecordingStarred } from 'components/sites/recordings/recordings-starred';
import { SidebarNps } from 'components/sites/player/sidebar-nps';
import { SidebarSentiment } from 'components/sites/player/sidebar-sentiment';
import { getLinkedData, normalizeKey } from 'lib/visitors';
import type { Recording } from 'types/graphql';
import type { Site } from 'types/graphql';

interface Props {
  site: Site;
  recording: Recording;
  setActiveTab: (value: PlayerTab) => void;
}

export const SidebarInfo: FC<Props> = ({ site, recording, setActiveTab }) => {
  const linkedData = getLinkedData(recording.visitor);

  return (
    <>
      <div className='attributes'>
        {!linkedData && (
          <p className='no-attributes'>
            <Icon name='link-m' />
            <span>No Linked Data</span>
            <a href='/developers' target='_blank'>Settings</a>
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
      <dl className='datalist'>
        <div className='row'>
          <dt>Recording #</dt>
          <dd className='recording-id'><RecordingStarred site={site} recording={recording} /></dd>
        </div>
        <div className='row'>
          <dt>Visitor</dt>
          <dd className='visitor-id'><VisitorsStarred site={site} visitor={recording.visitor} link /></dd>
        </div>
        <div className='row'>
          <dt>Date</dt>
          <dd>{toNiceDate(recording.connectedAt)}</dd>
        </div>
        <div className='row'>
          <dt>Duration</dt>
          <dd>{toTimeString(recording.duration)}</dd>
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
              <Tooltip button={recording.referrer} positionX='right' fluid>
                {recording.referrer}
              </Tooltip>
            )}
          </dd>
        </div>
        <div className='row'>
          <dt>Start URL</dt>
          <dd>
            <Tooltip button={recording.startPage} positionX='right' fluid>
              {recording.startPage}
            </Tooltip>
          </dd>
        </div>
        <div className='row'>
          <dt>Exit URL</dt>
          <dd>
            <Tooltip button={recording.exitPage} positionX='right' fluid>
              {recording.exitPage}
            </Tooltip>
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
        <div className='row'>
          <dt>Country</dt>
          <dd>
            {!!recording.countryCode && (
              <Tooltip button={<Flag code={recording.countryCode} />}>
                {recording.countryName}
              </Tooltip>
            )}
            {!recording.countryCode && '-'}
          </dd>
        </div>
      </dl>

      {!!recording.nps && <SidebarNps nps={recording.nps} />}
      {!!recording.sentiment && <SidebarSentiment sentiment={recording.sentiment} />}
    </>
  );
};
