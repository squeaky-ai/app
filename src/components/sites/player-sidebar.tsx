import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { PlayerTab } from 'data/sites/enums';
import { Label } from 'components/label';
import { Button } from 'components/button';
import { SidebarInfo } from 'components/sites/sidebar-info';
import { SidebarActivity } from 'components/sites/sidebar-activity';
import { SidebarPages } from 'components/sites/sidebar-pages';
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
          <SidebarInfo recording={recording} />
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
          <SidebarActivity recording={recording} />
        </div>
      </div>
      <div className={classnames('sidebar pages', { active: active === PlayerTab.PAGES })}>
        <Label className='heading'>
          Pages 
          <Button onClick={handleClose}><i className='ri-close-line' /></Button>
        </Label>
        <div className='contents'>
          <SidebarPages recording={recording} />
        </div>
      </div>
    </aside>
  );
};
