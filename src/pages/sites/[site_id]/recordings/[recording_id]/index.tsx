import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { PlayerWrapper } from 'components/sites/player-wrapper';
import { PlayerProvider } from 'components/sites/player-provider';
import { useRecording } from 'hooks/recording';

const SitesPlayer: NextPage<ServerSideProps> = ({ user }) => {
  const [_recordingLoading, recording] = useRecording({ page: 1 });

  return (
    <PlayerProvider recording={recording}>
      <Head>
        <title>Squeaky / Site Player</title>
      </Head>

      <PlayerWrapper user={user} />
    </PlayerProvider>
  );
};

export default SitesPlayer;
export { getServerSideProps };
