import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { PlayerTab } from 'data/sites/enums';
import { Label } from 'components/label';
import { Button } from 'components/button';
import { SidebarInfo } from 'components/sites/sidebar-info';
import { SidebarActivity } from 'components/sites/sidebar-activity';
import { SidebarPages } from 'components/sites/sidebar-pages';
import { usePlayerState } from 'components/sites/player-provider';
import type { Recording } from 'types/recording';

interface Props {
  recording: Recording;
}

export const PlayerSidebar: FC<Props> = ({ recording }) => {
  const [state, setState] = usePlayerState();

  const handleClose = () => {
    setState(null);
  };

  return (
    <aside className={classnames('player-sidebar', { active: state.activeTab !== null })}>
      <div className={classnames('sidebar info', { active: state.activeTab === PlayerTab.INFO })}>
        <Label className='heading'>
          Session Info 
          <Button onClick={handleClose}><i className='ri-close-line' /></Button>
        </Label>
        <div className='contents'>
          <SidebarInfo recording={recording} />
        </div>
      </div>
      <div className={classnames('sidebar notes', { active: state.activeTab === PlayerTab.NOTES })}>
        <Label className='heading'>
          Notes 
          <Button onClick={handleClose}><i className='ri-close-line' /></Button>
        </Label>
        <div className='contents'>
          
        </div>
      </div>
      <div className={classnames('sidebar tags', { active: state.activeTab === PlayerTab.TAGS })}>
        <Label className='heading'>
          Tags 
          <Button onClick={handleClose}><i className='ri-close-line' /></Button>
        </Label>
        <div className='contents'>
          
        </div>
      </div>
      <div className={classnames('sidebar activity', { active: state.activeTab === PlayerTab.ACTIVITY })}>
        <Label className='heading'>
          Activity 
          <Button onClick={handleClose}><i className='ri-close-line' /></Button>
        </Label>
        <div className='contents'>
          <SidebarActivity recording={recording} />
        </div>
      </div>
      <div className={classnames('sidebar pages', { active: state.activeTab === PlayerTab.PAGES })}>
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
