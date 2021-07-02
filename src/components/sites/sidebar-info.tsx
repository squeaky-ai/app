import React from 'react';
import type { FC } from 'react';
import Image from 'next/image';
import type { Recording } from 'types/recording';

interface Props {
  recording: Recording;
}

export const SidebarInfo: FC<Props> = ({ recording }) => (
  <dl className='datalist'>
    <div className='row'>
      <dt>Session #</dt>
      <dd>{recording.id}</dd>
    </div>
    <div className='row'>
      <dt>User</dt>
      <dd>{recording.viewerId}</dd>
    </div>
    <div className='row'>
      <dt>Date</dt>
      <dd>{recording.dateString}</dd>
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
      <dd>{recording.pageCount}</dd>
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
          <Image height={16} width={16} src={`/browsers/${recording.browser.toLowerCase().replace(' ', '-')}.svg`} />
        </span>
        {recording.browser}
      </dd>
    </div>
  </dl>
);
