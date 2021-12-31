import React from 'react';
import type { FC } from 'react';
import type { Replayer } from 'rrweb';
import classnames from 'classnames';
import { PlayerZoom } from 'components/sites/player/player-zoom';
import { PlayerTabs } from 'components/sites/player/player-tabs';
import { PlayerSidebar } from 'components/sites/player/player-sidebar';
import { PlayerControls } from 'components/sites/player/player-controls';
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

export const PlayerFooter: FC<Props> = ({ state, site, replayer, recording, dispatch }) => (
  <>
    <footer className={classnames('controls', { active: state.activeTab !== null })}>
      <div className='control-group'>
        <PlayerZoom 
          state={state} 
          recording={recording}
          dispatch={dispatch} 
        />
      </div>
      <div className='control-group'>
        <PlayerControls 
          state={state} 
          replayer={replayer} 
          recording={recording}
          dispatch={dispatch}
        />
      </div>
      <div className='control-group'>
        <PlayerTabs state={state} dispatch={dispatch} />
      </div>
    </footer>

    <PlayerSidebar 
      state={state}
      site={site}
      replayer={replayer} 
      recording={recording}
      dispatch={dispatch}
    />
  </>
);
