import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { Main } from 'components/main';
import { EmptyState } from 'components/sites/empty-state';
import { Page } from 'components/sites/page';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { Dashboard } from 'components/sites/dashboard';
import { FreeTrialModal } from 'components/sites/free-trial-modal';
import { Period } from 'components/sites/period/period';
import { usePeriod } from 'hooks/use-period';
import { ServerSideProps, getServerSideProps } from 'lib/auth';

const SitesDashboard: NextPage<ServerSideProps> = ({ user }) => {
  const ref = React.useRef<FreeTrialModal>(null);

  const router = useRouter();

  const { period, setPeriod } = usePeriod('dashboard');

  const removeQueryParams = () => {
    router.replace(router.asPath.split('?')[0], undefined, { shallow: true });
  };

  React.useEffect(() => {
    if (router.query.free_trial_began === '1') {
      ref.current.show();
      removeQueryParams();
    }
  }, []);

  return (
    <>
      <Head>
        <title>Squeaky | Site Dashboard</title>
      </Head>

      <Page user={user} scope={[]}>
        {({ site, member }) => (
          <Main className={classnames({ empty: site.recordingsCount === 0 })}>
            <BreadCrumbs site={site} member={member} items={[{ name: 'Dashboard' }]} />

            <h4 className='title'>
              Dashboard
              {site.recordingsCount > 0 && (
                <Period period={period} onChange={setPeriod} />
              )}
            </h4>

            <EmptyState
              site={site}
              title='There is currently no dashboard data'
              illustration='illustration-5'
            />

            {site.recordingsCount > 0 && (
              <Dashboard site={site} member={member} period={period} />
            )}
          </Main>
        )}
      </Page>

      <FreeTrialModal ref={ref} />
    </>
  );
};

export default SitesDashboard;
export { getServerSideProps };
