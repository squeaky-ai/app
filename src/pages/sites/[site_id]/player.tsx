import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Header } from 'components/sites/header';
import { Player } from 'components/sites/player';
import { Controls } from 'components/sites/controls';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { useSite } from 'hooks/sites';

const SitesPlayer: NextPage<ServerSideProps> = () => {
  const router = useRouter();
  const [_loading, site] = useSite();

  return (
    <div className='page player'>
      <Head>
        <title>Squeaky / Site Player</title>
      </Head>

      <Header>
        {site && (
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
        )}
      </Header>

      <Player />

      <Controls />
    </div>
  );
};

export default SitesPlayer;
export { getServerSideProps };
