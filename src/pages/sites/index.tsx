import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Avatar } from 'components/sites/avatar';
import { Main } from 'components/main';
import { Illustration } from 'components/illustration';
import { CreateSite } from 'components/sites/recordings/create-site';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { useSites } from 'hooks/use-sites';

const Sites: NextPage<ServerSideProps> = () => {
  const { loading, sites } = useSites();

  return (
    <>
      <Head>
        <title>Squeaky | Sites</title>
      </Head>

      {!loading && sites.length === 0 && (
        <div className='empty-state welcome'>
          <div className='contents'>
            <Illustration src='illustration-1' height={256} width={500} alt='Illustration to welcome the user to Squeaky' />
            <h2>Welcome to Squeaky</h2>
            <p>It’s time to discover what your users are really getting up to! Add your first site by clicking the button below.</p>
            <CreateSite className='button primary icon'>
              Add Site
              <i className='ri-arrow-right-line' />
            </CreateSite>
          </div>
        </div>
      )}

      {!loading && sites.length > 0 && (
        <Main>
          <h4 className='title'>
            Sites
            <CreateSite className='new-site'>+ Add New</CreateSite>
          </h4>

          <ul className='sites-list'>
            {sites.map(site => (
              <li key={site.id}>
                <Link href={`/sites/${site.id}/overview`}>
                  <a>
                    <Avatar site={site} />
                    <p className='name'><b>{site.name}</b></p>
                    <p className='url'>{site.url}</p>
                    <p className='owner'>Owner: {site.ownerName}</p>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </Main>
      )}
    </>
  );
};

export default Sites;
export { getServerSideProps };
