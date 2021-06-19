import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Header } from '../../../components/sites/header';
import { Tabs } from '../../../components/sites/tabs';
import { Main } from '../../../components/main';
import { Access } from '../../../components/sites/access';
import { OWNER } from '../../../data/teams/constants';
import { Unauthorized } from '../../../components/sites/unauthorized';
import { ServerSideProps, getServerSideProps } from '../../../lib/auth';
import { getTeamMember } from '../../../lib/sites';
import { useSite } from '../../../hooks/sites';

const SitesSubscription: NextPage<ServerSideProps> = ({ user }) => {
  const [loading, site] = useSite();

  const member = getTeamMember(site, user);
  const authorized = [OWNER].includes(member?.role);

  return (
    <div className='page subscription'>
      <Head>
        <title>Squeaky / Site Settings</title>
      </Head>

      <Header />

      {!loading && !authorized && (
        <Unauthorized />
      )}

      {site && authorized && (
        <Main>
          <Tabs site={site} user={user} page='subscription' />
          <h3 className='title'>
            Subscription
            <Access roles={[OWNER]} />
          </h3>
        </Main>
      )}
    </div>
  );
};

export default SitesSubscription;
export { getServerSideProps };
