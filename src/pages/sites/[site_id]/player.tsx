import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Header } from 'components/sites/header';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { Page } from 'components/sites/page';
import { PlayerWrapper } from 'components/sites/player-wrapper';
import { useRecording } from 'hooks/recording';

const SitesPlayer: NextPage<ServerSideProps> = ({ user }) => {
  const router = useRouter();
  const [_recordingLoading, recording] = useRecording();

  return (
    <div className='page player'>
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
                  <span className='session-number'> #{router.query.recording_id}</span>
                  <span className='indicator' />
                </p>
              </div>
            </Header>

            {recording && <PlayerWrapper site={site} recording={recording} />}
          </>
        )}
      </Page>
    </div>
  );
};

export default SitesPlayer;
export { getServerSideProps };
