import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Header } from 'components/sites/header';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { Page } from 'components/sites/page';
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
            <Header>
              <div className='recording-details'>
                <p>
                  <Link href={`/sites/${site.id}/recordings`}>
                    <a>Recordings</a>
                  </Link>
                  <span className='seperator'>/</span>
                  <span className='session'>Session</span>
                  <span className='session-number'> #{recording?.sessionId}</span>
                </p>
              </div>
            </Header>

            <PlayerWrapper recording={recording} />
          </>
        )}
      </Page>
    </>
  );
};

export default SitesPlayer;
export { getServerSideProps };
