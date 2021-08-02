import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import Link from 'next/link';
import { Logo } from 'components/logo';
import { Page } from 'components/sites/page';
import { Player } from 'components/sites/player';
import { Header } from 'components/header';
import { PlayerActions } from 'components/sites/player-actions';
import { PlayerDetails } from 'components/sites/player-details';
import { PlayerFooter } from 'components/sites/player-footer';
import { usePlayerState } from 'hooks/player-state';
import type { User } from 'types/user';

interface Props {
  user: User;
}

export const PlayerWrapper: FC<Props> = ({ user }) => {
  const [state] = usePlayerState();

  return (
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

              <PlayerDetails site={site} recording={state.recording} />

              <PlayerActions site={site} recording={state.recording} />
            </Header>
            <Player />
            <PlayerFooter />
          </>
        )}
      </Page>
    </div>
  );
};
