import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Main } from 'components/main';
import { Page } from 'components/sites/page';
import { Spinner } from 'components/spinner';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { VisitorSummary } from 'components/sites/visitor-summary';
import { VisitorRecording } from 'components/sites/visitor-recordings';
import { VisitorStats } from 'components/sites/visitor-stats';
import { VisitorPages } from 'components/sites/visitors-pages';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { useVisitor } from 'hooks/visitor';

const SitesVisitor: NextPage<ServerSideProps> = ({ user }) => {
  const router = useRouter();
  const [loading, visitor] = useVisitor();

  const { site_id, visitor_id } = router.query;

  if (loading || !visitor) {
    return <Spinner />
  }

  return (
    <>
      <Head>
        <title>Squeaky / Site Visitors / {visitor_id}</title>
      </Head>

      <Page user={user} scope={[]}>
        {({ site }) => (
          <Main className='visitor-view'>
            <BreadCrumbs 
              site={site} 
              items={
                [
                  { name: 'Visitors', href: `/sites/${site_id}/visitors` }, 
                  { name: `ID: ${visitor_id}` }
                ]
              } 
            />

            <h3 className='title'>
              <i className='ri-user-line' />
              {visitor_id}
            </h3>

            <VisitorSummary visitor={visitor} />
            <VisitorRecording visitor={visitor} />
            <VisitorStats visitor={visitor} />
            <VisitorPages visitor={visitor} />
          </Main>
        )}
      </Page>
    </>
  );
};

export default SitesVisitor;
export { getServerSideProps };
