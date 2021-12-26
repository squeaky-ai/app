import React from 'react';
import type { FC } from 'react';
import type { Replayer } from 'rrweb';
import classnames from 'classnames';
import { Page } from 'components/sites/page';
import { Player } from 'components/sites/player/player';
import { Header } from 'components/header';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { PlayerActions } from 'components/sites/player/player-actions';
import { PlayerDetails } from 'components/sites/player/player-details';
import { PlayerFooter } from 'components/sites/player/player-footer';
import { Error } from 'components/error';
import type { User } from 'types/graphql';
import type { Recording } from 'types/graphql';
import { PlayerState, Action, PlayerStatus } from 'types/player';

interface Props {
  user: User;
  state: PlayerState;
  replayer: Replayer;
  recording: Recording;
  dispatch: React.Dispatch<Action>;
}

export const PlayerWrapper: FC<Props> = ({ user, state, replayer, recording, dispatch }) => {
  if (state.status === PlayerStatus.FAILED) {
    return <Error />;
  }

  return (
    <div className={classnames('player-page', { open: state.activeTab !== null })}>
      <Page user={user} scope={[]}>
        {({ site }) => (
          <>
            <Header className='site-header'>
              <BreadCrumbs 
                site={site} 
                items={[{ name: 'Recordings', href: `/sites/${site.id}/recordings` }]} 
              />

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
              site={site}
              user={user}
              replayer={replayer}
              recording={recording}
              dispatch={dispatch}
            />
          </>
        )}
      </Page>
    </div>
  );
};
