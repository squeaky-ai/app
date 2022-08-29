import React from 'react';
import type { FC } from 'react';
import type { Replayer } from 'rrweb';
import classnames from 'classnames';
import { PlayerTab } from 'data/sites/enums';
import { SidebarInfo } from 'components/sites/player/sidebar-info';
import { SidebarEvents } from 'components/sites/player/sidebar-events';
import { SidebarNotes } from 'components/sites/player/sidebar-notes';
import { SidebarTags } from 'components/sites/player/sidebar-tags';
import { SidebarFeedback } from 'components/sites/player/sidebar-feedback';
import { PlayerTabs } from 'components/sites/player/player-tabs';
import { SidebarPages } from 'components/sites/player/sidebar-pages';
import type { PlayerState, Action } from 'types/player';
import type { Recording, Site, Team } from 'types/graphql';
import type { Event } from 'types/event';

interface Props {
  state: PlayerState;
  site: Site;
  member: Team;
  replayer: Replayer;
  events: Event[];
  recording: Recording;
  dispatch: React.Dispatch<Action>;
}

export const PlayerSidebar: FC<Props> = ({ state, site, member, replayer, events, recording, dispatch }) => {
  const setActiveTab = (value: PlayerTab) => {
    dispatch({ type: 'activeTab', value });
  };

  return (
    <aside className={classnames('player-sidebar', { active: state.activeTab !== null })}>
      {recording && (
        <>
          <div className={classnames('sidebar info', { active: state.activeTab === PlayerTab.INFO })}>
            <div className='contents'>
              <SidebarInfo site={site} member={member} recording={recording} setActiveTab={setActiveTab} />
            </div>
          </div>
          <div className={classnames('sidebar events', { active: state.activeTab === PlayerTab.EVENTS })}>
            <div className='contents'>
              <SidebarEvents events={events} recording={recording} replayer={replayer} state={state} dispatch={dispatch} />
            </div>
          </div>
          <div className={classnames('sidebar pages', { active: state.activeTab === PlayerTab.PAGES })}>
            <div className='contents'>
              <SidebarPages recording={recording} replayer={replayer} />
            </div>
          </div>
          <div className={classnames('sidebar notes', { active: state.activeTab === PlayerTab.NOTES })}>
            <div className='contents'>
              <SidebarNotes member={member} recording={recording} replayer={replayer} />
            </div>
          </div>
          <div className={classnames('sidebar tags', { active: state.activeTab === PlayerTab.TAGS })}>
            <div className='contents'>
              <SidebarTags member={member} recording={recording} />
            </div>
          </div>
          <div className={classnames('sidebar feedback', { active: state.activeTab === PlayerTab.FEEDBACK })}>
            <div className='contents'>
              <SidebarFeedback recording={recording} />
            </div>
          </div>
        </>
      )}

      <PlayerTabs state={state} dispatch={dispatch} />
    </aside>
  );
};
