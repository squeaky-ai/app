import React from 'react';
import type { FC } from 'react';
import type { Replayer } from 'rrweb';
import classnames from 'classnames';
import Link from 'next/link';
import { Logo } from 'components/logo';
import { Page } from 'components/sites/page';
import { Player } from 'components/sites/player';
import { Header } from 'components/header';
import { PlayerActions } from 'components/sites/player-actions';
import { PlayerDetails } from 'components/sites/player-details';
import { PlayerFooter } from 'components/sites/player-footer';
import type { User } from 'types/user';
import type { Recording } from 'types/recording';
import type { PlayerState, Action } from 'types/player';

interface Props {
  user: User;
  state: PlayerState;
  replayer: Replayer;
  recording: Recording;
  dispatch: React.Dispatch<Action>;
}

export const PlayerWrapper: FC<Props> = ({ user, state, replayer, recording, dispatch }) => (
  <div className={classnames('player-page', { open: state.activeTab !== null })}>
    <Page user={user} scope={[]}>
      {({ site }) => (
        <>
          <Header className='site-header'>
            <Link href='/sites'>
              <a className='logo'>
                <Logo />
              </a>
            </Link>

            <PlayerDetails 
              site={site} 
              recording={recording} 
            />

            <PlayerActions 
              site={site} 
              recording={recording} 
            />
          </Header>

          <Player 
            site={site}
            state={state} 
            replayer={replayer} 
            recording={recording}
            dispatch={dispatch}
          />

          <PlayerFooter 
            state={state}
            replayer={replayer} 
            recording={recording}
            dispatch={dispatch}
          />
        </>
      )}
    </Page>
  </div>
);
