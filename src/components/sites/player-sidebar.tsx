import React from 'react';
import type { FC } from 'react';
import Image from 'next/image';
import classnames from 'classnames';
import { PlayerTab } from 'data/sites/enums';
import { Label } from 'components/label';
import { Button } from 'components/button';
import type { Recording } from 'types/recording';

interface Props {
  active: PlayerTab;
  recording: Recording;
  setActive: (active: PlayerTab) => void;
}

export const PlayerSidebar: FC<Props> = ({ recording, active, setActive }) => {
  const handleClose = () => {
    setActive(null);
  };

  return (
    <aside className={classnames('player-sidebar', { active: active !== null })}>
      <div className={classnames('sidebar info', { active: active === PlayerTab.INFO })}>
        <Label className='heading'>
          Session Info 
          <Button onClick={handleClose}><i className='ri-close-line' /></Button>
        </Label>
        <div className='contents'>
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
        </div>
      </div>
      <div className={classnames('sidebar notes', { active: active === PlayerTab.NOTES })}>
        <Label className='heading'>
          Notes 
          <Button onClick={handleClose}><i className='ri-close-line' /></Button>
        </Label>
        <div className='contents'>
          
        </div>
      </div>
      <div className={classnames('sidebar tags', { active: active === PlayerTab.TAGS })}>
        <Label className='heading'>
          Tags 
          <Button onClick={handleClose}><i className='ri-close-line' /></Button>
        </Label>
        <div className='contents'>
          
        </div>
      </div>
      <div className={classnames('sidebar activity', { active: active === PlayerTab.ACTIVITY })}>
        <Label className='heading'>
          Activity 
          <Button onClick={handleClose}><i className='ri-close-line' /></Button>
        </Label>
        <div className='contents'>
          <ul className='datarow'>
            {recording.events.items.map(item => (
              <li key={item.timestamp}>
                {item.type}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={classnames('sidebar pages', { active: active === PlayerTab.PAGES })}>
        <Label className='heading'>
          Pages 
          <Button onClick={handleClose}><i className='ri-close-line' /></Button>
        </Label>
        <div className='contents'>
          <ul className='datarow'>
            {recording.pages.map(page => (
              <li key={page}>{page}</li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};
