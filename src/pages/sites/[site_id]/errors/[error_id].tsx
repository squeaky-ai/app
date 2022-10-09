import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import classnames from 'classnames';
import { Main } from 'components/main';
import { Page } from 'components/sites/page';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { Error } from 'components/error';
import { PageLoading } from 'components/sites/page-loading';
import { Period } from 'components/sites/period/period';
import { ErrorDetails } from 'components/sites/errors/error-details';
import { usePeriod } from 'hooks/use-period';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { useRouter } from 'next/router';
import { useErrorsDetails } from 'hooks/use-errors-details';
import { getDateRange } from 'lib/dates';

const SitesErrorsError: NextPage<ServerSideProps> = ({ user }) => {
  const { query } = useRouter();
  const { period, setPeriod } = usePeriod('errors');

  const { details, counts, error, loading } = useErrorsDetails({ 
    id: query.error_id as string,
    range: getDateRange(period),
  });

  if (error) {
    return <Error />;
  }

  return (
    <>
      <Head>
        <title>Squeaky | Site Errors | Details</title>
      </Head>

      <Page user={user} scope={[]}>
        {({ site }) => (
          <Main className={classnames({ empty: site.recordingsCount === 0 })}>
            <BreadCrumbs site={site} items={[{ name: 'Errors', href: `/sites/${site.id}/errors` }, { name: 'Error Details' }]} />

            <div className='errors-header'>
              <h4 className='title'>Error Details</h4>

              {site.recordingsCount > 0 && (
                <Period period={period} onChange={setPeriod} />
              )}
            </div>

            {loading && (
              <PageLoading />
            )}

            {!loading && !details && (
              <p>Not found</p>
            )}

            {!loading && details && (
              <>
                <ErrorDetails
                  counts={counts}
                  period={period}
                  details={details}
                /> 
              </>
            )}
          </Main>
        )}
      </Page>
    </>
  );
};

export default SitesErrorsError;
export { getServerSideProps };
