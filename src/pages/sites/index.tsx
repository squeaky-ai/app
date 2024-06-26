import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Avatar } from 'components/sites/avatar';
import { Main } from 'components/main';
import { Illustration } from 'components/illustration';
import { PageLoading } from 'components/sites/page-loading';
import { Error } from 'components/error';
import { CreateModal } from 'components/sites/create/create-modal';
import { PageProps } from 'types/page';
import { useSites } from 'hooks/use-sites';

const Sites: NextPage<PageProps> = () => {
  const { loading, error, sites } = useSites();

  if (error) {
    return <Error />;
  }

  return (
    <>
      <Head>
        <title>Squeaky | Sites</title>
      </Head>

      {loading && (
        <PageLoading />
      )}

      {!loading && sites.length === 0 && (
        <div className='welcome'>
          <div className='contents'>
            <Illustration illustration='illustration-1' height={256} width={500} alt='Illustration to welcome the user to Squeaky' />
            <h2>Welcome to Squeaky</h2>
            <p>It&apos;s time to discover what your users are really getting up to! Add your first site by clicking the button below.</p>
            <CreateModal buttonClassName='primary' />
          </div>
        </div>
      )}

      {!loading && sites.length > 0 && (
        <Main>
          <h4 className='title'>
            Sites
            <CreateModal />
          </h4>

          <ul className='sites-list'>
            {sites.map(site => (
              <li key={site.id}>
                <Link href={`/sites/${site.id}/dashboard`}>
                  <Avatar site={site} />
                  <p className='name'><b>{site.name}</b></p>
                  <p className='url'>{site.url}</p>
                  <p className='owner'>Owner: {site.ownerName || '-'}</p>
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
