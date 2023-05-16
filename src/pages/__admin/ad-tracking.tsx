import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Main } from 'components/main';
import { AdTracking } from 'components/admin/ad-tracking';
import { BreadCrumbs } from 'components/admin/breadcrumbs';
import { ServerSideProps, getServerSideProps } from 'lib/auth';

const AdminAdTracking: NextPage<ServerSideProps> = () => {
  const [loaded, setLoaded] = React.useState<boolean>(false);

  React.useEffect(() => {
    // There's stuff in the ad tracking component that require the
    // DOM to be mounted. In 99% of the app we have the <Page />
    // component that fetches the site etc, but here we have nothing
    setLoaded(true);
  }, []);

  return (
    <>
      <Head>
        <title>Squeaky | Admin | Ad Tracking</title>
      </Head>

      <Main>
        <BreadCrumbs items={[{ name: 'Admin', href: '/__admin/dashboard' }, { name: 'Ad Tracking' } ]} />

        {loaded && <AdTracking />}
      </Main>
    </>
  );
};

export default AdminAdTracking;
export { getServerSideProps };
