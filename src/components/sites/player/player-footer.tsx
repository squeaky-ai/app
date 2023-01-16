import React from 'react';
import type { FC } from 'react';
import type { Replayer } from 'rrweb';
import classnames from 'classnames';
import { PlayerControls } from 'components/sites/player/player-controls';
import type { Recording, Site } from 'types/graphql';
import type { PlayerState, Action } from 'types/player';
import { Event } from 'types/event';

interface Props {
  site: Site;
  state: PlayerState;
  replayer: Replayer;
  events: Event[];
  recording: Recording;
  dispatch: React.Dispatch<Action>;
}

export const PlayerFooter: FC<Props> = ({ 
  site,
  state, 
  replayer,
  events,
  recording,
  dispatch,
}) => (
  <footer className={classnames('controls', { active: state.activeTab !== null })}>
    <PlayerControls 
      site={site}
      state={state} 
      replayer={replayer} 
      events={events}
      recording={recording}
      dispatch={dispatch}
    />
  </footer>
);
