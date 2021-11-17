import React from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import classnames from 'classnames';
import { Main } from 'components/main';
import { Page } from 'components/sites/page';
import { Container } from 'components/container';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { EmptyStateHint } from 'components/sites/empty-state-hint';
import { Overview } from 'components/sites/overview';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { BASE_PATH } from 'data/common/constants';

const SitesOverview: NextPage<ServerSideProps> = ({ user }) => (
  <>
    <Head>
      <title>Squeaky | Site Overview</title>
    </Head>

    <Page user={user} scope={[]}>
      {({ site }) => (
        <Main className={classnames({ empty: site.recordingsCount === 0 })}>
          <BreadCrumbs site={site} items={[{ name: 'Overview' }]} />

          <h3 className='title'>Overview</h3>

          <Container className='xl centered empty-state'>
            <div className='empty-state-contents'>
              <Image src={`${BASE_PATH}/empty-state-5.svg`} height={240} width={320} alt='Illustration to represent the empty recordings page' />
              <h4>There is currently no dashboard data</h4>
              <EmptyStateHint
                title='Accessing The Dashboard'
                body={
                  <>
                    <p>New to Squeaky? Please <Link href={`/sites/${site.id}/settings/details/tracking-code`}><a>install your tracking code</a></Link> to begin recording user sessions for your website or web app.</p>
                    <p>If you have only recently installed or updated your tracking code it may take up to an hour before data for your dashboard becomes available.</p>
                  </>
                }
              />
            </div>
          </Container>

          {site.recordingsCount > 0 && (
            <Overview site={site} />
          )}
        </Main>
      )}
    </Page>
  </>
);

export default SitesOverview;
export { getServerSideProps };
