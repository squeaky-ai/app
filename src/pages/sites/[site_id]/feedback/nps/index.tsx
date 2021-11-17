import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import classnames from 'classnames';
import { Main } from 'components/main';
import { Page } from 'components/sites/page';
import { Container } from 'components/container';
import { EmptyStateHint } from 'components/sites/empty-state-hint';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { NpsTabs } from 'components/sites/feedback/nps-tabs';
import { BASE_PATH } from 'data/common/constants';
import { ServerSideProps, getServerSideProps } from 'lib/auth';

const SitesFeedbackNps: NextPage<ServerSideProps> = ({ user }) => {
  return (
    <>
      <Head>
        <title>Squeaky | Feedback | NPS</title>
      </Head>

      <Page user={user} scope={[]}>
        {({ site }) => (
          <Main className={classnames({ empty: !site.verifiedAt })}>
            <BreadCrumbs site={site} items={[{ name: 'Feedback' }, { name: 'NPS Score®' }]} />

            <h3 className='title'>Net Promoter Score®</h3>
          
            <Container className='xl centered empty-state'>
              <div className='empty-state-contents'>
                <Image src={`${BASE_PATH}/empty-state-9.svg`} height={240} width={320} alt='Illustration to represent the empty NPS page' />
                <h4>Awaiting tracking code installation</h4>
                <EmptyStateHint
                  title='Collecting Session Recordings'
                  body={
                    <>
                      <p>New to Squeaky? Once you have <Link href={`/sites/${site.id}/settings/details/tracking-code`}><a>installed your tracking code</a></Link> this page will enable you to configure how you wish to collect user feedback, and let you review all incoming feedback in one place.</p>
                    </>
                  }
                />
              </div>
            </Container>

            {!!site.verifiedAt && (
              <>
                <NpsTabs siteId={site.id} page='feedback' />
              </>
            )}
          </Main>
        )}
      </Page>
    </>
  );
};

export default SitesFeedbackNps;
export { getServerSideProps };
