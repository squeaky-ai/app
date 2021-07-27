import React from 'react';
import type { FC } from 'react';
import Image from 'next/image';
import { Button } from 'components/button';
import { PlayerTab } from 'data/sites/enums';
import { toNiceDate } from 'lib/dates';
import type { Recording } from 'types/recording';

interface Props {
  recording: Recording;
  setActiveTab: (value: PlayerTab) => void;
}

export const SidebarInfo: FC<Props> = ({ recording, setActiveTab }) => (
  <dl className='datalist'>
    <div className='row'>
      <dt>Session #</dt>
      <dd>{recording.sessionId}</dd>
    </div>
    <div className='row'>
      <dt>User</dt>
      <dd>{recording.viewerId}</dd>
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
      <dd>{recording.durationString}</dd>
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
        <i className={recording.deviceType === 'Computer' ? 'ri-computer-line' : 'ri-smartphone-line'} />
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
          <Image height={16} width={16} src={`/browsers/${recording.browser.toLowerCase().replace(' ', '-')}.svg`} alt={`${recording.browser} icon`} />
        </span>
        {recording.browser}
      </dd>
    </div>
  </dl>
);
