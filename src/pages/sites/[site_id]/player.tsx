import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Header } from 'components/sites/header';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { Page } from 'components/sites/page';
import { PlayerActions } from 'components/sites/player-actions';
import { PlayerDetails } from 'components/sites/player-details';
import { PlayerWrapper } from 'components/sites/player-wrapper';
import { useRecording } from 'hooks/recording';

const SitesPlayer: NextPage<ServerSideProps> = ({ user }) => {
  const [_recordingLoading, recording] = useRecording();

  return (
    <>
      <Head>
        <title>Squeaky / Site Player</title>
      </Head>

      <Page user={user} scope={[]}>
        {({ site }) => (
          <>
            <Header 
              center={<PlayerDetails site={site} recording={recording} />}
              right={<PlayerActions site={site} recording={recording} />}
            />

            <PlayerWrapper recording={recording} />
          </>
        )}
      </Page>
    </>
  );
};

export default SitesPlayer;
export { getServerSideProps };
