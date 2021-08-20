import React from 'react';
import type { FC } from 'react';
import { Button } from 'components/button';
import { PlayerTab } from 'data/sites/enums';
import { toNiceDate, toTimeString } from 'lib/dates';
import { Browser } from 'components/browser';
import { Device } from 'components/device';
import { VisitorStarred } from 'components/sites/visitor-starred';
import type { Recording } from 'types/recording';
import type { Site } from 'types/site';

interface Props {
  site: Site;
  recording: Recording;
  setActiveTab: (value: PlayerTab) => void;
}

export const SidebarInfo: FC<Props> = ({ site, recording, setActiveTab }) => (
  <dl className='datalist'>
    <div className='row'>
      <dt>Session #</dt>
      <dd>{recording.sessionId}</dd>
    </div>
    <div className='row'>
      <dt>User</dt>
      <dd><VisitorStarred site={site} visitor={recording.visitor} /></dd>
    </div>
    <div className='row'>
      <dt>Date</dt>
      <dd>{toNiceDate(recording.connectedAt)}</dd>
    </div>
    <div className='row'>
      <dt>Language</dt>
      <dd>{recording.language}</dd>
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
      <dt>Start URL</dt>
      <dd>{recording.startPage}</dd>
    </div>
    <div className='row'>
      <dt>Exit URL</dt>
      <dd>{recording.exitPage}</dd>
    </div>
    <div className='row'>
      <dt>Device</dt>
      <dd>
        <Device deviceType={recording.deviceType} />
        {recording.deviceType}
      </dd>
    </div>
    <div className='row'>
      <dt>Viewport</dt>
      <dd>{recording.viewportX} x {recording.viewportY} px</dd>
    </div>
    <div className='row'>
      <dt>Browser</dt>
      <dd>
        <span className='browser'>
          <Browser name={recording.browser} />
        </span>
        {recording.browser}
      </dd>
    </div>
  </dl>
);
