import React from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import classnames from 'classnames';
import { Main } from 'components/main';
import { Page } from 'components/sites/page';
import { Container } from 'components/container';
import { Spinner } from 'components/spinner';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { EmptyStateHint } from 'components/sites/empty-state-hint';
import { Heatmaps } from 'components/sites/heatmaps';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { usePages } from 'hooks/use-pages';
import { BASE_PATH } from 'data/common/constants';
import type { TimePeriod } from 'lib/dates';


const SitesHeatmaps: NextPage<ServerSideProps> = ({ user }) => {
  const [page, setPage] = React.useState<string>(null);
  const [period, setPeriod] = React.useState<TimePeriod>('past_seven_days');

  const { pages, loading } = usePages();

  React.useEffect(() => {
    if (!page) setPage(pages[0]);
  }, [pages]);

  return (
    <>
      <Head>
        <title>Squeaky | Site Heatmaps</title>
      </Head>

      <Page user={user} scope={[]}>
        {({ site }) => (
          <Main className={classnames({ empty: site.recordingsCount === 0 })}>
            <BreadCrumbs site={site} items={[{ name: 'Heatmaps' }]} />

            <div className='heatmaps-heading'>
              <h3 className='title'>Heatmaps</h3>
            </div>

            <Container className='xl centered empty-state'>
              <div className='empty-state-contents'>
                <Image src={`${BASE_PATH}/empty-state-8.svg`} height={240} width={320} alt='Illustration to represent the empty recordings page' />
                <h4>There are currently no heatmaps available.</h4>
                <EmptyStateHint
                  title='Collecting Heatmap Data'
                  body={
                    <>
                      <p>New to Squeaky? Please <Link href={`/sites/${site.id}/settings/tracking-code`}><a>install your tracking code</a></Link> to begin recording user sessions for your website or web app.</p>
                      <p>If you have only recently installed or updated your tracking code it may take up to an hour before data for your dashboard becomes available.</p>
                    </>
                  }
                />
              </div>
            </Container>

            {loading && pages.length === 0 && (
              <Spinner />
            )}

            {site.recordingsCount > 0 && page && (
              <Heatmaps 
                page={page} 
                pages={pages}
                setPage={setPage} 
                period={period}
                setPeriod={setPeriod}
              />
            )}
          </Main>
        )}
      </Page>
    </>
  );
};

export default SitesHeatmaps;
export { getServerSideProps };
