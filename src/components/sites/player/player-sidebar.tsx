import React from 'react';
import type { FC } from 'react';
import type { Replayer } from 'rrweb';
import classnames from 'classnames';
import { PlayerTab } from 'data/sites/enums';
import { Label } from 'components/label';
import { Button } from 'components/button';
import { SidebarInfo } from 'components/sites/player/sidebar-info';
import { SidebarActivity } from 'components/sites/player/sidebar-activity';
import { SidebarNotes } from 'components/sites/player/sidebar-notes';
import { SidebarTags } from 'components/sites/player/sidebar-tags';
import { SidebarPages } from 'components/sites/player/sidebar-pages';
import type { Recording } from 'types/graphql';
import type { PlayerState, Action } from 'types/player';
import type { Site } from 'types/graphql';

interface Props {
  state: PlayerState;
  site: Site;
  replayer: Replayer;
  recording: Recording;
  dispatch: React.Dispatch<Action>;
}

export const PlayerSidebar: FC<Props> = ({ state, site, replayer, recording, dispatch }) => {
  const handleClose = () => {
    dispatch({ type: 'activeTab', value: null });
  };

  const setActiveTab = (value: PlayerTab) => {
    dispatch({ type: 'activeTab', value });
  };

  return (
    <aside className={classnames('player-sidebar', { active: state.activeTab !== null })}>

      {recording && (
        <>
        <div className={classnames('sidebar info', { active: state.activeTab === PlayerTab.INFO })}>
          <Label className='heading'>
            Session Info 
            <Button onClick={handleClose}><i className='ri-close-line' /></Button>
          </Label>
          <div className='contents'>
            <SidebarInfo site={site} recording={recording} setActiveTab={setActiveTab} />
          </div>
        </div>
        <div className={classnames('sidebar activity', { active: state.activeTab === PlayerTab.ACTIVITY })}>
          <Label className='heading'>
            Activity 
            <Button onClick={handleClose}><i className='ri-close-line' /></Button>
          </Label>
          <div className='contents'>
            <SidebarActivity recording={recording} replayer={replayer} />
          </div>
        </div>
        <div className={classnames('sidebar pages', { active: state.activeTab === PlayerTab.PAGES })}>
          <Label className='heading'>
            Pages 
            <Button onClick={handleClose}><i className='ri-close-line' /></Button>
          </Label>
          <div className='contents'>
            <SidebarPages recording={recording} replayer={replayer} />
          </div>
        </div>
        <div className={classnames('sidebar notes', { active: state.activeTab === PlayerTab.NOTES })}>
          <Label className='heading'>
            Notes 
            <Button onClick={handleClose}><i className='ri-close-line' /></Button>
          </Label>
          <div className='contents'>
            <SidebarNotes recording={recording} replayer={replayer} />
          </div>
        </div>
        <div className={classnames('sidebar tags', { active: state.activeTab === PlayerTab.TAGS })}>
          <Label className='heading'>
            Tags 
            <Button onClick={handleClose}><i className='ri-close-line' /></Button>
          </Label>
          <div className='contents'>
            <SidebarTags recording={recording} />
          </div>
        </div>
        </>
      )}
    </aside>
  );
};
